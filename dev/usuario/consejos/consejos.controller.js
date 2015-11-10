(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('ConsejosController', ConsejosController);
	ConsejosController.$inject = ['$scope', '$compile'];

	function ConsejosController($scope, $compile){

		$scope.image = [
						['img/perfiluser.jpg'],
						['img/perfilmecanico.jpg'],
						['img/registrarCliente.jpg'],
						['img/registraMantt.jpg'],
						['img/historialMant.jpg']
					];
		console.log("Login controller");
	}

})();