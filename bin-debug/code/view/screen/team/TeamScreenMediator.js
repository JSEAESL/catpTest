/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 团队主页界面Mediator
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
    var TeamScreenMediator = (function (_super) {
        __extends(TeamScreenMediator, _super);
        function TeamScreenMediator(viewComponent) {
            var _this = _super.call(this, TeamScreenMediator.NAME, viewComponent) || this;
            _this.temp2 = [];
            _this.muban = 0;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(TeamScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TeamScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TeamScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.bdui_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.dhuan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zwei_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hero_list.dataProvider = null;
        };
        TeamScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.XZHEN_QUEHERO,
                mx.MX_NOTICE.ADD_QUEHERO,
                mx.MX_NOTICE.FRESH_CSCREEN,
            ];
        };
        TeamScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.XZHEN_QUEHERO:
                    this.xiazhen(data);
                    break;
                case mx.MX_NOTICE.ADD_QUEHERO:
                    this.shangzhen(data);
                    break;
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    if (notification.getType() == mx.TeamScreen.S_NAME) {
                        this.fresh_data();
                    }
                    break;
                default:
                    break;
            }
        };
        TeamScreenMediator.prototype.show_guide = function (gkey) {
            var view = this.view;
            switch (gkey) {
                case "s_bd_l2": //编队-站位2:打开选择侍从弹窗
                case "s_bd_l4":
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroSelectView.S_NAME,
                        "param": {
                            "team": this.temp2[this.proxy.s_id],
                            "type": 1
                        }
                    });
                    break;
                case "s_mr_hl1"://点击第一个美男-站位1
                    mx.HeroTrainScreen.P_NAME = mx.TeamScreen.S_NAME;
                    var tar = view.hero_list.getChildAt(4);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHERO_INFO,
                        "id": tar.data.id,
                    });
                    break;
                case "s_mr_dh"://兑换
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.TeamDHScreen.S_NAME);
                    break;
                case "s_mr_yl"://侍从一览
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroSelectView.S_NAME,
                        "param": {
                            "team": this.temp2[this.proxy.s_id],
                            "type": 0
                        }
                    });
                    break;
                case "s_mr_zw":
                    var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FightBuzhenView.S_NAME, "param": { "team": hproxy.teams[1], "team_id": 1 } });
                    break;
                case "v_zw_ts1":
                case "v_zw_ts2":
                case "v_zw_ts3":
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
                case "v_zw_td1":
                    break;
                case "v_zw_td2":
                    break;
                case "v_zw_gb":
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightBuzhenView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
                default:
                    break;
            }
        };
        TeamScreenMediator.prototype.init_view = function () {
            var view = this.view;
            var hProxy = this.proxy;
            view.dhuan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bdui_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zwei_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (mx.Tools.screen_height < 740) {
                view.hero_list.bottom = NaN;
                view.hero_list.top = 48;
            }
            var teams = hProxy.teams;
            for (var i in teams) {
                if (!teams[i].length) {
                    delete teams[i];
                    teams.length--;
                }
            }
            this.muban = hProxy.muban_obj[this.proxy.s_id];
            var ts = hProxy.reset_dh_info();
            this.fresh_data();
            if (mx.MX_COMMON.IN_GUIDE) {
                var gproxy = this.facade.retrieveProxy(mx.GuideProxy.NAME);
                if (gproxy.check_guide_key("m_zb")) {
                    if (hProxy.fight_ids.length >= 4) {
                        this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE); //完成当前引导
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME); //跳转到主页,接任务引导
                        return;
                    }
                    else if (hProxy.get_hero_by_mid(4)) {
                        this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                            "gkey": "m_zb", "touch": "v_xxh_qd"
                        }); //跳到编队
                    }
                    else {
                        var hero1 = hProxy.get_hero_by_mid(1);
                        if (hero1 && hero1.equip.indexOf(108) > -1) {
                            this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                                "gkey": "m_zb", "touch": "s_py_fh"
                            }); //跳到兑换
                        }
                    }
                }
                // if (gproxy.check_guide_key("m_bd") && hProxy.fight_ids.length >= 3) {//已经编队了,直接跳战斗
                //     this.sendNotification(MX_NOTICE.NEXT_GUIDE);//完成当前引导
                //     this.sendNotification(MX_NOTICE.SCENE_CHANGE, MainScreen.S_NAME);//跳转到主页,接剧情引导10
                //     return;
                // }
                if (gproxy.check_guide_key("m_dh")) {
                    var hero4 = hProxy.get_hero_by_mid(4);
                    if (hero4) {
                        this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE); //完成当前引导
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                        return;
                    }
                }
                if (gproxy.check_guide_key("m_sx")) {
                    var hero4 = hProxy.get_hero_by_mid(4);
                    if (!hero4) {
                        this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE); //完成当前引导
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                        return;
                    }
                }
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    view.hero_list.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        TeamScreenMediator.prototype.fresh_data = function (type) {
            var view = this.view;
            var c_team = this.temp2[this.proxy.s_id];
            if (!c_team) {
                c_team = this.temp2[this.proxy.s_id] = this.proxy.get_cqu_data(this.proxy.s_id).concat();
            }
            var zl = this.proxy.get_fightPower(c_team);
            var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            hproxy.cal_chuzhan_zhanli();
            var old_zl = Number(this.view.zl_t.text);
            if (zl != old_zl) {
                mx.DataTool.getInstance().set_QQ_Score(17, zl);
            }
            this.view.zl_t.text = "" + zl;
            if (zl < 100) {
                this.view.zl_bg.width = 270;
            }
            else if (zl < 1000) {
                this.view.zl_bg.width = 285;
            }
            else if (zl < 10000) {
                this.view.zl_bg.width = 304;
            }
            else if (zl < 100000) {
                this.view.zl_bg.width = 322;
            }
            var c_arr = [];
            for (var k in c_team) {
                var chero = c_team[k];
                if (chero) {
                    c_arr.push(this.proxy.heroes[chero]);
                }
            }
            while (c_arr.length < 5) {
                c_arr.push({ "mid": 0 });
            }
            c_arr = c_arr.sort(function (a, b) {
                var x = a.mid;
                if (a.mid) {
                    x = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", a.mid).enmity_priority;
                }
                var y = b.mid;
                if (b.mid) {
                    y = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", b.mid).enmity_priority;
                }
                return x - y; //按层级关系排序
            });
            this.view.hero_list.dataProvider = new eui.ArrayCollection(c_arr);
        };
        TeamScreenMediator.prototype.show_kong_alert = function () {
            this.facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AlertView.S_NAME,
                "param": {
                    "param": mx.Lang.h00350,
                },
            });
        };
        TeamScreenMediator.prototype.is_kong = function () {
            var c_arr = this.temp2[this.proxy.s_id];
            var t = true;
            for (var k in c_arr) {
                if (c_arr[k] != 0) {
                    t = false;
                    break;
                }
            }
            return t;
        };
        TeamScreenMediator.prototype.save_que = function () {
            var p = [];
            var c_team = this.temp2[this.proxy.s_id];
            for (var k in c_team) {
                if (c_team[k] != 0) {
                    p.push(c_team[k]);
                }
            }
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_SAVE_QUEUE,
                "team_id": this.proxy.s_id,
                "team": p.join("|"),
                "muban": this.muban
            });
            /*let jproxy : JingJiProxy = <JingJiProxy><any>this.facade.retrieveProxy(JingJiProxy.NAME);
            if(jproxy.jj_flag){
                this.sendNotification(MX_NOTICE.CS_GET_DATA, {
                    "t" : MX_NETS.CS_JJC_SETTEAM,
                    "team_id" : this.proxy.s_id,
                    "team" : p.join("|"),
                    "muban" : this.muban
                });//发送网络请求
                return;
            }

            let lproxy : LueDuoProxy = <LueDuoProxy><any>this.facade.retrieveProxy(LueDuoProxy.NAME);
            if(lproxy.lueduo_flag){
                this.sendNotification(MX_NOTICE.CS_GET_DATA, {
                    "t" : MX_NETS.CS_JJC_SETTEAM,
                    "team_id" : this.proxy.s_id,
                    "team" : p.join("|"),
                    "muban" : this.muban,
                    "type" : 1
                });//发送网络请求
                return;
            }*/
        };
        TeamScreenMediator.prototype.mx_test = function (event) {
            this.view.hero_list.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        TeamScreenMediator.prototype.xiazhen = function (data) {
            var c_team = this.temp2[this.proxy.s_id];
            if (data >= 0) {
                if (c_team.length == 1) {
                    this.show_kong_alert();
                }
                else {
                    c_team.splice(c_team.indexOf(Number(data)), 1);
                    this.fresh_data();
                    var hproxy = this.proxy;
                    var buzhen = hproxy.get_buzhen(1);
                    for (var i in buzhen) {
                        var chero = hproxy.get_chero_info(data);
                        if (Number(buzhen[i]) == Number(chero.mid)) {
                            buzhen[i] = null;
                            break;
                        }
                    }
                    for (var i = 1; i < 7; ++i) {
                        if (!buzhen[i]) {
                            buzhen[i] = null;
                        }
                    }
                    hproxy.set_buzhen(buzhen, 1);
                    var facade = mx.ApplicationFacade.getInstance();
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_BUZHEN_INFO,
                        "team_id": 1,
                        "zhanwei": JSON.stringify(buzhen)
                    });
                    this.save_que();
                }
            }
            else {
                if (this.is_kong()) {
                    this.muban = 0;
                }
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HeroSelectView.S_NAME,
                    "param": {
                        "team": this.temp2[this.proxy.s_id],
                        "type": 1
                    }
                });
            }
        };
        TeamScreenMediator.prototype.shangzhen = function (data) {
            this.temp2[this.proxy.s_id] = data.concat();
            var hproxy = this.proxy;
            var buzhen = hproxy.get_buzhen(1);
            for (var i in buzhen) {
                var empty = false;
                var mid = Number(buzhen[i]);
                for (var j in data) {
                    var chero = hproxy.get_chero_info(data[j]);
                    if (mid == Number(chero.mid)) {
                        empty = true;
                        break;
                    }
                }
                if (!empty) {
                    buzhen[i] = null;
                }
            }
            for (var i in data) {
                var chero = hproxy.get_chero_info(data[i]);
                var have = false;
                for (var i_1 in buzhen) {
                    if (Number(buzhen[i_1]) == Number(chero.mid)) {
                        have = true;
                        break;
                    }
                }
                if (!have) {
                    for (var i_2 in buzhen) {
                        if (!buzhen[i_2]) {
                            buzhen[i_2] = chero.mid;
                            break;
                        }
                    }
                }
            }
            for (var i = 1; i < 7; ++i) {
                if (!buzhen[i]) {
                    buzhen[i] = null;
                }
            }
            hproxy.set_buzhen(buzhen, 1);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_BUZHEN_INFO,
                "team_id": 1,
                "zhanwei": JSON.stringify(buzhen)
            });
            this.fresh_data();
            this.save_que();
        };
        TeamScreenMediator.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this.view;
            switch (evt.currentTarget) {
                case view.dhuan_b://灵魂石兌換
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.TeamDHScreen.S_NAME);
                    break;
                case view.bdui_b://编队
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroSelectView.S_NAME,
                        "param": {
                            "team": this.temp2[this.proxy.s_id],
                            "type": 0
                        }
                    });
                    break;
                case view.zwei_b:
                    var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FightBuzhenView.S_NAME, "param": { "team": hproxy.teams[1], "team_id": 1 } });
                    break;
                default:
                    break;
            }
        };
        TeamScreenMediator.NAME = "TeamScreenMediator";
        return TeamScreenMediator;
    }(puremvc.Mediator));
    mx.TeamScreenMediator = TeamScreenMediator;
    __reflect(TeamScreenMediator.prototype, "mx.TeamScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TeamScreenMediator.js.map