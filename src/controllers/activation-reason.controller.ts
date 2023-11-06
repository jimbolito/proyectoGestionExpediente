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
import {ActivationReason} from '../models';
import {ActivationReasonRepository} from '../repositories';

export class ActivationReasonController {
  constructor(
    @repository(ActivationReasonRepository)
    public activationReasonRepository : ActivationReasonRepository,
  ) {}

  @post('/activation-reasons')
  @response(200, {
    description: 'ActivationReason model instance',
    content: {'application/json': {schema: getModelSchemaRef(ActivationReason)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivationReason, {
            title: 'NewActivationReason',
            exclude: ['activationReasonId'],
          }),
        },
      },
    })
    activationReason: Omit<ActivationReason, 'activationReasonId'>,
  ): Promise<ActivationReason> {
    return this.activationReasonRepository.create(activationReason);
  }

  @get('/activation-reasons/count')
  @response(200, {
    description: 'ActivationReason model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ActivationReason) where?: Where<ActivationReason>,
  ): Promise<Count> {
    return this.activationReasonRepository.count(where);
  }

  @get('/activation-reasons')
  @response(200, {
    description: 'Array of ActivationReason model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ActivationReason, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ActivationReason) filter?: Filter<ActivationReason>,
  ): Promise<ActivationReason[]> {
    return this.activationReasonRepository.find(filter);
  }

  @patch('/activation-reasons')
  @response(200, {
    description: 'ActivationReason PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivationReason, {partial: true}),
        },
      },
    })
    activationReason: ActivationReason,
    @param.where(ActivationReason) where?: Where<ActivationReason>,
  ): Promise<Count> {
    return this.activationReasonRepository.updateAll(activationReason, where);
  }

  @get('/activation-reasons/{id}')
  @response(200, {
    description: 'ActivationReason model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ActivationReason, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ActivationReason, {exclude: 'where'}) filter?: FilterExcludingWhere<ActivationReason>
  ): Promise<ActivationReason> {
    return this.activationReasonRepository.findById(id, filter);
  }

  @patch('/activation-reasons/{id}')
  @response(204, {
    description: 'ActivationReason PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivationReason, {partial: true}),
        },
      },
    })
    activationReason: ActivationReason,
  ): Promise<void> {
    await this.activationReasonRepository.updateById(id, activationReason);
  }

  @put('/activation-reasons/{id}')
  @response(204, {
    description: 'ActivationReason PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() activationReason: ActivationReason,
  ): Promise<void> {
    await this.activationReasonRepository.replaceById(id, activationReason);
  }

  @del('/activation-reasons/{id}')
  @response(204, {
    description: 'ActivationReason DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.activationReasonRepository.deleteById(id);
  }
}
