import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {EntityOriginal, EntityOriginalRelations} from '../models';

export class EntityOriginalRepository extends DefaultCrudRepository<
  EntityOriginal,
  typeof EntityOriginal.prototype.entitytOriginalId,
  EntityOriginalRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(EntityOriginal, dataSource);
  }
}
