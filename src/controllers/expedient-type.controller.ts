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
import {ExpedientType} from '../models';
import {ExpedientTypeRepository} from '../repositories';

export class ExpedientTypeController {
  constructor(
    @repository(ExpedientTypeRepository)
    public expedientTypeRepository : ExpedientTypeRepository,
  ) {}

  @post('/expedient-types')
  @response(200, {
    description: 'ExpedientType model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExpedientType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExpedientType, {
            title: 'NewExpedientType',
            exclude: ['expedientTypeId'],
          }),
        },
      },
    })
    expedientType: Omit<ExpedientType, 'expedientTypeId'>,
  ): Promise<ExpedientType> {
    return this.expedientTypeRepository.create(expedientType);
  }

  @get('/expedient-types/count')
  @response(200, {
    description: 'ExpedientType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ExpedientType) where?: Where<ExpedientType>,
  ): Promise<Count> {
    return this.expedientTypeRepository.count(where);
  }

  @get('/expedient-types')
  @response(200, {
    description: 'Array of ExpedientType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ExpedientType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ExpedientType) filter?: Filter<ExpedientType>,
  ): Promise<ExpedientType[]> {
    return this.expedientTypeRepository.find(filter);
  }

  @patch('/expedient-types')
  @response(200, {
    description: 'ExpedientType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExpedientType, {partial: true}),
        },
      },
    })
    expedientType: ExpedientType,
    @param.where(ExpedientType) where?: Where<ExpedientType>,
  ): Promise<Count> {
    return this.expedientTypeRepository.updateAll(expedientType, where);
  }

  @get('/expedient-types/{id}')
  @response(200, {
    description: 'ExpedientType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ExpedientType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ExpedientType, {exclude: 'where'}) filter?: FilterExcludingWhere<ExpedientType>
  ): Promise<ExpedientType> {
    return this.expedientTypeRepository.findById(id, filter);
  }

  @patch('/expedient-types/{id}')
  @response(204, {
    description: 'ExpedientType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExpedientType, {partial: true}),
        },
      },
    })
    expedientType: ExpedientType,
  ): Promise<void> {
    await this.expedientTypeRepository.updateById(id, expedientType);
  }

  @put('/expedient-types/{id}')
  @response(204, {
    description: 'ExpedientType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() expedientType: ExpedientType,
  ): Promise<void> {
    await this.expedientTypeRepository.replaceById(id, expedientType);
  }

  @del('/expedient-types/{id}')
  @response(204, {
    description: 'ExpedientType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.expedientTypeRepository.deleteById(id);
  }
}
