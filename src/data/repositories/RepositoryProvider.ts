import { DummyRecipeRepository } from "./dummy/DummyRecipeRepository";
import { SQLiteRecipeRepository } from "./sqlite/SQLiteRecipeRepository";

import type { IRepository } from "./IRepository";
import type { Recipe } from "../../models/Recipe";

type RepositoryProvider = {
  recipes: IRepository<Recipe>;
};

const useDummyData =
  import.meta.env.VITE_DATA_SOURCE === "dummy";

export const repositories: RepositoryProvider = {
  recipes: useDummyData
    ? new DummyRecipeRepository()
    : new SQLiteRecipeRepository(),
};