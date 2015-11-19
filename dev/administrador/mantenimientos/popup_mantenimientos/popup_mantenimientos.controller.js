(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('MantenimientoAgregarController', MantenimientoAgregarController);
	MantenimientoAgregarController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function MantenimientoAgregarController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.mantenimiento={};
		$scope.addMantenimiento = function(){
			console.log("agregando Mantenimiento");
			AdminService.agregarMantenimientos($scope.mantenimiento).then(function(response){
				$scope.mantenimientos.push(response)
				//console.log(response)
				//cerrar popup
				helper.popupClose();
				$state.reload()
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();