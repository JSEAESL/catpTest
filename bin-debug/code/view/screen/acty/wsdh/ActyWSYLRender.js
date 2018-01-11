/**
 *   @author cy
 *   @date 2017.11.23
 *   @desc render
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
    var ActyWSYLRender = (function (_super) {
        __extends(ActyWSYLRender, _super);
        function ActyWSYLRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyWSYLRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.item.data = {
                "id": data.item_id,
                "type": data.type,
                "num": data.num,
                "chicun": 80,
            };
            var info = mx.Tools.get_item_info(data.type, data.item_id);
            this.cost_t.text = info ? info.name : "";
        };
        return ActyWSYLRender;
    }(mx.BasicRender));
    mx.ActyWSYLRender = ActyWSYLRender;
    __reflect(ActyWSYLRender.prototype, "mx.ActyWSYLRender");
})(mx || (mx = {}));
//# sourceMappingURL=ActyWSYLRender.js.map