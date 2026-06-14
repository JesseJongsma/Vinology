import { type IDataContext } from "../IDataContext";

import { DummyRecipeRepository } from "../repositories/dummy/DummyRecipeRepository";
import { DummyBatchRepository } from "../repositories/dummy/DummyBatchRepository";
import { DummyVesselRepository } from "../repositories/dummy/DummyVesselRepository";
import { DummyTaskRepository } from "../repositories/dummy/DummyTaskRepository";

export class DummyDataContext
  implements IDataContext
{
  recipes = new DummyRecipeRepository();

  batches = new DummyBatchRepository();

  vessels = new DummyVesselRepository();

  tasks = new DummyTaskRepository();
}