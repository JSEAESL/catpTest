/**
*   @author hxj
*   @date 2017.7.3
*   @desc 相国寺（水月庵）主界面
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
    var XGSScreen = (function (_super) {
        __extends(XGSScreen, _super);
        function XGSScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XGSScreen.mx_support = function () {
            return ["assets.xgs_main"];
        };
        XGSScreen.prototype.init_view = function () {
            this.npc_name.text = mx.Lang.xgs02;
            this.npc_t.text = mx.Lang.xgs03;
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jianjie_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fpsh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.znsh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rename_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (mx.MX_COMMON.IN_GUIDE) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AVGView.S_NAME,
                    "param": {
                        "type": "guide_rename",
                    }
                });
            }
        };
        XGSScreen.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.back_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    break;
                case this.jianjie_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "xgs_jianjie",
                        }
                    });
                    break;
                case this.fpsh_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSAllQueen.S_NAME);
                    break;
                case this.znsh_b:
                    var net = [{
                            "t": mx.MX_NETS.CS_XGS_ZINV,
                            "page": 1,
                            "type": 1
                        }];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.XGSAllChild.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case this.rename_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_OLD_NAME });
                    break;
            }
        };
        XGSScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fpsh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.znsh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rename_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        XGSScreen.S_NAME = "XGSScreen";
        return XGSScreen;
    }(mx.BasicView));
    mx.XGSScreen = XGSScreen;
    __reflect(XGSScreen.prototype, "mx.XGSScreen");
})(mx || (mx = {}));
//# sourceMappingURL=XGSScreen.js.map