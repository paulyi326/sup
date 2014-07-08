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

  // Some fake testing data
  // var friends = [
  //   { id: 0, name: 'Scruff McGruff' },
  //   { id: 1, name: 'G.I. Joe' },
  //   { id: 2, name: 'Miss Frizzle' },
  //   { id: 3, name: 'Ash Ketchum' }
  // ];

  // return {
  //   all: function() {
  //     return friends;
  //   },
  //   get: function(friendId) {
  //     // Simple index lookup
  //     return friends[friendId];
  //   }
  // }

  return User;
});
