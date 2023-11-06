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
import {ManagementStatus} from '../models';
import {ManagementStatusRepository} from '../repositories';

export class ManagementStatusController {
  constructor(
    @repository(ManagementStatusRepository)
    public managementStatusRepository : ManagementStatusRepository,
  ) {}

  @post('/management-statuses')
  @response(200, {
    description: 'ManagementStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(ManagementStatus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ManagementStatus, {
            title: 'NewManagementStatus',
            exclude: ['managementStatusId'],
          }),
        },
      },
    })
    managementStatus: Omit<ManagementStatus, 'managementStatusId'>,
  ): Promise<ManagementStatus> {
    return this.managementStatusRepository.create(managementStatus);
  }

  @get('/management-statuses/count')
  @response(200, {
    description: 'ManagementStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ManagementStatus) where?: Where<ManagementStatus>,
  ): Promise<Count> {
    return this.managementStatusRepository.count(where);
  }

  @get('/management-statuses')
  @response(200, {
    description: 'Array of ManagementStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ManagementStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ManagementStatus) filter?: Filter<ManagementStatus>,
  ): Promise<ManagementStatus[]> {
    return this.managementStatusRepository.find(filter);
  }

  @patch('/management-statuses')
  @response(200, {
    description: 'ManagementStatus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ManagementStatus, {partial: true}),
        },
      },
    })
    managementStatus: ManagementStatus,
    @param.where(ManagementStatus) where?: Where<ManagementStatus>,
  ): Promise<Count> {
    return this.managementStatusRepository.updateAll(managementStatus, where);
  }

  @get('/management-statuses/{id}')
  @response(200, {
    description: 'ManagementStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ManagementStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ManagementStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<ManagementStatus>
  ): Promise<ManagementStatus> {
    return this.managementStatusRepository.findById(id, filter);
  }

  @patch('/management-statuses/{id}')
  @response(204, {
    description: 'ManagementStatus PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ManagementStatus, {partial: true}),
        },
      },
    })
    managementStatus: ManagementStatus,
  ): Promise<void> {
    await this.managementStatusRepository.updateById(id, managementStatus);
  }

  @put('/management-statuses/{id}')
  @response(204, {
    description: 'ManagementStatus PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() managementStatus: ManagementStatus,
  ): Promise<void> {
    await this.managementStatusRepository.replaceById(id, managementStatus);
  }

  @del('/management-statuses/{id}')
  @response(204, {
    description: 'ManagementStatus DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.managementStatusRepository.deleteById(id);
  }
}
