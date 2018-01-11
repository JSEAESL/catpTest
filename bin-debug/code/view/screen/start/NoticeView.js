/**
*   @author mx
*   @date 2015.1.3
*   @desc 公告
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
    var NoticeView = (function (_super) {
        __extends(NoticeView, _super);
        function NoticeView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NoticeView.mx_support = function () {
            return ["assets.start_notice"];
        };
        NoticeView.prototype.init_view_by_type = function () {
            if (mx.AppConfig.MXTag == "wb") {
                this.pic_p.source = "noticewb_png";
            }
            else {
                this.pic_p.source = "notice_png";
            }
        };
        NoticeView.prototype.close_self = function (e) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, NoticeView.S_NAME);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_NOTICE);
        };
        NoticeView.S_NAME = "NoticeView";
        return NoticeView;
    }(mx.AlertView));
    mx.NoticeView = NoticeView;
    __reflect(NoticeView.prototype, "mx.NoticeView");
})(mx || (mx = {}));
//# sourceMappingURL=NoticeView.js.map