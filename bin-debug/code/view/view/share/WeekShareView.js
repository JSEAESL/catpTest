/**
 *   @author qianjun
 *   @date 2017.2.22
 *   @desc 周分享
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
    var WeekShareView = (function (_super) {
        __extends(WeekShareView, _super);
        function WeekShareView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WeekShareView.mx_support = function () {
            return ["assets.week_share", "api.FXAWARD", "api.EQUIP"];
        };
        /*--------------组件---------------*/
        WeekShareView.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = facade.retrieveProxy(mx.GameProxy.NAME);
            //是否分享
            var have_share = proxy.sweek_cb;
            view.share_b.set_ssres(have_share ? "zfxlqjli_png" : "zfxljfxiang_png");
            view.share_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            //物品奖励
            var awards = mx.ApiTool.getAPI(mx.MX_APINAME.FXAWARD);
            var arr = [];
            for (var i in awards) {
                var unit = awards[i];
                arr.push({
                    "type": unit.type,
                    "id": unit.item_id,
                    "num": unit.num,
                    "di": true,
                    "chicun": 80
                });
                var item = void 0;
                if (Number(unit.type == 1)) {
                    item = { "name": mx.Lang.ybi };
                }
                else if (Number(unit.type == 2)) {
                    item = { "name": mx.Lang.ybao };
                }
                else {
                    item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', unit.item_id);
                }
                this["name_t" + i].text = item.name;
            }
            view.item_list.itemRenderer = mx.GenTipRender;
            view.item_list.dataProvider = new eui.ArrayCollection(arr);
            mx.DataTool.getInstance().data_tool("SWEEK_OPEN");
        };
        WeekShareView.prototype.share = function () {
            var str = this.share_b.res_name;
            switch (str) {
                case "zfxlqjli_png"://领奖励
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_SHARE_WEEK });
                    break;
                case "zfxljfxiang_png"://去分享
                    mx.DataTool.getInstance().data_tool("SWEEK_CLICK");
                    this.close_self();
                    this.tid = egret.setTimeout(function () {
                        if (window && window["share_friend"]) {
                            window["share_friend"](Main.USER_ID);
                        }
                    }, this, 500);
                    break;
            }
        };
        WeekShareView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, WeekShareView.S_NAME);
        };
        WeekShareView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.share_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            if (this.tid) {
                egret.clearTimeout(this.tid);
                this.tid = null;
            }
        };
        WeekShareView.S_NAME = "WeekShareView";
        return WeekShareView;
    }(mx.BasicView));
    mx.WeekShareView = WeekShareView;
    __reflect(WeekShareView.prototype, "mx.WeekShareView");
})(mx || (mx = {}));
//# sourceMappingURL=WeekShareView.js.map