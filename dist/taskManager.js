export function filterTasks(isCompleted = true) {
    const tasks = getAllTasks();
    return tasks.filter(t => t.completed == isCompleted);
}
export function setTaskCompleted(id, completed) {
    const tasks = getAllTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        mySyncFetch(`http://localhost:3000/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: completed })
        });
    }
}
function mySyncFetch(url, options = {}) {
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
export function addTask(task) {
    let awaitTasks = getAllTasks();
    awaitTasks.push(task);
    let text = JSON.stringify(task);
    try {
        mySyncFetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: text
        });
    }
    catch (err) {
        console.error("addTask request failed:", err);
    }
}
export function deleteTask(id) {
    mySyncFetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
    });
}
export function getAllTasks() {
    let jsonStr = mySyncFetch("http://localhost:3000/tasks");
    let tasks = JSON.parse(jsonStr);
    return tasks ?? [];
}
//# sourceMappingURL=taskManager.js.map