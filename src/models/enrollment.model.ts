import {Entity, model, property} from '@loopback/repository';

@model()
export class Enrollment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  enrollmentID?: string;

  @property({
    type: 'string',
  })
  expedientID?: string;

  @property({
    type: 'string',
  })
  typeID?: string;

  constructor(data?: Partial<Enrollment>) {
    super(data);
  }
}

export interface EnrollmentRelations {
  // describe navigational properties here
}

export type EnrollmentWithRelations = Enrollment & EnrollmentRelations;
