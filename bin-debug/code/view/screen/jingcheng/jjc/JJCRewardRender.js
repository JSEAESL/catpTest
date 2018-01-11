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
 * @cy/17.3.13
 * jjc奖励render
 */
var mx;
(function (mx) {
    var JJCRewardRender = (function (_super) {
        __extends(JJCRewardRender, _super);
        function JJCRewardRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCRewardRender.prototype.init_render = function () {
            this.dataChanged();
            this.state_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JJCRewardRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.state_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JJCRewardRender.prototype.btn_click = function (e) {
            var data = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.state_b:
                    if (data.state == 1) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JJC_LINGQU,
                            "jl_id": data.id
                        });
                    }
                    break;
            }
        };
        JJCRewardRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
            var source;
            switch (data.state) {
                case 0://未达成
                    source = "wdcheng_png";
                    break;
                case 1://已达成
                    source = "jjclqu_png";
                    break;
                case 2://已领取
                    source = "jjcylqu_png";
                    break;
                case 3://待领取
                    source = "jjcdlqu_png";
                    break;
            }
            this.state_b.set_ssres(source);
            this.di_p.visible = this.rank_t.visible = true;
            var source2 = "pmx_png";
            if (data.id <= 3) {
                source2 = "pm" + data.id + "_png";
                this.rank_t.visible = false;
            }
            else {
                source2 = "pmxx_png";
                this.di_p.visible = false;
            }
            this.di_p.source = source2;
            this.rank_t.text = data.rank;
            this.award_t.text = mx.Lang.ybao + " x " + data.num;
        };
        return JJCRewardRender;
    }(mx.BasicRender));
    mx.JJCRewardRender = JJCRewardRender;
    __reflect(JJCRewardRender.prototype, "mx.JJCRewardRender");
})(mx || (mx = {}));
//# sourceMappingURL=JJCRewardRender.js.map