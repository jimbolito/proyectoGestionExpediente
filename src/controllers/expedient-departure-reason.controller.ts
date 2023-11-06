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
  Expedient,
  DepartureReason,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientDepartureReasonController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/departure-reasons', {
    responses: {
      '200': {
        description: 'Array of Expedient has many DepartureReason',
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
    return this.expedientRepository.departureReasons(id).find(filter);
  }

  @post('/expedients/{id}/departure-reasons', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(DepartureReason)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartureReason, {
            title: 'NewDepartureReasonInExpedient',
            exclude: ['departureReasonId'],
            optional: ['expedientID']
          }),
        },
      },
    }) departureReason: Omit<DepartureReason, 'departureReasonId'>,
  ): Promise<DepartureReason> {
    return this.expedientRepository.departureReasons(id).create(departureReason);
  }

  @patch('/expedients/{id}/departure-reasons', {
    responses: {
      '200': {
        description: 'Expedient.DepartureReason PATCH success count',
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
    return this.expedientRepository.departureReasons(id).patch(departureReason, where);
  }

  @del('/expedients/{id}/departure-reasons', {
    responses: {
      '200': {
        description: 'Expedient.DepartureReason DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DepartureReason)) where?: Where<DepartureReason>,
  ): Promise<Count> {
    return this.expedientRepository.departureReasons(id).delete(where);
  }
}
