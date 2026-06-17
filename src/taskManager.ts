import type { Task } from "./task.js";
const localStorageKey = "tasks";

export function addTask(task: Task): void {
    const tasks = getAllTasks(); 
    tasks.push(task);
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

export function removeTask(id: number): void {
    const tasks = getAllTasks().filter(t => t.id !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

export function filterTasks(isCompleted: boolean = true): Task[] {
    const tasks = getAllTasks(); 
    return tasks.filter(t => t.completed == isCompleted);
}

export function getAllTasks(): Task[] {
    const stored = localStorage.getItem(localStorageKey);
    console.log(stored?.length);
    return stored ? JSON.parse(stored) : [];
}

export function setTaskCompleted(id: number, completed: boolean): void {
    const tasks = getAllTasks(); 
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = completed;
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    }
}