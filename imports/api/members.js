import { Mongo } from 'meteor/mongo';

const Members = new Mongo.Collection('members');

Members.schema = new SimpleSchema({
  mid: { type: Number },
  name: { type: String },
  fname: { type: String },
  password: { type: String },
  userType: { type: String }
});

export default Members;
