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

	$scope.register = function(userRole) {
		$scope.user.password = $scope.user.username;
		$scope.user.role = userRole;
		UserRoleAssignmentService.save($scope.user, function() {
			$scope.isRegistered = true;
		});
	}

	$scope.showType = function(type) {
		return $scope.isRegistered;
	}
}