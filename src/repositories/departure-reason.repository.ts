import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {DepartureReason, DepartureReasonRelations} from '../models';

export class DepartureReasonRepository extends DefaultCrudRepository<
  DepartureReason,
  typeof DepartureReason.prototype.id,
  DepartureReasonRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(DepartureReason, dataSource);
  }
}
