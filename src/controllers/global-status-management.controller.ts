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
import {GlobalStatusManagement} from '../models';
import {GlobalStatusManagementRepository} from '../repositories';

export class GlobalStatusManagementController {
  constructor(
    @repository(GlobalStatusManagementRepository)
    public globalStatusManagementRepository : GlobalStatusManagementRepository,
  ) {}

  @post('/global-status-managements')
  @response(200, {
    description: 'GlobalStatusManagement model instance',
    content: {'application/json': {schema: getModelSchemaRef(GlobalStatusManagement)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalStatusManagement, {
            title: 'NewGlobalStatusManagement',
            exclude: ['globalStatusManagementId'],
          }),
        },
      },
    })
    globalStatusManagement: Omit<GlobalStatusManagement, 'globalStatusManagementId'>,
  ): Promise<GlobalStatusManagement> {
    return this.globalStatusManagementRepository.create(globalStatusManagement);
  }

  @get('/global-status-managements/count')
  @response(200, {
    description: 'GlobalStatusManagement model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GlobalStatusManagement) where?: Where<GlobalStatusManagement>,
  ): Promise<Count> {
    return this.globalStatusManagementRepository.count(where);
  }

  @get('/global-status-managements')
  @response(200, {
    description: 'Array of GlobalStatusManagement model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GlobalStatusManagement, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GlobalStatusManagement) filter?: Filter<GlobalStatusManagement>,
  ): Promise<GlobalStatusManagement[]> {
    return this.globalStatusManagementRepository.find(filter);
  }

  @patch('/global-status-managements')
  @response(200, {
    description: 'GlobalStatusManagement PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalStatusManagement, {partial: true}),
        },
      },
    })
    globalStatusManagement: GlobalStatusManagement,
    @param.where(GlobalStatusManagement) where?: Where<GlobalStatusManagement>,
  ): Promise<Count> {
    return this.globalStatusManagementRepository.updateAll(globalStatusManagement, where);
  }

  @get('/global-status-managements/{id}')
  @response(200, {
    description: 'GlobalStatusManagement model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GlobalStatusManagement, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GlobalStatusManagement, {exclude: 'where'}) filter?: FilterExcludingWhere<GlobalStatusManagement>
  ): Promise<GlobalStatusManagement> {
    return this.globalStatusManagementRepository.findById(id, filter);
  }

  @patch('/global-status-managements/{id}')
  @response(204, {
    description: 'GlobalStatusManagement PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalStatusManagement, {partial: true}),
        },
      },
    })
    globalStatusManagement: GlobalStatusManagement,
  ): Promise<void> {
    await this.globalStatusManagementRepository.updateById(id, globalStatusManagement);
  }

  @put('/global-status-managements/{id}')
  @response(204, {
    description: 'GlobalStatusManagement PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() globalStatusManagement: GlobalStatusManagement,
  ): Promise<void> {
    await this.globalStatusManagementRepository.replaceById(id, globalStatusManagement);
  }

  @del('/global-status-managements/{id}')
  @response(204, {
    description: 'GlobalStatusManagement DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.globalStatusManagementRepository.deleteById(id);
  }
}
