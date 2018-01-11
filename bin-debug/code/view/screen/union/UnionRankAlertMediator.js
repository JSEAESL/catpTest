/**
 *   @author cy
 *   @date 2017.4.28
 *   @desc 家族排行弹窗 Mediator
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
    var UnionRankAlertMediator = (function (_super) {
        __extends(UnionRankAlertMediator, _super);
        function UnionRankAlertMediator(viewComponent) {
            var _this = _super.call(this, UnionRankAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(UnionRankAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        UnionRankAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        UnionRankAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    this.fresh_screen();
                    break;
            }
        };
        Object.defineProperty(UnionRankAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        UnionRankAlertMediator.prototype.init_view = function () {
            var view = this.view;
            var proxy = this.proxy;
            view.union_list.itemRenderer = mx.UnionRankRender;
            view.my_list.itemRenderer = mx.UnionRankRender;
            view.union_s.addEventListener(eui.UIEvent.CHANGE_END, this.check_new, this);
            var data = [{
                    "state": "s2",
                    "index": proxy.union_rank,
                    "logo": proxy.cur_huizhang,
                    "level": proxy.union_lv,
                    "name": proxy.union_name,
                    "ren": proxy.union_member,
                    "maxren": proxy.union_max,
                    "gh_id": proxy.union_id,
                    "gonggao": proxy.gonggao
                }];
            view.my_list.dataProvider = new eui.ArrayCollection(data);
            this.fresh_screen();
        };
        UnionRankAlertMediator.prototype.fresh_screen = function () {
            var view = this.view;
            var proxy = this.proxy;
            view.union_list.dataProvider = new eui.ArrayCollection(proxy.rank_list);
            ////console.log(proxy.rank_list);
            var scrollV = view.union_s.viewport.scrollV;
            view.union_list.validateNow();
            if (scrollV) {
                view.union_s.viewport.scrollV = scrollV;
                var num = Math.min(4, proxy.rank_gap);
                egret.Tween.get(view.union_s.viewport, { "loop": false }).to({ "scrollV": scrollV + num * 53 }, 400);
            }
        };
        UnionRankAlertMediator.prototype.check_new = function (data) {
            var view = this.view;
            var proxy = this.proxy;
            if (proxy.rank_flag && proxy.rank_total > proxy.rank_list.length) {
                proxy.rank_flag = false;
                proxy.rank_gap = proxy.rank_list.length;
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_UNION_RANK,
                    "page": proxy.rank_page + 1
                });
            }
        };
        UnionRankAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.union_list.dataProvider = null;
            view.union_s.removeEventListener(eui.UIEvent.CHANGE_END, this.check_new, this);
            view.my_list.dataProvider = null;
            egret.Tween.removeTweens(view.union_s.viewport);
        };
        UnionRankAlertMediator.NAME = "UnionRankAlertMediator";
        return UnionRankAlertMediator;
    }(puremvc.Mediator));
    mx.UnionRankAlertMediator = UnionRankAlertMediator;
    __reflect(UnionRankAlertMediator.prototype, "mx.UnionRankAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionRankAlertMediator.js.map