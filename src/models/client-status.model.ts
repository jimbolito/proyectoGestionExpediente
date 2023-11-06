import {Entity, model, property} from '@loopback/repository';

@model()
export class ClientStatus extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  clientStatusId?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  shortDescription?: string;

  @property({
    type: 'string',
  })
  longDescription?: string;

  @property({
    type: 'date',
    required: true,
  })
  createAt: string;

  @property({
    type: 'date',
  })
  deleteAt?: string;

  @property({
    type: 'date',
  })
  modifyAt?: string;

  @property({
    type: 'string',
  })
  expedientID?: string;

  constructor(data?: Partial<ClientStatus>) {
    super(data);
  }
}

export interface ClientStatusRelations {
  // describe navigational properties here
}

export type ClientStatusWithRelations = ClientStatus & ClientStatusRelations;
