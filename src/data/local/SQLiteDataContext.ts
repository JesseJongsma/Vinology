import { type IDataContext } from "../IDataContext";

import { SQLiteRecipeRepository } from "../repositories/sqlite/SQLiteRecipeRepository";
import { SQLiteBatchRepository } from "../repositories/sqlite/SQLiteBatchRepository";
import { SQLiteVesselRepository } from "../repositories/sqlite/SQLiteVesselRepository";

export class SQLiteDataContext
  implements IDataContext
{
  recipes = new SQLiteRecipeRepository();

  batches = new SQLiteBatchRepository();

  vessels = new SQLiteVesselRepository();
}