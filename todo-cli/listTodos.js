const database = require("./models/index");

const displayTodoList = async () => {
  try {
    await database.Todo.showList();
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await displayTodoList();
})();
