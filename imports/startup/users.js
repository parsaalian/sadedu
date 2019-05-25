import { Accounts } from 'meteor/accounts-base';

if (!Accounts.findUserByUsername('admin')) {
  Accounts.createUser({username: 'admin', password: 'admin'});
}
