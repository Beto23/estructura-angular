(function() {

	angular.module('app.Usuario')
	.directive('popupUpdateAutos', popupUpdateAutos);

	function popupUpdateAutos(){
		return{
				restrict: 'E',
				templateUrl: './usuario/autos/popup_update_auto/popup_update_auto.html',
				controller:'AutoController'
			}
	}

})();