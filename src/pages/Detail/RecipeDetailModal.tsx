import { useEffect, useState } from "react";
import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonModal,
	IonTextarea,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { dataContext } from "../../data/DataContextProvider";
import { type Recipe } from "../../models/Recipe";


type Props = {
	isOpen: boolean;
	recipe?: Recipe | null;
	onClose: () => void;
	onSaved: () => void;
};

export default function RecipeDetailModal({ isOpen, recipe, onClose, onSaved }: Props) {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [description, setDescription] = useState("");
	const [targetAbv, setTargetAbv] = useState("");
	const [estimatedDays, setEstimatedDays] = useState("");

	const isEditing = Boolean(recipe);

	useEffect(() => {
		if (!isOpen) return;

		setName(recipe?.name ?? "");
		setType(recipe?.type ?? "");
		setDescription(recipe?.description ?? "");
		setTargetAbv(recipe?.targetAbv?.toString() ?? "");
		setEstimatedDays(recipe?.estimatedDays?.toString() ?? "");
	}, [isOpen, recipe]);

	async function handleSave() {
		if (!name.trim()) return;

		if (isEditing) {
			// We'll add updateRecipe next.
			console.log("Update recipe later", recipe?.id);
		} else {
			const newRecipe = await dataContext.local.recipes.create();
			newRecipe.name = name;
			newRecipe.type = type;
			newRecipe.description = description;
			newRecipe.targetAbv = Number(targetAbv);
			newRecipe.estimatedDays = Number(estimatedDays);
			newRecipe.syncStatus = "local";
			await dataContext.local.recipes.save(newRecipe);
		}

		onSaved();
		onClose();
	}

	return (
		<IonModal isOpen={isOpen} onDidDismiss={onClose}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{isEditing ? "Edit recipe" : "New recipe"}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className="ion-padding">
				<IonItem>
					<IonLabel position="stacked">Name</IonLabel>
					<IonInput
						value={name}
						placeholder="Blackberry Melomel"
						onIonInput={(event) => setName(event.detail.value ?? "")}
					/>
				</IonItem>

				<IonItem>
					<IonLabel position="stacked">Type</IonLabel>
					<IonInput
						value={type}
						placeholder="mead"
						onIonInput={(event) => setType(event.detail.value ?? "")}
					/>
				</IonItem>

				<IonItem>
					<IonLabel position="stacked">Description</IonLabel>
					<IonTextarea
						value={description}
						placeholder="Describe the recipe..."
						onIonInput={(event) => setDescription(event.detail.value ?? "")}
					/>
				</IonItem>

				<IonItem>
					<IonLabel position="stacked">Target ABV</IonLabel>
					<IonInput
						type="number"
						value={targetAbv}
						onIonInput={(event) => setTargetAbv(event.detail.value ?? "")}
					/>
				</IonItem>

				<IonItem>
					<IonLabel position="stacked">Estimated days</IonLabel>
					<IonInput
						type="number"
						value={estimatedDays}
						onIonInput={(event) => setEstimatedDays(event.detail.value ?? "")}
					/>
				</IonItem>

				<div style={{ display: "grid", gap: 12, marginTop: 24 }}>
					<IonButton expand="block" onClick={handleSave}>
						{isEditing ? "Save changes" : "Create recipe"}
					</IonButton>

					<IonButton expand="block" fill="clear" onClick={onClose}>
						Cancel
					</IonButton>
				</div>
			</IonContent>
		</IonModal>
	);
}