(function() {

	angular.module('app.Administrador')
	.directive('popupConfirmacionDeleteMeca', popupConfirmacionDeleteMeca);

	function popupConfirmacionDeleteMeca(){
		return{
				restrict: 'E',
				templateUrl: './administrador/add_mecanico/popup_ConfirmacionMeca/popup_ConfirmacionMeca.html',
				controller:'DeleteMecanicoController'
			}
	}

})();