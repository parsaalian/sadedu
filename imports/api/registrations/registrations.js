import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import "./methods";

export const Registrations = new Mongo.Collection("registrations");

Registrations.schema = new SimpleSchema({
  cid: { type: String, min: 5, max: 5 },
  prereq: { type: String, min: 5, max: 5, optional: true },
  group: { type: Number, optional: true },
  credit: { type: Number, min: 0, max: 4, optional: true },
  sid: { type: Number },
  isReserved: { type: Boolean}
});

Registrations.attachSchema(Registrations.schema);