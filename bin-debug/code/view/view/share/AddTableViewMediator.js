/**
 *   @author hxj
 *   @date 2017.12.22
 *   @desc mediator
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
    var AddTableViewMediator = (function (_super) {
        __extends(AddTableViewMediator, _super);
        function AddTableViewMediator(viewComponent) {
            return _super.call(this, AddTableViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(AddTableViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        AddTableViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        AddTableViewMediator.prototype.handleNotification = function (notification) {
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_view();
                    break;
            }
        };
        AddTableViewMediator.NAME = "AddTableViewMediator";
        return AddTableViewMediator;
    }(puremvc.Mediator));
    mx.AddTableViewMediator = AddTableViewMediator;
    __reflect(AddTableViewMediator.prototype, "mx.AddTableViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=AddTableViewMediator.js.map