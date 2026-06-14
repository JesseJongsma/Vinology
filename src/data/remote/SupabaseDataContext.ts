import type { IDataContext } from "../IDataContext";

import { SupabaseRecipeRepository } from "../repositories/supabase/SupabaseRecipeRepository";
import { SupabaseBatchRepository } from "../repositories/supabase/SupabaseBatchRepository";
import { SupabaseVesselRepository } from "../repositories/supabase/SupabaseVesselRepository";
import { SupabaseTaskRepository } from "../repositories/supabase/SupabaseTaskRepository";

export class SupabaseDataContext implements IDataContext {
  public readonly recipes;
  public readonly batches;
  public readonly vessels;
  public readonly tasks;

  constructor() {
    this.recipes = new SupabaseRecipeRepository();
    this.batches = new SupabaseBatchRepository();
    this.vessels = new SupabaseVesselRepository();
	this.tasks = new SupabaseTaskRepository();
  }
}