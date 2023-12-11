const TodoList = require('./path_to_TodoList');

const argv = require('minimist')(process.argv.slice(2));

const createTodo = async (params) => {
  try {
    TodoList.addItem(params);
  } catch (error) {
    console.error(error);
  }
};

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};

(async () => {
  const { title, dueInDays } = argv;
  if (!title || dueInDays === undefined) {
    throw new Error(
      'title and dueInDays are required. \nSample command: node addTodo.js --title="Buy milk" --dueInDays=-2 '
    );
  }
  const dueDate = getJSDate(dueInDays);
  const completed = false;
  await createTodo({ title, dueDate, completed });
  TodoList.toDisplayableList();
})();
