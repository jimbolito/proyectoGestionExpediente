import {Entity, model, property} from '@loopback/repository';

@model()
export class ExpedientManinIntervener extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<ExpedientManinIntervener>) {
    super(data);
  }
}

export interface ExpedientManinIntervenerRelations {
  // describe navigational properties here
}

export type ExpedientManinIntervenerWithRelations = ExpedientManinIntervener & ExpedientManinIntervenerRelations;
