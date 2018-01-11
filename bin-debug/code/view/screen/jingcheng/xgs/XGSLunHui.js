/**
*   @author hxj
*   @date 2017.7.14
*   @desc 相国寺（水月庵）轮回之路
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
    var XGSLunHui = (function (_super) {
        __extends(XGSLunHui, _super);
        function XGSLunHui() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XGSLunHui.mx_support = function () {
            return ["assets.xgs_lhzl"];
        };
        XGSLunHui.prototype.init_view = function () {
            var arr = [
                { "text": mx.Lang.xgs_lhzl[0], "v1": true, "v2": false },
                { "text": mx.Lang.xgs_lhzl[1], "v1": true, "v2": false },
                { "text": mx.Lang.xgs_lhzl[2], "v1": false, "v2": true },
                { "text": mx.Lang.xgs_lhzl[3], "v1": false, "v2": false }
            ];
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.opt_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.opt_click, this);
        };
        XGSLunHui.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HzHudongScreen.S_NAME);
        };
        XGSLunHui.prototype.opt_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var xproxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
            var id = xproxy.cur_id;
            switch (evt.itemIndex) {
                case 0:
                case 1:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_XGS_ZSTT,
                        "id": id,
                        "type": 2 - evt.itemIndex
                    });
                    break;
                case 2:
                    var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                    var c_num = dproxy.get_currency("ybao");
                    if (c_num < 20) {
                        this.show_recharge();
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": {
                                    "t": mx.MX_NETS.CS_XGS_ZSTT,
                                    "id": id,
                                    "type": 3
                                },
                                "param": mx.Lang.xgs21,
                            }
                        });
                    }
                    break;
                case 3:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HzHudongScreen.S_NAME);
                    break;
            }
        };
        XGSLunHui.prototype.show_recharge = function () {
            var a_d = {
                "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                "param": mx.Lang.a0006
            };
            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        XGSLunHui.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.opt_list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.opt_list.dataProvider = null;
        };
        XGSLunHui.S_NAME = "XGSLunHui";
        return XGSLunHui;
    }(mx.BasicView));
    mx.XGSLunHui = XGSLunHui;
    __reflect(XGSLunHui.prototype, "mx.XGSLunHui");
})(mx || (mx = {}));
//# sourceMappingURL=XGSLunHui.js.map