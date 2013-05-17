'use strict';

/* EdgeBud App Module */

var intimateModule = angular.module('intimateApp',
		[ 'filterModule',
		 'imUserModule']
);
/* LOCALHOST */
intimateModule.constant("BASE_URL_BACKEND","http://localhost\\:8080/intimate-backend"); //For $resource
intimateModule.BASE_URL_BACKEND = 'http://localhost\:8080/intimate-backend'; // For $http

intimateModule.BASE_URL_DATA = 'data';

intimateModule.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
          when('/front-page', {templateUrl: 'views/front-page.html'}).
		  when('/upload', {templateUrl: 'views/upload.html'}).
		  when('/safe-room', {templateUrl: 'views/safe-room.html'}).
	      otherwise({redirectTo: '/safe-room'});
	}]);
