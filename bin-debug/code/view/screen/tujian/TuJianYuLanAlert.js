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
 * @cy/2017.11.13
 *  图鉴封面
 */
var mx;
(function (mx) {
    var TuJianYuLanAlert = (function (_super) {
        __extends(TuJianYuLanAlert, _super);
        function TuJianYuLanAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuJianYuLanAlert.mx_support = function () {
            return ["assets.tujian_yl", "api.HERODIALOGUE"];
        };
        TuJianYuLanAlert.prototype.init_view_by_type = function () {
            this.pl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.fx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.TuJianYuLanAlertMediator(this));
            var view = this;
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var data = pproxy.target_lihui.data;
            this.target_lihui = pproxy.target_lihui;
            mx.Tools.mx_grayfy(view.avatar, true);
            if (Number(data.state) == -1) {
                mx.Tools.mx_grayfy(view.avatar, false, mx.MX_BLACK_MATRIX);
            }
            if (data.id < 900) {
                var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", data.id);
                var whq = api2 ? api2.wenhua : 1;
                view.avatar.source = mx.Tools.get_mn_res(data.id, "lh");
                this.bg_p.source = mx.Tools.get_bb_res("fzbg", null, whq * 10000);
                this.title_p.source = "tjbtmr" + whq + "_png";
            }
            else {
                view.avatar.source = mx.Tools.get_zn_res(data.id, 'lh');
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.LIHUI, "lihui", data.id);
                if (!api) {
                    api = { "meili": 3, "wenhua": 1 };
                }
                this.title_p.source = this.target_lihui.type == 1 ? "tjbths" + api.wenhua + "_png" : "tjbtmr" + api.wenhua + "_png";
                view.bg_p.source = mx.Tools.get_bb_res("znbg", 2, data.id, Number(api.meili) <= 2 ? 80 : 100);
            }
            var js_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERODIALOGUE, "lihui_id", data.id);
            if (js_api) {
                view.js_t.text = js_api.content;
            }
            if (!(window && window["share_base64_image"])) {
                this.pl_b.horizontalCenter = 0;
                this.fx_b.visible = false;
            }
            this.fresh_view();
        };
        TuJianYuLanAlert.prototype.fresh_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var data = pproxy.target_lihui.data;
            var zan_info = pproxy.target_lihui.type == 1 ? pproxy.zn_like : pproxy.fz_like;
            var zan_num = zan_info[data.id] || 0;
            view.zannum_t.text = Number(zan_num) > 999 ? "999+" : "" + zan_num;
        };
        TuJianYuLanAlert.prototype.xiugai_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.pl_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.TuJianDetailAlert.S_NAME });
                    break;
                case this.fx_b:
                    if (Number(this.target_lihui.data.state) == -1) {
                        var str = this.target_lihui.type == 1 ? mx.Lang.zn : mx.Lang.fz;
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.tj00001, str) });
                    }
                    else {
                        if (window && window["share_base64_image"]) {
                            window["share_base64_image"](mx.Tools.view2base64(this.avatar_g));
                        }
                    }
                    break;
            }
        };
        TuJianYuLanAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.pl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.fx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TuJianYuLanAlertMediator.NAME);
        };
        TuJianYuLanAlert.S_NAME = "TuJianYuLanAlert";
        TuJianYuLanAlert.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return TuJianYuLanAlert;
    }(mx.AlertView));
    mx.TuJianYuLanAlert = TuJianYuLanAlert;
    __reflect(TuJianYuLanAlert.prototype, "mx.TuJianYuLanAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianYuLanAlert.js.map