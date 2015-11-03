(function() {

	angular.module('app.Administrador')
	.directive('popupAgregarMantenimiento', popupAgregarMantenimiento);

	function popupAgregarMantenimiento(){
		return{
				restrict: 'E',
				templateUrl: './administrador/mantenimientos/popup_mantenimientos/popup_mantenimientos.html'
			}
	}

})();