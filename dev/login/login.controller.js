(function() {

	//modulo al qe pertenece
	angular.module('app.Login')
	.controller('LoginController', LoginController);
	LoginController.$inject = ['$scope', '$compile','LoginService'];

	function LoginController($scope, $compile, LoginService){

		LoginService.obtenerUsuarios().then(function(data){
			console.log(data)
		});

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