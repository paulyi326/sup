angular.module('sup.services', [])

/**
 * A simple example service that returns some data.
 */

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
      // userRef.once('child_removed', function() {
      //   // if ($rootScope.currentUser.email === friendEmail) {
      //   // }
      // });
      
      var friendObj = {};
      friendObj[$rootScope.currentUser.email] = true;
      userRef.update(friendObj);
      userRef.remove();
    },

    setSupListener: function() {
      var currentUserRef = ref.child($rootScope.currentUser.email);
      currentUserRef.on('child_removed', function() {
        $rootScope.showAlert();
      });
    },
    
    supList: function() {
      var userRef = ref.child($rootScope.currentUser.email + '/sup');
      var supList = $firebase(userRef);

      return supList;
    },
    
    removeSup: function(friendEmail) {
      var supRef = ref.child($rootScope.currentUser.email + '/sup' + '/' + friendEmail);
      supRef.remove();
      User.sup(friendEmail);
    },
    
    addFriend: function(friend) {
      var userRef = ref.child($rootScope.currentUser.email + '/friends');
      var friendObj = {};
      friendObj[friend.email] = friend.email;

      var friendRef = ref.child(friend.email + '/friends');
      var userObj = {};
      userObj[$rootScope.currentUser.email] = $rootScope.currentUser.email;
      
      friendRef.update(userObj); // adds you as a friend to who you requested
      userRef.update(friendObj); // adds whoever you requested to your friend list
    },
    
    getFriends: function() {
      var friendsRef = ref.child($rootScope.currentUser.email + '/friends');
      var friendsList = $firebase(friendsRef);

      return friendsList;
    }
  };

  return User;
});
