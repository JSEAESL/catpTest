/**
 @author wxw
 *   @date 2017.10.24
 *   @desc 皇子教室mediator
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
    var HZClassroomScreenMediator = (function (_super) {
        __extends(HZClassroomScreenMediator, _super);
        function HZClassroomScreenMediator(viewComponent) {
            var _this = _super.call(this, HZClassroomScreenMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(HZClassroomScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HZClassroomScreenMediator.prototype.onRemove = function (evt) {
            _super.prototype.onRemove.call(this);
            var view = this.view;
            view.students_list.itemRenderer = null;
        };
        HZClassroomScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CSCREEN
            ];
        };
        HZClassroomScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    this.fresh_view();
                    break;
            }
        };
        Object.defineProperty(HZClassroomScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HZClassroomScreenMediator.prototype.init_view = function () {
            var view = this.view;
            view.students_list.itemRenderer = mx.HZStudentRender;
            this.fresh_view();
        };
        HZClassroomScreenMediator.prototype.btn_click = function (e) {
            var view = this.view;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.SelectTaiFuView.S_NAME });
        };
        HZClassroomScreenMediator.prototype.fresh_view = function () {
            var proxy = this.proxy;
            var list_data = proxy.hzc_list;
            var view = this.view;
            var teacher = proxy.taifu_list[proxy.taifu_type - 1];
            if (!list_data || teacher == "0") {
                if (teacher == "0") {
                    var png_1 = "";
                    var txt_1 = "";
                    png_1 = "pu";
                    txt_1 = mx.Tools.format(mx.Lang.hzc02, mx.Lang.hzclassroom[proxy.taifu_type - 1]);
                    view.nostudent_tip = new mx.EmptyTip({
                        "xdz": png_1,
                        "text": txt_1
                    });
                    var aptfaniu_b = new mx.SSButton();
                    aptfaniu_b.x = 300;
                    aptfaniu_b.y = 750;
                    aptfaniu_b.set_ssres("antfu_png");
                    aptfaniu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
                    view.addChild(aptfaniu_b);
                    view.addChild(view.nostudent_tip);
                    view.students_list.dataProvider = null;
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": txt_1 });
                    return;
                }
                var png = "";
                var txt = "";
                png = "pu";
                txt = mx.Tools.format(mx.Lang.hzc01, mx.Lang.hzclassroom[proxy.taifu_type - 1]);
                view.nostudent_tip = new mx.EmptyTip({
                    "xdz": png,
                    "text": txt
                });
                view.addChild(view.nostudent_tip);
                view.students_list.dataProvider = null;
            }
            else {
                view.students_list.dataProvider = new eui.ArrayCollection(list_data);
                view.students_list.visible = true;
            }
        };
        HZClassroomScreenMediator.NAME = "HZClassroomScreenMediator";
        return HZClassroomScreenMediator;
    }(puremvc.Mediator));
    mx.HZClassroomScreenMediator = HZClassroomScreenMediator;
    __reflect(HZClassroomScreenMediator.prototype, "mx.HZClassroomScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HZClassroomScreenMediator.js.map