(function() {

	angular.module('app.Administrador')
	.directive('popupConfirmacionDeleteAdmin', popupConfirmacionDeleteAdmin);

	function popupConfirmacionDeleteAdmin(){
		return{
				restrict: 'E',
				templateUrl: './administrador/admin/popup_ConfirmacionAdmin/popup_ConfirmacionAdmin.html',
				controller:'DeleteAdministradorController'
			}
	}

})();