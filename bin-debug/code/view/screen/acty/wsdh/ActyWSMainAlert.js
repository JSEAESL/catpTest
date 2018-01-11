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
 * @date 2017.11.23
 *
 */
var mx;
(function (mx) {
    var ActyWSMainAlert = (function (_super) {
        __extends(ActyWSMainAlert, _super);
        function ActyWSMainAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyWSMainAlert.mx_support = function () {
            return ["assets.acty_wushuang_main"];
        };
        ActyWSMainAlert.prototype.init_view_by_type = function () {
            this.sm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.yl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.dh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.sc_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.yc_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.closesm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.sx_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ActyWSMainAlertMediator(this));
            this.sm_g.visible = false;
            this.fresh_list();
            this.fresh_time();
        };
        ActyWSMainAlert.prototype.fresh_list = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            this.num_t.text = "" + aproxy.wsb_num;
        };
        ActyWSMainAlert.prototype.fresh_time = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            var res_timer = Math.max(0, Number(aproxy.acty_time['25'].end - now_time));
            this.time_t.text = mx.Lang.p0145 + mx.Tools.format_second2(res_timer);
        };
        ActyWSMainAlert.prototype.button_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.sm_b:
                    this.sm_g.visible = true;
                    break;
                case this.closesm_b:
                case this.sx_rect:
                    this.sm_g.visible = false;
                    break;
                case this.yl_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyWSYLAlert.S_NAME, "param": 0 });
                    break;
                case this.dh_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyWSYLAlert.S_NAME, "param": 1 });
                    break;
                case this.sc_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ACT_WS_BUY, "type": 1 });
                    break;
                case this.yc_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ACT_WS_BUY, "type": 0 });
                    break;
            }
        };
        ActyWSMainAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.sm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.yl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.dh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.sc_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.yc_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.closesm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.sx_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ActyWSMainAlertMediator.NAME);
        };
        ActyWSMainAlert.S_NAME = "ActyWSMainAlert";
        return ActyWSMainAlert;
    }(mx.AlertView));
    mx.ActyWSMainAlert = ActyWSMainAlert;
    __reflect(ActyWSMainAlert.prototype, "mx.ActyWSMainAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyWSMainAlert.js.map