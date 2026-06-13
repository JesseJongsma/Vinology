export type Vessel = {
	id: string;
	name: string;
	type:
	| "bucket"
	| "carboy"
	| "demijohn"
	| "tank"
	| "barrel";
	volumeLiters: number;
	nfcTagId?: string;
	currentBatch?: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string;
	syncStatus: "local" | "pending" | "synced" | "conflict";
};

export type Batch = {
	id: string;
	name: string;
	recipeId?: string;
	vesselId?: string;

	status:
	| "planned"
	| "primary"
	| "secondary"
	| "aging"
	| "bottled";

	startedAt: string;
};