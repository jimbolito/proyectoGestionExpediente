import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {Expedient, ExpedientRelations, ExpedientType, Enrollment, ClientStatus} from '../models';
import {EnrollmentRepository} from './enrollment.repository';
import {ExpedientTypeRepository} from './expedient-type.repository';
import {ClientStatusRepository} from './client-status.repository';

export class ExpedientRepository extends DefaultCrudRepository<
  Expedient,
  typeof Expedient.prototype.expedientID,
  ExpedientRelations
> {

  public readonly enrollmentID: HasManyThroughRepositoryFactory<ExpedientType, typeof ExpedientType.prototype.typeID,
          Enrollment,
          typeof Expedient.prototype.expedientID
        >;

  public readonly clientStatus: BelongsToAccessor<ClientStatus, typeof Expedient.prototype.expedientID>;

  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource, @repository.getter('EnrollmentRepository') protected enrollmentRepositoryGetter: Getter<EnrollmentRepository>, @repository.getter('ExpedientTypeRepository') protected expedientTypeRepositoryGetter: Getter<ExpedientTypeRepository>, @repository.getter('ClientStatusRepository') protected clientStatusRepositoryGetter: Getter<ClientStatusRepository>,
  ) {
    super(Expedient, dataSource);
    this.clientStatus = this.createBelongsToAccessorFor('clientStatus', clientStatusRepositoryGetter,);
    this.registerInclusionResolver('clientStatus', this.clientStatus.inclusionResolver);
    this.enrollmentID = this.createHasManyThroughRepositoryFactoryFor('enrollmentID', expedientTypeRepositoryGetter, enrollmentRepositoryGetter,);
    this.registerInclusionResolver('enrollmentID', this.enrollmentID.inclusionResolver);
  }
}
