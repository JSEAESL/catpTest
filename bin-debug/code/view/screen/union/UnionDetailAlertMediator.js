/**
 *   @author cy
 *   @date 2017.8.8
 *   @desc 家族详情弹窗 Mediator
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
    var UnionDetailAlertMediator = (function (_super) {
        __extends(UnionDetailAlertMediator, _super);
        function UnionDetailAlertMediator(viewComponent) {
            var _this = _super.call(this, UnionDetailAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(UnionDetailAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        UnionDetailAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.UNION_APPLY
            ];
        };
        UnionDetailAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            var type = notification.getType();
            switch (notification.getName()) {
                case mx.MX_NOTICE.UNION_APPLY:
                    this.fresh_screen();
                    break;
            }
        };
        Object.defineProperty(UnionDetailAlertMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        UnionDetailAlertMediator.prototype.init_view = function () {
            var view = this.view;
            var data = view.adata;
            view.hz_p.source = "jzhz" + data.logo + "_png";
            view.lv_t.text = mx.Tools.format(mx.Lang.bh001, data.level);
            view.name_t.text = data.name;
            view.zuzhang_t.text = data.hz_name;
            view.chengyuan_t.text = data.ren + "/" + data.maxren;
            view.rank_t.text = (data.rank || data.index) + "";
            view.id_t.text = data.gh_id + "";
            view.gonggao_t.text = data.gonggao != "" ? data.gonggao : mx.Lang.jz004;
            view.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_screen();
        };
        UnionDetailAlertMediator.prototype.fresh_screen = function () {
            var view = this.view;
            var proxy = this.proxy;
            var data = view.adata;
            var source = "jjsqjru_png";
            view.fun_b.visible = true;
            if (Number(data.apply) == 1) {
                source = "jjcxsqing_png";
            }
            else {
                switch (Number(data.kind)) {
                    case 0://需申请
                        source = "jjsqjru_png";
                        break;
                    case 1://直接进
                        source = "jjzjjru_png";
                        break;
                    case 2://禁止进
                        source = "jjzbzmu_png";
                        break;
                }
            }
            view.fun_b.set_ssres(source);
            view.fun_b.visible = view.fun_b.visible && mx.AppConfig.CURR_SCENE_ID == mx.UnionScreen.S_NAME;
        };
        UnionDetailAlertMediator.prototype.btn_click = function (e) {
            var view = this.view;
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            switch (e.currentTarget.res_name) {
                case "jjcxsqing_png":
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_CHEXIAO,
                        "gh_id": view.adata.gh_id,
                    });
                    break;
                case "jjzbzmu_png":
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz219 });
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_SHENQ,
                        "gh_id": view.adata.gh_id,
                    });
                    break;
            }
        };
        UnionDetailAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        UnionDetailAlertMediator.NAME = "UnionDetailAlertMediator";
        return UnionDetailAlertMediator;
    }(puremvc.Mediator));
    mx.UnionDetailAlertMediator = UnionDetailAlertMediator;
    __reflect(UnionDetailAlertMediator.prototype, "mx.UnionDetailAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionDetailAlertMediator.js.map