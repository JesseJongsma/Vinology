import { DummyDataContext } from "./local/DummyDataContext";
import { SQLiteDataContext } from "./local/SQLiteDataContext";
import { SupabaseDataContext } from "./remote/SupabaseDataContext";

const local =
  import.meta.env.VITE_LOCAL_SOURCE === "dummy"
    ? new DummyDataContext()
    : new SQLiteDataContext();

const remote =
  import.meta.env.VITE_REMOTE_SOURCE === "supabase"
    ? new SupabaseDataContext()
    : undefined;

export const dataContext = {
  local,
  remote,
};