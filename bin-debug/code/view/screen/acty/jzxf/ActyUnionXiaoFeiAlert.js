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
 * @date 2017.11.18
 * 家族消费\
 */
var mx;
(function (mx) {
    var ActyUnionXiaoFeiAlert = (function (_super) {
        __extends(ActyUnionXiaoFeiAlert, _super);
        function ActyUnionXiaoFeiAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyUnionXiaoFeiAlert.mx_support = function () {
            return ["assets.jzxf_main", "api.GONGHUIXIAOFEI", "api.GONGHUIXIAOHAOJIFEN"];
        };
        ActyUnionXiaoFeiAlert.prototype.init_view_by_type = function () {
            this.sm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.ph_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.closesm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.sx_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.item_list.itemRenderer = mx.ActyUnionXiaoFeiRender;
            this.award_list.itemRenderer = mx.ActyUnionXiaoFeiBoxRender;
            this.award_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ActyUnionXiaoFeiAlertMediator(this));
            this.sm_g.visible = false;
            egret.Tween.get(this.hua_p, { "loop": true }).to({ "top": 30 }, 1000).to({ "top": 20 }, 1000);
            this.fresh_list();
            this.fresh_time();
        };
        ActyUnionXiaoFeiAlert.prototype.fresh_list = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = facade.retrieveProxy(mx.HeiShiProxy.NAME);
            var uproxy = facade.retrieveProxy(mx.UnionProxy.NAME);
            var dproxy = facade.retrieveProxy(mx.DataProxy.NAME);
            var view = this;
            view.yb_t.text = mx.Tools.num2str(dproxy.get_currency("ybao"));
            view.ybi_t.text = mx.Tools.num2str(dproxy.get_currency("ybi"));
            view.jzb_t.text = mx.Tools.num2str(uproxy.user_jiazubi);
            view.zjb_t.text = mx.Tools.num2str(hproxy.cur_hsb);
            var arr1 = [];
            var arr2 = [];
            arr1 = mx.ApiTool.getAPINodes(mx.MX_APINAME.GONGHUIXIAOFEI, "day", uproxy.jzxf_nowday);
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.GONGHUIXIAOHAOJIFEN);
            for (var k in apis) {
                var flag = uproxy.gh_integral >= Number(apis[k].jifen);
                arr2.push({
                    "di": "jzjxhd" + (Number(k) + 1) + "_png",
                    "bx": flag ? "jxbxcai_png" : "jxbxhbai_png",
                    "id": Number(k) + 1,
                    "scale": 1 - 0.05 * (6 - Number(k))
                });
            }
            for (var k in arr1) {
                arr1[k].index = Number(k);
                arr1[k].state = Number(uproxy.jzxf_goumai[k]);
            }
            view.item_list.dataProvider = new eui.ArrayCollection(arr1);
            view.award_list.dataProvider = new eui.ArrayCollection(arr2);
            var scrollv = view.item_list.scrollV;
            this.item_list.validateNow();
            if (scrollv) {
                this.item_list.scrollV = scrollv;
            }
            var scrollh = view.award_list.scrollH;
            this.award_list.validateNow();
            if (scrollh) {
                this.award_list.scrollH = scrollh;
            }
            view.jzjf_t.text = uproxy.gh_integral + "";
        };
        ActyUnionXiaoFeiAlert.prototype.fresh_time = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            var res_timer = Math.max(0, Number(aproxy.acty_time['23'].end - now_time));
            this.djs_t.text = mx.Tools.format_second2(res_timer);
        };
        ActyUnionXiaoFeiAlert.prototype.button_click = function (e) {
            switch (e.currentTarget) {
                case this.sm_b:
                    this.sm_g.visible = true;
                    break;
                case this.ph_b:
                    var facade = mx.ApplicationFacade.getInstance();
                    var uproxy = facade.retrieveProxy(mx.UnionProxy.NAME);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_PAIH_JZXF, "gh_id": uproxy.union_id });
                    break;
                case this.closesm_b:
                case this.sx_rect:
                    this.sm_g.visible = false;
                    break;
            }
        };
        ActyUnionXiaoFeiAlert.prototype.onTabChange = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyUnionXFJFAlert.S_NAME, "param": e.item.id });
        };
        ActyUnionXiaoFeiAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.sm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.ph_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.closesm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.sx_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.item_list.dataProvider = null;
            this.award_list.dataProvider = null;
            this.award_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ActyUnionXiaoFeiAlertMediator.NAME);
        };
        ActyUnionXiaoFeiAlert.S_NAME = "ActyUnionXiaoFeiAlert";
        return ActyUnionXiaoFeiAlert;
    }(mx.AlertView));
    mx.ActyUnionXiaoFeiAlert = ActyUnionXiaoFeiAlert;
    __reflect(ActyUnionXiaoFeiAlert.prototype, "mx.ActyUnionXiaoFeiAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyUnionXiaoFeiAlert.js.map