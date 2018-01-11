/**
*   @author cy
*   @date 2017.9.26
*   @desc 玩吧专属背景弹窗
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
    var WanBaZSBJAlert = (function (_super) {
        __extends(WanBaZSBJAlert, _super);
        function WanBaZSBJAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WanBaZSBJAlert.mx_support = function () {
            return ["assets.wb_zsbj", "data.3716"];
        };
        WanBaZSBJAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var res = gproxy.cover_hongdian ? "kjlqjli_png" : "kjljszhi_png";
            this.fun_b.set_ssres(res);
            this.item_list.itemRenderer = mx.GNumRender;
            var arr = [
                { "type": 1, "num": 50000, "chicun": 42, "no_num": true, "top": 48 },
                { "type": 2, "num": 100, "chicun": 42, "no_num": true, "top": 48 },
                { "type": 4, "id": 2000, "num": 3, "chicun": 42, "no_num": true, "top": 48 },
            ];
            this.item_list.dataProvider = new eui.ArrayCollection(arr);
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
        };
        WanBaZSBJAlert.prototype.fun_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.target.res_name) {
                case "kjlqjli_png":
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_LQ_COVER
                    });
                    break;
                case "kjljszhi_png":
                    if (window && window["mx_set_cover"]) {
                        window["mx_set_cover"]();
                    }
                    break;
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, WanBaZSBJAlert.S_NAME);
        };
        WanBaZSBJAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
            this.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
        };
        WanBaZSBJAlert.S_NAME = "WanBaZSBJAlert";
        return WanBaZSBJAlert;
    }(mx.AlertView));
    mx.WanBaZSBJAlert = WanBaZSBJAlert;
    __reflect(WanBaZSBJAlert.prototype, "mx.WanBaZSBJAlert");
})(mx || (mx = {}));
//# sourceMappingURL=WanBaZSBJAlert.js.map