/**
 *   @author cy
 *   @date 2017.11.14
 *   @desc tujian render
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
    var TuJianRender = (function (_super) {
        __extends(TuJianRender, _super);
        function TuJianRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuJianRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            if (data.id < 900) {
                view.avatar.source = mx.Tools.get_mn_res(data.id, "dh");
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", data.id);
                view.meili_t.text = mx.Lang.mli + api.charm;
            }
            else {
                view.avatar.source = mx.Tools.get_zn_res(data.id, 'jq');
                var meili_arr = [0, 60, 80, 99, 120];
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.LIHUI, "lihui", data.id);
                if (data.id == 13401 || data.id == 14401) {
                    view.meili_t.text = mx.Lang.mli + (meili_arr[2] + 1) + "-" + meili_arr[3];
                }
                else {
                    view.meili_t.text = mx.Lang.mli + (meili_arr[api.meili - 1] + 1) + "-" + meili_arr[api.meili];
                    if (Number(api.meili) == 4) {
                        view.meili_t.text = mx.Lang.mli + "100+";
                    }
                }
            }
            view.zan_t.text = Number(data.zan) > 999 ? "999+" : data.zan + "";
            mx.Tools.mx_grayfy(view.avatar, true);
            view.new_p.visible = false;
            switch (data.state) {
                case -1:
                    mx.Tools.mx_grayfy(view.avatar, false, mx.MX_BLACK_MATRIX2);
                    break;
                case 0:
                    view.new_p.visible = true;
                    break;
                case 1:
                    break;
            }
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x000000);
            shape.graphics.drawRect(0, 0, 96, 262);
            shape.graphics.endFill();
            view.addChild(shape);
            shape.x = 2;
            shape.y = 1;
            view.avatar.mask = shape;
        };
        return TuJianRender;
    }(mx.BasicRender));
    mx.TuJianRender = TuJianRender;
    __reflect(TuJianRender.prototype, "mx.TuJianRender");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianRender.js.map