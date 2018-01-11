/**
 *   @author mx
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
    var YXDianMediator = (function (_super) {
        __extends(YXDianMediator, _super);
        function YXDianMediator(viewComponent) {
            var _this = _super.call(this, YXDianMediator.NAME, viewComponent) || this;
            _this.has_huaiyun = false;
            return _this;
        }
        Object.defineProperty(YXDianMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        YXDianMediator.prototype.onRemove = function () {
            var view = this.view;
            view.ef1_g.removeChildren();
            view.ef2_g.removeChildren();
            egret.Tween.removeTweens(view.bg1);
            egret.Tween.removeTweens(view.bg2);
            egret.Tween.removeTweens(view.fg1_1);
            egret.Tween.removeTweens(view.fg1_2);
            egret.Tween.removeTweens(view.fg2);
            egret.Tween.removeTweens(view.fg3);
        };
        YXDianMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.SHOW_TIAOXI_ANI,
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.FRESH_FZ_LIST,
                mx.MX_NOTICE.SET_WAIT,
                mx.MX_NOTICE.AVG_END,
                mx.MX_NOTICE.CHECK_HUAIYUN
            ];
        };
        YXDianMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var pproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME);
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.SHOW_TIAOXI_ANI:
                    this.show_tx_ani();
                    break;
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    if (data == 2000) {
                        view.fresh_ltp_num();
                    }
                    break;
                case mx.MX_NOTICE.FRESH_FZ_LIST:
                    view.fresh_fz_num(true);
                    break;
                case mx.MX_NOTICE.SET_WAIT:
                    if (!data) {
                        view.fresh_ltp_num();
                    }
                    break;
                case mx.MX_NOTICE.AVG_END:
                    pproxy.is_in_avg = false;
                    if (this.has_huaiyun) {
                        this.show_yun();
                    }
                    break;
                case mx.MX_NOTICE.CHECK_HUAIYUN:
                    if (pproxy.is_in_avg) {
                        this.has_huaiyun = true;
                    }
                    else {
                        this.show_yun();
                    }
                    break;
                default:
                    break;
            }
        };
        YXDianMediator.prototype.show_yun = function () {
            this.has_huaiyun = false;
            var net = [
                {
                    "t": mx.MX_NETS.CS_HG_SHIJIAN,
                    "type": 1
                }
            ];
            var param = {
                "sname": mx.PalaceScreen.S_NAME,
                "param": { "net": net }
            };
            var a_d2 = {
                "notice_ok": mx.MX_NOTICE.SCENE_CHANGE,
                "sdata_ok": param,
                "notice_exit": mx.MX_NOTICE.SCENE_CHANGE,
                "sdata_exit": param,
                "param": mx.Lang.hg104
            };
            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        YXDianMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_yxd_fp"://养心殿-妃嫔一览
                    this.view.do_tab_click(1);
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                    break;
                case "s_yxd_syd":
                    this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        "gkey": "m_hzs", "touch": "s_m_hg"
                    }); //跳到皇子引导
                    var net = [{
                            "t": mx.MX_NETS.CS_HG_SHIJIAN,
                            "type": 1
                        }];
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.PalaceScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
            }
        };
        YXDianMediator.prototype.show_tx_ani = function () {
            var view = this.view;
            view.txani_g.visible = true;
            view.bg1.source = "txbg1_png";
            view.bg2.source = "txbg2_png";
            view.fg1_1.source = "txfg1_png";
            view.fg1_2.source = "txfg1_png";
            view.fg2.source = "txfg2_png";
            view.fg3.source = "txfg3_png";
            view.ef1_g.removeChildren();
            view.ef2_g.removeChildren();
            view.msk.alpha = 0;
            view.fg1_1.left = -280;
            view.fg1_2.right = -280;
            view.fg2.top = view.fg3.top = -42;
            view.bg1.scaleX = view.bg1.scaleY = view.bg2.scaleX = view.bg2.scaleY = 1.1;
            view.fg2.scaleX = view.fg2.scaleY = view.fg3.scaleX = view.fg3.scaleY = 1.2;
            view.bg1.top = 226;
            view.bg2.top = -20;
            var axin = new mx.GeneralEffect("axin");
            var hua1 = new mx.GeneralEffect("hua");
            var hua2 = new mx.GeneralEffect("hua");
            var nan = new mx.GeneralEffect("nan");
            var nv = new mx.GeneralEffect("nv");
            view.ef2_g.addChild(hua1);
            view.ef2_g.addChild(hua2);
            view.ef1_g.addChild(nan);
            view.ef1_g.addChild(nv);
            hua1.play_by_times(-1);
            hua2.play_by_times(-1);
            axin.set_retain(true);
            nan.set_retain(true);
            nv.set_retain(true);
            nan.gotoAndStop(1);
            nv.gotoAndStop(1);
            hua1.scaleX = hua1.scaleY = hua2.scaleY = 1.1;
            hua2.scaleX = -1.1;
            hua1.x = -10;
            hua1.y = -30;
            hua2.x = 480;
            hua2.y = 20;
            nan.x = 100;
            nv.x = 220;
            nan.top = 260;
            nv.top = 320;
            var k = 2;
            egret.Tween.get(view.fg1_1, { 'loop': false }).to({ 'left': -100 }, 583 * k).to({ 'left': -106 }, 83).to({ 'left': -103 }, 83).to({ 'left': -108 }, 83);
            egret.Tween.get(view.fg1_2, { 'loop': false }).to({ 'right': -100 }, 583 * k).to({ 'right': -106 }, 83).to({ 'right': -103 }, 83).to({ 'right': -108 }, 83);
            egret.Tween.get(view.bg1, { 'loop': false }).to({ 'scaleX': 1, 'scaleY': 1, 'top': 234 }, 417 * k);
            egret.Tween.get(view.bg2, { 'loop': false }).to({ 'scaleX': 1, 'scaleY': 1, 'top': 0 }, 417 * k);
            egret.Tween.get(view.fg2, { 'loop': false }).to({ 'scaleX': 1, 'scaleY': 1, 'top': 0 }, 417 * k);
            egret.Tween.get(view.fg3, { 'loop': false }).to({ 'scaleX': 1, 'scaleY': 1, 'top': 0 }, 417 * k);
            egret.Tween.get(nan, { 'loop': false }).to({ 'x': 120, 'top': 250 }, 417 * k).to({ 'x': 120 }, 1333).call(function () {
                if (nan) {
                    nan.mx_play();
                }
            });
            egret.Tween.get(nv, { 'loop': false }).to({ 'x': 200, 'top': 310 }, 417 * k).to({ 'x': 200 }, 1333).call(function () {
                if (nv) {
                    view.ef2_g.addChild(axin);
                    axin.mx_play();
                    nv.mx_play();
                    egret.Tween.get(view.msk, { 'loop': false }).to({ 'alpha': 1 }, 667).to({ 'alpha': 1 }, 150).call(function () {
                        var wproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.WaiJiaoProxy.NAME);
                        wproxy.show_tiaoxi_avg();
                    });
                    egret.Tween.get(view.msk, { 'loop': false }).to({ 'scaleX': 1 }, 667 + 400).call(function () {
                        view.txani_g.visible = false;
                    });
                }
            });
        };
        YXDianMediator.NAME = "YXDianMediator";
        return YXDianMediator;
    }(puremvc.Mediator));
    mx.YXDianMediator = YXDianMediator;
    __reflect(YXDianMediator.prototype, "mx.YXDianMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YXDianMediator.js.map