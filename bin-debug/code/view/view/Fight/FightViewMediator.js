/**
 @author mx qianjun
 *   @date 2016.10.9
 *   @desc 战斗界面
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
    var FightViewMediator = (function (_super) {
        __extends(FightViewMediator, _super);
        function FightViewMediator(viewComponent) {
            var _this = _super.call(this, FightViewMediator.NAME, viewComponent) || this;
            _this.init_listener();
            return _this;
        }
        Object.defineProperty(FightViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        FightViewMediator.prototype.onRemove = function () {
            var view = this.view;
            view.zanting_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.skip_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.skip_fight_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.speed_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        FightViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.FRESH_CPOP,
                mx.MX_NOTICE.FIGHT_QUIT,
                mx.MX_NOTICE.FIGHT_CONTINUE
            ];
        };
        FightViewMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.FRESH_CPOP:
                    var type = notification.getType();
                    if (type == mx.FightView.S_NAME) {
                        view.fresh_cpop(data);
                    }
                    break;
                case mx.MX_NOTICE.FIGHT_QUIT:
                    var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    if (mx.AppConfig.CURR_SCENE_ID == mx.YXDianScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.tx009 });
                    }
                    else if (mx.AppConfig.CURR_SCENE_ID == mx.JFSSYScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.jfs15, "教坊司") });
                    }
                    else if (lproxy.isLD) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.jfs15, "掠夺") });
                    }
                    else if (mx.AppConfig.CURR_SCENE_ID == mx.JJCMainScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.jfs15, "竞技场") });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightZantingView.S_NAME);
                        this.view.clear_fight_view();
                        this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME);
                    }
                    break;
                case mx.MX_NOTICE.FIGHT_CONTINUE:
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightZantingView.S_NAME);
                    this.view.continue_fight();
                    break;
            }
        };
        FightViewMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "n_ft"://开始战斗
                    mx.Combat.stage.goon_fight();
                    break;
                case "n_fend":
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                    break;
            }
        };
        FightViewMediator.prototype.init_listener = function () {
            var view = this.view;
            view.skip_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zanting_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.skip_fight_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.speed_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        FightViewMediator.prototype.set_speed = function () {
            return;
            /*let view : any = this.view;
            let speed = Number(view.speed_t.text);
            if(speed < 0 || speed > 10){
                speed = 1;
            }
            FightView.FLASH_DESC /= speed;
            FightView.L2T /= speed;
            view.speed_g.visible = false;
            view.goon_fight();*/
        };
        FightViewMediator.prototype.btn_click = function (e) {
            var view = this.view;
            var facade = this.facade;
            var fProxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            switch (e.currentTarget) {
                case view.speed_b:
                    view.speed = 3 - view.speed;
                    egret.localStorage.setItem("play_speed", view.speed + '');
                    view.speed_b.source = view.speed == 1 ? "fgcsu_png" : "fg2bsu_png";
                    break;
                case view.zanting_b:
                    if (mx.MX_COMMON.IN_GUIDE) {
                        return;
                    }
                    // if(!view.can_zanting){
                    //     if (lproxy.isLD) {//掠夺
                    //         facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : Tools.format(Lang.p0138 ,"掠夺")});
                    //     }else if (AppConfig.CURR_SCENE_ID == JJCMainScreen.S_NAME) {//jjc
                    //         facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : Tools.format(Lang.p0138,"竞技场")});
                    //     }
                    //     return;
                    // }
                    if (view.stop_touch) {
                        return;
                    }
                    this.sendNotification(mx.MX_NOTICE.SET_WAIT, true);
                    view.iswait = true;
                    view.pause = true;
                    break;
                case view.skip_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FightView.S_NAME); //关闭战斗弹窗。
                    facade.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                    break;
                case view.skip_fight_b:
                    if (!mx.Combat.is_click_skip || view.stop_touch)
                        return;
                    if (!view.skip_fight) {
                        this.sendNotification(mx.MX_NOTICE.SET_WAIT, true);
                        view.stop_touch = true;
                        view.skip_fight = true;
                    }
            }
        };
        FightViewMediator.NAME = "FightViewMediator";
        return FightViewMediator;
    }(puremvc.Mediator));
    mx.FightViewMediator = FightViewMediator;
    __reflect(FightViewMediator.prototype, "mx.FightViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FightViewMediator.js.map