import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {Enrollment, EnrollmentRelations} from '../models';

export class EnrollmentRepository extends DefaultCrudRepository<
  Enrollment,
  typeof Enrollment.prototype.enrollmentID,
  EnrollmentRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(Enrollment, dataSource);
  }
}
