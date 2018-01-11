/**
*   @author cy
*   @date 2016.12.9
*   @英雄光环tip提示
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
    var AuraTip = (function (_super) {
        __extends(AuraTip, _super);
        function AuraTip(cd) {
            return _super.call(this, cd) || this;
        }
        AuraTip.prototype.init_view = function () {
            var cd = this.adata;
            var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.HEROFATE, "h_id", cd.mid);
            var arr = [];
            var api, flag, need_id, flow1, flow2;
            var shuxing_arr = ["HP", "AD", "ARM", "CRIT", "ARMP", "LFS", "HIT", "DODG", "HOLY", "HEAL"];
            for (var k in apis) {
                api = apis[k];
                flag = true;
                need_id = [];
                flow1 = [];
                flow2 = [];
                need_id.push(cd.mid);
                for (var i = 1; i <= 4; i++) {
                    if (Number(api["hero" + i]) != 0) {
                        need_id.push(Number(api["hero" + i]));
                    }
                }
                flow2.push({ "text": mx.Lang.h0089 });
                for (var j in need_id) {
                    var info = hproxy.get_hero_by_mid(need_id[j]);
                    var hero_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", need_id[j]);
                    if (info) {
                        flow2.push({ "text": hero_api.hero_name, "style": { "textColor": 0xffd907 } });
                    }
                    else {
                        flow2.push({ "text": hero_api.hero_name, "style": { "textColor": 0xb5b4b4 } });
                        flag = false;
                    }
                    if (Number(j) < need_id.length - 1) {
                        flow2.push({ "text": "、" });
                    }
                }
                var index = shuxing_arr.indexOf(api.Add_type);
                flow2.push({ "text": mx.Tools.format(mx.Lang.h0090, mx.Lang.h0058[index], api.Add_num) });
                flow1.push({ "text": api.title + "：", "style": { "textColor": (flag ? 0xffd907 : 0xb5b4b4) } });
                arr.push({
                    "flow1": flow1,
                    "flow2": flow2,
                    "width": 308 - 16 * (api.title.length + 1)
                });
            }
            this.aura_list.dataProvider = new eui.ArrayCollection(arr);
        };
        AuraTip.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.aura_list.dataProvider = null;
        };
        return AuraTip;
    }(mx.HeroTip));
    mx.AuraTip = AuraTip;
    __reflect(AuraTip.prototype, "mx.AuraTip");
})(mx || (mx = {}));
//# sourceMappingURL=AuraTip.js.map