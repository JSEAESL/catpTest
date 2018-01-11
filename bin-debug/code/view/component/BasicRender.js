/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 基本的XY定位render
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
    var BasicRender = (function (_super) {
        __extends(BasicRender, _super);
        function BasicRender() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
            _this.once(eui.UIEvent.COMPLETE, _this.mx_created, _this);
            return _this;
        }
        BasicRender.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.set_skinname();
        };
        //通用的绑定皮肤方法，子类可覆盖
        BasicRender.prototype.set_skinname = function () {
            var c_class = this["__class__"];
            var c_arr = c_class.split("."); //mx.basicview
            var cname = c_arr[1];
            if (mx.AppConfig.GameTag == "WX") {
                var skinname = cname + "Skin";
                this.skinName = mx.MX_SKIN[skinname];
            }
            else {
                this.skinName = RES.getRes(cname + "Skin_exml"); //默认使用立刻获取的方式
            }
        };
        BasicRender.prototype.mx_created = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
            this.init_render();
        };
        BasicRender.prototype.init_render = function () {
            this.dataChanged();
        };
        BasicRender.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (data.x) {
                this.x = data.x;
            }
            if (data.y) {
                this.y = data.y;
            }
        };
        BasicRender.prototype.on_remove = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
            this.removeEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
            this.data = null;
        };
        return BasicRender;
    }(eui.ItemRenderer));
    mx.BasicRender = BasicRender;
    __reflect(BasicRender.prototype, "mx.BasicRender");
})(mx || (mx = {}));
//# sourceMappingURL=BasicRender.js.map