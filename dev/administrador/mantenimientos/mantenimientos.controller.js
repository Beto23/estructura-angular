(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('MantenimientoController', MantenimientoController);
	MantenimientoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function MantenimientoController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.mantenimientos=[];
		AdminService.getMantenimientos().then(function(response){
			//cerrar popup
			$scope.mantenimientos=response;
		}).catch(function(err){
			console.log(err)
		});
	}
})();