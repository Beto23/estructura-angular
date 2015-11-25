(function(){
	angular.module('app.Usuario')
	.controller('WelcomeController' ,WelcomeController);
	WelcomeController.$inject=['$scope', '$compile', '$state', 'HelpersFactory', 'UsuarioFactory'];

	function WelcomeController($scope, $compile, $state, HelpersFactory, UsuarioFactory ){
		cliente=UsuarioFactory.getInfo();
		$scope.infoCte =cliente;
		helper=HelpersFactory;
		$scope.cerrarPopup = function(){
			console.log('33')
			helper.popupClose();
		}

	}
})()