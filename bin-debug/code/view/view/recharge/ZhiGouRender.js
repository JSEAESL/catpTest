/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 直购render
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
    var ZhiGouRender = (function (_super) {
        __extends(ZhiGouRender, _super);
        function ZhiGouRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ZhiGouRender.prototype.init_render = function () {
            this.item_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ZhiGouRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.item_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ZhiGouRender.prototype.btn_click = function (evt) {
            var cd = this.data;
            var point = this.parent.localToGlobal(this.x, this.y);
            var p_d;
            if (cd.award_type == 9) {
                p_d = {
                    "name": mx.ClothDetailView.S_NAME,
                    "param": {
                        "id": cd.item_id
                    }
                };
            }
            else {
                p_d = {
                    "x": point.x,
                    "y": point.y,
                    "w": this.width,
                    "h": this.height,
                    "id": cd.item_id,
                    "type": cd.award_type,
                };
            }
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
        };
        ZhiGouRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.bg.visible = data.award_type != 10;
            this.item_p.source = mx.Tools.get_item_res(data.award_type, data.item_id);
            this.item_t.text = mx.Tools.get_item_info(data.award_type, data.item_id).name + "x" + data.num;
            this.xian_p.visible = !data.noxian;
        };
        return ZhiGouRender;
    }(mx.BasicRender));
    mx.ZhiGouRender = ZhiGouRender;
    __reflect(ZhiGouRender.prototype, "mx.ZhiGouRender");
})(mx || (mx = {}));
//# sourceMappingURL=ZhiGouRender.js.map