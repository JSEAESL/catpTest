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
 * @author daiqi
 * @date 2017.5.16
 * 奖励一览弹窗
 */
var mx;
(function (mx) {
    var XXiuAwardAlert = (function (_super) {
        __extends(XXiuAwardAlert, _super);
        function XXiuAwardAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuAwardAlert.mx_support = function () {
            return ["assets.xx_award", "api.PICKVIP", "api.PICKYILAN"];
        };
        XXiuAwardAlert.prototype.init_view_by_type = function () {
            this.wenzi.source = "ckdjtszi_png";
            var type = mx.Lang.te006;
            var up_arr = ["scscong_png", "scdju2_png"];
            var down_arr = ["scscong1_png", "scdju1_png"];
            var item_arr = [];
            for (var k in type) {
                item_arr.push({
                    "up": "scbtn_png",
                    "word": type[k],
                    "up_p": up_arr[k],
                    "down_p": down_arr[k]
                });
            }
            this.toggle_list.dataProvider = new eui.ArrayCollection(item_arr);
            this.toggle_list.selectedIndex = 0;
            this.shicong_t.touchEnabled = false;
            this.shicong_t.text = mx.Lang.te004[0];
            if (this.adata.yincang) {
                this.exit_b.visible = false;
            }
            mx.ApplicationFacade.getInstance().registerMediator(new mx.XXiuAwardAlertMediator(this));
        };
        XXiuAwardAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.sort_ui.on_remove();
            mx.ApplicationFacade.getInstance().removeMediator(mx.XXiuAwardAlertMediator.NAME);
        };
        XXiuAwardAlert.S_NAME = "XXiuAwardAlert";
        return XXiuAwardAlert;
    }(mx.AlertView));
    mx.XXiuAwardAlert = XXiuAwardAlert;
    __reflect(XXiuAwardAlert.prototype, "mx.XXiuAwardAlert");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuAwardAlert.js.map