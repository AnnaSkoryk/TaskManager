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
export function filterTasks(isCompleted = true) {
    const tasks = getAllTasks();
    return tasks.filter(t => t.completed == isCompleted);
}
export function setTaskCompleted(id, completed) {
    const tasks = getAllTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = completed;
        let text = JSON.stringify(tasks);
        mySyncFetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: text
        });
        //localStorage.setItem(localStorageKey, JSON.stringify(tasks));
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
    //console.log(1111);
    //const awaitTasks = await getAllTasks(); 
    //console.log(4444);
    //
    //awaitTasks.push(task);
    //const text = JSON.stringify(awaitTasks);
    //console.log(text);
    //await fetch("http://localhost:3000/tasks", {
    //  method: "POST",
    //  headers: {
    //    "Content-Type": "application/json"
    //  },
    //  body: text
    //});
    let awaitTasks = getAllTasks();
    awaitTasks.push(task);
    //let text = JSON.stringify(awaitTasks);
    let text = JSON.stringify(task);
    console.log("text to POST (addTask method) :");
    console.log(text);
    mySyncFetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: text
    });
}
export function deleteTask(id) {
    mySyncFetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
    });
}
//export function loadTasks() {
//    const res =wait fetch("http://localhost:3000/tasks");
//    const data = await res.json();
//    console.log(data);
//}
export function getAllTasks() {
    let jsonStr = mySyncFetch("http://localhost:3000/tasks");
    let tasks = JSON.parse(jsonStr);
    console.log('getAllTasks:');
    console.log(tasks);
    return tasks ?? [];
}
//# sourceMappingURL=taskManager.js.map