let tasks = [];
export function addTask(task) {
    tasks.push(task);
}
export function removeTask(id) {
    tasks.forEach(t => {
        console.log(t.id);
        if (t.id === id) {
            tasks.splice(tasks.indexOf(t), 1);
        }
    });
}
export function filterTasks(isCompleted = true) {
    return tasks.filter(t => t.completed == isCompleted);
}
export function getAllTasks() {
    return tasks;
}
export function setTaskCompleted(id, completed) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = completed;
    }
}
//# sourceMappingURL=taskManager.js.map