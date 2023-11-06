import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {Expedient, ExpedientRelations, ActivationReason, ClientStatus, CustomerReturnReason, DepartureReason, EntityOriginal, EntityYield, ExpedientType, FieldIdentifier, GlobalCoherence, GlobalStatusManagement, Group, MainIntervener, ManagementStatus, ParalyzedReason, ProductType} from '../models';
import {ActivationReasonRepository} from './activation-reason.repository';
import {ClientStatusRepository} from './client-status.repository';
import {CustomerReturnReasonRepository} from './customer-return-reason.repository';
import {DepartureReasonRepository} from './departure-reason.repository';
import {EntityOriginalRepository} from './entity-original.repository';
import {EntityYieldRepository} from './entity-yield.repository';
import {ExpedientTypeRepository} from './expedient-type.repository';
import {FieldIdentifierRepository} from './field-identifier.repository';
import {GlobalCoherenceRepository} from './global-coherence.repository';
import {GlobalStatusManagementRepository} from './global-status-management.repository';
import {GroupRepository} from './group.repository';
import {MainIntervenerRepository} from './main-intervener.repository';
import {ManagementStatusRepository} from './management-status.repository';
import {ParalyzedReasonRepository} from './paralyzed-reason.repository';
import {ProductTypeRepository} from './product-type.repository';

export class ExpedientRepository extends DefaultCrudRepository<
  Expedient,
  typeof Expedient.prototype.expedientID,
  ExpedientRelations
