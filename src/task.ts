export interface Task{
    id: number;
    title: string;
    description: string;
    dueDate : Date | null;
    priority: "low" | "medium" | "high";
    completed: boolean;
}