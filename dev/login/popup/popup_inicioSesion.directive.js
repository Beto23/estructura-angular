(function() {

	angular.module('app.Login')
	.directive('popupSesion', popupInicioSesion);

	function popupInicioSesion(){
		return{
				restrict: 'E',
				templateUrl: './login/popup/popup_inicioSesion.html',
				link: function(){
					$('.Popup').click(function(e){
						if(e.target != this) return;
						$(this).remove();
					});
				}
			}
	}

})();