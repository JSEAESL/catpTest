/**
 *   @author wf
 *   @date 2016.10.25
 *   @desc 结缘弹框Mediator
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
    var HzLyinPopMediator = (function (_super) {
        __extends(HzLyinPopMediator, _super);
        function HzLyinPopMediator(viewComponent) {
            var _this = _super.call(this, HzLyinPopMediator.NAME, viewComponent) || this;
            _this.update_list();
            return _this;
        }
        Object.defineProperty(HzLyinPopMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HzLyinPopMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UPDATE_PINLI,
                mx.MX_NOTICE.GUIDE_INFO,
            ];
        };
        HzLyinPopMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.UPDATE_PINLI:
                    this.update_list();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
            }
        };
        HzLyinPopMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "v_ly_ly"://结缘
                    var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
                    var tar = this.view.lyin_b;
                    tar.dispatchEvent(evt);
                    break;
            }
        };
        HzLyinPopMediator.prototype.update_list = function () {
            var proxy = this.facade.retrieveProxy(mx.PalaceProxy.NAME);
            var itemarr = [];
            for (var i = 0; i < proxy.curr_gift.length; i++) {
                var gift = proxy.curr_gift[i];
                itemarr.push({
                    'type': gift.type,
                    'chicun': 90,
                    'num': gift.num,
                    'di_cor': 0x815b50,
                    'id': gift.reward_id,
                    "width": 90,
                    "no_num": true,
                    "top": 92,
                    "height": 115
                });
            }
            var view = this.view;
            mx.HzLyinPop.stype = proxy.curr_gift[0].g_id;
            view.plibox.source = 'item303' + (mx.HzLyinPop.stype - 1) + '_png';
            view.price_t.text = mx.Tools.format(mx.Lang.p0050, proxy.curr_gift[0].price);
            view.giftname_t.text = proxy.curr_gift[0].name;
            view.gift_list.dataProvider = new eui.ArrayCollection(itemarr);
            var dproxy = this.facade.retrieveProxy(mx.DataProxy.NAME);
            var type = view.adata.type;
            var cor = mx.MX_WEB_CONST.WEB_HZS_COST > dproxy.get_currency("ybi") ? 0xff4b4b : 0xa47374;
            view.yinbi_g.visible = type == 1;
        };
        HzLyinPopMediator.NAME = "HzLyinPopMediator";
        return HzLyinPopMediator;
    }(puremvc.Mediator));
    mx.HzLyinPopMediator = HzLyinPopMediator;
    __reflect(HzLyinPopMediator.prototype, "mx.HzLyinPopMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HzLyinPopMediator.js.map