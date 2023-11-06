import {Entity, model, property, hasMany} from '@loopback/repository';
import {DepartureReason} from './departure-reason.model';

@model()
export class DepartureReason extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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
  modifyAt?: string;

  @hasMany(() => DepartureReason, {keyTo: 'id'})
  departureReasons: DepartureReason[];

  constructor(data?: Partial<DepartureReason>) {
    super(data);
  }
}

export interface DepartureReasonRelations {
  // describe navigational properties here
}

export type DepartureReasonWithRelations = DepartureReason & DepartureReasonRelations;
