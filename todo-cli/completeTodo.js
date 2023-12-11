const args = require("minimist")(process.argv.slice(2));
const database = require("./models/index");

const completeTask = async (taskId) => {
  try {
    await database.Todo.markAsComplete(taskId);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const { id } = args;
  if (!id) {
    throw new Error("Please provide an ID.");
  }
  if (!Number.isInteger(id)) {
    throw new Error("The ID should be an integer.");
  }
  await completeTask(id);
  await database.Todo.showList();
})();
