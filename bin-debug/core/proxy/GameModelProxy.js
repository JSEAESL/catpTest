var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mx;
(function (mx) {
    var GameModelProxy = (function (_super) {
        __extends(GameModelProxy, _super);
        function GameModelProxy() {
            var _this = _super.call(this, GameModelProxy.NAME) || this;
            _this.endPoints = [];
            //private static _Ins:GameModel = null
            _this.pointMax = 0;
            _this.nowStep = 0;
            _this.lastIndex = -1;
            _this.minHasNum = 7;
            _this.maxHasNum = 11;
            _this.star = new AStar();
            _this.initData();
            return _this;
        }
        GameModelProxy.prototype.initData = function () {
            this.pointData = new CustomMap();
            this.pointMax = 0;
            for (var i = GameModel.h; i > 0; i--) {
                for (var j = GameModel.w; j > 0; j--) {
                    var data = WayPointData.creatData(this.pointMax, i, j);
                    this.pointData.add(this.pointMax, data);
                    this.pointData.add(i + "_" + j, data);
                    if (i == 1 || j == 9 || i == 9 || j == 1) {
                        this.endPoints.push(data);
                    }
                    // if(i == 1 && j  == 5)
                    // {
                    // 	this.endPoint = data;
                    // }
                    this.pointMax++;
                }
            }
            this.initCatData();
            this.addEvent();
        };
        GameModelProxy.prototype.initCatData = function () {
            this.CatWayData = WayPointData.creatData(40, 5, 5);
            this.CatWayData.catIndex = 0;
            this.CatWay1Data = WayPointData.creatData(31, 6, 5);
            this.CatWay1Data.catIndex = 1;
        };
        GameModelProxy.prototype.addEvent = function () {
            // var facade = mx.ApplicationFacade.getInstance();
            // facade.sendNotification(UIWayPoint.POINT_CLICK);
            GlobalDispatcher.Ins.addEventListener(UIWayPoint.POINT_CLICK, this.UpdataData, this);
        };
        GameModelProxy.prototype.UpdataData = function (e) {
            this.nowStep = this.nowStep + 1;
            var data = e.data;
            data.clickState();
            this.pointData.update(this.pointMax, data);
            this.pointData.update(data.i + "_" + data.j, data);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(UIGame.UPDATA, new CommonEvent(UIGame.UPDATA, data));
            //GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.UPDATA,data));
            var d = this.star.initPath(this);
            if (null == d) {
                d = this.star.CanMove(this);
                if (null == d) {
                    var winData = ResultData.creatData(true, this.nowStep);
                    if (this.lastIndex != -1) {
                        var facade = mx.ApplicationFacade.getInstance();
                        facade.sendNotification(UIGame.GAME_Win, new CommonEvent(UIGame.GAME_Win, winData));
                        //GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.GAME_Win,winData));
                    }
                    else
                        (this.lastIndex == -1);
                    {
                        this.lastIndex = this.nowStep + 1;
                        d = this.star.CanMove(this);
                        if (null == d) {
                            winData = ResultData.creatData(true, this.nowStep);
                            if (this.lastIndex != -1) {
                                var facade = mx.ApplicationFacade.getInstance();
                                facade.sendNotification(UIGame.GAME_Win, new CommonEvent(UIGame.GAME_Win, winData));
                                //GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.GAME_Win,winData));
                            }
                        }
                    }
                    return;
                }
                else {
                    var facade = mx.ApplicationFacade.getInstance();
                    facade.sendNotification(UIGame.GAME_Cat_Lose, new CommonEvent(UIGame.GAME_Cat_Lose, this.currCatIndex));
                    //GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.GAME_Cat_Lose,this.currCatIndex));
                }
            }
            var nowPoint;
            if (this.currCatIndex == 0) {
                this.catPoint = WayPointData.creatData(40, d[1], d[2]);
                nowPoint = this.catPoint;
            }
            else {
                this.catPoint1 = WayPointData.creatData(40, d[1], d[2]);
                nowPoint = this.catPoint1;
            }
            nowPoint.catIndex = this.currCatIndex;
            console.log("this.currCatIndex:" + nowPoint.catIndex);
            console.log("this.i:" + nowPoint.i);
            console.log("this.j:" + nowPoint.j);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(UIGame.UPDATA_CAT, new CommonEvent(UIGame.UPDATA_CAT, nowPoint));
            //GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.UPDATA_CAT,nowPoint));
            if (d[2] == 9 || d[1] == 1 || d[1] == 9 || d[2] == 1) {
                var loseData = ResultData.creatData(false, this.nowStep);
                var facade = mx.ApplicationFacade.getInstance();
                facade.sendNotification(UIGame.GAME_Lose, new CommonEvent(UIGame.GAME_Lose, loseData));
                //GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.GAME_Lose,loseData));
            }
        };
        Object.defineProperty(GameModelProxy.prototype, "currCatIndex", {
            get: function () {
                if (this.lastIndex > 0) {
                    return this.lastIndex % 2;
                }
                return this.nowStep % 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameModelProxy.prototype, "currCatPoint", {
            get: function () {
                if (this.currCatIndex == 0) {
                    return this.catPoint;
                }
                return this.catPoint1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameModelProxy.prototype, "otherCatPoint", {
            get: function () {
                if (this.currCatIndex == 0) {
                    return this.catPoint1;
                }
                return this.catPoint;
            },
            enumerable: true,
            configurable: true
        });
        GameModelProxy.prototype.reSetData = function () {
            this.nowStep = 0;
            this.lastIndex = -1;
            this.catPoint = null;
            this.catPoint1 = null;
            this.pointMax = 0;
            for (var i = GameModel.h; i > 0; i--) {
                for (var j = GameModel.w; j > 0; j--) {
                    var data = WayPointData.creatData(this.pointMax, i, j);
                    this.pointData.update(this.pointMax, data);
                    this.pointData.update(data.i + "_" + data.j, data);
                    this.pointMax++;
                }
            }
            var randHasNum = this.minHasNum + Math.ceil(Math.random() * (this.maxHasNum - this.minHasNum));
            var hasList = [];
            var randHasNum = 30;
            while (randHasNum > 0) {
                var hasIndex = Math.ceil(Math.random() * this.pointMax);
                if (-1 == hasList.indexOf(hasIndex) && hasIndex != 81 && hasIndex != 40 && hasIndex != 31) {
                    hasList.push(hasIndex);
                    randHasNum--;
                }
            }
            var hasLen = hasList.length;
            console.log("障碍物体  数量： " + hasLen);
            for (var has = 0; has < hasLen; has++) {
                var data = this.pointData.get(hasList[has]);
                data.clickState();
            }
            return this.pointData;
        };
        GameModelProxy.prototype.updataCat = function () {
            if (null == this.catPoint) {
                this.catPoint = this.CatWayData.copy();
                this.catPoint1 = this.CatWay1Data.copy();
                var facade = mx.ApplicationFacade.getInstance();
                facade.sendNotification(UIGame.UPDATA_CAT_Bir, new CommonEvent(UIGame.UPDATA_CAT_Bir, this.catPoint));
                facade.sendNotification(UIGame.UPDATA_CAT_Bir, new CommonEvent(UIGame.UPDATA_CAT_Bir, this.catPoint1));
                // GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.UPDATA_CAT_Bir,this.catPoint));
                // GlobalDispatcher.Ins.dispatchEvent(new CommonEvent(UIGame.UPDATA_CAT_Bir,this.catPoint1));
            }
        };
        GameModelProxy.prototype.getNode = function (i, j) {
            return this.pointData.get(i + "_" + j);
        };
        GameModelProxy.NAME = "GameModelProxy";
        GameModelProxy.h = 9;
        GameModelProxy.w = 9;
        return GameModelProxy;
    }(puremvc.Proxy));
    mx.GameModelProxy = GameModelProxy;
    __reflect(GameModelProxy.prototype, "mx.GameModelProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=GameModelProxy.js.map