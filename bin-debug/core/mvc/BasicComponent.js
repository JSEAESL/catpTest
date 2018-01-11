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
var BasicComponent = (function (_super) {
    __extends(BasicComponent, _super);
    function BasicComponent(cd) {
        var _this = _super.call(this) || this;
        if (cd) {
            _this.adata = cd;
        }
        // let c_class = this["__class__"] as string;
        // let c_arr = c_class.split(".");
        // this.name = c_arr[1];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.mx_created, _this);
        return _this;
    }
    BasicComponent.prototype._onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._onAddToStage, this);
        this.onAddTostage();
        //this.set_skinname();
    };
    BasicComponent.prototype.onAddTostage = function () {
    };
    BasicComponent.prototype.onRmovestage = function () {
    };
    // //通用的绑定皮肤方法，子类可覆盖
    // protected set_skinname() : void{
    //     let cname = this.name;
    //     // if(AppConfig.GameTag == "WX"){//微信使用另一套机制
    //     //     let skinname = cname + "Skin";
    //     //     this.skinName = MX_SKIN[skinname];
    //     // }else{
    //     this.skinName = RES.getRes(cname + "Skin_exml");//默认使用立刻获取的方式
    //     //}
    // }
    BasicComponent.prototype.mx_created = function (event) {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
        this.pre_init();
    };
    //子类初始化操作
    BasicComponent.prototype.pre_init = function () { };
    BasicComponent.prototype.on_remove = function () {
        this.onRmovestage();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mx_created, this);
    };
    return BasicComponent;
}(eui.Component));
__reflect(BasicComponent.prototype, "BasicComponent");
//# sourceMappingURL=BasicComponent.js.map