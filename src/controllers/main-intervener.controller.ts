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
import {MainIntervener} from '../models';
import {MainIntervenerRepository} from '../repositories';

export class MainIntervenerController {
  constructor(
    @repository(MainIntervenerRepository)
    public mainIntervenerRepository : MainIntervenerRepository,
  ) {}

  @post('/main-interveners')
  @response(200, {
    description: 'MainIntervener model instance',
    content: {'application/json': {schema: getModelSchemaRef(MainIntervener)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MainIntervener, {
            title: 'NewMainIntervener',
            exclude: ['mainIntervenerId'],
          }),
        },
      },
    })
    mainIntervener: Omit<MainIntervener, 'mainIntervenerId'>,
  ): Promise<MainIntervener> {
    return this.mainIntervenerRepository.create(mainIntervener);
  }

  @get('/main-interveners/count')
  @response(200, {
    description: 'MainIntervener model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MainIntervener) where?: Where<MainIntervener>,
  ): Promise<Count> {
    return this.mainIntervenerRepository.count(where);
  }

  @get('/main-interveners')
  @response(200, {
    description: 'Array of MainIntervener model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MainIntervener, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MainIntervener) filter?: Filter<MainIntervener>,
  ): Promise<MainIntervener[]> {
    return this.mainIntervenerRepository.find(filter);
  }

  @patch('/main-interveners')
  @response(200, {
    description: 'MainIntervener PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MainIntervener, {partial: true}),
        },
      },
    })
    mainIntervener: MainIntervener,
    @param.where(MainIntervener) where?: Where<MainIntervener>,
  ): Promise<Count> {
    return this.mainIntervenerRepository.updateAll(mainIntervener, where);
  }

  @get('/main-interveners/{id}')
  @response(200, {
    description: 'MainIntervener model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MainIntervener, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MainIntervener, {exclude: 'where'}) filter?: FilterExcludingWhere<MainIntervener>
  ): Promise<MainIntervener> {
    return this.mainIntervenerRepository.findById(id, filter);
  }

  @patch('/main-interveners/{id}')
  @response(204, {
    description: 'MainIntervener PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MainIntervener, {partial: true}),
        },
      },
    })
    mainIntervener: MainIntervener,
  ): Promise<void> {
    await this.mainIntervenerRepository.updateById(id, mainIntervener);
  }

  @put('/main-interveners/{id}')
  @response(204, {
    description: 'MainIntervener PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mainIntervener: MainIntervener,
  ): Promise<void> {
    await this.mainIntervenerRepository.replaceById(id, mainIntervener);
  }

  @del('/main-interveners/{id}')
  @response(204, {
    description: 'MainIntervener DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mainIntervenerRepository.deleteById(id);
  }
}
