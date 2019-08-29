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
var UIGame = (function (_super) {
    __extends(UIGame, _super);
    function UIGame() {
        var _this = _super.call(this) || this;
        _this.UIList = new Object();
        _this.skinName = "UIGame_eui";
        return _this;
    }
    UIGame.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.wayLayer = new egret.DisplayObjectContainer();
        this.catLayer = new egret.DisplayObjectContainer();
        this.initCat();
        //this.initList();
        this.addChild(this.wayLayer);
        this.addChild(this.catLayer);
        this.addEvent();
        this.initGame();
        // let gProxy = <mx.GameModelProxy><any>(this.facade.retrieveProxy(GameModelProxy.NAME));
        // GameModel.Ins.updataCat();
        //console.log("childrenCreated");
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameStart,this)
    };
    UIGame.prototype.initCat = function () {
        this.CatList = [];
        this.cat = new Cat(0);
        this.cat1 = new Cat(1);
        this.CatList.push(this.cat);
        this.CatList.push(this.cat1);
    };
    UIGame.prototype.addEvent = function () {
        // GlobalDispatcher.Ins.addEventListener(UIGame.UPDATA,this.UpdataData,this);
        // GlobalDispatcher.Ins.addEventListener(UIGame.UPDATA_CAT,this.UpdataCat,this);
        // GlobalDispatcher.Ins.addEventListener(UIGame.UPDATA_CAT_Bir,this.UpdataCatBir,this);
        // GlobalDispatcher.Ins.addEventListener(UIGame.GAME_Cat_Lose,this.catLose,this);
        // GlobalDispatcher.Ins.addEventListener(UIGame.GAME_Win,this.showWin,this);
        // GlobalDispatcher.Ins.addEventListener(UIGame.GAME_Lose,this.showLose,this);
        this.reStartImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame, this);
    };
    UIGame.prototype.removeEvent = function () {
        // GlobalDispatcher.Ins.removeEventListener(UIGame.UPDATA,this.UpdataData,this);
        // GlobalDispatcher.Ins.removeEventListener(UIGame.UPDATA_CAT,this.UpdataCat,this);
        // GlobalDispatcher.Ins.removeEventListener(UIGame.GAME_Win,this.showWin,this);
        // GlobalDispatcher.Ins.removeEventListener(UIGame.GAME_Lose,this.showLose,this);
        this.reStartImage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reStarGame, this);
    };
    UIGame.prototype.catLose = function (e) {
        var cat = this.getCurrCat(e.data);
        cat.toWeiZhu();
    };
    UIGame.prototype.showWin = function (e) {
        this.removeEvent();
        var data = e.data;
        SceneUtil.getInstance().showUIResult(data);
    };
    UIGame.prototype.showLose = function (e) {
        this.removeEvent();
        var data = e.data;
        SceneUtil.getInstance().showUIResult(data);
    };
    UIGame.prototype.reStarGame = function (e) {
        //GameModel.Ins.reSetData();
        this.removeEvent();
        this.addEvent();
        this.initGame();
        //GameModel.Ins.updataCat();
    };
    UIGame.prototype.UpdataCat = function (e) {
        var pointdata = e.data;
        var offx = pointdata.j % 2 == 0 ? 22 : 0;
        var ccc = this.getCurrCat(pointdata.catIndex);
        ccc.x = pointdata.i * 45 + this.pointList.x + offx;
        ccc.y = pointdata.j * 45 + this.pointList.y;
        this.catLayer.addChild(ccc);
    };
    UIGame.prototype.getCurrCat = function (index) {
        return this.CatList[index];
    };
    UIGame.prototype.UpdataCatBir = function (e) {
        var pointdata = e.data;
        var offx = pointdata.j % 2 == 0 ? 22 : 0;
        var ccc = this.getCurrCat(pointdata.catIndex);
        ccc.x = pointdata.i * 45 + this.pointList.x + offx;
        ccc.y = pointdata.j * 45 + this.pointList.y;
        this.catLayer.addChild(ccc);
        this.removeEvent();
        var endY = ccc.y;
        ccc.y = 0;
        var tw = egret.Tween.get(ccc).call(this.onComplete, this);
        tw.to({ y: endY }, 1000);
    };
    UIGame.prototype.onComplete = function () {
        this.addEvent();
    };
    UIGame.prototype.initGame = function (e) {
        if (e === void 0) { e = null; }
        //let data:CustomMap =  GameModel.Ins.reSetData();
        //console.log();
        //var dataMax:number = GameModel.Ins.pointMax;
        var vo;
        //console.log("dataMax" + dataMax);
        //this.StepLabel.text = GameModel.Ins.nowStep + "";
        // for (var i:number = 0;i<dataMax;i++)
        // {
        // 	//vo = data.get(i);
        // 	this.updataPoint(vo);
        // }
        //this.cellList.dataProvider = new eui.ArrayCollection([]);
        this.cat.reStart();
        this.cat1.reStart();
    };
    UIGame.prototype.updataPoint = function (vo) {
        var point;
        if (!this.UIList.hasOwnProperty(vo.index + "")) {
            point = new UIWayPoint();
            var offx = vo.j % 2 == 0 ? 22 : 0;
            point.x = vo.i * 45 + this.pointList.x + offx;
            point.y = vo.j * 45 + this.pointList.y;
            this.UIList[vo.index] = point;
            this.wayLayer.addChild(point);
        }
        else {
            point = this.UIList[vo.index];
        }
        //console.log("com" );
        point.upData(vo);
    };
    UIGame.prototype.UpdataData = function (e) {
        //this.StepLabel.text = GameModel.Ins.nowStep + "";
        var data = e.data;
        this.updataPoint(data);
    };
    UIGame.RE_START_GAME = "RE_START_GAME";
    UIGame.UPDATA = "UIGame_updata";
    UIGame.UPDATA_CAT = "UIGame_updata_cat";
    UIGame.UPDATA_CAT_Bir = "UIGame_updata_cat_Bir";
    UIGame.RE_GAME = "UIGame_re_game";
    UIGame.GAME_Win = "UIGame_GAME_Win";
    UIGame.GAME_Lose = "UIGame_GAME_Lose";
    UIGame.GAME_Cat_Lose = "UIGame_GAME_Cat_Lose";
    return UIGame;
}(Widget));
__reflect(UIGame.prototype, "UIGame");
//# sourceMappingURL=UIGame.js.map