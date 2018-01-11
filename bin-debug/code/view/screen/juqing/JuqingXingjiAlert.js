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
    var JuqingXingjiAlert = (function (_super) {
        __extends(JuqingXingjiAlert, _super);
        function JuqingXingjiAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JuqingXingjiAlert.mx_support = function () {
            return ["assets.jq_xj_alert", "api.STARAWARD"];
        };
        JuqingXingjiAlert.prototype.set_scale = function (s) {
            this.scaleX = this.scaleY = s;
        };
        Object.defineProperty(JuqingXingjiAlert.prototype, "proxy", {
            get: function () {
                return mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        JuqingXingjiAlert.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.JuqingXingjiAlertMediator(this));
            view.acty_list.itemRenderer = mx.JuqingXingjiRender;
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            this.fresh_list();
        };
        JuqingXingjiAlert.prototype.fresh_list = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = this.proxy;
            var chapterid = this.adata;
            var stage_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "chapterid", chapterid);
            view.name_p.source = "jq" + stage_api.icon + "plu_png";
            //总星级
            var xji = 0;
            for (var i in proxy.juqing_info.data) {
                if (Number(proxy.juqing_info.data[i].state) > 0) {
                    xji += Number(proxy.juqing_info.data[i].state);
                }
            }
            var star_info = mx.ApiTool.getAPINodes(mx.MX_APINAME.STARAWARD, "chapterid", chapterid);
            var arr = [];
            view.xji_t.text = xji + '/' + star_info[star_info.length - 1].stars;
            var temp = {};
            for (var i in star_info) {
                var unit = star_info[i];
                if (!temp[unit['stars']]) {
                    temp[unit['stars']] = 1;
                }
                // 
                // arr.push({
                //     'idx' : i,
                //     'need' : unit.stars,
                //     'awards' : unit
                // });
            }
            var log = proxy.juqing_info.star_lq;
            for (var i in temp) {
                var star_info_1 = mx.ApiTool.getAPINodes(mx.MX_APINAME.STARAWARD, "chapterid", chapterid, 'stars', i);
                arr.push({
                    'chapter': chapterid,
                    'need': i,
                    'awards': star_info_1,
                    'lq': log.indexOf(i) > -1,
                    'cur_xji': xji
                });
            }
            view.acty_list.dataProvider = new eui.ArrayCollection(arr);
            //let oldv = this.acty_list.scrollV;
            // this.acty_list.validateNow();
            // this.acty_list.scrollV = oldv;
        };
        JuqingXingjiAlert.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, JuqingXingjiAlert.S_NAME);
        };
        JuqingXingjiAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.acty_list.dataProvider = null;
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JuqingXingjiAlertMediator.NAME);
        };
        JuqingXingjiAlert.S_NAME = "JuqingXingjiAlert";
        return JuqingXingjiAlert;
    }(mx.BasicView));
    mx.JuqingXingjiAlert = JuqingXingjiAlert;
    __reflect(JuqingXingjiAlert.prototype, "mx.JuqingXingjiAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JuqingXingjiAlert.js.map