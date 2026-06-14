import { type IDataContext } from "../IDataContext";

import { SQLiteRecipeRepository } from "../repositories/sqlite/SQLiteRecipeRepository";
import { SQLiteBatchRepository } from "../repositories/sqlite/SQLiteBatchRepository";
import { SQLiteVesselRepository } from "../repositories/sqlite/SQLiteVesselRepository";
import { SQLiteTaskRepository } from "../repositories/sqlite/SQLiteTaskRepository";

export class SQLiteDataContext
  implements IDataContext
{
  recipes = new SQLiteRecipeRepository();

  batches = new SQLiteBatchRepository();

  vessels = new SQLiteVesselRepository();

  tasks = new SQLiteTaskRepository();
}