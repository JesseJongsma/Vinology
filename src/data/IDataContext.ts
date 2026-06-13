import type { IRepository } from "./repositories/IRepository";
import type { Recipe } from "../models/Recipe";
import type { Vessel } from "../models/Vessel";
import type { Batch } from "../models/Batch";

export interface IDataContext {
  recipes: IRepository<Recipe>;
  vessels: IRepository<Vessel>;
  batches: IRepository<Batch>;
}