/**
 *  cy、mx
 *  2016.9.6
 *  位分安排alert
 */
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
    var WeiFenAlert = (function (_super) {
        __extends(WeiFenAlert, _super);
        function WeiFenAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WeiFenAlert.mx_support = function () {
            return ["assets.palace_cfwf", "api.JINJI"];
        };
        WeiFenAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_yh_cf":
                    tar = this.weifen_list.getChildAt(11);
                    break;
            }
            return tar;
        };
        WeiFenAlert.prototype.init_view_by_type = function () {
            switch (mx.AppConfig.CURR_SCENE_ID) {
                case mx.YueHuiScreen.S_NAME:
                case mx.YXDFzScreen.S_NAME:
                case mx.LGongTWScreen.S_NAME:
                case mx.CXGongFzScreen.S_NAME:
                    this.biaoti.source = "cfwfbti_png";
                    break;
                case mx.XGSQueen.S_NAME:
                    this.biaoti.source = "zfwfbti_png";
                    break;
            }
            //this.fh_list.itemRenderer = WeiFenAnPaiRender;
            this.weifen_list.itemRenderer = mx.WeiFenAnPaiRender;
            this.fresh_pop();
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
                }
            }
        };
        WeiFenAlert.prototype.mx_test2 = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        WeiFenAlert.prototype.fresh_pop = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pProxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var xProxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
            var cd = this.adata;
            var c_mn;
            var xingbie;
            var isXPin = false;
            var isDead = false;
            switch (mx.AppConfig.CURR_SCENE_ID) {
                case mx.YueHuiScreen.S_NAME:
                    c_mn = hProxy.get_chero_info();
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", c_mn.mid);
                    xingbie = api.Gender == "FEMALE" ? 1 : 2;
                    break;
                case mx.YXDFzScreen.S_NAME:
                    c_mn = pProxy.get_curr_mn();
                    xingbie = Number(c_mn.sex);
                    break;
                case mx.LGongTWScreen.S_NAME:
                    c_mn = pProxy.get_curr_lgfz();
                    xingbie = Number(c_mn.sex);
                    break;
                case mx.CXGongFzScreen.S_NAME:
                    isXPin = true;
                    c_mn = pProxy.cur_cxgfz.data;
                    xingbie = Number(c_mn.sex);
                    break;
                case mx.XGSQueen.S_NAME:
                    isDead = true;
                    c_mn = xProxy.get_object();
                    xingbie = Number(c_mn.sex);
                    break;
            }
            var temp = cd.weifen;
            var chongai = cd.chongai;
            var jiewei = mx.ApiTool.getAPI(mx.MX_APINAME.JINJI);
            var arr = [];
            for (var i = 1; i < jiewei.length; i++) {
                arr.push({
                    "sex": (xingbie == 1) ? "g" : "b",
                    "name": i + 1,
                    "have": temp[i],
                    "total": isXPin ? 999 : Number(jiewei[i].num_max),
                    "open": Number(jiewei[i].open),
                    "lv": i + 1,
                    "dian": isDead ? (i + 1 >= c_mn.weifen_ini - 3) : jiewei[i].exp <= Number(chongai),
                    "need": Number(jiewei[i].exp) - Number(chongai),
                });
            }
            this.weifen_list.dataProvider = new eui.ArrayCollection(arr);
        };
        WeiFenAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            //this.fh_list.dataProvider = null;
            this.weifen_list.dataProvider = null;
        };
        WeiFenAlert.S_NAME = "WeiFenAlert";
        return WeiFenAlert;
    }(mx.AlertView));
    mx.WeiFenAlert = WeiFenAlert;
    __reflect(WeiFenAlert.prototype, "mx.WeiFenAlert");
})(mx || (mx = {}));
//# sourceMappingURL=WeiFenAlert.js.map