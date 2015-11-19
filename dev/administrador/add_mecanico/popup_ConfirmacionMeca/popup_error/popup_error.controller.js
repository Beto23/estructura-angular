(function(){
	angular.module('app.Administrador')
	.controller(ErrorController, 'ErrorController');
	ErrorController.$inject=['$scope', '$compile','AdminService', '$state','HelpersFactory'];
	function ErrorController($scope, AdminService, $state, HelpersFactory){
		
	}
})()