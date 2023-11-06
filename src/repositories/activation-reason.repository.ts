import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ActivationReason, ActivationReasonRelations} from '../models';

export class ActivationReasonRepository extends DefaultCrudRepository<
  ActivationReason,
  typeof ActivationReason.prototype.activationReasonId,
  ActivationReasonRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ActivationReason, dataSource);
  }
}
