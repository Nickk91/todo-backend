import STATUS_CODE from "../constants/statusCodes.js";
import Task from "../models/taskModel.js";

// getAllTasks,
//     getTaskById,
//     createTask,
//     deleteTask,


export const createTask = async (req, res) => {
  try {
    const user = await Task.create(req.body);
    res.status(STATUS_CODE.CREATED).send(user);
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// @des get all tasks
// @route GET / api/n
// @access Public
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

export const getTasksById = async (req, res) => {
  try {
    const task = await Task.findOne(req.params.userId);
    if (!task) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Task was not found");
    }

    res.send(task);
  } catch (error) {
    console.log("Error fetching task", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// router.put("/:userId/update-credit", updateCredit);
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (+req.query.Id < 0) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please enter a positive number");
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { name: +req.query.name } },
      { $set: { description: +req.query.description } },
      { $set: { id: +req.query.id } },
      { completed: true }
    );

    res.status(STATUS_CODE.OK).send(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// /:id/deposit"
// router.put("/:userId/deposit", depositToUser);
export const depositToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`userId`, userId);
    if (+req.query.deposit < 0) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please enter a positive number");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { cash: ++req.query.deposit } },
      { new: true }
    );

    res.status(STATUS_CODE.OK).send(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// router.put("/:userId/withdraw", withdrawMoney );
export const withdrawMoney = async (req, res) => {
  try {
    const { userId } = req.params;
    if (+req.query.withdraw < 0) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please enter a positive number");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,

      { $inc: { cash: -req.query.withdraw-- } },
      { new: true }
    );

    res.status(STATUS_CODE.OK).send(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// // @des update credit to user
// // @route PUT / api/:userId/update-credit
// // @access Public
export const updateCreditToUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { credit } = req.body;

    if (!userId || !credit || credit <= 0) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "Please provide a valid 'userId' and a positive 'credit' value"
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { credit: credit } },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error(`User with ID ${userId} not found`);
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
};

// // @des update filter to user
// // @route GET /:min/:max/filter
// // @access Public

export const filterUsersByCashAmount = async (req, res, next) => {
  try {
    const minCashAmount = +req.params.min;
    const maxCashAmount = +req.params.max;

    const usersWithinCashRange = await User.find({
      cash: { $gte: minCashAmount, $lte: maxCashAmount },
    });

    res.status(STATUS_CODE.OK).json(usersWithinCashRange);
  } catch (error) {
    console.error("Error fetching users by cash range:", error);
    res.status(STATUS_CODE.NOT_FOUND).json({ error: "Not Found" });
  }
};