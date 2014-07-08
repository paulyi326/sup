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
        return;
      }
      console.log('incorrect password');
    }
  };

})

.controller('FriendsCtrl', function($scope, User) {
  $scope.friends = User.all;
  // console.log($scope.friends);

  $scope.addFriend = function(friend) {
    User.create(friend);
  };

  $scope.sup = function(friendEmail) {
    // console.log(friendEmail);
    console.log(User.supList());
    User.sup(friendEmail);
  }

})

.controller('FriendDetailCtrl', function($scope, $stateParams, User) {
  $scope.friend = User.find($stateParams.friendId);
})

.controller('SupCtrl', function($scope, User) {
  $scope.supList = User.supList();

  $scope.removeSup = function(friendEmail) {
    User.removeSup(friendEmail);
  }
});
