(function() {

	angular.module('app.Login')
	.directive('popupRegistro', popupRegistro);

	function popupRegistro(){
		return{
				restrict: 'E',
				templateUrl: './login/popup_registro/popup_registro.html',
				controller:'PopupRegistrarCliente'
			}
	}

})();