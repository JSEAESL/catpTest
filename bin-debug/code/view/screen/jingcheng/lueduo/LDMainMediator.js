/**
 *   @author mx wf
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var LDMainMediator = (function (_super) {
        __extends(LDMainMediator, _super);
        function LDMainMediator(viewComponent) {
            var _this = _super.call(this, LDMainMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        LDMainMediator.prototype.init_view = function () {
            var view = this.view;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.help_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzdl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lduo_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ld_state.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bhl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bgsg_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bgsg_desc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zwei_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.proxy.check_fl();
            this.fresh_num(); //掠夺点&防御点
            this.fresh_zli(); //总战力
            this.fresh_bhl(); //保护令
            this.init_mine_info(); //个人基本信息
            //临时处理
            this.fresh_list(); //出战队列
        };
        LDMainMediator.prototype.get_xianlevel_str = function () {
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var xlv = gproxy.user_xlv;
            return mx.Lang.fzxp0[1 - xlv % 2] + mx.Lang.fzxp1[Math.ceil(xlv / 2) - 1] + mx.Lang.fzxp2;
        };
        LDMainMediator.prototype.init_mine_info = function () {
            var view = this.view;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var proxy = this.proxy;
            view.vip_t.text = "" + gproxy.user_vip;
            view.lv_t.text = gproxy.user_lv + "";
            view.name_t.text = gproxy.user_name + "";
            view.zinv_t.text = proxy.zinv_num + "";
            view.ky_t.text = proxy.guoku + "";
            view.tmdp_t.text = this.get_xianlevel_str();
            this.fresh_ld_time();
        };
        LDMainMediator.prototype.fresh_ld_time = function () {
            var view = this.view;
            var proxy = this.proxy;
            var c_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            if (c_time > proxy.xiuyang) {
                view.shps_p.source = "ldzcztai_png";
                view.xy_t.visible = false;
            }
            else {
                view.shps_p.source = "psbg_png";
                view.xy_t.visible = true;
                var delay = proxy.xiuyang - c_time;
                var str = mx.Tools.format_second(delay);
                view.xy_t.text = str;
            }
        };
        LDMainMediator.prototype.check_ldd = function () {
            var proxy = this.proxy;
            var c_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            if (c_time >= proxy.ldd_res_time) {
                if (proxy.lueduo < 100) {
                    proxy.lueduo++;
                    this.fresh_num();
                }
                proxy.ldd_res_time += 10 * 60;
            }
        };
        LDMainMediator.prototype.fresh_num = function () {
            var view = this.view;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var proxy = this.proxy;
            var xlv = gproxy.user_xlv;
            var base = 40 + 40 * xlv; //基础值和权重都是40
            view.fyd_t.text = proxy.fangyu + '/' + base;
        };
        LDMainMediator.prototype.fresh_zli = function (flag) {
            if (flag === void 0) { flag = false; }
            var view = this.view;
            var proxy = this.proxy;
            var hProxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
            var heros = hProxy.get_heroes_by_type("all", "team");
            var arr = [];
            var zli = 0;
            var c_team = [];
            if (flag) {
                c_team = proxy.fangyu_que;
            }
            else {
                for (var k in proxy.user_battle) {
                    c_team.push(Number(k));
                }
            }
            for (var j = 0; j < heros.length; j++) {
                if (c_team.indexOf(Number(heros[j].id)) >= 0) {
                    heros[j].chicun = 76;
                    arr.push(heros[j]);
                    var d = arr[arr.length - 1];
                    if (typeof d.equip == 'string') {
                        d.equip = JSON.parse(d.equip);
                    }
                    var cd = heros[j];
                    if (typeof cd.skills == "undefined") {
                        var skills = [];
                        var skill = {};
                        if (cd.skill_level != "") {
                            skill = JSON.parse(cd.skill_level);
                        }
                        var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.SKILLNEWGROUP, "CasterID", cd.mid);
                        for (var m in apis) {
                            if (cd.star >= Number(apis[m].Unlock) || skill[Number(apis[m].skill_id)]) {
                                var skill_id = Number(apis[m].skill_id);
                                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWGROUP, "skill_id", skill_id);
                                var skill_level = Number(api.InitLevel);
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
                        cd.skills = mx.Tools.arr2obj(skills, "skill_id");
                    }
                    zli += mx.FightTools.cal_fight_power(d);
                }
            }
            view.zli_t.text = zli + '';
            view.hero_list.itemRenderer = mx.TeamHeroRender2;
            arr.reverse();
            view.hero_list.dataProvider = new eui.ArrayCollection(arr);
        };
        LDMainMediator.prototype.fresh_bhl = function () {
            var view = this.view;
            var proxy = this.proxy;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            view.tmdp_t.text = this.get_xianlevel_str(); //刷新帝品
            if (gproxy.user_xlv >= 9) {
                view.ld_state.source = "qmlduo_png";
            }
            var c_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            if (c_time > proxy.baohu) {
                view.bhl_t.text = mx.Tools.format(mx.Lang.ld015, proxy.bhl_num);
                view.bhl_t.visible = false;
                view.bhl_bg.visible = false;
            }
            else {
                var delay = proxy.baohu - c_time;
                var str = mx.Tools.format_second(delay);
                view.bhl_t.text = mx.Tools.format(mx.Lang.j0028, str);
                view.bhl_t.visible = true;
                view.bhl_bg.visible = true;
                view.ld_state.source = "gsjbei_png";
            }
            if (gproxy.user_xlv < 9) {
                view.ld_state.source = "wxkji_png";
            }
        };
        LDMainMediator.prototype.fresh_list = function () {
        };
        LDMainMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            var proxy = this.proxy;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var xlv = gproxy.user_xlv;
            switch (evt.currentTarget) {
                case view.back_b://返回
                    var wproxy = this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
                    proxy.setLD(false);
                    proxy.lueduo_flag = false;
                    var p_name = mx.LDMainScreen.P_NAME;
                    if (p_name) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                        mx.LDMainScreen.P_NAME = null;
                    }
                    else {
                        if (wproxy.per_scene == "jingcheng") {
                            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                            wproxy.per_scene = "";
                        }
                    }
                    break;
                case view.help_b://玩法说明
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.Pic2Alert.S_NAME,
                        "param": {
                            "title": "hlysmbti_png",
                            "wenzi": "ldsming_png",
                        }
                    });
                    break;
                case view.lduo_b://掠夺
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_LUEDUO_OTHER
                    });
                    break;
                case view.tzdl_b://调整队列
                    proxy.lueduo_flag = true;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_QUEUE_INFO, "team_id": 12 });
                    break;
                case view.bhl_b://保护令
                    var c_time = new Date().getTime(); //当前时间戳
                    if (xlv < 9) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld097 });
                    }
                    else if (c_time > proxy.baohu) {
                        if (proxy.bhl_num) {
                            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                    "sdata_ok": { "t": mx.MX_NETS.CS_LUEDUO_USEBHL },
                                    "param": mx.Lang.ld018
                                }
                            });
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.BuyAlertView.S_NAME,
                                "param": {
                                    "param": {
                                        "item": 2012,
                                    }
                                }
                            });
                        }
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld017 });
                    }
                    break;
                case view.ld_state:
                    var str = void 0;
                    switch (view.ld_state.source) {
                        case "wxkji_png":
                            str = "wxkjztwben_png";
                            break;
                        case "gsjbei_png":
                            str = "bhlztwben_png";
                            break;
                        case "qmlduo_png":
                            str = "qmldztwben_png";
                            break;
                    }
                    var point = evt.target.parent.localToGlobal(evt.target.x, evt.target.y);
                    this.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x,
                        "y": point.y,
                        "w": 74,
                        "h": 73,
                        "str": str,
                        "type": "zinvTag"
                    });
                    break;
                case view.bgsg_b:
                    if (xlv < 9) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld094 });
                    }
                    else {
                        var c_time_1 = Math.floor(new Date().getTime() / 1000);
                        if (c_time_1 <= this.proxy.bgsg) {
                            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld095 });
                        }
                        else if (c_time_1 <= this.proxy.baohu) {
                            var p_d = {
                                "name": mx.MX_NOTICE.CS_GET_DATA,
                                "param": {
                                    "t": mx.MX_NETS.CS_LUEDUO_BGSG,
                                }
                            };
                            p_d = {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "notice_ok": p_d.name,
                                    "sdata_ok": p_d.param,
                                    "param": mx.Tools.format(mx.Lang.ld096, this.get_xianlevel_str()),
                                }
                            };
                            this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld100 });
                        }
                    }
                    break;
                case view.bgsg_desc:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.Pic2Alert.S_NAME,
                        "param": {
                            "title": "bgsgsmbti_png",
                            "wenzi": "bgsgsmwben_png",
                        }
                    });
                    break;
                case view.zwei_p:
                    var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FightBuzhenView.S_NAME, "param": { "team": hproxy.teams[12], "team_id": 12 } });
                    break;
            }
        };
        Object.defineProperty(LDMainMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LDMainMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        LDMainMediator.prototype.onRemove = function () {
            var view = this.view;
            view.hero_list.dataProvider = null;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.help_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzdl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lduo_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ld_state.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bhl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bgsg_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bgsg_desc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zwei_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        LDMainMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_BHL_STATE,
                mx.MX_NOTICE.LLD_NUM_CHANGED,
                mx.MX_NOTICE.TIME_TICK,
                mx.MX_NOTICE.AVG_END,
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        LDMainMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    if (data == mx.LDMainScreen.S_NAME) {
                        this.fresh_zli(true);
                    }
                    break;
                case mx.MX_NOTICE.FRESH_BHL_STATE:
                    this.fresh_bhl();
                    break;
                case mx.MX_NOTICE.LLD_NUM_CHANGED:
                    this.fresh_num();
                    break;
                case mx.MX_NOTICE.TIME_TICK://刷新时间
                    this.check_ldd();
                    this.fresh_bhl();
                    this.fresh_ld_time();
                    break;
                case mx.MX_NOTICE.AVG_END:
                    this.czfl();
                    break;
            }
        };
        LDMainMediator.prototype.czfl = function () {
            var cd = this.proxy.fl;
            if (!cd) {
                return;
            }
            var mid = cd.id;
            this.proxy.fl = null;
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": mid,
                "type": 8
            });
        };
        LDMainMediator.NAME = "LDMainMediator";
        return LDMainMediator;
    }(puremvc.Mediator));
    mx.LDMainMediator = LDMainMediator;
    __reflect(LDMainMediator.prototype, "mx.LDMainMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=LDMainMediator.js.map