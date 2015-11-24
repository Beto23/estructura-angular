(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteMecanicoController', DeleteMecanicoController);
	DeleteMecanicoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteMecanicoController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;

		var body = angular.element(document).find('body');


		$scope.cerrarPopup = function(){
			helper.popupClose();
		}

		//elminar una mecanico
		$scope.deleteMecanico = function(mecanico){
			console.log(mecanico);
			AdminService.deleteMecanico(mecanico).then(function(response){
				console.log(response)

				/*$scope.mecanicos = $scope.mecanicos.filter(function(obj){
					return (obj.id_mecanico != mecanico.id_mecanico)
				});*/
			if(response.estatus == 'ok'){
				helper.popupClose();
				body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
				//$state.reload();
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