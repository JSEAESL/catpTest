/**
 *   @author wf
 *   @date 2016.11.14
 *   @desc 储秀宫数据管理
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
    var CXGongProxy = (function (_super) {
        __extends(CXGongProxy, _super);
        function CXGongProxy() {
            var _this = _super.call(this, CXGongProxy.NAME) || this;
            //购买礼盒，选妃子入宫
            _this.re_kanjia = false;
            return _this;
        }
        CXGongProxy.prototype.init_cxgong = function (data) {
            this.cxg_page1 = this.cxg_page2 = Number(data.page);
            this.cxg_total1 = (Number(data.total1) || 1) || this.cxg_total1;
            this.cxg_total2 = (Number(data.total2) || 1) || this.cxg_total2;
            if (!this.cxg_list1) {
                this.cxg_type = 1;
                this.cxg_paixu = 0; //默认时间排序
                this.cxg_list1 = {};
                this.cxg_list2 = {};
                this.cxg_list1[data.page] = data.data1;
                this.cxg_list2[data.page] = data.data2;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.CXGongScreen.S_NAME);
            }
            else {
                this.cxg_list1[data.page] = data.data1 || this.cxg_list1[data.page];
                this.cxg_list2[data.page] = data.data2 || this.cxg_list2[data.page];
                var copen = mx.Tools.check_view_state(mx.CXGongScreen.S_NAME);
                if (!copen) {
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.CXGongScreen.S_NAME);
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.CXGongScreen.S_NAME);
                }
            }
        };
        CXGongProxy.prototype.clear_proxy_data = function () {
            this.cxg_list1 = null; //每次重新请求数据，清除掉旧数据,再次进入后，当前页会重新赋值
            this.cxg_list2 = null;
            this.cxg_paixu = null; //清除排序规则
            this.cxg_jn_slt = null; //清除技能筛选
            this.cxg_type = null;
        };
        CXGongProxy.prototype.buy_feizi_cb = function (data) {
            var msg;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (data.state) {
                case 0:
                    msg = mx.Lang.cxg002;
                    if (pproxy.sjian_ly_info) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                            "id": pproxy.sjian_ly_info.id,
                        });
                    }
                    break;
                case 1:
                    msg = mx.Lang.cxg003;
                    break;
                case 2:
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    msg = Number(gproxy.user_vip) < mx.MX_COMMON.MAX_VIP_LV ? mx.Lang.p0142 : mx.Lang.p0143;
                    break;
                case 3:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case 4://下聘成功
                    msg = mx.Lang.cxg009;
                    this.sendNotification(mx.MX_NOTICE.CXG_XPIN_SUC, data.feizi);
                    data.feizi.status = 0;
                    data.feizi.haizi = 0;
                    this.sendNotification(mx.MX_NOTICE.YXD_ADD_MN, data.feizi);
                    if (mx.MX_COMMON.IN_GUIDE == 2) {
                        mx.MX_COMMON.GUIDE_SHARE = false;
                        if (window && window["share_xnl"]) {
                            window["share_xnl"](Main.USER_ID, 1);
                        }
                    }
                    //消耗物品后
                    var paproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    var id = void 0, num = void 0;
                    for (var i in data.pinli) {
                        id = i;
                        num = data.pinli[i];
                    }
                    paproxy.set_item_num(id, num);
                    //玩吧消息
                    this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        'uid': data.feizi.zongzu_id,
                        "mtype": 3,
                        "str": mx.Lang.wblyhz
                    });
                    if (pproxy.sjian_ly_info && !pproxy.zhiding_lyin) {
                        var cd = pproxy.sjian_ly_info;
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", cd.pinli);
                        var param1 = cd.name;
                        var param2 = api.name;
                        this.re_kanjia = true;
                        var a_d2_1 = {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": { "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL, "id": cd.id },
                            "notice_exit": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_exit": { "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL, "id": cd.id },
                            "param": mx.Tools.format(mx.Lang.sjian018, param1, param2),
                            "btn_n": 1
                        };
                        var p_d_1 = { "name": mx.AlertView.S_NAME, "param": a_d2_1 };
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d_1);
                    }
                    break;
                case 5:
                    msg = mx.Lang.cxg012;
                    break;
                case 6:
                    msg = mx.Lang.cxg020;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        CXGongProxy.prototype.lianyin_jujue = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1://不是指定自己的和亲
                    msg = mx.Lang.cxg018;
                    break;
                case 2:
                    if (mx.AppConfig.PREV_SCENE_ID == mx.CXGongScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_CXG_DATA,
                            "page": this.cxg_type == 1 ? this.cxg_page1 : this.cxg_page2,
                            "paixu": this.cxg_paixu,
                            "type": this.cxg_type,
                            "skill": this.cxg_type == 1 ? this.cxg_jn_slt || 0 : 0 //子女技能
                        });
                    }
                    else if (mx.AppConfig.PREV_SCENE_ID == mx.ShiJianScreen.S_NAME) {
                        var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                        if (pproxy.sjian_ly_info) {
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                                "id": pproxy.sjian_ly_info.id,
                            });
                        }
                        var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
                        dproxy.shijian_type = 1;
                        //this.sendNotification(MX_NOTICE.SCENE_CHANGE, ShiJianScreen.S_NAME);
                    }
                    msg = mx.Lang.cxg019;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        CXGongProxy.NAME = "CXGongProxy";
        return CXGongProxy;
    }(puremvc.Proxy));
    mx.CXGongProxy = CXGongProxy;
    __reflect(CXGongProxy.prototype, "mx.CXGongProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=CxgongProxy.js.map