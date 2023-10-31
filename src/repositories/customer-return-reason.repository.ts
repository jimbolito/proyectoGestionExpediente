import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {CustomerReturnReason, CustomerReturnReasonRelations} from '../models';

export class CustomerReturnReasonRepository extends DefaultCrudRepository<
  CustomerReturnReason,
  typeof CustomerReturnReason.prototype.id,
  CustomerReturnReasonRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(CustomerReturnReason, dataSource);
  }
}
