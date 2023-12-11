const TodoList = require('./path_to_TodoList');

const argv = require('minimist')(process.argv.slice(2));

const markAsComplete = async (id) => {
  try {
    TodoList.markAsComplete(id);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const { id } = argv;
  if (!id) {
    throw new Error("Need to pass an id");
  }
  if (!Number.isInteger(id)) {
    throw new Error("The id needs to be an integer");
  }
  await markAsComplete(id);
  TodoList.toDisplayableList();
})();
