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
  MainIntervener,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientMainIntervenerController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/main-interveners', {
    responses: {
      '200': {
        description: 'Array of Expedient has many MainIntervener',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MainIntervener)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MainIntervener>,
  ): Promise<MainIntervener[]> {
    return this.expedientRepository.mainInterveners(id).find(filter);
  }

  @post('/expedients/{id}/main-interveners', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(MainIntervener)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MainIntervener, {
            title: 'NewMainIntervenerInExpedient',
            exclude: ['mainIntervenerId'],
            optional: ['expedientID']
          }),
        },
      },
    }) mainIntervener: Omit<MainIntervener, 'mainIntervenerId'>,
  ): Promise<MainIntervener> {
    return this.expedientRepository.mainInterveners(id).create(mainIntervener);
  }

  @patch('/expedients/{id}/main-interveners', {
    responses: {
      '200': {
        description: 'Expedient.MainIntervener PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MainIntervener, {partial: true}),
        },
      },
    })
    mainIntervener: Partial<MainIntervener>,
    @param.query.object('where', getWhereSchemaFor(MainIntervener)) where?: Where<MainIntervener>,
  ): Promise<Count> {
    return this.expedientRepository.mainInterveners(id).patch(mainIntervener, where);
  }

  @del('/expedients/{id}/main-interveners', {
    responses: {
      '200': {
        description: 'Expedient.MainIntervener DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MainIntervener)) where?: Where<MainIntervener>,
  ): Promise<Count> {
    return this.expedientRepository.mainInterveners(id).delete(where);
  }
}
