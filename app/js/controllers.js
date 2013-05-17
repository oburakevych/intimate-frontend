'use strict';

function SignupController($scope, $rootScope, $timeout, SecurityService) {
	$scope.owner;
	$scope.signup = function(successFn, errorFn) {
		console.log("Signup " + angular.toJson($scope.owner));
		SecurityService.signup($scope.owner, $scope, successFn, errorFn);
	}
}

function UserSignupLoginController($scope, $rootScope, $cookieStore, $timeout, SecurityService) {
	$scope.haveAccount = false;
	$scope.owner;

	$scope.signup = function(successFn, errorFn) {
		console.log("Signup " + angular.toJson($scope.owner));
		SecurityService.signup($scope.owner, $scope, successFn, errorFn);
	}

	$scope.login = function(successFn, errorFn) {
		console.log("Login " + angular.toJson($scope.owner));
		SecurityService.login($scope.owner, $scope, successFn, errorFn);
	}

	$scope.logout = function() {
		console.log("Logging out " + angular.toJson($rootScope.authorisedOwner));
		SecurityService.logout();
	}

	$scope.afterUserLoggedIn = function() {
		console.log("LoginSignupUserController: After user logged In");
	}

	$scope.afterUserLoggedOut = function() {
		console.log("LoginSignupUserController: After user logged Out");
	}

	$scope.$on('event:after-user-logged-in', $scope.afterUserLoggedIn);
	$scope.$on('event:after-user-logged-out', $scope.afterUserLoggedOut);
}

function UploadController($scope, $rootScope, $timeout) {
	$timeout(function() {
		if ($rootScope.authorisedOwner && r && r.opts) {
			r.opts.query.ownerId = $rootScope.authorisedOwner.id;
		}
	}, 1000);
}

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