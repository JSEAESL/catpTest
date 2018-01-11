/**
 *   @author wf
 *   @date 2016.11.29
 *   @desc 加好友弹框
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
    var FriendAddView = (function (_super) {
        __extends(FriendAddView, _super);
        function FriendAddView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendAddView.mx_support = function () {
            return ["assets.friend_add"];
        };
        FriendAddView.prototype.init_view = function () {
            var view = this;
            view.name_et.text = mx.Lang.hy002;
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.name_et.addEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.name_et.addEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
        };
        FriendAddView.prototype.start_edit = function (e) {
            if (e.currentTarget.text == mx.Lang.hy002) {
                e.currentTarget.text = '';
            }
        };
        FriendAddView.prototype.leave_edit = function (e) {
            var text = e.currentTarget.text;
            var facade = mx.ApplicationFacade.getInstance();
            if (text == '') {
                text = mx.Lang.hy002;
            }
        };
        FriendAddView.prototype.check_str = function () {
            var _this = this;
            var view = this;
            var text = view.name_et.text;
            var facade = mx.ApplicationFacade.getInstance();
            mx.MGTool.get_str(1, text).then(function (value) {
                _this.name_et.text = value.str;
                if (view.name_et.text == '') {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy015 });
                    return;
                }
                if (view.name_et.text == mx.Lang.hy002) {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy002 });
                    return;
                }
                if (value.mg) {
                    return;
                }
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_FRIEND_SEARCH,
                    "name": value.str
                });
            }, function () {
                _this.name_et.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        FriendAddView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.ok_b:
                    this.check_str();
                    break;
                case view.bg_rect:
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, FriendAddView.S_NAME);
                    break;
            }
        };
        FriendAddView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.name_et.removeEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.name_et.removeEventListener(egret.Event.FOCUS_OUT, this.leave_edit, this);
        };
        FriendAddView.S_NAME = "FriendAddView";
        return FriendAddView;
    }(mx.BasicView));
    mx.FriendAddView = FriendAddView;
    __reflect(FriendAddView.prototype, "mx.FriendAddView");
})(mx || (mx = {}));
//# sourceMappingURL=FriendAddView.js.map