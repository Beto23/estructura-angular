(function(){
	angular.module('app.Error')
	.controller('ControllerError', ControllerError);
	ControllerError.$inject=['$state', '$scope', '$compile', 'HelpersFactory'];
	function ControllerError ($state, $scope, $compile, HelpersFactory){
		var helper = HelpersFactory;
		$scope.CerrarPopup = function(){
			helper.mensajeClose();
		}
	}
})();