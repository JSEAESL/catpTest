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
 * @author cy
 * @date 2017.10.24
 * 祈福结果
 */
var mx;
(function (mx) {
    var QiFuResAlert = (function (_super) {
        __extends(QiFuResAlert, _super);
        function QiFuResAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QiFuResAlert.prototype.init_view_by_type = function () {
            var view = this;
            view.res_list.itemRenderer = mx.QiFuRender;
            view.bide_list.itemRenderer = mx.GNumRender;
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var arr1 = [];
            arr1.push(gproxy.target_log);
            view.res_list.dataProvider = new eui.ArrayCollection(arr1);
            var arr2 = [];
            for (var j in gproxy.qifu_award) {
                arr2.push({
                    "id": gproxy.qifu_award[j].id,
                    "type": gproxy.qifu_award[j].type,
                    "num": gproxy.qifu_award[j].shuliang,
                    "chicun": 73,
                    "no_num": true,
                    "top": 80,
                    "di_cor": 0x4C416A,
                    "di_size": 15,
                    "width": 73
                });
            }
            view.bide_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        QiFuResAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.bide_list.dataProvider = null;
            view.res_list.dataProvider = null;
        };
        QiFuResAlert.S_NAME = "QiFuResAlert";
        return QiFuResAlert;
    }(mx.AlertView));
    mx.QiFuResAlert = QiFuResAlert;
    __reflect(QiFuResAlert.prototype, "mx.QiFuResAlert");
})(mx || (mx = {}));
//# sourceMappingURL=QiFuResAlert.js.map