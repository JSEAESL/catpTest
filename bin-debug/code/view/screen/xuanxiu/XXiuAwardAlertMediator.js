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
 * @author daiqi
 * @date 2017.5.17
 * 奖励一览弹窗的Mediator
 */
var mx;
(function (mx) {
    var XXiuAwardAlertMediator = (function (_super) {
        __extends(XXiuAwardAlertMediator, _super);
        function XXiuAwardAlertMediator(viewComponent) {
            var _this = _super.call(this, XXiuAwardAlertMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        XXiuAwardAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.HERO_SORT,
            ];
        };
        Object.defineProperty(XXiuAwardAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        XXiuAwardAlertMediator.prototype.onRemove = function () {
            var view = this.view;
            view.shicong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.toggle_list.dataProvider = null;
            view.toggle_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.content_list.dataProvider = null;
            view.content_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
        };
        XXiuAwardAlertMediator.prototype.init_view = function () {
            var view = this.view;
            view.shicong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.toggle_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.content_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            this.type_click(null);
        };
        XXiuAwardAlertMediator.prototype.type_click = function (e) {
            var view = this.view;
            var list = view.content_list;
            var clayout = list.layout;
            view.con_scroll.stopAnimation();
            if (view.toggle_list.selectedIndex == 0) {
                view.shicong_t.visible = true;
                view.shicong_b.visible = true;
                view.wenzi.source = "cksctszi_png"; //侍从文字内容
                list.itemRenderer = mx.XXiuYiLanRender;
                clayout.horizontalGap = 18;
                clayout.verticalGap = 0;
                clayout.paddingLeft = clayout.paddingTop = 0;
                this.fresh_data("ALL", 7);
            }
            else {
                view.shicong_t.visible = false;
                view.shicong_b.visible = false;
                view.wenzi.source = "ckdjtszi_png"; //道具文字内容
                list.itemRenderer = mx.GenTipRender;
                clayout.horizontalGap = 48;
                clayout.verticalGap = 20;
                clayout.paddingLeft = clayout.paddingTop = 10;
                this.fresh_data("ALL", 4);
            }
        };
        XXiuAwardAlertMediator.prototype.hero_click = function (e) {
            if (this.view.toggle_list.selectedIndex != 0) {
                return;
            }
            var item = e.item;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CHECK_HERO_INFO, item);
        };
        XXiuAwardAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            if (notification.getName() == mx.MX_NOTICE.HERO_SORT) {
                this.fresh_data(data, 7); //"ALL", "STRENGTH", "AGILITY", "INTELLIGENCE"
            }
        };
        XXiuAwardAlertMediator.prototype.fresh_data = function (type, leibie) {
            var view = this.view;
            view.sort_ui.visible = false; //默认将弹窗设为不显示
            switch (type) {
                case "ALL":
                    view.shicong_t.text = mx.Lang.te004[0];
                    break;
                case "STRENGTH":
                    view.shicong_t.text = mx.Lang.te004[1];
                    break;
                case "AGILITY":
                    view.shicong_t.text = mx.Lang.te004[2];
                    break;
                case "INTELLIGENCE":
                    view.shicong_t.text = mx.Lang.te004[3];
                    break;
            }
            var AwardData = mx.APITool.getInstance().getAPI(mx.MX_APINAME.PICKYILAN);
            var adata = view.adata.type;
            var arr = [];
            for (var k = 0; k < AwardData.length; k++) {
                if (adata == "ppjz") {
                    if (AwardData[k].award_type == leibie && AwardData[k].type == 1) {
                        arr.push(AwardData[k].item_id);
                    }
                }
                else if (adata == "flcj") {
                    if (AwardData[k].award_type == leibie && AwardData[k].type == 2) {
                        arr.push(AwardData[k].item_id);
                    }
                }
            }
            if (leibie == 7) {
                if (type != "ALL") {
                    var brr = [];
                    for (var i = 0; i < arr.length; i++) {
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", arr[i]);
                        if (api.HeroType == type) {
                            brr.push(arr[i]);
                        }
                    }
                    arr = brr;
                }
                arr.sort(function (a, b) {
                    var aapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", a);
                    var bapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", b);
                    if (aapi.InitialStars == bapi.InitialStars) {
                        return a - b;
                    }
                    else {
                        return bapi.InitialStars - aapi.InitialStars;
                    }
                });
            }
            else if (leibie == 4) {
                var brr = [];
                for (var i = 0; i < arr.length; i++) {
                    var obj = { "type": 4, "id": arr[i] };
                    brr.push(obj);
                }
                arr = brr;
                arr.sort(function (a, b) {
                    var aapi = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", a.id);
                    var bapi = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", b.id);
                    if (aapi.Category == 4) {
                        return -1;
                    }
                    else if (bapi.Category == 4) {
                        return 1;
                    }
                    else {
                        return bapi.Quality - aapi.Quality;
                    }
                });
            }
            view.content_list.dataProvider = new eui.ArrayCollection(arr);
            view.content_list.validateNow();
        };
        XXiuAwardAlertMediator.prototype.btn_click = function (evt) {
            var view = this.view;
            view.sort_ui.visible = !view.sort_ui.visible;
        };
        XXiuAwardAlertMediator.NAME = "XXiuAwardAlertMediator";
        return XXiuAwardAlertMediator;
    }(puremvc.Mediator));
    mx.XXiuAwardAlertMediator = XXiuAwardAlertMediator;
    __reflect(XXiuAwardAlertMediator.prototype, "mx.XXiuAwardAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XXiuAwardAlertMediator.js.map