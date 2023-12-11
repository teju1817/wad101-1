const args = require("minimist")(process.argv.slice(2));
const database = require("./models/index");

const addTodo = async (params) => {
  try {
    await database.Todo.addTask(params);
  } catch (error) {
    console.error(error);
  }
};

const calculateDueDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Days should be an integer.");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};

(async () => {
  const { title, dueInDays } = args;
  if (!title || dueInDays === undefined) {
    throw new Error(
      'Both title and dueInDays are required. \nExample: node addTodo.js --title="Buy groceries" --dueInDays=2'
    );
  }
  
  const dueDate = calculateDueDate(dueInDays);
  await addTodo({
    title,
    dueDate,
    completed: false
  });

  await database.Todo.showList();
})();
