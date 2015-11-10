(function() {

	angular.module('app.Administrador')
	.directive('popupAgregarMecanico', popupAgregarMecanico);

	function popupAgregarMecanico(){
		return{
				restrict: 'E',
				templateUrl: './administrador/add_mecanico/popup_mecanico/popup_mecanico.html',
				controller: 'ControllerMecanico'
			}
	}

})();