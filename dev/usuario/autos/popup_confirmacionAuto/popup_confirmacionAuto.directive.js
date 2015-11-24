(function() {

	angular.module('app.Usuario')
	.directive('popupConfirmacionDeleteAuto', popupConfirmacionDeleteAuto);

	function popupConfirmacionDeleteAuto(){
		return{
				restrict: 'E',
				scope: {
					auto: "="
				},
				templateUrl: './usuario/autos/popup_confirmacionAuto/popup_confirmacionAuto.html',
				controller:'DeleteAutoController'
			}
	}

})();