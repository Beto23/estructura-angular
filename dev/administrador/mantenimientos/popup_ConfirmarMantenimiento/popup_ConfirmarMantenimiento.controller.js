(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteMantenimientoController', DeleteMantenimientoController);
	DeleteMantenimientoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteMantenimientoController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.cerrarPopup = function(){
			helper.popupClose();
		}

		$scope.cerrarPopup = function(){
			helper.popupClose();
		}
		//elminar una mantenimientos
		$scope.deleteMantenimiento = function(mantenimientos){
			console.log(mantenimientos);
			AdminService.deleteMantenimiento(mantenimientos).then(function(response){
				console.log(response)

			if(response.estatus == 'ok'){
				helper.popupClose();
				body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
			} else {
				helper.popupClose();
				body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
			}

			})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();