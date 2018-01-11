/**
 *   @author cy
 *   @date 2017.4.27
 *   @desc 家族捐献弹窗 Mediator
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
    var UnionJuanXianAlertMediator = (function (_super) {
        __extends(UnionJuanXianAlertMediator, _super);
        function UnionJuanXianAlertMediator(viewComponent) {
            var _this = _super.call(this, UnionJuanXianAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(UnionJuanXianAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        UnionJuanXianAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        UnionJuanXianAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    this.fresh_screen(data);
                    break;
            }
        };
        Object.defineProperty(UnionJuanXianAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        UnionJuanXianAlertMediator.prototype.init_view = function () {
            var view = this.view;
            view.juanxian_list.itemRenderer = mx.UnionDonateRender;
            this.fresh_screen();
        };
        UnionJuanXianAlertMediator.prototype.fresh_screen = function (adata) {
            var view = this.view;
            var proxy = this.proxy;
            var data = adata || view.adata;
            var title_arr = ["jzdji_png", "jzrshu_png", "jzzwei_png"];
            var des_arr = ["jzdjtgao_png", "cysxtgao_png", "jzzwssheng_png"];
            view.title_p.source = title_arr[data.id - 1];
            view.des_p.source = des_arr[data.id - 1];
            var source = ["jzdjjdtiao_png", "jzcyjdtiao_png", "jzzwjdtiao_png"];
            view.exp_bar.set_res({ "up": source[data.id - 1], "down": "jxjddchen_png" });
            view.cishu_t.text = mx.Lang.jz072 + "：" + (5 - proxy.has_juanxian) + "/5";
            view.lv_t.text = mx.Lang.jz056 + "：" + data.now_lv;
            view.next_t.visible = true;
            var apis;
            var str = mx.Lang.j0020 + "：";
            switch (data.id) {
                case 1:
                    if (!proxy.GHEXP) {
                        apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHEXP);
                        apis.reverse();
                        proxy.GHEXP = apis;
                    }
                    else {
                        apis = proxy.GHEXP;
                    }
                    view.next_t.visible = false;
                    if (apis[0].id > apis[1].id) {
                        apis.reverse();
                    }
                    break;
                case 2:
                    apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHRENSHU);
                    str += mx.Lang.jz054;
                    break;
                case 3:
                    apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHZHIWEI);
                    str += mx.Tools.format(mx.Lang.jz055, mx.Lang.jz087[apis[data.now_lv].new]);
                    break;
            }
            view.next_t.textFlow = mx.Tools.setKeywordColor2(str, [0x6db050]);
            var max_lv = apis.length;
            var cor_arr = [0xbe61d6, 0xfe79a1, 0xfe7c54];
            if (data.now_lv < max_lv) {
                var api1 = apis[data.now_lv - 2] || { "exp": 0 };
                var api2 = apis[data.now_lv - 1];
                view.exp_bar.value = 100 * (Number(data.now_exp) - Number(api1.exp)) / (Number(api2.exp) - Number(api1.exp));
                var exp = (Number(data.now_exp) - Number(api1.exp)) + "/" + (Number(api2.exp) - Number(api1.exp));
                view.exp_t.textFlow = [
                    { "text": mx.Lang.jz074 + "：" },
                    { "text": exp, "style": { "textColor": cor_arr[data.id - 1] } }
                ];
            }
            else {
                var api1 = apis[max_lv - 2] || { "exp": 0 };
                var api2 = apis[max_lv - 1];
                /*let exp = (Number(data.now_exp) - Number(api1.exp)) + "/" + (Number(api2.exp) - Number(api1.exp));
                view.exp_t.textFlow = [
                    {"text" : Lang.jz074 + "："},
                    {"text" : exp, "style" : {"textColor" : cor_arr[data.id - 1]}}
                ];*/
                view.exp_t.text = mx.Lang.jz221;
                view.exp_bar.value = 100;
                view.next_t.visible = false;
            }
            var arr = [];
            var layout = view.juanxian_list.layout;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            layout.gap = gproxy.user_vip >= 6 ? 48 : 90;
            arr.push({ "id": data.id, "id2": 1 });
            arr.push({ "id": data.id, "id2": 2 });
            if (gproxy.user_vip >= 6) {
                arr.push({ "id": data.id, "id2": 3 });
            }
            view.juanxian_list.dataProvider = new eui.ArrayCollection(arr);
        };
        UnionJuanXianAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.juanxian_list.dataProvider = null;
        };
        UnionJuanXianAlertMediator.NAME = "UnionJuanXianAlertMediator";
        return UnionJuanXianAlertMediator;
    }(puremvc.Mediator));
    mx.UnionJuanXianAlertMediator = UnionJuanXianAlertMediator;
    __reflect(UnionJuanXianAlertMediator.prototype, "mx.UnionJuanXianAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionJuanXianAlertMediator.js.map