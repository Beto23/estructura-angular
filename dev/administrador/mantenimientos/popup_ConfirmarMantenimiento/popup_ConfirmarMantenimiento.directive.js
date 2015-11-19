(function() {

	angular.module('app.Administrador')
	.directive('popupConfirmacionDeleteMante', popupConfirmacionDeleteMante);

	function popupConfirmacionDeleteMante(){
		return{
				restrict: 'E',
				templateUrl: './administrador/mantenimientos/popup_ConfirmarMantenimiento/popup_ConfirmarMantenimiento.html',
				controller:'DeleteMantenimientoController'
			}
	}

})();