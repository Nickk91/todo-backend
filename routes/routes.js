import express from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask
} from "../controllers/taskController.js";

const router = express.Router();

//Route to get all users
router.get("/tasks", getAllTasks);

//Route to get single user by ID
router.get("/tasks/:id", getTaskById);

//Route to create a new account
router.post("/create", createTask);

//Route to create a new account
router.delete("/delete/:id", deleteTask);


//Route to update an existing task 

router.put("/update/:id", updateTask);




export default router;