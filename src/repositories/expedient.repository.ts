import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {Expedient, ExpedientRelations, ExpedientType, Enrollment, ClientStatus, MainIntervener, ExpedientManinIntervener, ManagementStatus} from '../models';
import {EnrollmentRepository} from './enrollment.repository';
import {ExpedientTypeRepository} from './expedient-type.repository';
import {ClientStatusRepository} from './client-status.repository';
import {ExpedientManinIntervenerRepository} from './expedient-manin-intervener.repository';
import {MainIntervenerRepository} from './main-intervener.repository';
import {ManagementStatusRepository} from './management-status.repository';

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

  public readonly mainInterveners: HasManyThroughRepositoryFactory<MainIntervener, typeof MainIntervener.prototype.mainIntervenerId,
          ExpedientManinIntervener,
          typeof Expedient.prototype.expedientID
        >;

  public readonly managementStatusId: HasOneRepositoryFactory<ManagementStatus, typeof Expedient.prototype.expedientID>;

  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource, @repository.getter('EnrollmentRepository') protected enrollmentRepositoryGetter: Getter<EnrollmentRepository>, @repository.getter('ExpedientTypeRepository') protected expedientTypeRepositoryGetter: Getter<ExpedientTypeRepository>, @repository.getter('ClientStatusRepository') protected clientStatusRepositoryGetter: Getter<ClientStatusRepository>, @repository.getter('ExpedientManinIntervenerRepository') protected expedientManinIntervenerRepositoryGetter: Getter<ExpedientManinIntervenerRepository>, @repository.getter('MainIntervenerRepository') protected mainIntervenerRepositoryGetter: Getter<MainIntervenerRepository>, @repository.getter('ManagementStatusRepository') protected managementStatusRepositoryGetter: Getter<ManagementStatusRepository>,
  ) {
    super(Expedient, dataSource);
    this.managementStatusId = this.createHasOneRepositoryFactoryFor('managementStatusId', managementStatusRepositoryGetter);
    this.registerInclusionResolver('managementStatusId', this.managementStatusId.inclusionResolver);
    this.mainInterveners = this.createHasManyThroughRepositoryFactoryFor('mainInterveners', mainIntervenerRepositoryGetter, expedientManinIntervenerRepositoryGetter,);
    this.registerInclusionResolver('mainInterveners', this.mainInterveners.inclusionResolver);
    this.clientStatus = this.createBelongsToAccessorFor('clientStatus', clientStatusRepositoryGetter,);
    this.registerInclusionResolver('clientStatus', this.clientStatus.inclusionResolver);
    this.enrollmentID = this.createHasManyThroughRepositoryFactoryFor('enrollmentID', expedientTypeRepositoryGetter, enrollmentRepositoryGetter,);
    this.registerInclusionResolver('enrollmentID', this.enrollmentID.inclusionResolver);
  }
}
