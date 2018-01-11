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
 * @date 2017.11.18
 * 家族消费\
 */
var mx;
(function (mx) {
    var ActyUnionPaiHangAlert = (function (_super) {
        __extends(ActyUnionPaiHangAlert, _super);
        function ActyUnionPaiHangAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyUnionPaiHangAlert.mx_support = function () {
            return ["assets.jzxf_rank"];
        };
        ActyUnionPaiHangAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var uproxy = facade.retrieveProxy(mx.UnionProxy.NAME);
            var arr = [];
            for (var k in uproxy.jzxf_rank) {
                var info = uproxy.jzxf_rank[k];
                arr.push({
                    "paiming": Number(k) < 3 && Number(info.integral) != 0 ? ("jxph" + (Number(k) + 1) + "_png") : "",
                    "rank": Number(k) < 3 || Number(info.integral) == 0 ? "" : "" + (Number(k) + 1),
                    "name": info.name,
                    "jifen": info.integral,
                });
            }
            this.rank_list.dataProvider = new eui.ArrayCollection(arr);
        };
        ActyUnionPaiHangAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.rank_list.dataProvider = null;
        };
        ActyUnionPaiHangAlert.S_NAME = "ActyUnionPaiHangAlert";
        return ActyUnionPaiHangAlert;
    }(mx.AlertView));
    mx.ActyUnionPaiHangAlert = ActyUnionPaiHangAlert;
    __reflect(ActyUnionPaiHangAlert.prototype, "mx.ActyUnionPaiHangAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyUnionPaiHangAlert.js.map