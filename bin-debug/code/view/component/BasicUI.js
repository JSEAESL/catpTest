/**
*   @author mx
*   @date 2015.1.3
*   @desc 显示UI基类,大小与皮肤保持一致
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
    var BasicUI = (function (_super) {
        __extends(BasicUI, _super);
        function BasicUI(cd) {
            var _this = _super.call(this) || this;
            if (cd) {
                _this.adata = cd;
            }
            var c_class = _this["__class__"];
            var c_arr = c_class.split(".");
            _this.name = c_arr[1];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.mx_created, _this);
            return _this;
        }
        BasicUI.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.set_skinname();
        };
        //通用的绑定皮肤方法，子类可覆盖
        BasicUI.prototype.set_skinname = function () {
            var cname = this.name;
            if (mx.AppConfig.GameTag == "WX") {
                var skinname = cname + "Skin";
                this.skinName = mx.MX_SKIN[skinname];
            }
            else {
                this.skinName = RES.getRes(cname + "Skin_exml"); //默认使用立刻获取的方式
            }
        };
        BasicUI.prototype.mx_created = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
            this.pre_init();
        };
        //子类初始化操作
        BasicUI.prototype.pre_init = function () { };
        BasicUI.prototype.on_remove = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
            this.removeEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
        };
        return BasicUI;
    }(eui.Component));
    mx.BasicUI = BasicUI;
    __reflect(BasicUI.prototype, "mx.BasicUI");
})(mx || (mx = {}));
window["mx"] = mx;
//# sourceMappingURL=BasicUI.js.map