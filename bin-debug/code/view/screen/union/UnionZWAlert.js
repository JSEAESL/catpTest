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
 * @cy/2017.4.25
 *  选择职务alert
 */
var mx;
(function (mx) {
    var UnionZWAlert = (function (_super) {
        __extends(UnionZWAlert, _super);
        function UnionZWAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionZWAlert.mx_support = function () {
            return ["assets.jz_zw"];
        };
        UnionZWAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.UnionProxy.NAME));
            var zg = new mx.GeneralEffect("rwjl");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 1;
            var data = this.adata;
            var str;
            switch (data) {
                case 5:
                case 6:
                    this.g_g.width = 556;
                    this.g_g.height = 225;
                    this.di_p.source = "tljzu_png";
                    this.zwbd_t.visible = true;
                    this.zwbd_t.top = 66;
                    this.jzdj_g.visible = false;
                    this.zwbd_t.text = mx.Tools.format(mx.Lang["jz2" + (7 + data)], uProxy.union_name);
                    break;
                case 4:
                    this.g_g.width = 556;
                    this.g_g.height = 225;
                    this.di_p.source = "zwbdong_png";
                    this.zwbd_t.visible = true;
                    this.jzdj_g.visible = false;
                    var data2 = uProxy.zhiwei_info;
                    var zhiwu = data2.zhiwu.split(",");
                    var old_zhiwu = Number(zhiwu[0]);
                    var new_zhiwu = Number(zhiwu[1]);
                    str = "";
                    if (new_zhiwu == 1) {
                        str = mx.Lang.jz088;
                    }
                    else if (new_zhiwu == 2) {
                        str = mx.Lang.jz090;
                    }
                    else if (old_zhiwu == 2) {
                        str = mx.Tools.format(mx.Lang.jz089, mx.Lang.jz087[new_zhiwu]);
                    }
                    else {
                        str = mx.Tools.format(mx.Lang.jz091, mx.Lang.jz087[old_zhiwu], mx.Lang.jz087[new_zhiwu]);
                    }
                    this.zwbd_t.textFlow = mx.Tools.setKeywordColor2(str, [0xff7f95, 0xff7f95]);
                    this.zwbd_t.top = 70;
                    this.zwbd_t.right = 40;
                    uProxy.zhiwei_info = null;
                    break;
                default:
                    this.g_g.width = 556;
                    this.g_g.height = 225;
                    this.di_p.source = "jzdjtsdchen_png";
                    this.zwbd_t.visible = false;
                    this.jzdj_g.visible = true;
                    var title_arr = ["jzdji_png", "jzrshu_png", "jzzwei_png"];
                    var cor_arr = [0xbe61d6, 0xfe79a1, 0xfe7c54];
                    this.type_p.source = title_arr[data - 1];
                    var now_lv = uProxy["lv" + data];
                    var str2 = mx.Tools.format(mx.Lang.jz094, mx.Lang.jz093[data - 1], now_lv);
                    this.lv_t.textFlow = mx.Tools.setKeywordColor2(str2, [cor_arr[data - 1]]);
                    this.next_t.visible = true;
                    var apis = void 0;
                    str = "";
                    switch (data) {
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
                            str += mx.Tools.format(mx.Lang.jz055, mx.Lang.jz087[apis[now_lv].new]);
                            break;
                    }
                    this.next_t.textFlow = mx.Tools.setKeywordColor2(str, [0x6db050]);
                    var max_lv = apis.length;
                    if (now_lv >= max_lv) {
                        this.next_t.visible = false;
                    }
                    break;
            }
        };
        UnionZWAlert.S_NAME = "UnionZWAlert";
        return UnionZWAlert;
    }(mx.AlertView));
    mx.UnionZWAlert = UnionZWAlert;
    __reflect(UnionZWAlert.prototype, "mx.UnionZWAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionZWAlert.js.map