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
    const today = new Date();
    const todayFormatted = formattedDate(today);
    const dueTodayItems = allItems.filter(
      (item) => item.dueDate === todayFormatted
    );
    return dueTodayItems;
  };

  const getDueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return allItems.filter(
      (item) => !item.completed && item.dueDate > today
    );
  };

  const formatDisplayableList = (list) => {
    const today = new Date().toISOString().split("T")[0];
    return list
      .map((item) => {
        const dateDisplay = item.dueDate === today ? "" : ` ${item.dueDate}`;
        return `${item.completed ? "[x]" : "[ ]"} ${item.title}${dateDisplay}`;
      })
      .join("\n");
  };

  return {
    allItems,
    addItem,
    markAsComplete,
    getOverdue,
    getDueToday,
    getDueLater,
    formatDisplayableList,
  };
};

module.exports = TodoList;
