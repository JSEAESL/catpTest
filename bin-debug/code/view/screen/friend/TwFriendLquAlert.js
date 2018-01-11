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
*   @author wxw
*   @date 2017.12.28
*   @desc 同玩好友收取礼物弹窗
**/
var mx;
(function (mx) {
    var TwFriendLquAlert = (function (_super) {
        __extends(TwFriendLquAlert, _super);
        function TwFriendLquAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TwFriendLquAlert.prototype.init_view_by_type = function () {
            var view = this;
            var arr = [];
            var items = [view.adata];
            console.log(items);
            if (items && items.length) {
                for (var k in items) {
                    var c_d = items[k];
                    var cd = mx.Tools.get_item_info(c_d.type, c_d.id);
                    if (cd) {
                        arr.push({
                            "type": c_d.type,
                            "id": c_d.id,
                            "num": c_d.shuliang || c_d.num || 0,
                            "bg": Number(c_d.type) == 4 ? "" : "itembg_png",
                            "chicun": 90,
                            "str": cd.name || cd.hero_name,
                            "no_num": true,
                            "di_size": 19,
                            "top": 97,
                            "di_cor": 0x7e747b,
                        });
                    }
                }
                console.log(arr);
                view.item_list.dataProvider = new eui.ArrayCollection(arr);
                view.item_list.itemRenderer = mx.GNumRender;
                var layout = view.item_list.layout;
                layout.requestedColumnCount = Math.min(4, items.length);
                var hang = Math.ceil(items.length / 4);
                view.reward_g.height = view.item_list.height * hang + 218;
            }
        };
        TwFriendLquAlert.S_NAME = "TwFriendLquAlert";
        return TwFriendLquAlert;
    }(mx.AlertView));
    mx.TwFriendLquAlert = TwFriendLquAlert;
    __reflect(TwFriendLquAlert.prototype, "mx.TwFriendLquAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TwFriendLquAlert.js.map