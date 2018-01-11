/**
 *   @author cy
 *   @date 2017.10.31
 *   @desc 选秀缘分render
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
    var XXiuFateRender = (function (_super) {
        __extends(XXiuFateRender, _super);
        function XXiuFateRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuFateRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hero_list.dataProvider = null;
            this.jia_list.dataProvider = null;
        };
        XXiuFateRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROFATE, "id", data);
            this.title_t.text = "【" + api.title + "】";
            var shuxing_arr = ["HP", "AD", "ARM", "CRIT", "ARMP", "LFS", "HIT", "DODG", "HOLY", "HEAL"];
            var index = shuxing_arr.indexOf(api.Add_type);
            this.sm_t.text = mx.Tools.format(mx.Lang.h0090, mx.Lang.h0058[index], api.Add_num);
            var id_arr = [];
            id_arr.push(Number(api.h_id));
            for (var t = 1; t <= 4; t++) {
                if (id_arr.indexOf(Number(api["hero" + t])) < 0) {
                    id_arr.push(Number(api["hero" + t]));
                }
            }
            var info;
            var arr1 = [];
            var arr2 = [];
            for (var k in id_arr) {
                info = hproxy.get_hero_by_mid(id_arr[k]);
                if (info) {
                    arr1.push({
                        "mid": id_arr[k],
                        "quality": info.quality,
                        "chicun": 90,
                        "fate_slt": Number(k) == 0,
                    });
                }
            }
            for (var k = 0; k < arr1.length - 1; k++) {
                arr2.push(1);
            }
            this.hero_list.itemRenderer = mx.HeroBaseRender;
            this.hero_list.dataProvider = new eui.ArrayCollection(arr1);
            this.jia_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        return XXiuFateRender;
    }(mx.BasicRender));
    mx.XXiuFateRender = XXiuFateRender;
    __reflect(XXiuFateRender.prototype, "mx.XXiuFateRender");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuFateRender.js.map