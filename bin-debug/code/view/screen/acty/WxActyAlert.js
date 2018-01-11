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
 * @author wxw qianjun
 * @date 2017.11.8
 * 活动领取奖励弹窗
 */
var mx;
(function (mx) {
    var WxActyAlert = (function (_super) {
        __extends(WxActyAlert, _super);
        function WxActyAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WxActyAlert.mx_support = function () {
            return ["assets.wxacty_alert", "data.2824"];
        };
        WxActyAlert.prototype.set_scale = function (s) {
            this.scaleX = this.scaleY = s;
        };
        Object.defineProperty(WxActyAlert.prototype, "proxy", {
            get: function () {
                return mx.ApplicationFacade.getInstance().retrieveProxy(mx.ActyProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        WxActyAlert.prototype.init_view_by_type = function () {
            this.acty_list.itemRenderer = mx.WxActyAlertRender;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.WxActyAlertMediator(this));
            var type = this.adata.type;
            // switch (type) {
            //     case 997://永久累充
            //         facade.sendNotification(MX_NOTICE.UPDATE_ACTY);
            //         return;
            // }
            // facade.sendNotification(MX_NOTICE.CS_GET_DATA, {
            //     "t": MX_NETS.CS_ACTY_DATA,
            //     "key_id": type - 1
            // });
            // if ((type == 1 || typeof this.proxy.acty_list[type] != 'undefined') && !this.proxy.target_acty) {
            //     facade.sendNotification(MX_NOTICE.UPDATE_ACTY, type);
            // } else {
            //     facade.sendNotification(MX_NOTICE.CS_GET_DATA, {
            //         "t": MX_NETS.CS_ACTY_DATA,
            //         "key_id": type - 1
            //     });
            // }
            this.fresh_list();
        };
        WxActyAlert.prototype.fresh_list = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = this.proxy;
            var type = this.adata.type;
            var list = this.proxy.acty_list[type];
            var oldv = this.acty_list.scrollV;
            view.acty_list.dataProvider = new eui.ArrayCollection(list);
            this.acty_list.validateNow();
            this.acty_list.scrollV = oldv;
        };
        WxActyAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.acty_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.WxActyAlertMediator.NAME);
        };
        WxActyAlert.S_NAME = "WxActyAlert";
        return WxActyAlert;
    }(mx.AlertView));
    mx.WxActyAlert = WxActyAlert;
    __reflect(WxActyAlert.prototype, "mx.WxActyAlert");
})(mx || (mx = {}));
//# sourceMappingURL=WxActyAlert.js.map