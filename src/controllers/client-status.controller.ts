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
import {ClientStatus} from '../models';
import {ClientStatusRepository} from '../repositories';

export class ClientStatusController {
  constructor(
    @repository(ClientStatusRepository)
    public clientStatusRepository : ClientStatusRepository,
  ) {}

  @post('/client-statuses')
  @response(200, {
    description: 'ClientStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(ClientStatus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientStatus, {
            title: 'NewClientStatus',
            exclude: ['clientStatusId'],
          }),
        },
      },
    })
    clientStatus: Omit<ClientStatus, 'clientStatusId'>,
  ): Promise<ClientStatus> {
    return this.clientStatusRepository.create(clientStatus);
  }

  @get('/client-statuses/count')
  @response(200, {
    description: 'ClientStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ClientStatus) where?: Where<ClientStatus>,
  ): Promise<Count> {
    return this.clientStatusRepository.count(where);
  }

  @get('/client-statuses')
  @response(200, {
    description: 'Array of ClientStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ClientStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ClientStatus) filter?: Filter<ClientStatus>,
  ): Promise<ClientStatus[]> {
    return this.clientStatusRepository.find(filter);
  }

  @patch('/client-statuses')
  @response(200, {
    description: 'ClientStatus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientStatus, {partial: true}),
        },
      },
    })
    clientStatus: ClientStatus,
    @param.where(ClientStatus) where?: Where<ClientStatus>,
  ): Promise<Count> {
    return this.clientStatusRepository.updateAll(clientStatus, where);
  }

  @get('/client-statuses/{id}')
  @response(200, {
    description: 'ClientStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ClientStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ClientStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<ClientStatus>
  ): Promise<ClientStatus> {
    return this.clientStatusRepository.findById(id, filter);
  }

  @patch('/client-statuses/{id}')
  @response(204, {
    description: 'ClientStatus PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientStatus, {partial: true}),
        },
      },
    })
    clientStatus: ClientStatus,
  ): Promise<void> {
    await this.clientStatusRepository.updateById(id, clientStatus);
  }

  @put('/client-statuses/{id}')
  @response(204, {
    description: 'ClientStatus PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clientStatus: ClientStatus,
  ): Promise<void> {
    await this.clientStatusRepository.replaceById(id, clientStatus);
  }

  @del('/client-statuses/{id}')
  @response(204, {
    description: 'ClientStatus DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientStatusRepository.deleteById(id);
  }
}
