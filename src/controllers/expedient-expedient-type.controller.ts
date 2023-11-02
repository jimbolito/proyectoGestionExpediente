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
Enrollment,
ExpedientType,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientExpedientTypeController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/expedient-types', {
    responses: {
      '200': {
        description: 'Array of Expedient has many ExpedientType through Enrollment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ExpedientType)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ExpedientType>,
  ): Promise<ExpedientType[]> {
    return this.expedientRepository.enrollmentID(id).find(filter);
  }

  @post('/expedients/{id}/expedient-types', {
    responses: {
      '200': {
        description: 'create a ExpedientType model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExpedientType)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExpedientType, {
            title: 'NewExpedientTypeInExpedient',
            exclude: ['typeID'],
          }),
        },
      },
    }) expedientType: Omit<ExpedientType, 'typeID'>,
  ): Promise<ExpedientType> {
    return this.expedientRepository.enrollmentID(id).create(expedientType);
  }

  @patch('/expedients/{id}/expedient-types', {
    responses: {
      '200': {
        description: 'Expedient.ExpedientType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExpedientType, {partial: true}),
        },
      },
    })
    expedientType: Partial<ExpedientType>,
    @param.query.object('where', getWhereSchemaFor(ExpedientType)) where?: Where<ExpedientType>,
  ): Promise<Count> {
    return this.expedientRepository.enrollmentID(id).patch(expedientType, where);
  }

  @del('/expedients/{id}/expedient-types', {
    responses: {
      '200': {
        description: 'Expedient.ExpedientType DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ExpedientType)) where?: Where<ExpedientType>,
  ): Promise<Count> {
    return this.expedientRepository.enrollmentID(id).delete(where);
  }
}
