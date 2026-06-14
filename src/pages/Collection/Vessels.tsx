import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import FloatingAddButton from "../../components/FloatingAddButton";
import { dataContext } from "../../data/DataContextProvider";
import { type Vessel } from "../../models/Vessel";

export default function Vessels() {
	const [vessels, setVessels] = useState<Vessel[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function loadVessels() {
		const data = await dataContext.local.vessels.getAll();
		setVessels(data);
		setIsLoading(false);
	}

	async function handleAddVessel() {
		const newVessel = await dataContext.local.vessels.create();
		newVessel.name = `Vessel #${vessels.length + 1}`;
		newVessel.type = "Glass carboy";
		newVessel.volumeLiters = 5;
		newVessel.syncStatus = "local";
		await dataContext.local.vessels.save(newVessel);


		await loadVessels();
	}

	useEffect(() => {
		loadVessels();
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Vessels</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<main className="page">
					<header className="page-header">
						<div>
							<p>
								{isLoading
									? "Loading vessels..."
									: `${vessels.length} vessels in your cellar`}
							</p>
						</div>
					</header>

					<section className="card-list">
						{vessels.map((vessel) => (
							<article key={vessel.id} className="card">
								<div className="card-main">
									<div>
										<h2>{vessel.name}</h2>
										<p>
											{vessel.type} · {vessel.volumeLiters}L
										</p>
									</div>

									<span className="badge">Empty</span>
								</div>

								<div className="vessel-content">
									<p>
										<strong>NFC:</strong> {vessel.nfcTagId ?? "No tag linked"}
									</p>
									<p>
										<strong>Sync:</strong> {vessel.syncStatus}
									</p>
								</div>

								<div className="vessel-actions">
									<button>Assign recipe</button>
									<button>Scan NFC tag</button>
									<button className="danger">Delete</button>
								</div>
							</article>
						))}
					</section>

					<FloatingAddButton onClick={handleAddVessel} />
				</main>
			</IonContent>
		</IonPage>
	);
}
