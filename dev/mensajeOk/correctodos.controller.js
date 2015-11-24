(function(){
	angular.module('app.Okey')
	.controller('ControllerOkey', ControllerOkey);
	ControllerOkey.$inject=['$state', '$scope', '$compile', 'HelpersFactory'];
	function ControllerOkey ($state, $scope, $compile, HelpersFactory){
		var helper = HelpersFactory;
		$scope.CerrarPopup = function(){
			helper.mensajeClose();
			console.log('kjnsdf');
			$state.reload();
		}
	}
})();