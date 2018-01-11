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
 * @author cy
 * @date 2017.10.16
 * 上龙国xxiu
 */
var mx;
(function (mx) {
    var ActyXXGXXiuScreen = (function (_super) {
        __extends(ActyXXGXXiuScreen, _super);
        function ActyXXGXXiuScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyXXGXXiuScreen.mx_support = function () {
            return ["assets.acty_xxg_xxiu"];
        };
        ActyXXGXXiuScreen.prototype.init_view_by_type = function () {
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            this.qb_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qb_click, this);
            this.zn_list.itemRenderer = mx.ActySLGXXiuRender;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            facade.registerMediator(new mx.ActyXXGXXiuScreenMediator(this));
            var res1, res2;
            switch (aproxy.xxg_xxiu_tab) {
                case 1://初选
                    res1 = "cxbti_png";
                    res2 = "cxbj_jpg";
                    this.avg_type = "cxqb";
                    break;
                case 2://复选
                    res1 = "fxbti_png";
                    res2 = "fxbj_jpg";
                    this.avg_type = "fxqb";
                    break;
                case 3://殿选
                    res1 = "dxbti_png";
                    res2 = "s713_jpg";
                    this.avg_type = "dxqb";
                    break;
            }
            this.title_p.source = res1;
            this.di_p.source = res2;
            this.fresh_view();
        };
        ActyXXGXXiuScreen.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var arr = aproxy.xxg_xxiu_info.concat();
            arr.reverse();
            arr = arr.sort(function (a, b) {
                return Number(a.result) - Number(b.result);
            });
            if (aproxy.xxg_xxiu_tab == 1) {
                arr.unshift({ "xwyd": true });
            }
            var scrollv = this.zn_list.scrollV;
            this.zn_list.dataProvider = new eui.ArrayCollection(arr);
            this.zn_list.validateNow();
            this.zn_list.scrollV = scrollv;
            if (arr.length == 0) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HouGongSJView.S_NAME, "param": { "shijian": { 'msg_id': 4011 + aproxy.xxg_xxiu_tab } }
                });
            }
        };
        ActyXXGXXiuScreen.prototype.back_click = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
        };
        ActyXXGXXiuScreen.prototype.qb_click = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": {
                    "type": this.avg_type,
                }
            });
        };
        ActyXXGXXiuScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            this.qb_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.qb_click, this);
            this.zn_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.ActyXXGXXiuScreenMediator.NAME);
        };
        ActyXXGXXiuScreen.S_NAME = "ActyXXGXXiuScreen";
        return ActyXXGXXiuScreen;
    }(mx.AlertView));
    mx.ActyXXGXXiuScreen = ActyXXGXXiuScreen;
    __reflect(ActyXXGXXiuScreen.prototype, "mx.ActyXXGXXiuScreen");
})(mx || (mx = {}));
//# sourceMappingURL=ActyXXGXXiuScreen.js.map