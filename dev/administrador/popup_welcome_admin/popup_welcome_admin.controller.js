(function(){
	angular.module('app.Administrador')
	.controller('WelcomeAdminController' ,WelcomeAdminController);
	WelcomeAdminController.$inject=['$scope', '$compile', '$state', 'HelpersFactory', 'AdministradorFactory'];

	function WelcomeAdminController($scope, $compile, $state, HelpersFactory, AdministradorFactory, timeout ){
		infoAdministrador=AdministradorFactory.getInfo();
		$scope.infoAdmin =infoAdministrador;
		console.log($scope.infoAdmin);

		helper=HelpersFactory;
		$scope.cerrarPopup = function(){
			console.log('33')
			helper.popupClose();
		}

		/*$timeout(function() {
			$scope.eventoExistente=false;
		}, 4000);*/

	}
})();