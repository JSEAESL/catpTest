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
    var GameRoot = (function (_super) {
        __extends(GameRoot, _super);
        function GameRoot() {
            var _this = _super.call(this) || this;
            _this.UIList = new Object();
            _this.skinName = GameRoot.NAME + "Skin";
            return _this;
        }
        GameRoot.prototype.onAddTostage = function () {
            console.log("GameRoot>>>onAddTostage");
            this.wait.visible = false;
            this.initRoot();
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.GameRootMediator(this));
        };
        GameRoot.prototype.initRoot = function () {
            this.wayLayer = new egret.DisplayObjectContainer();
            this.catLayer = new egret.DisplayObjectContainer();
            this.addChild(this.wayLayer);
            this.addChild(this.catLayer);
            this.initCat();
        };
        GameRoot.prototype.initCat = function () {
            this.CatList = [];
            this.cat = new Cat(0);
            this.cat1 = new Cat(1);
            this.CatList.push(this.cat);
            this.CatList.push(this.cat1);
        };
        GameRoot.prototype.updataPoint = function (vo) {
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
        GameRoot.prototype.catLose = function (index) {
            var cat = this.getCurrCat(index);
            cat.toWeiZhu();
        };
        GameRoot.prototype.getCurrCat = function (index) {
            return this.CatList[index];
        };
        GameRoot.prototype.UpdataCatBir = function (pointdata) {
            var offx = pointdata.j % 2 == 0 ? 22 : 0;
            var ccc = this.getCurrCat(pointdata.catIndex);
            ccc.x = pointdata.i * 45 + this.pointList.x + offx;
            ccc.y = pointdata.j * 45 + this.pointList.y;
            this.catLayer.addChild(ccc);
            var endY = ccc.y;
            ccc.y = 0;
            var tw = egret.Tween.get(ccc); //.call(this.onComplete, this);
            tw.to({ y: endY }, 1000);
        };
        GameRoot.prototype.UpdataCat = function (pointdata) {
            var offx = pointdata.j % 2 == 0 ? 22 : 0;
            var ccc = this.getCurrCat(pointdata.catIndex);
            ccc.x = pointdata.i * 45 + this.pointList.x + offx;
            ccc.y = pointdata.j * 45 + this.pointList.y;
            this.catLayer.addChild(ccc);
        };
        GameRoot.prototype.onRmovestage = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.removeMediator(mx.GameRootMediator.NAME);
        };
        GameRoot.NAME = "GameRoot";
        return GameRoot;
    }(BasicComponent));
    mx.GameRoot = GameRoot;
    __reflect(GameRoot.prototype, "mx.GameRoot");
})(mx || (mx = {}));
//# sourceMappingURL=GameRoot.js.map