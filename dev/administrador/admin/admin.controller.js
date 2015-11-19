(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('AdminController', AdminController);
	AdminController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function AdminController($scope, $compile, AdminService, $state,HelpersFactory){

//ver administradores
		$scope.administradores=[];
		AdminService.getAdministradores().then(function(response){
			console.log(response);
			$scope.administradores=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});
	}

})();