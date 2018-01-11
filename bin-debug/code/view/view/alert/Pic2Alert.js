/**
 * @author gaojing、mx
 * @date 2017.12.21
 * 图片说明弹窗，可以指定图片标题和图片内容。
 */
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
    var Pic2Alert = (function (_super) {
        __extends(Pic2Alert, _super);
        function Pic2Alert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Pic2Alert.mx_support = function () {
            return ["assets.tm_sm"];
        };
        Pic2Alert.prototype.init_view_by_type = function () {
            var data = this.adata;
            this.title_p.source = data.title;
            this.wenzi_p.source = data.wenzi;
            this.ok_b.visible = false;
            switch (data.title) {
                case "khsmbti_png":
                    this.ok_b.visible = true;
                    this.ok_b.set_ssres("hnnaniu_png");
                    data.notice_ok = mx.MX_NOTICE.POP_VIEW;
                    data.sdata_ok = {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "temple_shuoming",
                        },
                    };
                    break;
            }
        };
        Pic2Alert.S_NAME = "Pic2Alert";
        return Pic2Alert;
    }(mx.AlertView));
    mx.Pic2Alert = Pic2Alert;
    __reflect(Pic2Alert.prototype, "mx.Pic2Alert");
})(mx || (mx = {}));
//# sourceMappingURL=Pic2Alert.js.map