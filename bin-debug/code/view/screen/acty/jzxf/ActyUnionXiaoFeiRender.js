/**
 *   @author cy
 *   @date 2017.11.17
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
    var ActyUnionXiaoFeiRender = (function (_super) {
        __extends(ActyUnionXiaoFeiRender, _super);
        function ActyUnionXiaoFeiRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyUnionXiaoFeiRender.prototype.init_render = function () {
            this.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ActyUnionXiaoFeiRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ActyUnionXiaoFeiRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var uproxy = facade.retrieveProxy(mx.UnionProxy.NAME);
            uproxy.target_jzxf_index = this.data.index;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_GOUM_JZXF,
                "id": this.data.index + 1
            });
        };
        ActyUnionXiaoFeiRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var obj = {
                "id": data.item_id,
                "type": data.award_type,
                "num": data.award_num,
                "chicun": 60,
                "fnt": "jzxf-9-12_fnt",
            };
            this.item.data = obj;
            this.jf_bt.text = data.jifenaward + "";
            switch (Number(data.cost_type)) {
                case 2:
                    this.tp_p.source = "ybao_20_png";
                    break;
                case 1:
                    this.tp_p.source = "ybi_20_png";
                    break;
                case 4:
                    this.tp_p.source = "zjbsliang_png";
                    break;
                case 12:
                    this.tp_p.source = "jzbix_png";
                    break;
            }
            this.jzjf_t.text = data.cost_num + "";
            if (data.state == 0) {
                this.buy_b.set_ssres("jxgmai_png");
            }
            else {
                this.buy_b.set_ssres("jxygmai_png");
            }
        };
        return ActyUnionXiaoFeiRender;
    }(mx.BasicRender));
    mx.ActyUnionXiaoFeiRender = ActyUnionXiaoFeiRender;
    __reflect(ActyUnionXiaoFeiRender.prototype, "mx.ActyUnionXiaoFeiRender");
})(mx || (mx = {}));
//# sourceMappingURL=ActyUnionXiaoFeiRender.js.map