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

  test("Check overdue tasks", async () => {
    const task = await db.Todo.addTask({ title: "Sample Task", dueDate: calculateDueDate(-2), completed: false });
    const overdueTasks = await db.Todo.overdue();
    expect(overdueTasks.length).toBe(1);
  });

  test("Check tasks due today", async () => {
    const tasksDueToday = await db.Todo.dueToday();
    const task = await db.Todo.addTask({ title: "Another Sample Task", dueDate: calculateDueDate(0), completed: false });
    const tasksToday = await db.Todo.dueToday();
    expect(tasksToday.length).toBe(tasksDueToday.length + 1);
  });

  test("Check tasks due later", async () => {
    const tasksDueLater = await db.Todo.dueLater();
    const task = await db.Todo.addTask({ title: "Yet Another Task", dueDate: calculateDueDate(2), completed: false });
    const laterTasks = await db.Todo.dueLater();
    expect(laterTasks.length).toBe(tasksDueLater.length + 1);
  });

  test("Mark a task as completed", async () => {
    const overdueTasks = await db.Todo.overdue();
    const aTask = overdueTasks[0];
    expect(aTask.completed).toBe(false);
    await db.Todo.markAsComplete(aTask.id);
    await aTask.reload();
    expect(aTask.completed).toBe(true);
  });

  test("Display formatted string for completed past-due item", async () => {
    const overdueTasks = await db.Todo.overdue();
    const aTask = overdueTasks[0];
    expect(aTask.completed).toBe(true);
    const displayValue = aTask.displayString();
    expect(displayValue).toBe(`${aTask.id}. [x] ${aTask.title} ${aTask.dueDate}`);
  });

  test("Display formatted string for an incomplete future task", async () => {
    const dueLaterTasks = await db.Todo.dueLater();
    const aTask = dueLaterTasks[0];
    expect(aTask.completed).toBe(false);
    const displayValue = aTask.displayString();
    expect(displayValue).toBe(`${aTask.id}. [ ] ${aTask.title} ${aTask.dueDate}`);
  });

  test("Display formatted string for an incomplete task due today", async () => {
    const dueTodayTasks = await db.Todo.dueToday();
    const aTask = dueTodayTasks[0];
    expect(aTask.completed).toBe(false);
    const displayValue = aTask.displayString();
    expect(displayValue).toBe(`${aTask.id}. [ ] ${aTask.title}`);
  });

  test("Display formatted string for a completed task due today", async () => {
    const dueTodayTasks = await db.Todo.dueToday();
    const aTask = dueTodayTasks[0];
    expect(aTask.completed).toBe(false);
    await db.Todo.markAsComplete(aTask.id);
    await aTask.reload();
    const displayValue = aTask.displayString();
    expect(displayValue).toBe(`${aTask.id}. [x] ${aTask.title}`);
  });
});
