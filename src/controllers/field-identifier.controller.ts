import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {FieldIdentifier} from '../models';
import {FieldIdentifierRepository} from '../repositories';

export class FieldIdentifierController {
  constructor(
    @repository(FieldIdentifierRepository)
    public fieldIdentifierRepository : FieldIdentifierRepository,
  ) {}

  @post('/field-identifiers')
  @response(200, {
    description: 'FieldIdentifier model instance',
    content: {'application/json': {schema: getModelSchemaRef(FieldIdentifier)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FieldIdentifier, {
            title: 'NewFieldIdentifier',
            exclude: ['fielId'],
          }),
        },
      },
    })
    fieldIdentifier: Omit<FieldIdentifier, 'fielId'>,
  ): Promise<FieldIdentifier> {
    return this.fieldIdentifierRepository.create(fieldIdentifier);
  }

  @get('/field-identifiers/count')
  @response(200, {
    description: 'FieldIdentifier model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FieldIdentifier) where?: Where<FieldIdentifier>,
  ): Promise<Count> {
    return this.fieldIdentifierRepository.count(where);
  }

  @get('/field-identifiers')
  @response(200, {
    description: 'Array of FieldIdentifier model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FieldIdentifier, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FieldIdentifier) filter?: Filter<FieldIdentifier>,
  ): Promise<FieldIdentifier[]> {
    return this.fieldIdentifierRepository.find(filter);
  }

  @patch('/field-identifiers')
  @response(200, {
    description: 'FieldIdentifier PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FieldIdentifier, {partial: true}),
        },
      },
    })
    fieldIdentifier: FieldIdentifier,
    @param.where(FieldIdentifier) where?: Where<FieldIdentifier>,
  ): Promise<Count> {
    return this.fieldIdentifierRepository.updateAll(fieldIdentifier, where);
  }

  @get('/field-identifiers/{id}')
  @response(200, {
    description: 'FieldIdentifier model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FieldIdentifier, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FieldIdentifier, {exclude: 'where'}) filter?: FilterExcludingWhere<FieldIdentifier>
  ): Promise<FieldIdentifier> {
    return this.fieldIdentifierRepository.findById(id, filter);
  }

  @patch('/field-identifiers/{id}')
  @response(204, {
    description: 'FieldIdentifier PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FieldIdentifier, {partial: true}),
        },
      },
    })
    fieldIdentifier: FieldIdentifier,
  ): Promise<void> {
    await this.fieldIdentifierRepository.updateById(id, fieldIdentifier);
  }

  @put('/field-identifiers/{id}')
  @response(204, {
    description: 'FieldIdentifier PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fieldIdentifier: FieldIdentifier,
  ): Promise<void> {
    await this.fieldIdentifierRepository.replaceById(id, fieldIdentifier);
  }

  @del('/field-identifiers/{id}')
  @response(204, {
    description: 'FieldIdentifier DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fieldIdentifierRepository.deleteById(id);
  }
}
