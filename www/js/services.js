angular.module('sup.services', [])

/**
 * A simple example service that returns some data.
 */

// .factory('Sup', function($firebase, FIREBASE_URL) {
//   var ref = new Firebase(FIREBASE_URL + 'users/*/');
//   ref.on('child_added', function(childSnapshot) {
//     alert(childSnapshot.val());
//   });

//   var sups = $firebase(ref);

//   var Sup = {
//     sup: function() {
//       return sups.$add('sup');
//     }
//   };

//   return Sup;
// })

.factory('User', function($firebase, FIREBASE_URL) {
  // Might use a resource here that returns a JSON array

  var ref = new Firebase(FIREBASE_URL + 'users');

  var users = $firebase(ref);

  var User = {
    all: users,
    create: function(user) {
      console.log(ref.toString());
      var userObj = {};
      userObj[user.email] = user;
      ref.update(userObj);
      // return users.$add(user);
    },
    find: function(userId) {
      return users.$child(userId);
    },
    delete: function(userId) {
      return users.$remove(userId);
    },
    sup: function(id) {
      var userRef = ref.child(id);
      userRef.on('child_removed', function() {
        console.log('child was removed');
      })
      userRef.update({sup: true});
      var supRef = userRef.child('sup');
      supRef.set(null);
    }
  };

  return User;
});
