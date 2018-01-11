/**
*   @author mx
*   @date 2015.1.3
*   @desc 养心殿妃嫔一览
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
    var YXDAllQueen = (function (_super) {
        __extends(YXDAllQueen, _super);
        function YXDAllQueen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YXDAllQueen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_yxd_fl1"://
                    tar = this.all_list.getChildAt(0);
                    break;
                case "s_yxd_tg":
                    tar = this.all_list.getChildAt(0);
                    tar = tar.djs_t;
                    break;
                default:
                    break;
            }
            return tar;
        };
        YXDAllQueen.prototype.fresh_cheroes = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            pproxy.sort_weifen();
            var heroes = pproxy.get_mn_list("notype");
            if (heroes.length == 0) {
                this.hua_t.text = mx.Lang.hg041;
                this.ts_g.visible = true;
                return;
            }
            var arr = [];
            for (var k in heroes) {
                var cd = heroes[k];
                var status_1 = String(cd.status).split("|");
                if (cd && Number(status_1[0]) != -5 && Number(status_1[0]) != 5) {
                    var chushen = cd.chushen;
                    if (Number(cd.mid) < 1000) {
                        var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", cd.mid);
                        chushen = api2 ? api2.chushen : mx.Lang.zssj;
                        api2 = null;
                    }
                    var num = cd.meili || Math.round(Math.random() * 120);
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(cd.weifen) || 13);
                    arr.push({
                        "id": cd.id,
                        "hname": cd.name || "mx",
                        "namecolor": mx.Tools.num2color(num),
                        "meili": num,
                        "weifen": cd.sex == 1 ? api.weifeng : api.weifenb,
                        "weifen2": Number(cd.weifen),
                        "pet": Number(cd.pet),
                        "haizi": cd.haizi || 0,
                        "status": status_1,
                        "avatar": cd.avatar,
                        "mid": Number(cd.mid),
                        "res_time": cd.res_time,
                        "xingge": cd.xingge,
                        "skill": cd.skill,
                        "xihao": cd.xihao,
                        "wqj_res": cd.wqj_res,
                        "time": cd.time,
                        "sb_level": cd.sb_level,
                        "type": 1,
                        "ren_lian": cd.ren_lian || "",
                        "huapi": cd.huapi
                    });
                    api = null;
                }
            }
            pproxy.set_curr_mn(arr[0]['id']);
            this.all_list.dataProvider = new eui.ArrayCollection(arr);
            this.all_list.validateNow();
            this.all_s.viewport.scrollV = pproxy.scrollv;
        };
        YXDAllQueen.prototype.init_view = function () {
            this.all_list.itemRenderer = mx.FPYLRender;
            this.fresh_cheroes();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.YXDAllQueenMediator(this));
        };
        YXDAllQueen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.all_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.YXDAllQueenMediator.NAME);
        };
        return YXDAllQueen;
    }(mx.BasicView));
    mx.YXDAllQueen = YXDAllQueen;
    __reflect(YXDAllQueen.prototype, "mx.YXDAllQueen");
})(mx || (mx = {}));
//# sourceMappingURL=YXDAllQueen.js.map