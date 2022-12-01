const httpStatus = require('http-status');
const Task = require('../models/task.model.js');
const CustomError = require('../globals/utility/CustomError.js');
const asyncHandler = require('../globals/middlewares/asyncHandler.js');
const AdvanceApi = require('../globals/utility/advanceApi.js');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res, next) => {
  // get tasks
  const advanceResults = new AdvanceApi(
    Task.find({
      user: req.user.id
    }),
    req.query
  )
    .limitFields()
    .paginate()
    .sort();

  const tasks = await advanceResults.query;
  if (!tasks) return next(new CustomError(httpStatus.BAD_REQUEST, 'No task found'));

  // Final result
  res.status(httpStatus.OK).json({ success: true, result: tasks });
});

// @desc    Create task
// @route   POST /api/v1/tasks
// @access  Private
const createTask = asyncHandler(async (req, res, next) => {
  // create a task
  const task = await Task.create({
    task: req.body.task,
    user: req.user.id
  });

  if (!task) return next(new CustomError(httpStatus.BAD_REQUEST, 'Something went wrong'));

  // get all tasks
  const allTasks = await Task.find({ $and: [{ user: req.user.id }] });

  // Final result
  res.status(httpStatus.OK).json({ success: true, result: allTasks });
});

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res, next) => {
  // Check if task exists then update
  const task = await Task.findOneAndUpdate(
    {
      $and: [{ _id: req.params.id, user: req.user.id }]
    },
    {
      task: req.body.task,
      isComplete: req.body.isComplete
    },
    {
      runValidators: true,
      returnNewDocument: true
    }
  );

  if (!task) return next(new CustomError(httpStatus.NOT_FOUND, 'No such task found'));

  // get all tasks
  const allTasks = await Task.find({ $and: [{ user: req.user.id }] });

  // Final result
  res.status(httpStatus.OK).json({ success: true, result: allTasks });
});

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res, next) => {
  // Check if task exists then update
  const task = await Task.findOneAndDelete({
    $and: [{ _id: req.params.id, user: req.user.id }]
  });
  if (!task) return next(new CustomError(httpStatus.NOT_FOUND, 'No such task found'));

  // get all tasks
  const allTasks = await Task.find({ $and: [{ user: req.user.id }] });

  // Final result
  res.status(httpStatus.OK).json({ success: true, result: allTasks });
});

// @desc    Get dashboard tasks
// @route   GET /api/v1/tasks/dashboard
// @access  Private
const dashboardTasks = asyncHandler(async (req, res, next) => {
  // dashboard related data
  const competedTasks = await Task.find({ $and: [{ user: req.user.id, isComplete: true }] }).count();
  const inCompleteTasks = await Task.find({ $and: [{ user: req.user.id, isComplete: false }] }).count();
  const totalTasks = await Task.find({ $and: [{ user: req.user.id }] }).sort('-updatedAt');
  const latestTasks = await Task.find({ $and: [{ user: req.user.id }] }).limit(5);

  // assemble data
  const results = {
    competedTasks,
    inCompleteTasks,
    totalTasks: totalTasks.length,
    latestTask: latestTasks
  };

  // Final result
  res.status(httpStatus.OK).json({ success: true, result: results });
});

const taskController = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  dashboardTasks
};
module.exports = taskController;
