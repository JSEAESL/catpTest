/**
 @author cy
 *   @date 2017.8.22
 *   @desc 人脸融合
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
    var RenLianAlertMediator = (function (_super) {
        __extends(RenLianAlertMediator, _super);
        function RenLianAlertMediator(viewComponent) {
            var _this = _super.call(this, RenLianAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(RenLianAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        RenLianAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.huanyuan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.queren_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xuanze_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.more_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        RenLianAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.RENLIANRONGHE,
            ];
        };
        RenLianAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    if (data) {
                        this.lihui = data;
                    }
                    this.fresh_view();
                    break;
                case mx.MX_NOTICE.RENLIANRONGHE:
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    this.lihui = pproxy.temp_ronghe;
                    this.fresh_view();
                    break;
            }
        };
        RenLianAlertMediator.prototype.init_view = function () {
            var view = this.view;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.huanyuan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.queren_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xuanze_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.more_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var fz_data = view.adata;
            var temp = Number(fz_data.sex) == 1 ? 7 : 6;
            this.lihui = !fz_data.model_id || fz_data.model_id == "" ? pproxy.renlian_muban[temp].muban : fz_data.model_id;
            var source = Number(fz_data.sex) == 1 ? "gdlhnv_png" : "gdlhui_png";
            view.more_b.set_ssres(source);
            this.fresh_view();
        };
        RenLianAlertMediator.prototype.fresh_view = function () {
            var view = this.view;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.lihui = String(this.lihui);
            if (this.lihui.indexOf("http") > -1) {
                mx.Tools.url_image(this.lihui, { "view": view.avatar });
                view.fx_b.visible = true;
            }
            else {
                view.fx_b.visible = false;
                var muban = pproxy.renlian_muban;
                var c_m = void 0;
                for (var k in muban) {
                    c_m = muban[k];
                    if (c_m.muban == this.lihui) {
                        break;
                    }
                }
                ;
                pproxy.muban_ronghe = this.lihui;
                this.lihui = "zn" + c_m.lihui + "_png";
                view.avatar.source = this.lihui;
            }
        };
        RenLianAlertMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (evt.currentTarget) {
                case view.back_b:
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.RenLianAlert.S_NAME);
                    break;
                case view.huanyuan_b:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_RENLIAN_REVERT,
                        "mid": view.adata.mid,
                    });
                    break;
                case view.queren_b:
                    if (this.lihui.indexOf("http") > -1) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_RENLIAN_RONGHE,
                            "mid": view.adata.mid,
                            "lihui": this.lihui,
                            "model_id": pproxy.muban_ronghe
                        });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hg103 });
                    }
                    break;
                case view.xuanze_b:
                    if (window && window["check_local_images"]) {
                        window["check_local_images"]();
                    }
                    break;
                case view.more_b:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.RenLianSelectAlert.S_NAME, "param": view.adata.sex });
                    break;
                case view.fx_b:
                    var str = void 0;
                    var muban = pproxy.renlian_muban;
                    for (var k in muban) {
                        if (muban[k].muban == pproxy.muban_ronghe) {
                            str = muban[k].fx;
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FACE_MERGES,
                        "rsp_img_type": "base64",
                        "model_id": str,
                        "img_data": pproxy.base64_image,
                        "alpha_blend": pproxy.alpha_blend || 0,
                        "alpha_position": pproxy.alpha_position || 0,
                    });
                    break;
            }
        };
        RenLianAlertMediator.NAME = "RenLianAlertMediator";
        return RenLianAlertMediator;
    }(puremvc.Mediator));
    mx.RenLianAlertMediator = RenLianAlertMediator;
    __reflect(RenLianAlertMediator.prototype, "mx.RenLianAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=RenLianAlertMediator.js.map