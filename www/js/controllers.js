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
  $http.get('https://homodont-route.000webhostapp.com/calzadomandarin/json/products_categories.php').then(function(res){
    $scope.categories = res.data;
    // console.log(res.data);
  })
})

.controller('catCtrl', function($scope, $stateParams, $http) {

  var cat = $stateParams.cat

  $http.get('https://homodont-route.000webhostapp.com/calzadomandarin/json/products.php?cat='+cat).then(function(res){
    $scope.products = res.data;
    console.log(res.data);
  })
})

.controller('productCtrl', function($scope, $stateParams, $http, $ionicModal) {
  
  var id = $stateParams.id;

  $scope.modal = {};

  $http.get('https://homodont-route.000webhostapp.com/calzadomandarin/json/product.php?id='+id).then(function(res){
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

.controller('userCtrl', function($scope, $http, $ionicModal, $timeout) {

  $scope.modal = {};
  $scope.data = {};

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openBrowser = function(link){
    window.open(link,'_blank','location=yes'); 
  }

  $scope.login = function(){

    var config = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
    var data = $scope.data;

    $http.post('https://homodont-route.000webhostapp.com/calzadomandarin/php/login_customer.php',data, config).then(function(res){
      console.log(res.data);
      if(res.data.status == 'in'){
        window.localStorage.setItem('mandarina_user', res.data.id);
        $scope.modal.hide();
      }else{
        $scope.data.error = res.data.error
      }
    })
  }
  
  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.$on('$ionicView.enter', function(e) {
    var user = window.localStorage.getItem('mandarina_user');
    $timeout(function(){
      if(!user){
        $scope.openModal();
      }
    })
  });
})

.controller('profileCtrl', function($scope, $http, $ionicModal, $timeout) {

  $scope.modal = {};
  $scope.data = {};

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.init = function(){
    var user = window.localStorage.getItem('mandarina_user');
    $http.get('https://homodont-route.000webhostapp.com/calzadomandarin/json/customer.php?id='+user).then(function(res){
      $scope.customer = res.data;
      console.log(res.data);
    })
  }
  
  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.$on('$ionicView.enter', function(e) {
    $scope.init();
  });
})

.controller('favsCtrl', function($scope, $stateParams, $http) {

  $scope.init = function(){
    var user = window.localStorage.getItem('mandarina_user');
    $http.get('https://homodont-route.000webhostapp.com/calzadomandarin/json/favs.php?user='+user).then(function(res){
      $scope.favs = res.data;
      console.log(res.data);
    })
  }

  $scope.init();
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
})

.controller('tabsCtrl', function($scope) {
  $scope.openBrowser = function(link){
    window.open(link,'_blank','location=yes'); 
  };
})