import { Mongo } from 'meteor/mongo';
import './methods';

export const Courses = new Mongo.Collection('courses');

Courses.schema = new SimpleSchema({
  cid: { type: String, min: 5, max: 5 },
  prereq: { type: String, min: 5, max: 5, optional: true },
  group: { type: Number, optional: true },
  credit: { type: Number, min: 1, max: 4, optional: true },
  teacher: { type: String, optional: true },
  description: { type: String, optional: true },
  faculty: { type: String, optional: true },
  section: { type: String, allowedValues: ['bsc', 'mst', 'phd'], optional: true },
  capacity: { type: Number, optional: true },
  registered: { type: Number, optional: true },
  reserveCapacity: { type: Number, optional: true },
  reserveRegistered: { type: Number, optional: true },
  exam: { type: Date, optional: true },
  time: { type: String, optional: true },
});
