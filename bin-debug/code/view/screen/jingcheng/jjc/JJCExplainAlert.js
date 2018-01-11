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
 * @cy/2017.3.16
 *  jjc说明alert
 */
var mx;
(function (mx) {
    var JJCExplainAlert = (function (_super) {
        __extends(JJCExplainAlert, _super);
        function JJCExplainAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCExplainAlert.mx_support = function () {
            return ["assets.jjc_explain", "api.JJCDAAWARD"];
        };
        JJCExplainAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
            var rank = Number(jproxy.my_rank);
            this.rank_t.textFlow = mx.Tools.setStrColorSize(mx.Lang.jjc29, [rank], [0x598BC3], [30]);
            this.best_t.text = jproxy.max_rank;
            var c_arr = [];
            var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 70, 100, 200, 300, 400, 500, 700, 1000, 2000, 3000, 4000, 5000, 7000, 10000, 15000, 20000];
            if (rank <= 20000) {
                var api = void 0;
                for (var k in arr) {
                    if (Number(k) < arr.length - 1) {
                        if (arr[k] < rank && arr[Number(k) + 1] >= rank) {
                            rank = arr[Number(k) + 1];
                            api = mx.ApiTool.getAPINodes(mx.MX_APINAME.JJCDAAWARD, "rank", rank);
                            break;
                        }
                    }
                }
                if (api) {
                    for (var k in api) {
                        c_arr.push({
                            "type": api[k].type,
                            "id": api[k].item_id,
                            "num": api[k].num,
                            "di": true,
                            "di_cor": 0x6E57A3,
                            "chicun": 90,
                            "width": 90,
                            "top": 100,
                            "no_num": true
                        });
                    }
                }
            }
            if (c_arr.length) {
                this.award_list.itemRenderer = mx.GNumRender;
                this.award_list.dataProvider = new eui.ArrayCollection(c_arr);
            }
            else {
                this.award_list.dataProvider = null;
            }
            var rank_arr = [];
            var n_arr = [1, 2, 3, 4, 5];
            for (var i in n_arr) {
                var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.JJCDAAWARD, "rank", n_arr[i]);
                var c_arr_1 = [];
                if (api) {
                    for (var k in api) {
                        c_arr_1.push({
                            "type": api[k].type,
                            "id": api[k].item_id,
                            "num": api[k].num,
                            "di": true,
                            "di_cor": 0x6E57A3,
                            "width": 90,
                            "chicun": 90,
                            "top": 100,
                            "no_num": true,
                        });
                    }
                    rank_arr.push({
                        "arr": c_arr_1,
                        "rank": n_arr[i]
                    });
                }
            }
            this.rank_list.itemRenderer = mx.RankAwardRender;
            this.rank_list.dataProvider = new eui.ArrayCollection(rank_arr);
        };
        JJCExplainAlert.S_NAME = "JJCExplainAlert";
        return JJCExplainAlert;
    }(mx.AlertView));
    mx.JJCExplainAlert = JJCExplainAlert;
    __reflect(JJCExplainAlert.prototype, "mx.JJCExplainAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JJCExplainAlert.js.map