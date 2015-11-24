(function(){
	angular.module('app.Usuario')
	.controller('WelcomeController' ,WelcomeController);
	WelcomeController.$inject=['$scope', '$compile', '$state', 'HelpersFactory', 'UsuarioFactory'];

	function WelcomeController($scope, $compile, $state, HelpersFactory, UsuarioFactory ){
		cliente=UsuarioFactory.getInfo();
		$scope.info =cliente;

	}
})()