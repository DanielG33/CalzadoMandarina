angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('storeCtrl', function($scope, $http) {

  var config = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8', 'Access-Control-Allow-Origin' : '*'}};

  $scope.openBrowser = function(link){
    window.open(link,'_blank','location=yes'); 
  };

  // $http.get('https://homodont-route.000webhostapp.com/calzadomandarin/json/products_categories.php', config).then(function(res){
  $http.get('http://localhost/atg_calzadoMandarina/json/products_categories.php').then(function(res){
    $scope.categories = res.data;
    console.log(res.data);
  })
})

.controller('catCtrl', function($scope, $stateParams, $http) {

  var cat = $stateParams.cat

  $http.get('http://localhost/atg_calzadoMandarina/json/products.php?cat='+cat).then(function(res){
    $scope.products = res.data;
    console.log(res.data);
  })

})

.controller('productCtrl', function($scope, $stateParams, $http, $ionicModal) {
  
  var id = $stateParams.id;

  $scope.modal = {};

  $http.get('http://localhost/atg_calzadoMandarina/json/product.php?id='+id).then(function(res){
    $scope.product = res.data;
    console.log(res.data);
  })

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function(product) {
    $scope.modal.show()
    $scope.modal.imgUrl = product.img;
    $scope.modal.productName = product.name;
  }

})

.controller('contactCtrl', function($scope) {
  $scope.openBrowser = function(link){
    window.open(link,'_blank','location=yes'); 
  };
})

.controller('mapCtrl', function($scope) {
  var uluru = {lat: 7.1290536, lng: -73.12779469999998};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}); 
