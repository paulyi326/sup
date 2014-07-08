angular.module('sup.services', [])

/**
 * A simple example service that returns some data.
 */

.factory('User', function($firebase, FIREBASE_URL) {
  // Might use a resource here that returns a JSON array

  var ref = new Firebase(FIREBASE_URL + 'users');
  var users = $firebase(ref);

  var User = {
    all: users,
    create: function(user) {
      return users.$add(user);
    },
    find: function(userId) {
      return users.$child(userId);
    },
    delete: function(userId) {
      return users.$remove(userId);
    }
  };

  return User;
});
