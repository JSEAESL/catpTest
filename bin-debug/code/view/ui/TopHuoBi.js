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
*   @author dingyunfeng
*   @date 2017.11.1
*   @desc 元宝、货币、体力UI组件
**/
var mx;
(function (mx) {
    var TopHuoBi = (function (_super) {
        __extends(TopHuoBi, _super);
        function TopHuoBi() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopHuoBi.prototype.pre_init = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.TopHuoBiMediator(this));
            this.set_hide(this.hide_data);
        };
        TopHuoBi.prototype.set_hide = function (data) {
            if (!this.skin || !data) {
                this.hide_data = data;
                return;
            }
            if (data.yuanbao) {
                this.yuanbao_g.visible = false;
            }
            if (data.yinbi) {
                this.yinbi_g.visible = false;
                this.yuanbao_g.left += 225;
            }
            if (data.tili) {
                this.tili_g.visible = false;
                this.yuanbao_g.left += 225;
                this.yinbi_g.left += 225;
            }
        };
        TopHuoBi.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.TopHuoBiMediator.NAME);
            this.removeChildren();
        };
        return TopHuoBi;
    }(mx.BasicUI));
    mx.TopHuoBi = TopHuoBi;
    __reflect(TopHuoBi.prototype, "mx.TopHuoBi");
})(mx || (mx = {}));
//# sourceMappingURL=TopHuoBi.js.map