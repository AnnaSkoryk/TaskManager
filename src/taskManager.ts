import type { Task } from "./task.js";

export function filterTasks(isCompleted: boolean = true): Task[] {
    const tasks = getAllTasks(); 
    return tasks.filter(t => t.completed == isCompleted);
}

export function setTaskCompleted(id: number | string, completed: boolean): void {
    const tasks = getAllTasks(); 
    const task = tasks.find(t => t.id === id);
    if (task) {
        mySyncFetch(`http://localhost:3000/tasks/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: completed})
      });
    }
}

function mySyncFetch( url: string,
                      options: { method?: string; headers?: Record<string, string>; body?: string } = {} ): string {
  const xhr = new XMLHttpRequest();
  xhr.open(options.method ?? "GET", url, false); // 'false' = synchronous

  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      xhr.setRequestHeader(key, value);
    }
  }
  xhr.send(options.body ?? null);

  if (xhr.status < 200 || xhr.status >= 300) {
    throw new Error(`mySyncFetch failed: ${xhr.status} ${xhr.statusText}\n${xhr.responseText}`);
  }
  return xhr.responseText;
}

export function addTask(task: Task) {
  let awaitTasks = getAllTasks();
  awaitTasks.push(task);
  let text = JSON.stringify(task);

  try {
    mySyncFetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: text
    });
  } catch (err) {
    console.error("addTask request failed:", err);
  }
}

export function deleteTask(id: number) {
    mySyncFetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    });
}

export function getAllTasks(): Task[] {
    let jsonStr = mySyncFetch("http://localhost:3000/tasks");
    let tasks = JSON.parse(jsonStr);
    return tasks ?? [];
}
