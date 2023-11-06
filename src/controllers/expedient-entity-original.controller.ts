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
  EntityOriginal,
  Expedient,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientEntityOriginalController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/entity-originals', {
    responses: {
      '200': {
        description: 'Array of Expedient has many EntityOriginal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EntityOriginal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EntityOriginal>,
  ): Promise<EntityOriginal[]> {
    return this.expedientRepository.entityOriginals(id).find(filter);
  }

  @post('/expedients/{id}/entity-originals', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(EntityOriginal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityOriginal, {
            title: 'NewEntityOriginalInExpedient',
            exclude: ['entitytOriginalId'],
            optional: ['expedientID']
          }),
        },
      },
    }) entityOriginal: Omit<EntityOriginal, 'id'>,
  ): Promise<EntityOriginal> {
    return this.expedientRepository.entityOriginals(id).create(entityOriginal);
  }

  @patch('/expedients/{id}/entity-originals', {
    responses: {
      '200': {
        description: 'Expedient.EntityOriginal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityOriginal, {partial: true}),
        },
      },
    })
    entityOriginal: Partial<EntityOriginal>,
    @param.query.object('where', getWhereSchemaFor(EntityOriginal)) where?: Where<EntityOriginal>,
  ): Promise<Count> {
    return this.expedientRepository.entityOriginals(id).patch(entityOriginal, where);
  }

  @del('/expedients/{id}/entity-originals', {
    responses: {
      '200': {
        description: 'Expedient.EntityOriginal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EntityOriginal)) where?: Where<EntityOriginal>,
  ): Promise<Count> {
    return this.expedientRepository.entityOriginals(id).delete(where);
  }
}
