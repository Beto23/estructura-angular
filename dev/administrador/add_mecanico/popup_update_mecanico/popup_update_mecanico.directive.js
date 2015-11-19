(function() {

	angular.module('app.Administrador')
	.directive('popupUpdateMecanico', popupUpdateMecanico);

	function popupUpdateMecanico(){
		return{
				restrict: 'E',
				scope: {
					mecanico: "="
				},
				templateUrl: './administrador/add_mecanico/popup_update_mecanico/popup_update_mecanico.html',
				controller: 'ControllerUpdateMecanico'
			}
	}

})();