import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {DepartureReason, DepartureReasonRelations} from '../models';
import {DepartureReasonRepository} from './departure-reason.repository';

export class DepartureReasonRepository extends DefaultCrudRepository<
  DepartureReason,
  typeof DepartureReason.prototype.id,
  DepartureReasonRelations
> {

  public readonly departureReasons: HasManyRepositoryFactory<DepartureReason, typeof DepartureReason.prototype.id>;

  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource, @repository.getter('DepartureReasonRepository') protected departureReasonRepositoryGetter: Getter<DepartureReasonRepository>,
  ) {
    super(DepartureReason, dataSource);
    this.departureReasons = this.createHasManyRepositoryFactoryFor('departureReasons', departureReasonRepositoryGetter,);
    this.registerInclusionResolver('departureReasons', this.departureReasons.inclusionResolver);
  }
}
