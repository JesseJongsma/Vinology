import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { dataContext } from "../../data/DataContextProvider";
import { type Recipe } from "../../models/Recipe";
import FloatingAddButton from "../../components/FloatingAddButton";
import RecipeDetailModal from "../Detail/RecipeDetailModal";

export default function Recipes() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

	async function loadRecipes() {
		const data = await dataContext.local.recipes.getAll();
		setRecipes(data);
		setIsLoading(false);
	}

	// async function handleAddRecipe() {
	// 	// await createRecipe({
	// 	// 	name: `Recipe #${recipes.length + 1}`,
	// 	// 	type: "mead",
	// 	// 	description: "A new experimental mead recipe.",
	// 	// 	estimatedDays: 45,
	// 	// 	targetAbv: 12,
	// 	// 	isPublic: false,
	// 	// });

	// 	// await loadRecipes();


	// }

	async function handleOpenCreate() {
		setSelectedRecipe(await dataContext.local.recipes.create());
		setIsModalOpen(true);
	}

	function handleOpenEdit(recipe: Recipe) {
		setSelectedRecipe(recipe);
		setIsModalOpen(true);
	}

	useEffect(() => {
		loadRecipes();
	}, []);

	return (
		<IonPage>
			<RecipeDetailModal
				isOpen={isModalOpen}
				recipe={selectedRecipe}
				onClose={() => setIsModalOpen(false)}
				onSaved={loadRecipes}
			/>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Recipes</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<main className="page">
					<header className="page-header">
						<div>
							<p>{isLoading ? "Loading..." : `${recipes.length} saved recipes`}</p>
						</div>
					</header>

					<input className="input" type="search" placeholder="Search recipes..." />

					<section className="card-list">
						{recipes.map((recipe) => (
							<article key={recipe.id} className="card">
								<div className="card-header">
									<div>
										<h2>{recipe.name}</h2>
										<p>{recipe.description ?? "No description yet."}</p>
									</div>

									<span className="badge">{recipe.type}</span>
								</div>

								<div className="recipe-meta">
									<span>{recipe.estimatedDays ?? "?"} days</span>
									<span>{recipe.targetAbv ?? "?"}% ABV</span>
									<span>{recipe.isPublic ? "Public" : "Private"}</span>

									<button className="btn btn-primary">Start batch</button>
									<button className="btn btn-secondary" onClick={() => handleOpenEdit(recipe)}>Edit</button>
								</div>
							</article>
						))}
					</section>

					<FloatingAddButton onClick={handleOpenCreate} />
				</main>
			</IonContent>
		</IonPage>
	);
}