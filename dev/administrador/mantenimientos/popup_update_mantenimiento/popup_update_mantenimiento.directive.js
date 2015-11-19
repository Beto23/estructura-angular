(function() {

	angular.module('app.Administrador')
	.directive('popupUpdateMantenimiento', popupUpdateMantenimiento);

	function popupUpdateMantenimiento(){
		return{
				restrict: 'E',
				scope: {
					mantenimiento: "="
				},
				templateUrl: './administrador/mantenimientos/popup_update_mantenimiento/popup_update_mantenimiento.html',
				controller: 'ControllerUpdateMantenimiento'
			}
	}

})();