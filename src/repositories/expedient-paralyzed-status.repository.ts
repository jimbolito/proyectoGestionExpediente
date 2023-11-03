import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ExpedientParalyzedStatus, ExpedientParalyzedStatusRelations} from '../models';

export class ExpedientParalyzedStatusRepository extends DefaultCrudRepository<
  ExpedientParalyzedStatus,
  typeof ExpedientParalyzedStatus.prototype.expedientParalyzedId,
  ExpedientParalyzedStatusRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ExpedientParalyzedStatus, dataSource);
  }
}
