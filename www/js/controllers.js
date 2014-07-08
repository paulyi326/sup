angular.module('sup.controllers', [])

.controller('AuthCtrl', function($scope, $location, User) {
  $scope.user = {};
  $scope.createUser = function() {
    // console.log('user email: ', $scope.user.email);
    // console.log('user password: ', $scope.user.password);
    User.create($scope.user);
  };
})

.controller('FriendsCtrl', function($scope) {
  // $scope.friends = Friends.all;

  // $scope.addFriend = function(friend) {
  //   Friends.create(friend);
  // }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  
});
