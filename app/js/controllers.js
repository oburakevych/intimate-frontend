'use strict';

function UserRoleAssignmentController($scope, $rootScope, $timeout, UserRoleAssignmentService) {
	$scope.user = {};
	$scope.roles = {
		MAX_WATCHER: 300,
		MAX_COMMUNITY: 100,
		MAX_PRODUCER: 200
	};

	$scope.getRoles = function() {
		UserRoleAssignmentService.getRoles({}, function(data) {
			angular.forEach(data.results, function(role) {
				$scope.roles[role.name] = role;
			});

			$timeout($scope.getRoles, 20000);
		});
	}

	$scope.register = function(userRole) {
		$scope.user.password = $scope.user.username;
		$scope.user.role = userRole;
		UserRoleAssignmentService.save($scope.user, function() {
			$scope.isRegistered = true;

			UserRoleAssignmentService.getRole({objectId: $scope.roles[userRole].objectId}, function(data) {
				if (data && data.name === userRole && data.count >= 0) {
					data.count++;
					UserRoleAssignmentService.updateRoles(data);
				}
			});
		});
	}

	$scope.showType = function(type) {
		return $scope.isRegistered;
	}

	$timeout($scope.getRoles, 0);
}

function SafeRoomController($scope, $rootScope, $routeParams) {
    $scope.roleName = $routeParams.roleName;
}