(function() {

	angular.module('app.Administrador')
	.directive('popupUpdateAdministrador', popupUpdateAdministrador);

	function popupUpdateAdministrador(){
		return{
				restrict: 'E',
				scope: {
					administrador: "="
				},
				templateUrl: './administrador/admin/popup_update_admin/popup_update_admin.html',
				controller: 'ControllerUpdateAdminitrador'
			}
	}

})();