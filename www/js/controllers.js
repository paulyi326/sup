angular.module('sup.controllers', [])

.controller('AuthCtrl', function($scope, $location, User) {
  $scope.user = {};
  $scope.allUsers = User.all;
  $scope.createUser = function() {
    // console.log('user email: ', $scope.user.email);
    // console.log('user password: ', $scope.user.password);
    // console.log($scope.user);
    User.create($scope.user);
    $location.path('/tab/friends');
  };

  $scope.loginUser = function() {
    var users = $scope.allUsers;
    if (users.hasOwnProperty($scope.user.email)) {
      var user = users[$scope.user.email];
      if (user.password === $scope.user.password) {
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

  $scope.sup = function(friendId) {
    console.log(friendId);
    /* 
      I can log friendId here, meaning when I click, I can add data
      to the friend on firebase. So I can add a sup property and
      on that change, trigger some event from the friend's persepective
    */
    User.sup(friendId);
  }

  // $scope.sup = function() {
  //   console.log('SUP');
  //   Sup.sup();
  // }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, User) {
  $scope.friend = User.find($stateParams.friendId);
})

.controller('SupCtrl', function($scope) {
  
});
