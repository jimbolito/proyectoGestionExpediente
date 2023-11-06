import {Entity, model, property} from '@loopback/repository';

@model()
export class EntityYield extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  entityYieldId?: string;

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

  @property({
    type: 'string',
  })
  expedientID?: string;

  constructor(data?: Partial<EntityYield>) {
    super(data);
  }
}

export interface EntityYieldRelations {
  // describe navigational properties here
}

export type EntityYieldWithRelations = EntityYield & EntityYieldRelations;
