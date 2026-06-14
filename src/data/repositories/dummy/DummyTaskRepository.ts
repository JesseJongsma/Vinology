import { type IRepository } from "../IRepository";
import { type Task } from "../../../models/Task";

export class DummyTaskRepository
	implements IRepository<Task> {

	private tasks: Task[] = [];

	async getAll(): Promise<Task[]> {
		return [...this.tasks];
	}

	async find(id: string): Promise<Task | null> {
		return this.tasks.find((t) => t.id === id) ?? null;
	}

	create(): Promise<Task> {
		const task: Task = {
			id: crypto.randomUUID(),
			title: "",
			batchId: null,
			dueDate: new Date().toISOString(),
			completedAt: null,
			syncStatus: "local"
		};
		this.tasks.push(task);
		return Promise.resolve(task);
	}

	async save(task: Task): Promise<Task> {
		const index = this.tasks.findIndex(
			(t) => t.id === task.id
		);

		if (index >= 0) {
			this.tasks[index] = task;
		} else {
			this.tasks.push(task);
		}

		return task;
	}

	async delete(id: string): Promise<void> {
		this.tasks = this.tasks.filter(
			(task) => task.id !== id
		);
	}
}