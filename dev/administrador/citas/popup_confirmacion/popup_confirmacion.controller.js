(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteCitaController', DeleteCitaController);
	DeleteCitaController.$inject = ['$state', '$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteCitaController($state, $scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;
		var body = angular.element(document).find('body');

		//elminar una cita
		$scope.deleteCitas = function(cita){
			var param = {
				"id_citas":cita.Id
			}
			AdminService
				.deleteCita(param)
				.then(function(response){
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
				})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();
