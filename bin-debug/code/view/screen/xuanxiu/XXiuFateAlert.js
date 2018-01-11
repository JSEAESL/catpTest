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
 * @cy/2017.10.31
 *  选秀缘分alert
 */
var mx;
(function (mx) {
    var XXiuFateAlert = (function (_super) {
        __extends(XXiuFateAlert, _super);
        function XXiuFateAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuFateAlert.mx_support = function () {
            return ["assets.xx_fate"];
        };
        XXiuFateAlert.prototype.init_view_by_type = function () {
            this.fate_list.itemRenderer = mx.XXiuFateRender;
            this.fate_list.dataProvider = new eui.ArrayCollection(this.adata);
        };
        XXiuFateAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.fate_list.dataProvider = null;
        };
        XXiuFateAlert.S_NAME = "XXiuFateAlert";
        return XXiuFateAlert;
    }(mx.AlertView));
    mx.XXiuFateAlert = XXiuFateAlert;
    __reflect(XXiuFateAlert.prototype, "mx.XXiuFateAlert");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuFateAlert.js.map