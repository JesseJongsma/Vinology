import { dataContext } from "../data/DataContextProvider";
import { SyncService } from "../data/sync/SyncService";


export const services = {
	sync: dataContext.remote
		? new SyncService(dataContext.local, dataContext.remote)
		: undefined,

	// Later:
	// nfc: new NFCService(),
	// sensors: new SensorService(),
	// notifications: new NotificationService();
};