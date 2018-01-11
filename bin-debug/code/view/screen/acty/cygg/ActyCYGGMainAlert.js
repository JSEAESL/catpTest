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
 * @date 2017.11.29
 * 财源滚滚
 */
var mx;
(function (mx) {
    var ActyCYGGMainAlert = (function (_super) {
        __extends(ActyCYGGMainAlert, _super);
        function ActyCYGGMainAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyCYGGMainAlert.mx_support = function () {
            return ["assets.acty_cygg", "api.CYGGAWARD", "api.CYGGBASIC", "api.CYGGVIP"];
        };
        ActyCYGGMainAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            this.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.tg_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.tg_t.textFlow = [{ "text": mx.Lang.cygg001, "style": { "underline": true } }];
            facade.registerMediator(new mx.ActyCYGGMainAlertMediator(this));
            if (aproxy.res_cygg) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyCYGGAwardAlert.S_NAME });
            }
            this.fresh_view();
            this.fresh_time();
        };
        ActyCYGGMainAlert.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = facade.retrieveProxy(mx.DataProxy.NAME);
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            this.ybi_t.text = mx.Tools.num2str(dproxy.get_currency("ybi"));
            this.mf_t.text = mx.Lang.cygg002 + aproxy.free_cygg + "/3";
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CYGGBASIC, "id", 2);
            this.cost_t.textFlow = [{ "text": mx.Lang.cygg005 }, { "text": "" + api.num, "style": { "textColor": Number(api.num) > dproxy.get_currency("ybi") ? 0xcf3c36 : 0x403b5f } }];
            if (aproxy.free_cygg > 0) {
                this.mf_t.visible = true;
                this.cost_g.visible = false;
                this.tg_t.visible = false;
                this.num_t.visible = false;
            }
            else {
                this.mf_t.visible = false;
                this.cost_g.visible = true;
                this.tg_t.visible = true;
                this.num_t.visible = true;
                var api_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.CYGGVIP, "vip_level", gproxy.user_vip);
                this.num_t.text = mx.Lang.cygg003 + aproxy.ybi_cygg + "/" + api_1.num;
            }
        };
        ActyCYGGMainAlert.prototype.fresh_time = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            if (aproxy.acty_time['27']) {
                var res_timer = Math.max(0, Number(aproxy.acty_time['27'].end - now_time));
                this.time_t.text = mx.Lang.p0145 + mx.Tools.format_second2(res_timer);
            }
        };
        ActyCYGGMainAlert.prototype.button_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            switch (e.currentTarget) {
                case this.buy_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_ACT_CYGG_BUY
                    });
                    break;
                case this.tg_t:
                    var flow = [];
                    var target = e.currentTarget;
                    var apis = mx.ApiTool.getAPI(mx.MX_APINAME.CYGGVIP);
                    var v_api = void 0, cor = void 0;
                    for (var k in apis) {
                        v_api = apis[k];
                        cor = Number(gproxy.user_vip) >= Number(k) ? 0x5bb351 : 0xb5b4b4;
                        var now_limit = Number(v_api.num);
                        if (Number(k) == 0) {
                            flow.push({ "text": mx.Tools.format(mx.Lang.cygg004, k, now_limit), "style": { "textColor": cor } });
                            flow.push({ "text": "\n" });
                        }
                        else {
                            var pre_limit = Number(apis[Number(k) - 1].num);
                            if (now_limit != pre_limit) {
                                flow.push({ "text": mx.Tools.format(mx.Lang.cygg004, k, now_limit), "style": { "textColor": cor } });
                                flow.push({ "text": "\n" });
                            }
                        }
                    }
                    flow.pop();
                    var point = target.parent.localToGlobal(target.x, target.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "type": "text",
                        "flow": flow,
                    });
                    break;
            }
        };
        ActyCYGGMainAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.tg_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ActyCYGGMainAlertMediator.NAME);
        };
        ActyCYGGMainAlert.S_NAME = "ActyCYGGMainAlert";
        return ActyCYGGMainAlert;
    }(mx.AlertView));
    mx.ActyCYGGMainAlert = ActyCYGGMainAlert;
    __reflect(ActyCYGGMainAlert.prototype, "mx.ActyCYGGMainAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyCYGGMainAlert.js.map