(function(){
	angular.module('app.Usuario')
	.controller('UsuarioController', UsuarioController);

	UsuarioController.$inject = ['$scope','UsuarioFactory'];

	function UsuarioController($scope, UsuarioFactory){
		$scope.infoUser = UsuarioFactory.getInfo();
	}
})();