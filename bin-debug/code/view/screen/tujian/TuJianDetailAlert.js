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
    var TuJianDetailAlert = (function (_super) {
        __extends(TuJianDetailAlert, _super);
        function TuJianDetailAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuJianDetailAlert.mx_support = function () {
            return ["assets.tujian_pl"];
        };
        TuJianDetailAlert.prototype.init_view_by_type = function () {
            this.dz_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.fx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.TuJianDetailAlertMediator(this));
            this.pl_list.itemRenderer = mx.TuJianPLRenser;
            this.name_ed.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.name_ed.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            var view = this;
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var data = pproxy.target_lihui.data;
            mx.Tools.mx_grayfy(view.avatar, true);
            if (Number(data.state) == -1) {
                mx.Tools.mx_grayfy(view.avatar, false, mx.MX_BLACK_MATRIX);
            }
            if (data.id < 900) {
                view.avatar.source = mx.Tools.get_mn_res(data.id, "lh");
            }
            else {
                view.avatar.source = mx.Tools.get_zn_res(data.id, 'lh');
            }
            var js_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERODIALOGUE, "lihui_id", data.id);
            if (js_api) {
                view.jianjie_t.text = js_api.content;
            }
            this.fresh_list();
        };
        TuJianDetailAlert.prototype.fresh_list = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var arr = [];
            if (pproxy.target_lihui_comment.top) {
                for (var k in pproxy.target_lihui_comment.top) {
                    arr.push(pproxy.target_lihui_comment.top[k]);
                }
            }
            if (pproxy.target_lihui_comment.normal) {
                for (var k in pproxy.target_lihui_comment.normal) {
                    if (arr.length < 50) {
                        arr.push(pproxy.target_lihui_comment.normal[k]);
                    }
                }
            }
            this.pl_list.dataProvider = new eui.ArrayCollection(arr);
            var scrollv = this.pl_list.scrollV;
            this.pl_list.validateNow();
            if (scrollv) {
                this.pl_list.scrollV = scrollv;
            }
            this.fresh_view();
        };
        TuJianDetailAlert.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            if (Number(pproxy.target_lihui_userlike)) {
                this.dz_p.source = "ydzan_png";
                this.dz_b.set_ssres("plzan1_png");
            }
            else {
                this.dz_p.source = "dzan2_png";
                this.dz_b.set_ssres("plzan2_png");
            }
            this.plnum_t.text = "" + pproxy.target_lihui_comment_num;
            this.dznum_t.text = "" + pproxy.target_lihui_alllike;
        };
        TuJianDetailAlert.prototype.xiugai_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var data = pproxy.target_lihui;
            switch (evt.currentTarget) {
                case this.dz_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_TUJIAN_ZAN,
                        "type": data.type,
                        "avatar": data.data.id
                    });
                    break;
                case this.fx_b:
                    this.check_str();
                    break;
            }
        };
        TuJianDetailAlert.prototype.check_str = function () {
            var _this = this;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var str = this.name_ed.text;
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var data = pproxy.target_lihui;
            mx.MGTool.get_str(1, str).then(function (value) {
                _this.name_ed.text = value.str;
                if (value.mg) {
                    return;
                }
                if (value.str != "") {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_TUJIAN_PINL,
                        "type": data.type,
                        "avatar": data.data.id,
                        "content": _this.name_ed.text
                    });
                }
            }, function () {
                _this.name_ed.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        TuJianDetailAlert.prototype.init_str = function (e) {
            var view = this;
            view.name_ed.text = "";
        };
        TuJianDetailAlert.prototype.check_end = function (e) {
            var view = this;
            // let str = view.name_ed.text;
            // view.name_ed.text = Tools.check_msg(str, "name");
        };
        TuJianDetailAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.dz_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.fx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TuJianDetailAlertMediator.NAME);
            this.name_ed.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.name_ed.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
        };
        TuJianDetailAlert.S_NAME = "TuJianDetailAlert";
        return TuJianDetailAlert;
    }(mx.AlertView));
    mx.TuJianDetailAlert = TuJianDetailAlert;
    __reflect(TuJianDetailAlert.prototype, "mx.TuJianDetailAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianDetailAlert.js.map