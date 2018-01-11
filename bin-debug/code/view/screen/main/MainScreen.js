/**
*   @author mx
*   @date 2015.1.3
*   @desc 主界面
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
    var MainScreen = (function (_super) {
        __extends(MainScreen, _super);
        function MainScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.main_acty = ["bhyjshi", "bkfjjin", "bnhkquan",
                "bscyli", "byjlsxing", "zlchbang", "weizhucehaoyou"]; //banner对应图片
            _this.acty_arr = [];
            _this.k = 0;
            _this.aid_arr = [2, 1]; //初始show_banner后变为[1,2]
            _this.main_show_tishi = false;
            return _this;
        }
        MainScreen.mx_support = function () {
            return [
                "assets.main", "assets.public",
                "api.config",
                "data.2835", "data.2801", "data.1103", "data.2101", "data.2403", "data.1715", "data.1701", "data.2503", "data.2501",
                "data.2001", "data.3714", "data.2824", "data.1115", "data.2847", "data.2506", "data.4501", "data.2510",
                "data.2812", "data.2809", "data.2829", "data.2802"
            ];
        };
        MainScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_m_rw":
                    tar = this.task_b;
                    break;
                case "s_m_zs"://装束，顶对齐，可以直接指定。
                    tar = this.view_list.getChildAt(2);
                    break;
                case "s_m_hg": //主页-后宫
                case "s_mt_xx": //主业-选秀
                case "s_mt_jc"://主页-京城
                    tar = this.tabmenu.get_guide_target(gkey);
                    break;
            }
            return tar;
        };
        MainScreen.prototype.init_view = function () {
            mx.ChatScreen.P_NAME = MainScreen.S_NAME;
            if (mx.AppConfig.GameTag == "WX") {
                this.shouqi_g.visible = false;
            }
            this.xx_ui.set_scale(0.78);
            this.view_list.itemRenderer = mx.SSButtonRender;
            this.acty_list.itemRenderer = mx.SSButtonRender;
            //默认收起
            this.left_g.top = mx.Tools.screen_height - 536;
            this.left_g.height = 0;
            this.left_g.visible = false;
            this.show_b.rotation = 0;
            this.show_b.anchorOffsetX = this.show_b.width / 2;
            this.show_b.anchorOffsetY = this.show_b.height / 2;
            this.show_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.left_show, this);
            this.banner_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.banner_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            //领取红包
            if (gproxy.hongbao_create) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_HONGBAO_LQ, 'id': mx.AppConfig.HB_ID, 'to_id': Main.USER_ID, "flag": true
                });
            }
            //活动banner
            /*let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0xffffff);
            shape.graphics.drawRect(0, 0, 344, 118);
            shape.graphics.endFill();
            this.banner_g.addChild(shape);
            this.banner_g.mask = shape;
            this.bannerdi_p.source = "zybdchen_png";
            for (let k in this.main_acty) {
                let acty_isopen = MX_COMMON.MAIN_ACTYTIME[k];
                let arr_condition = acty_isopen.split("|");
                let isopen = false;
                switch (arr_condition.length) {//MAIN_ACTYTIME
                    case 1://name
                        if (acty_isopen == "open") {//open强制打开
                            isopen = true;
                        } else if (acty_isopen == "close") {//close强制关闭
                            isopen = false;
                        } else if (gproxy[arr_condition[0]]) {//gproxy.name
                            isopen = true;
                        }
                        break;
                    case 2://name|num
                        if (Number(gproxy[arr_condition[0]]) < Number(arr_condition[1])) {//gproxy.name < num
                            isopen = true;
                        }
                        break;
                    case 3://name|opt|num gproxy.name opt num
                        break;
                    default:
                        isopen = false;
                        break;
                }
                if (isopen) {
                    this.acty_arr.push(this.main_acty[k]);
                }
            }
            this.banner_p1.source = this.acty_arr[0] + "_png";
            if (this.acty_arr.length > 1) {
                this.show_banner();
            }
            else if (this.acty_arr.length == 0) {
                this.banner_g.visible = false;
            }*/
            facade.registerMediator(new mx.MainMediator(this));
        };
        MainScreen.prototype.banner_click = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.MX_COMMON.MAIN_ACTYALERT[this.main_acty.indexOf(this.acty_arr[(this.k - 1 + this.acty_arr.length) % this.acty_arr.length])] });
        };
        MainScreen.prototype.change_banner = function () {
            var view = this;
            view.timerclose.stop();
            view.timerclose.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.change_banner, this);
            view.timerclose = null;
            egret.Tween.get(view["banner_p" + this.aid_arr[0]]).to({ "horizontalCenter": -344 }, 300).call(this.show_banner, this);
            egret.Tween.get(view["banner_p" + this.aid_arr[1]]).to({ "horizontalCenter": 0 }, 300);
        };
        MainScreen.prototype.show_banner = function () {
            var view = this;
            //aid_arr记录p1，p2位置关系
            var temp = this.aid_arr[0];
            this.aid_arr[0] = this.aid_arr[1];
            this.aid_arr[1] = temp;
            //仅对原正中显示banner操作，不改变现有显示banner
            view["banner_p" + this.aid_arr[1]].horizontalCenter = 344;
            view["banner_p" + this.aid_arr[1]].source = this.acty_arr[(this.k + 1) % this.acty_arr.length] + "_png";
            this.k++;
            if (this.k >= this.acty_arr.length) {
                this.k = 0;
            }
            ;
            this.timerclose = new egret.Timer(4000, 1);
            this.timerclose.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.change_banner, this);
            this.timerclose.start();
        };
        MainScreen.prototype.left_show = function () {
            var der = this.show_b.rotation;
            this.show_b.set_tsres();
            if (der == -180) {
                egret.Tween.get(this.show_b).to({ "rotation": 0 }, 500, egret.Ease.sineIn).call(this.check_show, this);
                egret.Tween.get(this.left_g).to({ "top": mx.Tools.screen_height - 536, }, 500);
            }
            else if (der == 0) {
                this.left_g.visible = true;
                var extra_height = 27; //通用图标高度79，若有超出请减去
                egret.Tween.get(this.show_b).to({ "rotation": -180 }, 500, egret.Ease.sineIn);
                egret.Tween.get(this.left_g).to({ "top": Math.max(mx.Tools.screen_height - 586 - (79 + 12) * mx.MX_COMMON.MAIN_VIEW.length - extra_height, 180) }, 500);
            }
        };
        MainScreen.prototype.check_show = function () {
            this.left_g.visible = false;
            if (this.show_b.rotation == 0 && this.main_show_tishi) {
                this.show_b.set_tsres("tishi_png", { "scaleY": -1, "top": 30, "right": -20 });
            }
        };
        MainScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.tabmenu.on_remove();
            this.topinfo.on_remove();
            this.chat_ui.on_remove();
            //this.bj_ui.on_remove();
            this.xx_ui.on_remove();
            egret.Tween.removeTweens(this.show_b);
            egret.Tween.removeTweens(this.left_g);
            egret.Tween.removeTweens(this.banner_p1);
            egret.Tween.removeTweens(this.banner_p2);
            this.show_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.left_show, this);
            this.banner_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.banner_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.MainMediator.NAME);
        };
        MainScreen.S_NAME = "MainScreen";
        return MainScreen;
    }(mx.BasicView));
    mx.MainScreen = MainScreen;
    __reflect(MainScreen.prototype, "mx.MainScreen");
})(mx || (mx = {}));
//# sourceMappingURL=MainScreen.js.map