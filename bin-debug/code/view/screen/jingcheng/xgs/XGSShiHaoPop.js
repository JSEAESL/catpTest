/**
 *   @author hxj
 *   @date 2017.7.7
 *   @desc 相国寺 赐封谥号（前缀） 弹窗
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
    var XGSShiHaoPop = (function (_super) {
        __extends(XGSShiHaoPop, _super);
        function XGSShiHaoPop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XGSShiHaoPop.mx_support = function () {
            return ["assets.xgs_cfsh", "api.FZSHIHAO", "api.ZNSHIHAO"];
        };
        XGSShiHaoPop.prototype.init_view = function () {
            var d = this.adata; //id,name,meili,type
            this.tishi_t.textFlow = [
                { "text": mx.Lang.xgs05[0] },
                { "text": d.name, "style": { "textColor": 0xFF4B4B } },
                { "text": mx.Lang.xgs05[1] }
            ];
            //this.tishi_t.textColor = 0xFF4B4B;
            this.shihao_et.text = mx.Tools.random_shihao(d.type ? "ZNSHIHAO" : "FZSHIHAO");
            this.shihao_et.maxChars = d.type ? 4 : 5;
            this.shihao_et.stroke = 2;
            this.shihao_et.strokeColor = 0xff4b4b;
            this.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rand_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.shihao_et.addEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            this.shihao_et.addEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
            this.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        XGSShiHaoPop.prototype.start_edit = function (e) {
            this.shihao_et.textColor = 0xff0000;
            e.currentTarget.text = '';
        };
        XGSShiHaoPop.prototype.leave_edit = function (e) {
            //this.shihao_et.text = Tools.check_msg(this.shihao_et.text, "name");
            this.shihao_et.textColor = 0xffffff;
            this.shihao_et.stroke = 2;
            this.shihao_et.strokeColor = 0xff4b4b;
        };
        XGSShiHaoPop.prototype.check_str = function () {
            var _this = this;
            var view = this;
            var text = view.shihao_et.text;
            var facade = mx.ApplicationFacade.getInstance();
            var d = this.adata;
            mx.MGTool.get_str(1, text).then(function (value) {
                _this.shihao_et.text = value.str;
                if (value.mg) {
                    return;
                }
                if (value.str == "") {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs06 });
                }
                else if (mx.Tools.check_name_form(value.str, "zw")) {
                    var xproxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
                    var data = {
                        "t": mx.MX_NETS.CS_XGS_CIFENG,
                        "id": d.id,
                        "type": d.type,
                        //完整谥号 = shihao（前缀） + weifen([公主/王])，这里妃子只传前缀
                        "shihao": _this.shihao_et.text + (!d.type ? "" :
                            (Number(xproxy.get_object().sex) == 1 ? mx.Lang.hg046 : mx.Lang.jwlx1[6]))
                    };
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XGSShiHaoPop.S_NAME);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, data);
                }
            }, function () {
                _this.shihao_et.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        XGSShiHaoPop.prototype.btn_click = function (e) {
            var d = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.rand_b:
                    this.shihao_et.text = mx.Tools.random_shihao(d.type ? "ZNSHIHAO" : "FZSHIHAO");
                    break;
                case this.ok_b:
                    this.check_str();
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XGSShiHaoPop.S_NAME);
                    break;
            }
        };
        XGSShiHaoPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rand_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.shihao_et.removeEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            this.shihao_et.removeEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
            this.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        XGSShiHaoPop.S_NAME = "XGSShiHaoPop";
        return XGSShiHaoPop;
    }(mx.BasicView));
    mx.XGSShiHaoPop = XGSShiHaoPop;
    __reflect(XGSShiHaoPop.prototype, "mx.XGSShiHaoPop");
})(mx || (mx = {}));
//# sourceMappingURL=XGSShiHaoPop.js.map