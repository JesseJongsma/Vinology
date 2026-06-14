import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import FloatingAddButton from "../../components/FloatingAddButton";
import { dataContext } from "../../data/DataContextProvider";
import { type Batch } from "../../models/Batch";
import { type Vessel } from "../../models/Vessel";
import { type Recipe } from "../../models/Recipe";

export default function Batches() {
	const [batches, setBatches] = useState<Batch[]>([]);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [vessels, setVessels] = useState<Vessel[]>([]);
	const [emptyVessels, setEmptyVessels] = useState<Vessel[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function loadBatchesPage() {
		const [batchData, vesselData, recipeData] = await Promise.all([
			dataContext.local.batches.getAll(),
			dataContext.local.vessels.getAll(),
			dataContext.local.recipes.getAll()
		]);

		const usedVesselIds = new Set(batchData.map((batch) => batch.vesselId).filter(Boolean));

		setBatches(batchData);
		setRecipes(recipeData);
		setVessels(vesselData);
		setEmptyVessels(vesselData.filter((vessel) => !usedVesselIds.has(vessel.id)));
		setIsLoading(false);
	}

	async function handleAddBatch() {
		const availableVessel = emptyVessels[0];

		const newBatch = await dataContext.local.batches.create();
		newBatch.name = `Batch #${batches.length + 1}`;
		newBatch.vesselId = availableVessel?.id;
		newBatch.status = "primary";
		newBatch.estimatedDays = 45;
		await dataContext.local.batches.save(newBatch);

		await loadBatchesPage();
	}

	useEffect(() => {
		loadBatchesPage();
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Batches</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<main className="page">
					<header className="page-header">
						<div>
							<p>{isLoading ? "Loading..." : `${batches.length} active batches`}</p>
						</div>
					</header>

					<section className="page-section">
						<h2>Active batches</h2>

						<div className="card-list">
							{batches.map((batch) => {
								const progress = Math.min(
									Math.round((batch.currentDay / batch.estimatedDays) * 100),
									100
								);

								return (
									<article key={batch.id} className="card">
										<div className="card-main">
											<div>
												<h3>{batch.name}</h3>
												<p>{recipes.find((r) => r.id === batch.recipeId)?.name ?? "No recipe linked"}</p>
											</div>

											<span className="batch-status">{batch.status}</span>
										</div>

										<div className="batch-meta">
											<p>
												<strong>Vessel:</strong> {vessels.find((v) => v.id === batch.vesselId)?.name ?? "No vessel assigned"}
											</p>
											<p>
												<strong>Day:</strong> {batch.currentDay} of {batch.estimatedDays}
											</p>
										</div>

										<div className="progress-block">
											<div className="progress-label">
												<span>Fermentation progress</span>
												<span>{progress}%</span>
											</div>

											<div className="progress-track">
												<div className="progress-fill" style={{ width: `${progress}%` }} />
											</div>
										</div>

										<div className="action-button-group">
											<button className="btn btn-secondary">Add diary entry</button>
											<button className="btn btn-danger">Cancel batch</button>
										</div>
									</article>
								);
							})}
						</div>
					</section>

					<details className="section">
						<summary>Available vessels ({emptyVessels.length})</summary>

						<div className="list">
							{emptyVessels.map((vessel) => (
								<article key={vessel.id} className="card">
									<div>
										<h3>{vessel.name}</h3>
										<p>
											{vessel.type} · {vessel.volumeLiters}L
										</p>
									</div>

									<button className="btn btn-primary">Assign recipe</button>
								</article>
							))}
						</div>
					</details>

					<FloatingAddButton onClick={handleAddBatch} />
				</main>
			</IonContent>
		</IonPage>
	);
}