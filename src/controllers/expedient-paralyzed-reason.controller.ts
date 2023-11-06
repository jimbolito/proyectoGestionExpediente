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
  ParalyzedReason,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientParalyzedReasonController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/paralyzed-reasons', {
    responses: {
      '200': {
        description: 'Array of Expedient has many ParalyzedReason',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ParalyzedReason)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ParalyzedReason>,
  ): Promise<ParalyzedReason[]> {
    return this.expedientRepository.paralyzedReasons(id).find(filter);
  }

  @post('/expedients/{id}/paralyzed-reasons', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParalyzedReason)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParalyzedReason, {
            title: 'NewParalyzedReasonInExpedient',
            exclude: ['paralyzedReasonId'],
            optional: ['expedientID']
          }),
        },
      },
    }) paralyzedReason: Omit<ParalyzedReason, 'paralyzedReasonId'>,
  ): Promise<ParalyzedReason> {
    return this.expedientRepository.paralyzedReasons(id).create(paralyzedReason);
  }

  @patch('/expedients/{id}/paralyzed-reasons', {
    responses: {
      '200': {
        description: 'Expedient.ParalyzedReason PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParalyzedReason, {partial: true}),
        },
      },
    })
    paralyzedReason: Partial<ParalyzedReason>,
    @param.query.object('where', getWhereSchemaFor(ParalyzedReason)) where?: Where<ParalyzedReason>,
  ): Promise<Count> {
    return this.expedientRepository.paralyzedReasons(id).patch(paralyzedReason, where);
  }

  @del('/expedients/{id}/paralyzed-reasons', {
    responses: {
      '200': {
        description: 'Expedient.ParalyzedReason DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ParalyzedReason)) where?: Where<ParalyzedReason>,
  ): Promise<Count> {
    return this.expedientRepository.paralyzedReasons(id).delete(where);
  }
}
