/**
 * @cy/2016.9.6
 *  位分render
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
    var WeiFenAnPaiRender = (function (_super) {
        __extends(WeiFenAnPaiRender, _super);
        function WeiFenAnPaiRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WeiFenAnPaiRender.prototype.init_render = function () {
            this.weifen_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        WeiFenAnPaiRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var res = data.dian ? "kcfwfen_png" : "wkfwfaniu_png";
            var arr = {
                "res": res,
                "sex": data.sex,
                "name": data.name
            };
            this.weifen_b.set_weifen(arr);
            var str = mx.Tools.format(mx.Lang.h0040, data.have);
            this.yiyou_t.textFlow = mx.Tools.setKeywordColor2(str, [0x82709C, 0x95c64f, 0x82709C]);
            if (data.total == 999) {
                this.shangxian_t.textFlow = [{ "text": mx.Lang.h0041, "style": { "textColor": 0x82709C } }];
            }
            else {
                var str2 = mx.Tools.format(mx.Lang.h0042, data.total);
                this.shangxian_t.textFlow = mx.Tools.setKeywordColor2(str2, [0x82709C, 0xff4d4f, 0x82709C]);
            }
        };
        WeiFenAnPaiRender.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
            var pProxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var d = this.data;
            if (d.dian && d.open) {
                var cd = void 0;
                var tab = void 0;
                var type = 1;
                switch (mx.AppConfig.CURR_SCENE_ID) {
                    case mx.YueHuiScreen.S_NAME:
                        cd = hProxy.get_chero_info();
                        tab = 1;
                        ////console.log("hjjh");
                        break;
                    case mx.YXDFzScreen.S_NAME:
                        cd = pProxy.get_curr_mn();
                        tab = 2;
                        break;
                    case mx.LGongTWScreen.S_NAME:
                        cd = pProxy.get_curr_lgfz();
                        tab = 3;
                        type = -1;
                        break;
                    case mx.CXGongFzScreen.S_NAME:
                        cd = pProxy.cur_cxgfz.data;
                        tab = 4; //???
                        break;
                    case mx.XGSQueen.S_NAME:
                        var xproxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
                        cd = xproxy.get_object();
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_XGS_ZHUIFENG,
                            "id": cd.id,
                            "weifen": d.lv
                        });
                        return;
                }
                if (tab == 1) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_SHOURU,
                        "mid": cd.mid,
                        "weifen": d.lv,
                        "tab": tab,
                        "type": type
                    });
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CEFENG_WEIFEN,
                        "mid": cd.mid,
                        "weifen": d.lv,
                        "tab": tab,
                        "type": type
                    });
                }
            }
            else if (!d.open) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
            }
            else {
                var msg = void 0;
                switch (mx.AppConfig.CURR_SCENE_ID) {
                    case mx.YXDFzScreen.S_NAME:
                        msg = d.need > 0 ? mx.Tools.format(mx.Lang.h0075, d.need + '') : mx.Lang.h0054;
                        break;
                    default:
                        msg = mx.Lang.xgs07;
                        break;
                }
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        return WeiFenAnPaiRender;
    }(mx.BasicRender));
    mx.WeiFenAnPaiRender = WeiFenAnPaiRender;
    __reflect(WeiFenAnPaiRender.prototype, "mx.WeiFenAnPaiRender");
})(mx || (mx = {}));
//# sourceMappingURL=WeiFenAnPaiRender.js.map