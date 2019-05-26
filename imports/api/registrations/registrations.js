import { Mongo } from 'meteor/mongo';
import './methods';

export const Registrations = new Mongo.Collection('registrations');

Registrations.schema = new SimpleSchema({
  cid: { type: Number },
  sid: { type: Number }
});
