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
import {Expedient} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientController {
  constructor(
    @repository(ExpedientRepository)
    public expedientRepository : ExpedientRepository,
  ) {}

  @post('/expedients')
  @response(200, {
    description: 'Expedient model instance',
    content: {'application/json': {schema: getModelSchemaRef(Expedient)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expedient, {
            title: 'NewExpedient',
            exclude: ['expedientID'],
          }),
        },
      },
    })
    expedient: Omit<Expedient, 'expedientID'>,
  ): Promise<Expedient> {
    return this.expedientRepository.create(expedient);
  }

  @get('/expedients/count')
  @response(200, {
    description: 'Expedient model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Expedient) where?: Where<Expedient>,
  ): Promise<Count> {
    return this.expedientRepository.count(where);
  }

  @get('/expedients')
  @response(200, {
    description: 'Array of Expedient model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Expedient, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Expedient) filter?: Filter<Expedient>,
  ): Promise<Expedient[]> {
    return this.expedientRepository.find(filter);
  }

  @patch('/expedients')
  @response(200, {
    description: 'Expedient PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expedient, {partial: true}),
        },
      },
    })
    expedient: Expedient,
    @param.where(Expedient) where?: Where<Expedient>,
  ): Promise<Count> {
    return this.expedientRepository.updateAll(expedient, where);
  }

  @get('/expedients/{id}')
  @response(200, {
    description: 'Expedient model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Expedient, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Expedient, {exclude: 'where'}) filter?: FilterExcludingWhere<Expedient>
  ): Promise<Expedient> {
    return this.expedientRepository.findById(id, filter);
  }

  @patch('/expedients/{id}')
  @response(204, {
    description: 'Expedient PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expedient, {partial: true}),
        },
      },
    })
    expedient: Expedient,
  ): Promise<void> {
    await this.expedientRepository.updateById(id, expedient);
  }

  @put('/expedients/{id}')
  @response(204, {
    description: 'Expedient PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() expedient: Expedient,
  ): Promise<void> {
    await this.expedientRepository.replaceById(id, expedient);
  }

  @del('/expedients/{id}')
  @response(204, {
    description: 'Expedient DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.expedientRepository.deleteById(id);
  }
}
