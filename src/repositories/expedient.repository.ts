import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {Expedient, ExpedientRelations, ActivationReason} from '../models';
import {ActivationReasonRepository} from './activation-reason.repository';

export class ExpedientRepository extends DefaultCrudRepository<
  Expedient,
  typeof Expedient.prototype.expedientID,
  ExpedientRelations
> {

  public readonly activationReasons: HasManyRepositoryFactory<ActivationReason, typeof Expedient.prototype.expedientID>;

  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource, @repository.getter('ActivationReasonRepository') protected activationReasonRepositoryGetter: Getter<ActivationReasonRepository>,
  ) {
    super(Expedient, dataSource);
    this.activationReasons = this.createHasManyRepositoryFactoryFor('activationReasons', activationReasonRepositoryGetter,);
    this.registerInclusionResolver('activationReasons', this.activationReasons.inclusionResolver);
  }
}
