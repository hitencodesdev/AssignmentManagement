const request = require("supertest");
const express = require("express");

// Mock controllers
jest.mock("../controllers/assignment", () => ({
    uploadAssignment: jest.fn((req, res) => res.status(200).json({ message: "uploadAssignment called" })),
    getAllAssignments: jest.fn((req, res) => res.status(200).json({ message: "getAllAssignments called" })),
    assign: jest.fn((req, res) => res.status(200).json({ message: "assign called" })),
    submitAssignment: jest.fn((req, res) => res.status(200).json({ message: "submitAssignment called" })),
    viewDetails: jest.fn((req, res) => res.status(200).json({ message: "viewDetails called" })),
    submitForReview: jest.fn((req, res) => res.status(200).json({ message: "submitForReview called" }))
}));

// Correct Multer mock (IMPORTANT)
jest.mock("../config/multer", () => ({
    single: () => (req, res, next) => next()
}));

const routes = require("../routes/assignment");

// Build a minimal app
const app = express();
app.use(express.json());
app.use("/", routes);

describe("Assignment Routes", () => {

    test("POST /uploadAssignments calls uploadAssignment", async () => {
        const response = await request(app)
            .post("/uploadAssignments")
            .send({});
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("uploadAssignment called");
    });

    test("GET /allAssignments calls getAllAssignments", async () => {
        const response = await request(app).get("/allAssignments");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("getAllAssignments called");
    });

    test("GET /uploadAssignments calls assign", async () => {
        const response = await request(app).get("/uploadAssignments");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("assign called");
    });

    test("GET /submitAssignment/:id calls submitAssignment", async () => {
        const response = await request(app).get("/submitAssignment/123");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("submitAssignment called");
    });

    test("GET /viewDetails/:id calls viewDetails", async () => {
        const response = await request(app).get("/viewDetails/456");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("viewDetails called");
    });

    test("POST /submitForReview/:id calls submitForReview", async () => {
        const response = await request(app).post("/submitForReview/789");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("submitForReview called");
    });

});
