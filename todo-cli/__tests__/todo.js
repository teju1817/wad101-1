const db = require("../models");

const calculateDueDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Days must be an integer");
  }
  const currentDate = new Date();
  const oneDayMilliseconds = 60 * 60 * 24 * 1000;
  return new Date(currentDate.getTime() + days * oneDayMilliseconds);
};

describe("Tests for functions in todo.js", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Test to add a todo", async () => {
    const newTask = {
      title: "New Task",
      dueDate: calculateDueDate(3),
      completed: false,
    };
    const addedTask = await db.Todo.addTask(newTask);
    expect(addedTask.title).toBe(newTask.title);
    expect(addedTask.dueDate.getTime()).toBe(newTask.dueDate.getTime());
    expect(addedTask.completed).toBe(false);
  });

  test("Test to mark a todo as complete", async () => {
    const newTask = {
      title: "Task to Mark Complete",
      dueDate: calculateDueDate(2),
      completed: false,
    };
    const addedTask = await db.Todo.addTask(newTask);
    await db.Todo.markAsComplete(addedTask.id);
    const markedTask = await db.Todo.getTaskById(addedTask.id);
    expect(markedTask.completed).toBe(true);
  });

  test("Test to retrieve overdue items", async () => {
    const overdueTasks = await db.Todo.overdue();
    expect(Array.isArray(overdueTasks)).toBe(true);
    for (const task of overdueTasks) {
      expect(task.dueDate < new Date()).toBe(true);
    }
  });

  test("Test to retrieve due today items", async () => {
    const todayTasks = await db.Todo.dueToday();
    expect(Array.isArray(todayTasks)).toBe(true);
    const currentDate = new Date();
    for (const task of todayTasks) {
      const dueDate = new Date(task.dueDate);
      expect(dueDate.toDateString()).toBe(currentDate.toDateString());
    }
  });

  test("Test to retrieve due later items", async () => {
    const laterTasks = await db.Todo.dueLater();
    expect(Array.isArray(laterTasks)).toBe(true);
    for (const task of laterTasks) {
      expect(task.dueDate > new Date()).toBe(true);
    }
  });
});
