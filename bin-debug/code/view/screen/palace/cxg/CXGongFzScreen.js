/**
 *   @author mx wf daiqi
 *   @date 2015.1.3 2016.11.15
 *   @desc 储秀宫妃子详情界面
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
    var CXGongFzScreen = (function (_super) {
        __extends(CXGongFzScreen, _super);
        function CXGongFzScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.not_friend = false;
            _this.daishu = 0;
            _this.wenhua = 1;
            return _this;
        }
        CXGongFzScreen.mx_support = function () {
            return ["assets.palace_cxgfz", "assets.ldflcz", "api.JINJI", "api.PINLI", "api.XINGGE", "api.ZINVSKILL", "api.XUETONGTIP"];
        };
        CXGongFzScreen.prototype.init_view = function () {
            var view = this;
            view.xpin_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.anpai_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zzu_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.kkan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cxing_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jjue_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_screen();
        };
        CXGongFzScreen.prototype.fresh_screen = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            view.hasGet_g.visible = false;
            view.sc_tshi.visible = false;
            view.btn_g.visible = true;
            view.anpai_g.visible = true;
            view.feizi = pproxy.cur_cxgfz;
            var fz = view.feizi.data;
            this.needxp = true;
            if (pproxy.mn_d && pproxy.mn_d[fz.id]) {
                if (Number(pproxy.mn_d[fz.id].mid) == Number(fz.mid)) {
                    this.needxp = false;
                }
            }
            view.name_t.text = fz.name || '';
            view.xpin_b.touchEnabled = true;
            //view.mli_t.text = Lang.mli + '：' + fz.meili;
            view.cshen_t.text = mx.Lang.cshen + '：' + (fz.fenghao || mx.Lang.wu);
            var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", fz.xingge);
            this.xg_t.text = mx.Lang.xge + "：" + (xg_api ? xg_api.xingge : "???");
            view.zzu_t.textFlow = [
                { "text": mx.Lang.zzu + '：' },
                { "text": fz.zongzu || fz.zongzu_name, "style": { "underline": true, "textColor": mx.Tools.num2color(200) } }
            ];
            if (pproxy.anpai) {
                this.title_p.source = "apxren_png";
                this.jjue_g.width = 0;
                this.jjue_b.visible = false;
                var layout = new eui.HorizontalLayout();
                layout.gap = 60;
                this.btn_g.layout = layout;
                this.btn_g.width = 298;
                this.btn_g.horizontalCenter = -80;
                view.cxing_b.verticalCenter = -16;
                if (this.needxp) {
                    this.xpin_b.set_ssres("xpin_btn_png");
                }
                else {
                    this.xpin_b.set_ssres("cxyrhgong_png");
                    this.xpin_b.touchEnabled = false;
                }
                this.set_bg();
            }
            else if (pproxy.jianjie_type == 7) {
                this.title_p.source = "znxqing_png";
                this.di_p.visible = false;
                this.btn_g.visible = false;
                this.anpai_g.visible = false;
                this.set_bg();
            }
            else if (pproxy.jianjie_type == 8) {
                this.title_p.source = "czflu_png";
                this.czfl_g.visible = true;
                this.btn_g.visible = false;
                this.anpai_g.visible = false;
                if (fz.fenghao == "") {
                    var str = mx.Tools.num2chinese(fz.paiming);
                    if (Number(fz.sex) == 1) {
                        str += mx.Lang.hg046;
                    }
                    else {
                        str += mx.Lang.hg045;
                    }
                    view.cshen_t.text = mx.Lang.cshen + '：' + str;
                }
                view.name_t.text = (fz.xing || '') + (fz.name || '');
                this.bg_p.source = "s1533_jpg";
                var t_arr = [
                    { "bg": "rjfsi_png" },
                    { "bg": "czflsrhgong_png" },
                    { "bg": "qfhguo_png" },
                    { "bg": "zjcsi_png" }
                ];
                this.czfl_list.itemRenderer = mx.SSButtonRender;
                this.czfl_list.dataProvider = new eui.ArrayCollection(t_arr);
                this.czfl_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            }
            else if (pproxy.jianjie_type == 13 || pproxy.jianjie_type == 14) {
                this.needxp = true;
                this.title_p.source = "zdlyin_png";
                this.anpai_g.width = 0;
                this.anpai_b.visible = false;
                this.jjue_b.visible = true;
                var layout = new eui.HorizontalLayout();
                layout.gap = 60;
                this.btn_g.layout = layout;
                view.hasGet_g.visible = !this.needxp;
                if (pproxy.jianjie_type == 14) {
                    view.kkan_b.visible = false;
                    view.cxing_b.verticalCenter = view.cxing_b.horizontalCenter = 0;
                }
                this.set_bg();
            }
            else {
                this.title_p.source = "hglyin_png";
                this.jjue_g.width = 0;
                this.jjue_b.visible = false;
                this.anpai_g.width = 0;
                this.anpai_b.visible = false;
                var layout = new eui.HorizontalLayout();
                layout.gap = 0;
                this.btn_g.layout = layout;
                view.hasGet_g.visible = !this.needxp;
                this.set_bg();
            }
            facade.registerMediator(new mx.CXGFeiZiInfoMediator(this));
            view.avatar.source = mx.Tools.get_zn_res(fz.avatar, 'lh');
            if (pproxy.jianjie_type != 7 && pproxy.jianjie_type != 8) {
                var g_id = Number(fz.pinli);
                var g_id_ch = mx.Lang.numword[g_id]; //Tools.num2chinese(g_id);//1返回大，不知何意
                view.pli_t.text = mx.Tools.format(mx.Lang.pli001, g_id_ch);
                view.pli_t.visible = true;
            }
            var arr = [];
            var str2 = []; //简介
            var jianjie = this.feizi.info;
            for (var k in jianjie) {
                if (jianjie[k]) {
                    var time = mx.Tools.format_time(jianjie[k].time, "nyr");
                    var txt = jianjie[k].msg;
                    var key_id = Number(jianjie[k].key_id);
                    switch (key_id) {
                        case 6:
                            var c_mn = this.feizi.data;
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", txt);
                            txt = Number(c_mn.sex) == 1 ? api.weifeng : api.weifenb;
                            break;
                        case 22:
                        case 23:
                            txt = txt.split('|');
                            break;
                    }
                    if (key_id == 22 || key_id == 23) {
                        txt = mx.Tools.format(mx.Lang["fzjj" + jianjie[k].key_id], txt[0], txt[1]);
                    }
                    else {
                        txt = mx.Tools.format(mx.Lang["fzjj" + jianjie[k].key_id], txt);
                    }
                    str2 = mx.Tools.setKeywordColor2(txt, [mx.Tools.num2color(200)]);
                    arr.push({
                        "data": time,
                        "jianjie": str2
                    });
                }
            }
            this.jianjie_list.dataProvider = new eui.ArrayCollection(arr);
            this.jianjie_s.height = 85;
            this.jianjie_s.viewport.validateNow();
            var cur_height = this.jianjie_list.measuredHeight ? this.jianjie_list.measuredHeight : this.jianjie_list.height;
            var yy = Math.max(cur_height - 85, 0);
            this.jianjie_s.viewport.scrollV = yy;
            //let height = Tools.screen_height;
            //this.jianjie_g.top = 65 + Math.ceil((height - 65 - 415 - 146) / 2);
            this.change_b.scaleY = -1;
            //非好友子女详情
            if (pproxy.jianjie_type == 7 && pproxy.not_friend) {
                this.not_friend = true;
            }
            if (!this.ef_g.numChildren && !this.not_friend) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
            for (var i in fz.skill) {
                var name_1 = "";
                var desc = "";
                if (this.not_friend) {
                    name_1 = mx.Lang.p0127;
                }
                else {
                    if (Number(fz.skill[i]) <= 0) {
                        name_1 = mx.Lang.hzs75;
                    }
                    else {
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", fz.skill[i]);
                        name_1 = api.name;
                    }
                }
                view["jneng" + (Number(i) + 1) + "_t"].text = name_1;
                if (name_1 != mx.Lang.hzs75) {
                    view["jneng" + (Number(i) + 1) + "_t"].textColor = 0x72bd6a;
                }
            }
            this.set_xuetong();
            this.set_caiyi();
        };
        CXGongFzScreen.prototype.set_xuetong = function () {
            var info = mx.Tools.get_xuetong_info(this.feizi.data);
            this.daishu = info.daishu;
            this.wenhua = info.wenhua;
            this.xt_t.textFlow = [{ "text": mx.Lang.fzxt + "：" }, { "text": info.str, "style": { "underline": true } }];
        };
        CXGongFzScreen.prototype.set_caiyi = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = pproxy.cur_cxgfz.data;
            var type = Number(c_mn.caiyi_type); //才艺类型
            var num = Number(c_mn.caiyi_num); //才艺值
            view.caiyi_t.text = mx.Lang.hgcaiyi[type - 1] + "：" + num;
            var rank = Math.min(Math.floor(num / 50), 4);
            view.caiyi_desc.text = mx.Lang.hgcaiyi_rank[rank];
        };
        CXGongFzScreen.prototype.set_bg = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.bg_p.source = pproxy.hzhd_bg;
        };
        CXGongFzScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.xpin_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.anpai_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zzu_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.kkan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.cxing_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jjue_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.CXGFeiZiInfoMediator.NAME);
            this.jianjie_list.dataProvider = null;
            egret.Tween.removeTweens(this.jianjie_s.viewport);
            this.czfl_list.dataProvider = null;
            this.czfl_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        CXGongFzScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (e.currentTarget) {
                case this.back_b:
                    pproxy.not_friend = false;
                    if (pproxy.anpai) {
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
                        pproxy.anpai = false;
                    }
                    else if (pproxy.jianjie_type == 7) {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LDOtherZNScreen.S_NAME);
                    }
                    else if (pproxy.jianjie_type == 8) {
                        var id = this.feizi.data.ldjl_id;
                        var a_d = {
                            "param": mx.Lang.ld047,
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": {
                                "t": mx.MX_NETS.CS_LUEDUO_CHZHFL,
                                "id": id,
                                "type": 3
                            }
                        };
                        var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    else if (pproxy.jianjie_type == 11) {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ChatScreen.S_NAME);
                    }
                    else if (pproxy.jianjie_type == 14) {
                        var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                        dproxy.shijian_type = 1;
                        pproxy.zhiding_lyin = false;
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ShiJianScreen.S_NAME);
                    }
                    else {
                        var proxy = (facade.retrieveProxy(mx.CXGongProxy.NAME));
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_CXG_DATA,
                            "page": proxy.cxg_type == 1 ? proxy.cxg_page1 : proxy.cxg_page2,
                            "paixu": proxy.cxg_paixu,
                            "type": proxy.cxg_type,
                            "skill": proxy.cxg_type == 1 ? proxy.cxg_jn_slt || 0 : 0 //子女技能
                        });
                    }
                    break;
                case this.xpin_b://下聘
                    var fz_info = this.feizi.data;
                    var csd = { "t": mx.MX_NETS.CS_BUY_FEIZI, "id": fz_info.id, "pinli": fz_info.pinli };
                    var str = void 0;
                    if (mx.MX_COMMON.IN_GUIDE == 2 && mx.MX_COMMON.GUIDE_SHARE) {
                        csd.first = 1; //检查第一次是否免费
                        str = mx.Lang.g0001;
                    }
                    else {
                        var pinli = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", fz_info.pinli);
                        var pProxy = (facade.retrieveProxy(mx.PackProxy.NAME));
                        var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", pinli.item_id);
                        var num = pProxy.get_item_num(Number(pinli.item_id));
                        str = num ? mx.Tools.format(mx.Lang.hg100, fz_info.name) : mx.Tools.format(mx.Lang.hg101, pinli.name, item.Buyprice2);
                    }
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": csd,
                            "param": str,
                        }
                    });
                    break;
                case this.anpai_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "type": 4,
                        "mid": pproxy.anpai_mid
                    });
                    break;
                case this.change_b:
                    var height = void 0;
                    if (e.currentTarget.scaleY == 1) {
                        height = 85;
                        e.currentTarget.scaleY = -1;
                    }
                    else {
                        height = 183;
                        e.currentTarget.scaleY = 1;
                    }
                    this.jianjie_s.height = height;
                    var yy = Math.max(this.jianjie_list.height - height, 0);
                    //this.jianjie_s.viewport.scrollV = yy;
                    egret.Tween.get(this.jianjie_s.viewport).to({ "scrollV": yy }, 300);
                    break;
                case this.ef_g:
                    if (this.not_friend) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0126 });
                        return;
                    }
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HzsZNSkillView.S_NAME,
                        "param": pproxy.cur_cxgfz.data
                    });
                    break;
                case this.zzu_t:
                    // let c_mn = this.feizi.data;
                    // if(c_mn.zongzu_id){
                    //     facade.sendNotification(MX_NOTICE.CS_GET_DATA, {
                    //         "t" : MX_NETS.CS_PLAYER_INFO, "other_id" : c_mn.zongzu_id,
                    //     });
                    // }  
                    break;
                case this.kkan_b://收入后宫后，再看看
                    if (pproxy.anpai) {
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
                        pproxy.anpai = false;
                    }
                    else if (pproxy.jianjie_type == 11) {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ChatScreen.S_NAME);
                    }
                    else {
                        var proxy = (facade.retrieveProxy(mx.CXGongProxy.NAME));
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_CXG_DATA,
                            "page": proxy.cxg_type == 1 ? proxy.cxg_page1 : proxy.cxg_page2,
                            "paixu": proxy.cxg_paixu,
                            "type": proxy.cxg_type,
                            "skill": proxy.cxg_type == 1 ? proxy.cxg_jn_slt || 0 : 0 //子女技能
                        });
                    }
                    break;
                case this.cxing_b://去宠幸
                    pproxy.set_curr_mn(this.have_hougong.id);
                    //pproxy.que_scroller = this.all_s.viewport.scrollV;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": this.have_hougong.mid,
                        "type": 1
                    });
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.YXDFzScreen.S_NAME);
                    break;
                case this.jjue_b:
                    var fz = this.feizi.data;
                    var jjue_param = {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": { "t": mx.MX_NETS.CS_HZS_LIANYIN_JUJUE, "id": fz.id },
                            "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                            "sdata_exit": mx.AlertView.S_NAME,
                            "param": mx.Tools.format(mx.Lang.hg097, fz.zongzu_name),
                        }
                    };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, jjue_param);
                    break;
                case this.xt_t:
                    var target = this.xt_t;
                    var point = target.parent.localToGlobal(target.x, target.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "type": "blood",
                        "wenhua": this.wenhua,
                        "daishu": this.daishu,
                    });
                    break;
            }
        };
        CXGongFzScreen.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var id = this.feizi.data.ldjl_id;
            var type;
            if (!this.feizi.data.name) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    name: mx.HzEditPop.S_NAME,
                    param: { type: 1, data: this.feizi.data }
                });
                return;
            }
            switch (e.item.bg) {
                case "rjfsi_png"://教坊司
                    type = 2;
                    break;
                case "czflsrhgong_png"://求凤宫/
                    type = 3;
                    break;
                case "qfhguo_png"://遣返
                    type = 4;
                    break;
                case "zjcsi_png"://处死
                    type = 1;
                    break;
            }
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_LUEDUO_CHZHFL,
                "type": type,
                "id": id
            });
        };
        CXGongFzScreen.prototype.xpin_suc = function (data) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.have_hougong = data;
            view.jjue_g.width = 0;
            view.jjue_b.visible = false;
            view.hasGet_g.visible = true;
            view.btn_g.visible = false;
            view.sc_tshi.visible = true;
            if (mx.MX_COMMON.IN_GUIDE == 2) {
                view.sc_tshi.visible = false;
                this.cxing_b.visible = false;
                this.kkan_b.horizontalCenter = 0;
            }
            else if (pproxy.anpai) {
                this.kkan_b.visible = false;
                //this.cxing_b.horizontalCenter = 0;
            }
            else {
                this.needxp = view.xpin_b.visible = view.pli_t.visible = false;
                view.anpai_b.visible = false;
            }
        };
        CXGongFzScreen.S_NAME = "CXGongFzScreen";
        return CXGongFzScreen;
    }(mx.BasicView));
    mx.CXGongFzScreen = CXGongFzScreen;
    __reflect(CXGongFzScreen.prototype, "mx.CXGongFzScreen");
})(mx || (mx = {}));
//# sourceMappingURL=CXGongFzScreen.js.map