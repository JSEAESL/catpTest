/**
 *   @author qianjun、mx
 *   @date 2016.12.20
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
    var YbxnliViewMediator = (function (_super) {
        __extends(YbxnliViewMediator, _super);
        function YbxnliViewMediator(viewComponent) {
            return _super.call(this, YbxnliViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(YbxnliViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        YbxnliViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CLOSE_CHATLYZN,
                mx.MX_NOTICE.PLAY_YBAO_NULI,
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        YbxnliViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.CLOSE_CHATLYZN:
                    view.close_self();
                    break;
                case mx.MX_NOTICE.PLAY_YBAO_NULI:
                    view.show_list();
                    view.show_mc();
                    break;
                case mx.MX_NOTICE.FRESH_CPOP:
                    var type = view.cur_type;
                    /*let gProxy = <GameProxy><any> (this.facade.retrieveProxy(GameProxy.NAME));
                    let item_data = view.item_arr.getItemAt(type - 1);
                    item_data.ts = Number(gProxy.yb_biaoji.arr[type - 1]) == 1;
                    view.item_arr.replaceItemAt(item_data,type - 1);*/
                    view.fresh_view();
                    break;
            }
        };
        YbxnliViewMediator.NAME = "YbxnliViewMediator";
        return YbxnliViewMediator;
    }(puremvc.Mediator));
    mx.YbxnliViewMediator = YbxnliViewMediator;
    __reflect(YbxnliViewMediator.prototype, "mx.YbxnliViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YbxnliViewMediator.js.map