controllers.controller('SettingsCtrl', function($scope, Settings, $ionicPopup) {
  $scope.settings = Settings.all();
  $scope.save = function(settings) {
    Settings.save(settings);
    $scope.showAlert();
  }  

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Success',
      template: 'Settings saved with success'
    });
  };
})