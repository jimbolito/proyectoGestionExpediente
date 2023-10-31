import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {MainIntervener, MainIntervenerRelations} from '../models';

export class MainIntervenerRepository extends DefaultCrudRepository<
  MainIntervener,
  typeof MainIntervener.prototype.id,
  MainIntervenerRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(MainIntervener, dataSource);
  }
}
