import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ExpedientType, ExpedientTypeRelations} from '../models';

export class ExpedientTypeRepository extends DefaultCrudRepository<
  ExpedientType,
  typeof ExpedientType.prototype.id,
  ExpedientTypeRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ExpedientType, dataSource);
  }
}
