import {Entity, model, property} from '@loopback/repository';

@model()
export class MainIntervener extends Entity {
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


  constructor(data?: Partial<MainIntervener>) {
    super(data);
  }
}

export interface MainIntervenerRelations {
  // describe navigational properties here
}

export type MainIntervenerWithRelations = MainIntervener & MainIntervenerRelations;
