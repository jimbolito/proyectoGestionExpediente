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
  ManagementStatus,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientManagementStatusController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/management-status', {
    responses: {
      '200': {
        description: 'Expedient has one ManagementStatus',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ManagementStatus),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ManagementStatus>,
  ): Promise<ManagementStatus> {
    return this.expedientRepository.managementStatusId(id).get(filter);
  }

  @post('/expedients/{id}/management-status', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(ManagementStatus)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ManagementStatus, {
            title: 'NewManagementStatusInExpedient',
            exclude: ['managementStatusId'],
            optional: ['expedientID']
          }),
        },
      },
    }) managementStatus: Omit<ManagementStatus, 'managementStatusId'>,
  ): Promise<ManagementStatus> {
    return this.expedientRepository.managementStatusId(id).create(managementStatus);
  }

  @patch('/expedients/{id}/management-status', {
    responses: {
      '200': {
        description: 'Expedient.ManagementStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ManagementStatus, {partial: true}),
        },
      },
    })
    managementStatus: Partial<ManagementStatus>,
    @param.query.object('where', getWhereSchemaFor(ManagementStatus)) where?: Where<ManagementStatus>,
  ): Promise<Count> {
    return this.expedientRepository.managementStatusId(id).patch(managementStatus, where);
  }

  @del('/expedients/{id}/management-status', {
    responses: {
      '200': {
        description: 'Expedient.ManagementStatus DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ManagementStatus)) where?: Where<ManagementStatus>,
  ): Promise<Count> {
    return this.expedientRepository.managementStatusId(id).delete(where);
  }
}
