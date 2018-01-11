/**
 *   @author cy
 *   @date 2017.4.25
 *   @desc 职务render
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
    var UnionZhiWuRender = (function (_super) {
        __extends(UnionZhiWuRender, _super);
        function UnionZhiWuRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionZhiWuRender.prototype.init_render = function () {
            this.zw_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        UnionZhiWuRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            var str = "";
            switch (this.data.id) {
                case 1:
                    str = mx.Tools.format(mx.Lang.jz063, uProxy.cur_member.name);
                    break;
                case 2:
                    str = mx.Tools.format(mx.Lang.jz064, uProxy.cur_member.name);
                    break;
            }
            if (str != "") {
                var p_d = {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_UNION_RENMIN, "to_id": uProxy.cur_member.user_id, "type": this.data.id },
                        "param": str
                    }
                };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_UNION_RENMIN,
                    "to_id": uProxy.cur_member.user_id,
                    "type": this.data.id
                });
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.UnionZhiWuAlert.S_NAME);
        };
        UnionZhiWuRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.zw_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        UnionZhiWuRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.zw_b.set_ssres(data.bg);
            this.num_t.text = data.text;
            this.num_t.textColor = data.cor;
        };
        return UnionZhiWuRender;
    }(mx.BasicRender));
    mx.UnionZhiWuRender = UnionZhiWuRender;
    __reflect(UnionZhiWuRender.prototype, "mx.UnionZhiWuRender");
})(mx || (mx = {}));
//# sourceMappingURL=UnionZhiWuRender.js.map