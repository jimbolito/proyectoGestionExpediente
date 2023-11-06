import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Expedient,
  ProductType,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientProductTypeController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/product-types', {
    responses: {
      '200': {
        description: 'Array of Expedient has many ProductType',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductType)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductType>,
  ): Promise<ProductType[]> {
    return this.expedientRepository.productTypes(id).find(filter);
  }

  @post('/expedients/{id}/product-types', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductType)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductType, {
            title: 'NewProductTypeInExpedient',
            exclude: ['productTypeId'],
            optional: ['expedientID']
          }),
        },
      },
    }) productType: Omit<ProductType, 'id'>,
  ): Promise<ProductType> {
    return this.expedientRepository.productTypes(id).create(productType);
  }

  @patch('/expedients/{id}/product-types', {
    responses: {
      '200': {
        description: 'Expedient.ProductType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductType, {partial: true}),
        },
      },
    })
    productType: Partial<ProductType>,
    @param.query.object('where', getWhereSchemaFor(ProductType)) where?: Where<ProductType>,
  ): Promise<Count> {
    return this.expedientRepository.productTypes(id).patch(productType, where);
  }

  @del('/expedients/{id}/product-types', {
    responses: {
      '200': {
        description: 'Expedient.ProductType DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductType)) where?: Where<ProductType>,
  ): Promise<Count> {
    return this.expedientRepository.productTypes(id).delete(where);
  }
}
