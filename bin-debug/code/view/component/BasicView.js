/**
*   @author mx
*   @date 2017.11.1修订
*   @desc 显示界面基类，处理皮肤添加，Y方向放缩，避免新手犯调用顺序，屏幕适配的错误
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
    var BasicView = (function (_super) {
        __extends(BasicView, _super);
        //可选-view的唯一标识，通常用于场景管理（screen，alert）,推荐与类名保持一致
        //public static S_NAME : string = "BasicView";
        //可选-VIEW所从属的模块名
        //public static M_NAME : string;
        //可选-VIEW的显示类型，目前用于弹窗是否需要缩放
        //public static V_MODE : string;
        //可选-VIEW预加载组包含：图片资源，静态表，网络数据
        //public static mx_support() : Array<string>{}
        //可选-获取引导目标，进而获取引导位置。由引导机制调用
        //public get_guide_pos(gkey): any {}
        function BasicView(cd) {
            return _super.call(this, cd) || this;
        }
        BasicView.prototype.pre_init = function () {
            this.percentHeight = 100; //高度满屏
            this.init_view();
            this.dispatchEvent(new egret.Event(mx.MX_COMMON.MX_CREATED));
        };
        //必需-初始化场景
        BasicView.prototype.init_view = function () { };
        //可选-场景释放，移除监听，Tween,龙骨，MC等。由场景管理器调用
        BasicView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
        };
        return BasicView;
    }(mx.BasicUI));
    mx.BasicView = BasicView;
    __reflect(BasicView.prototype, "mx.BasicView");
})(mx || (mx = {}));
//# sourceMappingURL=BasicView.js.map