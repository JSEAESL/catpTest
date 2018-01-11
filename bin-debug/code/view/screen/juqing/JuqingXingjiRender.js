/**
 *   @author wxw qianjun
 *   @date 2017.12.12
 *   @desc 活动列表条目render
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
    var JuqingXingjiRender = (function (_super) {
        __extends(JuqingXingjiRender, _super);
        function JuqingXingjiRender() {
            return _super.call(this) || this;
        }
        JuqingXingjiRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.award_list.dataProvider = null;
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JuqingXingjiRender.prototype.init_render = function () {
            this.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        JuqingXingjiRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            if (cd.lq) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd009 });
            }
            else {
                if (Number(cd.need) > Number(cd.cur_xji)) {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd026 });
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JUQING_STAR_LQ,
                        "chapter": cd.chapter,
                        "star": cd.need
                    });
                }
            }
        };
        JuqingXingjiRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.sming_t.text = "收服战功累计获得：" + cd.need;
            var arr = [];
            for (var i in cd.awards) {
                var unit = cd.awards[i];
                arr.push({
                    "type": unit.award_type,
                    "id": unit.item_id,
                    "num": unit.num,
                    "chicun": 90,
                    "no_num": true,
                    "top": 95,
                    "di_cor": 0x9689BA,
                    "di_size": 22
                });
            }
            view.award_list.itemRenderer = mx.GNumRender;
            view.award_list.dataProvider = new eui.ArrayCollection(arr);
            //领取状况
            var btn_str = '';
            view.get_b.right = 16;
            if (cd.lq) {
                btn_str = 'hdylingqu_png';
            }
            else {
                if (Number(cd.need) > Number(cd.cur_xji)) {
                    btn_str = 'xjwdcheng_png';
                    view.get_b.right = 36;
                }
                else {
                    btn_str = 'hdlingqu_png';
                }
            }
            view.get_b.set_ssres(btn_str);
        };
        return JuqingXingjiRender;
    }(mx.BasicRender));
    mx.JuqingXingjiRender = JuqingXingjiRender;
    __reflect(JuqingXingjiRender.prototype, "mx.JuqingXingjiRender");
})(mx || (mx = {}));
//# sourceMappingURL=JuqingXingjiRender.js.map