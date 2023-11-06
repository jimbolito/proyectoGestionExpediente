import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {GlobalCoherence, GlobalCoherenceRelations} from '../models';

export class GlobalCoherenceRepository extends DefaultCrudRepository<
  GlobalCoherence,
  typeof GlobalCoherence.prototype.globalCoherenceId,
  GlobalCoherenceRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(GlobalCoherence, dataSource);
  }
}
