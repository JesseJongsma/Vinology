import { type Task } from "../../../models/Task";

export class SupabaseTaskRepository {
	async getAll(): Promise<Task[]> {
		return Promise.resolve([]);
	}

	async find(id: string): Promise<Task | null> {
		return Promise.resolve(null);
	}

	async create(): Promise<Task> {
		const task: Task = {
			id: crypto.randomUUID(),
			title: "",
			batchId: null,
			dueDate: new Date().toISOString(),
			completedAt: null,
			syncStatus: "local",
		};
		return Promise.resolve(task);
	}

	async save(task: Task): Promise<Task> {
		return Promise.resolve(task);
	}

	async delete(id: string): Promise<void> {
		return Promise.resolve();
	}
}