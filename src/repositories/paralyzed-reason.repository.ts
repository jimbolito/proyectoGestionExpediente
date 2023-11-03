import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ExpedientDataSourceDataSource} from '../datasources';
import {ParalyzedReason, ParalyzedReasonRelations} from '../models';

export class ParalyzedReasonRepository extends DefaultCrudRepository<
  ParalyzedReason,
  typeof ParalyzedReason.prototype.paralyzedReasonId,
  ParalyzedReasonRelations
> {
  constructor(
    @inject('datasources.expedientDataSource') dataSource: ExpedientDataSourceDataSource,
  ) {
    super(ParalyzedReason, dataSource);
  }
}

// Relacion de 1:N
// En este escenario, cada expediente tendría una referencia (por ejemplo, una propiedad) que apunta a la razón de
// parálisis correspondiente. Sin embargo, varias expedientes podrían compartir la misma razón de parálisis.
//  Esto podría ser adecuado si cada expediente tiene un estado de parálisis específico que se registra, y
//  las razones de parálisis son compartidas entre varios expedientes en diferentes momentos.
