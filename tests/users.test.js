const request = require("supertest");
const express = require("express");

// Mock nodemailer to prevent sending real emails
jest.mock("nodemailer", () => ({
    createTransport: () => ({
        sendMail: jest.fn((mail, cb) => cb(null, "Mock Mail Sent"))
    })
}));

// Mock controllers
jest.mock("../controllers/users", () => ({
    addUser: jest.fn((req, res) => res.status(200).json({ message: "addUser called" })),
    getUsers: jest.fn((req, res) => res.status(200).json({ message: "getUsers called" })),
    createUser: jest.fn((req, res) => res.status(200).json({ message: "createUser called" })),
    deleteUser: jest.fn((req, res) => res.status(200).json({ message: "deleteUser called" })),
    editUser: jest.fn((req, res) => res.status(200).json({ message: "editUser called" })),
    updateUser: jest.fn((req, res) => res.status(200).json({ message: "updateUser called" }))
}));

// Import routes *after mocks*
const userRoutes = require("../routes/user");

// Build app
const app = express();
app.use(express.json());
app.use("/users", userRoutes);

describe("User Routes", () => {

    test("GET /users/create triggers addUser", async () => {
        const res = await request(app).get("/users/create");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("addUser called");
    });

    test("GET /users/list triggers getUsers", async () => {
        const res = await request(app).get("/users/list");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("getUsers called");
    });

    test("POST /users/create triggers createUser", async () => {
        const res = await request(app)
            .post("/users/create")
            .send({
                name: "John",
                email: "john@example.com",
                password: "123",
                phone: "9999999999",
                dept: "IT",
                role: "admin"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("createUser called");
    });

    test("GET /users/delete/:id triggers deleteUser", async () => {
        const res = await request(app).get("/users/delete/123");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("deleteUser called");
    });

    test("GET /users/edit/:id triggers editUser", async () => {
        const res = await request(app).get("/users/edit/456");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("editUser called");
    });

    test("POST /users/update/:id triggers updateUser", async () => {
        const res = await request(app)
            .post("/users/update/789")
            .send({
                name: "Updated",
                email: "updated@example.com",
                password: "abc",
                phone: "8888888888",
                dept: "HR",
                role: "staff"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("updateUser called");
    });

});
