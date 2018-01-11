/**
 *   @author cy
 *   @date 2017.10.2
 *   @desc WanBaVIPRender
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
    var WanBaVIPRender = (function (_super) {
        __extends(WanBaVIPRender, _super);
        function WanBaVIPRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WanBaVIPRender.prototype.init_render = function () {
            this.dataChanged();
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
        };
        WanBaVIPRender.prototype.remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
            this.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
        };
        WanBaVIPRender.prototype.fun_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            if (gproxy.user_wanba_vip < this.data.item[0].vip) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0021 });
                return;
            }
            else if (this.fun_b.res_name == "xyxygmai_png") {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbvip02 });
                return;
            }
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_WANBA_LQVIP,
                "key_id": this.data.item[0].key_id,
            });
        };
        WanBaVIPRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var arr = data.item;
            for (var k in arr) {
                arr[k].chicun = 42;
                arr[k].height = 60;
                arr[k].width = 60;
                arr[k].top = 44;
                arr[k].no_num = true;
                arr[k].di_cor = 0xa36560;
                arr[k].di_size = 12;
                arr[k].id = arr[k].item_id;
                arr[k].type = arr[k].award_type;
            }
            this.item_list.itemRenderer = mx.GNumRender;
            this.item_list.dataProvider = new eui.ArrayCollection(arr);
            this.vip_p.source = "xyxv" + arr[0].vip + "_png";
            this.price_t.text = arr[0].price + "";
            this.yuanjia_t.text = arr[0].yuanjia + "";
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var res = "xyxgmai_png";
            for (var k in gproxy.user_wanba_vip_goumai) {
                if (Number(gproxy.user_wanba_vip_goumai[k]) == Number(arr[0].key_id)) {
                    res = "xyxygmai_png";
                    break;
                }
            }
            this.fun_b.set_ssres(res);
        };
        return WanBaVIPRender;
    }(mx.BasicRender));
    mx.WanBaVIPRender = WanBaVIPRender;
    __reflect(WanBaVIPRender.prototype, "mx.WanBaVIPRender");
})(mx || (mx = {}));
//# sourceMappingURL=WanBaVIPRender.js.map