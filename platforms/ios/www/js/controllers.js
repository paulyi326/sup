angular.module('sup.controllers', [])

.controller('AuthCtrl', function($rootScope, $scope, $location, User) {
  $scope.user = {};
  // $scope.user.sup = {skip: 'skip'};
  $scope.allUsers = User.all;
  $scope.createUser = function() {
    // console.log('user email: ', $scope.user.email);
    // console.log('user password: ', $scope.user.password);
    // console.log($scope.user);
    User.create($scope.user);
    $rootScope.currentUser = $scope.user;
    $location.path('/tab/friends');
  };

  $scope.loginUser = function() {
    var users = $scope.allUsers;
    if (users.hasOwnProperty($scope.user.email)) {
      var user = users[$scope.user.email];
      if (user.password === $scope.user.password) {
        $rootScope.currentUser = $scope.user;
        $location.path('tab/friends');
        User.setSupListener();
        return;
      }
      console.log('incorrect password');
    }
  };

})

.controller('FriendsCtrl', function($scope, $rootScope, $ionicPopup, User) {
  $rootScope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'sup'
    });
  } 

  $scope.friends = User.getFriends();
  // console.log($scope.friends);

  $scope.addFriend = function(friend) {
    User.create(friend);
  };

  $scope.sup = function(friendEmail) {
    // console.log(friendEmail);
    // console.log(User.supList());
    User.sup(friendEmail);
  }

})

.controller('AddFriendCtrl', function($scope, User) {
  $scope.friend = {};

  $scope.addFriend = function() {
    $scope.allUsers = User.all;
    if ($scope.allUsers.hasOwnProperty($scope.friend.email)) {
      // console.log('my friends email: ', $scope.friend.email);
      User.addFriend($scope.friend);
    } else {
      console.log('this user does not exist');
    }
  }
})

.controller('SupCtrl', function($scope, $ionicPopup, User) {
  $scope.supList = User.supList();


  $scope.removeSup = function(friendEmail) {
    User.removeSup(friendEmail);
  }
});
