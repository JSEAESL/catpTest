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
/**
*   @author qianjun wf
*   @date 2016.8.29
*   @desc 副本挑战弹窗
**/
var mx;
(function (mx) {
    var FBTZhanAlert = (function (_super) {
        __extends(FBTZhanAlert, _super);
        function FBTZhanAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sd_t = {
                "text": "",
                "size": 25,
                "horizontalCenter": 16,
                "verticalCenter": -2
            };
            return _this;
        }
        FBTZhanAlert.mx_support = function () {
            return ["assets.tzpop", "api.VIP", "data.2109"];
        };
        FBTZhanAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_fb_tz"://关卡1
                    tar = this.tzhan_b;
                    break;
            }
            return tar;
        };
        Object.defineProperty(FBTZhanAlert.prototype, "fproxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        FBTZhanAlert.prototype.fresh_cview = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = this.fproxy;
            var cd = fproxy.stage_info(this.adata.stage);
            var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', cd.stage);
            var difficult = Number(stage.Difficulty) == 2; //1 简单 2精英
            if (difficult) {
                view.challenge_num_t.text = cd.cishu;
                view.cishu_g.visible = true;
                this.sd_t.text = mx.Tools.format(mx.Lang.fb025, Math.min(Number(cd.cishu), 3));
                this.sdang10_b.set_ssres("sdcsebtn_png", this.sd_t);
            }
            else {
                view.cishu_g.visible = false;
                this.sd_t.text = mx.Tools.format(mx.Lang.fb025, Math.min(Number(cd.cishu), 10));
                this.sdang10_b.set_ssres("sdcsebtn_png", this.sd_t);
            }
            this.stage_name_t.horizontalCenter;
            this.fresh_tili();
        };
        FBTZhanAlert.prototype.fresh_tili = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = this.fproxy;
            var cd = fproxy.stage_info(this.adata.stage);
            var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', cd.stage);
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var now_tl = dproxy.get_currency("tili");
            var need = Number(stage.VitalityCost);
            var needcolor = need > now_tl ? 0xf2180e : 0xFEFEFF;
            view.tli_t.textFlow = [
                { "text": "" + need, "style": { "textColor": needcolor } },
                { "text": "/" + now_tl, "style": { "textColor": needcolor } }
            ];
        };
        FBTZhanAlert.prototype.init_view = function () {
            var view = this;
            this.draw_line(this.tili_g, new egret.Point(0, 35), new egret.Point(225, 35));
            this.draw_line(this.getInfo_g, new egret.Point(0, 35), new egret.Point(225, 35));
            this.init_listener();
            var fproxy = this.fproxy;
            var data = this.adata;
            fproxy.cur_stage = data.stage; //存储当前关卡信息
            var cd = fproxy.stage_info(data.stage);
            view.sdtshi.visible = cd.replay;
            //读静态表获取关卡信息
            var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', cd.stage);
            view.stage_name_t.text = stage.StageName;
            this.fresh_cview();
            if (data.max == 999) {
                this.sd_t = mx.Tools.format(mx.Lang.fb025, Number(stage.Difficulty) == 1 ? '10' : '3');
            }
            else {
                this.sd_t = mx.Tools.format(mx.Lang.fb025, Number(data.cishu) + '');
            }
            if (Number(data.state) < 3) {
                view.sdang_b.set_ssres("sdhui_png");
                this.sdang10_b.set_ssres("sdhsebtn_png", this.sd_t);
                view.sdang_b.touchEnabled = view.sdang10_b.touchEnabled = false;
            }
            else {
                view.sdang_b.set_ssres("sdang_png");
                this.sdang10_b.set_ssres("sdcsebtn_png", this.sd_t);
                view.sdang_b.touchEnabled = view.sdang10_b.touchEnabled = true;
            }
            var wave = mx.ApiTool.getAPINode(mx.MX_APINAME.BATTLE, 'stageid', cd.stage, 'waveid', 1);
            //this.init_enemy(wave);//敌方阵容,依据stage_id找到第三波敌人阵容
            this.init_reward(stage);
            //this.init_mine();
            var facade = mx.ApplicationFacade.getInstance();
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
            facade.registerMediator(new mx.FBTZhanMediator(this));
        };
        /*
        private init_enemy(wave: any): void {
            let view = this;
            let arr1: any = [];
            let boss_pos = wave["BossPosition"];
            for (let j = 1; j <= 5; ++j) {
                let monster_id = parseInt(wave["Monster" + j + "ID"]);
                if (monster_id) {
                    let level = parseInt(wave["Level" + j]);
                    let obj = {
                        "mid": monster_id,
                        "lv": level,
                        "star": parseInt(wave["Stars" + j]),
                        "quality": Math.floor((level + 9) / 10),
                        "notype": true,
                        "boss": boss_pos == j,
                        "chicun": 90,
                        "tab": "monstx"
                    };
                    if (obj.boss) {
                        arr1.unshift(obj);
                    } else {
                        arr1.push(obj);
                    }
                }
            }
            view.enermy_list.itemRenderer = MonsterItemRender;
            view.enermy_list.dataProvider = new eui.ArrayCollection(arr1);
        }
        */
        FBTZhanAlert.prototype.draw_line = function (view, start, end) {
            var shp = new egret.Shape();
            shp.graphics.lineStyle(1, 0xCABAEB);
            shp.graphics.moveTo(start.x, start.y);
            shp.graphics.lineTo(end.x, end.y);
            shp.graphics.endFill();
            view.addChild(shp);
        };
        FBTZhanAlert.prototype.init_reward = function (stage) {
            var view = this;
            var arr2 = [];
            for (var i = 0; i < 7; ++i) {
                var item_id = parseInt(stage["UIreward" + i]);
                if (item_id) {
                    arr2.push({
                        "id": item_id,
                        "type": 4,
                        "chicun": 64
                    });
                }
            }
            view.award_list.itemRenderer = mx.GenTipRender;
            view.award_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        /*
        private init_mine(): void {//出战队列
            this.fproxy.set_curr_team(1);

            let facade = ApplicationFacade.getInstance();
            let hProxy: HeroProxy = <HeroProxy><any>facade.retrieveProxy(HeroProxy.NAME);
            let heros: any = hProxy.get_heroes_by_type("all", "team");
            let ids: any = hProxy.teams[this.fproxy.curr_team];
            let arr3: any = [];
            let zli: number = 0;

            for (let j: number = 0; j < heros.length; j++) {
                let cd = heros[j];
                if (ids.indexOf(Number(cd.id)) >= 0) {
                    //cd.chicun = 60;
                    //cd.rtype = "tzpop";
                    //let d : any = arr3[arr3.length - 1];
                    if (typeof cd.equip == 'string') {
                        cd.equip = JSON.parse(cd.equip);
                    }

                    if (typeof cd.skills == "undefined") {
                        let skills = [];
                        let skill = {};
                        if (cd.skill_level != "") {
                            skill = JSON.parse(cd.skill_level);
                        }
                        let apis = ApiTool.getAPINodes(MX_APINAME.SKILLNEWGROUP, "CasterID", cd.mid)
                        for (let m in apis) {
                            if (cd.star >= Number(apis[m].Unlock) || skill[Number(apis[m].skill_id)]) {
                                let skill_id = Number(apis[m].skill_id);
                                let skill_level = apis[m].InitLevel;
                                for (let k in skill) {
                                    if (Number(k) == skill_id) {
                                        skill_level = skill_level + Number(skill[k]);
                                        break;
                                    }
                                }
                                skills.push({
                                    "skill_id": skill_id,
                                    "skill_level": skill_level
                                });
                            }
                        }
                        let ln = skills.length;
                        if (typeof skills[ln - 1].wake == "undefined") {
                            skills[ln - 1].wake = 0;
                        }
                        cd.skills = Tools.arr2obj(skills, "skill_id");
                    }
                    let obj = {//副本挑战弹窗低网速有时候会出大头像
                        "chicun": 90,
                        "equip": cd.equip,
                        "id": cd.id,
                        "level": cd.level,
                        "mid": cd.mid,
                        "quality": cd.quality,
                        "rtype": "tzpop",
                        "skill_level": cd.skill_level,
                        "skills": cd.skills,
                        "star": cd.star
                    };
                    arr3.push(obj);

                    zli += FightTools.cal_fight_power(cd);
                }
            }

            let view = this;
            view.zli_t.text = zli + '';

            view.hero_list.itemRenderer = TeamHeroRender2;
            arr3 = arr3.sort(function (a, b) {//排序
                let x = a.mid;
                if (a.mid) {
                    x = ApiTool.getAPINode(MX_APINAME.HERO, "id", a.mid).enmity_priority;
                }
                let y = b.mid;
                if (b.mid) {
                    y = ApiTool.getAPINode(MX_APINAME.HERO, "id", b.mid).enmity_priority;
                }
                return x - y//按层级关系排序
            });
            view.hero_list.dataProvider = new eui.ArrayCollection(arr3);
        }
        */
        FBTZhanAlert.prototype.mx_test = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        FBTZhanAlert.prototype.init_listener = function () {
            var view = this;
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.exit_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sdang_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sdang10_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzhan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        FBTZhanAlert.prototype.btn_click = function (e) {
            var view = this;
            var fproxy = this.fproxy;
            var cd = fproxy.stage_info(this.adata.stage);
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.sdang_b:
                    facade.sendNotification(mx.MX_NOTICE.FUBEN_SAODANG, 1); //扫一次
                    break;
                case view.sdang10_b:
                    facade.sendNotification(mx.MX_NOTICE.FUBEN_SAODANG, 10); //根据体力计算
                    break;
                case view.tzhan_b://挑战
                    var data = this.adata;
                    if (parseInt(data.cishu) > 0) {
                        var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', cd.stage);
                        var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                        var now_tl = dproxy.get_currency("tili");
                        var need = Number(stage.VitalityCost);
                        if (need > now_tl) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "notice_ok": mx.MX_NOTICE.SHOW_BUY_TILI,
                                    "sdata_ok": "tili",
                                    "param": mx.Lang.p0027,
                                }
                            });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_CHANGE_QUEUE, "team_id": fproxy.curr_team
                            });
                        }
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb009 });
                    }
                    break;
                case view.add_b:
                    var pid = Math.min(parseInt(cd.purchase) + 1, mx.MX_COMMON.MAX_FB_RESET);
                    var info = mx.ApiTool.getAPINode(mx.MX_APINAME.RESETFBPRICE, 'id', pid);
                    var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
                    var vipapi = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", gproxy.user_vip);
                    if (pid > vipapi.EliteReset) {
                        if (gproxy.user_vip < 15) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                                    "param": mx.Lang.fb005,
                                }
                            });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "param": mx.Lang.fb033,
                                }
                            });
                        }
                    }
                    else {
                        var p_d = {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { "t": mx.MX_NETS.CS_FUBEN_CHONGZHI, "stage": cd.stage },
                                "param": mx.Tools.format(mx.Lang.fb012, info.price, cd.purchase),
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    break;
                case view.exit_b:
                case view.rect:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, FBTZhanAlert.S_NAME);
                    break;
            }
        };
        FBTZhanAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.exit_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sdang_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sdang10_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.set_que_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzhan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.FBTZhanMediator.NAME);
        };
        FBTZhanAlert.S_NAME = "FBTZhanAlert";
        return FBTZhanAlert;
    }(mx.BasicView));
    mx.FBTZhanAlert = FBTZhanAlert;
    __reflect(FBTZhanAlert.prototype, "mx.FBTZhanAlert");
})(mx || (mx = {}));
//# sourceMappingURL=FBTZhanAlert.js.map