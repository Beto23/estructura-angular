(function() {

	angular.module('app.Administrador')
	.directive('popupAgregarAdministrador', popupAgregarAdministrador);

	function popupAgregarAdministrador(){
		return{
				restrict: 'E',
				templateUrl: './administrador/admin/popup_admin/popup_admin.html',
				controller:'AdminController'
			}
	}

})();