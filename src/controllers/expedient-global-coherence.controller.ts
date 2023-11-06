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
  GlobalCoherence,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientGlobalCoherenceController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/global-coherences', {
    responses: {
      '200': {
        description: 'Array of Expedient has many GlobalCoherence',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GlobalCoherence)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<GlobalCoherence>,
  ): Promise<GlobalCoherence[]> {
    return this.expedientRepository.globalCoherences(id).find(filter);
  }

  @post('/expedients/{id}/global-coherences', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(GlobalCoherence)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalCoherence, {
            title: 'NewGlobalCoherenceInExpedient',
            exclude: ['globalCoherenceId'],
            optional: ['expedientID']
          }),
        },
      },
    }) globalCoherence: Omit<GlobalCoherence, 'id'>,
  ): Promise<GlobalCoherence> {
    return this.expedientRepository.globalCoherences(id).create(globalCoherence);
  }

  @patch('/expedients/{id}/global-coherences', {
    responses: {
      '200': {
        description: 'Expedient.GlobalCoherence PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalCoherence, {partial: true}),
        },
      },
    })
    globalCoherence: Partial<GlobalCoherence>,
    @param.query.object('where', getWhereSchemaFor(GlobalCoherence)) where?: Where<GlobalCoherence>,
  ): Promise<Count> {
    return this.expedientRepository.globalCoherences(id).patch(globalCoherence, where);
  }

  @del('/expedients/{id}/global-coherences', {
    responses: {
      '200': {
        description: 'Expedient.GlobalCoherence DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(GlobalCoherence)) where?: Where<GlobalCoherence>,
  ): Promise<Count> {
    return this.expedientRepository.globalCoherences(id).delete(where);
  }
}
