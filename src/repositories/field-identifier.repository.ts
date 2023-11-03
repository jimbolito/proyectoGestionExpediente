import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {FieldIdentifier, FieldIdentifierRelations} from '../models';

export class FieldIdentifierRepository extends DefaultCrudRepository<
  FieldIdentifier,
  typeof FieldIdentifier.prototype.fielId,
  FieldIdentifierRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(FieldIdentifier, dataSource);
  }
}
