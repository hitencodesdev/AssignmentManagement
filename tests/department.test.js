const request = require("supertest");
const express = require("express");

// Mock auth middleware to bypass authentication
jest.mock("../middleware/auth", () => () => (req, res, next) => next());

// Mock controllers
jest.mock("../controllers/department", () => ({
    getDepartments: jest.fn((req, res) => res.status(200).json({ message: "getDepartments called" })),
    addDepartment: jest.fn((req, res) => res.status(200).json({ message: "addDepartment called" })),
    deleteDepartment: jest.fn((req, res) => res.status(200).json({ message: "deleteDepartment called" })),
    editDepartment: jest.fn((req, res) => res.status(200).json({ message: "editDepartment called" })),
    updateDepartment: jest.fn((req, res) => res.status(200).json({ message: "updateDepartment called" }))
}));

const departmentRoutes = require("../routes/department");

// Build app
const app = express();
app.use(express.json());
app.use("/department", departmentRoutes);

describe("Department Routes", () => {

    test("GET /department/list triggers getDepartments", async () => {
        const res = await request(app).get("/department/list");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("getDepartments called");
    });

    test("POST /department/add triggers addDepartment", async () => {
        const res = await request(app)
            .post("/department/add")
            .send({ name: "IT", type: "Technical", address: "Building A" });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("addDepartment called");
    });

    test("GET /department/delete/:id triggers deleteDepartment", async () => {
        const res = await request(app).get("/department/delete/12345");

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("deleteDepartment called");
    });

    test("GET /department/edit/:id triggers editDepartment", async () => {
        const res = await request(app).get("/department/edit/98765");

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("editDepartment called");
    });

    test("POST /department/update/:id triggers updateDepartment", async () => {
        const res = await request(app)
            .post("/department/update/54321")
            .send({ name: "HR", type: "Admin", address: "Block B" });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("updateDepartment called");
    });

});
