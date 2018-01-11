/**
 *   @author cy
 *   @date 2017.4.22
 *   @desc 家族成员界面
 **/
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
    var UnionMemberScreen = (function (_super) {
        __extends(UnionMemberScreen, _super);
        function UnionMemberScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionMemberScreen.mx_support = function () {
            return ["assets.jz_member"];
        };
        UnionMemberScreen.prototype.init_view = function () {
            this.init_ani();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.UnionMemberScreenMediator(this));
        };
        UnionMemberScreen.prototype.init_ani = function () {
            var _this = this;
            //后添加的动画
            this.ef.removeChildren();
            //水平方向的花瓣
            var flower_v = new mx.GeneralEffect("flower_v");
            flower_v.x = 80;
            flower_v.y = 180;
            flower_v.play_by_times(-1);
            this.ef.addChild(flower_v);
            egret.setTimeout(function () {
                var flower_v1 = new mx.GeneralEffect("flower_v");
                flower_v1.x = 200;
                flower_v1.y = 240;
                flower_v1.play_by_times(-1);
                _this.ef.addChild(flower_v1);
            }, this, 1000);
            egret.setTimeout(function () {
                var flower_v2 = new mx.GeneralEffect("flower_v");
                flower_v2.x = 360;
                flower_v2.y = 200;
                flower_v2.play_by_times(-1);
                _this.ef.addChild(flower_v2);
            }, this, 2000);
            //垂直方向的花瓣
            var flower_h = new mx.GeneralEffect("flower_h");
            flower_h.x = 80;
            flower_h.y = 540;
            flower_h.play_by_times(-1);
            this.ef.addChild(flower_h);
        };
        UnionMemberScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.bj_ui.on_remove();
            this.xx_ui.on_remove();
            this.ef.removeChildren();
            mx.ApplicationFacade.getInstance().removeMediator(mx.UnionMemberScreenMediator.NAME);
        };
        UnionMemberScreen.S_NAME = "UnionMemberScreen";
        return UnionMemberScreen;
    }(mx.BasicView));
    mx.UnionMemberScreen = UnionMemberScreen;
    __reflect(UnionMemberScreen.prototype, "mx.UnionMemberScreen");
})(mx || (mx = {}));
//# sourceMappingURL=UnionMemberScreen.js.map