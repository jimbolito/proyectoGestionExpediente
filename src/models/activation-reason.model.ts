import {Entity, model, property} from '@loopback/repository';

@model()
export class ActivationReason extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  activationReasonId?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  code?: string;

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
  modify?: string;

  @property({
    type: 'string',
  })
  expedientID?: string;

  constructor(data?: Partial<ActivationReason>) {
    super(data);
  }
}

export interface ActivationReasonRelations {
  // describe navigational properties here
}

export type ActivationReasonWithRelations = ActivationReason & ActivationReasonRelations;
