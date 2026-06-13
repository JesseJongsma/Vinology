export interface IRepository<TEntity, TCreate = TEntity> {
  getAll(): Promise<TEntity[]>;

  find(id: string): Promise<TEntity | null>;

  create(): Promise<TEntity>;

  save(entity: TEntity): Promise<TEntity>;

  delete(id: string): Promise<void>;
}