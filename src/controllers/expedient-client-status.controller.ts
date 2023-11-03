import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Expedient,
  ClientStatus,
} from '../models';
import {ExpedientRepository} from '../repositories';

export class ExpedientClientStatusController {
  constructor(
    @repository(ExpedientRepository)
    public expedientRepository: ExpedientRepository,
  ) { }

  @get('/expedients/{id}/client-status', {
    responses: {
      '200': {
        description: 'ClientStatus belonging to Expedient',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClientStatus),
          },
        },
      },
    },
  })
  async getClientStatus(
    @param.path.string('id') id: typeof Expedient.prototype.expedientID,
  ): Promise<ClientStatus> {
    return this.expedientRepository.clientStatus(id);
  }
}
