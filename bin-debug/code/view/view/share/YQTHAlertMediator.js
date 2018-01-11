/**
 *   @author cy
 *   @date 2017.8.1
 *   @desc mediator
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
    var YQTHAlertMediator = (function (_super) {
        __extends(YQTHAlertMediator, _super);
        function YQTHAlertMediator(viewComponent) {
            var _this = _super.call(this, YQTHAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(YQTHAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        YQTHAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        YQTHAlertMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    this.fresh_view();
                    break;
            }
        };
        YQTHAlertMediator.prototype.init_view = function () {
            var view = this.view;
            view.yq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            this.fresh_view();
        };
        YQTHAlertMediator.prototype.fresh_view = function () {
            var view = this.view;
            var dProxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.YQTH, "id", dProxy.total_dang_id);
            if (api && dProxy.ybnli_cztotal >= Number(api.dangwei) && dProxy.total_dang_id <= 12) {
                view.lq_b.set_ssres("yqthlqu_png");
                mx.TweenTool.getInstance().get_tween(view.lq_b, "btnshake", true);
                if (!dProxy.ybnl_hongdian) {
                    dProxy.ybnl_hongdian = true;
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                }
            }
            else {
                view.lq_b.set_ssres("yqthlqhui_png");
                egret.Tween.removeTweens(view.lq_b);
                if (dProxy.ybnl_hongdian) {
                    dProxy.ybnl_hongdian = false;
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                }
            }
            if (!api) {
                api = mx.ApiTool.getAPINode(mx.MX_APINAME.YQTH, "id", 12);
            }
            var dang_id = Math.min(12, dProxy.total_dang_id);
            view.jindu_p.source = "thjd" + dang_id + "_png";
            view.pengyou_p.source = "th" + dang_id + "_png";
            view.mb_p.source = "zcz" + dang_id + "_png";
            view.jl_p.source = "jlyb" + dang_id + "_png";
            view.jd_p.mask = new egret.Rectangle(0, 0, 88 * dProxy.ybnli_cztotal / Number(api.dangwei), 10);
            view.jindu_t.textFlow = [
                { "text": dProxy.ybnli_cztotal + "", "style": { "textColor": 0xff4b4b } },
                { "text": "/" + Number(api.dangwei), "style": { "textColor": 0x81586e } },
            ];
            api = null;
        };
        YQTHAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.yq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            egret.Tween.removeTweens(view.lq_b);
        };
        YQTHAlertMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            var dProxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            switch (evt.currentTarget) {
                case view.yq_b:
                    if (window && window["share_xnl"]) {
                        mx.DataTool.getInstance().data_tool("SNULI_CLICK");
                        var tid = egret.setTimeout(function () {
                            if (window && window["share_xnl"]) {
                                window["share_xnl"](Main.USER_ID, 1);
                            }
                        }, this, 500); //延迟500ms，以使数据可以被统计到
                    }
                    break;
                case view.lq_b:
                    if (view.lq_b.res_name == "yqthlqhui_png") {
                        if (dProxy.total_dang_id >= 13) {
                            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.r0034 });
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.r0035 });
                        }
                        return;
                    }
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_SHARE_YAZHAYB });
                    break;
            }
        };
        YQTHAlertMediator.prototype.page_click = function (evt) {
            var view = this.view;
            var dProxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var page = dProxy.ybnli_page;
            switch (evt.currentTarget) {
                case view.sye_b:
                    page = 1;
                    break;
                case view.wye_b:
                    page = dProxy.ybnli_total;
                    break;
                case view.prev_b:
                    page = Math.max(1, page - 1);
                    break;
                case view.next_b:
                    page = Math.min(dProxy.ybnli_total, page + 1);
                    break;
            }
            if (page != dProxy.ybnli_page) {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_SHARE_YBNLI, "page": page });
            }
        };
        YQTHAlertMediator.NAME = "YQTHAlertMediator";
        return YQTHAlertMediator;
    }(puremvc.Mediator));
    mx.YQTHAlertMediator = YQTHAlertMediator;
    __reflect(YQTHAlertMediator.prototype, "mx.YQTHAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YQTHAlertMediator.js.map