import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import "./methods";

export const Registrations = new Mongo.Collection("registrations");

Registrations.schema = new SimpleSchema({
  cid: { type: String, min: 5, max: 5 },
  group: { type: String, optional: true, defaultValue: "1" },
  sid: { type: String },
  isReserved: { type: Boolean },
  placeInReservedQueue: { type: Number, optional: true },
  request: { type: String, optional: true },
});

Registrations.attachSchema(Registrations.schema);
