import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Expedient} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Expedient,
  pattern: 'CrudRest',
  dataSource: 'expedientDataSource',
  basePath: '/expedients',
  readonly: false,
};
module.exports = config;
