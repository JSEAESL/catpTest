/**
 *   @author mx wf
 *   @date 2015.1.3 2016.10.9
 *   @desc 皇子所主界面
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
    var HZSuoScreen = (function (_super) {
        __extends(HZSuoScreen, _super);
        function HZSuoScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HZSuoScreen.mx_support = function () {
            return [
                "assets.palace_hzsuo",
                "api.JINJI", "api.PINGJIA", "api.GUANXI", "api.XINGGE", "api.ZINVQUMING", "api.FENGHAO",
                "api.GUANZHI", "api.FENGJUE", "api.PINLI", "api.ZINVSKILL",
                "data.1801"
            ];
        };
        HZSuoScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_hz_js1": //第一次加速
                case "s_hz_js2"://第二次加速
                    tar = this.hz_list.getChildAt(0);
                    tar = tar.jsu_b;
                    break;
                case "s_hz_cm"://第一个皇子赐名
                    tar = this.hz_list.getChildAt(0);
                    tar = tar.cming_b;
                    break;
                case "s_hz_cf"://第一个皇子册封
                    tar = this.hz_list.getChildAt(0);
                    tar = tar.cfeng_b;
                    break;
                case "s_hz_ly"://皇子结缘
                    tar = this.hz_list.getChildAt(0);
                    tar = tar.lyin_b;
                    break;
                case "s_hz_fh": //返回
                case "s_zn_tw2":
                    tar = this.back_b;
                    tar.x -= 10;
                    break;
                case "s_hz_hd"://皇子互动
                    tar = this.hz_list.getChildAt(0);
                    tar = tar.hdong_b;
                    break;
            }
            return tar;
        };
        HZSuoScreen.prototype.init_view = function () {
            var view = this;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hz_list.itemRenderer = mx.HzItemRender;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HZSuoScreenMediator(view));
        };
        Object.defineProperty(HZSuoScreen.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HZSuoScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            this.proxy.cur_hzs_type = 1;
            var p_name = HZSuoScreen.P_NAME;
            if (p_name) {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                HZSuoScreen.P_NAME = null;
            }
            else {
                var net = [{
                        "t": mx.MX_NETS.CS_HG_SHIJIAN,
                        "type": 3
                    }];
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                    "sname": mx.PalaceScreen.S_NAME,
                    "param": { "net": net }
                });
            }
        };
        HZSuoScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
            wproxy.setTx(false);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            facade.removeMediator(mx.HZSuoScreenMediator.NAME);
        };
        HZSuoScreen.S_NAME = "HZSuoScreen";
        return HZSuoScreen;
    }(mx.BasicView));
    mx.HZSuoScreen = HZSuoScreen;
    __reflect(HZSuoScreen.prototype, "mx.HZSuoScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HZSuoScreen.js.map