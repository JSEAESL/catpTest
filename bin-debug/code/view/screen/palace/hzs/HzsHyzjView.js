/**
 *   @author qianjun
 *   @date 2017.2.22
 *   @desc 红颜知己
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
    var HzsHyzjView = (function (_super) {
        __extends(HzsHyzjView, _super);
        function HzsHyzjView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_page = 1;
            return _this;
        }
        HzsHyzjView.mx_support = function () {
            return ["assets.palace_hzsuo_hyzj", "api.QINMI"];
        };
        HzsHyzjView.prototype.init_view = function () {
            var view = this;
            var cd = this.adata;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.fresh_pop(cd);
        };
        HzsHyzjView.prototype.fresh_pop = function (cd) {
            var view = this;
            if (!cd.data.length) {
                view.page_g.visible = false;
                view.f_scro.visible = false;
                view.f_list.dataProvider = null;
                this.no_tip = new mx.EmptyTip({
                    "xdz": "xiao",
                    "text": mx.Lang.hzs71
                });
                this.addChild(this.no_tip);
            }
            else {
                //页数
                this.fresh_page(cd.tot);
                view.page_g.visible = true;
                view.f_scro.visible = true;
                view.f_list.itemRenderer = mx.FriendItemRender;
                view.f_list.dataProvider = new eui.ArrayCollection(cd.data);
            }
        };
        HzsHyzjView.prototype.fresh_page = function (tot) {
            var view = this;
            view.page_t.text = this.cur_page + "/" + Math.ceil(tot / 5);
        };
        HzsHyzjView.prototype.set_page = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.adata;
            var total = Math.ceil(Number(cd.tot) / 5);
            var newpage;
            switch (e.currentTarget) {
                case view.sye_b:
                    newpage = 1;
                    break;
                case view.wye_b:
                    newpage = total;
                    break;
                case view.prev_b:
                    newpage = Math.max(1, this.cur_page - 1);
                    break;
                case view.next_b:
                    newpage = Math.min(total, this.cur_page + 1);
                    break;
            }
            if (this.cur_page == newpage) {
                return;
            }
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_HZS_HYZJ,
                "page": newpage,
                "zinv_id": this.adata.cd.id
            });
            this.cur_page = newpage;
        };
        HzsHyzjView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, HzsHyzjView.S_NAME);
        };
        HzsHyzjView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
        };
        HzsHyzjView.S_NAME = "HzsHyzjView";
        HzsHyzjView.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return HzsHyzjView;
    }(mx.BasicView));
    mx.HzsHyzjView = HzsHyzjView;
    __reflect(HzsHyzjView.prototype, "mx.HzsHyzjView");
})(mx || (mx = {}));
//# sourceMappingURL=HzsHyzjView.js.map