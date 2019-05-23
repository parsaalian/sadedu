import { Mongo } from 'meteor/mongo';

const Registrations = new Mongo.Collection('registrations');

Registrations.schema = new SimpleSchema({
  cid: { type: Number },
  sid: { type: Number }
});

export default Registrations;
