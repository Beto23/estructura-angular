(function() {

	angular.module('app.Login')
	.directive('popupRegistro', popupRegistro);

	function popupRegistro(){
		return{
				restrict: 'E',
				templateUrl: './login/popup/popup_registro.html',
				link: function(){
					$('.Popup').click(function(e){
						if(e.target != this) return;
						$(this).remove();
					});
				}
			}
	}

})();