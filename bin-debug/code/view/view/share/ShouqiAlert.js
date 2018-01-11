/**
 *   @author hxj
 *   @date 2017.12.23
 *   @desc 一键收起（返回聊天）
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
    var ShouqiAlert = (function (_super) {
        __extends(ShouqiAlert, _super);
        function ShouqiAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.award_arr = [
                { "type": 1 },
                { "id": 2000, "type": 4 },
                { "id": 2019, "type": 4 },
            ];
            return _this;
        }
        ShouqiAlert.mx_support = function () {
            return ["assets.shouqi"];
        };
        ShouqiAlert.prototype.init_view_by_type = function () {
            //DataTool.getInstance().data_tool("DESK_OPEN");            
            this.award_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.award_click, this);
        };
        ShouqiAlert.prototype.award_click = function (e) {
            var target = e.itemRenderer;
            var point = target.parent.localToGlobal(target.x, target.y);
            var p_d = {
                "x": point.x,
                "y": point.y,
                "w": target.width,
                "h": target.height,
                "id": e.item.id,
                "type": e.item.type,
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
        };
        ShouqiAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.award_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.award_click, this);
            view.award_list.dataProvider = null;
        };
        ShouqiAlert.S_NAME = "ShouqiAlert";
        return ShouqiAlert;
    }(mx.AlertView));
    mx.ShouqiAlert = ShouqiAlert;
    __reflect(ShouqiAlert.prototype, "mx.ShouqiAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ShouqiAlert.js.map