(function(){
	angular.module('app.Usuario')
	.directive('popupWelcome', popupWelcome);

	function popupWelcome(){
		return{
				restrict: 'E',
				templateUrl: './usuario/popup_welcome/popup_welcome.html',
				controller:'WelcomeController'
			}
	}
})()