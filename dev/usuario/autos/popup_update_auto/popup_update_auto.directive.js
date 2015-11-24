(function() {

	angular.module('app.Usuario')
	.directive('popupUpdateAutos', popupUpdateAutos);

	function popupUpdateAutos(){
		return{
				restrict: 'E',
				scope: {
					auto: "="
				},
				templateUrl: './usuario/autos/popup_update_auto/popup_update_auto.html',
				controller:'ActualizarAutoController'
			}
	}

})();