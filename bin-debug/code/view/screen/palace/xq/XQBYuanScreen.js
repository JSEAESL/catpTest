/**
*   @author qianjun
*   @date 2015.1.3
*   @desc 省亲主界面
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
    var XQBYuanScreen = (function (_super) {
        __extends(XQBYuanScreen, _super);
        function XQBYuanScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XQBYuanScreen.mx_support = function () {
            return ["assets.palace_xqin_main", "api.HOMEAWARD", "data.1701", "data.1721"];
        };
        XQBYuanScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_xq_cy"://出游
                    tar = this.men_list.getChildAt(0);
                    tar = tar.go1_btn;
                    break;
                case "s_xq_fh"://返回
                    tar = this.back_b;
                    break;
            }
            return tar;
        };
        XQBYuanScreen.prototype.init_view = function () {
            var view = this;
            view.back_b.set_ssres("back_png");
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.prev_b.set_ssres("prev_btn_png");
            this.next_b.set_ssres("prev_btn_png");
            this.next_b.scaleX = -1;
            this.head_btn.set_ssres("sye_btn_png");
            this.tail_btn.set_ssres("wye_btn_png");
            mx.ApplicationFacade.getInstance().registerMediator(new mx.XQBYuanMediator(view));
        };
        XQBYuanScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cs = XQBYuanScreen.P_NAME;
            if (cs) {
                XQBYuanScreen.P_NAME = null;
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, cs);
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.PalaceScreen.S_NAME);
            }
        };
        XQBYuanScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.XQBYuanMediator.NAME);
        };
        XQBYuanScreen.prototype.fresh_screen = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = facade.retrieveProxy(mx.XqinProxy.NAME);
            facade.sendNotification(mx.MX_NOTICE.XINGQIN_ZINV);
        };
        XQBYuanScreen.S_NAME = "XQBYuanScreen";
        return XQBYuanScreen;
    }(mx.BasicView));
    mx.XQBYuanScreen = XQBYuanScreen;
    __reflect(XQBYuanScreen.prototype, "mx.XQBYuanScreen");
})(mx || (mx = {}));
//# sourceMappingURL=XQBYuanScreen.js.map