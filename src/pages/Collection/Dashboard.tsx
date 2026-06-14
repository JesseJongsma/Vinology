import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { dataContext } from "../../data/DataContextProvider";
import { type Batch } from "../../models/Batch";
import { type Task } from "../../models/Task";
import { type Recipe } from "../../models/Recipe";
import { type Vessel } from "../../models/Vessel";

export default function Dashboard() {
	const [batches, setBatches] = useState<Batch[]>([]);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [freeVesselCount, setFreeVesselCount] = useState(0);

	async function loadDashboard() {
		const [batchData, taskData, vesselData, recipeData] = await Promise.all([
			dataContext.local.batches.getAll(),
			dataContext.local.tasks.getAll(),
			dataContext.local.vessels.getAll(),
			dataContext.local.recipes.getAll(),
		]);

		const usedVesselIds = new Set(batchData.map((batch) => batch.vesselId).filter(Boolean));

		setBatches(batchData);
		setRecipes(recipeData);
		setTasks(taskData);
		setFreeVesselCount(vesselData.filter((vessel) => !usedVesselIds.has(vessel.id)).length);
	}

	useEffect(() => {
		loadDashboard();
	}, []);

	const todayTasks = tasks.filter((task) => isSameRelativeDay(task.dueDate, 0));
	const tomorrowTasks = tasks.filter((task) => isSameRelativeDay(task.dueDate, 1));
	const upcomingTasks = tasks.filter((task) => !isSameRelativeDay(task.dueDate, 0) && !isSameRelativeDay(task.dueDate, 1));

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Dashboard</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<main className="page">
					<header className="page-header">
						<p>Your cellar at a glance</p>
					</header>

					<section className="stat-grid">
						<article className="stat-card">
							<span className="stat-number">{batches.length}</span>
							<span className="stat-label">Active batches</span>
						</article>

						<article className="stat-card">
							<span className="stat-number">{todayTasks.length}</span>
							<span className="stat-label">Tasks today</span>
						</article>

						<article className="stat-card">
							<span className="stat-number">{freeVesselCount}</span>
							<span className="stat-label">Free vessels</span>
						</article>
					</section>

					<section className="section">
						<div className="section-title-row">
							<h2>Current batches</h2>
							<button className="btn btn-secondary">View all</button>
						</div>

						<div className="horizontal-scroll">
							{batches.map((batch) => {
								const progress = Math.min(
									Math.round((batch.currentDay / batch.estimatedDays) * 100),
									100
								);

								const recipeName =
									recipes.find((r) => r.id === batch.recipeId)?.name ?? "No recipe";

								return (
									<article key={batch.id} className="card">
										<div className="card-header">
											<span>{batch.status}</span>
											<strong>Day {batch.currentDay}</strong>
										</div>

										<h3>{batch.name}</h3>
										<p>{recipeName}</p>

										<div className="progress-track">
											<div className="progress-fill" style={{ width: `${progress}%` }} />
										</div>

										<div className="batch-card-bottom">
											<span>{progress}%</span>
											<span>{recipeName}</span>
										</div>
									</article>
								);
							})}
						</div>
					</section>

					<section className="section">
						<h2>Tasks</h2>

						<TaskGroup title="Today" tasks={todayTasks} batches={batches} />
						<TaskGroup title="Tomorrow" tasks={tomorrowTasks} batches={batches} />
						<TaskGroup title="Upcoming" tasks={upcomingTasks} batches={batches} />
					</section>
				</main>
			</IonContent>
		</IonPage>
	);
}

function TaskGroup({ title, tasks, batches }: { title: string; tasks: Task[]; batches: Batch[] }) {
	if (tasks.length === 0) return null;

	return (
		<section className="task-group">
			<h3>{title}</h3>

			<div className="task-list">
				{tasks.map((task) => (
					<article key={task.id} className="task-card">
						<div>
							<strong>{task.title}</strong>
							<p>{batches.find((b) => b.id === task.batchId)?.name ?? "General task"}</p>
						</div>

						<button>Done</button>
					</article>
				))}
			</div>
		</section>
	);
}

function isSameRelativeDay(dateString: string, offsetDays: number) {
	const date = new Date(dateString);
	const target = new Date();

	target.setDate(target.getDate() + offsetDays);

	return date.toDateString() === target.toDateString();
}