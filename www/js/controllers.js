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

  $scope.testmethod = function() {
        onDeviceReadyTest();
    }
  
  var user = localStorage.getItem('mandarina_user');
  var id = $stateParams.id;

  $scope.modal = {};

  $http.get('https://homodont-route.000webhostapp.com/calzadomandarin/json/product.php?id='+id+'&user='+user).then(function(res){
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

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.init = function(){
    var user = window.localStorage.getItem('mandarina_user');
    $http.get('https://homodont-route.000webhostapp.com/calzadomandarin/json/favs.php?user='+user).then(function(res){
      $scope.favs = res.data;
      console.log(res.data);
    })
  }

  $scope.show = function(id){
    location.assign('#/tab/user/fav/'+id);
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







// Global InAppBrowser reference
var iabRef = null;

//load start event
function iabLoadStart(event) {
   /*  if (event.url.match("https://payu.herokuapp.com/success")) {
       // iabRef.close();
    } */
}


function iabLoadStop(event) {
    if (event.url.match("https://payu.herokuapp.com/success")) {
        console.log(iabRef);
        iabRef.executeScript({
            code: "document.body.innerHTML"
        }, function(values) {
            //incase values[0] contains result string
            var a = getValue(values[0], 'mihpayid');
            var b = getValue(values[0], 'status');
            var c = getValue(values[0], 'unmappedstatus');
            console.log(a + b + c);//you can capture values from return SURL
            //or
            //incase values[0] contains result string
            // console.log(getValue(values, 'mihpayid'))
        });
  
 // iabRef.close();
  }
}

//get values from inner HTML page i.e success page or failure page values
function getValue(source, key) {
    var pattern = key + '=(\\w+)(&amp;)?';
    var expr = new RegExp(pattern);
    var result = source.match(expr);
    return result[1];
}


//load error event
function iabLoadError(event) {
    alert(event.type + ' - ' + event.message);
}
//close event
function iabClose(event) {
    iabRef.removeEventListener('loadstart', iabLoadStart);
    iabRef.removeEventListener('loadstop', iabLoadStop);
    iabRef.removeEventListener('loaderror', iabLoadError);
    iabRef.removeEventListener('exit', iabClose);
}
// device APIs are available
//
function onDeviceReadyTest() {
    iabRef = window.open('templates/payuBiz.html', '_blank', 'location=no');
    iabRef.addEventListener('loadstart', iabLoadStart);
    iabRef.addEventListener('loadstop', iabLoadStop);
    iabRef.addEventListener('loaderror', iabLoadError);
    iabRef.addEventListener('exit', iabClose);
}
