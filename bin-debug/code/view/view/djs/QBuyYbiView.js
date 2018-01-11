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
/**
*   @author mx、gaojing
*   @date 2015.1.3
*   @desc 点金手连续购买弹窗
**/
var mx;
(function (mx) {
    var QBuyYbiView = (function (_super) {
        __extends(QBuyYbiView, _super);
        function QBuyYbiView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QBuyYbiView.prototype.init_view_by_type = function () {
            //{"n" : 购买份数, "jyb" : 金元宝单价, "yb" : 银币单价}
            var cd = this.adata.param;
            this.title_t.text = mx.Tools.format(mx.Lang.a0000, cd.n);
            this.jybn_t.text = "" + (cd.jyb * cd.n);
            this.ybn_t.text = "" + (cd.yb * cd.n);
            var c_d = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            if (c_d.notice_ok) {
                var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                var have = (dproxy.get_currency("ybao") || 0);
                if (this.adata.param.jyb * this.adata.param.n > have) {
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.POP_VIEW,
                        "sdata_ok": { "name": mx.ShopAlert.S_NAME, "param": 2 },
                        "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                        "sdata_exit": QBuyYbiView.S_NAME,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    c_d.sdata_ok = p_d;
                }
            }
        };
        QBuyYbiView.S_NAME = "QBuyYbiView";
        return QBuyYbiView;
    }(mx.AlertView));
    mx.QBuyYbiView = QBuyYbiView;
    __reflect(QBuyYbiView.prototype, "mx.QBuyYbiView");
})(mx || (mx = {}));
//# sourceMappingURL=QBuyYbiView.js.map