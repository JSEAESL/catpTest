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
 * wzt、mx
 */
var mx;
(function (mx) {
    var MyInfoMediator = (function (_super) {
        __extends(MyInfoMediator, _super);
        function MyInfoMediator(viewComponent) {
            var _this = _super.call(this, MyInfoMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(MyInfoMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        MyInfoMediator.prototype.onRemove = function () {
            var view = this.view;
            view.gtxiang_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.vip_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        MyInfoMediator.prototype.init_view = function () {
            var view = this.view;
            view.gtxiang_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.vip_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.set_tx();
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var data = gProxy.info;
            view.lv_t.text = mx.Tools.format(mx.Lang.bh001, data.level);
            var uexp = data.exp;
            if (data.level > 1) {
                var api3 = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, 'id', data.level - 1);
                uexp = data.exp - Number(api3.Sum);
                api3 = null;
            }
            var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, 'id', data.level);
            var current_exp = api2.Exp;
            api2 = null;
            view.pro_t.text = uexp + "/" + current_exp;
            view.exp_bar.value = uexp / current_exp * 100;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TAIMIAO, "id", data.xian_level);
            var xp = api ? api.name : mx.Lang.tm017;
            api = null;
            // view.xianpin_t.text = xp;
            view.vip_t.text = data.vip;
            view.huanghou_t.text = data.fenghou || mx.Lang.swkf;
            view.union_t.text = data.gh_name || mx.Lang.jz216;
            view.union_t.textColor = data.gh_name ? 0xa2788d : 0x9e9e9d;
        };
        MyInfoMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NETS.SC_QIANMING,
                mx.MX_NOTICE.FRESH_AVATAR,
            ];
        };
        MyInfoMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var str;
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NETS.SC_QIANMING:
                    switch (data.state) {
                        case 0:
                            str = mx.Lang.err01;
                            break;
                        case 2:
                            str = mx.Lang.u0006;
                            var p_d = {
                                "name": mx.AlertView.S_NAME,
                                "param": { "param": str }
                            };
                            this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                            break;
                        default:
                            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                            gProxy.info.qianming = data.qianming;
                            this.view.set_qianming();
                            break;
                    }
                    break;
                case mx.MX_NOTICE.FRESH_AVATAR:
                    this.set_tx();
                    break;
            }
        };
        MyInfoMediator.prototype.set_tx = function () {
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var source = "tx78_" + gProxy.user_avatar + "_png";
            this.view.tx_b.set_ssres(source);
        };
        MyInfoMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (evt.currentTarget) {
                case view.gtxiang_b: //更改头像
                case view.tx_b://头像
                    // this.sendNotification(MX_NOTICE.CS_GET_DATA, {
                    //     "t" : MX_NETS.CS_GET_AVATAR
                    // });
                    break;
                case view.vip_b://VIP
                    gProxy.vip_data = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            "t": mx.MX_NETS.CS_PLAYER_INFO,
                            "other_id": Main.USER_ID,
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_VIP_LIBAOSTATE });
                    break;
                default:
                    break;
            }
        };
        MyInfoMediator.NAME = "MyInfoMediator";
        return MyInfoMediator;
    }(puremvc.Mediator));
    mx.MyInfoMediator = MyInfoMediator;
    __reflect(MyInfoMediator.prototype, "mx.MyInfoMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=MyInfoMediator.js.map