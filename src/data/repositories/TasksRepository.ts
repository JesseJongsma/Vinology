// import { initDatabase, saveDatabaseToStore } from "../../db/Database";
// import { type Task } from "../../models/Task";


// export async function getTasks(): Promise<Task[]> {
//   const db = await initDatabase();

//   const result = await db.query(`
//     SELECT
//       tasks.*,
//       batches.name AS batch_name
//     FROM tasks
//     LEFT JOIN batches ON batches.id = tasks.batch_id
//     WHERE tasks.deleted_at IS NULL
//     ORDER BY tasks.due_date ASC;
//   `);

//   return (result.values ?? []).map((row: any) => ({
//     id: row.id,
//     title: row.title,
//     batchId: row.batch_id,
//     batchName: row.batch_name,
//     dueDate: row.due_date,
//     completedAt: row.completed_at,
//   }));
// }

// export async function createTask(input: {
//   title: string;
//   batchId?: string;
//   dueDate: string;
// }): Promise<Task> {
//   const db = await initDatabase();
//   const now = new Date().toISOString();

//   const task: Task = {
//     id: crypto.randomUUID(),
//     title: input.title,
//     batchId: input.batchId ?? null,
//     dueDate: input.dueDate,
//   };

//   await db.run(
//     `
//       INSERT INTO tasks (
//         id, title, batch_id, due_date, completed_at,
//         created_at, updated_at, deleted_at, sync_status
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `,
//     [
//       task.id,
//       task.title,
//       task.batchId,
//       task.dueDate,
//       null,
//       now,
//       now,
//       null,
//       "pending",
//     ]
//   );

//   await saveDatabaseToStore();
//   return task;
// }