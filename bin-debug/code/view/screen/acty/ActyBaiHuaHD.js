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
/**
 * @author cy
 * @date 2017.9.20
 * 获得百花仙子\
 */
var mx;
(function (mx) {
    var ActyBaiHuaHD = (function (_super) {
        __extends(ActyBaiHuaHD, _super);
        function ActyBaiHuaHD() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyBaiHuaHD.prototype.init_view_by_type = function () {
            var view = this;
            view.ck_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            var zg = new mx.GeneralEffect("bfudhua");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.x = 90;
            zg.y = 280;
            var zg2 = new mx.GeneralEffect("bfudhua");
            this.ef_g.addChild(zg2);
            zg2.play_by_times(-1);
            zg2.scaleX = -0.5;
            zg2.scaleY = 0.5;
            zg2.x = 290;
            zg2.y = 120;
            var zg3 = new mx.GeneralEffect("bfudhua");
            this.ef_g.addChild(zg3);
            zg3.play_by_times(-1);
            zg3.scaleX = 0.5;
            zg3.scaleY = 0.5;
            zg3.x = 150;
            zg3.y = 150;
            var zg4 = new mx.GeneralEffect("bfudhua");
            this.ef_g.addChild(zg4);
            zg4.play_by_times(-1);
            zg4.scaleX = 1;
            zg4.scaleY = 1;
            zg4.x = 350;
            zg4.y = 170;
        };
        ActyBaiHuaHD.prototype.fun_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": 57,
                "type": 1
            });
        };
        ActyBaiHuaHD.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.ck_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
        };
        ActyBaiHuaHD.S_NAME = "ActyBaiHuaHD";
        return ActyBaiHuaHD;
    }(mx.AlertView));
    mx.ActyBaiHuaHD = ActyBaiHuaHD;
    __reflect(ActyBaiHuaHD.prototype, "mx.ActyBaiHuaHD");
})(mx || (mx = {}));
//# sourceMappingURL=ActyBaiHuaHD.js.map