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
 * @cy/16.9.13
 * 剧情恋爱render
 */
var mx;
(function (mx) {
    var JuQingLARender = (function (_super) {
        __extends(JuQingLARender, _super);
        function JuQingLARender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JuQingLARender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.juqing_p.source = "yh" + ((this.itemIndex + data.mid) % 12 + 1) + "_png";
            this.name_t.text = data.title;
            this.state_p.visible = true;
            this.fujia_t.text = "";
            this.suo_p.visible = false;
            this.pingfen_g.visible = false;
            var pji_res = { '1': 'yhpjjia', '2': 'yhpjyi', '3': 'yhpjbing', '4': 'yhpjding' };
            var pji_clr = { '1': 0xf06ba4, '2': 0x98c6fe, '3': 0xf5bb69, '4': 0xa6baa3 };
            switch (data.state) {
                case 0://未解锁
                    this.state_p.visible = false;
                    this.suo_p.visible = true;
                    break;
                case 1://已解锁
                    if (data.pj) {
                        this.state_p.visible = false;
                        this.pingfen_g.visible = true;
                        this.pji_p.source = pji_res[data.pj] + '_png';
                        this.fujia_t.text = mx.Lang.h0048 + data.fj;
                        this.fujia_t.textColor = pji_clr[data.pj];
                    }
                    this.state_p.source = "yjsuo_png";
                    break;
                case 2://已通关
                    this.pingfen_g.visible = true;
                    this.pji_p.source = pji_res[data.pj] + '_png';
                    this.fujia_t.text = mx.Lang.h0048 + data.fj;
                    this.fujia_t.textColor = pji_clr[data.pj];
                    this.state_p.source = "ytguan_png";
                    break;
            }
        };
        return JuQingLARender;
    }(mx.BasicRender));
    mx.JuQingLARender = JuQingLARender;
    __reflect(JuQingLARender.prototype, "mx.JuQingLARender");
})(mx || (mx = {}));
//# sourceMappingURL=JuQingLARender.js.map