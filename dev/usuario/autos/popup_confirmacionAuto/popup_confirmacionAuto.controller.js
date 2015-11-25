(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('DeleteAutoController', DeleteAutoController);
	DeleteAutoController.$inject = ['$state', '$scope', '$compile','ClienteService', '$state', 'HelpersFactory'];

	function DeleteAutoController($state, $scope, $compile, ClienteService, $state, HelpersFactory){

		var helper = HelpersFactory;

		var body = angular.element(document).find('body');


		$scope.cerrarPopup = function(){
			helper.popupClose();
		}

		$scope.deleteAuto = function(deleteAuto){
			ClienteService.
				deleteAuto(deleteAuto)
				.then(function(response){
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
