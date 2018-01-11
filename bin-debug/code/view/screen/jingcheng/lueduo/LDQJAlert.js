/**
 *   @author mx
 *   @date 2017.1.5
 *   @desc 掠夺敌人弹窗
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
    var LDQJAlert = (function (_super) {
        __extends(LDQJAlert, _super);
        function LDQJAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LDQJAlert.mx_support = function () {
            return ["assets.ldqjalert"];
        };
        LDQJAlert.prototype.init_view_by_type = function () {
            this.fresh_pop();
        };
        LDQJAlert.prototype.fresh_pop = function () {
            this.user_list.itemRenderer = mx.LDUserRender;
            var arr = this.adata;
            for (var k in arr) {
                arr[k].qipao = true;
            }
            this.user_list.dataProvider = new eui.ArrayCollection(arr);
            this.wqj_p.visible = !arr.length;
        };
        LDQJAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.user_list.dataProvider = null;
        };
        LDQJAlert.S_NAME = "LDQJAlert";
        return LDQJAlert;
    }(mx.AlertView));
    mx.LDQJAlert = LDQJAlert;
    __reflect(LDQJAlert.prototype, "mx.LDQJAlert");
})(mx || (mx = {}));
//# sourceMappingURL=LDQJAlert.js.map