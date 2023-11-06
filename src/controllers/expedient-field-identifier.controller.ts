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
  FieldIdentifier,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientFieldIdentifierController {
  constructor(
    @repository(ExpedientRepository) protected expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/field-identifiers', {
    responses: {
      '200': {
        description: 'Array of Expedient has many FieldIdentifier',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FieldIdentifier)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<FieldIdentifier>,
  ): Promise<FieldIdentifier[]> {
    return this.expedientRepository.fieldIdentifiers(id).find(filter);
  }

  @post('/expedients/{id}/field-identifiers', {
    responses: {
      '200': {
        description: 'Expedient model instance',
        content: {'application/json': {schema: getModelSchemaRef(FieldIdentifier)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FieldIdentifier, {
            title: 'NewFieldIdentifierInExpedient',
            exclude: ['fielId'],
            optional: ['expedientID']
          }),
        },
      },
    }) fieldIdentifier: Omit<FieldIdentifier, 'fielId'>,
  ): Promise<FieldIdentifier> {
    return this.expedientRepository.fieldIdentifiers(id).create(fieldIdentifier);
  }

  @patch('/expedients/{id}/field-identifiers', {
    responses: {
      '200': {
        description: 'Expedient.FieldIdentifier PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FieldIdentifier, {partial: true}),
        },
      },
    })
    fieldIdentifier: Partial<FieldIdentifier>,
    @param.query.object('where', getWhereSchemaFor(FieldIdentifier)) where?: Where<FieldIdentifier>,
  ): Promise<Count> {
    return this.expedientRepository.fieldIdentifiers(id).patch(fieldIdentifier, where);
  }

  @del('/expedients/{id}/field-identifiers', {
    responses: {
      '200': {
        description: 'Expedient.FieldIdentifier DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FieldIdentifier)) where?: Where<FieldIdentifier>,
  ): Promise<Count> {
    return this.expedientRepository.fieldIdentifiers(id).delete(where);
  }
}
