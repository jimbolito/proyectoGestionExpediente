import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ExpedientFieldIdentifier, ExpedientFieldIdentifierRelations} from '../models';

export class ExpedientFieldIdentifierRepository extends DefaultCrudRepository<
  ExpedientFieldIdentifier,
  typeof ExpedientFieldIdentifier.prototype.expedientFieldId,
  ExpedientFieldIdentifierRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ExpedientFieldIdentifier, dataSource);
  }
}
