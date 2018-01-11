/**
*   @author cy
*   @date 2016.12.23
*   @desc 新模块开启动画
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
    var NewModular = (function (_super) {
        __extends(NewModular, _super);
        function NewModular() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NewModular.mx_support = function () {
            return ["assets.newmodular"];
        };
        NewModular.prototype.init_view = function () {
            var data = this.adata;
            this.modular_p.source = data.icon;
            this.kq_p.visible = this.modular_p.visible = false;
            this.modular_p.alpha = this.kq_p.alpha = 1;
            this.ef_g.x = 240;
            this.ef_g.y = mx.Tools.screen_height / 2 - 20;
            var zg = new mx.GeneralEffect("xkqcx");
            this.ef_g.addChild(zg);
            zg.play_by_times(1);
            var idTimeout = egret.setTimeout(function (arg) {
                this.buzhou1();
            }, this, 400, "egret");
        };
        NewModular.prototype.buzhou1 = function () {
            this.ef_g.removeChildren();
            var zg = new mx.GeneralEffect("xkqzs");
            this.ef_g.addChild(zg);
            zg.play_by_times(1);
            this.kq_p.visible = this.modular_p.visible = true;
            this.modular_p.scaleY = this.modular_p.scaleX = 1.5;
            egret.Tween.get(this.modular_p).to({ "scaleY": 1, "scaleX": 1 }, 100);
            egret.Tween.get(this.modular_p, { "loop": true }).to({ "verticalCenter": -25 }, 400).to({ "verticalCenter": -20 }, 400);
            var height = mx.Tools.screen_height;
            egret.Tween.get(this.ef_g, { "loop": true }).to({ "y": height / 2 - 25 }, 400).to({ "y": height / 2 - 20 }, 400);
            var idTimeout = egret.setTimeout(function (arg) {
                this.buzhou2();
            }, this, 1250, "egret");
        };
        NewModular.prototype.buzhou2 = function () {
            egret.Tween.removeTweens(this.ef_g);
            this.ef_g.removeChildren();
            var zg = new mx.GeneralEffect("xkqyd");
            this.ef_g.addChild(zg);
            zg.set_retain(true);
            egret.Tween.get(this.kq_p).to({ "alpha": 0 }, 250);
            egret.Tween.get(this.modular_p).to({ "alpha": 0 }, 250);
            var idTimeout2 = egret.setTimeout(function (arg) {
                var pos = this.adata.pos;
                egret.Tween.get(this.ef_g).to({ "x": pos.x, "y": pos.y }, 200);
                var idTimeout = egret.setTimeout(function (arg) {
                    this.buzhou3();
                }, this, 200, "egret");
            }, this, 375, "egret");
        };
        NewModular.prototype.buzhou3 = function () {
            this.ef_g.removeChildren();
            var zg = new mx.GeneralEffect("xkqmb");
            this.ef_g.addChild(zg);
            zg.play_by_times(1);
            var idTimeout = egret.setTimeout(function (arg) {
                this.close_self();
            }, this, 600, "egret");
        };
        NewModular.prototype.close_self = function () {
            egret.Tween.removeTweens(this.kq_p);
            egret.Tween.removeTweens(this.modular_p);
            egret.Tween.removeTweens(this.ef_g);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, NewModular.S_NAME);
            var data = this.adata;
            switch (data.id) {
                /*case 26://侍从兑换
                    facade.sendNotification(MX_NOTICE.OPEN_GUIDE, "m_dh");
                    break;
                case 11://省亲
                    facade.sendNotification(MX_NOTICE.OPEN_GUIDE, 22);
                    break;
                case 12://制作
                    facade.sendNotification(MX_NOTICE.OPEN_GUIDE, 23);
                    break;*/
                case 3://技能
                    facade.sendNotification(mx.MX_NOTICE.OPEN_GUIDE, "m_jn");
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CHECK_NEWMODULAR);
                    break;
            }
        };
        NewModular.S_NAME = "NewModular";
        return NewModular;
    }(mx.BasicView));
    mx.NewModular = NewModular;
    __reflect(NewModular.prototype, "mx.NewModular");
})(mx || (mx = {}));
//# sourceMappingURL=NewModular.js.map