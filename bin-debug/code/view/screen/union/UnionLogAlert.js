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
 * @cy/2017.4.25
 *  家族日志alert
 */
var mx;
(function (mx) {
    var UnionLogAlert = (function (_super) {
        __extends(UnionLogAlert, _super);
        function UnionLogAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionLogAlert.mx_support = function () {
            return ["assets.jz_log", "api.GHACTINFO"];
        };
        UnionLogAlert.prototype.init_view_by_type = function () {
            var arr = [];
            var arr2 = {};
            var color_arr = [0xfa3eb1, 0x82b9f1, 0xfea700, 0x73ac5c, 0xff4b4b]; //管理职位，成员，元宝，银币，用户名
            for (var k in this.adata) {
                var data = this.adata[k];
                var str = mx.Tools.format(mx.Lang.jz045[data.remark], data.u_name, data.to_name);
                var cor = void 0, cor1 = void 0, cor2 = void 0, cor0 = void 0;
                cor0 = cor = cor1 = cor2 = 0xff4b4b;
                switch (Number(data.remark)) {
                    case 2:
                    case 3://yuanbao
                        cor = color_arr[2];
                        break;
                    case 1://yinbi
                        cor = color_arr[3];
                        break;
                    case 8://职务
                        var t_arr = [3, 4, 5, 6];
                        var zhiwu = data.zhiwu.split(",");
                        var old_zhiwu = Number(zhiwu[0]);
                        var new_zhiwu = Number(zhiwu[1]);
                        if (new_zhiwu == 1) {
                            str = mx.Tools.format(mx.Lang.jz086, data.u_name, data.to_name, data.to_name);
                        }
                        else if (new_zhiwu == 2) {
                            str = mx.Tools.format(mx.Lang.jz082, data.to_name, data.u_name, mx.Lang.jz087[2]);
                            cor1 = color_arr[1];
                        }
                        else if (old_zhiwu == 0 && t_arr.indexOf(new_zhiwu) >= 0) {
                            str = mx.Tools.format(mx.Lang.jz083, data.to_name, data.u_name, mx.Lang.jz087[new_zhiwu]);
                            cor1 = color_arr[1];
                        }
                        else if (t_arr.indexOf(old_zhiwu) >= 0 && t_arr.indexOf(new_zhiwu) >= 0) {
                            str = mx.Tools.format(mx.Lang.jz084, data.u_name, data.to_name, mx.Lang.jz087[old_zhiwu], mx.Lang.jz087[new_zhiwu]);
                            cor1 = cor2 = color_arr[1];
                        }
                        else {
                            str = mx.Tools.format(mx.Lang.jz085, data.to_name, data.u_name, data.to_name, mx.Lang.jz087[new_zhiwu]);
                            cor2 = color_arr[1];
                        }
                        break;
                }
                arr.push({
                    "date": mx.Tools.format_time(data.time, "yr"),
                    "shijian": mx.Tools.format_time(data.time, "sf", 2),
                    "text": mx.Tools.setKeywordColor2(str, [cor0, cor, cor1, cor2]) //???????
                });
            }
            for (var j in arr) {
                var date = arr[j].date;
                if (!arr2[date]) {
                    arr2[date] = {};
                }
                arr2[date].date = date;
                if (!arr2[date].arr) {
                    arr2[date].arr = [];
                    arr2[date].arr.push(arr[j]);
                }
                else {
                    arr2[date].arr.push(arr[j]);
                }
            }
            arr = mx.Tools.obj2arr(arr2);
            this.log_list.itemRenderer = mx.UnionLogRender;
            this.log_list.dataProvider = new eui.ArrayCollection(arr);
        };
        UnionLogAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.log_list.dataProvider = null;
        };
        UnionLogAlert.S_NAME = "UnionLogAlert";
        return UnionLogAlert;
    }(mx.AlertView));
    mx.UnionLogAlert = UnionLogAlert;
    __reflect(UnionLogAlert.prototype, "mx.UnionLogAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionLogAlert.js.map