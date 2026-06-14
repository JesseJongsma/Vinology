import { type IRepository } from "../IRepository";
import { type Task } from "../../../models/Task";
import { initDatabase } from "../../../db/Database";

export class SQLiteTaskRepository
  implements IRepository<Task>
{
  async getAll(): Promise<Task[]> {
	const db = await initDatabase();

	const result = await db.query(`
	  SELECT *
	  FROM tasks
	  WHERE deleted_at IS NULL
	  ORDER BY created_at DESC
	`);

	return (result.values ?? []).map(
	  this.mapTask
	);
  }

  async find(id: string): Promise<Task | null> {
	const db = await initDatabase();

	const result = await db.query(
	  `
	  SELECT *
	  FROM tasks
	  WHERE id = ?
	  LIMIT 1
	`,
	  [id]
	);

	if (!result.values?.length) {
	  return null;
	}

	return this.mapTask(result.values[0]);
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
  
		return Promise.resolve(task);
	}

  async save(task: Task): Promise<Task> {
	const db = await initDatabase();

	await db.run(
	  `
	  INSERT INTO tasks (
		id,
		title,
		batch_id,
		due_date,
		completed_at
	  )
	  VALUES (?, ?, ?, ?, ?)

	  ON CONFLICT(id)
	  DO UPDATE SET
		title = excluded.title,
		batch_id = excluded.batch_id,
		due_date = excluded.due_date,
		completed_at = excluded.completed_at
	  `,
	  [
		task.id,
		task.title,
		task.batchId,
		task.dueDate,
		task.completedAt
	  ]
	);

	return task;
  }

  async delete(id: string): Promise<void> {
	const db = await initDatabase();

	await db.run(
	  `
	  UPDATE tasks
	  SET deleted_at = ?
	  WHERE id = ?
	  `,
	  [new Date().toISOString(), id]
	);
  }

  private mapTask(row: any): Task {
	return {
	  id: row.id,
	  title: row.title,
	  batchId: row.batch_id ?? null,
	  dueDate: row.due_date ?? new Date().toISOString(),
	  completedAt: row.completed_at ?? null,
	  syncStatus: row.sync_status ?? "local"
	};
  }
}