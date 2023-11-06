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
  GlobalStatusManagement,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientGlobalStatusManagementController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/global-status-managements', {
    responses: {
      '200': {
        description: 'Array of Expedient has many GlobalStatusManagement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GlobalStatusManagement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<GlobalStatusManagement>,
  ): Promise<GlobalStatusManagement[]> {
    return this.expedientRepository.globalStatusManagements(id).find(filter);
  }

  @post('/expedients/{id}/global-status-managements', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(GlobalStatusManagement)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalStatusManagement, {
            title: 'NewGlobalStatusManagementInExpedient',
            exclude: ['globalStatusManagementId'],
            optional: ['expedientID']
          }),
        },
      },
    }) globalStatusManagement: Omit<GlobalStatusManagement, 'id'>,
  ): Promise<GlobalStatusManagement> {
    return this.expedientRepository.globalStatusManagements(id).create(globalStatusManagement);
  }

  @patch('/expedients/{id}/global-status-managements', {
    responses: {
      '200': {
        description: 'Expedient.GlobalStatusManagement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlobalStatusManagement, {partial: true}),
        },
      },
    })
    globalStatusManagement: Partial<GlobalStatusManagement>,
    @param.query.object('where', getWhereSchemaFor(GlobalStatusManagement)) where?: Where<GlobalStatusManagement>,
  ): Promise<Count> {
    return this.expedientRepository.globalStatusManagements(id).patch(globalStatusManagement, where);
  }

  @del('/expedients/{id}/global-status-managements', {
    responses: {
      '200': {
        description: 'Expedient.GlobalStatusManagement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(GlobalStatusManagement)) where?: Where<GlobalStatusManagement>,
  ): Promise<Count> {
    return this.expedientRepository.globalStatusManagements(id).delete(where);
  }
}
