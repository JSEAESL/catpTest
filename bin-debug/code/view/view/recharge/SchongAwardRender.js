/**
 *   @author qianjun
 *   @date 2017.8.25
 *   @desc  循环充值奖励render
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
    var SchongAwardRender = (function (_super) {
        __extends(SchongAwardRender, _super);
        function SchongAwardRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SchongAwardRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
            this.dataChanged();
        };
        SchongAwardRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            this.item.source = mx.Tools.get_item_res(cd.type, cd.id);
            var item = mx.Tools.get_item_info(cd.type, cd.id);
            if (item) {
                if (item.Category == "4") {
                    this.item.source = "tyxenmwhpo_png";
                }
            }
            this.num_t.text = "x" + cd.num;
        };
        SchongAwardRender.prototype.showTips = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            var point = this.parent.localToGlobal(this.x, this.y);
            var p_d;
            switch (Number(cd.type)) {
                case mx.MX_COMMON.CTYPE_CLOTH://服装
                    p_d = {
                        "name": mx.ClothDetailView.S_NAME,
                        "param": {
                            "id": cd.id
                        }
                    };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case mx.MX_COMMON.CTYPE_ITEM: //道具
                case mx.MX_COMMON.CTYPE_YINBI: //银币
                case mx.MX_COMMON.CTYPE_YBAO: //元宝
                case mx.MX_COMMON.CTYPE_TILI: //体力
                case mx.MX_COMMON.CTYPE_NWJY: //女王经验
                case mx.MX_COMMON.CTYPE_HICON://头像
                    p_d = {
                        "x": point.x,
                        "y": point.y,
                        "w": this.width,
                        "h": this.height,
                        "id": cd.id,
                        "type": cd.type,
                    };
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
                    break;
                case mx.MX_COMMON.CTYPE_HERO://侍从
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroInfoView.S_NAME,
                        "param": {
                            "hero": cd.id,
                            "type": "not",
                        },
                    });
                default:
                    return;
            }
        };
        SchongAwardRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showTips, this);
        };
        return SchongAwardRender;
    }(mx.BasicRender));
    mx.SchongAwardRender = SchongAwardRender;
    __reflect(SchongAwardRender.prototype, "mx.SchongAwardRender");
})(mx || (mx = {}));
//# sourceMappingURL=SchongAwardRender.js.map