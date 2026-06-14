import { dataContext } from "../data/DataContextProvider";


export async function seedDatabaseIfEmpty() {
	const vessels = await dataContext.local.vessels.getAll();
	const recipes = await dataContext.local.recipes.getAll();
	const batches = await dataContext.local.batches.getAll();
	const tasks = await dataContext.local.tasks.getAll();

	if (vessels.length === 0) {
		const vessel1 = await dataContext.local.vessels.create();

		vessel1.name = "Carboy #1";
		vessel1.type = "Glass carboy";
		vessel1.volumeLiters = 5;
		vessel1.syncStatus = "local";
		await dataContext.local.vessels.save(vessel1);

		const vessel2 = await dataContext.local.vessels.create();
		vessel2.name = "Demijohn #1";
		vessel2.type = "Demijohn";
		vessel2.volumeLiters = 5;
		vessel2.syncStatus = "local";
		await dataContext.local.vessels.save(vessel2);
	}

	if (recipes.length === 0) {
		const recipe = await dataContext.local.recipes.create();
		recipe.name = "Blackberry Melomel";
		recipe.type = "melomel";
		recipe.description = "A rich berry mead with wildflower honey and blackberries.";
		recipe.estimatedDays = 45;
		recipe.targetAbv = 12;
		await dataContext.local.recipes.save(recipe);
	}

	if (batches.length === 0) {
		const updatedVessels = await dataContext.local.vessels.getAll();
		const updatedRecipes = await dataContext.local.recipes.getAll();

		const batch = await dataContext.local.batches.create();
		batch.name = "Blackberry Melomel";
		batch.recipeId = updatedRecipes[0]?.id;
		batch.vesselId = updatedVessels[0]?.id;
		batch.status = "primary";
		batch.estimatedDays = 45;
		await dataContext.local.batches.save(batch);

		if (tasks.length === 0) {
			const task = await dataContext.local.tasks.create();
			task.title = "Check gravity";
			task.batchId = batch.id;
			task.dueDate = new Date().toISOString();
			await dataContext.local.tasks.save(task);
		}
	}
}