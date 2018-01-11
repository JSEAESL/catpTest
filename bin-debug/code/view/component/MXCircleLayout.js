/**
* 自定义布局，支持椭圆（圆形），弧形布局
* mx@16/08/29
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
    var MXCircleLayout = (function (_super) {
        __extends(MXCircleLayout, _super);
        function MXCircleLayout(data) {
            var _this = _super.call(this) || this;
            //弧形布局只支持圆弧布局。(0, Math.PI)
            _this._data = data;
            return _this;
        }
        /**计算target的尺寸
         * 因为环形布局，依赖容器尺寸来定义半径，所以需要容器显式的设置width和height,
         * 在这种情况下measure方法将失去作用，如果需要根据内部子项计算尺寸，重写这个方法
         **/
        MXCircleLayout.prototype.measure = function () {
            _super.prototype.measure.call(this);
        };
        /**重写显示列表更新*/
        MXCircleLayout.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.target == null) {
                return;
            }
            var cd = this._data || {};
            //中心坐标
            var centerX = unscaledWidth / 2;
            var centerY = unscaledHeight / 2;
            var a = centerX - (cd.ww || 0); //X轴
            var b = centerY - (cd.hh || 0); //X轴
            var sa = cd.sa || 0; //起始角度。
            var rad = cd.rad || 2 * Math.PI;
            if (rad < Math.PI) {
                var r = centerX / Math.sin(rad / 2);
                a = b = r - (cd.ww || 0);
                sa = sa - rad / 2;
                centerY = r;
            }
            var maxX = 0;
            var maxY = 0;
            //重定位所有子元件
            for (var i = 0, count = this.target.numElements; i < count; i++) {
                var c_c = (this.target.getVirtualElementAt(i));
                if (!egret.is(c_c, "eui.UIComponent") || !c_c.includeInLayout) {
                    continue;
                }
                //获得角度的大小
                var maxa = rad < Math.PI ? count - 1 : count;
                var angle = sa + rad * i / maxa;
                //获得圆周点的X坐标
                var childX = centerX + a * Math.sin(angle) - (cd.ww || 0);
                var childY = centerY - b * Math.cos(angle) - (cd.hh || 0);
                c_c.setLayoutBoundsPosition(childX, childY);
                maxX = Math.max(maxX, childX + (cd.ww || 0));
                maxY = Math.max(maxY, childY + (cd.hh || 0));
            }
            this.target.setContentSize(maxX, maxY);
        };
        return MXCircleLayout;
    }(eui.LayoutBase));
    mx.MXCircleLayout = MXCircleLayout;
    __reflect(MXCircleLayout.prototype, "mx.MXCircleLayout");
})(mx || (mx = {}));
//# sourceMappingURL=MXCircleLayout.js.map