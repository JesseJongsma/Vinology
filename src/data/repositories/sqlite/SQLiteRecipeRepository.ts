import { type IRepository } from "../IRepository";
import { type Recipe } from "../../../models/Recipe";
import { initDatabase } from "../../../db/Database";

export class SQLiteRecipeRepository
  implements IRepository<Recipe>
{
  async getAll(): Promise<Recipe[]> {
    const db = await initDatabase();

    const result = await db.query(`
      SELECT *
      FROM recipes
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `);

    return (result.values ?? []).map(
      this.mapRecipe
    );
  }

  async find(id: string): Promise<Recipe | null> {
    const db = await initDatabase();

    const result = await db.query(
      `
      SELECT *
      FROM recipes
      WHERE id = ?
      LIMIT 1
    `,
      [id]
    );

    if (!result.values?.length) {
      return null;
    }

    return this.mapRecipe(result.values[0]);
  }

  create(): Promise<Recipe> {
		const recipe: Recipe = {
			id: crypto.randomUUID(),
			name: "",
			type: "",
			description: null,
			estimatedDays: null,
			targetAbv: null,
			isPublic: false,
			createdAt: new Date().toISOString(),
			syncStatus: "local"
		};
  
		return Promise.resolve(recipe);
	}

  async save(recipe: Recipe): Promise<Recipe> {
    const db = await initDatabase();

    await db.run(
      `
      INSERT INTO recipes (
        id,
        name,
        type,
        description,
        estimated_days,
        target_abv,
        is_public,
        created_at,
        updated_at,
        sync_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

      ON CONFLICT(id)
      DO UPDATE SET
        name = excluded.name,
        type = excluded.type,
        description = excluded.description,
        estimated_days = excluded.estimated_days,
        target_abv = excluded.target_abv,
        is_public = excluded.is_public,
        updated_at = excluded.updated_at,
        sync_status = excluded.sync_status
      `,
      [
        recipe.id,
        recipe.name,
        recipe.type,
        recipe.description,
        recipe.estimatedDays,
        recipe.targetAbv,
        recipe.isPublic ? 1 : 0,
        recipe.createdAt,
        recipe.updatedAt,
        recipe.syncStatus,
      ]
    );

    return recipe;
  }

  async delete(id: string): Promise<void> {
    const db = await initDatabase();

    await db.run(
      `
      UPDATE recipes
      SET deleted_at = ?
      WHERE id = ?
      `,
      [new Date().toISOString(), id]
    );
  }

  private mapRecipe(row: any): Recipe {
    return {
      id: row.id,
      name: row.name,
      type: row.type,
      description: row.description ?? "",

      estimatedDays: row.estimated_days ?? 0,
      targetAbv: row.target_abv ?? 0,

      isPublic: row.is_public === 1,

      createdAt: row.created_at,
      updatedAt: row.updated_at,

      syncStatus: row.sync_status,
    };
  }
}