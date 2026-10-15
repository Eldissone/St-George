class ListProducts {
  constructor(repository) { this.repository = repository; }
  execute() { return this.repository.listPublished(); }
}
module.exports = { ListProducts };
