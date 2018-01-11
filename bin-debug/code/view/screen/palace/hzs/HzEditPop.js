/**
 *   @author wf
 *   @date 2016.10.10
 *   @desc 皇子赐名/册封弹框 type= 1:赐名 2:册封
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
    var HzEditPop = (function (_super) {
        __extends(HzEditPop, _super);
        function HzEditPop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HzEditPop.mx_support = function () {
            return ["assets.palace_hzsuo_edit", "api.ZINVQUMING"];
        };
        HzEditPop.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_cm_sj": //随机名字
                case "v_cf_sj"://随机册封
                    tar = this.rand_b;
                    break;
                case "v_cm_qr": //确定
                case "v_cf_qr"://册封确定
                    tar = this.ok_b;
                    break;
            }
            return tar;
        };
        HzEditPop.prototype.init_view = function () {
            var view = this;
            var d = this.adata.data;
            var type = this.adata.type;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var rankname = mx.Tools.num2chinese(d.paiwei) + (d.sex == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04);
            this.isName = type == 1;
            view.biaoti.source = type == 1 ? 'hscmbti_png' : 'cfhsbti_png';
            view.name_g.visible = type == 1;
            view.cfeng_g.visible = type == 2;
            view.fhao_et.text = mx.Tools.format(mx.Lang.hzs16, '2');
            view.ming_et.text = mx.Tools.format(mx.Lang.hzs16, '3');
            if (type == 1) {
                view.xing_t.text = d.xing || '';
            }
            else {
                view.jwei_t.text = proxy.get_jwei(d);
            }
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rand_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fhao_et.addEventListener(egret.Event.CHANGE, this.check_input, this);
            view.fhao_et.addEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.fhao_et.addEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
            view.ming_et.addEventListener(egret.Event.CHANGE, this.check_input, this);
            view.ming_et.addEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.ming_et.addEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
            facade.registerMediator(new mx.HzEditPopMediator(this));
        };
        HzEditPop.prototype.start_edit = function (e) {
            e.currentTarget.size = 24;
            e.currentTarget.textColor = 0x9481C9;
            if (e.currentTarget.text == mx.Tools.format(mx.Lang.hzs16, this.isName ? '3' : '2')) {
                e.currentTarget.text = '';
            }
        };
        HzEditPop.prototype.leave_edit = function (e) {
            var view = this;
            // if (this.adata.type == 1) {
            //     view.ming_et.text = Tools.check_msg(view.ming_et.text, "name");
            // } else {
            //     view.fhao_et.text = Tools.check_msg(view.fhao_et.text, "name");
            // }
        };
        HzEditPop.prototype.check_str = function () {
            var view = this;
            var d = this.adata.data;
            var type = this.adata.type;
            var facade = mx.ApplicationFacade.getInstance();
            var txt = type == 1 ? view.ming_et : view.fhao_et;
            var str = txt.text;
            mx.MGTool.get_str(1, str).then(function (value) {
                txt.text = value.str;
                if (value.mg) {
                    return;
                }
                var check = type == 1 ? "notype" : "zw";
                if (value.str == '') {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                        "text": type == 1 ? mx.Lang.hzs21 : mx.Lang.hzs22
                    });
                    return;
                }
                else if (mx.Tools.check_name_form(value.str, check)) {
                    var cmd = type == 1 ? mx.MX_NETS.CS_HZS_NAME : mx.MX_NETS.CS_HZS_CEFENG;
                    var data = { t: cmd, id: d.id };
                    if (type == 1) {
                        data.name = view.ming_et.text;
                    }
                    else {
                        data.cefeng = view.fhao_et.text;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, data);
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HzEditPop.S_NAME);
                }
            }, function () {
                txt.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        HzEditPop.prototype.btn_click = function (e) {
            var view = this;
            var d = this.adata.data;
            var type = this.adata.type;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.rand_b:
                    var et = this.isName ? this.ming_et : this.fhao_et;
                    et.size = 24;
                    et.textColor = 0x9481C9;
                    if (type == 1) {
                        view.ming_et.text = mx.Tools.random_child_name(d.sex);
                    }
                    else {
                        view.fhao_et.text = mx.Tools.random_fenghao();
                    }
                    break;
                case view.ok_b:
                    this.check_str();
                    break;
                case view.bg_rect:
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HzEditPop.S_NAME);
                    break;
            }
        };
        HzEditPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rand_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fhao_et.removeEventListener(egret.Event.CHANGE, this.check_input, this);
            view.fhao_et.removeEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.fhao_et.removeEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
            view.ming_et.removeEventListener(egret.Event.CHANGE, this.check_input, this);
            view.ming_et.removeEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.ming_et.removeEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HzEditPopMediator.NAME);
        };
        HzEditPop.prototype.check_input = function () {
        };
        HzEditPop.S_NAME = "HzEditPop";
        return HzEditPop;
    }(mx.BasicView));
    mx.HzEditPop = HzEditPop;
    __reflect(HzEditPop.prototype, "mx.HzEditPop");
})(mx || (mx = {}));
//# sourceMappingURL=HzEditPop.js.map