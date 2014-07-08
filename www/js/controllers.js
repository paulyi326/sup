angular.module('sup.controllers', [])

.controller('AuthCtrl', function($scope, $location, User) {
  $scope.user = {};
  $scope.allUsers = User.all;
  $scope.createUser = function() {
    // console.log('user email: ', $scope.user.email);
    // console.log('user password: ', $scope.user.password);
    console.log($scope.user);
    User.create($scope.user);
  };

  $scope.loginUser = function() {
    var users = $scope.allUsers;
    for (var user in users) {
      if (users[user].email === $scope.user.email) {
        console.log('correct email')
        if (users[user].password === $scope.user.password) {
          console.log('correct password');
          $location.path('tab/friends');
          return;
        }
        console.log('incorrect password');
      }
    }
    console.log('incorrect email')
  };

})

.controller('FriendsCtrl', function($scope, User) {
  $scope.friends = User.all;
  console.log($scope.friends);

  $scope.addFriend = function(friend) {
    User.create(friend);
  };

  $scope.sup = function() {
    console.log('SUP');
  }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, User) {
  $scope.friend = User.find($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  
});
