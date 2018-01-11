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
 * @author dingyunfeng
 * @date 2018.1.2
 * 转盘抽奖界面
 */
var mx;
(function (mx) {
    var ZhuanPanCJView = (function (_super) {
        __extends(ZhuanPanCJView, _super);
        function ZhuanPanCJView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.awards = [
                { "type": 4, "num": 5, "item_id": 2000, "icon": "" },
                { "type": 4, "num": 5, "item_id": 2019, "icon": "" },
                { "type": 2, "num": 50, "item_id": 0, "icon": "" },
                { "type": 1, "num": 50000, "item_id": 2025, "icon": "" },
                { "type": 2, "num": 100, "item_id": 0, "icon": "" },
                { "type": 4, "num": 1, "item_id": 2025, "icon": "ipx_png" },
            ];
            _this.touch_mode = true;
            return _this;
        }
        ZhuanPanCJView.prototype.init_view_by_type = function () {
            var view = this;
            var item_arr = [];
            for (var i in this.awards) {
                var unit = this.awards[i];
                item_arr.push({
                    "bg": "tgitemkuang_png",
                    "id": unit.item_id,
                    "type": unit.type,
                    "num": unit.num,
                    "di": true,
                    "no_num": true,
                    "chicun": 90,
                    "top": 94,
                    "di_cor": 0xFFEBDD,
                    "di_size": 20,
                    "width": 90,
                    "icon": unit.icon
                });
            }
            for (var i = 0; i <= 5; i++) {
                this["item_list" + i].itemRenderer = mx.GNumRender;
                var item = [];
                item.push(item_arr[i]);
                this["item_list" + i].dataProvider = new eui.ArrayCollection(item);
            }
            if (!this.adata) {
                this.adata = {};
                this.adata.name = "A";
                this.adata.lv = 5;
            }
            this.tip_t.textFlow = mx.Tools.setStrColor(mx.Lang.tgy001, [this.adata.name, mx.Lang.tgy003 + this.adata.lv, mx.Lang.tgy002], [0xFF5148, 0xFF5148, 0x72EB86]);
            this.cj_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ZhuanPanCJViewMediator(this));
        };
        ZhuanPanCJView.prototype.tap_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            if (!this.touch_mode) {
                return;
            }
            switch (e.currentTarget) {
                case this.cj_b:
                    facade.sendNotification(mx.MX_NOTICE.ZHUANPAN_START, 5); //临时接口，应后端查询结果
                    break;
                default:
                    break;
            }
        };
        ZhuanPanCJView.prototype.zhuanpan = function (tar) {
            this.touch_mode = false;
            egret.Tween.get(this.cj_b).to({ rotation: tar * 60 + 360 * 10 }, 300 / 6 * tar + 3000, egret.Ease.sineOut).call(this.award, this, [tar]);
        };
        ZhuanPanCJView.prototype.close_self = function () {
            if (!this.touch_mode) {
                return;
            }
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, ZhuanPanCJView.S_NAME);
        };
        ZhuanPanCJView.prototype.award = function (item) {
            this.touch_mode = true;
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.TGAwardAlert.S_NAME,
                "param": { "award": this.awards[item], "lv": this.adata.lv + 5, "name": this.adata.name }
            });
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, ZhuanPanCJView.S_NAME);
        };
        ZhuanPanCJView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            egret.Tween.removeTweens(this.cj_b);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ZhuanPanCJViewMediator.NAME);
            var view = this;
        };
        ZhuanPanCJView.S_NAME = "ZhuanPanCJView";
        return ZhuanPanCJView;
    }(mx.AlertView));
    mx.ZhuanPanCJView = ZhuanPanCJView;
    __reflect(ZhuanPanCJView.prototype, "mx.ZhuanPanCJView");
})(mx || (mx = {}));
//# sourceMappingURL=ZhuanPanCJView.js.map