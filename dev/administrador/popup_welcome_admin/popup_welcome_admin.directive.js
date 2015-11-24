(function(){
	angular.module('app.Administrador')
	.directive('popupWelcomeAdmin', popupWelcomeAdmin);

	function popupWelcomeAdmin(){
		return{
				restrict: 'E',
				templateUrl: './administrador/popup_welcome_admin/popup_welcome_admin.html',
				controller:'WelcomeAdminController'
			}
	}
})()