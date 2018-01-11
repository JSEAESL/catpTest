/**
 * @author cy
 * @date 2017.11.23
 */
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
    var ActyWSDHAlert = (function (_super) {
        __extends(ActyWSDHAlert, _super);
        function ActyWSDHAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.max_num = 0;
            return _this;
        }
        ActyWSDHAlert.mx_support = function () {
            return ["assets.acty_wushuang_duihuan"];
        };
        ActyWSDHAlert.prototype.init_view_by_type = function () {
            this.re_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.dh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.xz_sp.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
            this.fresh_view();
        };
        ActyWSDHAlert.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var view = this;
            var data = this.adata;
            view.xz_sp.minimum = 0; //定义最小值
            var now_cishu = aproxy.ws_duihuan[data.id] || 0;
            this.max_num = Number(data.cishu) - Number(now_cishu);
            view.xz_sp.maximum = this.max_num; //定义最大值
            view.xz_sp.value = 0;
            var sli_obj = {
                "up": "wsdhhuatiao_png",
                "down": "wsdhhuakuaidi_png",
                "middle": "wsdhhuakuai_png",
            };
            view.xz_sp.set_res(sli_obj);
            view.cs_t.text = view.xz_sp.value + "/" + this.max_num;
            this.item.data = {
                "id": data.item_id,
                "type": data.type,
                "num": data.num,
                "chicun": 57,
            };
            view.has_t.text = "" + aproxy.wsb_num;
            var info = mx.Tools.get_item_info(data.type, data.item_id);
            view.name_t.text = info ? info.name : "";
        };
        ActyWSDHAlert.prototype.button_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.re_b:
                    this.xz_sp.value = Math.max(0, this.xz_sp.value - 1);
                    this.show_num();
                    break;
                case this.add_b:
                    this.xz_sp.value = Math.min(Number(this.max_num), this.xz_sp.value + 1);
                    this.show_num();
                    break;
                case this.dh_b:
                    if (this.xz_sp.value) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_ACT_WS_DUIHUAN,
                            "id": this.adata.id,
                            "num": this.xz_sp.value,
                        });
                    }
                    break;
            }
        };
        ActyWSDHAlert.prototype.changeHandler = function (evt) {
            this.show_num();
        };
        ActyWSDHAlert.prototype.show_num = function () {
            var view = this;
            var target = view.xz_sp;
            view.cs_t.text = target.value + "/" + this.max_num;
            view.need_t.text = target.value * Number(this.adata.price) + "";
        };
        ActyWSDHAlert.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ActyWSDHAlert.S_NAME);
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyWSYLAlert.S_NAME, "param": 1 });
        };
        ActyWSDHAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.re_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.dh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.button_click, this);
            this.xz_sp.removeEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        };
        ActyWSDHAlert.S_NAME = "ActyWSDHAlert";
        return ActyWSDHAlert;
    }(mx.AlertView));
    mx.ActyWSDHAlert = ActyWSDHAlert;
    __reflect(ActyWSDHAlert.prototype, "mx.ActyWSDHAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyWSDHAlert.js.map