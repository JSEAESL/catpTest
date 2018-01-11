/**
*   @author cy
*   @date 2017.7.25
*   @desc 技能tip提示
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
    var QiuYuanTip = (function (_super) {
        __extends(QiuYuanTip, _super);
        function QiuYuanTip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QiuYuanTip.prototype.init_view = function () {
            this.qjia_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.union_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var data = this.adata;
            data.tip_w = this.tip_g.width;
            data.tip_h = this.tip_g.height;
            var p = mx.Tools.locate_tip(data);
            this.tip_g.x = p.x;
            if (p.x == 0) {
                this.tip_g.horizontalCenter = 0;
            }
            this.tip_g.y = p.y;
        };
        QiuYuanTip.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qjia_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.union_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        QiuYuanTip.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var d = this.adata.data;
            var obj = { "user_id": d.from_id, "jl_id": d.id, "name": d.name };
            lproxy.set_cur_user(obj);
            var now_time = Math.floor(new Date().getTime() / 1000);
            var xy_state = now_time < Number(d.xiuyang);
            switch (e.currentTarget) {
                case this.qjia_b://请亲家援助
                    if (d.xq) {
                        return;
                    }
                    if (xy_state) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.ld061 });
                        break;
                    }
                    lproxy.fight_type = "help";
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_LUEDUO_QINGJIA
                    });
                    break;
                case this.union_b:
                    lproxy.send_yuanzhu(d);
                    break;
            }
            this.on_remove();
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.REMOVE_UI);
        };
        return QiuYuanTip;
    }(mx.AlertView));
    mx.QiuYuanTip = QiuYuanTip;
    __reflect(QiuYuanTip.prototype, "mx.QiuYuanTip");
})(mx || (mx = {}));
//# sourceMappingURL=QiuYuanTip.js.map