(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteMantenimientoController', DeleteMantenimientoController);
	DeleteMantenimientoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteMantenimientoController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;

		$scope.cerrarPopup = function(){
			helper.popupClose();
		}
		//elminar una mantenimientos
		$scope.deleteMantenimiento = function(mantenimientos){
			console.log(mantenimientos);
			AdminService.deleteMantenimiento(mantenimientos).then(function(response){
				console.log(response)

				/*$scope.mecanicos = $scope.mecanicos.filter(function(obj){
					return (obj.id_mecanico != mantenimientos.id_mantenimientos)
				});*/

				helper.popupClose();
				$state.reload();
			})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();