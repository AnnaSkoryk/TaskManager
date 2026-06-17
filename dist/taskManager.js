const localStorageKey = "tasks";
export function addTask(task) {
    const tasks = getAllTasks();
    tasks.push(task);
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}
export function removeTask(id) {
    const tasks = getAllTasks().filter(t => t.id !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}
export function filterTasks(isCompleted = true) {
    const tasks = getAllTasks();
    return tasks.filter(t => t.completed == isCompleted);
}
export function getAllTasks() {
    const stored = localStorage.getItem(localStorageKey);
    console.log(stored?.length);
    return stored ? JSON.parse(stored) : [];
}
export function setTaskCompleted(id, completed) {
    const tasks = getAllTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = completed;
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    }
}
//# sourceMappingURL=taskManager.js.map