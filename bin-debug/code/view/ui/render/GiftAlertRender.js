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
    var GiftAlertRender = (function (_super) {
        __extends(GiftAlertRender, _super);
        function GiftAlertRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GiftAlertRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        GiftAlertRender.prototype.init_render = function () {
            this.caption.multiline = true;
            //this.caption.maxChars = 15;
            this.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        GiftAlertRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (data.type == 4) {
                if (!this.propIcon) {
                    this.propIcon = new mx.GenTipRender();
                    this.propIcon.left = 10;
                    this.propIcon.top = 16;
                    this.addChild(this.propIcon);
                }
                this.propIcon.data = {
                    "id": data.id,
                    "type": data.type,
                    "chicun": 60,
                };
                this.propName.text = data.info.name + "x" + data.num;
            }
            else if (data.type == 7) {
                if (!this.propIcon) {
                    this.propIcon = new mx.HeroGiftRender();
                    this.propIcon.left = 10;
                    this.propIcon.top = 16;
                    this.addChild(this.propIcon);
                }
                this.propIcon.data = {
                    "quality": 1,
                    "mid": data.id,
                    "chicun": 60,
                    "star": data.info.InitialStars,
                    "htype": data.info.HeroType,
                };
                this.propName.text = data.info.hero_name;
            }
            var desc = data.info.Description;
            if (desc.length > 30) {
                desc = desc.slice(0, 29);
                desc = desc + "...";
            }
            this.caption.text = desc;
            if (data.need) {
                this.owned.text = mx.Lang.p0123 + data.owned + "/" + data.need;
            }
            else if (data.type == 4)
                this.owned.text = mx.Lang.p0123 + data.owned;
            else if (data.type == 7)
                this.owned.text = mx.Lang.p0124 + data.owned;
        };
        GiftAlertRender.prototype.btn_click = function (evt) {
            var data = this.data;
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_PACK_LIBAO_USE,
                "item_id": data.gift_id,
                "id": data.id0,
            });
        };
        return GiftAlertRender;
    }(mx.BasicRender));
    mx.GiftAlertRender = GiftAlertRender;
    __reflect(GiftAlertRender.prototype, "mx.GiftAlertRender");
})(mx || (mx = {}));
//# sourceMappingURL=GiftAlertRender.js.map