var imUserModule = angular.module('imUserModule', ['ngResource', 'ngCookies']);

imUserModule.directive('imLoginForm', function() {
	return {
		restrict: 'A, E',
		link: function(scope, elm, attrs) {
		},
		templateUrl: 'views/user-signup-login.html'
	};
});

imUserModule.factory('SecurityService', function($http, $rootScope, $cookieStore, BASE_URL_BACKEND) {
	return {
		signup: function(owner, $scope, successFn, errorFn) {
			if (owner && owner.username && owner.password) {
				if ($scope) {
					$scope.authorisationFailed = null;
				}
				$http.post(intimateModule.BASE_URL_BACKEND + '/owners/signup', owner)
					.success(function(data) {
						console.log("authenticated successfully");
						$rootScope.authorisedOwner = data;
						if ($rootScope.authorisedOwner) {
							$cookieStore.put("IM_LOGGED_USER", $rootScope.authorisedOwner);
						}
						if (successFn) {
							successFn();
						}

						$rootScope.$broadcast('event:after-user-logged-in');
					}).error(function(data) {
						console.warn('Signup failed: ' + data);
						if ($scope) {
							$scope.authorisationFailed = 'Invalid e-mail or password. Try to login.';
						}

						if (errorFn) {
							errorFn();
						}
					});
			}
		},

		login: function(owner, $scope, successFn, errorFn) {
			if (owner && owner.username && owner.password) {
				if ($scope) {
					$scope.authorisationFailed = null;
				}
				$http.post(intimateModule.BASE_URL_BACKEND + '/owners/authenticate', owner)
					.success(function(data) {
						console.log("authenticated successfully");
						$rootScope.authorisedOwner = data;
						if ($rootScope.authorisedOwner) {
							$cookieStore.put("IM_LOGGED_USER", $rootScope.authorisedOwner);
						}

						if (successFn) {
							successFn();
						}

						$rootScope.$broadcast('event:after-user-logged-in');
					}).error(function(data) {
						console.warn('Authorisation failed: ' + data);
						if ($scope) {
							$scope.authorisationFailed = 'Incorrect username or password.';
						}

						if (errorFn) {
							errorFn();
						}
					});
			}
		},

		logout: function() {
			if ($rootScope.authorisedOwner) {
				$rootScope.authorisedOwner = undefined;
			}

			if ($cookieStore.get("IM_LOGGED_USER")) {
				$cookieStore.remove("IM_LOGGED_USER");
			}

			$rootScope.$broadcast('event:after-user-logged-out');
		}
	}
});