/**
*   @author mx
*   @date 2015.1.3
*   @desc 选秀弹窗
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
    var GuideSelectScreen = (function (_super) {
        __extends(GuideSelectScreen, _super);
        function GuideSelectScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.heroid_arr = { "1": 310, "2": 313 };
            return _this;
        }
        GuideSelectScreen.mx_support = function () {
            return ["assets.gselect", "api.config"];
        };
        GuideSelectScreen.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.GuideSelectMediator(this));
            this.slt_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.slt1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.slt2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var zg1 = new mx.GeneralEffect("dshshuo");
            zg1.play_by_times(-1);
            this.c_g.addChild(zg1);
            var zg2 = new mx.GeneralEffect("dshshuo");
            zg2.play_by_times(-1);
            zg2.scaleX = -1;
            this.c_g.addChild(zg2);
            this.role_g.top = Math.max(224, mx.Tools.screen_height - 1062);
            mx.TweenTool.getInstance().breath_tween(this.role1);
            mx.TweenTool.getInstance().breath_tween(this.role2, false);
            this.set_view(false);
            this.cur_slt = this.heroid_arr["1"];
            if (mx.MX_COMMON.START_TD) {
                mx.MX_COMMON.START_TD = false;
                if (Main.TD_SHARE) {
                    mx.DataTool.getInstance().data_tool("FENXIANG_CLICK", {
                        "type": Main.TD_SHARE,
                        "new": "false"
                    });
                }
            }
        };
        GuideSelectScreen.prototype.set_view = function (see) {
            var view = this;
            view.bg_g.visible = view.role_g.visible = view.name1.visible = view.name2.visible = view.slt_b.visible = see;
            view.bg.source = see ? "fhjmdbging_jpg" : "fhjmdbging_jpg";
        };
        GuideSelectScreen.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.slt2:
                    view.cur_slt = view.heroid_arr["2"];
                    view.role_g.setChildIndex(view["role1_g"], 0);
                    view.role_g.setChildIndex(view["role2_g"], 1);
                    this.role2.source = "shn1_png";
                    this.name2.source = "shn1_name_png";
                    this.role1.source = "shm2_png";
                    this.name1.source = "shm2_name_png";
                    view.fxtip_p.visible = true;
                    break;
                case view.slt1:
                    view.cur_slt = view.heroid_arr["1"];
                    view.role_g.setChildIndex(view["role1_g"], 1);
                    view.role_g.setChildIndex(view["role2_g"], 0);
                    this.role2.source = "shn2_png";
                    this.name2.source = "shn2_name_png";
                    this.role1.source = "shm1_png";
                    this.name1.source = "shm1_name_png";
                    view.fxtip_p.visible = false;
                    break;
                case view.slt_b://小日本
                    facade.sendNotification(mx.MX_NOTICE.NEXT_GUIDE, { "slt": view.cur_slt });
                    view.fxtip_p.visible = false;
                    this.set_view(false);
                    break;
                default:
                    break;
            }
        };
        GuideSelectScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.GuideSelectMediator.NAME);
            this.slt_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.slt1.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btn_click, this);
            this.slt2.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btn_click, this);
            egret.Tween.removeTweens(this.role1);
            egret.Tween.removeTweens(this.role2);
        };
        GuideSelectScreen.S_NAME = "GuideSelectScreen";
        return GuideSelectScreen;
    }(mx.BasicView));
    mx.GuideSelectScreen = GuideSelectScreen;
    __reflect(GuideSelectScreen.prototype, "mx.GuideSelectScreen");
})(mx || (mx = {}));
//# sourceMappingURL=GuideSelectScreen.js.map