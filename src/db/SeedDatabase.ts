import { getVessels, createVessel } from "../data/repositories/VesselsRepository";
import { getRecipes, createRecipe } from "../data/repositories/RecipesRepository";
import { getBatches, createBatch } from "../data/repositories/BatchesRepository";
import { getTasks, createTask } from "../data/repositories/TasksRepository";

export async function seedDatabaseIfEmpty() {
  const vessels = await getVessels();
  const recipes = await getRecipes();
  const batches = await getBatches();
  const tasks = await getTasks();

  if (vessels.length === 0) {
    await createVessel({
      name: "Carboy #1",
      type: "Glass carboy",
      volumeLiters: 5,
    });

    await createVessel({
      name: "Demijohn #1",
      type: "Demijohn",
      volumeLiters: 5,
    });
  }

  if (recipes.length === 0) {
    await createRecipe({
      name: "Blackberry Melomel",
      type: "melomel",
      description: "A rich berry mead with wildflower honey and blackberries.",
      estimatedDays: 45,
      targetAbv: 12,
    });
  }

  if (batches.length === 0) {
    const updatedVessels = await getVessels();
    const updatedRecipes = await getRecipes();

    const batch = await createBatch({
      name: "Blackberry Melomel",
      recipeId: updatedRecipes[0]?.id,
      vesselId: updatedVessels[0]?.id,
      status: "primary",
      estimatedDays: 45,
    });

	if (tasks.length === 0) {
      await createTask({
        title: "Check gravity",
        batchId: batch.id,
        dueDate: new Date().toISOString(),
    	});
  	}
  }
}