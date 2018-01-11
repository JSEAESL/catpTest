var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameModel = (function () {
    function GameModel() {
        this.endPoints = [];
        this.pointMax = 0;
        this.UIList = new Object();
        this.nowStep = 0;
        this.lastIndex = -1;
        this.minHasNum = 7;
        this.maxHasNum = 11;
        this.star = new AStar();
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
    }
    Object.defineProperty(GameModel, "Ins", {
        get: function () {
            if (null == this._Ins) {
                this._Ins = new GameModel();
            }
            return this._Ins;
        },
        enumerable: true,
        configurable: true
    });
    GameModel.prototype.initCatData = function () {
        this.CatWayData = WayPointData.creatData(40, 5, 5);
        this.CatWayData.catIndex = 0;
        this.CatWay1Data = WayPointData.creatData(31, 6, 5);
        this.CatWay1Data.catIndex = 1;
    };
    GameModel.prototype.addEvent = function () {
        // var facade = mx.ApplicationFacade.getInstance();
        // facade.sendNotification(UIWayPoint.POINT_CLICK);
        GlobalDispatcher.Ins.addEventListener(UIWayPoint.POINT_CLICK, this.UpdataData, this);
    };
    GameModel.prototype.UpdataData = function (e) {
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
    Object.defineProperty(GameModel.prototype, "currCatIndex", {
        get: function () {
            if (this.lastIndex > 0) {
                return this.lastIndex % 2;
            }
            return this.nowStep % 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameModel.prototype, "currCatPoint", {
        get: function () {
            if (this.currCatIndex == 0) {
                return this.catPoint;
            }
            return this.catPoint1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameModel.prototype, "otherCatPoint", {
        get: function () {
            if (this.currCatIndex == 0) {
                return this.catPoint1;
            }
            return this.catPoint;
        },
        enumerable: true,
        configurable: true
    });
    GameModel.prototype.reSetData = function () {
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
        //var randHasNum:number  = 30;
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
    GameModel.prototype.updataCat = function () {
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
    GameModel.prototype.getNode = function (i, j) {
        return this.pointData.get(i + "_" + j);
    };
    GameModel._Ins = null;
    GameModel.h = 9;
    GameModel.w = 9;
    return GameModel;
}());
__reflect(GameModel.prototype, "GameModel");
//# sourceMappingURL=GameModel.js.map