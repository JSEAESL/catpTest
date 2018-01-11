/**
* 自定义布局，等差排列
* qianjun@16/08/29
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
    var MXArithmeticLayout = (function (_super) {
        __extends(MXArithmeticLayout, _super);
        function MXArithmeticLayout(data) {
            var _this = _super.call(this) || this;
            //非常特殊 直接写死
            _this.juqing_pos = {
                3: { 1: { 'x': 367, 'y': 0 }, 2: { 'x': 150, 'y': 93 }, 3: { 'x': 417, 'y': 234 } },
                5: { 1: { 'x': 398, 'y': 0 }, 2: { 'x': 181, 'y': 93 }, 3: { 'x': 448, 'y': 232 }, 4: { 'x': 276, 'y': 329 }, 5: { 'x': 197, 'y': 542 } },
                8: { 1: { 'x': 411, 'y': 0 }, 2: { 'x': 194, 'y': 93 }, 3: { 'x': 461, 'y': 232 }, 4: { 'x': 247, 'y': 288 }, 5: { 'x': 451, 'y': 411 }, 6: { 'x': 386, 'y': 628 }, 7: { 'x': 165, 'y': 494 }, 8: { 'x': 167, 'y': 717 }, 9: { 'x': 386, 'y': 881 }, 10: { 'x': 169, 'y': 1019 }, 11: { 'x': 417, 'y': 1157 }, 12: { 'x': 443, 'y': 1399 }, 13: { 'x': 211, 'y': 1307 }, 14: { 'x': 260, 'y': 1551 } }
            };
            _this._data = data;
            return _this;
        }
        /**计算target的尺寸
         * 因为环形布局，依赖容器尺寸来定义半径，所以需要容器显式的设置width和height,
         * 在这种情况下measure方法将失去作用，如果需要根据内部子项计算尺寸，重写这个方法
         **/
        MXArithmeticLayout.prototype.measure = function () {
            _super.prototype.measure.call(this);
        };
        /**重写显示列表更新*/
        MXArithmeticLayout.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.target == null) {
                return;
            }
            var cd = this._data || {};
            var maxX = 0;
            var maxY = 0;
            //重定位所有子元件
            for (var i = 0, count = this.target.numElements; i < count; i++) {
                var c_c = (this.target.getVirtualElementAt(i));
                if (!egret.is(c_c, "eui.UIComponent") || !c_c.includeInLayout) {
                    continue;
                }
                //获得圆周点的X坐标
                var childX = 0;
                var childY = 0;
                switch (cd.type) {
                    case "desc"://等差
                        childX = i % 2 == 0 ? ((i / 2) * (cd.desc + cd.width)) : (1 * (cd.width - 20) + (i / 2 - 0.5) * (cd.width + 46));
                        childY = i % 2 == 0 ? 0 : 61;
                        break;
                    case "spe"://非相等间距
                        childX = (i == count - 1 ? (i * (cd.width + cd.desc) - cd.desc) : (i * (cd.width + cd.desc))) + 30;
                        childY = i == count - 1 ? -5 : 0;
                        break;
                    case "hor"://水平
                        childX = i * (cd.gap + cd.width);
                        childY = 0;
                        maxX = cd.width;
                        maxY = cd.height;
                        break;
                    case 'juqing'://剧情专用
                        childX = this.juqing_pos[cd.pos_type][i + 1].x;
                        childY = this.juqing_pos[cd.pos_type][i + 1].y;
                        break;
                }
                c_c.setLayoutBoundsPosition(childX, childY);
                maxX = Math.max(maxX, childX + (cd.width || 0));
                maxY = Math.max(maxY, childY + (cd.height || 0));
            }
            this.target.setContentSize(maxX, maxY);
        };
        return MXArithmeticLayout;
    }(eui.LayoutBase));
    mx.MXArithmeticLayout = MXArithmeticLayout;
    __reflect(MXArithmeticLayout.prototype, "mx.MXArithmeticLayout");
})(mx || (mx = {}));
//# sourceMappingURL=MXArithmeticLayout.js.map