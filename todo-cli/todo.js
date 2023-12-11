const TodoList = () => {
  const allItems = [];

  const addItem = (todoItem) => {
    allItems.push(todoItem);
  };

  const markAsComplete = (index) => {
    allItems[index].completed = true;
  };

  const formattedDate = (date) => {
    return date.toISOString().split("T")[0];
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

    const overdueDisplay = overdueList.length
      ? `\nOverdue\n${overdueList
          .map(
            (item) =>
              `[ ] ${item.title} ${formattedDate(item.dueDate)}\n`
          )
          .join("")}`
      : "";

    const dueTodayDisplay = dueTodayList.length
      ? `\nDue Today\n${dueTodayList
          .map((item) => `[x] ${item.title}\n`)
          .join("")}`
      : "";

    const dueLaterDisplay = dueLaterList.length
      ? `\nDue Later\n${dueLaterList
          .map(
            (item) =>
              `[ ] ${item.title} ${formattedDate(item.dueDate)}\n`
          )
          .join("")}`
      : "";

    console.log(`My Todo-list${overdueDisplay}${dueTodayDisplay}${dueLaterDisplay}`);
  };

  return {
    addItem,
    markAsComplete,
    toDisplayableList,
  };
};

module.exports = TodoList;
