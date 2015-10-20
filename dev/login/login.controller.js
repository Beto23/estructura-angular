(function() {

	//modulo al qe pertenece
	angular.module('app.Login')
	.controller('LoginController', LoginController);
	LoginController.$inject = ['$scope', '$compile'];

	function LoginController($scope, $compile){
		$scope.imgs = [
						['img/perfiluser.jpg','Perfil Usuario'],
						['img/perfilmecanico.jpg','Perfil Mecanico'],
						['img/registrarCliente.jpg', 'Registra tus clientes'],
						['img/registraMantt.jpg', 'Registra tus mantenimientos'],
						['img/historialMant.jpg', 'Historial de mantenimiento']
					];
		console.log("Login controller");
	}

})();