import { expect } from "chai";
import sinon from "sinon";
import * as userService  from "../../services/userService.js";
import {userModel}  from "../../models/userModel.js";


describe("userService (unit)", () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("getUsers: should return a list of users", async () => {
        const fakeUsers = [{ _id: "1", name: "John" }, { _id: "2", name: "Jane" }];
        const stub = sandbox.stub(userModel, "find").resolves(fakeUsers);
        const result = await userService.getUsers();
        expect(stub.calledOnce).to.be.true;
        expect(result).to.deep.equal(fakeUsers);
    });

    it("getUser(id): should return a user by id", async () => {
        const fakeUser = { _id: "1", name: "John" };
        const stub = sandbox.stub(userModel, "findOne").resolves(fakeUser);
        const result = await userService.getUser("123");
        expect(stub.calledOnceWith({ "_id": "123" })).to.be.true;
        expect(result).to.deep.equal(fakeUser);
    });

    it("createUser(user): should create and return a new user", async () => {
        const payload = { name: "John", lastname: "Doe" };
        const created = { _id: "abc", ...payload };
        const stub = sandbox.stub(userModel, "create").resolves(created);

        const result = await userService.createUser(payload);
        expect(stub.calledOnceWith(payload)).to.be.true;
        expect(result).to.deep.equal(created);
    });

    it("updateUser(id, user): should update and return the user", async () => {
        const id = "777";
        const changes = { name: "Johnny" };
        const updated = { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
        const stub = sandbox.stub(userModel, "updateOne").resolves(updated);

        const result = await userService.updateUser(id, changes);
        expect(stub.calledOnceWith({ _id: id }, { $set: changes })).to.be.true;
        expect(result).to.deep.equal(updated);
    });
    it("deleteUser(id): should delete the user by id", async () => {
        const id = "888";
        const deleted = { acknowledged: true, deletedCount: 1 };
        const stub = sandbox.stub(userModel, "deleteOne").resolves(deleted);
        const result = await userService.deleteUser(id);
        expect(stub.calledOnceWith({ _id: id })).to.be.true;
        expect(result).to.deep.equal(deleted);
    });
});

