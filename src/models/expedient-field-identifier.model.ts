import {Entity, model, property} from '@loopback/repository';

@model()
export class ExpedientFieldIdentifier extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  expedientFieldId?: string;


  constructor(data?: Partial<ExpedientFieldIdentifier>) {
    super(data);
  }
}

export interface ExpedientFieldIdentifierRelations {
  // describe navigational properties here
}

export type ExpedientFieldIdentifierWithRelations = ExpedientFieldIdentifier & ExpedientFieldIdentifierRelations;
