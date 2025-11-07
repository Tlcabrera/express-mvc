import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDatabase } from "../../config/database.js";
import userRoutes from "../../routes/userRoutes.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../../");

describe("Rutas de usuario (integración)", function () {
  this.timeout(30000);
  let mongod;
  let app;

  before(async () => {
    // 1) Levanta Mongo en memoria
    mongod = await MongoMemoryServer.create();
    const uri = new URL(mongod.getUri());

    process.env.MONGO_HOST = uri.hostname;
    process.env.MONGO_PORT = uri.port;
    // Si no viene el pathname, usa 'testdb' por defecto
    process.env.MONGO_DB = (uri.pathname && uri.pathname.slice(1)) || "testdb";
    process.env.PORT = process.env.PORT || "0";

    // 2) Conecta Mongoose con tu helper
    await connectDatabase();

    // 3) Prepara app Express con las mismas config básicas
    app = express();
    app.use(express.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.set("views", path.join(PROJECT_ROOT, "views"));
    app.use(express.static(path.join(PROJECT_ROOT, "public")));
    app.use(userRoutes);
  });

  after(async () => {
    await mongoose.connection.close();
    if (mongod) await mongod.stop();
  });

  it("POST /save/usuarios crea un usuario y redirige", async () => {
    const res = await request(app)
      .post("/save/usuarios")
      .type("form")
      .send({ name: "Camila", lastname: "Rojas", email: "camila@test.com", role: "admin" });
    // La app redirige a "/"
    if (res.status !== 302) {
      throw new Error("Se esperaba redirección 302 al crear usuario.");
    }
  });

  it("GET / muestra el usuario creado en el HTML", async () => {
    const res = await request(app).get("/");
    if (res.status !== 200) {
      throw new Error("Se esperaba 200 al cargar '/'");
    }
    if (!/Camila/.test(res.text)) {
      throw new Error("El HTML no contiene el nombre del usuario creado.");
    }
  });

  it("GET /form/usuarios/:id devuelve el formulario de edición", async () => {
    // Primero, crea un usuario para editar
    const create = await request(app)
      .post("/save/usuarios")
      .type("form")
      .send({ name: "Pedro", lastname: "Pérez", email: "pedro@test.com", role: "user" });
    if (create.status !== 302) throw new Error("No se pudo crear usuario para editar.");

    // Obtén el ID buscando en la lista
    const list = await request(app).get("/");
    const match = list.text.match(/data-id="([0-9a-fA-F]{24})"/) || list.text.match(/\/form\/usuarios\/(\w{24})/);
    // Dependiendo del EJS, puedes adaptar el selector. Para mantenerlo genérico,
    // en caso de no encontrarlo, intentamos otra estrategia: consultar directamente a la BD.
    let id;
    if (match && match[1]) {
      id = match[1];
    } else {
      // fallback: lee el usuario por email usando Mongoose
      const { userModel } = await import("../../models/userModel.js");
      const u = await userModel.findOne({ email: "pedro@test.com" }).lean();
      id = u && String(u._id);
    }

    const res = await request(app).get(`/form/usuarios/${id}`);
    if (res.status !== 200) throw new Error("Se esperaba 200 en formulario de edición.");
  });

  it("POST /update/usuarios/:id actualiza y redirige", async () => {
    const { userModel } = await import("../../models/userModel.js");
    const u = await userModel.create({ name: "Ana", lastname: "Luna", email: "ana@test.com", role: "user" });
    const res = await request(app)
      .post(`/update/usuarios/${u._id}`)
      .type("form")
      .send({ name: "Ana-MOD", lastname: "Luna", email: "ana@test.com", role: "user" });

    if (res.status !== 302) throw new Error("Se esperaba 302 al actualizar.");
    const html = await request(app).get("/");
    if (!/Ana-MOD/.test(html.text)) {
      throw new Error("El nombre actualizado no aparece en la lista.");
    }
  });

  it("POST /delete/usuarios/:id borra y redirige", async () => {
    const { userModel } = await import("../../models/userModel.js");
    const u = await userModel.create({ name: "Borrar", lastname: "Yo", email: "del@test.com", role: "user" });
    const res = await request(app).post(`/delete/usuarios/${u._id}`).type("form");
    if (res.status !== 302) throw new Error("Se esperaba 302 al borrar.");

    const exists = await userModel.findById(u._id);
    if (exists) throw new Error("El usuario no fue eliminado.");
  });
});