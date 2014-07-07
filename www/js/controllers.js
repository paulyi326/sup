angular.module('sup.controllers', [])

.controller('AuthCtrl', function($scope, $location) {
  $scope.user = {};
  $scope.createUser = function() {
    console.log('user email: ', $scope.user.email);
    console.log('user password: ', $scope.user.password);
  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  
});
