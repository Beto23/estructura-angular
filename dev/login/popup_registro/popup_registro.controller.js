(function() {

	//modulo al qe pertenece
	angular.module('app.Login')
	.controller('PopupRegistrarCliente', PopupRegistrarCliente);
	PopupRegistrarCliente.$inject = ['$scope', '$compile','LoginService', '$state','HelpersFactory'];

	function PopupRegistrarCliente($scope, $compile, LoginService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		$scope.cliente={};
		var body = angular.element(document).find('body');

		

		$scope.addCliente = function(){
			LoginService
				.agregarClientes($scope.cliente)
				.then(function(response){
					if(response.estatus=="ok"){
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