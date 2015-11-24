(function() {

	angular.module('app.Login')
	.directive('popupSesion', popupInicioSesion);

	function popupInicioSesion(){
		return{
				restrict: 'E',
				templateUrl: './login/popup_inicioSesion/popup_inicioSesion.html',
				controller: 'LoginController'
			}
	}

})();