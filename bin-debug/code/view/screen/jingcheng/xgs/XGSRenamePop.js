/**
 *   @author hxj
 *   @date 2017.8.24
 *   @desc 相国寺 改名 弹窗
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
    var XGSRenamePop = (function (_super) {
        __extends(XGSRenamePop, _super);
        function XGSRenamePop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XGSRenamePop.mx_support = function () {
            return ["assets.xgs_rename", "api.PNAME"];
        };
        Object.defineProperty(XGSRenamePop.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XGSProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XGSRenamePop.prototype.init_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            this.cyming_t.text = gproxy.user_name;
            this.name_et.textFlow = [{
                    "text": mx.Tools.format(mx.Lang.hzs16, '7'),
                    "style": {
                        "textColor": 0xBEB0E2,
                        "size": 28
                    }
                }];
            this.item_num.text = "" + this.proxy.gai_num;
            this.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.cyming_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.name_et.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rand_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (mx.MX_COMMON.IN_GUIDE) {
                this.item_p.visible = this.item_num.visible = false;
            }
        };
        XGSRenamePop.prototype.start_edit = function (e) {
            this.name_et.textColor = 0xFF4B4B;
            this.name_et.text = '';
            this.name_et.bold = true;
        };
        XGSRenamePop.prototype.leave_edit = function (e) {
            if (this.name_et.text == '') {
                this.name_et.textFlow = [{
                        "text": mx.Tools.format(mx.Lang.hzs16, '7'),
                        "style": {
                            "textColor": 0xC1B2B2,
                            "size": 28,
                            "bold": true,
                        }
                    }];
                this.name_et.invalidateSize();
            }
            // } else {
            //     this.name_et.text = Tools.check_msg(this.name_et.text, "name");
            // }
        };
        XGSRenamePop.prototype.check_str = function () {
            var _this = this;
            var view = this;
            var text = view.name_et.text;
            var facade = mx.ApplicationFacade.getInstance();
            mx.MGTool.get_str(1, text).then(function (value) {
                _this.name_et.text = value.str;
                if (value.mg) {
                    return;
                }
                if (value.str == "" || value.str == mx.Tools.format(mx.Lang.hzs16, '7')) {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.st011 });
                }
                else if (mx.Tools.check_name_form(value.str)) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_XGS_RENAME,
                        "name": value.str,
                        "free": mx.MX_COMMON.IN_GUIDE ? 1 : 0,
                    });
                }
            }, function () {
                _this.name_et.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        XGSRenamePop.prototype.btn_click = function (e) {
            var d = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.cyming_b:
                    if (this.proxy.old_name) {
                        var point = e.currentTarget.parent.localToGlobal(e.currentTarget.x, e.currentTarget.y);
                        facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                            "x": point.x,
                            "y": point.y,
                            "w": 58,
                            "h": 29,
                            "initial_name": this.proxy.initial_name,
                            "old_name": this.proxy.old_name,
                            "type": "oldName"
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs22 });
                    }
                    break;
                case this.rand_b:
                    this.name_et.textFlow = [{
                            "text": mx.Tools.random_name(),
                            "style": {
                                "textColor": 0xFF4B4B,
                                "size": 28,
                                "bold": true,
                            }
                        }];
                    break;
                case this.ok_b:
                    this.check_str();
                    break;
                case this.name_et:
                    this.start_edit();
                    break;
                case this.close_b:
                case this.bg_rect:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XGSRenamePop.S_NAME);
                    if (mx.MX_COMMON.IN_GUIDE) {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, { "sname": mx.MainScreen.S_NAME });
                    }
                    break;
                case this:
                    this.leave_edit();
                    break;
            }
            e.stopPropagation();
        };
        XGSRenamePop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.cyming_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.name_et.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rand_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        XGSRenamePop.S_NAME = "XGSRenamePop";
        return XGSRenamePop;
    }(mx.BasicView));
    mx.XGSRenamePop = XGSRenamePop;
    __reflect(XGSRenamePop.prototype, "mx.XGSRenamePop");
})(mx || (mx = {}));
//# sourceMappingURL=XGSRenamePop.js.map