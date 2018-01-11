/**
 *   @author cy
 *   @date 2017.1.9
 *   @desc 教坊司外面
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
    var JFSScreen = (function (_super) {
        __extends(JFSScreen, _super);
        function JFSScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JFSScreen.mx_support = function () {
            return ["assets.jfs_ydao"];
        };
        JFSScreen.prototype.init_view = function () {
            this.r_name_t.text = mx.Lang.jfs01;
            this.con_t.text = mx.Lang.jfs02;
            this.jqkk_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hkpx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JFSScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            switch (e.currentTarget) {
                case this.jqkk_b:
                    wproxy.jfs_tab = 0;
                    var net = [{
                            "t": mx.MX_NETS.CS_JIAOFANGSI_DATA,
                        }, {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11",
                        }];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.JFSSYScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case this.hkpx_b:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    break;
                case this.back_b:
                    wproxy.setTx(false);
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    break;
            }
        };
        JFSScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.jqkk_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hkpx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JFSScreen.S_NAME = "JFSScreen";
        return JFSScreen;
    }(mx.AlertView));
    mx.JFSScreen = JFSScreen;
    __reflect(JFSScreen.prototype, "mx.JFSScreen");
})(mx || (mx = {}));
//# sourceMappingURL=JFSScreen.js.map