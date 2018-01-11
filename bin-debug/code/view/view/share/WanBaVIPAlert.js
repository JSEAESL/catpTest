/**
*   @author cy
*   @date 2017.10.2
*   @desc 玩吧vip弹窗
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
    var WanBaVIPAlert = (function (_super) {
        __extends(WanBaVIPAlert, _super);
        function WanBaVIPAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tag = 0; //1每日0特权
            return _this;
        }
        WanBaVIPAlert.mx_support = function () {
            return ["assets.wb_vip", "api.WANBAVIP"];
        };
        WanBaVIPAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.WanBaVIPAlertMediator(this));
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.now_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.tq_list.itemRenderer = mx.WanBaVIPRender;
            this.now_list.itemRenderer = mx.GNumRender;
            this.next_list.itemRenderer = mx.GNumRender;
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            if (!gproxy.user_wanba_vip_lq) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.WANBAVIP, "leixing", 1, "vip", gproxy.user_wanba_vip);
                if (api) {
                    this.tag = 1;
                    for (var i = 1; i <= Number(api.key_id); i++) {
                        if (gproxy.user_wanba_vip_goumai.indexOf(i) < 0) {
                            this.tag = 0;
                            break;
                        }
                    }
                }
            }
            this.fresh_view();
        };
        WanBaVIPAlert.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var view = this;
            view.mr_g.visible = view.tq_g.visible = false;
            view.vip_p.source = "xyxv" + gproxy.user_wanba_vip + "_png";
            switch (this.tag) {
                case 1://每日
                    view.mr_g.visible = true;
                    view.fun_b.set_ssres("xyxtejbao_png");
                    view.title_p.source = "tqmrlbao_png";
                    break;
                default://特权
                    view.tq_g.visible = true;
                    view.fun_b.set_ssres("xyxmrjli_png");
                    view.title_p.source = "tjlbbti_png";
                    break;
            }
            this.fresh_list();
        };
        WanBaVIPAlert.prototype.fresh_list = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var view = this;
            var wanbavip_max = 6;
            switch (this.tag) {
                case 1://每日
                    if (gproxy.user_wanba_vip >= wanbavip_max) {
                        view.next_g.visible = false;
                    }
                    else {
                        view.next_g.visible = true;
                        var arr2 = mx.ApiTool.getAPINodes(mx.MX_APINAME.WANBAVIP, "leixing", 2, "vip", gproxy.user_wanba_vip + 1);
                        for (var k in arr2) {
                            arr2[k].chicun = 60;
                            arr2[k].height = 80;
                            arr2[k].width = 60;
                            arr2[k].top = 64;
                            arr2[k].no_num = true;
                            arr2[k].di_cor = 0xaf8096;
                            arr2[k].id = arr2[k].item_id;
                            arr2[k].type = arr2[k].award_type;
                        }
                        view.next_list.dataProvider = new eui.ArrayCollection(arr2);
                    }
                    var arr1 = mx.ApiTool.getAPINodes(mx.MX_APINAME.WANBAVIP, "leixing", 2, "vip", gproxy.user_wanba_vip);
                    for (var k in arr1) {
                        arr1[k].chicun = 60;
                        arr1[k].height = 80;
                        arr1[k].width = 60;
                        arr1[k].top = 64;
                        arr1[k].no_num = true;
                        arr1[k].di_cor = 0xaf8096;
                        arr1[k].id = arr1[k].item_id;
                        arr1[k].type = arr1[k].award_type;
                    }
                    view.now_list.dataProvider = new eui.ArrayCollection(arr1);
                    if (gproxy.user_wanba_vip_lq) {
                        view.now_b.set_ssres("xyxylqu_png");
                    }
                    view.fun_b.set_tsres(null);
                    if (gproxy.user_wanba_vip == 0 && view.mr_g.numChildren > 1) {
                        view.mr_g.removeChild(view.now_g);
                    }
                    break;
                default://特权
                    var arr = [];
                    for (var i = 1; i <= wanbavip_max; i++) {
                        var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.WANBAVIP, "leixing", 1, "vip", i);
                        arr.push({
                            "item": apis
                        });
                    }
                    var scrollV = view.tq_list.scrollV;
                    view.tq_list.dataProvider = new eui.ArrayCollection(arr);
                    view.tq_list.validateNow();
                    view.tq_list.scrollV = scrollV;
                    if (gproxy.user_wanba_vip_lq || gproxy.user_wanba_vip <= 0) {
                        view.fun_b.set_tsres(null);
                    }
                    else {
                        view.fun_b.set_tsres("tishi_png", { "right": -10, "top": -10 });
                    }
                    break;
            }
        };
        WanBaVIPAlert.prototype.fun_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            switch (e.currentTarget) {
                case this.fun_b:
                    this.tag = 1 - this.tag;
                    this.fresh_view();
                    break;
                case this.now_b:
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.WANBAVIP, "leixing", 2, "vip", gproxy.user_wanba_vip);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_WANBA_LQVIP,
                        "key_id": api.key_id,
                    });
                    break;
            }
        };
        WanBaVIPAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.WanBaVIPAlertMediator.NAME);
            this.tq_list.dataProvider = null;
            this.now_list.dataProvider = null;
            this.next_list.dataProvider = null;
            this.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.now_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            this.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
        };
        WanBaVIPAlert.S_NAME = "WanBaVIPAlert";
        return WanBaVIPAlert;
    }(mx.AlertView));
    mx.WanBaVIPAlert = WanBaVIPAlert;
    __reflect(WanBaVIPAlert.prototype, "mx.WanBaVIPAlert");
})(mx || (mx = {}));
//# sourceMappingURL=WanBaVIPAlert.js.map