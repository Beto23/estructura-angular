(function() {

	angular.module('app.Login')
	.directive('popupRegistro', popupRegistro);

	function popupRegistro(){
		return{
				restrict: 'E',
				templateUrl: './login/popup/popup_registro.html'
			}
	}

})();