import type { Task } from "./task.js";
let tasks: Task[] = [];

export function addTask(task: Task): void {
    tasks.push(task);
}

export function removeTask(id: number): void {
    tasks.forEach(t => {
        console.log(t.id);
        if(t.id === id){
            tasks.splice(tasks.indexOf(t), 1);
        }
    });
}

export function filterTasks(isCompleted: boolean = true): Task[] {
    return tasks.filter(t => t.completed == isCompleted);
}


export function getAllTasks(): Task[] {
    return tasks;
}

export function setTaskCompleted(id: number, completed: boolean): void {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = completed;
    }
}