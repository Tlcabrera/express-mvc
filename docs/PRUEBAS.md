# Guía de Pruebas (Unitarias e Integración) — Proyecto Express + MVC

Esta guía te deja listo/a para ejecutar y **entender** las pruebas paso a paso usando:
- **Mocha** como runner de tests
- **Chai** para aserciones
- **Sinon** para stubs/spies en pruebas unitarias
- **Supertest** para probar rutas HTTP
- **mongodb-memory-server** para levantar MongoDB en memoria (sin instalar nada externo)

> Requisitos: Node.js 18+ y npm.

---

## 1) Instalación de dependencias de prueba

```bash
npm i -D mocha chai sinon supertest mongodb-memory-server
```

> El proyecto usa módulos ES (`"type": "module"`), por eso los `import` funcionarán sin Babel.

---

## 2) Scripts de npm recomendados

En `package.json` agrega/ajusta estos scripts:

```json
{
  "scripts": {
    "test": "node --experimental-specifier-resolution=node ./node_modules/mocha/bin/mocha \"test/**/*.spec.js\" --timeout 15000",
    "test:unit": "node --experimental-specifier-resolution=node ./node_modules/mocha/bin/mocha \"test/unit/*.spec.js\" --timeout 10000",
    "test:integration": "node --experimental-specifier-resolution=node ./node_modules/mocha/bin/mocha \"test/integration/*.spec.js\" --timeout 30000"
  }
}
```

> `--experimental-specifier-resolution=node` ayuda a resolver imports ESM sin tener que poner siempre la extensión `.js` en ciertos entornos. Si tu Node ya lo resuelve bien, puedes quitarlo.

---

## 3) Estructura creada

```
test/
  unit/
    userService.spec.js         # Pruebas de la capa de servicios con Sinon (stubs de Mongoose)
  integration/
    userRoutes.spec.js          # Pruebas de rutas con Supertest + MongoDB en memoria
docs/
  PRUEBAS.md                    # Esta guía
```

---

## 4) ¿Qué prueban los tests?

### 4.1 Unitarias (capa de servicios)
- `getUsers` debe llamar a `userModel.find()` y retornar la lista.
- `getUser(id)` debe llamar a `userModel.findOne({ _id: id })`.
- `createUser(user)` debe llamar a `userModel.create(user)`.
- `updateUser(id, user)` debe llamar a `userModel.updateOne({ _id: id }, { $set: user })`.
- `deleteUser(id)` debe llamar a `userModel.deleteOne({ _id: id })`.

> Aquí **no** tocamos la BD real. **Stub** de Mongoose con Sinon para aislar la lógica de negocio.

### 4.2 Integración (rutas y BD en memoria)
- Crea usuario vía `POST /save/usuarios` y verifica redirección a `/`.
- Renderiza `GET /` y comprueba que aparezca el usuario en el HTML (EJS).
- Devuelve el formulario de edición `GET /form/usuarios/:id`.
- Actualiza un usuario `POST /update/usuarios/:id` y verifica el cambio en `GET /`.
- Elimina un usuario `POST /delete/usuarios/:id` y comprueba que ya no exista en BD.

Usamos `mongodb-memory-server` para que Mongoose se conecte a un Mongo **efímero** y **aislado**.

---

## 5) Ejecución

1. Instala dependencias:
   ```bash
   npm install
   npm i -D mocha chai sinon supertest mongodb-memory-server
   ```

2. Ejecuta **todas** las pruebas:
   ```bash
   npm test
   ```

3. Solo **unitarias**:
   ```bash
   npm run test:unit
   ```

4. Solo **integración**:
   ```bash
   npm run test:integration
   ```

> Si te aparece algún error de imports, verifica tu versión de Node (recomendado 18+) o prueba quitando/agregando la flag `--experimental-specifier-resolution=node` en los scripts.

---

## 6) Explicación paso a paso (para tu entrevista)

1. **Diseño MVC**: Controladores llaman servicios; servicios usan `userModel` (Mongoose).  
2. **Pruebas unitarias**: Aislamos la capa de servicios con **Sinon stubs** de los métodos Mongoose (`find`, `findOne`, `create`, etc.). Así validamos:
   - Qué argumentos recibe cada método
   - Qué retorna la función del servicio sin necesidad de BD
3. **Pruebas de integración**:
   - Levantamos **MongoDB en memoria** y seteamos variables de entorno `MONGO_HOST`, `MONGO_PORT`, `MONGO_DB` a partir del URI del servidor en memoria.
   - Llamamos a `connectDatabase()` (la misma función que usa tu app real) para tener Mongoose listo.
   - Montamos una **app Express de prueba** con `view engine` EJS y `views` hacia la carpeta real.
   - Usamos **Supertest** para simular las llamadas HTTP del usuario final.
   - Verificamos respuestas (códigos 200/302), contenido renderizado en HTML, y efectos en BD.
4. **Buenas prácticas**: 
   - **Unitarias rápidas** para lógica pura.
   - **Integración** para flujos end-to-end (sin arrancar `server.listen`).
   - BD efímera para evitar dependencias en entornos locales/CI.
   - Scripts separados en `package.json` y tiempos (`--timeout`) razonables.
5. **Cómo lo defendería**:
   - Menciona la diferencia entre pruebas unitarias vs. integración.
   - Explica por qué `mongodb-memory-server` reduce fricción en CI y asegura repetibilidad.
   - Justifica el uso de stubs en unitarias para no depender de Mongoose ni del estado de la BD.
   - Señala que las rutas renderizan EJS, por eso se configura `view engine` y `views` en el app de prueba.

---

## 7) Tips extra para el día de la prueba
- Ejecuta `npm test` antes de la entrevista para confirmar que todo corre.
- Si piden **coverage**, añade `c8` o `nyc`:
  ```bash
  npm i -D c8
  # y agrega un script
  "coverage": "c8 npm test"
  ```
  para html covertura npx c8 report --reporter=html
- Documenta cualquier cambio que hagas a la estructura para que el revisor lo entienda rápido.