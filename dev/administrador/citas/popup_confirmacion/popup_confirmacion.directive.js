(function() {

	angular.module('app.Administrador')
	.directive('popupConfirmacionDelete', popupConfirmacionDelete);

	function popupConfirmacionDelete(){
		return{
				restrict: 'E',
				scope: {
					cita: "="
				},
				templateUrl: './administrador/citas/popup_confirmacion/popup_confirmacion.html',
				controller:'DeleteCitaController'
			}
	}

})();