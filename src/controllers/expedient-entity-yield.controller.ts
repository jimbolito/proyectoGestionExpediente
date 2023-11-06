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
  EntityYield,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientEntityYieldController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/entity-yields', {
    responses: {
      '200': {
        description: 'Array of Expedient has many EntityYield',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EntityYield)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EntityYield>,
  ): Promise<EntityYield[]> {
    return this.expedientRepository.entityYields(id).find(filter);
  }

  @post('/expedients/{id}/entity-yields', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(EntityYield)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityYield, {
            title: 'NewEntityYieldInExpedient',
            exclude: ['entityYieldId'],
            optional: ['expedientID']
          }),
        },
      },
    }) entityYield: Omit<EntityYield, 'entityYieldId'>,
  ): Promise<EntityYield> {
    return this.expedientRepository.entityYields(id).create(entityYield);
  }

  @patch('/expedients/{id}/entity-yields', {
    responses: {
      '200': {
        description: 'Expedient.EntityYield PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntityYield, {partial: true}),
        },
      },
    })
    entityYield: Partial<EntityYield>,
    @param.query.object('where', getWhereSchemaFor(EntityYield)) where?: Where<EntityYield>,
  ): Promise<Count> {
    return this.expedientRepository.entityYields(id).patch(entityYield, where);
  }

  @del('/expedients/{id}/entity-yields', {
    responses: {
      '200': {
        description: 'Expedient.EntityYield DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EntityYield)) where?: Where<EntityYield>,
  ): Promise<Count> {
    return this.expedientRepository.entityYields(id).delete(where);
  }
}
