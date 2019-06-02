import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import "./methods";

export const Students = new Mongo.Collection("students");

Students.schema = new SimpleSchema({
  sid: { type: Number },
  name: { type: String },
  familyName: { type: String },
  rand: { type: Number }
});

Students.attachSchema(Students.schema);