> {

  public readonly activationReasons: HasManyRepositoryFactory<ActivationReason, typeof Expedient.prototype.expedientID>;

  public readonly clientStatuses: HasManyRepositoryFactory<ClientStatus, typeof Expedient.prototype.expedientID>;

  public readonly customerReturnReasons: HasManyRepositoryFactory<CustomerReturnReason, typeof Expedient.prototype.expedientID>;

  public readonly departureReasons: HasManyRepositoryFactory<DepartureReason, typeof Expedient.prototype.expedientID>;

  public readonly entityOriginals: HasManyRepositoryFactory<EntityOriginal, typeof Expedient.prototype.expedientID>;

  public readonly entityYields: HasManyRepositoryFactory<EntityYield, typeof Expedient.prototype.expedientID>;

  public readonly expedientTypes: HasManyRepositoryFactory<ExpedientType, typeof Expedient.prototype.expedientID>;

  public readonly fieldIdentifiers: HasManyRepositoryFactory<FieldIdentifier, typeof Expedient.prototype.expedientID>;

  public readonly globalCoherences: HasManyRepositoryFactory<GlobalCoherence, typeof Expedient.prototype.expedientID>;

  public readonly globalStatusManagements: HasManyRepositoryFactory<GlobalStatusManagement, typeof Expedient.prototype.expedientID>;

  public readonly groups: HasManyRepositoryFactory<Group, typeof Expedient.prototype.expedientID>;

  public readonly mainInterveners: HasManyRepositoryFactory<MainIntervener, typeof Expedient.prototype.expedientID>;

  public readonly managementStatuses: HasManyRepositoryFactory<ManagementStatus, typeof Expedient.prototype.expedientID>;

  public readonly paralyzedReasons: HasManyRepositoryFactory<ParalyzedReason, typeof Expedient.prototype.expedientID>;

  public readonly productTypes: HasManyRepositoryFactory<ProductType, typeof Expedient.prototype.expedientID>;

  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource, @repository.getter('ActivationReasonRepository') protected activationReasonRepositoryGetter: Getter<ActivationReasonRepository>, @repository.getter('ClientStatusRepository') protected clientStatusRepositoryGetter: Getter<ClientStatusRepository>, @repository.getter('CustomerReturnReasonRepository') protected customerReturnReasonRepositoryGetter: Getter<CustomerReturnReasonRepository>, @repository.getter('DepartureReasonRepository') protected departureReasonRepositoryGetter: Getter<DepartureReasonRepository>, @repository.getter('EntityOriginalRepository') protected entityOriginalRepositoryGetter: Getter<EntityOriginalRepository>, @repository.getter('EntityYieldRepository') protected entityYieldRepositoryGetter: Getter<EntityYieldRepository>, @repository.getter('ExpedientTypeRepository') protected expedientTypeRepositoryGetter: Getter<ExpedientTypeRepository>, @repository.getter('FieldIdentifierRepository') protected fieldIdentifierRepositoryGetter: Getter<FieldIdentifierRepository>, @repository.getter('GlobalCoherenceRepository') protected globalCoherenceRepositoryGetter: Getter<GlobalCoherenceRepository>, @repository.getter('GlobalStatusManagementRepository') protected globalStatusManagementRepositoryGetter: Getter<GlobalStatusManagementRepository>, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>, @repository.getter('MainIntervenerRepository') protected mainIntervenerRepositoryGetter: Getter<MainIntervenerRepository>, @repository.getter('ManagementStatusRepository') protected managementStatusRepositoryGetter: Getter<ManagementStatusRepository>, @repository.getter('ParalyzedReasonRepository') protected paralyzedReasonRepositoryGetter: Getter<ParalyzedReasonRepository>, @repository.getter('ProductTypeRepository') protected productTypeRepositoryGetter: Getter<ProductTypeRepository>,
  ) {
    super(Expedient, dataSource);
    this.productTypes = this.createHasManyRepositoryFactoryFor('productTypes', productTypeRepositoryGetter,);
    this.registerInclusionResolver('productTypes', this.productTypes.inclusionResolver);
    this.paralyzedReasons = this.createHasManyRepositoryFactoryFor('paralyzedReasons', paralyzedReasonRepositoryGetter,);
    this.registerInclusionResolver('paralyzedReasons', this.paralyzedReasons.inclusionResolver);
    this.managementStatuses = this.createHasManyRepositoryFactoryFor('managementStatuses', managementStatusRepositoryGetter,);
    this.registerInclusionResolver('managementStatuses', this.managementStatuses.inclusionResolver);
    this.mainInterveners = this.createHasManyRepositoryFactoryFor('mainInterveners', mainIntervenerRepositoryGetter,);
    this.registerInclusionResolver('mainInterveners', this.mainInterveners.inclusionResolver);
    this.groups = this.createHasManyRepositoryFactoryFor('groups', groupRepositoryGetter,);
    this.registerInclusionResolver('groups', this.groups.inclusionResolver);
    this.globalStatusManagements = this.createHasManyRepositoryFactoryFor('globalStatusManagements', globalStatusManagementRepositoryGetter,);
    this.registerInclusionResolver('globalStatusManagements', this.globalStatusManagements.inclusionResolver);
    this.globalCoherences = this.createHasManyRepositoryFactoryFor('globalCoherences', globalCoherenceRepositoryGetter,);
    this.registerInclusionResolver('globalCoherences', this.globalCoherences.inclusionResolver);
    this.fieldIdentifiers = this.createHasManyRepositoryFactoryFor('fieldIdentifiers', fieldIdentifierRepositoryGetter,);
    this.registerInclusionResolver('fieldIdentifiers', this.fieldIdentifiers.inclusionResolver);
    this.expedientTypes = this.createHasManyRepositoryFactoryFor('expedientTypes', expedientTypeRepositoryGetter,);
    this.registerInclusionResolver('expedientTypes', this.expedientTypes.inclusionResolver);
    this.entityYields = this.createHasManyRepositoryFactoryFor('entityYields', entityYieldRepositoryGetter,);
    this.registerInclusionResolver('entityYields', this.entityYields.inclusionResolver);
    this.entityOriginals = this.createHasManyRepositoryFactoryFor('entityOriginals', entityOriginalRepositoryGetter,);
    this.registerInclusionResolver('entityOriginals', this.entityOriginals.inclusionResolver);
    this.departureReasons = this.createHasManyRepositoryFactoryFor('departureReasons', departureReasonRepositoryGetter,);
    this.registerInclusionResolver('departureReasons', this.departureReasons.inclusionResolver);
    this.customerReturnReasons = this.createHasManyRepositoryFactoryFor('customerReturnReasons', customerReturnReasonRepositoryGetter,);
    this.registerInclusionResolver('customerReturnReasons', this.customerReturnReasons.inclusionResolver);
    this.clientStatuses = this.createHasManyRepositoryFactoryFor('clientStatuses', clientStatusRepositoryGetter,);
    this.registerInclusionResolver('clientStatuses', this.clientStatuses.inclusionResolver);
    this.activationReasons = this.createHasManyRepositoryFactoryFor('activationReasons', activationReasonRepositoryGetter,);
    this.registerInclusionResolver('activationReasons', this.activationReasons.inclusionResolver);
  }
}
