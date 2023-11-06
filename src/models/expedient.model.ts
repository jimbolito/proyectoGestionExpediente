import {Entity, model, property, hasMany} from '@loopback/repository';
import {ActivationReason} from './activation-reason.model';
import {ClientStatus} from './client-status.model';

@model()
export class Expedient extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  expedientID?: string;

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
  })
  group?: number;//fgggg

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
    required: true,
  })
  dateReceptionDocument: string;

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
  })
  managementStatusReason?: string;

  @property({
    type: 'string',
  })
  managementStatusDate?: string;

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
    type: 'date',
  })
  globalStatusDate?: string;

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
  })
  machines?: object;

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
  })
  reviewIds?: string;

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
  })
  targetDate?: string;

  @property({
    type: 'string',
  })
  territorialAddress?: string;
  @property({
    type: 'date',
  })
  clientStatusDate?: string;

  @property({
    type: 'string',
  })
  managerDescription?: string;

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

  @hasMany(() => ActivationReason, {keyTo: 'expedientID'})
  activationReasons: ActivationReason[];

  @hasMany(() => ClientStatus, {keyTo: 'expedientID'})
  clientStatuses: ClientStatus[];

  constructor(data?: Partial<Expedient>) {
    super(data);
  }
}


export interface ExpedientRelations {
  // describe navigational properties here
}

export type ExpedientWithRelations = Expedient & ExpedientRelations;
