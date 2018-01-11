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
 * @cy/2017.3.20
 *  jjc战报alert
 */
var mx;
(function (mx) {
    var JJCLogAlert = (function (_super) {
        __extends(JJCLogAlert, _super);
        function JJCLogAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCLogAlert.mx_support = function () {
            return ["assets.jjc_log"];
        };
        JJCLogAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
            this.log_list.itemRenderer = mx.JJCLogRender;
            this.log_list.dataProvider = new eui.ArrayCollection(jproxy.jjc_log);
        };
        JJCLogAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.log_list.dataProvider = null;
        };
        JJCLogAlert.S_NAME = "JJCLogAlert";
        return JJCLogAlert;
    }(mx.AlertView));
    mx.JJCLogAlert = JJCLogAlert;
    __reflect(JJCLogAlert.prototype, "mx.JJCLogAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JJCLogAlert.js.map