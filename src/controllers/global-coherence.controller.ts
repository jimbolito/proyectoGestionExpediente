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
import {GlobalCoherence} from '../models';
import {GlobalCoherenceRepository} from '../repositories';

export class GlobalCoherenceController {
  constructor(
    @repository(GlobalCoherenceRepository)
    public globalCoherenceRepository : GlobalCoherenceRepository,
  ) {}

  @post('/global-coherences')
  @response(200, {
    description: 'GlobalCoherence model instance',
    content: {'application/json': {schema: getModelSchemaRef(GlobalCoherence)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalCoherence, {
            title: 'NewGlobalCoherence',
            exclude: ['globalCoherenceId'],
          }),
        },
      },
    })
    globalCoherence: Omit<GlobalCoherence, 'globalCoherenceId'>,
  ): Promise<GlobalCoherence> {
    return this.globalCoherenceRepository.create(globalCoherence);
  }

  @get('/global-coherences/count')
  @response(200, {
    description: 'GlobalCoherence model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GlobalCoherence) where?: Where<GlobalCoherence>,
  ): Promise<Count> {
    return this.globalCoherenceRepository.count(where);
  }

  @get('/global-coherences')
  @response(200, {
    description: 'Array of GlobalCoherence model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GlobalCoherence, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GlobalCoherence) filter?: Filter<GlobalCoherence>,
  ): Promise<GlobalCoherence[]> {
    return this.globalCoherenceRepository.find(filter);
  }

  @patch('/global-coherences')
  @response(200, {
    description: 'GlobalCoherence PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalCoherence, {partial: true}),
        },
      },
    })
    globalCoherence: GlobalCoherence,
    @param.where(GlobalCoherence) where?: Where<GlobalCoherence>,
  ): Promise<Count> {
    return this.globalCoherenceRepository.updateAll(globalCoherence, where);
  }

  @get('/global-coherences/{id}')
  @response(200, {
    description: 'GlobalCoherence model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GlobalCoherence, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GlobalCoherence, {exclude: 'where'}) filter?: FilterExcludingWhere<GlobalCoherence>
  ): Promise<GlobalCoherence> {
    return this.globalCoherenceRepository.findById(id, filter);
  }

  @patch('/global-coherences/{id}')
  @response(204, {
    description: 'GlobalCoherence PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalCoherence, {partial: true}),
        },
      },
    })
    globalCoherence: GlobalCoherence,
  ): Promise<void> {
    await this.globalCoherenceRepository.updateById(id, globalCoherence);
  }

  @put('/global-coherences/{id}')
  @response(204, {
    description: 'GlobalCoherence PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() globalCoherence: GlobalCoherence,
  ): Promise<void> {
    await this.globalCoherenceRepository.replaceById(id, globalCoherence);
  }

  @del('/global-coherences/{id}')
  @response(204, {
    description: 'GlobalCoherence DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.globalCoherenceRepository.deleteById(id);
  }
}
