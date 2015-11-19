(function() {

	angular.module('app.Administrador')
	.directive('popupError', popupError);

	function popupError(){
		return{
				restrict: 'E',
				templateUrl: './administrador/add_mecanico/popup_ConfirmacionMeca/popup_error/popup_error.html',
				controller:'DeleteMecanicoController'
			}
	}

})();