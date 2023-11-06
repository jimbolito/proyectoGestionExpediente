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
  ActivationReason,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientActivationReasonController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/activation-reasons', {
    responses: {
      '200': {
        description: 'Array of Expedient has many ActivationReason',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ActivationReason)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ActivationReason>,
  ): Promise<ActivationReason[]> {
    return this.expedientRepository.activationReasons(id).find(filter);
  }

  @post('/expedients/{id}/activation-reasons', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActivationReason)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivationReason, {
            title: 'NewActivationReasonInExpedient',
            exclude: ['activationReasonId'],
            optional: ['expedientID']
          }),
        },
      },
    }) activationReason: Omit<ActivationReason, 'activationReasonId'>,
  ): Promise<ActivationReason> {
    return this.expedientRepository.activationReasons(id).create(activationReason);
  }

  @patch('/expedients/{id}/activation-reasons', {
    responses: {
      '200': {
        description: 'Expedient.ActivationReason PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActivationReason, {partial: true}),
        },
      },
    })
    activationReason: Partial<ActivationReason>,
    @param.query.object('where', getWhereSchemaFor(ActivationReason)) where?: Where<ActivationReason>,
  ): Promise<Count> {
    return this.expedientRepository.activationReasons(id).patch(activationReason, where);
  }

  @del('/expedients/{id}/activation-reasons', {
    responses: {
      '200': {
        description: 'Expedient.ActivationReason DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ActivationReason)) where?: Where<ActivationReason>,
  ): Promise<Count> {
    return this.expedientRepository.activationReasons(id).delete(where);
  }
}
