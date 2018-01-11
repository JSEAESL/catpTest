/**
 *   @author wf
 *   @date 2016.10.10
 *   @desc 皇子结缘礼盒选择
 **/
/**
 *   @author gaojing
 *   @date 2017.12.13
 *   @desc 皇子结缘礼盒选择
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
    var HzLyinGiftPop = (function (_super) {
        __extends(HzLyinGiftPop, _super);
        function HzLyinGiftPop() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.max_pinli = 0;
            return _this;
        }
        HzLyinGiftPop.mx_support = function () {
            return ["assets.lyin_gift"];
        };
        HzLyinGiftPop.prototype.init_view_by_type = function () {
            var view = this;
            view.gift_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.select_gift, this);
            view.gift_list.itemRenderer = mx.HzGiftBtnRender;
            var proxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME);
            var meili = this.adata.meili;
            var gift = [];
            var start = 1;
            var end = 5;
            if (this.adata.kanjia) {
                view.title_p.source = "xzkjlhbti_png";
                if (this.adata.re_kanjia) {
                    start = 1;
                    end = Math.max(1, Number(this.adata.kanjia) - 1);
                }
                else {
                    start = Math.min(Number(this.adata.kanjia) + 1, 5);
                    end = 5;
                }
            }
            for (var i = start; i <= end; i++) {
                var d = proxy.hzs_gift[i][0];
                if (d.meili <= meili || i == 5) {
                    gift.push({ "id": i, "index": gift.length });
                }
            }
            this.max_pinli = gift[0].id;
            gift.reverse();
            view.gift_list.dataProvider = new eui.ArrayCollection(gift);
        };
        HzLyinGiftPop.prototype.select_gift = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var gift = this.gift_list.getElementAt(e.itemIndex);
            if (typeof this.adata.kanjia != 'undefined') {
                if (this.adata.re_kanjia && gift.data.id == this.max_pinli) {
                    //直接下礼盒
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_BUY_FEIZI,
                        "id": this.adata.cxg_id,
                        "pinli": gift.data.id
                    });
                }
                else {
                    var c_cd = {
                        "t": mx.MX_NETS.CS_CHAT_KANJIA,
                        'zinv_id': this.adata.zinv_id,
                        'pinli': gift.data.id
                    };
                    if (this.adata.re_kanjia) {
                        c_cd.id = this.adata.sj_id;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, c_cd);
                }
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SET_PINLI, gift.data.id);
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HzLyinGiftPop.S_NAME);
        };
        HzLyinGiftPop.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.gift_list.dataProvider = null;
            view.gift_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.select_gift, this);
        };
        HzLyinGiftPop.S_NAME = "HzLyinGiftPop";
        return HzLyinGiftPop;
    }(mx.AlertView));
    mx.HzLyinGiftPop = HzLyinGiftPop;
    __reflect(HzLyinGiftPop.prototype, "mx.HzLyinGiftPop");
})(mx || (mx = {}));
//# sourceMappingURL=HzLyinGiftPop.js.map