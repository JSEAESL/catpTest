/**
 *   @author mx wf
 *   @date 2017.1.5
 *   @desc 掠夺敌人弹窗
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
    var LDDRAlert = (function (_super) {
        __extends(LDDRAlert, _super);
        function LDDRAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDDRAlert.mx_support = function () {
            return ["assets.lddralert", "api.JINJI", "api.QUALITYADD", "api.STARADD", "api.SKILLNEW", "api.SKILLNEWGROUP", "api.EQUIP"];
        };
        LDDRAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.LDDRAlertMediator(this));
            var view = this;
            var cd = this.adata.data;
            view.name_t.text = cd.name;
            view.vip_t.text = cd.vip + '';
            view.lv_t.text = "Lv." + cd.level;
            view.ldd_t.text = mx.Lang.ldd + " " + this.adata.mylueduo + "/100";
            //view.head_p.source = cd.avatar <= 3 || cd.avatar == 'ztou' ? "tx78_" + cd.avatar + "_png" : '';
            var fy = Number(cd.fangyu);
            var hznum = Number(cd.haizi_num);
            var fymax = 40 + 40 * Number(cd.xian_level);
            cd.fymax = fymax;
            var now_time = Math.floor(new Date().getTime() / 1000);
            var xy_state = now_time < Number(cd.xiuyang);
            if (xy_state) {
                view.head_p.source = 'tx70_shps_png';
            }
            else if (fy < fymax * 0.5 && fy >= 0) {
                view.head_p.source = 'tx70_cjlian_png';
            }
            else {
                view.head_p.source = "tx70_" + cd.avatar + "_png";
            }
            view.fyd_t.text = cd.fangyu + "/" + cd.fymax;
            view.gk_t.text = cd.guoku + "";
            // view.qmd_t.text= cd.qinmi + '';
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TAIMIAO, 'id', cd.xian_level);
            view.xlv_t.text = api.name;
            this.hg_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zn_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var user_xian = gproxy.user_xlv;
            var kouchu;
            if (user_xian > cd.xian_level) {
                kouchu = 20 - (user_xian - cd.xian_level) * 2;
            }
            else {
                kouchu = 20 - (user_xian - cd.xian_level);
            }
            kouchu *= 2;
            var ybi = Math.ceil((kouchu / cd.fymax) * cd.guoku);
            this.jl_t.text = "+" + ybi;
            var arr = [];
            arr.push({ "txt": mx.Lang.ld026 + "-" + kouchu });
            arr.push({ "txt": mx.Lang.ld027 + "-10" });
            this.jl_list.dataProvider = new eui.ArrayCollection(arr);
            var res_time = 0;
            if (cd.guishu.name) {
                var now_time_1 = Math.ceil(new Date().getTime() / 1000);
                this.res_time = Number(cd.guishu.time);
                this.gsq_name = cd.guishu.name;
            }
            this.set_que();
            this.set_djs();
            if (mx.AppConfig.CURR_SCENE_ID == mx.ChatScreen.S_NAME) {
                this.ok_b.set_ssres("xzfji_png");
            }
        };
        LDDRAlert.prototype.set_que = function () {
            var view = this;
            var arr = [];
            var zli = 0;
            var c_d = this.adata.data;
            for (var j in c_d.battle_info) {
                if (j == 'zhanwei') {
                    continue;
                }
                var obj = {};
                var hero = c_d.battle_info[j];
                obj.equip = hero.equip;
                obj.level = hero.hero_info.level;
                obj.mid = hero.hero_info.did;
                obj.quality = hero.hero_info.quality;
                obj.star = hero.hero_info.star;
                obj.skills = hero.skill_list;
                for (var t in hero.battle_soul) {
                    if (typeof hero.battle_soul[t].level == "undefined") {
                        hero.battle_soul[t] = { "level": hero.battle_soul[t] };
                    }
                }
                obj.fy_skill = hero.battle_soul;
                obj.cor = 0xad7680;
                obj.chicun = 90;
                obj.rtype = "tzpop";
                arr.push(obj);
                var nine_word = hero.nine_word || [0, 0, 0, 0, 0, 0, 0, 0, 0];
                zli += mx.FightTools.cal_fight_power(obj, null, this.adata.dress, this.adata.all_mid, nine_word);
            }
            view.zl_t.text = "" + zli;
            arr.reverse();
            view.team_list.itemRenderer = mx.TeamHeroRender2;
            view.team_list.dataProvider = new eui.ArrayCollection(arr);
        };
        LDDRAlert.prototype.set_djs = function (data) {
            var c_d = this.adata.data;
            if (data) {
                this.res_time -= data.delay;
            }
            if (this.res_time > 0) {
                var str = mx.Tools.format(mx.Lang.ld089, this.gsq_name, mx.Tools.format_second(this.res_time));
                this.gsq_t.textFlow = mx.Tools.setKeywordColor2(str, [mx.Tools.num2color(200), 0x729757]);
                this.gsq_g.visible = true;
                this.gsq_g.height = 16;
            }
            else {
                this.gsq_g.visible = false;
                this.gsq_g.height = 0;
                this.gsq_t.text = "";
            }
            var state = Number(this.adata.hg_zt.zhuangtai);
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            if (Number(this.adata.data.xian_level) < 9 || gproxy.user_xlv < 9) {
                state = 4;
            }
            var cor = state == 2 || state == 3 ? 0x729757 : mx.Tools.num2color(200);
            var str2 = state == 2 || state == 3 ? mx.Lang.ld079 : mx.Lang.ld080;
            var str3 = "{0" + str2 + "0}";
            this.state_t.textFlow = mx.Tools.setKeywordColor2(str3, [cor]);
        };
        LDDRAlert.prototype.set_guishu = function (data) {
            var now_time = Math.ceil(new Date().getTime() / 1000);
            this.res_time = Number(data.time) - now_time;
            this.gsq_name = data.name;
            this.set_djs;
        };
        LDDRAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hg_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zn_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jl_list.dataProvider = null;
            this.team_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.LDDRAlertMediator.NAME);
        };
        LDDRAlert.prototype.btn_click = function (evt) {
            var view = this;
            var c_d = this.adata.data || {};
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            lproxy.setLD(true);
            switch (evt.currentTarget) {
                case view.bg_rect:
                case view.exit_b:
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, LDDRAlert.S_NAME);
                    break;
                case view.ok_b:
                    //lproxy.fight_type = "fight";
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_LUEDUO_CHECK,
                        "id": c_d.user_id
                    });
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, LDDRAlert.S_NAME);
                    break;
                case view.hg_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FRIEND_HGONG,
                        "other_id": c_d.user_id,
                        'page': 1,
                        'page_limit': 8,
                    });
                    if (mx.AppConfig.CURR_SCENE_ID == mx.ChatScreen.S_NAME) {
                        mx.YXDianScreen.P_NAME = mx.ChatScreen.S_NAME;
                    }
                    break;
                case view.zn_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_OTHER_ZINV,
                        "id": c_d.user_id
                    });
                    if (mx.AppConfig.CURR_SCENE_ID == mx.ChatScreen.S_NAME) {
                        mx.LDOtherZNScreen.P_NAME = mx.ChatScreen.S_NAME;
                    }
                    break;
                case view.zdjs_b:
                    ////console.log("加速");
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ZhandouJiasuView.S_NAME
                    });
                    break;
            }
        };
        LDDRAlert.S_NAME = "LDDRAlert";
        return LDDRAlert;
    }(mx.AlertView));
    mx.LDDRAlert = LDDRAlert;
    __reflect(LDDRAlert.prototype, "mx.LDDRAlert");
})(mx || (mx = {}));
//# sourceMappingURL=LDDRAlert.js.map