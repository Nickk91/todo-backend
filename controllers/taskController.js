import STATUS_CODE from "../constants/statusCodes.js";
import Task from "../models/taskModel.js";

// router.post("/create", createTask);
export const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const task = await Task.create(req.body);
    res.status(STATUS_CODE.CREATED).send(task);
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @des get all tasks
// @route GET / api/n
// @access Public
// router.get("/", getAllTasks);
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    console.log("Error fetching tasks", error);
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// @des get all tasks
// @route GET / api/n
// @access Public

// router.put("/edit/:id", editTask);
export const editTask = async (req, res) => {
  try {
    console.log("IM EDITING");
    const { id } = req.params;
    const { name, description, completed } = req.body;
    if (!name && !description) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .send("Please provide name or description to update.");
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedTask) {
      res.status(STATUS_CODE.NOT_FOUND).send("Task not found.");
      return;
    }

    res.status(STATUS_CODE.OK).send(updatedTask);
  } catch (error) {
    console.error("Error editing task:", error);
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send("Internal server error.");
  }
};

export const deleteTask = async (req, res) => {
  try {
    console.log(req);
    const id = req.params.id;
    const result = await Task.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).send("Task not found.");
      return;
    }

    res.send({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal server error.");
  }
};
