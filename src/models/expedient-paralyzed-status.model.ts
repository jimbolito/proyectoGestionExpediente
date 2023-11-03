import {Entity, model, property} from '@loopback/repository';

@model()
export class ExpedientParalyzedStatus extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  expedientParalyzedId?: string;


  constructor(data?: Partial<ExpedientParalyzedStatus>) {
    super(data);
  }
}

export interface ExpedientParalyzedStatusRelations {
  // describe navigational properties here
}

export type ExpedientParalyzedStatusWithRelations = ExpedientParalyzedStatus & ExpedientParalyzedStatusRelations;
