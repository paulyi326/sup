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

.factory('User', function($rootScope, $firebase, FIREBASE_URL) {
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
    delete: function(userEmail) {
      return users.$remove(userEmail);
    },
    sup: function(friendEmail) {
      var userRef = ref.child(friendEmail + '/sup');
      // console.log(userRef.toString())
      // userRef.on('child_removed', function() {
      //   console.log('child was removed');
      // })
      var friendObj = {};
      friendObj[$rootScope.currentUser.email] = true;
      userRef.update(friendObj);
      // var supRef = userRef.child('sup');
      // supRef.set(null);
    },
    supList: function() {
      var userRef = ref.child($rootScope.currentUser.email + '/sup');
      var supList = $firebase(userRef);
      
      return supList;
    }
  };

  return User;
});
