(function() {

	angular.module('app.Administrador')
	.directive('popupCitas', popupAgregarCitas);

	function popupAgregarCitas(){
		return{
				restrict: 'E',
				templateUrl: './administrador/citas/popup_citas/popup_citas.html',
				controller:'CitaController'
			}
	}

})();