
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

type CommunityRecipe = {
	id: string;
	name: string;
	type: "mead" | "cider" | "fruit wine" | "rice wine" | "grape wine";
	author: string;
	rating: number;
	difficulty: "easy" | "medium" | "hard";
	targetAbv: number;
	description: string;
};

const communityRecipes: CommunityRecipe[] = [
	{
		id: "1",
		name: "Tart Cherry Melomel",
		type: "mead",
		author: "HoneyCellar",
		rating: 4.8,
		difficulty: "medium",
		targetAbv: 12.5,
		description: "Bright cherry acidity balanced with orange blossom honey.",
	},
	{
		id: "2",
		name: "Dry Apple Cider",
		type: "cider",
		author: "OrchardLab",
		rating: 4.4,
		difficulty: "easy",
		targetAbv: 6.2,
		description: "A crisp, dry cider for beginners.",
	},
	{
		id: "3",
		name: "Strawberry Country Wine",
		type: "fruit wine",
		author: "FermentNerd",
		rating: 4.6,
		difficulty: "easy",
		targetAbv: 10,
		description: "Simple fruit wine with fresh strawberry aroma.",
	},
];

export default function ExploreRecipes() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Explore</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<main className="explore-page">
					<header className="explore-header">
						<p>Browse recipes shared by other makers</p>
					</header>

			<section className="explore-filters">
				<input type="search" placeholder="Search recipes..." />

				<select>
					<option value="">All types</option>
					<option value="mead">Mead</option>
					<option value="cider">Cider</option>
					<option value="fruit wine">Fruit wine</option>
					<option value="rice wine">Rice wine</option>
					<option value="grape wine">Grape wine</option>
				</select>

				<select>
					<option value="">Any difficulty</option>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</section>

			<section className="community-recipe-list">
				{communityRecipes.map((recipe) => (
					<article key={recipe.id} className="community-recipe-card">
						<div className="community-recipe-main">
							<div>
								<h2>{recipe.name}</h2>
								<p>{recipe.description}</p>
							</div>

							<span className="community-recipe-type">{recipe.type}</span>
						</div>

						<div className="community-recipe-meta">
							<span>⭐ {recipe.rating}</span>
							<span>{recipe.difficulty}</span>
							<span>{recipe.targetAbv}% ABV</span>
							<span>by {recipe.author}</span>
						</div>

						<div className="community-recipe-actions">
							<button>View recipe</button>
							<button>Save</button>
							<button>Start batch</button>
						</div>
					</article>
				))}
			</section>
			</main>
		</IonContent>
	</IonPage>
	);
}