import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ClientStatus, ClientStatusRelations} from '../models';

export class ClientStatusRepository extends DefaultCrudRepository<
  ClientStatus,
  typeof ClientStatus.prototype.clientStatusId,
  ClientStatusRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ClientStatus, dataSource);
  }
}
