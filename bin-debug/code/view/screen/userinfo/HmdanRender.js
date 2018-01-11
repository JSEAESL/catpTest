/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 黑名单render
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
    var HmdanRender = (function (_super) {
        __extends(HmdanRender, _super);
        function HmdanRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HmdanRender.prototype.init_render = function () {
            this.dataChanged();
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        Object.defineProperty(HmdanRender.prototype, "gProxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.GameProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HmdanRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            var flag = mx.Tools.jiechu_hmdan(cd.user_id);
            if (flag) {
                this.gProxy.delete_hmd_info(cd.user_id);
            }
        };
        HmdanRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            view.name_t.text = d.name;
            view.vip_t.text = d.vip + '';
            view.lv_t.text = mx.Lang.dji + ': ' + d.level;
            view.jzu_t.text = mx.Lang.u0004 + (d.family ? d.family : mx.Lang.jz216);
            view.avatar.source = "tx78_" + d.avatar + "_png";
            var qj_gxi = [2, 3, 5];
            var gxibg = mx.Tools.qinmi_to_gxi(Number(d.qinmi));
            if (qj_gxi.indexOf(Number(d.guanxi)) >= 0) {
                view.gxibg.source = 'qjia_png';
            }
            else {
                view.gxibg.source = !d.guanxi ? 'lren_png' : gxibg;
            }
            view.gxibg.left = view.name_t.left + view.name_t.width + 8;
        };
        return HmdanRender;
    }(mx.BasicRender));
    mx.HmdanRender = HmdanRender;
    __reflect(HmdanRender.prototype, "mx.HmdanRender");
})(mx || (mx = {}));
//# sourceMappingURL=HmdanRender.js.map