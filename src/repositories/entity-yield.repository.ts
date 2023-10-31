import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {EntityYield, EntityYieldRelations} from '../models';

export class EntityYieldRepository extends DefaultCrudRepository<
  EntityYield,
  typeof EntityYield.prototype.id,
  EntityYieldRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(EntityYield, dataSource);
  }
}
