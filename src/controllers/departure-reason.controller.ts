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
import {DepartureReason} from '../models';
import {DepartureReasonRepository} from '../repositories';

export class DepartureReasonController {
  constructor(
    @repository(DepartureReasonRepository)
    public departureReasonRepository : DepartureReasonRepository,
  ) {}

  @post('/departure-reasons')
  @response(200, {
    description: 'DepartureReason model instance',
    content: {'application/json': {schema: getModelSchemaRef(DepartureReason)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartureReason, {
            title: 'NewDepartureReason',
            exclude: ['departureReasonId'],
          }),
        },
      },
    })
    departureReason: Omit<DepartureReason, 'departureReasonId'>,
  ): Promise<DepartureReason> {
    return this.departureReasonRepository.create(departureReason);
  }

  @get('/departure-reasons/count')
  @response(200, {
    description: 'DepartureReason model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DepartureReason) where?: Where<DepartureReason>,
  ): Promise<Count> {
    return this.departureReasonRepository.count(where);
  }

  @get('/departure-reasons')
  @response(200, {
    description: 'Array of DepartureReason model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DepartureReason, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DepartureReason) filter?: Filter<DepartureReason>,
  ): Promise<DepartureReason[]> {
    return this.departureReasonRepository.find(filter);
  }

  @patch('/departure-reasons')
  @response(200, {
    description: 'DepartureReason PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartureReason, {partial: true}),
        },
      },
    })
    departureReason: DepartureReason,
    @param.where(DepartureReason) where?: Where<DepartureReason>,
  ): Promise<Count> {
    return this.departureReasonRepository.updateAll(departureReason, where);
  }

  @get('/departure-reasons/{id}')
  @response(200, {
    description: 'DepartureReason model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DepartureReason, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DepartureReason, {exclude: 'where'}) filter?: FilterExcludingWhere<DepartureReason>
  ): Promise<DepartureReason> {
    return this.departureReasonRepository.findById(id, filter);
  }

  @patch('/departure-reasons/{id}')
  @response(204, {
    description: 'DepartureReason PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartureReason, {partial: true}),
        },
      },
    })
    departureReason: DepartureReason,
  ): Promise<void> {
    await this.departureReasonRepository.updateById(id, departureReason);
  }

  @put('/departure-reasons/{id}')
  @response(204, {
    description: 'DepartureReason PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() departureReason: DepartureReason,
  ): Promise<void> {
    await this.departureReasonRepository.replaceById(id, departureReason);
  }

  @del('/departure-reasons/{id}')
  @response(204, {
    description: 'DepartureReason DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.departureReasonRepository.deleteById(id);
  }
}
