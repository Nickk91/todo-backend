import express from "express";
import {
  createTask,
  getAllTasks,
  editTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();
//localhost:3001/api/v1/todos/edit/65d483b773c996e895c5f1fe%22?name=%22Elad%22&description=%22do%20some%20shopping%22

//Route to create a new account
router.post("/", createTask);

//Route to get all users
router.get("/", getAllTasks);

//Route to eidt/update task
router.patch("/edit/:id", editTask);

//Route
router.get("/hello", async (req, res) => {
  res.send("hello world");
});

//Route to delete a task
router.delete("/delete/:id", deleteTask);

export default router;
