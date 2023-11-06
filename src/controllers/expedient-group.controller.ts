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
  Group,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientGroupController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/groups', {
    responses: {
      '200': {
        description: 'Array of Expedient has many Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Group)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Group>,
  ): Promise<Group[]> {
    return this.expedientRepository.groups(id).find(filter);
  }

  @post('/expedients/{id}/groups', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(Group)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {
            title: 'NewGroupInExpedient',
            exclude: ['groupId'],
            optional: ['expedientID']
          }),
        },
      },
    }) group: Omit<Group, 'groupId'>,
  ): Promise<Group> {
    return this.expedientRepository.groups(id).create(group);
  }

  @patch('/expedients/{id}/groups', {
    responses: {
      '200': {
        description: 'Expedient.Group PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Group, {partial: true}),
        },
      },
    })
    group: Partial<Group>,
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return this.expedientRepository.groups(id).patch(group, where);
  }

  @del('/expedients/{id}/groups', {
    responses: {
      '200': {
        description: 'Expedient.Group DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Group)) where?: Where<Group>,
  ): Promise<Count> {
    return this.expedientRepository.groups(id).delete(where);
  }
}
