import type { IDataContext } from "./IDataContext";
import type { SyncService } from "./sync/SyncService";

export interface IAppServices {
  local: IDataContext;
  remote?: IDataContext;
  sync?: SyncService;
}