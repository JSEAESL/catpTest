/**
*   @author mx
*   @date 2015.1.3
*   @desc 养心殿妃子赐字
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
    var YXDCiZiAlert = (function (_super) {
        __extends(YXDCiZiAlert, _super);
        function YXDCiZiAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YXDCiZiAlert.mx_support = function () {
            return ["assets.palace_yxdcz", "api.CIZI"];
        };
        YXDCiZiAlert.prototype.init_view_by_type = function () {
            this.random_title();
            this.czbc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.random_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_cpop();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.YXDCiZiMediator(this));
        };
        YXDCiZiAlert.prototype.fresh_cpop = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
            var num = pproxy.res_czbc; //proxy中读取
            this.czbc.data = {
                "type": 4,
                "id": 2005,
                "need": 1,
                "num": num,
                "chicun": 90
            };
            if (num) {
                this.ok_b.touchEnabled = true;
                mx.Tools.mx_grayfy(this.ok_b, true);
            }
            else {
                this.ok_b.touchEnabled = false;
                mx.Tools.mx_grayfy(this.ok_b);
            }
        };
        YXDCiZiAlert.prototype.check_str = function () {
            var _this = this;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var str = this.cizi_et.text;
            var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
            var feizi = pproxy.get_curr_mn();
            //this.cizi_et.text = Tools.check_msg(str, "name");
            mx.MGTool.get_str(1, str).then(function (value) {
                _this.cizi_et.text = value.str;
                if (value.mg) {
                    return;
                }
                if (value.str == '') {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.st011 });
                }
                else if (mx.Tools.check_name_form(value.str)) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_YXD_PF_CIZI,
                        "id": feizi.id,
                        "content": value.str
                    });
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, YXDCiZiAlert.S_NAME);
                }
            }, function () {
                _this.cizi_et.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        YXDCiZiAlert.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
            var feizi = pproxy.get_curr_mn();
            switch (evt.currentTarget) {
                case view.czbc://购买赐字宝册
                    var a_d = {
                        "param": {
                            "item": 2005,
                        }
                    };
                    var p_d = { "name": mx.BuyAlertView.S_NAME, "param": a_d };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case view.random_b:
                    this.random_title();
                    break;
                case view.ok_b://发送赐字请求
                    this.check_str();
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, YXDCiZiAlert.S_NAME);
                    break;
            }
        };
        YXDCiZiAlert.prototype.random_title = function () {
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.CIZI);
            var c_index = Math.ceil(Math.random() * apis.length) - 1;
            this.cizi_et.text = apis[c_index];
        };
        YXDCiZiAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.czbc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.random_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.YXDCiZiMediator.NAME);
        };
        YXDCiZiAlert.S_NAME = "YXDCiZiAlert";
        return YXDCiZiAlert;
    }(mx.AlertView));
    mx.YXDCiZiAlert = YXDCiZiAlert;
    __reflect(YXDCiZiAlert.prototype, "mx.YXDCiZiAlert");
})(mx || (mx = {}));
//# sourceMappingURL=YXDCiZiAlert.js.map