(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('MantenimientoAgregarController', MantenimientoAgregarController);
	MantenimientoAgregarController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function MantenimientoAgregarController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.mantenimiento={};
		$scope.addMantenimiento = function(){
			console.log("agregando Mantenimiento");
			AdminService.agregarMantenimientos($scope.mantenimiento).then(function(response){
				$scope.mantenimientos.push(response)
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}

			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();