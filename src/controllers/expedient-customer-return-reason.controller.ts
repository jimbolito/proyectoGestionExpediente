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
  CustomerReturnReason,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientCustomerReturnReasonController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/customer-return-reasons', {
    responses: {
      '200': {
        description: 'Array of Expedient has many CustomerReturnReason',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CustomerReturnReason)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CustomerReturnReason>,
  ): Promise<CustomerReturnReason[]> {
    return this.expedientRepository.customerReturnReasons(id).find(filter);
  }

  @post('/expedients/{id}/customer-return-reasons', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(CustomerReturnReason)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerReturnReason, {
            title: 'NewCustomerReturnReasonInExpedient',
            exclude: ['id'],
            optional: ['expedientID']
          }),
        },
      },
    }) customerReturnReason: Omit<CustomerReturnReason, 'id'>,
  ): Promise<CustomerReturnReason> {
    return this.expedientRepository.customerReturnReasons(id).create(customerReturnReason);
  }

  @patch('/expedients/{id}/customer-return-reasons', {
    responses: {
      '200': {
        description: 'Expedient.CustomerReturnReason PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomerReturnReason, {partial: true}),
        },
      },
    })
    customerReturnReason: Partial<CustomerReturnReason>,
    @param.query.object('where', getWhereSchemaFor(CustomerReturnReason)) where?: Where<CustomerReturnReason>,
  ): Promise<Count> {
    return this.expedientRepository.customerReturnReasons(id).patch(customerReturnReason, where);
  }

  @del('/expedients/{id}/customer-return-reasons', {
    responses: {
      '200': {
        description: 'Expedient.CustomerReturnReason DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CustomerReturnReason)) where?: Where<CustomerReturnReason>,
  ): Promise<Count> {
    return this.expedientRepository.customerReturnReasons(id).delete(where);
  }
}
