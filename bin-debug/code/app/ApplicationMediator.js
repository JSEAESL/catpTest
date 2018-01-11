/**
*   @author mx
*   @date 2014.12.28
*   @desc 根容器的Mediator
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
    var ApplicationMediator = (function (_super) {
        __extends(ApplicationMediator, _super);
        function ApplicationMediator(viewComponent) {
            return _super.call(this, ApplicationMediator.NAME, viewComponent) || this;
        }
        ApplicationMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CLIENT_INITED,
                mx.MX_NOTICE.LOAD_COMPLETE,
                mx.MX_NOTICE.SCENE_CHANGE,
                mx.MX_NOTICE.CLOSE_POP,
                mx.MX_NOTICE.CLOSE_ALL_POP,
                mx.MX_NOTICE.POP_VIEW,
                mx.MX_NOTICE.SHOW_TOP_UI,
                mx.MX_NOTICE.SHOW_LOADING,
                mx.MX_NOTICE.HIDE_LOADING,
                mx.MX_NOTICE.HIDE_GUIDE,
                mx.MX_NOTICE.GUIDE_SHOW,
                mx.MX_NOTICE.TOTAL_PROGRESS,
                mx.MX_NOTICE.PLAY_MUSIC,
                mx.MX_NOTICE.SWITCH_MUSIC,
                mx.MX_NOTICE.CLOSE_MUSIC,
                mx.MX_NOTICE.REMOVE_MUSIC,
                mx.MX_NOTICE.SHOW_GUIDE,
                mx.MX_NOTICE.REMOVE_GUIDE,
                mx.MX_NOTICE.GUIDE_POS,
                mx.MX_NOTICE.SET_WAIT,
                mx.MX_NOTICE.SHOW_UI,
                mx.MX_NOTICE.REMOVE_UI,
                //MX_NOTICE.GAME_ACTIVATE,//游戏激活状态
                mx.MX_NOTICE.GAME_LOGOUT //退出游戏
            ];
        };
        ApplicationMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var main = (this.viewComponent);
            switch (notification.getName()) {
                /*case MX_NOTICE.GAME_ACTIVATE:
                    main.touchChildren = data;
                    break;*/
                case mx.MX_NOTICE.SET_WAIT:
                    if (data) {
                        main.show_wiat_mc();
                    }
                    else {
                        main.set_close_mc();
                    }
                    break;
                case mx.MX_NOTICE.SHOW_LOADING:
                    main.show_loading(data);
                    break;
                case mx.MX_NOTICE.HIDE_LOADING:
                    main.hide_loading();
                    break;
                case mx.MX_NOTICE.TOTAL_PROGRESS:
                    main.setProgress(data);
                    break;
                case mx.MX_NOTICE.CLIENT_INITED:
                    this.check_enter_game();
                    break;
                case mx.MX_NOTICE.POP_VIEW:
                    main.pre_pop(data);
                    break;
                case mx.MX_NOTICE.CLOSE_POP:
                    main.closePop(data);
                    break;
                case mx.MX_NOTICE.CLOSE_ALL_POP:
                    main.check_pop();
                    break;
                case mx.MX_NOTICE.SCENE_CHANGE:
                    var cname = data ? data.sname || data : null;
                    if (!this.now_time_num && cname == mx.MainScreen.S_NAME) {
                        this.strat_tick();
                    }
                    main.pre_screen(cname, data ? data.param : null);
                    break;
                case mx.MX_NOTICE.LOAD_COMPLETE:
                    main.show_new_ui(data);
                    break;
                case mx.MX_NOTICE.SHOW_TOP_UI:
                    main.show_top_ui(data);
                    break;
                case mx.MX_NOTICE.PLAY_MUSIC://播放音乐
                    this.play_music(data);
                    break;
                case mx.MX_NOTICE.SWITCH_MUSIC://音乐开关
                    this.set_music();
                    break;
                case mx.MX_NOTICE.CLOSE_MUSIC://关闭音乐
                    this.close_music(data);
                    break;
                case mx.MX_NOTICE.SWITCH_MUSIC_EFFECT://音效开关
                    this.set_music_effect();
                    break;
                case mx.MX_NOTICE.REMOVE_MUSIC://关闭音乐
                    for (var k in Main.HOLD_MUSIC) {
                        var sound = Main.HOLD_MUSIC[k];
                        if (sound.unique_code == data) {
                            Main.HOLD_MUSIC.splice(k, 1);
                            break;
                        }
                    }
                    break;
                case mx.MX_NOTICE.SHOW_GUIDE:
                    main.show_guide_view(data);
                    break;
                case mx.MX_NOTICE.GUIDE_POS:
                    var pos = main.get_guide_pos(data);
                    if (pos) {
                        if (pos.parent) {
                            var t_p = pos.parent.localToGlobal(pos.x, pos.y);
                            pos = { "x": Math.round(t_p.x), "y": Math.round(t_p.y), "width": pos.width, "height": pos.height };
                        }
                        mx.Tools.fixed_screen(pos);
                    }
                    this.sendNotification(mx.MX_NOTICE.GUIDE_POS_CB, pos);
                    break;
                case mx.MX_NOTICE.SHOW_UI:
                    main.show_ui(data);
                    break;
                case mx.MX_NOTICE.REMOVE_UI:
                    main.remove_ui();
                    break;
                case mx.MX_NOTICE.REMOVE_GUIDE:
                    main.remove_guide();
                    break;
                case mx.MX_NOTICE.HIDE_GUIDE:
                    main.hide_guide();
                    break;
                case mx.MX_NOTICE.GUIDE_SHOW:
                    main.show_guide();
                    break;
                case mx.MX_NOTICE.GAME_LOGOUT://登出
                    this.game_logout(data);
                    break;
                default:
                    break;
            }
        };
        ApplicationMediator.prototype.set_music_effect = function () {
            mx.MX_COMMON.MUSIC_EFFECT_PLAY = !mx.MX_COMMON.MUSIC_EFFECT_PLAY;
            var str = mx.MX_COMMON.MUSIC_EFFECT_PLAY ? "open" : "close";
            egret.localStorage.setItem(mx.MX_COMMON.MX_MELS_KEY, str);
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MyInfoView.S_NAME }); //刷新设置
        };
        ApplicationMediator.prototype.close_music = function (ef) {
            if (!ef) {
                for (var k in Main.HOLD_MUSIC) {
                    var sound = Main.HOLD_MUSIC[k];
                    if (sound.c_music && sound.c_music.type != "ef" && sound.c_music.type != "yuyin") {
                        sound.close_music();
                    }
                }
            }
            else {
                for (var k in Main.HOLD_MUSIC) {
                    var sound2 = Main.HOLD_MUSIC[k];
                    if (sound2.c_music && (sound2.c_music.type == "ef" || sound2.c_music.type == "yuyin")) {
                        sound2.close_music(ef);
                    }
                }
            }
            return;
        };
        ApplicationMediator.prototype.set_music = function () {
            mx.MX_COMMON.MUSIC_PLAY = !mx.MX_COMMON.MUSIC_PLAY;
            var str = mx.MX_COMMON.MUSIC_PLAY ? "open" : "close";
            egret.localStorage.setItem(mx.MX_COMMON.MX_MLS_KEY, str);
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MyInfoView.S_NAME }); //刷新设置
            if (mx.MX_COMMON.MUSIC_PLAY) {
                this.play_music({ "name": "base" });
            }
            else {
                this.close_music();
            }
        };
        ApplicationMediator.prototype.play_music = function (data) {
            var sss = new mx.Sound(data);
            return;
        };
        ApplicationMediator.prototype.check_enter_game = function () {
            if (mx.Tools.can_local_s) {
                var cstate = egret.localStorage.getItem(mx.MX_COMMON.MX_MLS_KEY); //背景音乐
                if (cstate) {
                    if (cstate == "close") {
                        mx.MX_COMMON.MUSIC_PLAY = false;
                    }
                }
                else {
                    egret.localStorage.setItem(mx.MX_COMMON.MX_MLS_KEY, "open");
                }
                cstate = egret.localStorage.getItem(mx.MX_COMMON.MX_MELS_KEY); //音效
                if (cstate) {
                    if (cstate == "close") {
                        mx.MX_COMMON.MUSIC_EFFECT_PLAY = false;
                    }
                }
                else {
                    egret.localStorage.setItem(mx.MX_COMMON.MX_MELS_KEY, "open");
                }
            }
            else {
                mx.MX_COMMON.MUSIC_PLAY = false; //默认关闭背景音乐
                mx.MX_COMMON.MUSIC_EFFECT_PLAY = false; //默认关闭音效
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0100 });
            }
            switch (mx.AppConfig.OPENMODE) {
                case "wxhb":
                    var hb_id = mx.AppConfig.HB_ID;
                    var from_id = mx.AppConfig.FROM_ID;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_HONGBAO_GET, 'id': hb_id });
                    //this.sendNotification(MX_NOTICE.POP_VIEW, {"name" : HongbaoXQView.S_NAME});
                    break;
                case "wxtgy":
                    var tg_id = mx.AppConfig.HB_ID;
                    var tgfrom_id = mx.AppConfig.FROM_ID;
                    //this.sendNotification(MX_NOTICE.CS_GET_DATA, { "t": MX_NETS.CS_HONGBAO_GET, 'id': hb_id });
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.TuiGuangWBView.S_NAME });
                    break;
                default:
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.StartScreen.S_NAME);
                    break;
            }
            egret.startTick(this.onTicker, this);
        };
        ApplicationMediator.prototype.strat_tick = function () {
            var _this = this;
            this.now_time_num = Math.ceil(new Date().getTime() / 1000);
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_HEARTBEAT });
            this._hid = egret.setInterval(this.heartbeat, this, 500);
            this.qq_onlinetime_hid = egret.setInterval(function () {
                var thistime = Math.ceil(egret.getTimer() / 1000);
                var gproxy = (_this.facade.retrieveProxy(mx.GameProxy.NAME));
                mx.DataTool.getInstance().set_QQ_Score(6000, thistime + (gproxy.online_today ? gproxy.online_today : 0));
            }, this, 300000);
        };
        ApplicationMediator.prototype.onTicker = function (timeStamp) {
            var test = dragonBones.WorldClock.clock;
            if (!test._animatebles.length) {
                return;
            }
            if (!this._time) {
                this._time = timeStamp;
            }
            var now = timeStamp;
            var pass = now - this._time;
            this._time = now;
            dragonBones.WorldClock.clock.advanceTime(pass / 1000);
            return false;
        };
        //500ms本地一次心跳，3分钟服務端一次心跳
        ApplicationMediator.prototype.heartbeat = function () {
            var new_time_num = Math.ceil(new Date().getTime() / 1000);
            if (new_time_num > this.now_time_num) {
                var data = {
                    "total": this.now_time_num,
                    "delay": new_time_num - this.now_time_num
                };
                this.now_time_num = new_time_num;
                this.check_proxy_tick(data);
                this.sendNotification(mx.MX_NOTICE.TIME_TICK, data);
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_HEARTBEAT });
            }
        };
        //同一消息不能由多個command接收，可以由多個mediator接收，
        //一直存在的mediator只有ApplicationMediator，也可以记录时间点，计算时间差处理。
        ApplicationMediator.prototype.check_proxy_tick = function (data) {
            if (data.delay) {
                var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                gproxy.check_time_tick(data);
                var xxproxy = (this.facade.retrieveProxy(mx.XXiuProxy.NAME));
                xxproxy.up_xxiu_time(data);
                var xqproxy = (this.facade.retrieveProxy(mx.XqinProxy.NAME));
                xqproxy.decrease_cold(data.delay);
                var actyproxy = (this.facade.retrieveProxy(mx.ActyProxy.NAME));
                actyproxy.check_time_tick(data);
                var jproxy = (this.facade.retrieveProxy(mx.JingJiProxy.NAME));
                jproxy.check_time_tick(data);
                var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                hproxy.check_time_tick(data);
            }
        };
        ApplicationMediator.prototype.game_logout = function (data) {
            mx.DataTool.getInstance().on_dl_leave();
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            mx.DataTool.getInstance().set_QQ_Score(45, gproxy.user_vip);
            if (data) {
                if (window && window["mx_logout"]) {
                    window["mx_logout"]();
                }
            }
            else {
                this.mx_restart();
            }
        };
        ApplicationMediator.prototype.mx_restart = function () {
            if (this._hid) {
                egret.clearInterval(this._hid);
            }
            this.now_time_num = 0;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var serd = {
                "last": gproxy.last_ser,
                "nickname": gproxy.nickname,
                "server_list": gproxy.serd_list,
                "user_info": gproxy.user_info,
            };
            gproxy = null;
            //移除所有proxy
            this.facade.removeProxy(mx.DataProxy.NAME);
            this.facade.removeProxy(mx.GameProxy.NAME);
            this.facade.removeProxy(mx.SignProxy.NAME);
            this.facade.removeProxy(mx.MailProxy.NAME);
            this.facade.removeProxy(mx.HeroProxy.NAME);
            this.facade.removeProxy(mx.PackProxy.NAME);
            this.facade.removeProxy(mx.XXiuProxy.NAME);
            this.facade.removeProxy(mx.FubenProxy.NAME);
            this.facade.removeProxy(mx.ClothesProxy.NAME);
            this.facade.removeProxy(mx.PalaceProxy.NAME);
            this.facade.removeProxy(mx.CXGongProxy.NAME);
            this.facade.removeProxy(mx.XqinProxy.NAME);
            this.facade.removeProxy(mx.AVGProxy.NAME);
            this.facade.removeProxy(mx.TempleProxy.NAME);
            this.facade.removeProxy(mx.GuideProxy.NAME);
            this.facade.removeProxy(mx.ShopProxy.NAME);
            this.facade.removeProxy(mx.FriendProxy.NAME);
            this.facade.removeProxy(mx.ActyProxy.NAME);
            this.facade.removeProxy(mx.WaiJiaoProxy.NAME);
            this.facade.removeProxy(mx.LueDuoProxy.NAME);
            this.facade.removeProxy(mx.JingJiProxy.NAME);
            this.facade.removeProxy(mx.UnionProxy.NAME);
            this.facade.removeProxy(mx.ChatProxy.NAME); //聊天数据
            this.facade.removeProxy(mx.SystemProxy.NAME); //系统数据管理
            //重新注册proxy
            var cmmd = new mx.ModelPrepCommand();
            cmmd.execute(null);
            //初始化服务器数据
            var gproxy2 = this.facade.retrieveProxy(mx.GameProxy.NAME);
            gproxy2.init_server_data(serd);
            //重置位MX_COMMON
            mx.MX_COMMON.IN_GUIDE = 0;
            mx.WebTool.getInstance().close_web_tool();
            //清除请求记录
            mx.NetLoader.REST_RECORD();
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.StartScreen.S_NAME);
        };
        ApplicationMediator.NAME = "ApplicationMediator";
        return ApplicationMediator;
    }(puremvc.Mediator));
    mx.ApplicationMediator = ApplicationMediator;
    __reflect(ApplicationMediator.prototype, "mx.ApplicationMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ApplicationMediator.js.map