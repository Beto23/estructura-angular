(function(){
	angular.module('app.Usuario')
	.controller('UsuarioController', UsuarioController);

	UsuarioController.$inject = ['$scope','UsuarioFactory', '$state'];

	function UsuarioController($scope, UsuarioFactory, $state){
		$scope.infoUser = UsuarioFactory.getInfo();

		$scope.salir = function(){
			UsuarioFactory.logout();
			$state.go('login');
		}
	}
})();