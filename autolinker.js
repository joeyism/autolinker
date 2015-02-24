/**
  @toc

  @param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
  TODO

  @param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
  TODO

  @dependencies
  TODO

  @usage
  partial / html:
  TODO


//end: usage
*/

'use strict';

angular.module('Joeyism.angular-autolinker', []).directive('joeyismAutolinker', ['$compile','$timeout', function ($compile, $timeout) {

    return {
        restrict: 'EA',

    replace: true,

    link: function(scope, element, attrs) {

        $timeout(function(){
            var text = element[0].innerHTML;
            var linkTypes = ["http://", "https://"];
            linkTypes.forEach(function(linkType){
                var startSpace = 0;
                while (startSpace >= 0){
                    text = element[0].innerHTML;
                    var locationOfHttp = text.indexOf(linkType,startSpace);
                    if (locationOfHttp < 0) break;
                    var locationOfSpace = text.indexOf(" ",locationOfHttp);
                    var textAfter = "";
                    if (locationOfSpace < 0){
                        locationOfSpace = text.length
                    } else {
                        textAfter = text.substring(locationOfSpace,text.length);
                    }
                    var linkUrl = text.substring(locationOfHttp,locationOfSpace);
                    var htmlText = text.substring(0,locationOfHttp)+'<a href="'+linkUrl+'">'+linkUrl+'</a>'+textAfter;
                    element[0].innerHTML = htmlText;
                    startSpace = (text.substring(0,locationOfHttp)+'<a href="'+linkUrl+'">'+linkUrl+'</a>').length-1;
                }
            });
            scope.$apply();
        },1);
    },

    };
}]);
