(function() {

	//modulo al qe pertenece
	angular.module('app.Login')
	.controller('LoginController', LoginController);
	LoginController.$inject = ['$scope', '$compile','LoginService', '$state','HelpersFactory'];

	function LoginController($scope, $compile, LoginService, $state, HelpersFactory){
		$scope.usuario={};
		var helper = HelpersFactory;
		$scope.login=function(){
			LoginService
				.login($scope.usuario)
				.then(function(res){
					console.log(res)
					if (res.tipoUsuario=='administrador') {
						$state.go('administrador.historial');
						helper.popupClose();
					};
					if (res.tipoUsuario=='cliente') {
						$state.go('perfil.historial');
						helper.popupClose();
					};
				})
				.catch(function(res){
					console.log(res)
				})
		}
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