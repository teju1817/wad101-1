/* eslint-disable no-undef */
const database = require("../models");

const calculateDueDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Days must be an integer");
  }
  const currentDate = new Date();
  const oneDayMilliseconds = 60 * 60 * 24 * 1000;
  return new Date(currentDate.getTime() + days * oneDayMilliseconds);
}

describe("Tests for functions in todo.js", function () {
  beforeAll(async () => {
    await database.sequelize.sync({ force: true })
  });

  test("Should return all overdue tasks (including completed ones)", async () => {
    const taskOne = await database.Todo.addTask({ title: "Sample Task", dueDate: calculateDueDate(-2), completed: false });
    const overdueTasks = await database.Todo.overdue();
    expect(overdueTasks.length).toBe(1);
  });

  test("Should return tasks due today (including completed ones)", async () => {
    const tasksDueToday = await database.Todo.dueToday();
    const taskTwo = await database.Todo.addTask({ title: "Another Sample Task", dueDate: calculateDueDate(0), completed: false });
    const tasksToday = await database.Todo.dueToday();
    expect(tasksToday.length).toBe(tasksDueToday.length + 1);
  });

  test("Should return tasks due later (including completed ones)", async () => {
    const tasksDueLater = await database.Todo.dueLater();
    const taskThree = await database.Todo.addTask({ title: "Yet Another Task", dueDate: calculateDueDate(2), completed: false });
    const laterTasks = await database.Todo.dueLater();
    expect(laterTasks.length).toBe(tasksDueLater.length + 1);
  });

  test("Should change the `completed` property of a task to `true`", async () => {
    const overdueTasks = await database.Todo.overdue()
    const aTask = overdueTasks[0];
    expect(aTask.completed).toBe(false);
    await database.Todo.markAsComplete(aTask.id);
    await aTask.reload();

    expect(aTask.completed).toBe(true);
  })

  test("For a completed past-due item, display a formatted string", async () => {
    const overdueTasks = await database.Todo.overdue()
    const aTask = overdueTasks[0];
    expect(aTask.completed).toBe(true);
    const displayValue = aTask.displayString()
    expect(displayValue).toBe(`${aTask.id}. [x] ${aTask.title} ${aTask.dueDate}`)
  })

  test("For an incomplete future task, display a formatted string", async () => {
    const dueLaterTasks = await database.Todo.dueLater()
    const aTask = dueLaterTasks[0];
    expect(aTask.completed).toBe(false);
    const displayValue = aTask.displayString()
    expect(displayValue).toBe(`${aTask.id}. [ ] ${aTask.title} ${aTask.dueDate}`)
  })

  test("For an incomplete task due today, display a formatted string", async () => {
    const dueTodayTasks = await database.Todo.dueToday()
    const aTask = dueTodayTasks[0];
    expect(aTask.completed).toBe(false);
    const displayValue = aTask.displayString()
    expect(displayValue).toBe(`${aTask.id}. [ ] ${aTask.title}`)
  })

  test("For a completed task due today, display a formatted string", async () => {
    const dueTodayTasks = await database.Todo.dueToday()
    const aTask = dueTodayTasks[0];
    expect(aTask.completed).toBe(false);
    await database.Todo.markAsComplete(aTask.id);
    await aTask.reload();
    const displayValue = aTask.displayString()
    expect(displayValue).toBe(`${aTask.id}. [x] ${aTask.title}`)
  })
});
