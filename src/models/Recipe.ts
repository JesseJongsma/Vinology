export type Recipe = {
	id: string;
	name: string;
	type: string;
	description?: string | null;
	estimatedDays?: number | null;
	targetAbv?: number | null;
	isPublic: boolean;
	createdAt: string;
	updatedAt?: string;
	syncStatus: "local" | "pending" | "synced" | "conflict";
};