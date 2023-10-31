import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ProductType, ProductTypeRelations} from '../models';

export class ProductTypeRepository extends DefaultCrudRepository<
  ProductType,
  typeof ProductType.prototype.id,
  ProductTypeRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ProductType, dataSource);
  }
}
