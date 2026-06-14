import { type Vessel } from "./Vessel";

export type VesselRow = {
	id: string;
	name: string;
	type: string;
	volume_liters: number;
	nfc_tag_id?: string | null;
	created_at: string;
	updated_at?: string | null;
	deleted_at?: string | null;
	sync_status: Vessel["syncStatus"];
};