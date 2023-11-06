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
import {EntityYield} from '../models';
import {EntityYieldRepository} from '../repositories';

export class ExtityYieldController {
  constructor(
    @repository(EntityYieldRepository)
    public entityYieldRepository : EntityYieldRepository,
  ) {}

  @post('/entity-yields')
  @response(200, {
    description: 'EntityYield model instance',
    content: {'application/json': {schema: getModelSchemaRef(EntityYield)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityYield, {
            title: 'NewEntityYield',
            exclude: ['entityYieldId'],
          }),
        },
      },
    })
    entityYield: Omit<EntityYield, 'entityYieldId'>,
  ): Promise<EntityYield> {
    return this.entityYieldRepository.create(entityYield);
  }

  @get('/entity-yields/count')
  @response(200, {
    description: 'EntityYield model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EntityYield) where?: Where<EntityYield>,
  ): Promise<Count> {
    return this.entityYieldRepository.count(where);
  }

  @get('/entity-yields')
  @response(200, {
    description: 'Array of EntityYield model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EntityYield, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EntityYield) filter?: Filter<EntityYield>,
  ): Promise<EntityYield[]> {
    return this.entityYieldRepository.find(filter);
  }

  @patch('/entity-yields')
  @response(200, {
    description: 'EntityYield PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityYield, {partial: true}),
        },
      },
    })
    entityYield: EntityYield,
    @param.where(EntityYield) where?: Where<EntityYield>,
  ): Promise<Count> {
    return this.entityYieldRepository.updateAll(entityYield, where);
  }

  @get('/entity-yields/{id}')
  @response(200, {
    description: 'EntityYield model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EntityYield, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EntityYield, {exclude: 'where'}) filter?: FilterExcludingWhere<EntityYield>
  ): Promise<EntityYield> {
    return this.entityYieldRepository.findById(id, filter);
  }

  @patch('/entity-yields/{id}')
  @response(204, {
    description: 'EntityYield PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityYield, {partial: true}),
        },
      },
    })
    entityYield: EntityYield,
  ): Promise<void> {
    await this.entityYieldRepository.updateById(id, entityYield);
  }

  @put('/entity-yields/{id}')
  @response(204, {
    description: 'EntityYield PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() entityYield: EntityYield,
  ): Promise<void> {
    await this.entityYieldRepository.replaceById(id, entityYield);
  }

  @del('/entity-yields/{id}')
  @response(204, {
    description: 'EntityYield DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.entityYieldRepository.deleteById(id);
  }
}
