import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ExpedientManinIntervener, ExpedientManinIntervenerRelations} from '../models';

export class ExpedientManinIntervenerRepository extends DefaultCrudRepository<
  ExpedientManinIntervener,
  typeof ExpedientManinIntervener.prototype.expedientMainIntervenerId,
  ExpedientManinIntervenerRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ExpedientManinIntervener, dataSource);
  }
}
