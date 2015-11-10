(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ClientesController', ClientesController);
	ClientesController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ClientesController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.clientes=[];
		AdminService.getClientes().then(function(response){
			//cerrar popup
			$scope.clientes=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});
	}
})();