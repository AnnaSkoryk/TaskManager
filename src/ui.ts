import * as taskManager from "./taskManager.js";
import type { Task } from "./task.js";

const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const successMessage = document.getElementById("successMessage");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

let successTimeout: ReturnType<typeof setTimeout> | undefined;

if (addBtn) {
    addBtn.addEventListener("click", () => {
        modal?.classList.remove("hidden");
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        modal?.classList.add("hidden");
    });
}

if(allBtn) {
    allBtn.addEventListener("click", () => {
    renderTasks();
    });
}

//if(activeBtn){
//    activeBtn.addEventListener("click", () => {
//        renderTasks(filterTasks(false));
//    });
//}

//if(completedBtn){
//    completedBtn.addEventListener("click", () => {
//        renderTasks(filterTasks(true));
//    });
//}

if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
        const titleInput = document.getElementById("taskTitle") as HTMLInputElement;
        const descriptionInput = document.getElementById("taskDescription") as HTMLInputElement;
        const dueDateInput = document.getElementById("taskDueDate") as HTMLInputElement;
        const priorityInput = document.getElementById("taskPriority") as HTMLSelectElement;

        const newTask = {
            id: (await taskManager.getAllTasks()).length,
            title: titleInput.value,
            description: descriptionInput.value,
            dueDate: new Date(dueDateInput.value),
            priority: priorityInput.value as "low" | "medium" | "high",
            completed: false
        };

        taskManager.addTask(newTask);
        modal?.classList.add("hidden");
        titleInput.value = "";
        descriptionInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "medium";
        renderTasks();
        showSuccessMessage();
    });
}

function formatDueDate(date: Date | string | null): string {
    if (typeof date === "string") {
        date = new Date(date);
    }
    if (date === null || date === undefined) {
        return "No due date";
    }
    if (isNaN(date.getTime())) {
        return "No due date";
    }
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function createTaskElement(task: Task): HTMLLIElement {   
    const li = document.createElement("li");
    li.setAttribute("id", task.id.toString());
    if (task.completed) {
        li.classList.add("completed");
    }

    const completeLabel = document.createElement("label");
    completeLabel.className = "task-complete";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        // setTaskCompleted(task.id, checkbox.checked);
        li.classList.toggle("completed", checkbox.checked);
    });

    const completeText = document.createElement("span");
    completeText.textContent = "Completed";

    completeLabel.append(checkbox, completeText);

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("div");
    title.className = "task-title";
    title.textContent = task.title || "Untitled";

    const description = document.createElement("div");
    description.className = "task-description";
    description.textContent = task.description || "No description";

    const meta = document.createElement("div");
    meta.className = "task-meta";

    const dueDate = document.createElement("span");
    dueDate.className = "task-date";
    dueDate.textContent = `Due: ${formatDueDate(task.dueDate)}`;
    if(task.dueDate == null){
        dueDate.style.color = "#991b1b";
    }

    const priority = document.createElement("span");
    priority.className = `priority-badge priority-${task.priority}`;
    priority.textContent = task.priority;

    meta.append(dueDate, priority);
    info.append(title, description, meta);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("id", task.id.toString());
    removeBtn.type = "button";
    removeBtn.className = "btn-delete";
    removeBtn.textContent = "Remove";
    //removeBtn.addEventListener("click", () => {
    //    const task = document.querySelector("li");
    //    if(task){
    //        console.log(task);
    //        removeTask(Number(task.getAttribute("id")));
    //        renderTasks();
    //   }
    //});
    removeBtn.addEventListener("click", () => {
        //removeTask(task.id);
        taskManager.deleteTask(task.id);
        renderTasks();
    });
    actions.append(removeBtn);
    li.append(info, actions, completeLabel);
    return li;
}

async function renderTasks(tasks: Promise<Task[]> = taskManager.getAllTasks()): Promise<void> { 
    if (!taskList) return;
    taskList.replaceChildren();

    if ((await tasks).length === 0) {
        const emptyState = document.createElement("li");
        emptyState.className = "empty-state";
        emptyState.textContent = "No tasks yet. Add one to get started!";
        taskList.append(emptyState);
        return;
    }
    for (const task of await tasks) {
        taskList.append(createTaskElement(task));
    }
}


function showSuccessMessage(): void {
    if (!successMessage) return;
    successMessage.classList.remove("hidden");
    if (successTimeout) clearTimeout(successTimeout);
    successTimeout = setTimeout(() => {
        successMessage.classList.add("hidden");
    }, 2000);
}

renderTasks();