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
 * mx
 * 2016/08/21
 */
var mx;
(function (mx) {
    var TopInfoMediator = (function (_super) {
        __extends(TopInfoMediator, _super);
        function TopInfoMediator(viewComponent) {
            var _this = _super.call(this, TopInfoMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(TopInfoMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TopInfoMediator.prototype.onRemove = function () {
            var view = this.view;
            view.avatar_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_yb_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_jb_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_tl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_zj_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        TopInfoMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CURRENCY_CHANGED,
                mx.MX_NOTICE.FRESH_VIP,
                mx.MX_NOTICE.FRESH_AVATAR,
                mx.MX_NOTICE.FRESH_TIME
            ];
        };
        TopInfoMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    var ntype = notification.getType();
                    this.set_currency_text(ntype);
                    break;
                case mx.MX_NOTICE.FRESH_AVATAR:
                    this.fresh_avatar();
                    break;
                case mx.MX_NOTICE.FRESH_VIP:
                    this.fresh_vip();
                    break;
                case mx.MX_NOTICE.FRESH_TIME:
                    if (notification.getType() == "avatar") {
                        this.check_avatar(data);
                    }
                    break;
                default:
                    break;
            }
        };
        TopInfoMediator.prototype.set_currency_text = function (type) {
            var view = this.view;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (type) {
                case "ybao"://元宝
                    view.yuanbao_t.text = mx.Tools.num2str(dproxy.get_currency("ybao"));
                    break;
                case "tili"://体力
                    view.tili_t.text = dproxy.get_currency("tili") + "/" + (60 + gProxy.user_lv);
                    break;
                case "ybi":
                    view.yinbi_t.text = mx.Tools.num2str(dproxy.get_currency("ybi"));
                    break;
                case "uexp":
                    var ulv = gProxy.user_lv || 1;
                    view.lv_t.text = "" + ulv;
                    var now_exp = dproxy.get_currency("uexp");
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, "id", ulv);
                    var kbar = (now_exp - api.Sum + api.Exp) / api.Exp;
                    var shape = new egret.Shape();
                    shape.graphics.beginFill(0xffffff);
                    shape.graphics.drawArc(0 + 74, 0 + 74, 74, 130 / 180 * Math.PI, (130 / 180 - (kbar * 135) / 180) * Math.PI, true);
                    shape.graphics.lineTo(0 + 74, 0 + 74);
                    shape.graphics.endFill();
                    view.avatar_g.addChild(shape);
                    view.exp_p.mask = shape;
                    break;
                case "zjb":
                    var hproxy = (this.facade.retrieveProxy(mx.HeiShiProxy.NAME));
                    view.zjb_t.text = mx.Tools.num2str(hproxy.cur_hsb);
                default:
                    break;
            }
        };
        TopInfoMediator.prototype.fresh_vip = function () {
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            this.view.vip_t.text = gProxy.user_vip + "";
        };
        TopInfoMediator.prototype.fresh_avatar = function () {
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            this.view.avatar_b.source = "tx78_" + gProxy.user_avatar + "_png";
        };
        //特殊头像检测
        TopInfoMediator.prototype.check_avatar = function (t) {
            var view = this.view;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            view.touxiang_t.text = mx.Lang[gproxy.user_avatar];
            view.avatime_g.visible = t >= 0;
            view.avatime_t.text = mx.Tools.format_second(t, true);
        };
        TopInfoMediator.prototype.init_view = function () {
            var view = this.view;
            this.set_currency_text("ybao");
            this.set_currency_text("ybi");
            this.set_currency_text("tili");
            this.set_currency_text("uexp");
            this.set_currency_text("zjb");
            view.avatar_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_yb_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_jb_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_tl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_zj_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            view.xianpin_t.text = mx.Lang.tm017;
            if (gProxy.user_xlv) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TAIMIAO, "id", gProxy.user_xlv);
                view.xianpin_t.text = api.name;
                api = null;
            }
            view.vip_t.text = gProxy.user_vip + "";
            view.name_t.text = "" + (gProxy.user_name || "");
            //Tools.url_image("https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=db24276840fbfbedc8543e2d19999c53/8718367adab44aedaff808b3b81c8701a18bfb37.jpg",{"view" : this.view.avatar_b});
            //
            view.avatar_b.source = "tx78_" + gProxy.user_avatar + "_png";
        };
        TopInfoMediator.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this.view;
            switch (evt.currentTarget) {
                case view.avatar_b://用户信息
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": Main.USER_ID,
                    });
                    break;
                case view.add_yb_b://购买元宝
                    this.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                    break;
                case view.add_jb_b://点金手
                    this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "ybi");
                    break;
                case view.add_tl_b://购买体力
                    this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "tili");
                    break;
                case view.add_zj_b://购买紫晶币(充值)
                    this.facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
                default:
                    break;
            }
        };
        TopInfoMediator.NAME = "TopInfoMediator";
        return TopInfoMediator;
    }(puremvc.Mediator));
    mx.TopInfoMediator = TopInfoMediator;
    __reflect(TopInfoMediator.prototype, "mx.TopInfoMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TopInfoMediator.js.map