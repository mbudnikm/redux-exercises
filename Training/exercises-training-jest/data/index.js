module.exports = {
  // fakes
  getTodos: () => require('./todos.json'),
  async__getTodoById: (id) => Promise.resolve(require('./todos.json').find(el => el.id === id)),
}
