/**
 *   @author hxj
 *   @date 2017.10.26
 *   @desc 翰林院太傅render
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
    var HLYTaiFuRender = (function (_super) {
        __extends(HLYTaiFuRender, _super);
        function HLYTaiFuRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HLYTaiFuRender.prototype.init_render = function () {
            this.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.learn_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        HLYTaiFuRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            this.bg.source = d.bg;
            this.tx.source = d.tx;
            this.title.source = d.title;
            this.body.source = d.body;
        };
        HLYTaiFuRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (e.currentTarget) {
                case this.tx:
                    if (this.data.tx == "zwtfu_png") {
                        pproxy.taifu_type = this.itemIndex + 1;
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.SelectTaiFuView.S_NAME });
                    }
                    else {
                        pproxy.taifu_type = this.itemIndex + 1;
                        var mid = pproxy.get_curr_mn(pproxy.taifu_list[this.itemIndex]);
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FZ_INFO,
                            "mid": mid.mid,
                            "type": 18,
                        });
                    }
                    break;
                case this.change_b:
                    pproxy.taifu_type = this.itemIndex + 1;
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.SelectTaiFuView.S_NAME });
                    break;
                case this.learn_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { t: mx.MX_NETS.CS_HZC_DATA, type: this.itemIndex + 1 });
                    break;
            }
        };
        HLYTaiFuRender.prototype.on_remove = function (evt) {
            if (!this.data || !this.skin) {
                return;
            }
            _super.prototype.on_remove.call(this);
            this.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.learn_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        return HLYTaiFuRender;
    }(mx.BasicRender));
    mx.HLYTaiFuRender = HLYTaiFuRender;
    __reflect(HLYTaiFuRender.prototype, "mx.HLYTaiFuRender");
})(mx || (mx = {}));
//# sourceMappingURL=HLYTaiFuRender.js.map