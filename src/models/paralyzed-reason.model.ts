import {Entity, model, property} from '@loopback/repository';

@model()
export class ParalyzedReason extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  paralyzedReasonId?: string;

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
    type: 'date',
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

  constructor(data?: Partial<ParalyzedReason>) {
    super(data);
  }
}

export interface ParalyzedReasonRelations {
  // describe navigational properties here
}

export type ParalyzedReasonWithRelations = ParalyzedReason & ParalyzedReasonRelations;
