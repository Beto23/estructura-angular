(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('AutoController', AutoController);
	AutoController.$inject = ['$scope', '$compile','ClienteService', '$state','HelpersFactory'];

	function AutoController($scope, $compile, ClienteService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.auto={};
		$scope.addAuto = function(){
			console.log("agregando auto");
			ClienteService.AgregarAutos($scope.auto).then(function(response){
				//$scope.mantenimientos.push(response)
				//console.log(response)
				//cerrar popup
				helper.popupClose();
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();