/**
*   @author mx
*   @date 2015.1.3
*   @desc 养心殿妃嫔操作
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
    var HzHudongScreen = (function (_super) {
        __extends(HzHudongScreen, _super);
        function HzHudongScreen(cd) {
            var _this = _super.call(this, cd) || this;
            _this.type = "hzs"; //默认为皇子所
            _this.daishu = 0;
            _this.wenhua = 1;
            return _this;
        }
        HzHudongScreen.mx_support = function () {
            return ["assets.palace_hzsuo_hdong", "api.JINJI", "api.PINGJIA", "api.GUANXI", "api.XINGGE", "api.XUANZE", "api.ZINVSKILL", "api.XUETONGTIP"];
        };
        HzHudongScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_zn_tw"://子女探望
                    tar = this.hzscz_list.getChildAt(0);
                    break;
                case "s_zn_tw1":
                    tar = this.back_b;
                    tar.x -= 10;
                    break;
            }
            return tar;
        };
        HzHudongScreen.prototype.init_view = function () {
            this.add_b.set_ssres("add_png");
            this.hzscz_list.itemRenderer = mx.SSButtonRender;
            this.xgscz_list.itemRenderer = mx.SSButtonRender;
            this.xt_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xt_click, this);
            this.guide_g.touchEnabled = this.guide_g.touchChildren = false;
            this.fresh_object();
            this.init_screen();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HzHudongScreenMediator(this));
        };
        HzHudongScreen.prototype.fresh_object = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = this.c_mn = pproxy.cur_zn_info;
            var xproxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
            if (xproxy.cur_xgs_type > 0) {
                switch (xproxy.cur_xgs_type) {
                    case 1://未婚过世
                        this.type = "whgs";
                        break;
                    case 2://离宫过世
                        this.type = "lggs";
                        break;
                }
                this.c_mn = xproxy.get_object();
            }
            else if (pproxy.taifu_type > 0) {
                this.type = "hly";
            }
        };
        HzHudongScreen.prototype.init_screen = function () {
            var view = this;
            var c_mn = this.c_mn;
            var state = Number(c_mn.zhuangtai);
            switch (this.type) {
                case "hzs":
                case "hly":
                    //背景
                    var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
                    view.bg.source = pproxy.hzhd_bg;
                    //状态
                    this.ztai_t.text = mx.Lang.ztai + "：" + mx.Lang.ztaiarr[state + 1];
                    if (Number(c_mn.sb_level) && state != -1) {
                        this.ztai_t.textFlow = [
                            { "text": mx.Lang.ztai + "：" },
                            { "text": mx.Lang.ysjj, "style": { "underline": true, "textColor": mx.Tools.num2color(1, true) } }
                        ];
                    }
                    //底部子女操作按钮
                    this.hzs_di.visible = true;
                    this.xgs_di.visible = false;
                    var arr = [
                        { "bg": (state < 2 && state >= 0) ? "znhdtwang_png" : "znhdzjian_png" },
                        { "bg": "scdjaniu_png" },
                        { "bg": "znhdlrpjia_png" },
                        { "bg": "znhdhyzji_png" },
                        { "bg": "znhdznv_png" },
                    ];
                    this.hzscz_list.dataProvider = new eui.ArrayCollection(arr);
                    this.hzscz_list.validateNow();
                    break;
                case "whgs":
                case "lggs":
                    //背景
                    view.bg.source = "s1515_jpg";
                    //标题
                    view.title.source = this.type == "whgs" ? "whgsznbti_png" : "lggsznbti_png";
                    if (view.title.source == "lggsznbti_png") {
                        view.title.top = 10;
                    }
                    //去掉四书五经
                    view.sswj_g.visible = false;
                    //状态→谥号
                    this.fresh_shihao();
                    //底部操作列表
                    this.fresh_caozuo();
                    break;
            }
            state = Number(c_mn.zhuangtai);
            //立绘
            view.mn_p.source = mx.Tools.get_bb_res("lh", state, c_mn.avatar, c_mn.meili);
            //姓名
            this.mname_t.text = c_mn.name == "" ? mx.Lang.hg023 : c_mn.name;
            //出身
            this.chsh_t.text = mx.Lang.cshen + "：" + (c_mn.fenghao == "" ? (mx.Tools.num2chinese(c_mn.paiwei) + (Number(c_mn.sex) == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04)) : c_mn.fenghao);
            //关系
            this.fresh_guanxi();
            //才艺
            this.fresh_caiyi();
            //未成年--评价 成年---性格
            if (state >= 0 && state < 2) {
                this.fresh_pingjia(c_mn.pingjia);
            }
            else {
                this.fresh_xingge(c_mn.xingge);
            }
            //生母
            var muzu = c_mn.muzu;
            if (mx.MX_COMMON.IN_GUIDE) {
                var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GuideProxy.NAME);
                muzu = gproxy.slt_info['name'] + "|" + c_mn.muzu.split('|')[1];
            }
            var muzu_arr = muzu.split('|');
            this.smu_t.textFlow = [{ "text": (muzu_arr[1] == 1 ? mx.Lang.smu : mx.Lang.sfu) + '：', "style": { "textColor": 0xffffff } }, { "text": muzu_arr[0], "style": { "textColor": 0xFFFFFF } }];
            //婚配
            if (c_mn.hunpei == "") {
                this.hpei_t.text = mx.Lang.hpei + "：" + mx.Lang.swhp;
            }
            else {
                this.hpei_t.textFlow = [
                    { "text": mx.Lang.hpei + "：", "style": { "textColor": 0xffffff } },
                    { "text": c_mn.hunpei, "style": { "textColor": 0xFF0000, "underline": true } }
                ];
            }
            this.h = [85, 183];
            this.jn_g.visible = true;
            this.diban_p.source = "znhdxxldban_png";
            if (!this.ef_g.numChildren) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
            this.fresh_weifen();
            if (this.type == "hzs" || this.type == "hly") {
                this.fresh_sswj_num();
            }
            this.fresh_jianjie();
            this.set_xuetong();
            if ((this.type == "hzs" || this.type == "hly") && Number(c_mn.zhuangtai) <= 2) {
                this.g_g.removeChildAt(this.g_g.numChildren - 3);
                this.g_g.removeChildAt(this.g_g.numChildren - 2);
            }
        };
        HzHudongScreen.prototype.fresh_xgs = function () {
            this.fresh_shihao();
            this.fresh_jianjie();
            this.fresh_caozuo();
        };
        HzHudongScreen.prototype.fresh_shihao = function () {
            var xproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XGSProxy.NAME));
            this.ztai_t.text = mx.Lang.shihao + "：" + xproxy.get_shihao(this.c_mn.id);
        };
        HzHudongScreen.prototype.fresh_jianjie = function () {
            this.fresh_object();
            var c_mn = this.c_mn;
            this.jianjie_list.dataProvider = new eui.ArrayCollection(mx.Tools.get_jianjie(c_mn.sex, c_mn.id));
            this.jianjie_s.height = this.h[0];
            this.jianjie_s.viewport.validateNow();
            var cur_height = this.jianjie_list.measuredHeight ? this.jianjie_list.measuredHeight : this.jianjie_list.height;
            var yy = Math.max(cur_height - this.h[0], 0);
            this.jianjie_s.viewport.scrollV = yy;
            var guanxi = "";
            var xin = Number(c_mn.guanxi);
            this.change_b.scaleY = -1;
            for (var i in c_mn.skill) {
                var name_1 = "";
                var desc = "";
                if (Number(c_mn.skill[i]) <= 0) {
                    name_1 = mx.Lang.hzs75;
                }
                else {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", c_mn.skill[i]);
                    name_1 = api.name;
                }
                this["jneng" + (Number(i) + 1) + "_t"].text = name_1;
                if (name_1 != mx.Lang.hzs75) {
                    this["jneng" + (Number(i) + 1) + "_t"].textColor = 0x72bd6a;
                }
            }
        };
        HzHudongScreen.prototype.set_xuetong = function () {
            var info = mx.Tools.get_xuetong_info(this.c_mn);
            this.daishu = info.daishu;
            this.wenhua = info.wenhua;
            this.xt_t.textFlow = [{ "text": mx.Lang.fzxt + "：" }, { "text": info.str, "style": { "underline": true } }];
        };
        HzHudongScreen.prototype.fresh_caozuo = function () {
            var view = this;
            this.fresh_object();
            var c_mn = this.c_mn;
            //底部子女操作按钮
            this.hzs_di.visible = false;
            this.xgs_di.visible = true;
            var b1, b2;
            switch (this.type) {
                case "whgs":
                    b1 = c_mn.shihao == "" ? "zncfshao_png" : "zncfshhui_png";
                    break;
                case "lggs":
                    if (c_mn.shihao != "") {
                        if (Number(c_mn.shihao) == 1) {
                            b1 = "zfzhong_png";
                        }
                        else {
                            b1 = "yzfeng_png";
                        }
                    }
                    else {
                        b1 = "yqzfeng_png";
                    }
                    break;
            }
            var zhuan = Number(c_mn.zhuan);
            b2 = (zhuan == 2 || zhuan == 3) ? "lhzhong_png" : "zsttai_png";
            b2 = this.type == "lggs" ? "zstthui_png" : b2;
            var arr = [
                { "bg": b1 },
                { "bg": b2 }
            ];
            this.xgscz_list.dataProvider = new eui.ArrayCollection(arr);
        };
        HzHudongScreen.prototype.fresh_xingge = function (data) {
            var view = this;
            var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", data);
            view.pjia_t.text = mx.Lang.xge + '：' + (xg_api ? xg_api.xingge : "???");
        };
        HzHudongScreen.prototype.fresh_pingjia = function (data) {
            var c_mn = this.c_mn;
            var state = Number(c_mn.zhuangtai);
            if (state < 2 && state >= 0) {
                var view = this;
                var pj_api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINGJIA, "id", data);
                view.pjia_t.text = mx.Lang.pjia + '：' + (pj_api ? pj_api.keyword : "???");
            }
        };
        HzHudongScreen.prototype.fresh_sswj_num = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.sswj_t.text = mx.Tools.format(mx.Lang.hzs53, pproxy.res_sswj);
            var view = this;
            view.hzscz_list.touchChildren = true;
        };
        HzHudongScreen.prototype.fresh_guanxi = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = (this.type == "hzs" || this.type == "hly") ? pproxy.cur_zn_info : this.c_mn;
            var guanxi = "";
            var xin = Number(c_mn.guanxi);
            var num = Math.min(Math.floor(xin / 50), 3);
            var guanhuai = Math.min(num * 50, 150);
            if (xin < 0) {
                guanhuai = -100;
                num = -1;
            }
            var xin_arr = ["hzsssxin", "hzsssxin", "hzsqjxin", "hzsrmxin", "hzszqxin"];
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUANXI, "guanhuaizhi", guanhuai);
            guanxi = api.guanxi;
            view.gxi_t.text = mx.Lang.gxi + "：" + c_mn.guanxi;
            view.guanxi_desc.text = guanxi;
        };
        HzHudongScreen.prototype.fresh_caiyi = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = (this.type == "hzs" || this.type == "hly") ? pproxy.cur_zn_info : this.c_mn;
            var type = Number(c_mn.caiyi_type); //才艺类型
            var num = Number(c_mn.caiyi_num); //才艺值
            view.caiyi_t.text = mx.Lang.hgcaiyi[type - 1] + "：" + num;
            var rank = Math.min(Math.floor(num / 50), 4);
            view.caiyi_desc.text = mx.Lang.hgcaiyi_rank[rank];
        };
        HzHudongScreen.prototype.fresh_weifen = function () {
            var c_mn = this.c_mn;
            var wf = "";
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_mn.weifen);
            if (api) {
                wf = Number(c_mn.sex) == 1 ? api.weifeng : api.weifenb; //位分
                if (c_mn.cizi) {
                    wf = c_mn.cizi + wf;
                }
            }
            else {
                wf = mx.Lang.wu;
            }
            this.weifen_t.text = mx.Lang.wfen + "：" + wf;
            var state = Number(c_mn.zhuangtai);
            //this.mlz_t.text = Lang.mli + "：" + (state != -1 && state < 2 ? "???" : c_mn.meili);
            if (state >= 2) {
                this.mname_t.textColor = mx.Tools.num2color(c_mn.meili);
            }
        };
        HzHudongScreen.prototype.fresh_bb_res = function () {
            var view = this;
            var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = this.c_mn = pproxy.cur_zn_info;
            var state = Number(c_mn.zhuangtai);
            view.mn_p.source = mx.Tools.get_bb_res("lh", state, c_mn.avatar, c_mn.meili);
        };
        HzHudongScreen.prototype.on_remove = function () {
            mx.ApplicationFacade.getInstance().removeMediator(mx.HzHudongScreenMediator.NAME);
            egret.Tween.removeTweens(this.jianjie_s.viewport);
            this.xt_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xt_click, this);
        };
        HzHudongScreen.prototype.xt_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
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
        HzHudongScreen.S_NAME = "HzHudongScreen";
        HzHudongScreen.M_NAME = "HZSuoScreen";
        return HzHudongScreen;
    }(mx.BasicView));
    mx.HzHudongScreen = HzHudongScreen;
    __reflect(HzHudongScreen.prototype, "mx.HzHudongScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HzHudongScreen.js.map