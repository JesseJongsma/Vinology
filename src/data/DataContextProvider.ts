import type { IAppServices } from "./IAppServices";

import { SQLiteDataContext } from "./local/SQLiteDataContext";
import { DummyDataContext } from "./local/DummyDataContext";
import { SupabaseDataContext } from "./remote/SupabaseDataContext";
import { SyncService } from "./sync/SyncService";

const localSource = import.meta.env.VITE_LOCAL_DATA_SOURCE;
const remoteSource = import.meta.env.VITE_REMOTE_DATA_SOURCE;

const local =
  localSource === "dummy"
    ? new DummyDataContext()
    : new SQLiteDataContext();

const remote =
  remoteSource === "supabase"
    ? new SupabaseDataContext()
    : undefined;

export const services: IAppServices = {
  local,
  remote,
  sync: remote ? new SyncService(local, remote) : undefined,
};