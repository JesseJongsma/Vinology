import type { IRepository } from "./repositories/IRepository";
import type { Recipe } from "../models/Recipe";
import type { Vessel } from "../models/Vessel";
import type { Batch } from "../models/Batch";
import type { Task } from "../models/Task";

export interface IDataContext {
  recipes: IRepository<Recipe>;
  vessels: IRepository<Vessel>;
  batches: IRepository<Batch>;
  tasks: IRepository<Task>;
}