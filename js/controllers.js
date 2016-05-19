angular.module('starter.controllers', [])
    .filter('to_trusted', function() {
        return function(input, uppercase) {
            var reg = new RegExp("<[^>]+>", "g");
            if (!!input) {
                return input.replace(reg, "");
            } else {
                return "";
            }

        }
    })
    .filter('to_12', function() {
        return function(data) {
            var d = new Date(data);
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            var end = " AM";
            if (h > 12) {
                h - hours % 12;
                end = " PM";
            }
            return (100 + h).toString().substring(1, 3) + ":" + (100 + m).toString().substring(1, 3) + end;


        }
    })
    .directive("myCurrentTime", function() {
        var timeOut = {};
        return function(scope, element, attrs) {
            scope.itemsub.count = 0;
            var userTime = function() {
                scope.itemsub.count = 0;
                if (!!scope.itemsub.prepareStartTime) {
                    scope.itemsub.count = (scope.item.currentTime - scope.itemsub.prepareStartTime);
                    window.clearInterval(timeOut[scope.itemsub.id]);
                }
                timeOut[scope.itemsub.id] = setInterval(function() {

                    var hours = 0,
                        mins = 0,
                        secs = 0;

                    if (!!scope.itemsub.prepareEndTime && scope.itemsub.prepareStatus == "COMPLETE") {

                        scope.itemsub.count = (scope.itemsub.prepareEndTime - scope.itemsub.prepareStartTime);
                    }

                    scope.itemsub.count = parseInt(scope.itemsub.count, 10) + 1000;
                    hours = scope.itemsub.count / 3600 / 1000;
                    mins = (scope.itemsub.count / 60 / 1000) % 60;
                    secs = scope.itemsub.count / 1000 % 60;
                    element.text((parseInt(hours + 100) + ":").substring(1, 4) + (parseInt(mins + 100) + ":").substring(1, 4) + (parseInt(secs + 100) + "").substring(1, 3));
                }, 1000);
            }
            userTime();
        }
    })
    .controller('TabCtrl', function($scope, $rootScope, $timeout, $ionicModal, localStorageService, $http, $location, $filter, $translate, localStorageService) {
        $scope.config = {};
        var urlJson = getKeyValue($location.url());
        $scope.config.printerName = "";
        $scope.config.active = "none";
        if (isObject(urlJson)) {

            $scope.config.active = (urlJson.action == "do") ? "myclick" : "none";
            $scope.config.printerName = urlJson.printername;
        }
        $scope.audio = new Audio('img/alert.wav');
        $scope.alert = function() {

            $scope.audio = new Audio('img/alert.wav');

            $scope.audio.play();

        }


        $scope.config.platform = false;
        if (!!navigator.platform) {
            $scope.config.platform = navigator.platform.match(/Win/i);
        }


        $scope.config.language = !!localStorageService.get("language") ? localStorageService.get("language") : "en";
        localStorageService.set("language", $scope.config.language);
        $translate.use($scope.config.language);
        $scope.language = function() {
            $scope.config.language = ($scope.config.language == "en") ? "zh" : "en";
            $translate.use($scope.config.language);
            localStorageService.set("language", $scope.config.language);

        }

        $scope.config.keyBoard = [{
                key: 'q',
                'width': 'keyAll'
            }, {
                key: 'w',
                'width': 'keyAll'
            }, {
                key: 'e',
                'width': 'keyAll'
            }, {
                key: 'r',
                'width': 'keyAll'
            }, {
                key: 't',
                'width': 'keyAll'
            }, {
                key: 'y',
                'width': 'keyAll'
            }, {
                key: 'u',
                'width': 'keyAll'
            }, {
                key: 'i',
                'width': 'keyAll'
            }, {
                key: 'o',
                'width': 'keyAll'
            }, {
                key: 'p',
                'width': 'keyAll'
            }, {
                key: '',
                'width': 'keyBorder'
            }, {
                key: '1',
                'width': 'keyAll'
            }, {
                key: '2',
                'width': 'keyAll'
            }, {
                key: '3',
                'width': 'keyAll'
            }, {
                key: 'a',
                'width': 'keyAll'
            }, {
                key: 's',
                'width': 'keyAll'
            }, {
                key: 'd',
                'width': 'keyAll'
            }, {
                key: 'f',
                'width': 'keyAll'
            }, {
                key: 'g',
                'width': 'keyAll'
            }, {
                key: 'h',
                'width': 'keyAll'
            }, {
                key: 'j',
                'width': 'keyAll'
            }, {
                key: 'k',
                'width': 'keyAll'
            }, {
                key: 'l',
                'width': 'keyAll'
            }, {
                key: '#',
                'width': 'keyAll'
            }, {
                key: '',
                'width': 'keyBorder'
            }, {
                key: '4',
                'width': 'keyAll'
            }, {
                key: '5',
                'width': 'keyAll'
            }, {
                key: '6',
                'width': 'keyAll'
            }, {
                key: 'z',
                'width': 'keyAll'
            }, {
                key: 'x',
                'width': 'keyAll'
            }, {
                key: 'c',
                'width': 'keyAll'
            }, {
                key: 'v',
                'width': 'keyAll'
            }, {
                key: 'b',
                'width': 'keyAll'
            }, {
                key: 'n',
                'width': 'keyAll'
            }, {
                key: 'm',
                'width': 'keyAll'
            }, {
                key: ' ',
                'width': 'keyAll'
            }, {
                key: 'Backspace',
                'width': 'Backspace'
            }, {
                key: '',
                'width': 'keyBorder'
            }, {
                key: '7',
                'width': 'keyAll'
            }, {
                key: '8',
                'width': 'keyAll'
            }, {
                key: '9',
                'width': 'keyAll'
            }, {
                key: '',
                'width': 'Otherspace'
            }, {
                key: '',
                'width': 'keyBorder'
            }, {
                key: '*',
                'width': 'keyAll'
            }, {
                key: '0',
                'width': 'keyAll'
            }, {
                key: '#',
                'width': 'keyAll'
            }

        ]
        $scope.inputKey = function(key) {
            if (key == "Backspace") {
                $scope.filterKitcher.filterWord = $scope.filterKitcher.filterWord.substring(0, $scope.filterKitcher.filterWord.length - 1);
            } else {
                $scope.filterKitcher.filterWord = $scope.filterKitcher.filterWord + key;
            }

        }
        $scope.filterKitcher = {};
        $scope.filterKitcher.kitcherKey = [];
        $scope.filterKitcher.runnerKey = [];
        $scope.filterKitcher.filterWord = ""; //input\

        $scope.filterKitcher.searchList = [];


        $scope.filterKitcher.key = true;
        $scope.filterKitcher.listShow = false;

        $scope.filterKitcher.headers = true;
        var ip = $location.host();
        var port = $location.port();
        $scope.url = ip + ":" + port;
        $scope.searchName = "";

        $scope.unique5 = function(array) {
            var r = [];
            for (var i = 0, l = array.length; i < l; i++) {
                for (var j = i + 1; j < l; j++)
                    if (array[i] === array[j]) j = ++i;
                r.push({
                    "key": array[i]
                });
            }
            return r;
        }

        $scope.processSubmit = function(orderId, orderItemId, sign) {


            if (!!document.getElementById("change" + orderItemId)) {
                var status = document.getElementById("change" + orderItemId).innerText;
            }

            if (sign != "none" && status != "") {
                var processJson = {};
                processJson.orderId = orderId;
                processJson.orderItemId = [];
                processJson.orderItemId.push(orderItemId);



                processJson.status = "COMPLETE";
                if (status == "Waiting" || status == "Pending") {

                    processJson.status = "PROCESSING";
                }
                //  console.log(processJson);

                $http({
                        method: 'POST',
                        url: $rootScope.updateOrderUrl,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        data: processJson
                    })
                    .then(function success(response) {

                        if (!response.data.resultType.successful) {
                            alert("Server is error");
                        } else if (status != "Confirm") {


                            var kitchenUpdoList = localStorageService.get("kitchenUpdo");
                            if (processJson.status == "PROCESSING") {
                                processJson.status = "INITIAL";
                                document.getElementById("change" + orderItemId).innerText = "In Process";
                            } else if (processJson.status == "COMPLETE") {
                                processJson.status = "PROCESSING";
                                if (!!document.getElementById("change" + orderItemId) && sign != "myclick") {
                                    document.getElementById("change" + orderItemId).innerText = "Finished";
                                }
                            }

                            processJson.time = new Date().getTime();
                            if (!!kitchenUpdoList) {
                                kitchenUpdoList = JSON.parse(kitchenUpdoList);

                                kitchenUpdoList.push(processJson);

                            } else {
                                kitchenUpdoList = [];
                                kitchenUpdoList.push(processJson);

                            }
                            kitchenUpdoList.sort(function(a, b) {
                                return parseInt(b.time) - parseInt(a.time);
                            });
                            if (kitchenUpdoList.length > 50) {
                                kitchenUpdoList.length = 50;
                            }
                            $scope.config.kitchenUpdoListLen = kitchenUpdoList.length;

                            localStorageService.set("kitchenUpdo", JSON.stringify(kitchenUpdoList));
                        }
                    }, function error(response) {
                        console.log(response);
                    });
            }
            // $scope.search($scope.filterKitcher.filterWord,'kitchen') 
        };

        $scope.goBack = function() {
            
            $scope.filterKitcher.listShow = false;
            $location.path("tab/kitchen");
        }

        $scope.search = function(searchName, sign, go) {

            //console.log("search");


            var time = 0;
            if (go == "go") {
                time = 800;
                if (sign == "runner") {
                    $location.path("tab/runnerSearch");
                } else {
                    $location.path("tab/kitchenSearch");
                }


            }



            $scope.filterKitcher.filterWord = "";
            $timeout(function() {
                $scope.filterKitcher.filterWord = searchName;


                if (sign != "runner") {
                    angular.forEach($scope.orderList, function(value, key) {
                        if (value.kitchShow == true) {
                            value.parent = false;
                            angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                                angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                                    for (var j = 0; j < groundValue.orderItemList.length; j++) {
                                        if (groundValue.orderItemList[j].prepareStatus == "COMPLETE" || groundValue.orderItemList[j].itemDetail != $scope.filterKitcher.filterWord) {} else {
                                            value.parent = true;

                                        }

                                    }


                                })
                            })
                        }
                    })

                } else {
                    angular.forEach($scope.orderList, function(value, key) {
                        if (value.orderStatus != "SERVED") {
                            value["parent"] = false;
                            angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                                angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                                    for (var j = 0; j < groundValue.orderItemList.length; j++) {
                                        if (groundValue.orderItemList[j].itemDetail != $scope.filterKitcher.filterWord) {

                                        } else {
                                            value.parent = true;
                                        }

                                    }


                                })
                            })
                        }
                    })

                }

            }, time);

        }
        $scope.$on('parentDone', function(event, data) {

            $scope.processSubmit(data.orderId, data.orderItemId);
            if (!!data.search && document.getElementById("change" + data.orderItemId).innerText == "In Process") {
                var temp = angular.copy($scope.filterKitcher.filterWord);
                $scope.search("", "kitchen");
                $timeout(function() {
                    $scope.search(temp, "kitchen");
                }, 200)

            }


        })
        $scope.getSearchKey = function() {

            $scope.filterKitcher.runnerKey = [];
            $scope.filterKitcher.kitcherKey = [];
            angular.forEach($scope.orderList, function(value, key) {
                if (value.kitchShow == true) {
                    angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                        angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                            angular.forEach(groundValue.orderItemList, function(setValue, setKey) {
                                if (setValue.prepareStatus != "COMPLETE") {
                                    $scope.filterKitcher.kitcherKey.push(setValue.itemDetail);

                                }


                            })
                        })
                    })
                }
                if (value.orderStatus != "SERVED") {
                    angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                        angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                            angular.forEach(groundValue.orderItemList, function(setValue, setKey) {

                                $scope.filterKitcher.runnerKey.push(setValue.itemDetail);


                            })
                        })
                    })
                }
            })

            $scope.filterKitcher.kitcherKey = $scope.unique5($scope.filterKitcher.kitcherKey);

            $scope.filterKitcher.runnerKey = $scope.unique5($scope.filterKitcher.runnerKey);
        }




        $scope.kitchFilter = function(item) {
            if ($scope.searchName == "") {
                return item.kitchShow == true;
            } else {

                return item.kitchShow == true && (item.itemDetail == $scope.searchName);
            }

        }

        $scope.delay = 60 * 10 * 1000;
        $scope.TimeCtrl = function($scope, $timeout) {
            $scope.clock = "loading clock..."; // initialise the time variable
            $scope.tickInterval = 1000 //ms
            var tick = function() {
                $scope.clock = Date.now() // get the current time
                $timeout(tick, $scope.tickInterval); // reset the timer
            }
            $timeout(tick, $scope.tickInterval);
        }
        $scope.TimeCtrl($scope, $timeout);
        $scope.type = {
            "DINE_IN": "Dine In",
            "TOGO": "To Go",
            "DELIVERY": "Delivery",
            "PICKUP": "Pick Up",
            "ONLINE_PICKUP": "Online Pick Up",
            "ONLINE_DELIVERY": "Online Delivery",
            "SELF_DINE_IN": "Self Dine In"


        };
        $scope.prepareStatus = {
            "WAITING": "Waiting",
            "PROCESSING": "In Process",
            "COMPLETE": "Finished"

        };
        $scope.runPrepareStatus = {
            "WAITING": "Pending",
            "PROCESSING": "In Process",
            "COMPLETE": ""
        };
        $scope.orderList = [];


        $rootScope.wsServer = 'ws://' + $scope.url + '/kpos/webapp/webSocket/systemInfo';
        $rootScope.kitchOrderUrl = "http://" + $scope.url + "/kpos/webapp/order/listAllKitchenItemsByRange";
        $rootScope.updateOrderUrl = "http://" + $scope.url + "/kpos/webapp/order/updateInKitchenOrder";
        $rootScope.recallOrderUrl = "http://" + $scope.url + "/kpos/webapp/order/fetchInKitchenOrder";
        var sock = null;
        $scope.onload = function() {
            console.log("onload");
            sock = new WebSocket($rootScope.wsServer);
            sock.onopen = function() {
                console.log("connected to " + $rootScope.wsServer);
                sock.send('{"instanceName":"SERVER" , "sessionKey":"QlK4V79OeJjyaxb1y2rl"}');
                console.log("send");
            }
            sock.onclose = function(e) {
                alert("Server is Error");
                $location.reload();
                console.log("connection closed (" + e.code + ")");
            }
            sock.onmessage = function(e) {

                var d = JSON.parse(e.data);

                if (!!d.orderInfo) {
                    angular.forEach(d.orderInfo.orderItemList, function(orderValue, orderKey) {
                        angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                            angular.forEach(groundValue.orderItemList, function(setValue, setKey) {

                                setValue.itemDetail = $filter('to_trusted')(setValue.itemDetail);
                            })
                        })
                    })
                    d.orderInfo.kitchShow = true;
                    d.orderInfo.runnerShow = true;
                    d.orderInfo.done = false;
                    if (d.orderInfo.voidOrder == true) {

                        var voidItemJson = {};
                        angular.forEach(d.orderInfo.orderItemList, function(orderValue, orderKey) {
                            angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                                angular.forEach(groundValue.orderItemList, function(value, key) {

                                    if (!!value.voidItem) {

                                        voidItemJson["*" + d.orderInfo.id + "-" + value.id + "-"] = value.printQuantity;
                                    };

                                })
                            })
                        })

                        var voidItemStr = Object.keys(voidItemJson).toString();
                        //angular.forEach($scope.orderList, function(value, key) {
                        var goOut = false;
                        for (var i = 0; i < $scope.orderList.length; i++) {
                            var value = $scope.orderList[i];
                            if (goOut == true) {
                                break;
                            }
                            angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                                angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                                    angular.forEach(groundValue.orderItemList, function(setValue, setKey) {
                                        var tempKey = "*" + value.id + "-" + setValue.id + "-";
                                        if (voidItemStr.indexOf(tempKey) != -1 && !setValue.voidItem) {
                                            var quantity = parseInt(setValue.printQuantity) - parseInt(voidItemJson[tempKey]);
                                            if (quantity > 0) {
                                                setValue.printQuantity = quantity;
                                            } else {
                                                setValue.voidItem = true;

                                            }
                                            voidItemStr = voidItemStr.replace(tempKey, "");
                                            goOut = true;
                                        }

                                    })
                                })
                            })
                        }

                        // })


                    } else if (!d.orderInfo.recall) {

                        var addItemJson = {};

                        angular.forEach(d.orderInfo.orderItemList, function(orderValue, orderKey) {
                            angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                                angular.forEach(groundValue.orderItemList, function(value, key) {
                                    if (!value.comboItem) {
                                        addItemJson["*" + d.orderInfo.id + "-" + value.id + "-"] = key + "-" + value.printQuantity;
                                    } else {
                                        addItemJson["*" + d.orderInfo.id + "-" + value.id + "-"] = key;
                                        angular.forEach(value.subOrderItems, function(cv, ck) {
                                            addItemJson["*" + d.orderInfo.id + "-" + value.id + "-"] += "-" + cv.printQuantity;
                                        })
                                    }

                                })
                            })
                        })
                        var addItemJsonStr = Object.keys(addItemJson).toString();
                        var addItemJsonLen = [];
                        var count = 0;
                        //var addItemJsonMax=1;
                        // var goOut=false;
                        // angular.forEach($scope.orderList, function(value, key) {
                        var goOut = false;
                        for (var i = 0; i < $scope.orderList.length; i++) {
                            var value = $scope.orderList[i];
                            if (goOut == true) {
                                break;
                            }
                            angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                                angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                                    angular.forEach(groundValue.orderItemList, function(setValue, setKey) {
                                        var tempKey = "*" + value.id + "-" + setValue.id + "-";

                                        if (addItemJsonStr.indexOf(tempKey) != -1) {

                                            var tempList = addItemJson[tempKey].split("-");
                                            var keycount = tempList[0];


                                            angular.forEach(addItemJsonLen, function(v, k) {
                                                if (parseInt(keycount) > parseInt(v)) {
                                                    count++;
                                                }
                                            })
                                            addItemJsonLen.push(i);

                                            d.orderInfo.orderItemList[0].orderItemListGroupBySubOrder[0].orderItemList.splice(keycount - count, 1);
                                            if (!setValue.comboItem) {
                                                setValue.printQuantity = parseInt(setValue.printQuantity) + (parseInt(tempList[1]));
                                            } else {
                                                angular.forEach(setValue.subOrderItems, function(cv, ck) {
                                                    cv.printQuantity = parseInt(cv.printQuantity) + parseInt(tempList[ck + 1]);
                                                })
                                            }

                                            goOut = true;


                                        }

                                    })
                                })
                            })

                        }
                        if (d.orderInfo.orderItemList[0].orderItemListGroupBySubOrder[0].orderItemList.length > 0) {
                            d.orderInfo.subItemId=d.orderInfo.orderItemList[0].orderItemListGroupBySubOrder[0].orderItemList[0].id;
                          //  console.log(d.orderInfo);
                            $scope.orderList.push(d.orderInfo);
                        }
                    } else {
                        var orderInfo = d.orderInfo;


                        var goOut = false;
                        for (var i = 0; i < $scope.orderList.length; i++) {
                            var value = $scope.orderList[i];
                            if (goOut == true) {
                                break;
                            }

                            if (orderInfo.id == value.id) {
                                angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                                    angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                                        angular.forEach(groundValue.orderItemList, function(setValue, setKey) {

                                            if (setValue.id == orderInfo.orderItemList[0].orderItemListGroupBySubOrder[0].orderItemList[0].id) {
                                                value.kitchShow = false;
                                                value.kitchRecallShow = false;
                                                value.done = false;
                                                goOut = true;
                                                if (groundValue.orderItemList.length == 1) {
                                                    $scope.orderList.splice(key, 1);
                                                } else {
                                                    groundValue.orderItemList.splice(setKey, 1);
                                                    angular.forEach(orderValue.orderItemListGroupBySubOrder, function(v1, k1) {
                                                        angular.forEach(v1.orderItemList, function(v2, k2) {
                                                            value.subItemId = v2.id;
                                                            if (!value.orderStatus) {
                                                                if (v2.prepareStatus == "COMPLETE") {
                                                                    value.kitchRecallShow = true;
                                                                } else {
                                                                    value.show = true;
                                                                    value.kitchShow = true;
                                                                }
                                                            }
                                                        })
                                                    })


                                                    if (!value.kitchShow && !value.orderStatus) {
                                                        value.done = true;
                                                    }
                                                }


                                            }

                                        })
                                    })
                                })
                            }
                        }
                        orderInfo.kitchShow = true;
                        orderInfo.kitchRecallShow = false;
                        orderInfo.done = false;

                        $scope.orderList.unshift(orderInfo);


                    }
                    $scope.audio.play();
                    //el.play();

                }

                if (!!d.orderUpdateInfo) {
                    orderInfo = d.orderUpdateInfo;



                    angular.forEach($scope.orderList, function(value, key) {
                        if (orderInfo.orderId == value.id) {

                            value.showRecall = false;
                            angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                                angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {

                                    angular.forEach(groundValue.orderItemList, function(setValue, setKey) {

                                        if (setValue.id == orderInfo.orderItemId) {
                                            value.kitchShow = false;
                                            value.kitchRecallShow = false;
                                            value.done = false;

                                            value.currentTime = !!orderInfo.currentTime ? orderInfo.currentTime : null;
                                            value.orderStatus = !!orderInfo.orderStatus ? orderInfo.orderStatus : null;
                                            value.servedTime = !!orderInfo.servedTime ? orderInfo.servedTime : null;
                                            setValue.prepareStatus = !!orderInfo.orderItemPrepStatus ? orderInfo.orderItemPrepStatus : null;
                                            setValue.prepareStartTime = !!orderInfo.prepStartTime ? orderInfo.prepStartTime : null;
                                            setValue.prepareEndTime = orderInfo.prepEndTime ? orderInfo.prepEndTime : null;
                                            setValue.orderStatus = !!orderInfo.orderItemPrepStatus ? orderInfo.orderItemPrepStatus : null;


                                            angular.forEach(orderValue.orderItemListGroupBySubOrder, function(v1, k1) {
                                                angular.forEach(v1.orderItemList, function(v2, k2) {

                                                    if (!value.orderStatus) {
                                                        if (v2.prepareStatus != "COMPLETE") {
                                                            value.show = true;
                                                            value.kitchShow = true;
                                                        } else if (v2.prepareStatus == "COMPLETE") {
                                                            value.kitchRecallShow = true;
                                                        }
                                                    }
                                                })
                                            })


                                            if (!value.kitchShow && !value.orderStatus) {
                                                value.done = true;
                                            }


                                        }


                                    })
                                })
                            })




                        }



                    });
                }
                if (d.instanceName != "SERVER") {
                    $scope.getSearchKey();




                }

            };
        }

        $scope.onload();
        $http({
            method: 'POST',
            url: $rootScope.kitchOrderUrl,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: {}

        }).then(function success(response) {
            $scope.orderList = response.data.orderDetailInfoList;

            if (!!$scope.orderList) {
                angular.forEach($scope.orderList, function(value, key) {
                    value.show = false;
                    value.showRecall = false;

                    value.kitchShow = false;
                    value.kitchRecallShow = false;
                    value.done = false;

                    angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                        angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {

                            angular.forEach(groundValue.orderItemList, function(setValue, setKey) {
                                setValue.itemDetail = $filter('to_trusted')(setValue.itemDetail);
                                value.subItemId = setValue.id;
                                if (!value.orderStatus) {
                                    console.log("598");
                                    if (setValue.prepareStatus == "COMPLETE") {
                                        value.kitchRecallShow = true;

                                    } else {
                                        value.show = true;
                                        value.kitchShow = true;
                                    }
                                }

                            })



                        })

                        if (!value.kitchShow && !value.orderStatus) {
                            value.done = true;
                        }

                    })
                });
                $scope.getSearchKey();
            }


        }, function error(response) {
            console.log(response);

        });

        var kitchenUpdoList = localStorageService.get("kitchenUpdo");
        $scope.config.kitchenUpdoListLen = 0;
        if (!!kitchenUpdoList) {
            kitchenUpdoList = JSON.parse(kitchenUpdoList);
            $scope.config.kitchenUpdoListLen = kitchenUpdoList.length;
        }

        var runnerUpdoList = localStorageService.get("runnerUpdo");
        $scope.config.runnerUpdoListLen = 0;
        if (!!runnerUpdoList) {
            runnerUpdoList = JSON.parse(runnerUpdoList);
            $scope.config.runnerUpdoListLen = runnerUpdoList.length;
        }


    })
    .controller('RunnerSearchCtrl', function($scope, $location, $rootScope, $timeout, $ionicModal, localStorageService, $http, $timeout,localStorageService) {
	    $scope.config.runnerIndex=localStorageService.get("runnerUrl");
        $scope.find = function(value) {
            $scope.filterKitcher.listShow = false;
            $scope.filterKitcher.filterWord = value;
            $scope.search(value, 'runner', "")
        }

    })
    .controller('KitchenSearchCtrl', function($scope, $rootScope, $timeout, $ionicModal, localStorageService, $http, $timeout) {
        $scope.config.kitchenerUrl=localStorageService.get("kitchenerUrl");
        $scope.find = function(value) {

            $scope.filterKitcher.listShow = false;
            $scope.filterKitcher.filterWord = value;

            $scope.search(value, 'kitchen', "")
        }

        $scope.processSubmit = function(orderId, orderItemId) {
            var json = {};
            json.orderId = orderId;
            json.orderItemId = orderItemId;
            json.search = true;
            $scope.$emit('parentDone', json);
        }

    })
    .controller('KitchenCtrl', function($scope, $rootScope, $location, $timeout, $ionicModal, localStorageService, $http, $timeout) {
         

        $scope.goToRecall = function() {
            $location.path("tab/kitchenRecall");
        }
        $scope.processSubmit = function(orderId, orderItemId) {
            var json = {};
            json.orderId = orderId;
            json.orderItemId = orderItemId;
            $scope.$emit('parentDone', json);
        }



        $scope.kitchUpdo = function() {
            var kitchenUpdoList = localStorageService.get("kitchenUpdo");
            if (!!kitchenUpdoList) {

                var tempKitchenUpdoList = [];
                kitchenUpdoList = JSON.parse(kitchenUpdoList);

                angular.forEach($scope.orderList, function(value, key) {

                    angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                        angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                            angular.forEach(groundValue.orderItemList, function(setValue, setKey) {
                                if (value.orderStatus != "SERVED") {

                                    angular.forEach(kitchenUpdoList, function(localValue, localKey) {

                                        if (setValue.id == localValue.orderItemId[0]) {
                                            tempKitchenUpdoList.push(localValue);


                                        }


                                    })
                                }
                            })
                        })
                    })
                })

                tempKitchenUpdoList.sort(function(a, b) {

                    return parseInt(a.time) - parseInt(b.time);
                });
                var length = tempKitchenUpdoList.length;

                if (length > 0) {

                    $http({
                            method: 'POST',
                            url: $rootScope.updateOrderUrl,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: tempKitchenUpdoList[length - 1]
                        })
                        .then(function success(response) {

                            if (!response.data.resultType.successful) {
                                alert("Server is error");
                            } else {


                                tempKitchenUpdoList.length = length - 1;
                                $scope.config.kitchenUpdoListLen = tempKitchenUpdoList.length;

                                var tempStr = "";

                                if (tempKitchenUpdoList.length >= 1) {
                                    tempStr = JSON.stringify(tempKitchenUpdoList);
                                }

                                localStorageService.set("kitchenUpdo", tempStr);


                            }
                        }, function error(response) {

                            console.log(response);
                        });
                } else {

                    $scope.config.kitchenUpdoListLen = 0;
                    localStorageService.set("kitchenUpdo", "");
                }
            }


        }



    })
    .controller('RunnerdoCtrl', function($scope, $http, localStorageService, $rootScope,$location) {
          localStorageService.set("runnerUrl",$location.url());
          $scope.config.runnerIndex=$location.url();
		$scope.runnerUpdo = function() {

            var runnerUpdoList = localStorageService.get("runnerUpdo");

            if (!!runnerUpdoList) {
                runnerUpdoList = JSON.parse(runnerUpdoList);
                var tempRunnerUpdoList = [];

                angular.forEach($scope.orderList, function(value, key) {

                    angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                        angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                            angular.forEach(groundValue.orderItemList, function(setValue, setKey) {


                                angular.forEach(runnerUpdoList, function(localValue, localKey) {
                                    if (setValue.id == localValue.orderItemId[0]) {
                                        tempRunnerUpdoList.push(localValue);
                                    }


                                })

                            })
                        })
                    })
                })


                runnerUpdoList = tempRunnerUpdoList;
                var length = runnerUpdoList.length;

                if (length > 0) {
                    runnerUpdoList.sort(function(a, b) {
                        return parseInt(a.time) - parseInt(b.time);
                    });

                    runnerUpdoList[length - 1].status = "COMPLETE";

                    $http({
                            method: 'POST',
                            url: $rootScope.updateOrderUrl,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: runnerUpdoList[length - 1]
                        })
                        .then(function success(response) {

                            if (!response.data.resultType.successful) {
                                alert("Server is error");
                            } else {


                                runnerUpdoList.length = length - 1;

                                $scope.config.runnerUpdoListLen = runnerUpdoList.length;

                                localStorageService.set("runnerUpdo", JSON.stringify(runnerUpdoList));
                            }
                        }, function error(response) {
                            console.log(response);
                        });
                } else {
                    localStorageService.set("runnerUpdo", "");
                    $scope.config.runnerUpdoListLen = 0;
                }
            }


        }


        $scope.done = function(e) {

            var subItemId = e.target.dataset.subitemid;
            var processJson = {};
            processJson.orderItemId = [];


            var goOut = false;
            for (var i = 0; i < $scope.orderList.length; i++) {
                var value = $scope.orderList[i];



                if (goOut == true) {
                    break;
                }

                angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                    angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                        angular.forEach(groundValue.orderItemList, function(setValue, setKey) {
                            if (subItemId == setValue.id) {
                                processJson.status = (value.orderStatus == "SERVED") ? "DONE" : "SERVED";

                                processJson.orderId = value.id;
                                angular.forEach(groundValue.orderItemList, function(sv, sk) {
                                    processJson.orderItemId.push(sv.id);
                                })
                            }


                        })



                    })
                })

            };

            // console.log(processJson);

            $http({
                method: 'POST',
                url: $rootScope.updateOrderUrl,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: processJson
            }).then(function success(response) {
                if (!response.data.resultType.successful) {
                    alert("Server is Error");
                } else {

                    var runnerUpdoList = localStorageService.get("runnerUpdo");
                    processJson.time = new Date().getTime();
                    if (!!runnerUpdoList) {
                        runnerUpdoList = JSON.parse(runnerUpdoList);

                        runnerUpdoList.push(processJson);

                    } else {
                        runnerUpdoList = [];
                        runnerUpdoList.push(processJson);

                    }
                    runnerUpdoList.sort(function(a, b) {
                        return parseFloat(b.time) - parseFloat(a.time);
                    });

                    if (runnerUpdoList.length > 5) {
                        runnerUpdoList.length = 5;
                    }
                    $scope.config.runnerUpdoListLen = runnerUpdoList.length;
                    localStorageService.set("runnerUpdo", JSON.stringify(runnerUpdoList));

                }
            }, function error(response) {
                console.log(response);
            });
        }


    })
    .controller('KitchenRecallCtrl', function($scope, $http, $rootScope) {
	   //$scope.config.kitchenerUrl=localStorageService.get("kitchenerUrl");
        $scope.kitchenRecall = function(orderId, orderItemId) {

            var processJson = {};
            processJson.orderId = orderId;
            processJson.orderItemId = [];
            processJson.orderItemId.push(orderItemId);
            var cblist = document.querySelectorAll(".cb" + orderItemId);
            angular.forEach(cblist, function(v, k) {
                processJson.orderItemId.push(v.value);
            })



            processJson.status = "INITIAL";

            $http({
                    method: 'POST',
                    url: $rootScope.recallOrderUrl,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: processJson
                })
                .then(function success(response) {

                    if (!response.data.resultType.successful) {

                        alert("Server is error");

                    }
                }, function error(response) {
                    console.log(response);
                });

        };
    })
    .controller('RunnerReviewCtrl', function($scope, $http, $rootScope,localStorageService) {
		 $scope.config.runnerIndex=localStorageService.get("runnerUrl");

    })
    .controller('RunnerCtrl', function($scope, $http, localStorageService, $rootScope, $location) {
          localStorageService.set("runnerUrl",$location.url());
          $scope.config.runnerIndex=$location.url();

        $scope.runnerUpdo = function() {

            var runnerUpdoList = localStorageService.get("runnerUpdo");

            if (!!runnerUpdoList) {
                runnerUpdoList = JSON.parse(runnerUpdoList);
                var tempRunnerUpdoList = [];

                angular.forEach($scope.orderList, function(value, key) {

                    angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                        angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                            angular.forEach(groundValue.orderItemList, function(setValue, setKey) {


                                angular.forEach(runnerUpdoList, function(localValue, localKey) {
                                    if (setValue.id == localValue.orderItemId[0]) {
                                        tempRunnerUpdoList.push(localValue);
                                    }


                                })

                            })
                        })
                    })
                })


                runnerUpdoList = tempRunnerUpdoList;
                var length = runnerUpdoList.length;

                if (length > 0) {
                    runnerUpdoList.sort(function(a, b) {
                        return parseInt(a.time) - parseInt(b.time);
                    });

                    runnerUpdoList[length - 1].status = "COMPLETE";

                    $http({
                            method: 'POST',
                            url: $rootScope.updateOrderUrl,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: runnerUpdoList[length - 1]
                        })
                        .then(function success(response) {

                            if (!response.data.resultType.successful) {
                                alert("Server is error");
                            } else {


                                runnerUpdoList.length = length - 1;

                                $scope.config.runnerUpdoListLen = runnerUpdoList.length;

                                localStorageService.set("runnerUpdo", JSON.stringify(runnerUpdoList));
                            }
                        }, function error(response) {
                            console.log(response);
                        });
                } else {
                    localStorageService.set("runnerUpdo", "");
                    $scope.config.runnerUpdoListLen = 0;
                }
            }


        }

        $scope.kitchUpdo = function() {
            var kitchenUpdoList = localStorageService.get("kitchenUpdo");
            if (!!kitchenUpdoList) {

                var tempKitchenUpdoList = [];
                kitchenUpdoList = JSON.parse(kitchenUpdoList);

                angular.forEach($scope.orderList, function(value, key) {

                    angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                        angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                            angular.forEach(groundValue.orderItemList, function(setValue, setKey) {
                                if (value.orderStatus != "SERVED") {

                                    angular.forEach(kitchenUpdoList, function(localValue, localKey) {

                                        if (setValue.id == localValue.orderItemId[0]) {
                                            tempKitchenUpdoList.push(localValue);


                                        }


                                    })
                                }
                            })
                        })
                    })
                })

                tempKitchenUpdoList.sort(function(a, b) {

                    return parseInt(a.time) - parseInt(b.time);
                });
                var length = tempKitchenUpdoList.length;

                if (length > 0) {

                    $http({
                            method: 'POST',
                            url: $rootScope.updateOrderUrl,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: tempKitchenUpdoList[length - 1]
                        })
                        .then(function success(response) {

                            if (!response.data.resultType.successful) {
                                alert("Server is error");
                            } else {


                                tempKitchenUpdoList.length = length - 1;
                                $scope.config.kitchenUpdoListLen = tempKitchenUpdoList.length;

                                var tempStr = "";

                                if (tempKitchenUpdoList.length >= 1) {
                                    tempStr = JSON.stringify(tempKitchenUpdoList);
                                }

                                localStorageService.set("kitchenUpdo", tempStr);


                            }
                        }, function error(response) {

                            console.log(response);
                        });
                } else {

                    $scope.config.kitchenUpdoListLen = 0;
                    localStorageService.set("kitchenUpdo", "");
                }
            }


        }


        $scope.done = function(e) {
            var subItemId = e.target.dataset.subitemid;
            var processJson = {};
            processJson.orderItemId = [];
            processJson.status = "SERVED";

            var goOut = false;
            for (var i = 0; i < $scope.orderList.length; i++) {
                var value = $scope.orderList[i];
                if (goOut == true) {
                    break;
                }

                angular.forEach(value.orderItemList, function(orderValue, orderKey) {
                    angular.forEach(orderValue.orderItemListGroupBySubOrder, function(groundValue, groundKey) {
                        angular.forEach(groundValue.orderItemList, function(setValue, setKey) {
                            if (subItemId == setValue.id) {
                                processJson.orderId = value.id;
                                angular.forEach(groundValue.orderItemList, function(sv, sk) {
                                    processJson.orderItemId.push(sv.id);
                                })
                                goOut=true;
                                console.log(groundValue.orderItemList);
                            }


                        })



                    })
                })

            };

         console.log(processJson);

            $http({
                method: 'POST',
                url: $rootScope.updateOrderUrl,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: processJson
            }).then(function success(response) {
                if (!response.data.resultType.successful) {
                    alert("Server is Error");
                } else {

                    var runnerUpdoList = localStorageService.get("runnerUpdo");
                    processJson.time = new Date().getTime();
                    if (!!runnerUpdoList) {
                        runnerUpdoList = JSON.parse(runnerUpdoList);

                        runnerUpdoList.push(processJson);

                    } else {
                        runnerUpdoList = [];
                        runnerUpdoList.push(processJson);

                    }
                    runnerUpdoList.sort(function(a, b) {
                        return parseFloat(b.time) - parseFloat(a.time);
                    });

                    if (runnerUpdoList.length > 5) {
                        runnerUpdoList.length = 5;
                    }
                    $scope.config.runnerUpdoListLen = runnerUpdoList.length;
                    localStorageService.set("runnerUpdo", JSON.stringify(runnerUpdoList));

                }
            }, function error(response) {
                console.log(response);
            });
        }


    })

function toggleFullScreen() {

    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods

        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
       // alert("xdddddxx");
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}


function closeChrome() {

    window.close();
    
}

function getKeyValue(url) {
    var result = {};
    var reg = new RegExp('([\\?|&])(.+?)=([^&?]*)', 'ig');
    var arr = reg.exec(url.toLowerCase());
    while (arr) {
        result[arr[2]] = arr[3];
        arr = reg.exec(url);
    }
    return result;
}

function isObject(e) {
    var sign = false;
    if (!!e && e instanceof Object && !(e instanceof Array) && Object.keys(e).length) {
        sign = true;
    }
    return sign;
}