const request = require("supertest");
const express = require("express");

// Mock auth middleware
jest.mock("../middleware/auth", () => () => (req, res, next) => next());

// Mock JWT – return a VALID ObjectId
jest.mock("jsonwebtoken", () => ({
    verify: jest.fn((token, key, cb) => {
        cb(null, { id: "507f1f77bcf86cd799439011" });
    })
}));

// Mock Models
jest.mock("../models/Assignment", () => ({
    find: jest.fn(() =>
        Promise.resolve([
            { studentId: "507f1f77bcf86cd799439011" }, // matches decoded token
            { studentId: "507f1f77bcf86cd799439012" }  // does not match
        ])
    )
}));

jest.mock("../models/Department", () => ({
    find: jest.fn(() =>
        Promise.resolve([{ name: "IT" }, { name: "HR" }])
    )
}));

jest.mock("../models/Users", () => ({
    find: jest.fn(() =>
        Promise.resolve([
            { role: "student" },
            { role: "student" },
            { role: "HOD" },
            { role: "professor" }
        ])
    )
}));

// Import routes AFTER mocks
const dashboardRoutes = require("../routes/dashboard");

// Build express app
const app = express();
app.use(express.json());

// Fake cookie-parser
app.use((req, res, next) => {
    req.cookies = { token: "abc" };
    next();
});

// Mock res.render
app.use((req, res, next) => {
    res.render = (view, data) => {
        res.status(200).json({ view, data });
    };
    next();
});

app.use("/dashboard", dashboardRoutes);

describe("Dashboard Routes", () => {

    test("GET /dashboard/user triggers userDashboard", async () => {
        const res = await request(app).get("/dashboard/user");

        expect(res.statusCode).toBe(200);
        expect(res.body.view).toBe("userDashBoard");
        expect(res.body.data.valid.length).toBe(1);
    });

    test("GET /dashboard/admin triggers adminDashboard", async () => {
        const res = await request(app).get("/dashboard/admin");

        expect(res.statusCode).toBe(200);
        expect(res.body.view).toBe("adminDashboard");
        expect(res.body.data.student).toBe(2);
        expect(res.body.data.hod).toBe(1);
        expect(res.body.data.prof).toBe(1);
    });

    test("GET /dashboard/professor triggers professorDashboard", async () => {
        const res = await request(app).get("/dashboard/professor");

        expect(res.statusCode).toBe(200);
        expect(res.body.view).toBe("professorDashboard");
    });

});
