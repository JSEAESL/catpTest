/**
 *   @author cy
 *   @date 2017.4.26
 *   @desc 家族捐献 Mediator
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
    var UnionJuanXianScreenMediator = (function (_super) {
        __extends(UnionJuanXianScreenMediator, _super);
        function UnionJuanXianScreenMediator(viewComponent) {
            var _this = _super.call(this, UnionJuanXianScreenMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(UnionJuanXianScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        UnionJuanXianScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CSCREEN,
                mx.MX_NOTICE.CURRENCY_CHANGED,
            ];
        };
        UnionJuanXianScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    this.fresh_screen();
                    break;
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    this.fresh_currency();
                    break;
            }
        };
        Object.defineProperty(UnionJuanXianScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        UnionJuanXianScreenMediator.prototype.init_view = function () {
            var view = this.view;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_yb_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_ybi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.juanxian_list.itemRenderer = mx.UnionJuanXianRender;
            this.fresh_screen();
        };
        UnionJuanXianScreenMediator.prototype.fresh_screen = function () {
            var view = this.view;
            var proxy = this.proxy;
            var arr = [];
            for (var i = 1; i <= 3; i++) {
                arr.push({
                    "id": i,
                    "now_lv": proxy["lv" + i],
                    "now_exp": proxy["exp" + i],
                });
            }
            view.juanxian_list.dataProvider = new eui.ArrayCollection(arr);
            this.fresh_currency();
        };
        UnionJuanXianScreenMediator.prototype.fresh_currency = function () {
            var view = this.view;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            view.yuanbao_t.text = mx.Tools.num2str(dproxy.get_currency("ybao"));
            view.yinbi_t.text = mx.Tools.num2str(dproxy.get_currency("ybi"));
            view.jiazubi_t.text = this.proxy.user_jiazubi + "";
        };
        UnionJuanXianScreenMediator.prototype.btn_click = function (e) {
            var view = this.view;
            switch (e.currentTarget) {
                case view.back_b:
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_INIT,
                    });
                    break;
                case view.add_yb_b:
                    this.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                    break;
                case view.add_ybi_b:
                    this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "ybi");
                    break;
            }
        };
        UnionJuanXianScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_yb_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_ybi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.juanxian_list.dataProvider = null;
        };
        UnionJuanXianScreenMediator.NAME = "UnionJuanXianScreenMediator";
        return UnionJuanXianScreenMediator;
    }(puremvc.Mediator));
    mx.UnionJuanXianScreenMediator = UnionJuanXianScreenMediator;
    __reflect(UnionJuanXianScreenMediator.prototype, "mx.UnionJuanXianScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionJuanXianScreenMediator.js.map