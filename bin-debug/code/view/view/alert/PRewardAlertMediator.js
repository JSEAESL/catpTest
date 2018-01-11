/**
 *   @author cy
 *   @date 2017.3.22
 *   @desc 奖励 Mediator
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
    var PRewardAlertMediator = (function (_super) {
        __extends(PRewardAlertMediator, _super);
        function PRewardAlertMediator(viewComponent) {
            var _this = _super.call(this, PRewardAlertMediator.NAME, viewComponent) || this;
            _this.fresh_pop();
            return _this;
        }
        Object.defineProperty(PRewardAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        PRewardAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GET_AWARD,
            ];
        };
        PRewardAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.GET_AWARD:
                    this.fresh_pop();
                    break;
            }
        };
        PRewardAlertMediator.prototype.fresh_pop = function () {
            var view = this.view;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var arr = [];
            var items = view.adata || dproxy.cur_reward;
            dproxy.cur_reward = [];
            if (items && items.length) {
                for (var k in items) {
                    var c_d = items[k];
                    var cd = mx.Tools.get_item_info(c_d.type, c_d.id);
                    if (cd) {
                        arr.push({
                            "type": c_d.type,
                            "id": c_d.id,
                            "num": c_d.shuliang || c_d.num || 0,
                            "bg": Number(c_d.type) == 4 ? "" : "itembg_png",
                            "chicun": 90,
                            "str": cd.name || cd.hero_name,
                            "no_num": true,
                            "di_size": 19,
                            "top": 97,
                            "di_cor": 0x7e747b,
                        });
                    }
                }
                view.item_list.dataProvider = new eui.ArrayCollection(arr);
                var layout = view.item_list.layout;
                layout.requestedColumnCount = Math.min(4, items.length);
                var hang = Math.ceil(items.length / 4);
                view.reward_g.height = view.item_list.height * hang + 218;
            }
            else {
                var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                if (gproxy.prev_mail) {
                    gproxy.prev_mail == 1 ? this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MailView.S_NAME }) : this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_MAIL_INFO });
                    gproxy.prev_mail = 0;
                }
                gproxy.check_new();
            }
        };
        PRewardAlertMediator.NAME = "PRewardAlertMediator";
        return PRewardAlertMediator;
    }(puremvc.Mediator));
    mx.PRewardAlertMediator = PRewardAlertMediator;
    __reflect(PRewardAlertMediator.prototype, "mx.PRewardAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=PRewardAlertMediator.js.map