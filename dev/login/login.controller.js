(function() {

	//modulo al qe pertenece
	angular.module('app.Login')
	.controller('LoginController', LoginController);
	LoginController.$inject = ['$compile', '$scope', '$compile','LoginService', '$state','HelpersFactory','AdministradorFactory', 'UsuarioFactory'];

	function LoginController($compile, $scope, $compile, LoginService, $state, HelpersFactory, AdministradorFactory, UsuarioFactory){
		$scope.usuario={};
		var helper = HelpersFactory;
		var admin = AdministradorFactory;
		var user = UsuarioFactory;
		//console.log(admin.getInfo());
		//console.log(user.getInfo());

		var body = angular.element(document).find('body');

			
		$scope.login=function(){
			LoginService
				.login($scope.usuario)
				.then(function(res){
					if(res.estatus == 'ok'){
						if(res.tipoUsuario == 'admin'){
							console.log(res.msj);
							admin.setInfo(res.admin);
							helper.popupClose();
							$state.go('administrador.historial');
							body.append($compile("<popup-welcome-admin/>")($scope));
						} else {
							console.log(res.msj);
							user.setInfo(res.cliente);
							helper.popupClose();
							$state.go('perfil.historial');
							body.append($compile("<popup-welcome/>")($scope));
						}
					}else {
						console.log(res.msj);
						body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
					}
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
		//console.log("Login controller");
	}

})();