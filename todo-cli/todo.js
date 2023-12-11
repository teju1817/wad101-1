const TodoList = () => {
  const allItems = [];

  const addItem = (todoItem) => {
    allItems.push(todoItem);
  };

  const markAsComplete = (index) => {
    allItems[index].completed = true;
  };

  const formattedDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const getOverdue = () => {
    const today = new Date().toISOString().split("T")[0];
    return allItems.filter((item) => !item.completed && item.dueDate < today);
  };

  const getDueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return allItems.filter((item) => item.dueDate === today);
  };

  const getDueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return allItems.filter((item) => !item.completed && item.dueDate > today);
  };

  const toDisplayableList = () => {
    const overdueList = getOverdue();
    const dueTodayList = getDueToday();
    const dueLaterList = getDueLater();

    console.log(`My Todo-list\n`);
    console.log(`Overdue\n${overdueList.map(item => `[ ] ${item.title} ${formattedDate(item.dueDate)}`).join('\n')}\n`);
    console.log(`Due Today\n${dueTodayList.map(item => `[x] ${item.title}`).join('\n')}\n`);
    console.log(`Due Later\n${dueLaterList.map(item => `[ ] ${item.title} ${formattedDate(item.dueDate)}`).join('\n')}`);
  };

  return {
    addItem,
    markAsComplete,
    toDisplayableList,
  };
};

module.exports = TodoList;
