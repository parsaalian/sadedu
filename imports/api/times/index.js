import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import "./methods";

const Times = new Mongo.Collection("times");

Times.schema = new SimpleSchema({

});

Times.attachSchema(Times.schema);

export { Times };
