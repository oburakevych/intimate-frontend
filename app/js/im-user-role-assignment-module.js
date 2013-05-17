var imUserRoleAssignmentModule = angular.module('imUserRoleAssignmentModule', ['ngResource']);

imUserRoleAssignmentModule.directive('imUserRoleAssignment', function() {
	return {
		restrict: 'A, E',
		link: function(scope, elm, attrs) {
		},
		templateUrl: 'views/user-role-assignment.html'
	};
});

imUserRoleAssignmentModule.securityHeaders = {
	'X-Parse-Application-Id': '6A33OQoa6YZzfDD7spbsUddT05L3Zymaiixjgl1n',
	'X-Parse-REST-API-Key': 'LMcMKA5DP0wk3L2yRtvGH4HoCLw5NRF0Se1VWr5q'
};

imUserRoleAssignmentModule.factory('UserRoleAssignmentService', function($resource, BASE_URL_PARSE_BACKEND) {
	return $resource(BASE_URL_PARSE_BACKEND + "/users", {}, {
		save : {
			method: 'POST',
			headers: imUserRoleAssignmentModule.securityHeaders
		}
	})
});

