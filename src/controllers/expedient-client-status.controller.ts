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
  ClientStatus,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientClientStatusController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/client-statuses', {
    responses: {
      '200': {
        description: 'Array of Expedient has many ClientStatus',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClientStatus)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ClientStatus>,
  ): Promise<ClientStatus[]> {
    return this.expedientRepository.clientStatuses(id).find(filter);
  }

  @post('/expedients/{id}/client-statuses', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientStatus)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientStatus, {
            title: 'NewClientStatusInExpedient',
            exclude: ['clientStatusId'],
            optional: ['expedientID']
          }),
        },
      },
    }) clientStatus: Omit<ClientStatus, 'clientStatusId'>,
  ): Promise<ClientStatus> {
    return this.expedientRepository.clientStatuses(id).create(clientStatus);
  }

  @patch('/expedients/{id}/client-statuses', {
    responses: {
      '200': {
        description: 'Expedient.ClientStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientStatus, {partial: true}),
        },
      },
    })
    clientStatus: Partial<ClientStatus>,
    @param.query.object('where', getWhereSchemaFor(ClientStatus)) where?: Where<ClientStatus>,
  ): Promise<Count> {
    return this.expedientRepository.clientStatuses(id).patch(clientStatus, where);
  }

  @del('/expedients/{id}/client-statuses', {
    responses: {
      '200': {
        description: 'Expedient.ClientStatus DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ClientStatus)) where?: Where<ClientStatus>,
  ): Promise<Count> {
    return this.expedientRepository.clientStatuses(id).delete(where);
  }
}
