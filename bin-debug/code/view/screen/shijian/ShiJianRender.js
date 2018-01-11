/**
 *   @author qianjun daiqi
 *   @date 2016.12.20
 *   @desc 事件render
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
    var ShiJianRender = (function (_super) {
        __extends(ShiJianRender, _super);
        function ShiJianRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sb_arr = {};
            return _this;
        }
        ShiJianRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.cyao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.twang_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qchu_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.b1_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.b2_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.b3_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer = null;
            }
            this.removeChildren();
        };
        ShiJianRender.prototype.init_render = function () {
            this.cyao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.twang_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qchu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.b1_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.b2_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.b3_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sb_arr = {
                "1": "sjsbhswli_png",
                "2": "sjsbbtjjia_png",
                "3": "sjsbcknqi_png",
                "4": "sjsbbrghuang_png",
                "5": "sjsbmxyxian_png"
            };
            this.dataChanged();
        };
        ShiJianRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            var view = this;
            var paproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            dproxy.jujue = false;
            switch (e.currentTarget) {
                case view.cyao_b:
                    paproxy.cur_sel_sbzn = null;
                    paproxy.cur_sel_sbzn = this.data;
                    //type 1  养心殿  2 冷宫   3  皇子所子女    4  内务府   5  教坊司
                    var str = "";
                    switch (this.data.type) {
                        case 2:
                            str = mx.Lang.sjian012;
                            break;
                        case 4:
                            str = mx.Lang.sjian010;
                            break;
                        case 5:
                            str = mx.Lang.sjian011;
                            break;
                    }
                    var p_d = void 0;
                    if (str == '') {
                        p_d = { "name": mx.ShiJianCiYaoView.S_NAME, "param": this.data };
                    }
                    else {
                        var a_d2 = {
                            "notice_ok": mx.MX_NOTICE.POP_VIEW,
                            "sdata_ok": { "name": mx.ShiJianCiYaoView.S_NAME, "param": this.data },
                            "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                            "sdata_exit": mx.AlertView.S_NAME,
                            "param": str
                        };
                        p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    }
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case view.twang_b:
                    if (cd.weifen) {
                        var net1 = [
                            {
                                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                "type": "11"
                            }
                        ];
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.YXDianScreen.S_NAME,
                            "param": { "net": net1 }
                        });
                    }
                    else {
                        paproxy.cur_hzs_type = 1;
                        paproxy.hzs_page1 = 1;
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                    }
                    break;
                case view.qchu_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_SJ_SBING_CLEAR,
                        "a_id": cd.a_id,
                    });
                    facade.sendNotification(mx.MX_NOTICE.SJ_SBING_CLEAR, cd.a_id);
                    break;
                case view.b1_b:
                    dproxy.sjian_ly_info = null;
                    dproxy.sjian_ly_info = this.data;
                    switch (Number(cd.msg_id)) {
                        case 1: //删除消息并展示被拒绝的AVG【安慰内容】
                        case 6: //删除消息并打开该妃子的妃嫔事宜界面 AVG：与买来的妃子对话 
                        case 8:
                            if (Number(cd.msg_id) == 6 || Number(cd.msg_id) == 8) {
                                var fz_id = Number(cd.msg_id) == 8 ? cd.mid : (Number(cd.zinv_id) + 1000);
                                var info = paproxy.get_curr_mn_bymid(fz_id);
                                if (!info) {
                                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0149 });
                                    if (typeof cd.re_kanjia == 'undefined') {
                                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                            "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                                            "id": cd.id,
                                            "msg_id": cd.msg_id
                                        });
                                    }
                                    break;
                                }
                            }
                            Number(cd.msg_id) == 8 ? (cd.ren_lian = cd.ren_lian_url) : null;
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "type": Number(cd.msg_id) == 1 ? "sj_ly_anwei" : "sj_ly_yingqin",
                                    "sj_id": cd.id,
                                    "mid": Number(cd.msg_id) == 8 ? cd.mid : (Number(cd.zinv_id) + 1000),
                                    "avatar": cd.avatar,
                                    "name": cd.name,
                                    "msg_id": cd.msg_id,
                                    "cd": cd
                                }
                            });
                            break;
                        case 3:
                            paproxy.sjian_ly_info = null;
                            paproxy.sjian_ly_info = this.data;
                            //打开储秀宫结缘请求中该皇子的详情界面
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_FZ_INFO,
                                "mid": Number(cd.zinv_id) + 1000,
                                "type": 14
                            });
                            break;
                        case 4:
                        case 9:
                            //打开亲家的“他人信息”界面 
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": cd.to_id,
                            });
                            break;
                        case 5:
                            //删除消息并接收“世界结缘被下聘娶走”的事件，弹窗提示已同意该砍价并拒绝了其他女王的砍价
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                                "id": cd.id,
                                "agree": 1
                            });
                            break;
                        case 7:
                            //弹出砍价菜单（同聊天结缘），只能选择比上次出价高的礼盒（不能超过魅力段上限）
                            //选择好礼盒后弹窗显示重新砍价成功，退回之前的礼盒，显示退回的礼盒图标并删除消息 
                            paproxy.sjian_ly_info = null;
                            paproxy.sjian_ly_info = this.data;
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_FZ_INFO,
                                "mid": Number(cd.zinv_id) + 1000,
                                "type": 15,
                                "e_id": this.data.id
                            });
                            break;
                        default:
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                                "id": cd.id,
                            });
                            break;
                    }
                    break;
                case view.b2_b://仅当显示为结缘事件的时候执行，对拒绝结缘进行二次确认弹窗
                    if (view.b2_b.res_name == "sjjjue_png" && view.b1_b.res_name == "sjckan_png") {
                        dproxy.sjian_ly_info = null;
                        dproxy.sjian_ly_info = this.data;
                        dproxy.jujue = true;
                        var jjue_param = {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL, "id": cd.id },
                                "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                                "sdata_exit": mx.AlertView.S_NAME,
                                "param": mx.Tools.format(mx.Lang.hg097, cd.to_name),
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, jjue_param);
                        break;
                    }
                case view.b3_b:
                    dproxy.sjian_ly_info = null;
                    dproxy.sjian_ly_info = this.data;
                    dproxy.jujue = true;
                    switch (Number(cd.msg_id)) {
                        case 7:
                        case 9:
                            var param1 = cd.name;
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", cd.pinli);
                            var param2 = api.name;
                            var a_d2 = {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL, "id": cd.id, "msg_id": cd.msg_id },
                                "param": mx.Tools.format(Number(cd.msg_id) == 7 ? mx.Lang.sjian017 : mx.Lang.sjian020, param1, param2),
                                "btn_n": 1
                            };
                            var p_d_1 = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d_1);
                            break;
                        default:
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                                "id": cd.id,
                            });
                            break;
                    }
                    break;
                case view.avatar:
                    if (Number(cd.mid) > 900 && Number(cd.mid) < 1000) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": "您的好友妃子已入养心殿了~" });
                    }
                    else if (!cd.avatar) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.sjian019 });
                    }
                    // else{//DEBUG，日后修改为跳转
                    //     facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : "但愿人长久，千里共婵娟。"});
                    // }
                    break;
            }
        };
        ShiJianRender.prototype.timerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            if (data.res_time <= 0) {
                var facade = mx.ApplicationFacade.getInstance();
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_SHIJIAN,
                });
                this.time_g.visible = false;
                view.state.source = "sjsbyqshi_png";
                view.qchu_b.visible = true;
                view.cyao_b.visible = view.twang_b.visible = false;
                if (this.timer) {
                    this.timer.stop();
                    this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                    this.timer = null;
                }
            }
            else {
                data.res_time--;
                this.time_t.text = mx.Tools.format_second(data.res_time);
            }
        };
        ShiJianRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (cd.type) {
                case 0://生病
                    this.currentState = this.skin.currentState = "zt1";
                    this.fresh_sbing();
                    break;
                case 1://结缘
                    this.currentState = this.skin.currentState = "zt2";
                    this.fresh_lyin();
                    break;
            }
        };
        ShiJianRender.prototype.fresh_sbing = function () {
            var cd = this.data;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            this.time_g.visible = false;
            var weifen = "";
            var name = "";
            var meili = 0;
            //生病
            if (typeof cd.a_id == 'undefined') {
                name = cd.name;
                meili = Number(cd.meili);
                if (cd.weifen) {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", cd.weifen);
                    weifen = Number(cd.sex) == 1 ? api.weifeng : api.weifenb;
                }
                else {
                    var shenfen = Number(cd.sex) == 1 ? mx.Lang.hg046 : mx.Lang.hg045;
                    weifen = mx.Tools.num2chinese(cd.paiming) + shenfen;
                }
                view.avatar.source = mx.Tools.get_zn_res(cd.avatar, "tx");
                view.state.source = this.sb_arr[cd.sb_level];
                view.qchu_b.visible = false;
                view.cyao_b.visible = view.twang_b.visible = true;
                if (Number(cd.sb_level == 5)) {
                    this.time_g.visible = true;
                    if (!this.timer) {
                        this.timer = new egret.Timer(1000);
                        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                        this.timer.start();
                    }
                    this.time_t.text = mx.Tools.format_second(cd.res_time);
                }
                if (!cd.avatar || cd.avatar == '') {
                    view.dialog_t.text = mx.Lang.hzs83;
                    view.avatar.source = "zntx1_png";
                }
            }
            else {
                cd.sb_level = 6;
                var xinxi = cd.str.split(',');
                name = xinxi[2];
                meili = xinxi[4];
                view.state.source = "sjsbyqshi_png";
                view.qchu_b.visible = true;
                view.cyao_b.visible = view.twang_b.visible = false;
                view.avatar.source = mx.Tools.get_zn_res(xinxi[xinxi.length - 1], "tx");
                if (Number(xinxi[0]) == 0) {
                    weifen = xinxi[1];
                    if (weifen == "") {
                        var shenfen = Number(xinxi[3]) == 1 ? mx.Lang.hg046 : mx.Lang.hg045;
                        weifen = mx.Tools.num2chinese(xinxi[5]) + shenfen;
                    }
                }
                else {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", xinxi[1]);
                    weifen = Number(xinxi[3]) == 1 ? api.weifeng : api.weifenb;
                }
            }
            if (name.length == 1) {
                name = "";
            }
            var str = mx.Tools.format(mx.Lang["sjian00" + cd.sb_level], weifen, name);
            var color = mx.Tools.num2color(meili);
            var c_arr = [0x87a44a, 0x87a44a, 0xf1932e, 0xf1932e, 0xee331f, 0x8b8b8b];
            var str2 = mx.Tools.setKeywordColor2(str, [color, c_arr[Number(cd.sb_level) - 1]]);
            this.dialog_t.textFlow = str2;
        };
        ShiJianRender.prototype.fresh_lyin = function () {
            var cd = this.data;
            var view = this;
            var str1, str2, str3 = null;
            var param1, param2, param3, param4, param5 = "";
            var paiming = mx.Tools.num2chinese(cd.paiming);
            var shenfen = Number(cd.sex) == 1 ? mx.Lang.hg046 : mx.Lang.hg045;
            var color1, color2;
            switch (Number(cd.msg_id)) {
                case 1://指定君主结缘被拒绝
                    param1 = cd.to_name;
                    param2 = paiming;
                    param3 = shenfen;
                    param4 = cd.name;
                    str1 = "sjckznv_png";
                    str2 = "sjzdle_png";
                    view.b1_b.visible = view.b2_b.visible = true;
                    view.b3_b.visible = false;
                    color1 = 0xff4b4b;
                    color2 = mx.Tools.num2color(cd.meili);
                    break;
                case 2://指定君主结缘被同意
                    param1 = paiming;
                    param2 = shenfen;
                    param3 = cd.name;
                    param4 = cd.to_name;
                    str3 = "sjsqpli_png";
                    view.b1_b.visible = view.b2_b.visible = false;
                    view.b3_b.visible = true;
                    color2 = 0xff4b4b;
                    color1 = mx.Tools.num2color(cd.meili);
                    break;
                case 3://被指定君主结缘
                    param1 = cd.to_name;
                    param2 = paiming;
                    param3 = shenfen;
                    param4 = cd.name;
                    str1 = "sjckan_png";
                    str2 = "sjjjue_png";
                    view.b1_b.visible = view.b2_b.visible = true;
                    view.b3_b.visible = false;
                    color1 = 0xff4b4b;
                    color2 = mx.Tools.num2color(cd.meili);
                    break;
                case 4://世界结缘被下聘娶走
                    param1 = paiming;
                    param2 = shenfen;
                    param3 = cd.name;
                    param4 = cd.to_name;
                    str1 = "ckqjia_png";
                    str2 = "sjsqpli_png";
                    view.b1_b.visible = view.b2_b.visible = true;
                    view.b3_b.visible = false;
                    color2 = 0xff4b4b;
                    color1 = mx.Tools.num2color(cd.meili);
                    break;
                case 5://世界结缘被砍价
                    param1 = paiming;
                    param2 = shenfen;
                    param3 = cd.name;
                    param4 = cd.to_name;
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", cd.pinli);
                    param5 = api.name;
                    str1 = "sjtyi_png";
                    str2 = "sjjjue_png";
                    view.b1_b.visible = view.b2_b.visible = true;
                    view.b3_b.visible = false;
                    color2 = 0xff4b4b;
                    color1 = mx.Tools.num2color(cd.meili);
                    break;
                case 6://砍价被接受
                    param1 = cd.to_name;
                    param2 = paiming;
                    param3 = shenfen;
                    param4 = cd.name;
                    str1 = "sjckfzi_png";
                    str2 = "sjzdle_png";
                    view.b1_b.visible = view.b2_b.visible = true;
                    view.b3_b.visible = false;
                    color1 = 0xff4b4b;
                    color2 = mx.Tools.num2color(cd.meili);
                    break;
                case 7://砍价被拒绝
                    param1 = cd.to_name;
                    param2 = paiming;
                    param3 = shenfen;
                    param4 = cd.name;
                    str1 = "sjcxkjia_png";
                    str2 = "sjzdle_png";
                    view.b1_b.visible = view.b2_b.visible = true;
                    view.b3_b.visible = false;
                    color1 = 0xff4b4b;
                    color2 = mx.Tools.num2color(cd.meili);
                    break;
                case 8://收入真实妃子
                    cd.desc = 0;
                    param1 = cd.name;
                    str1 = "sjckfzi_png";
                    str2 = "sjzdle_png";
                    view.b1_b.visible = view.b2_b.visible = true;
                    view.b3_b.visible = false;
                    color1 = mx.Tools.num2color(cd.meili);
                    break;
                case 9://己方砍价消息
                    cd.desc = 0;
                    param1 = cd.to_name;
                    param2 = paiming;
                    param3 = shenfen;
                    param4 = cd.name;
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", cd.pinli);
                    param5 = api2.name;
                    str1 = "ckdfang_png";
                    str2 = "qxkjia_png";
                    view.b1_b.visible = view.b2_b.visible = true;
                    view.b3_b.visible = false;
                    color1 = 0xff4b4b;
                    color2 = mx.Tools.num2color(cd.meili);
                    break;
            }
            var str = mx.Tools.format(mx.Lang.sjian013[cd.msg_id][cd.desc], param1, param2, param3, param4, param5);
            var txt = mx.Tools.setKeywordColor2(str, [color1, color2]);
            view.dialog_t.textFlow = txt;
            view.avatar.source = mx.Tools.get_zn_res(cd.avatar, "tx");
            if (!cd.avatar || cd.avatar == '') {
                view.dialog_t.text = mx.Lang.hzs83;
                view.avatar.source = "zntx1_png";
            }
            //真实妃子人脸融合
            if (Number(cd.msg_id) == 8) {
                var mnres = mx.Tools.get_mn_res(cd.mid, "tx");
                if (cd.ren_lian_url && cd.ren_lian_url != "") {
                    mx.Tools.url_image(cd.ren_lian_url, null, this.get_mnres, this);
                }
                else {
                    view.avatar.source = mnres;
                }
            }
            view.b1_b.set_ssres(str1);
            view.b2_b.set_ssres(str2);
            view.b3_b.set_ssres(str3);
        };
        ShiJianRender.prototype.get_mnres = function (td) {
            var view = this.avatar;
            if (view && td) {
                view.source = td;
                if (td.textureWidth > 180) {
                    view.width = mx.MX_COMMON.SC_TX_W;
                    view.height = Math.round(td.textureHeight * mx.MX_COMMON.SC_TX_W / td.textureWidth);
                }
                else {
                    view.width = td.textureWidth;
                    view.height = td.textureHeight;
                }
            }
        };
        return ShiJianRender;
    }(mx.BasicRender));
    mx.ShiJianRender = ShiJianRender;
    __reflect(ShiJianRender.prototype, "mx.ShiJianRender");
})(mx || (mx = {}));
//# sourceMappingURL=ShiJianRender.js.map