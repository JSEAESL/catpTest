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
    var UnionJuanXianRender = (function (_super) {
        __extends(UnionJuanXianRender, _super);
        function UnionJuanXianRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionJuanXianRender.prototype.init_render = function () {
            this.juanxian_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        UnionJuanXianRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionJuanXianAlert.S_NAME, "param": this.data });
        };
        UnionJuanXianRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.juanxian_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        UnionJuanXianRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            var title_arr = ["jzdji_png", "jzrshu_png", "jzzwei_png"];
            var cor_arr = [0xbe61d6, 0xfe79a1, 0xfe7c54];
            this.title_p.source = title_arr[data.id - 1];
            this.lv_t.text = mx.Lang.jz056 + "：" + data.now_lv;
            this.des_t.text = mx.Lang.jz057[data.id - 1];
            this.des_t.textColor = cor_arr[data.id - 1];
            var source = ["jzdjjdtiao_png", "jzcyjdtiao_png", "jzzwjdtiao_png"];
            this.exp_bar.set_res({ "up": source[data.id - 1], "down": "jxjddchen_png" });
            this.next_t.visible = true;
            var apis;
            var str = mx.Lang.j0020 + "：";
            switch (data.id) {
                case 1:
                    if (!uProxy.GHEXP) {
                        apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHEXP);
                        apis.reverse();
                        uProxy.GHEXP = apis;
                    }
                    else {
                        apis = uProxy.GHEXP;
                    }
                    this.next_t.visible = false;
                    break;
                case 2:
                    apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHRENSHU);
                    str += mx.Lang.jz054;
                    break;
                case 3:
                    apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHZHIWEI);
                    if (data.now_lv >= apis.length) {
                        str = mx.Lang.jz221;
                    }
                    else {
                        str += mx.Tools.format(mx.Lang.jz055, mx.Lang.jz087[apis[data.now_lv].new]);
                    }
                    break;
            }
            this.next_t.textFlow = mx.Tools.setKeywordColor2(str, [0x6db050]);
            var max_lv = apis.length;
            if (data.now_lv < max_lv) {
                var api1 = apis[data.now_lv - 2] || { "exp": 0 };
                var api2 = apis[data.now_lv - 1];
                this.exp_bar.value = 100 * (Number(data.now_exp) - Number(api1.exp)) / (Number(api2.exp) - Number(api1.exp));
            }
            else {
                this.exp_bar.value = 100;
                this.next_t.visible = false;
            }
            apis = null;
        };
        return UnionJuanXianRender;
    }(mx.BasicRender));
    mx.UnionJuanXianRender = UnionJuanXianRender;
    __reflect(UnionJuanXianRender.prototype, "mx.UnionJuanXianRender");
})(mx || (mx = {}));
//# sourceMappingURL=UnionJuanXianRender.js.map