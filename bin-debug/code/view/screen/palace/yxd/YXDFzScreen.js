/**
*   @author mx
*   @date 2015.1.3
*   @desc 养心殿妃嫔操作，妃嫔事宜
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
    var YXDFzScreen = (function (_super) {
        __extends(YXDFzScreen, _super);
        function YXDFzScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isLD = false;
            _this.hero2zn = {
                "304": 63401,
                "305": 63402,
                "306": 63403,
                "307": 63404,
            };
            _this.weiba_event = "";
            _this.event = "";
            _this.daishu = 0;
            _this.wenhua = 1;
            return _this;
        }
        YXDFzScreen.mx_support = function () {
            return ["assets.palace_fzcz", "api.HEROHOUGONG", "api.XINGGE", "api.ZINVSKILL", "api.AVG", "api.JINJI", "api.XUETONGTIP"];
        };
        YXDFzScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_fz_dj"://赏赐道具
                    tar = this.fzcz_list.getChildAt(1);
                    break;
                case "s_fz_tw"://探望妃子
                    tar = this.fzcz_list.getChildAt(0);
                    break;
                case "s_fz_fh"://返回
                    tar = this.back_b;
                    break;
                default:
                    break;
            }
            return tar;
        };
        YXDFzScreen.prototype.init_view = function () {
            this.add_b.set_ssres("add_png");
            this.fzcz_list.itemRenderer = mx.SSButtonRender;
            this.mz_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jzname_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rlrh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hpi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fzcz_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.wqj_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.yh_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.wqjTip_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.mainlh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.wqj_g.visible = this.wqjTip_g.visible = false;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = pproxy.get_curr_mn();
            if (c_mn) {
                var ctime = (new Date().getTime()) / 1000;
                var delay = Math.floor(ctime - c_mn.time);
                if (delay <= 0) {
                    delay = 0;
                }
                if (c_mn.wqj_res == 0) {
                    this.wdjs = 0;
                }
                else {
                    this.wdjs = Number(c_mn.wqj_res) - delay;
                }
                if (this.wdjs > 0) {
                    this.wqj_g.visible = true; //酒杯、倒计时  显现
                    this.wdjs_t.text = mx.Tools.format_second(this.wdjs);
                    if (!this.wqjtimer) {
                        this.wqjtimer = new egret.Timer(1000);
                        this.wqjtimer.addEventListener(egret.TimerEvent.TIMER, this.wqjTimerFunc, this);
                        this.wqjtimer.start();
                    }
                }
                else {
                    this.wdjs = 0;
                }
            }
            this.fresh_screen();
            this.init_lh();
            this.fresh_weifen();
            this.fresh_ltp_num();
            this.set_xuetong();
            this.set_caiyi();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.YXDFzScreenMediator(this));
        };
        YXDFzScreen.prototype.init_lh = function () {
            var c_mn = this.c_mn;
            var mid = Number(c_mn.mid);
            this.rlrh_b.visible = false; //其他版本false
            if (mx.AppConfig.MXTag == "wb") {
                var c_f = mx.AppConfig.check_not_support("face");
                this.rlrh_b.visible = !c_f && mid >= 900 && mid < 1000;
            }
            if (window && window["mx_debug"]) {
                var debug_arr = window["mx_debug"];
                if (debug_arr.indexOf("face") > -1) {
                    this.rlrh_b.visible = true;
                }
            }
            var source = this.c_mn.sex == 1 ? "rlrhanv_png" : "rlrhaniu_png";
            this.rlrh_b.set_ssres(source);
            this.h = [85, 183];
            if (mid > 1000) {
                this.chsh_t.text = mx.Lang.cshen + "：" + c_mn.chushen || mx.Lang.wu;
                this.mn_p.set_lh(c_mn.avatar); //= Tools.get_zn_res(c_mn.avatar, "lh");
                if (this.wdjs == 0) {
                    this.bg.source = mx.Tools.get_bb_res("fzbg", null, c_mn.avatar);
                }
            }
            else {
                if (mid == 303) {
                    this.init_mn_dg();
                }
                else if (mid <= 307 && mid >= 304) {
                    this.huyao_sex = 'nanhu';
                    if (mx.Tools.check_drgon()) {
                        var wb = {
                            '304': 1,
                            '305': 3,
                            '306': 6,
                            '307': 9,
                        };
                        this.init_hy_dg("nanhu");
                        this.init_hy_dg("nvhu");
                        this.weiba_play("nanhu", wb[mid.toString()]);
                        this.weiba_play("nvhu", wb[mid.toString()]);
                        this.event = "cxian_over";
                        this.huyao_nan.display.visible = true;
                        this.huyao_nan.animation.play("cxian", 1);
                        this.weiba_event = "cxian_over";
                        this.weiba_nan.display.visible = true;
                        this.weiba_nan.animation.play("cxian", 1);
                    }
                    else {
                        var p = new eui.Image("zn" + (this.hero2zn[this.c_mn.mid] + (this.huyao_sex == "nanhu" ? 1000 : 0)) + "_png");
                        p.y = 180;
                        this.yh_g.addChild(p);
                    }
                    //8s后转换
                    this.timeout = egret.setTimeout(this.change_huyao, this, mx.Tools.check_drgon() ? 8000 : 4000, "nvhu");
                }
                else {
                    mx.Tools.renlian_change({ "view": this.mn_p, "width": 480, 'type': 'yxd' }, c_mn);
                    //this.mn_p.source = Tools.get_mn_res(mid, "lh");
                }
                var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
                this.chsh_t.text = mx.Lang.cshen + "：" + (api2 ? api2.chushen : mx.Lang.zssj);
                if (this.wdjs == 0) {
                    var whq_1 = api2 ? api2.wenhua : 1;
                    this.bg.source = mx.Tools.get_bb_res("fzbg", null, whq_1 * 10000);
                }
                this.gg.removeChildAt(1);
                //this.jn_g.visible = false;
            }
            this.hpi_b.visible = false; //非鬼族false
            var whq = mx.Tools.get_fz_whq(c_mn);
            if (whq == 7) {
                var skill = ['0'];
                if (c_mn.daishu) {
                    skill = c_mn.daishu.split('_');
                }
                //画皮
                if (mid == 308 || (Number(skill[0]) == 1) && Number(skill[1]) < 4) {
                    this.hpi_b.visible = true;
                    this.hpi_b.set_ssres(c_mn.huapi == '' ? "hpi_png" : "hpihui_png");
                }
                if (this.wdjs == 0) {
                    this.bg.source = "s1515_jpg";
                }
                if (c_mn.huapi != '') {
                    this.mn_p.set_lh(c_mn.huapi);
                }
            }
            var lproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.LueDuoProxy.NAME));
            if (lproxy.isLD) {
                this.hpi_b.visible = false;
            }
        };
        YXDFzScreen.prototype.add_static_hy = function () {
            var str = "zn" + (this.hero2zn[this.c_mn.mid] + (this.huyao_sex == "nanhu" ? 1000 : 0)) + "_png";
            var p = this.yh_g.getChildAt(0);
            p.source = str;
            p.y = 180;
            this.yh_g.addChildAt(p, 0);
        };
        YXDFzScreen.prototype.fresh_screen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            this.di_p.visible = true;
            if (lproxy.isLD) {
                this.isLD = true;
                this.c_mn = lproxy.cur_mn;
                this.fzcz_list.visible = false;
                this.di_p.visible = false;
                this.title_p.source = "fpxqing_png";
            }
            else {
                this.c_mn = pproxy.get_curr_mn();
            }
            var c_mn = this.c_mn;
            this.mname_t.text = c_mn.name;
            this.znz_t.text = mx.Lang.zn + "：" + (c_mn.haizi || c_mn.zinv || 0); //子女数暂无
            var t_arr = [{ "text": mx.Lang.zzu + "：", "style": { "textColor": 0xffffff } }];
            if (c_mn.zongzu) {
                t_arr.push({ "text": c_mn.zongzu, "style": { "underline": !this.isLD } });
            }
            else {
                t_arr.push({ "text": mx.Lang.wu, "style": { "underline": false } });
            }
            this.mz_t.textFlow = t_arr;
            if (Number(c_mn.jinzhu)) {
                this.jzname_t.visible = true;
                this.jzname_t.textFlow = [
                    { "text": mx.Lang.jzu + "：", "style": { "textColor": 0xffffff } },
                    { "text": c_mn.jz_name, "style": { "underline": true } }
                ];
            }
            else {
                if (this.jzname_t && this.jzname_t.parent) {
                    this.jzname_t.parent.removeChild(this.jzname_t);
                }
            }
            var xg_api;
            if (c_mn.xingge && c_mn.xingge != "") {
                xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", c_mn.xingge);
            }
            else if (Number(c_mn.mid) < mx.MX_COMMON.SC_MID_BASE) {
                var hapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", c_mn.mid);
                xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", hapi.xingge);
                hapi = null;
            }
            this.xg_t.text = mx.Lang.xge + "：" + (xg_api ? xg_api.xingge : "???");
            xg_api = null;
            this.old_bg = this.bg.source;
            if (this.wdjs > 0) {
                this.bg.source = "s1602_jpg";
                this.bg.scaleX = 1;
            }
            this.fresh_cz_list();
            if (!this.ef_g.numChildren) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
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
        YXDFzScreen.prototype.init_mn_dg = function () {
            if (this.dg_g.numChildren) {
                return;
            }
            if (mx.Tools.check_drgon()) {
                var armature = this.armature = mx.TweenTool.getInstance().get_dragon("zn54301", 2);
                var cdg = armature.display;
                this.dg_g.addChild(cdg);
                cdg.x = -120;
                cdg.y = -60;
                cdg.scaleX = 1.5;
                cdg.scaleY = 1.5;
                armature.animation.play();
            }
            else {
                this.dg_g.addChild(new eui.Image("zn54301_png"));
            }
        };
        YXDFzScreen.prototype.init_hy_dg = function (name) {
            var armature = mx.TweenTool.getInstance().get_dragon(name, 2);
            this.yh_g.addChild(armature.display);
            armature.display.x = 360;
            armature.display.y = mx.Tools.screen_height / 2;
            armature.display.scaleX = armature.display.scaleY = 1;
            armature.animation.timeScale = 1.2;
            armature.display.visible = name == "nanhu";
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.huyao_loop, this);
            armature.animation.play("zding", 0);
            name == "nanhu" ? this.huyao_nan = armature : this.huyao_nv = armature;
        };
        YXDFzScreen.prototype.change_huyao = function (name) {
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            //烟雾
            var ef = new mx.GeneralEffect("yhywu");
            ef.play_by_times(1); //只播放一次
            ef.horizontalCenter = 0;
            ef.verticalCenter = 450;
            this.yh_g.addChild(ef);
            this.huyao_sex = name;
            //转为狐妖女
            if (name == "nvhu") {
                if (mx.Tools.check_drgon()) {
                    this.event = "xshi_over";
                    this.huyao_nan.animation.play("xshi", 1);
                    this.weiba_event = "xshi_over";
                    this.weiba_nan.animation.play("xshi", 1);
                    this.event = "cxian_over";
                    this.huyao_nv.display.visible = true;
                    this.huyao_nv.animation.play("cxian", 1);
                    this.weiba_event = "cxian_over";
                    this.weiba_nv.display.visible = true;
                    this.weiba_nv.animation.play("cxian", 1);
                }
                else {
                    this.add_static_hy();
                }
            }
            else {
                if (mx.Tools.check_drgon()) {
                    this.event = "xshi_over";
                    this.huyao_nv.animation.play("xshi", 1);
                    this.weiba_event = "xshi_over";
                    this.weiba_nv.animation.play("xshi", 1);
                    this.event = "cxian_over";
                    this.huyao_nan.display.visible = true;
                    this.huyao_nan.animation.play("cxian", 1);
                    this.weiba_event = "cxian_over";
                    this.weiba_nan.display.visible = true;
                    this.weiba_nan.animation.play("cxian", 1);
                }
                else {
                    this.add_static_hy();
                }
            }
            //8s后再次转换 
            this.timeout = egret.setTimeout(this.change_huyao, this, mx.Tools.check_drgon() ? 8000 : 4000, name == 'nvhu' ? "nanhu" : "nvhu");
        };
        YXDFzScreen.prototype.weiba_loop = function (evt) {
            var obj = this.huyao_sex == 'nanhu' ? this.weiba_nan : this.weiba_nv;
            switch (this.weiba_event) {
                case "cxian_over":
                    //出现后转站定
                    obj.animation.play("zding", 0);
                    break;
                case "xshi_over":
                    obj.display.visible = false;
                    obj.animation.play("zding", 0);
                    //obj.animation.stop();
                    break;
            }
            this.weiba_event = "";
        };
        YXDFzScreen.prototype.huyao_loop = function (evt) {
            var obj = this.huyao_sex == 'nanhu' ? this.huyao_nan : this.huyao_nv;
            switch (this.event) {
                case "cxian_over":
                    //出现后转站定
                    obj.animation.play("zding", 0);
                    break;
                case "xshi_over":
                    obj.display.visible = false;
                    obj.animation.play("zding", 0);
                    // obj.animation.stop();
                    break;
            }
            this.event = "";
        };
        YXDFzScreen.prototype.weiba_play = function (name, wb) {
            var armature = mx.TweenTool.getInstance().get_dragon(name + wb);
            this.yh_g.addChild(armature.display);
            armature.display.x = 337.5;
            armature.display.y = mx.Tools.screen_height / 2;
            armature.display.scaleX = armature.display.scaleY = 0.8;
            armature.animation.timeScale = 1;
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.weiba_loop, this);
            armature.animation.play("zding", 0);
            armature.display.visible = false;
            name == "nanhu" ? this.weiba_nan = armature : this.weiba_nv = armature;
            var idx1 = this.yh_g.getChildIndex(name == "nanhu" ? this.huyao_nan.display : this.huyao_nv.display);
            var idx2 = this.yh_g.getChildIndex(name == "nanhu" ? this.weiba_nan.display : this.weiba_nv.display);
            if (idx1 < idx2) {
                this.yh_g.setChildIndex(name == "nanhu" ? this.huyao_nan.display : this.huyao_nv.display, idx2);
                this.yh_g.setChildIndex(name == "nanhu" ? this.weiba_nan.display : this.weiba_nv.display, idx1);
            }
        };
        YXDFzScreen.prototype.set_jianjie = function () {
            this.jianjie_list.dataProvider = new eui.ArrayCollection(mx.Tools.get_jianjie(this.c_mn.sex));
            this.jianjie_s.height = this.h[0];
            this.jianjie_s.viewport.validateNow();
            var cur_height = this.jianjie_list.measuredHeight ? this.jianjie_list.measuredHeight : this.jianjie_list.height;
            var yy = Math.max(cur_height - this.h[0], 0);
            this.jianjie_s.viewport.scrollV = yy;
            //let height = Tools.screen_height;
            //this.jianjie_g.top = 65 + Math.ceil((height - 65 - 450 - 146) / 2);
            this.change_b.scaleY = -1;
        };
        YXDFzScreen.prototype.set_xuetong = function () {
            var info = mx.Tools.get_xuetong_info(this.c_mn);
            this.daishu = info.daishu;
            this.wenhua = info.wenhua;
            this.xt_t.textFlow = [{ "text": mx.Lang.fzxt + "：" }, { "text": info.str, "style": { "underline": true } }];
        };
        YXDFzScreen.prototype.set_caiyi = function () {
            var view = this;
            var c_mn = this.c_mn;
            var caiyi_arr = [];
            if (Number(c_mn.mid) < 1000) {
                for (var i = 1; i <= 2; i++) {
                    var type = Number(c_mn["caiyi" + i + "_type"]); //才艺类型
                    if (type) {
                        var num = Number(c_mn["caiyi" + i + "_num"]); //才艺值
                        type = mx.Lang.hgcaiyi[type - 1] + "：" + num;
                        var rank = Math.min(Math.floor(num / 50), 4);
                        var desc = mx.Lang.hgcaiyi_rank[rank];
                        caiyi_arr.push({ "type": type, "desc": desc });
                    }
                }
            }
            else {
                var type = Number(c_mn.caiyi_type); //才艺类型
                var num = Number(c_mn.caiyi_num); //才艺值
                type = mx.Lang.hgcaiyi[type - 1] + "：" + num;
                var rank = Math.min(Math.floor(num / 50), 4);
                var desc = mx.Lang.hgcaiyi_rank[rank];
                caiyi_arr.push({ "type": type, "desc": desc });
            }
            this.caiyi_list.dataProvider = new eui.ArrayCollection(caiyi_arr);
        };
        YXDFzScreen.prototype.fresh_ltp_num = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            if (lproxy.isLD) {
                this.ltp_p.visible = this.ltp_t.visible = this.add_b.visible = false;
            }
            else {
                this.ltp_t.text = mx.Tools.format(mx.Lang.hg013, pproxy.res_ltp.num);
            }
            var c_mn = this.c_mn;
            this.caz_t.text = mx.Lang.ca + "：" + c_mn.pet;
            this.fzcz_list.touchChildren = true;
        };
        YXDFzScreen.prototype.fresh_weifen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var c_mn = this.c_mn;
            var wf;
            if (lproxy.isLD) {
                wf = c_mn.weifen;
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_mn.weifen);
                wf = Number(c_mn.sex) == 1 ? api.weifeng : api.weifenb; //位分
            }
            if (c_mn.cizi) {
                wf = c_mn.cizi + wf;
            }
            this.weifen_t.text = mx.Lang.wfen + "：" + wf;
            this.mname_t.textColor = mx.Tools.num2color(c_mn.meili);
            //this.mlz_t.text = Lang.mli + "：" + c_mn.meili;
            this.set_jianjie();
        };
        YXDFzScreen.prototype.fresh_cz_list = function () {
            var c_mn = this.c_mn;
            var arr = [
                { "bg": "lxing_png" },
                { "bg": "scdju_png" },
                { "bg": "wfen_png" },
                { "bg": "znv_png" },
                { "bg": "drlgong_png" },
            ];
            if (Number(c_mn.status) != 0 || Number(c_mn.sb_level)) {
                arr[0].bg = "twang_png";
            }
            // if (c_mn.cizi != "") {
            //     arr[5].bg = "xzi_png";
            // }
            this.fzcz_list.dataProvider = new eui.ArrayCollection(arr);
        };
        YXDFzScreen.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = this.c_mn;
            switch (e.item.bg) {
                case "lxing_png": //临幸
                case "twang_png"://探望
                    var ltp = pproxy.res_ltp.num;
                    if (ltp < 1) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "param": mx.Lang.p0055
                            }
                        });
                    }
                    else {
                        var view = this;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_YXD_SHIQIN,
                            "id": c_mn.id
                        });
                    }
                    break;
                case "znv_png"://子女
                    pproxy.cur_fzzn_id = c_mn.id;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_YXD_CHILDREN,
                        "id": c_mn.id,
                    });
                    break;
                case "wfen_png"://册封位分
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HOUGONG_WEIFEN,
                        "mid": c_mn.mid
                    });
                    break;
                case "drlgong_png"://打入冷宫
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_LENGGONG_NUM,
                        "id": c_mn.id,
                        "type": 0 //正常操作
                    });
                    // facade.sendNotification(MX_NOTICE.POP_VIEW, {
                    //     "name": AlertView.S_NAME,
                    //     "param": {
                    //         "param": Tools.format(Lang.hg010, c_mn.name),
                    //         "notice_ok": MX_NOTICE.CS_GET_DATA,//暂时直接打开结果
                    //         "sdata_ok": {
                    //             "t": MX_NETS.CS_LENGGONG_NUM,//MX_NETS.CS_YXD_LENGGONG,
                    //             "id": c_mn.id
                    //         }
                    //     }
                    // });
                    break;
                // case "czi_png"://赐字
                //     facade.sendNotification(MX_NOTICE.POP_VIEW, {
                //         "name": YXDCiZiAlert.S_NAME
                //     });
                //     break;
                // case "xzi_png"://取消赐字
                //     facade.sendNotification(MX_NOTICE.POP_VIEW, {
                //         "name": AlertView.S_NAME,
                //         "param": {
                //             "param": Lang.hg021,
                //             "notice_ok": MX_NOTICE.CS_GET_DATA,//暂时直接打开结果
                //             "sdata_ok": {
                //                 "t": MX_NETS.CS_YXD_PF_XIAOZI,
                //                 "id": c_mn.id
                //             },
                //         }
                //     });
                //     break;
                case "scdju_png"://赏赐道具
                    var net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11",
                        }];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.YXDGiftScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
            }
        };
        YXDFzScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = this.c_mn;
            switch (e.currentTarget) {
                case this.add_b://购买绿头牌
                    var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", gproxy.user_vip || 0);
                    var a_d = {
                        "param": {
                            "gmn": 1,
                            "icon": "tl_png",
                            "res_n": pproxy.res_ltp.res,
                            "max_n": api.lvtoupai || 99,
                            "item": 2000,
                            "price": 10,
                        }
                    };
                    var p_d = {
                        "name": mx.BuyAlertView.S_NAME,
                        "param": a_d
                    };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case this.mz_t://跳转到其他用户界面，需要先发送请求
                    if (!this.isLD && c_mn.zongzu_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": c_mn.zongzu_id,
                        });
                    }
                    break;
                case this.jzname_t://跳转到其他用户界面，需要先发送请求
                    if (c_mn.zongzu_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": c_mn.jinzhu,
                        });
                    }
                    break;
                case this.back_b://只能返回养心殿
                    if (mx.AppConfig.PREV_SCENE_ID == mx.ShiJianScreen.S_NAME) {
                        var pproxy_1 = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
                        pproxy_1.set_curr_mn(null);
                        var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                        dproxy.shijian_type = 1;
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ShiJianScreen.S_NAME);
                    }
                    else {
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
                    break;
                case this.change_b:
                    var height = void 0;
                    var yy = void 0;
                    if (e.currentTarget.scaleY == 1) {
                        height = this.h[0];
                        e.currentTarget.scaleY = -1;
                        yy = Math.max(this.jianjie_list.measuredHeight - height, 0);
                    }
                    else {
                        height = this.h[1];
                        e.currentTarget.scaleY = 1;
                        yy = 0;
                    }
                    this.jianjie_s.height = height;
                    this.jianjie_s.validateNow();
                    egret.Tween.get(this.jianjie_s.viewport).to({ "scrollV": yy }, 300);
                    break;
                case this.ef_g:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HzsZNSkillView.S_NAME,
                        "param": this.c_mn
                    });
                    break;
                case this.wqj_b:
                case this.wqjTip_g:
                    var arr = Number(c_mn.status) + "";
                    var yun_arr = ['2', '3', '4']; //是否怀孕
                    for (var m in yun_arr) {
                        if (arr.indexOf(yun_arr[m]) >= 0) {
                            var str = mx.Tools.format(mx.Lang.hgwqjhy, c_mn.name);
                            this.wqjTip_t.textFlow = mx.Tools.setKeywordColor2(str, [mx.Tools.num2color(c_mn.meili)]);
                            break;
                        }
                        if (Number(m) == 2) {
                            var str = mx.Tools.format(mx.Lang.hgwqj, c_mn.name);
                            this.wqjTip_t.textFlow = mx.Tools.setKeywordColor2(str, [mx.Tools.num2color(c_mn.meili), 0xffe328]);
                        }
                    }
                    this.wqjTip_g.visible = !this.wqjTip_g.visible;
                    break;
                case this.rlrh_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.RenLianAlert.S_NAME,
                        "param": this.c_mn
                    });
                    break;
                case this.hpi_b:
                    if (this.hpi_b.res_name == 'hpi_png') {
                        //打开已去世弹窗 选择一个画皮
                        var proxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
                        proxy.new_page = true;
                        proxy.die_fz_select = false;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_XGS_FEIZI,
                            "page": 1,
                            "size": 8
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                            "text": mx.Lang.gz0011
                        });
                    }
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
                case this.mainlh_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_MAIN_LH,
                        "y_id": c_mn.id,
                    });
                default:
                    this.wqjTip_g.visible = false;
            }
        };
        YXDFzScreen.prototype.wqjTimerFunc = function () {
            if (!this.skin) {
                return;
            }
            if (this.wdjs <= 1) {
                this.wqj_g.visible = this.wqjTip_g.visible = false;
                this.bg.source = this.old_bg;
                this.bg.scaleX = -1;
            }
            else {
                this.wdjs--;
                this.wdjs_t.text = mx.Tools.format_second(this.wdjs);
            }
        };
        YXDFzScreen.prototype.open_die_fz = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.XGSProxy.NAME));
            if (proxy["xgs_list0"]) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.DieFzView.S_NAME });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.gz0010
                });
            }
        };
        YXDFzScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            if (this.wqjtimer) {
                this.wqjtimer.stop();
                this.wqjtimer.removeEventListener(egret.TimerEvent.TIMER, this.wqjTimerFunc, this);
                this.wqjtimer = null;
            }
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
            wproxy.setTx(false);
            this.mz_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jzname_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rlrh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hpi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.mainlh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jianjie_list.dataProvider = null;
            this.fzcz_list.dataProvider = null;
            this.fzcz_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            dragonBones.WorldClock.clock.clear();
            this.huyao_nan = null;
            this.huyao_nv = null;
            this.weiba_nan = null;
            this.weiba_nv = null;
            egret.Tween.removeTweens(this.jianjie_s.viewport);
            mx.ApplicationFacade.getInstance().removeMediator(mx.YXDFzScreenMediator.NAME);
        };
        YXDFzScreen.S_NAME = "YXDFzScreen";
        return YXDFzScreen;
    }(mx.BasicView));
    mx.YXDFzScreen = YXDFzScreen;
    __reflect(YXDFzScreen.prototype, "mx.YXDFzScreen");
})(mx || (mx = {}));
//# sourceMappingURL=YXDFzScreen.js.map