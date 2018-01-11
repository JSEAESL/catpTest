/**
 *   @author mx wf
 *   @date 2017.1.5
 *   @desc 掠夺搜索弹窗
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
    var LDSearchAlert = (function (_super) {
        __extends(LDSearchAlert, _super);
        function LDSearchAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDSearchAlert.mx_support = function () {
            return ["assets.ldssalert"];
        };
        LDSearchAlert.prototype.init_view_by_type = function () {
            var view = this;
            view.name_et.text = mx.Lang.ld025;
            view.user_list.itemRenderer = mx.LDUserRender;
            view.close_b.set_ssres("tyclose_png");
            view.name_et.addEventListener(egret.TouchEvent.FOCUS_IN, this.enter_input, this);
            view.name_et.addEventListener(egret.TouchEvent.FOCUS_OUT, this.out_input, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.LDSearchAlertMediator(this));
            this.fresh_page();
        };
        LDSearchAlert.prototype.check_str = function () {
            var _this = this;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var str = this.name_et.text;
            mx.MGTool.get_str(1, str).then(function (value) {
                _this.name_et.text = value.str;
                if (value.mg) {
                    return;
                }
                if (value.str != "") {
                    _this.ss_str = view.name_et.text;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_LUEDUO_SSDR,
                        'name': view.name_et.text,
                        'page': 1
                    });
                }
            }, function () {
                _this.name_et.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
            //this.name_et.text = Tools.check_msg(str, "msg");
        };
        LDSearchAlert.prototype.enter_input = function (e) {
            var view = this;
            if (view.name_et.text == mx.Lang.ld025) {
                view.name_et.text = '';
            }
        };
        LDSearchAlert.prototype.out_input = function (e) {
            var view = this;
            if (view.name_et.text == '') {
                view.name_et.text = mx.Lang.ld025;
            }
        };
        Object.defineProperty(LDSearchAlert.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.LueDuoProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        LDSearchAlert.prototype.set_page = function (e) {
            var view = this;
            var newpage;
            var proxy = this.proxy;
            var cd = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            var page = Number(cd.page);
            var tot = Math.ceil(Number(cd.tot) / 3);
            switch (e.currentTarget) {
                case view.sye_b: //首页
                case view.prev_b://前一页
                    var sye = e.currentTarget == view.sye_b;
                    if (page > 1) {
                        newpage = sye ? 1 : page - 1;
                    }
                    break;
                case view.wye_b: //尾页
                case view.next_b://后一页
                    var wye = e.currentTarget == view.wye_b;
                    if (page < tot) {
                        newpage = wye ? tot : page + 1;
                    }
                    break;
            }
            if (proxy.ss_data[newpage]) {
                proxy.ss_page = newpage;
                this.fresh_pop();
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    't': mx.MX_NETS.CS_LUEDUO_SSDR,
                    "name": this.ss_str,
                    'page': newpage
                });
            }
        };
        LDSearchAlert.prototype.fresh_page = function () {
            var view = this;
            var cd = this.adata;
            view.page_g.visible = cd && cd.tot > 0 ? true : false;
            if (cd && cd.tot > 0) {
                view.page_t.text = cd.page + '/' + Math.ceil(cd.tot / 3);
            }
        };
        LDSearchAlert.prototype.fresh_pop = function () {
            var proxy = this.proxy;
            this.adata = { 'page': proxy.ss_page, 'tot': proxy.ss_tot };
            this.user_list.dataProvider = new eui.ArrayCollection(proxy.ss_data[this.adata.page]);
            this.fresh_page();
        };
        LDSearchAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.user_list.dataProvider = null;
            view.name_et.removeEventListener(egret.TouchEvent.FOCUS_IN, this.enter_input, this);
            view.name_et.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.out_input, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.LDSearchAlertMediator.NAME);
        };
        LDSearchAlert.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.ok_b://搜索
                    if (view.name_et.text == '' || view.name_et.text == mx.Lang.ld024) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld024 });
                        break;
                    }
                    if (this.ss_str == view.name_et.text) {
                        break;
                    }
                    this.check_str();
                    break;
                default:
                    this.proxy.ss_tot = 0;
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, LDSearchAlert.S_NAME);
                    break;
            }
        };
        LDSearchAlert.S_NAME = "LDSearchAlert";
        return LDSearchAlert;
    }(mx.AlertView));
    mx.LDSearchAlert = LDSearchAlert;
    __reflect(LDSearchAlert.prototype, "mx.LDSearchAlert");
})(mx || (mx = {}));
//# sourceMappingURL=LDSearchAlert.js.map