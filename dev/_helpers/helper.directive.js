(function () {

	angular
		.module('app.Helpers')
		.directive('popupClose', popupClose)
		.directive('mensajeClose', mensajeClose)
		.directive('popupAdd', popupAdd)
		.directive('fileUpload', fileUpload)

		fileUpload.$inject = ['HelpersService'];

		function fileUpload(HelpersService){
			return {
				restrict: 'A',
				scope:{
					fileUpload:'='
				},
				link: function(scope, element, attrs) {
					element.bind('change', function(){
						var file = element[0].files[0];
						HelpersService
							.upload(file)
							.then(function(response){
								scope.fileUpload = response.url;
							})
							.catch(function(response){
								console.log(response);
							});
					});
				}
			}
		}
		mensajeClose.$inject = ['$state']
		function mensajeClose($state){
			return{
				restrict: 'A',
				link: function(scope, elem, attrs){
					//remove directive
					 elem.bind('click', function(e) {
					 	if(e.target != this) return;
						elem.remove();
						$state.reload()
					 });
				}
			}
		}

		function popupClose(){
			return{
				restrict: 'A',
				link: function(scope, elem, attrs){
					//remove directive
					 elem.bind('click', function(e) {
					 	if(e.target != this) return;
						elem.remove();
					 });
				}
			}
		}

		popupAdd.$inject = ['$compile'];

		function popupAdd($compile){
			return{
				restrict: 'A',
				link: function(scope, elem, attrs) {
					var body = angular.element(document).find('body');
					elem.bind('click', function() {
						body.append($compile(attrs.popupAdd)(scope));
					});
				}
			}
		}
})();