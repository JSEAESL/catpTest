/**
*   @author wxw
*   @date 2017.10.30
*   @desc 服装搜索弹窗
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
    var ClothSearchAlert = (function (_super) {
        __extends(ClothSearchAlert, _super);
        function ClothSearchAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClothSearchAlert.mx_support = function () {
            return ["assets.cloth_search"];
        };
        ClothSearchAlert.prototype.init_view_by_type = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.ClothesProxy.NAME));
            this.search_des = mx.Tools.format(mx.Lang.fz034, mx.Lang.fz040[proxy.cur_type - 1]);
            view.fzss_et.text = this.search_des;
            if (proxy.cur_type == 1) {
                view.bj_search.source = "fzssuo_png";
            }
            else if (proxy.cur_type == 2) {
                view.bj_search.source = "bjssuo_png";
            }
            view.search_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.search_click, this);
            view.fzss_et.addEventListener(egret.FocusEvent.FOCUS_IN, this.start_edit, this);
            view.fzss_et.addEventListener(egret.FocusEvent.FOCUS_OUT, this.leave_edit, this);
        };
        ClothSearchAlert.prototype.start_edit = function (e) {
            if (e.currentTarget.text == this.search_des) {
                e.currentTarget.text = '';
            }
        };
        ClothSearchAlert.prototype.leave_edit = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            if (e.currentTarget.text == '') {
                e.currentTarget.text = this.search_des;
            }
        };
        ClothSearchAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.search_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.search_click, this);
            view.fzss_et.removeEventListener(egret.FocusEvent.FOCUS_IN, this.start_edit, this);
            view.fzss_et.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.leave_edit, this);
        };
        ClothSearchAlert.prototype.search_click = function (evt) {
            var _this = this;
            var view = this;
            var text = view.fzss_et.text;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.ClothesProxy.NAME));
            var cloth = mx.ApiTool.getAPINodes(mx.MX_APINAME.CLOTH, 'type', proxy.cur_type);
            var api = mx.ApiTool.getAPI(mx.MX_APINAME.CLOTH);
            var have_cloth = proxy.all_clothes[proxy.cur_type];
            var len = cloth.length;
            var arr = [];
            mx.MGTool.get_str(6, text).then(function (value) {
                _this.fzss_et.text = value.str;
                if (value.mg) {
                    return;
                }
                for (var i = 0; i < len; i++) {
                    var capi = cloth[i];
                    if (capi.name.indexOf(value.str) >= 0 && have_cloth[capi.id]) {
                        arr.push(capi);
                    }
                }
                if (arr.length > 0) {
                    facade.sendNotification(mx.MX_NOTICE.CLOTH_SEARCH, { "cloth": arr });
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ClothSearchAlert.S_NAME);
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fz035 });
                }
            }, function () {
                _this.fzss_et.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc001 });
            });
        };
        ClothSearchAlert.S_NAME = "ClothSearchAlert";
        return ClothSearchAlert;
    }(mx.AlertView));
    mx.ClothSearchAlert = ClothSearchAlert;
    __reflect(ClothSearchAlert.prototype, "mx.ClothSearchAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ClothSearchAlert.js.map