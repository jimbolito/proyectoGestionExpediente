import {Entity, model, property} from '@loopback/repository';

@model()
export class Group extends Entity {
  @property({
    type: 'string',
  })
  shortDescription?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idGroup?: string;

  @property({
    type: 'string',
  })
  longDescription?: string;

  @property({
    type: 'date',
    required: true,
  })
  dateAssignation: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

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


  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
