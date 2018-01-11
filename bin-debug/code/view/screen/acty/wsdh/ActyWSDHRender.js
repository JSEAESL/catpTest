/**
 *   @author cy
 *   @date 2017.11.23
 *   @desc render
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
    var ActyWSDHRender = (function (_super) {
        __extends(ActyWSDHRender, _super);
        function ActyWSDHRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyWSDHRender.prototype.init_render = function () {
            this.dh_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ActyWSDHRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.dh_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ActyWSDHRender.prototype.btn_click = function (e) {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyWSDHAlert.S_NAME, "param": d });
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.ActyWSYLAlert.S_NAME);
        };
        ActyWSDHRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            this.item.data = {
                "id": data.item_id,
                "type": data.type,
                "num": data.num,
                "chicun": 65,
            };
            this.cost_t.text = "" + data.price;
            this.cost_t.textColor = Number(data.price) > aproxy.wsb_num ? 0x923B06 : 0x59547f;
            var now_cishu = aproxy.ws_duihuan[data.id] || 0;
            this.cs_t.text = now_cishu + "/" + data.cishu;
        };
        return ActyWSDHRender;
    }(mx.BasicRender));
    mx.ActyWSDHRender = ActyWSDHRender;
    __reflect(ActyWSDHRender.prototype, "mx.ActyWSDHRender");
})(mx || (mx = {}));
//# sourceMappingURL=ActyWSDHRender.js.map