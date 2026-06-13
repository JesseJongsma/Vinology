export type Vessel = {
	id: string;
	name: string;
	type: string;
	volumeLiters: number;
	nfcTagId?: string | null;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
	syncStatus: "local" | "pending" | "synced" | "conflict";
};