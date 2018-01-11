/**
 *   @author cy
 *   @date 2017.4.26
 *   @desc 家族捐献render
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
    var UnionDonateRender = (function (_super) {
        __extends(UnionDonateRender, _super);
        function UnionDonateRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionDonateRender.prototype.init_render = function () {
            this.juanxian_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        UnionDonateRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHRENSHU);
            var max_lv = apis.length;
            if (uProxy["lv" + this.data.id] >= max_lv && (Number(uProxy.lv1) + Number(uProxy.lv2) + Number(uProxy.lv3) < 3 * max_lv)) {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": {
                        "t": mx.MX_NETS.CS_UNION_DONATE,
                        "type": this.data.id,
                        "juanx": this.data.id2,
                    },
                    "param": mx.Lang.jz223
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                return;
            }
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_UNION_DONATE,
                "type": this.data.id,
                "juanx": this.data.id2,
            });
        };
        UnionDonateRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.juanxian_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        UnionDonateRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var title_arr = ["ybjxian_png", "ybjxxiao_png", "ybjxda_png"]; //类型
            var juanxian_arr = ["ybjxanniu_png", "ybjxanxiao_png", "ybjxanda_png"]; //按钮
            var di_arr = ["ybjxdchen_png", "ybaojxdchen_png", "ybaojxdchen_png"]; //底
            var num_arr = [50, 100, 200]; //获得
            var cost_arr = [30000, 30, 200]; //花费
            this.title_p.source = title_arr[data.id2 - 1];
            this.juanxian_b.set_ssres(juanxian_arr[data.id2 - 1]);
            this.num_t.text = mx.Lang.jz073 + cost_arr[data.id2 - 1];
            this.di_p.source = di_arr[data.id2 - 1];
            this.donate_p.visible = data.id2 == 3;
            this.exp_t.textFlow = [
                { "text": mx.Lang.jz074 },
                { "text": "+" + num_arr[data.id2 - 1], "style": { "textColor": 0x6db050 } }
            ];
            this.gongxian_t.textFlow = [
                { "text": mx.Lang.jz059 },
                { "text": "+" + num_arr[data.id2 - 1], "style": { "textColor": 0x6db050 } }
            ];
        };
        return UnionDonateRender;
    }(mx.BasicRender));
    mx.UnionDonateRender = UnionDonateRender;
    __reflect(UnionDonateRender.prototype, "mx.UnionDonateRender");
})(mx || (mx = {}));
//# sourceMappingURL=UnionDonateRender.js.map