import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {Expedient, ExpedientRelations, ExpedientType, Enrollment} from '../models';
import {EnrollmentRepository} from './enrollment.repository';
import {ExpedientTypeRepository} from './expedient-type.repository';

export class ExpedientRepository extends DefaultCrudRepository<
  Expedient,
  typeof Expedient.prototype.expedientID,
  ExpedientRelations
> {

  public readonly enrollmentID: HasManyThroughRepositoryFactory<ExpedientType, typeof ExpedientType.prototype.typeID,
          Enrollment,
          typeof Expedient.prototype.expedientID
        >;

  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource, @repository.getter('EnrollmentRepository') protected enrollmentRepositoryGetter: Getter<EnrollmentRepository>, @repository.getter('ExpedientTypeRepository') protected expedientTypeRepositoryGetter: Getter<ExpedientTypeRepository>,
  ) {
    super(Expedient, dataSource);
    this.enrollmentID = this.createHasManyThroughRepositoryFactoryFor('enrollmentID', expedientTypeRepositoryGetter, enrollmentRepositoryGetter,);
    this.registerInclusionResolver('enrollmentID', this.enrollmentID.inclusionResolver);
  }
}
