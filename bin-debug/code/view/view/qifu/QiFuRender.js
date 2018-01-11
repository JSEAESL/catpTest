/**
 *   @author cy
 *   @date 2017.10.24
 *   @desc 祈福render
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
    var QiFuRender = (function (_super) {
        __extends(QiFuRender, _super);
        function QiFuRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QiFuRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            this.name_t.text = d.name;
            if (Number(d.qifu) == 1) {
                this.di_p.source = "yinqian_png";
            }
            else {
                this.di_p.source = Number(d.vip) >= 10 ? "jijin_png" : "jizi_png";
            }
            this.qianyu_p.source = d.qianyu;
            this.res_p.source = d.res;
        };
        return QiFuRender;
    }(mx.BasicRender));
    mx.QiFuRender = QiFuRender;
    __reflect(QiFuRender.prototype, "mx.QiFuRender");
})(mx || (mx = {}));
//# sourceMappingURL=QiFuRender.js.map