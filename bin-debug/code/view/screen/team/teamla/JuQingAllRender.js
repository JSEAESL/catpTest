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
 * 全部剧情render
 */
var mx;
(function (mx) {
    var JuQingAllRender = (function (_super) {
        __extends(JuQingAllRender, _super);
        function JuQingAllRender() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            return _this;
        }
        JuQingAllRender.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.dataChanged();
        };
        JuQingAllRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.state_p.visible = true;
            var str;
            var name = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", data.mid).hero_name;
            if (data.mid == 55 || data.mid == 56 || data.mid == 57) {
                data.status = 3;
            }
            switch (data.status) {
                case 0://恋爱中
                    this.state_p.source = "lazhong_png";
                    str = mx.Tools.format(mx.Lang.h0051, data.id, name);
                    break;
                case 1://已入后宫
                    this.state_p.source = "yrhgong_png";
                    str = mx.Tools.format(mx.Lang.h0051, data.id, name);
                    break;
                case 2://缘分已尽
                    this.state_p.source = "yfyjin_png";
                    str = mx.Tools.format(mx.Lang.h0051, data.id, name);
                    break;
                case 3://没有这个英雄
                    this.state_p.visible = false;
                    str = mx.Tools.format(mx.Lang.h0051, "?", "???");
                    break;
            }
            this.guan_t.text = str;
        };
        return JuQingAllRender;
    }(mx.BasicRender));
    mx.JuQingAllRender = JuQingAllRender;
    __reflect(JuQingAllRender.prototype, "mx.JuQingAllRender");
})(mx || (mx = {}));
//# sourceMappingURL=JuQingAllRender.js.map