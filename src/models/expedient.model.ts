import {Entity, model, property} from '@loopback/repository';

@model()
export class Expedient extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  applicationDate: string;

  @property({
    type: 'string',
    required: true,
  })
  designationDate: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  idExpMecides: string;

  @property({
    type: 'number',
    default: 1,
  })
  group?: number;

  @property({
    type: 'string',
    required: true,
  })
  idEntityYield: string;

  @property({
    type: 'string',
    required: true,
  })
  idEntityOrigin: string;

  @property({
    type: 'string',
    required: true,
  })
  idSubPortfolio: string;

  @property({
    type: 'date',
    required: true,
  })
  dateAssignament: string;

  @property({
    type: 'date',
    required: true,
  })
  highDateSystem: string;

  @property({
    type: 'date',
  })
  dateReceptionDocument?: string;

  @property({
    type: 'date',
    required: true,
  })
  dateStartManagement: string;

  @property({
    type: 'string',
    required: true,
  })
  idScopeManagement: string;

  @property({
    type: 'string',
    required: true,
  })
  idManagementStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  managementStatusReason: string;

  @property({
    type: 'string',
    required: true,
  })
  managementStatusDate: string;

  @property({
    type: 'string',
    required: true,
  })
  idGlobalStatusManagement: string;

  @property({
    type: 'string',
    required: true,
  })
  idGlobalCoherence: string;

  @property({
    type: 'string',
    required: true,
  })
  globalStatusDate: string;

  @property({
    type: 'string',
    required: true,
  })
  idDepartureReason: string;

  @property({
    type: 'string',
    required: true,
  })
  idCustomerReturnReason: string;

  @property({
    type: 'string',
    required: true,
  })
  idParalyzedReason: string;

  @property({
    type: 'string',
    required: true,
  })
  idActivationReason: string;

  @property({
    type: 'string',
    required: true,
  })
  idExpedientType: string;

  @property({
    type: 'object',
    required: true,
  })
  machines: object;

  @property({
    type: 'string',
    required: true,
  })
  idMainIntervener: string;

  @property({
    type: 'string',
  })
  documentIds?: string;

  @property({
    type: 'string',
    required: true,
  })
  settlementIds: string;

  @property({
    type: 'string',
    required: true,
  })
  reviewIds: string;

  @property({
    type: 'string',
    required: true,
  })
  productType: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tags?: string[];

  @property({
    type: 'date',
    required: true,
  })
  targetDate: string;

  @property({
    type: 'string',
  })
  territorialAddress?: string;

  @property({
    type: 'string',
  })
  clientStatusId?: string;

  @property({
    type: 'date',
    required: true,
  })
  clientStatusDate: string;

  @property({
    type: 'string',
    required: true,
  })
  managerDescription: string;

  @property({
    type: 'date',
    required: true,
  })
  exanteDate: string;

  @property({
    type: 'date',
    required: true,
  })
  exanteCompleteDate: string;

  @property({
    type: 'date',
    required: true,
  })
  expostDate: string;


  constructor(data?: Partial<Expedient>) {
    super(data);
  }
}

export interface ExpedientRelations {
  // describe navigational properties here
}

export type ExpedientWithRelations = Expedient & ExpedientRelations;
