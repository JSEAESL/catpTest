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
    var JuqingXunshiAlert = (function (_super) {
        __extends(JuqingXunshiAlert, _super);
        function JuqingXunshiAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JuqingXunshiAlert.mx_support = function () {
            return ["assets.jq_xs_alert", "api.CHAPTERAWARD"];
        };
        JuqingXunshiAlert.prototype.set_scale = function (s) {
            this.scaleX = this.scaleY = s;
        };
        Object.defineProperty(JuqingXunshiAlert.prototype, "proxy", {
            get: function () {
                return mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        JuqingXunshiAlert.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.JuqingXunshiAlertMediator(this));
            view.award_list.itemRenderer = mx.GNumRender;
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.qren_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lq_award, this);
            view.time_ts.visible = Number(this.proxy.juqing_info.daily) == 1;
            this.fresh_list();
        };
        JuqingXunshiAlert.prototype.fresh_list = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = this.proxy;
            var xunshi_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.CHAPTERAWARD, "chapterid", proxy.cur_chapter);
            var arr = [];
            for (var i in xunshi_api) {
                arr.push({
                    "type": xunshi_api[i].award_type,
                    "id": xunshi_api[i].item_id,
                    "num": xunshi_api[i].num,
                    "chicun": 85,
                    "no_num": true,
                    "top": 95,
                    "di_cor": 0x6B559D,
                    "di_size": 17
                });
            }
            view.award_list.itemRenderer = mx.GNumRender;
            view.award_list.dataProvider = new eui.ArrayCollection(arr);
        };
        JuqingXunshiAlert.prototype.lq_award = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = this.proxy;
            if (!this.time_ts.visible) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_JUQING_SSHOU_LQ,
                    "chapter": proxy.cur_chapter,
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0045 });
            }
        };
        JuqingXunshiAlert.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, JuqingXunshiAlert.S_NAME);
        };
        JuqingXunshiAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.award_list.dataProvider = null;
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.qren_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.lq_award, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JuqingXunshiAlertMediator.NAME);
        };
        JuqingXunshiAlert.S_NAME = "JuqingXunshiAlert";
        return JuqingXunshiAlert;
    }(mx.BasicView));
    mx.JuqingXunshiAlert = JuqingXunshiAlert;
    __reflect(JuqingXunshiAlert.prototype, "mx.JuqingXunshiAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JuqingXunshiAlert.js.map