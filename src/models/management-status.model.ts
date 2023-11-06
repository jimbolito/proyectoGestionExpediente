import {Entity, model, property} from '@loopback/repository';

@model()
export class ManagementStatus extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  managementStatusId?: string;

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


  constructor(data?: Partial<ManagementStatus>) {
    super(data);
  }
}

export interface ManagementStatusRelations {
  // describe navigational properties here
}

export type ManagementStatusWithRelations = ManagementStatus & ManagementStatusRelations;


// Relación de "Uno a Uno" (1:1):

// Una posible relación sería "uno a uno", lo que significa que cada expediente tiene un estado de gestión
// asociado y cada estado de gestión está vinculado a un solo expediente. Esto implica que un expediente
// tiene un único estado de gestión y que un estado de gestión está relacionado con un solo expediente.
