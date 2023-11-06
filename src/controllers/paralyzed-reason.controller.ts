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
import {ParalyzedReason} from '../models';
import {ParalyzedReasonRepository} from '../repositories';

export class ParalyzedReasonController {
  constructor(
    @repository(ParalyzedReasonRepository)
    public paralyzedReasonRepository : ParalyzedReasonRepository,
  ) {}

  @post('/paralyzed-reasons')
  @response(200, {
    description: 'ParalyzedReason model instance',
    content: {'application/json': {schema: getModelSchemaRef(ParalyzedReason)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParalyzedReason, {
            title: 'NewParalyzedReason',
            exclude: ['paralyzedReasonId'],
          }),
        },
      },
    })
    paralyzedReason: Omit<ParalyzedReason, 'paralyzedReasonId'>,
  ): Promise<ParalyzedReason> {
    return this.paralyzedReasonRepository.create(paralyzedReason);
  }

  @get('/paralyzed-reasons/count')
  @response(200, {
    description: 'ParalyzedReason model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ParalyzedReason) where?: Where<ParalyzedReason>,
  ): Promise<Count> {
    return this.paralyzedReasonRepository.count(where);
  }

  @get('/paralyzed-reasons')
  @response(200, {
    description: 'Array of ParalyzedReason model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ParalyzedReason, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ParalyzedReason) filter?: Filter<ParalyzedReason>,
  ): Promise<ParalyzedReason[]> {
    return this.paralyzedReasonRepository.find(filter);
  }

  @patch('/paralyzed-reasons')
  @response(200, {
    description: 'ParalyzedReason PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParalyzedReason, {partial: true}),
        },
      },
    })
    paralyzedReason: ParalyzedReason,
    @param.where(ParalyzedReason) where?: Where<ParalyzedReason>,
  ): Promise<Count> {
    return this.paralyzedReasonRepository.updateAll(paralyzedReason, where);
  }

  @get('/paralyzed-reasons/{id}')
  @response(200, {
    description: 'ParalyzedReason model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ParalyzedReason, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ParalyzedReason, {exclude: 'where'}) filter?: FilterExcludingWhere<ParalyzedReason>
  ): Promise<ParalyzedReason> {
    return this.paralyzedReasonRepository.findById(id, filter);
  }

  @patch('/paralyzed-reasons/{id}')
  @response(204, {
    description: 'ParalyzedReason PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParalyzedReason, {partial: true}),
        },
      },
    })
    paralyzedReason: ParalyzedReason,
  ): Promise<void> {
    await this.paralyzedReasonRepository.updateById(id, paralyzedReason);
  }

  @put('/paralyzed-reasons/{id}')
  @response(204, {
    description: 'ParalyzedReason PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() paralyzedReason: ParalyzedReason,
  ): Promise<void> {
    await this.paralyzedReasonRepository.replaceById(id, paralyzedReason);
  }

  @del('/paralyzed-reasons/{id}')
  @response(204, {
    description: 'ParalyzedReason DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paralyzedReasonRepository.deleteById(id);
  }
}
