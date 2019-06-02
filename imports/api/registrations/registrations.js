import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import "./methods";

export const Registrations = new Mongo.Collection("registrations");

Registrations.schema = new SimpleSchema({
  cid: { type: Number },
  sid: { type: Number }
});
