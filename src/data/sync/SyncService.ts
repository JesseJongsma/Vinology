// import type { ISyncableEntity } from "../ISyncableEntity";
import type { IDataContext } from "../IDataContext";
import type { IRepository } from "../repositories/IRepository";

type SyncStatus = "local" | "pending" | "synced" | "conflict";

export interface ISyncableEntity {
  id: string;
  updatedAt?: string | null;
  syncStatus: SyncStatus;
}

export class SyncService {
  private readonly local: IDataContext;
  private readonly remote: IDataContext;

  constructor(
    local: IDataContext,
    remote: IDataContext
  ) {
    this.local = local;
    this.remote = remote;
  }

  async sync(): Promise<void> {
    await this.push();
    await this.pull();
  }

  async push(): Promise<void> {
    await this.pushRepository(this.local.recipes, this.remote.recipes);
    await this.pushRepository(this.local.batches, this.remote.batches);
    await this.pushRepository(this.local.vessels, this.remote.vessels);
	await this.pushRepository(this.local.tasks, this.remote.tasks);
  }

  async pull(): Promise<void> {
    // Later:
    // 1. Get changed remote records
    // 2. Compare updatedAt
    // 3. Save to local
    // 4. Mark conflicts if both local and remote changed
  }

  private async pushRepository<TEntity extends ISyncableEntity>(
    localRepository: IRepository<TEntity>,
    remoteRepository: IRepository<TEntity>
  ): Promise<void> {
    const localEntities = await localRepository.getAll();

    const pendingEntities = localEntities.filter(
      (entity) => entity.syncStatus === "pending"
    );

    for (const entity of pendingEntities) {
      await remoteRepository.save(entity);

      const syncedEntity: TEntity = {
        ...entity,
        syncStatus: "synced",
        updatedAt: new Date().toISOString(),
      };

      await localRepository.save(syncedEntity);
    }
  }
}