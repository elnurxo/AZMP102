export class TodoItem {
  constructor(title) {
    this.title = title;
    this.id = Date.now();
    this.isCompleted = false;
  }
}
