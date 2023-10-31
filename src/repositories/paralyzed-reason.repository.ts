import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ParalyzedReason, ParalyzedReasonRelations} from '../models';

export class ParalyzedReasonRepository extends DefaultCrudRepository<
  ParalyzedReason,
  typeof ParalyzedReason.prototype.id,
  ParalyzedReasonRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ParalyzedReason, dataSource);
  }
}
