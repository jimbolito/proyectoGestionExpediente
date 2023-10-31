import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {GlobalStatusManagement, GlobalStatusManagementRelations} from '../models';

export class GlobalStatusManagementRepository extends DefaultCrudRepository<
  GlobalStatusManagement,
  typeof GlobalStatusManagement.prototype.id,
  GlobalStatusManagementRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(GlobalStatusManagement, dataSource);
  }
}
