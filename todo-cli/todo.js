const todoList = {
  all: [],
  addItem: function (todoItem) {
    this.all.push(todoItem);
  },
  markAsComplete: function (index) {
    this.all[index].completed = true;
  },
  formattedDate: function (d) {
    return d.toISOString().split("T")[0];
  },
  overdue: function () {
    const today = new Date().toISOString().split('T')[0];
    return this.all.filter(item => !item.completed && item.dueDate < today);
  },
  dueToday: function () {
    const today = new Date();
    const todayFormatted = this.formattedDate(today);
    return this.all.filter(item => item.dueDate === todayFormatted);
  },
  dueLater: function () {
    const today = new Date().toISOString().split('T')[0];
    return this.all.filter(item => !item.completed && item.dueDate > today);
  },
  toDisplayableList: function () {
    const today = new Date().toISOString().split('T')[0];
    const displayableList = this.all.map(item =>
      `${item.completed ? "[x]" : "[ ]"} ${item.title}${item.dueDate === today ? "" : " " + item.dueDate}`
    ).join("\n");
    console.log(displayableList);
  }
};

module.exports = todoList;
