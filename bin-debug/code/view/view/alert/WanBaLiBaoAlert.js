/**
 * @author daiqi
 * @date 2017.6.6
 * @desc 玩吧弹窗
 */
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
    var WanBaLiBaoAlert = (function (_super) {
        __extends(WanBaLiBaoAlert, _super);
        function WanBaLiBaoAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.wenzi = false;
            return _this;
        }
        WanBaLiBaoAlert.mx_support = function () {
            return ["assets.friend_yjlq", "api.EQUIP", "api.WANBALIBAO"];
        };
        WanBaLiBaoAlert.prototype.init_view_by_type = function () {
            this.back_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jl_list.itemRenderer = mx.GNumRender;
            this.init_pop();
        };
        WanBaLiBaoAlert.prototype.init_pop = function () {
            var view = this;
            var gameProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            var arr = [];
            var cid = 0;
            var data;
            if (this.adata == "wenzi") {
                this.wenzi = true;
                arr = gameProxy.wenzi_award.awards;
                data = { "state": 1 };
                for (var k in arr) {
                    arr[k].di_cor = 0xa47374;
                    arr[k].chicun = 60;
                    arr[k].no_num = true;
                    arr[k].top = 66;
                    if (typeof arr[k].num == "undefined") {
                        arr[k].num = arr[k].shuliang;
                    }
                }
            }
            else {
                data = gameProxy.get_wanbalibao();
                cid = Number(data.libao);
                var libao = mx.ApiTool.getAPINodes(mx.MX_APINAME.WANBALIBAO, "libao", cid);
                for (var k in libao) {
                    var obj = {};
                    var item = libao[k];
                    obj.di_cor = 0xa47374;
                    obj.chicun = 60;
                    obj.type = item.type;
                    obj.id = item.item_id;
                    obj.num = item.num;
                    obj.no_num = true;
                    obj.top = 66;
                    arr.push(obj);
                }
                libao = null;
            }
            this.jl_list.dataProvider = new eui.ArrayCollection(arr);
            var layout = this.jl_list.layout;
            layout.requestedColumnCount = arr.length > 4 ? 4 : arr.length;
            this.title_p.visible = true;
            // if (data.state == 1) {
            // 	let zg = new GeneralEffect("rwjl");//动画效果
            // 	view.all_g.addChildAt(zg, 0);
            // 	zg.play_by_times(-1);
            // 	zg.horizontalCenter = 0;
            // 	zg.y = 70;
            // 	view.content_t.text = Lang.wblb01;
            // 	view.background.source = "wblblqcgdban_png";
            // 	this.title_p.source = "wblblqcgbti_png";
            // 	if (cid == 100) {
            // 		this.title_p.source = "mxlblqcgbti_png";
            // 	}
            // 	this.jl_g.top = 80;
            // } else if (data.state == 0 && cid != 100) {
            // 	this.title_p.visible = false;
            // 	view.content_t.text = Lang.wblb02;
            // 	view.background.source = "wblbylqdban_png";
            // 	this.jl_g.top = 62;
            // } else if (cid == 100) {
            // 	this.title_p.visible = false;
            // 	view.background.source = "lqsbdban_png";
            // 	view.content_t.text = Lang.wblb04;
            // } else {
            // 	this.title_p.visible = false;
            // 	view.background.source = "lqsbdban_png";
            // 	view.content_t.text = Lang.wblb03[data.state - 2000] || "";
            // 	this.all_g.height -= 55;
            // }
            if (cid == 100 || this.wenzi) {
                this.all_g.height -= 55;
            }
            if (this.wenzi) {
                view.content_t.text = gameProxy.wenzi_award.text;
                this.title_p.source = "wbwphdjlbti_png";
                view.all_g.removeChildAt(0);
                var zg = new mx.GeneralEffect("rwjl"); //动画效果
                view.addChildAt(zg, 1);
                zg.play_by_times(-1);
                zg.horizontalCenter = 0;
                zg.y = 560;
                zg.scaleX = zg.scaleY = 1.5;
                this.lqjlbg_p.visible = true;
                this.lqjlbti_p.visible = true;
                this.background.visible = false;
                if (view.content_t.numLines > 1) {
                    this.all_g.height += 20;
                    this.lqjlbg_p.height += 20;
                }
            }
        };
        WanBaLiBaoAlert.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.back_rect://关闭弹窗
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, WanBaLiBaoAlert.S_NAME);
                    facade.sendNotification(mx.MX_NOTICE.WB_GIFT_SHOW);
                    break;
                default:
                    break;
            }
        };
        WanBaLiBaoAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.MX_COMMON.SHOW_WB_GIFT = false;
            this.back_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.all_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jl_list.dataProvider = null;
        };
        WanBaLiBaoAlert.S_NAME = "WanBaLiBaoAlert";
        return WanBaLiBaoAlert;
    }(mx.AlertView));
    mx.WanBaLiBaoAlert = WanBaLiBaoAlert;
    __reflect(WanBaLiBaoAlert.prototype, "mx.WanBaLiBaoAlert");
})(mx || (mx = {}));
//# sourceMappingURL=WanBaLiBaoAlert.js.map