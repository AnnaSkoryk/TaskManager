//const localStorageKey = "tasks";
//export function addTask(task: Task): void {
//    const tasks = getAllTasks(); 
//    tasks.push(task);
//    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
//}
//    export function removeTask(id: number): void {
//    const tasks = getAllTasks().filter(t => t.id !== id);
//    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
//}
//export function getAllTasks(): Task[] {
//    const stored = localStorage.getItem(localStorageKey);
//    console.log(stored?.length);
//    return stored ? JSON.parse(stored) : [];
///}
//export function filterTasks(isCompleted: boolean = true): Task[] {
//    const tasks = getAllTasks(); 
//    return tasks.filter(t => t.completed == isCompleted);
//}
//export function setTaskCompleted(id: number, completed: boolean): void {
//    const tasks = getAllTasks(); 
//    const task = tasks.find(t => t.id === id);
//    if (task) {
//        task.completed = completed;
//        //localStorage.setItem(localStorageKey, JSON.stringify(tasks));
//    }
//}
export async function addTask(task) {
    const tasks = getAllTasks();
    (await tasks).push(task);
    await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tasks })
    });
}
export async function deleteTask(id) {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
    });
}
export async function loadTasks() {
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();
    console.log(data);
}
export async function getAllTasks() {
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();
    console.log(data);
    return data ?? [];
}
//# sourceMappingURL=taskManager.js.map