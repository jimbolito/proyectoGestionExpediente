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
import {EntityOriginal} from '../models';
import {EntityOriginalRepository} from '../repositories';

export class EntityOriginalController {
  constructor(
    @repository(EntityOriginalRepository)
    public entityOriginalRepository : EntityOriginalRepository,
  ) {}

  @post('/entity-originals')
  @response(200, {
    description: 'EntityOriginal model instance',
    content: {'application/json': {schema: getModelSchemaRef(EntityOriginal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityOriginal, {
            title: 'NewEntityOriginal',
            exclude: ['entitytOriginalId'],
          }),
        },
      },
    })
    entityOriginal: Omit<EntityOriginal, 'entitytOriginalId'>,
  ): Promise<EntityOriginal> {
    return this.entityOriginalRepository.create(entityOriginal);
  }

  @get('/entity-originals/count')
  @response(200, {
    description: 'EntityOriginal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EntityOriginal) where?: Where<EntityOriginal>,
  ): Promise<Count> {
    return this.entityOriginalRepository.count(where);
  }

  @get('/entity-originals')
  @response(200, {
    description: 'Array of EntityOriginal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EntityOriginal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EntityOriginal) filter?: Filter<EntityOriginal>,
  ): Promise<EntityOriginal[]> {
    return this.entityOriginalRepository.find(filter);
  }

  @patch('/entity-originals')
  @response(200, {
    description: 'EntityOriginal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityOriginal, {partial: true}),
        },
      },
    })
    entityOriginal: EntityOriginal,
    @param.where(EntityOriginal) where?: Where<EntityOriginal>,
  ): Promise<Count> {
    return this.entityOriginalRepository.updateAll(entityOriginal, where);
  }

  @get('/entity-originals/{id}')
  @response(200, {
    description: 'EntityOriginal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EntityOriginal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EntityOriginal, {exclude: 'where'}) filter?: FilterExcludingWhere<EntityOriginal>
  ): Promise<EntityOriginal> {
    return this.entityOriginalRepository.findById(id, filter);
  }

  @patch('/entity-originals/{id}')
  @response(204, {
    description: 'EntityOriginal PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityOriginal, {partial: true}),
        },
      },
    })
    entityOriginal: EntityOriginal,
  ): Promise<void> {
    await this.entityOriginalRepository.updateById(id, entityOriginal);
  }

  @put('/entity-originals/{id}')
  @response(204, {
    description: 'EntityOriginal PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() entityOriginal: EntityOriginal,
  ): Promise<void> {
    await this.entityOriginalRepository.replaceById(id, entityOriginal);
  }

  @del('/entity-originals/{id}')
  @response(204, {
    description: 'EntityOriginal DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.entityOriginalRepository.deleteById(id);
  }
}
