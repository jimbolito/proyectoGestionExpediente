import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  DepartureReason,
  DepartureReason,
} from '../models';
import {DepartureReasonRepository} from '../repositories';

export class DepartureReasonDepartureReasonController {
  constructor(
    @repository(DepartureReasonRepository) protected departureReasonRepository: DepartureReasonRepository,
  ) { }

  @get('/departure-reasons/{id}/departure-reasons', {
    responses: {
      '200': {
        description: 'Array of DepartureReason has many DepartureReason',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DepartureReason)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DepartureReason>,
  ): Promise<DepartureReason[]> {
    return this.departureReasonRepository.departureReasons(id).find(filter);
  }

  @post('/departure-reasons/{id}/departure-reasons', {
    responses: {
      '200': {
        description: 'DepartureReason model instance',
        content: {'application/json': {schema: getModelSchemaRef(DepartureReason)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DepartureReason.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartureReason, {
            title: 'NewDepartureReasonInDepartureReason',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) departureReason: Omit<DepartureReason, 'id'>,
  ): Promise<DepartureReason> {
    return this.departureReasonRepository.departureReasons(id).create(departureReason);
  }

  @patch('/departure-reasons/{id}/departure-reasons', {
    responses: {
      '200': {
        description: 'DepartureReason.DepartureReason PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartureReason, {partial: true}),
        },
      },
    })
    departureReason: Partial<DepartureReason>,
    @param.query.object('where', getWhereSchemaFor(DepartureReason)) where?: Where<DepartureReason>,
  ): Promise<Count> {
    return this.departureReasonRepository.departureReasons(id).patch(departureReason, where);
  }

  @del('/departure-reasons/{id}/departure-reasons', {
    responses: {
      '200': {
        description: 'DepartureReason.DepartureReason DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DepartureReason)) where?: Where<DepartureReason>,
  ): Promise<Count> {
    return this.departureReasonRepository.departureReasons(id).delete(where);
  }
}
