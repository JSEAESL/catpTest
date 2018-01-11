/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 侍从介绍弹窗
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
    var HeroInfoView = (function (_super) {
        __extends(HeroInfoView, _super);
        function HeroInfoView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.touch_able = true;
            _this.flag = _this.adata.type == 'not';
            return _this;
        }
        HeroInfoView.mx_support = function () {
            return ["assets.teamxq", "api.HEROAURA", "api.SKILLNEW", "api.SKILLNEWGROUP", "api.QUALITYADD", "api.STARADD", "api.STARADD", "api.XUETONGTIP", "api.HEROXUETONG"];
        };
        HeroInfoView.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_xx_dh":
                    tar = this.get_b;
                    break;
            }
            return tar;
        };
        HeroInfoView.prototype.init_view = function () {
            var hero = this.adata.hero;
            var type = this.adata.type;
            if (type == 'not') {
                this.skill_scroll.top = 250;
            }
            else {
                this.skill_scroll.top = 220;
            }
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HeroInfoViewMediator(this));
            //技能
            if (type == 'not') {
                if (this.adata.xxiu) {
                    this.get_b.visible = false;
                }
                var c_base = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", hero);
                var skills = [{ "skill_id": c_base.id + '01', "skill_level": 1 }];
                hero = {
                    "id": 0,
                    "mid": c_base.id,
                    "star": c_base.InitialStars,
                    "quality": 1,
                    "level": c_base.InitialRank,
                    "equip": [],
                    "skills": mx.Tools.arr2obj(skills, "skill_id"),
                };
            }
            if (typeof hero.skills == "undefined") {
                var skills = [];
                var skill = {};
                if (hero.skill_level != "") {
                    skill = JSON.parse(hero.skill_level);
                }
                var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.SKILLNEWGROUP, "CasterID", hero.mid);
                for (var m in apis) {
                    if (hero.star >= Number(apis[m].Unlock) || skill[Number(apis[m].skill_id)]) {
                        var skill_id = Number(apis[m].skill_id);
                        var api_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, "skill_id", skill_id);
                        var skill_level = Number(api_1.InitLevel);
                        for (var k in skill) {
                            if (Number(k) == skill_id) {
                                skill_level += Number(skill[k]);
                                break;
                            }
                        }
                        skills.push({
                            "skill_id": skill_id,
                            "skill_level": skill_level
                        });
                    }
                }
                var ln = skills.length;
                if (typeof skills[ln - 1].wake == "undefined") {
                    skills[ln - 1].wake = 0;
                }
                hero.skills = mx.Tools.arr2obj(skills, "skill_id");
            }
            var item_info = [];
            var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            ;
            var cskills = hero.skills; //当前英雄技能
            var all_skills = mx.ApiTool.getAPINodes(mx.MX_APINAME.SKILLNEWGROUP, 'CasterID', hero.mid); //英雄所有技能
            for (var j in all_skills) {
                var skill = all_skills[j]; //当前校验的技能
                var stype = skill.SkillName.split("_")[1];
                if (stype == 'atk') {
                    continue;
                }
                //过滤没开启的觉醒技能
                if (skill.Awake == 'TRUE') {
                    continue; //kaiqi = false;
                }
                var cskill = cskills[skill.skill_id];
                var init_lv = Number(skill.InitLevel);
                var skill_lv = init_lv;
                var kaiqi = false;
                if (cskill) {
                    var h_lv = Number(hero.level);
                    skill_lv = cskill.skill_level;
                    if (h_lv >= init_lv) {
                        kaiqi = true;
                    }
                }
                item_info.push({
                    "hid": hero.id,
                    "skill_id": skill.skill_id,
                    "unlock": skill.Unlock,
                    "level": skill_lv,
                    "kaiqi": kaiqi
                });
            }
            item_info.sort(function (a, b) {
                return a.unlock - b.unlock;
            });
            //类型
            this.right1_g.visible = typeof this.adata.shuxing == 'undefined' ? true : false;
            this.right1_g.right = this.right1_g.visible ? 33 : -258;
            this.right2_g.visible = !this.right1_g.visible;
            this.right2_g.right = this.right2_g.visible ? 33 : -258;
            this.zhezhao.visible = this.right2_g.visible;
            this.notget_g.visible = type == 'not';
            this.have_r1_g.visible = !this.notget_g.visible;
            this.no_r1_g.visible = this.notget_g.visible;
            if (type == "not") {
                this.r2t_p.source = "xxsbti2_png";
                this.sm_b.top = 0;
                this.shuxing_g.top = 45;
                this.talent.visible = false;
            }
            //详细属性按钮
            this.xxsx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xuetong_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //立绘、名字、类型、星级、介绍
            this.avatar.source = mx.Tools.get_mn_res(hero.mid, "lh");
            var htype = this.htype;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", hero.mid);
            var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", hero.mid);
            var wenhua = Number(api2.wenhua);
            this.wenhua_p.source = "wenhua" + wenhua + "_png";
            var daishu_arr = [2, 5, 6, 7];
            if (daishu_arr.indexOf(wenhua) < 0) {
                if (this.xuetong_g.numChildren) {
                    this.xuetong_g.removeChildAt(0);
                }
            }
            switch (api.HeroType) {
                case "STRENGTH"://攻击
                    htype.source = "li_png";
                    break;
                case "AGILITY"://守御
                    htype.source = "min_png";
                    break;
                case "INTELLIGENCE"://辅助
                    htype.source = "zhi_png";
                    break;
            }
            switch (api.Talent) {
                case 1://普通
                    this.talent.source = "ptong_png";
                    break;
                case 2://优秀
                    this.talent.source = "yxiu_png";
                    break;
                case 3://珍稀
                    this.talent.source = "zxi_png";
                    break;
            }
            this.talent2.source = this.talent.source;
            var xx = this.xx;
            var param = {
                'num': hero.star,
                'total': mx.MX_COMMON.HP_LEVEL,
                'res': 'mrpyxx',
                'style': 'cz',
                'gap': (180 - mx.MX_COMMON.HP_LEVEL * 24) / (mx.MX_COMMON.HP_LEVEL - 1),
                'align': egret.VerticalAlign.TOP
            };
            xx.init_multiui(param);
            //侍从描述
            this.desc_t.text = api.Description;
            var common_xt = [1, 3, 4]; //中原、扶桑、神话
            if (common_xt.indexOf(api2.wenhua) > -1) {
                var zsjn = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROXUETONG, "h_id", hero.mid);
                zsjn = zsjn ? mx.Tools.format(mx.Lang.zsjn10, api2.hero_name, zsjn.note, zsjn.desc) : mx.Lang.zsjn09;
                this.desc_t.textFlow = [
                    { "text": api.Description, "style": { "textColor": 0x7e6d80 } },
                ];
            }
            //魂魄数量
            this.fresh_num();
            //光环效果
            var auar = String(api.aura);
            var arr2 = [];
            if (auar != "0") {
                var guanghuan = auar.split("|");
                for (var j in guanghuan) {
                    var id = Number(guanghuan[j]);
                    var icon = "psa" + id + "_png";
                    arr2.push({ "icon": icon, "id": id });
                }
            }
            this.buff_list.width = arr2.length * 69 - 15;
            this.buff_list.dataProvider = new eui.ArrayCollection(arr2);
            this.buff_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.touch_tab, this);
            var fate_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.HEROFATE, "h_id", hero.mid);
            var tar_fate;
            for (var k in fate_apis) {
                if (!mx.Tools.check_fate(fate_apis[k].id) && Number(k) <= this.buff_list.numElements - 1) {
                    tar_fate = this.buff_list.getElementAt(Number(k));
                    if (tar_fate) {
                        mx.Tools.mx_grayfy(tar_fate);
                    }
                }
            }
            var arr = ["STR", "INT", "AGI"];
            var c_arr = [mx.Lang.hp000, mx.Lang.hp001, mx.Lang.hp002];
            //成长属性
            var size = 22;
            var font = mx.MX_COMMON.DFT_FONT;
            var str = [];
            var t;
            var style1 = { "size": size, "textColor": 0x5C3C82, "fontFamily": font, "bold": true };
            var style2 = { "size": size, "textColor": 0x696980, "fontFamily": font, "bold": true };
            var style3 = { "size": size, "textColor": 0x696980, "fontFamily": font, "bold": true };
            var AGI = "AGI" + hero.star;
            var INT = "INT" + hero.star;
            var STR = "STR" + hero.star;
            var h = mx.FightTools.get_hero(hero.mid);
            for (var k in arr) {
                t = arr[k];
                str.push({ text: c_arr[k], style: style1 }, { text: h[t + hero.star] + "\n", style: style2 });
            }
            //详细属性
            var cd = mx.FightTools.cal_hero_prop(hero);
            for (var key in cd) {
                t = cd[key];
                var temp = t.split("+");
                if (temp.length > 1) {
                    str.push({ text: key + ": ", style: style1 }, { text: temp[0], style: style2 }, { text: " +" + temp[1] + "\n", style: style3 });
                }
                else {
                    str.push({ text: key + ": ", style: style1 }, { text: temp[0] + "\n", style: style2 });
                }
            }
            this.shuxing_t.textFlow = str;
            //技能
            this.skill_list.itemRenderer = mx.SkillRender;
            this.skill_list.dataProvider = new eui.ArrayCollection(item_info);
            //战斗力
            var zli = mx.FightTools.cal_fight_power(hero);
            this.zli_t.text = zli;
            this.lv_t.text = "LV." + hero.level;
            //品质
            var color = mx.Tools.cal_quality_cor(hero.quality);
            this.quality_t.textColor = color;
            this.quality_t.text = api.hero_name + mx.Lang.j0024[hero.quality - 1];
            this.quality_p.width = 83 + this.quality_t.textWidth;
            this.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            else {
                this.g_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            }
        };
        HeroInfoView.prototype.mx_test = function (event) {
            this.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        HeroInfoView.prototype.fresh_num = function (id) {
            if (this.adata.type == 'not') {
                var cd = this.adata;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", this.adata.type == 'not' ? cd.hero : cd.hero.mid);
                if (id && id != api.equip_id) {
                    return;
                }
                var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
                var now = pproxy.get_item_num(api.equip_id);
                var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROSTARS, "ID", api.InitialStars);
                var need = Number(api2.Summon_Fragments || 0);
                var flag = now < need;
                this.hp_num_t.textFlow = [
                    { "text": now + "", "style": { "textColor": flag ? 0xff4b4b : 0x7e6d80, "bold": true } },
                    { "text": " / " + need, "style": { "textColor": 0x7e6d80, "bold": true } },
                ];
                this.get_b.set_ssres(flag ? "schpxqhqu_png" : "dhcschong_png");
                if (!flag && !this.adata.xxiu) {
                    var ef = new mx.GeneralEffect("sckdhgxiao");
                    ef.play_by_times(-1); //只播放一次
                    ef.right = 140;
                    ef.top = 100;
                    ef.name = "sckdhgxiao";
                    ef.scaleX = 1.5;
                    ef.scaleY = 1.5;
                    ef.touchEnabled = false;
                    this.no_r1_g.addChild(ef);
                }
            }
        };
        HeroInfoView.prototype.touch_tab = function (e) {
            var id = e.item.id;
            var cd = this.adata;
            var tar = e.itemRenderer;
            var pos = tar.parent.localToGlobal(tar.x, tar.y);
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", this.adata.type == 'not' ? cd.hero : cd.hero.mid);
            var name = api.hero_name;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                "type": "aura",
                "mid": Number(api.id),
                "x": pos.x,
                "y": pos.y,
                "w": tar.width,
                "h": tar.height
            });
        };
        HeroInfoView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroInfoView.S_NAME);
        };
        HeroInfoView.prototype.fresh_group = function () {
            var view = this;
            this.touch_able = false;
            var flag = this.flag;
            this.flag = !this.flag;
            if (flag) {
                this.zhezhao.visible = false;
            }
            //右侧内容先滑出
            var g_first = flag ? view.right1_g : view.right2_g;
            var g_second = flag ? view.right2_g : view.right1_g;
            egret.Tween.get(g_first, {
                onChange: function () {
                    g_first.mask = new egret.Rectangle(g_first.right - 33, 0, 232, 520);
                }, onChangeObj: this
            }).to({ right: -258, alpha: 0 }, 300).call(function () {
                g_first.visible = false;
                g_first.alpha = 1;
                g_second.alpha = 0;
                g_second.visible = true;
                //紧接着划入
                egret.Tween.get(g_second, {
                    onChange: function () {
                        if (!this.touch_able) {
                            g_second.mask = new egret.Rectangle(g_second.right - 33, 0, 232, 520);
                        }
                    },
                    onChangeObj: this
                }).to({ right: 22, alpha: 1 }, 300).call(function () {
                    g_second.mask = null;
                    g_second.mask = new egret.Rectangle(g_second.right - 33, 0, 285, 520);
                    this.touch_able = true;
                    this.zhezhao.visible = this.right2_g.visible;
                }, this);
            }, this);
        };
        HeroInfoView.prototype.btn_click = function (evt) {
            if (!this.touch_able) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var c_d = this.adata;
            switch (evt.currentTarget) {
                case view.bg_rect:
                case view.close_b:
                    this.close_self();
                    break;
                case view.xxsx_b:
                case view.avatar:
                    this.fresh_group();
                    break;
                case view.get_b:
                    var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                    var res = view.get_b.res_name;
                    switch (res) {
                        case "schpxqhqu_png":
                            var c_a = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", c_d.hero);
                            var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROSTARS, "ID", c_a.InitialStars);
                            var need = Number(api2.Summon_Fragments || 0);
                            fproxy.set_sd_tar_info(c_a.equip_id, need);
                            break;
                        case "dhcschong_png":
                            var a_d = {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": {
                                    "t": mx.MX_NETS.CS_CHERO_LHSDH,
                                    "mid": c_d.hero,
                                },
                                "param": mx.Tools.format(mx.Lang.h0056, c_d.coin),
                            };
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AlertView.S_NAME,
                                "param": a_d,
                            });
                            break;
                    }
                    break;
                case view.sm_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.HeroInfoSMAlert.S_NAME });
                    break;
                case view.xuetong_g:
                    var mid = c_d.hero.mid || c_d.hero;
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
                    var wenhua = Number(api.wenhua);
                    var target = view.xuetong_g;
                    var point = target.parent.localToGlobal(target.x, target.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "type": "blood",
                        "wenhua": wenhua,
                        "mid": mid,
                        "daishu": 0
                    });
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroInfoView.S_NAME);
                    break;
            }
        };
        HeroInfoView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            egret.Tween.removeTweens(this.right1_g); //释放tween
            egret.Tween.removeTweens(this.right2_g); //释放tween
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xxsx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.avatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xuetong_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.buff_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.touch_tab, this);
            var ef = this.right1_g.getChildByName("sckdhgxiao");
            if (ef) {
                ef.on_remove();
                ef = null;
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeroInfoViewMediator.NAME);
        };
        HeroInfoView.S_NAME = "HeroInfoView";
        return HeroInfoView;
    }(mx.BasicView));
    mx.HeroInfoView = HeroInfoView;
    __reflect(HeroInfoView.prototype, "mx.HeroInfoView");
})(mx || (mx = {}));
//# sourceMappingURL=HeroInfoView.js.map