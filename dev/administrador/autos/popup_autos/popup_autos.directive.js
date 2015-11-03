(function() {

	angular.module('app.Administrador')
	.directive('popupAgregarAuto', popupAgregarAuto);

	function popupAgregarAuto(){
		return{
				restrict: 'E',
				templateUrl: './administrador/autos/popup_autos/popup_autos.html'
			}
	}

})();