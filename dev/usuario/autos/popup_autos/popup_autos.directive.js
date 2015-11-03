(function() {

	angular.module('app.Usuario')
	.directive('popupAgregarAutos', popupAgregarAutos);

	function popupAgregarAutos(){
		return{
				restrict: 'E',
				templateUrl: './usuario/autos/popup_autos/popup_autos.html'
			}
	}

})();