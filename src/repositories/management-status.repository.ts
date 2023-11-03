import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ManagementStatus, ManagementStatusRelations} from '../models';

export class ManagementStatusRepository extends DefaultCrudRepository<
  ManagementStatus,
  typeof ManagementStatus.prototype.managementStatusId,
  ManagementStatusRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ManagementStatus, dataSource);
  }
}
