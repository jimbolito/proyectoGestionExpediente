import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {Expedient, ExpedientRelations, ActivationReason, ClientStatus, CustomerReturnReason} from '../models';
import {ActivationReasonRepository} from './activation-reason.repository';
import {ClientStatusRepository} from './client-status.repository';
import {CustomerReturnReasonRepository} from './customer-return-reason.repository';

export class ExpedientRepository extends DefaultCrudRepository<
  Expedient,
  typeof Expedient.prototype.expedientID,
  ExpedientRelations
> {

  public readonly activationReasons: HasManyRepositoryFactory<ActivationReason, typeof Expedient.prototype.expedientID>;

  public readonly clientStatuses: HasManyRepositoryFactory<ClientStatus, typeof Expedient.prototype.expedientID>;

  public readonly customerReturnReasons: HasManyRepositoryFactory<CustomerReturnReason, typeof Expedient.prototype.expedientID>;

  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource, @repository.getter('ActivationReasonRepository') protected activationReasonRepositoryGetter: Getter<ActivationReasonRepository>, @repository.getter('ClientStatusRepository') protected clientStatusRepositoryGetter: Getter<ClientStatusRepository>, @repository.getter('CustomerReturnReasonRepository') protected customerReturnReasonRepositoryGetter: Getter<CustomerReturnReasonRepository>,
  ) {
    super(Expedient, dataSource);
    this.customerReturnReasons = this.createHasManyRepositoryFactoryFor('customerReturnReasons', customerReturnReasonRepositoryGetter,);
    this.registerInclusionResolver('customerReturnReasons', this.customerReturnReasons.inclusionResolver);
    this.clientStatuses = this.createHasManyRepositoryFactoryFor('clientStatuses', clientStatusRepositoryGetter,);
    this.registerInclusionResolver('clientStatuses', this.clientStatuses.inclusionResolver);
    this.activationReasons = this.createHasManyRepositoryFactoryFor('activationReasons', activationReasonRepositoryGetter,);
    this.registerInclusionResolver('activationReasons', this.activationReasons.inclusionResolver);
  }
}
