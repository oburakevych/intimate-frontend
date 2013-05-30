'use strict';

/* IntiMate App Module */

var intimateModule = angular.module('intimateApp', []);
/* LOCALHOST */
/*
intimateModule.constant("BASE_URL_BACKEND","http://localhost\\:8080//intimate-backend"); //For $resource
intimateModule.constant("BASE_URL_PARSE_BACKEND","https://api.parse.com/1"); //For $resource
intimateModule.BASE_URL_BACKEND = 'http://localhost\:8080/intimate-backend'; // For $http
*/
/* secretroom.intimate-app.com */
intimateModule.constant("BASE_URL_BACKEND","http://secretroom.intimate-app.com\\:8080//intimate-backend"); //For $resource
intimateModule.constant("BASE_URL_PARSE_BACKEND","https://api.parse.com/1"); //For $resource
intimateModule.BASE_URL_BACKEND = 'http://secretroom.intimate-app.com\:8080/intimate-backend'; // For $http

intimateModule.BASE_URL_DATA = 'data';

intimateModule.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
          when('/safe-room/:roleName', {templateUrl: 'views/safe-room.html'}).
		  when('/safe-room', {templateUrl: 'views/safe-room.html'}).
	      otherwise({redirectTo: '/safe-room'});
	}]);
