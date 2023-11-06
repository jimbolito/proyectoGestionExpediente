import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CustomerReturnReason} from '../models';
import {CustomerReturnReasonRepository} from '../repositories';

export class CustomerReturnReasonController {
  constructor(
    @repository(CustomerReturnReasonRepository)
    public customerReturnReasonRepository : CustomerReturnReasonRepository,
  ) {}

  @post('/customer-return-reasons')
  @response(200, {
    description: 'CustomerReturnReason model instance',
    content: {'application/json': {schema: getModelSchemaRef(CustomerReturnReason)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerReturnReason, {
            title: 'NewCustomerReturnReason',
            exclude: ['id'],
          }),
        },
      },
    })
    customerReturnReason: Omit<CustomerReturnReason, 'id'>,
  ): Promise<CustomerReturnReason> {
    return this.customerReturnReasonRepository.create(customerReturnReason);
  }

  @get('/customer-return-reasons/count')
  @response(200, {
    description: 'CustomerReturnReason model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CustomerReturnReason) where?: Where<CustomerReturnReason>,
  ): Promise<Count> {
    return this.customerReturnReasonRepository.count(where);
  }

  @get('/customer-return-reasons')
  @response(200, {
    description: 'Array of CustomerReturnReason model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CustomerReturnReason, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CustomerReturnReason) filter?: Filter<CustomerReturnReason>,
  ): Promise<CustomerReturnReason[]> {
    return this.customerReturnReasonRepository.find(filter);
  }

  @patch('/customer-return-reasons')
  @response(200, {
    description: 'CustomerReturnReason PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerReturnReason, {partial: true}),
        },
      },
    })
    customerReturnReason: CustomerReturnReason,
    @param.where(CustomerReturnReason) where?: Where<CustomerReturnReason>,
  ): Promise<Count> {
    return this.customerReturnReasonRepository.updateAll(customerReturnReason, where);
  }

  @get('/customer-return-reasons/{id}')
  @response(200, {
    description: 'CustomerReturnReason model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CustomerReturnReason, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CustomerReturnReason, {exclude: 'where'}) filter?: FilterExcludingWhere<CustomerReturnReason>
  ): Promise<CustomerReturnReason> {
    return this.customerReturnReasonRepository.findById(id, filter);
  }

  @patch('/customer-return-reasons/{id}')
  @response(204, {
    description: 'CustomerReturnReason PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerReturnReason, {partial: true}),
        },
      },
    })
    customerReturnReason: CustomerReturnReason,
  ): Promise<void> {
    await this.customerReturnReasonRepository.updateById(id, customerReturnReason);
  }

  @put('/customer-return-reasons/{id}')
  @response(204, {
    description: 'CustomerReturnReason PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customerReturnReason: CustomerReturnReason,
  ): Promise<void> {
    await this.customerReturnReasonRepository.replaceById(id, customerReturnReason);
  }

  @del('/customer-return-reasons/{id}')
  @response(204, {
    description: 'CustomerReturnReason DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customerReturnReasonRepository.deleteById(id);
  }
}
