/**
 *   @author qianjun
 *   @date 2016.12.20
 *   @desc 离线活动列表条目render
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
    var LixianListRender = (function (_super) {
        __extends(LixianListRender, _super);
        function LixianListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LixianListRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.award_list.dataProvider = null;
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        LixianListRender.prototype.init_render = function () {
            this.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        LixianListRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.hasget) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd009 });
            }
            else if (this.canget) {
                var yichu = false;
                var dproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME));
                for (var i in this.data.awards) {
                    var unit = this.data.awards[i];
                    if (Number(unit.award_type) == 3) {
                        yichu = (Number(dproxy.get_currency('tili')) + Number(unit.num)) > 2000;
                        break;
                    }
                }
                if (yichu) {
                    var a_d2 = {
                        "param": mx.Tools.format(mx.Lang.p0131, dproxy.get_currency('tili')),
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_LIXIAN_LQ, 'day': this.data.group },
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_LIXIAN_LQ, 'day': this.data.group });
                }
            }
            else if (this.data.open) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.hs0030, this.data.group) });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd008 });
            }
        };
        LixianListRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var word = mx.Lang.hd003[d.type - 1];
            //view.sming_t.text = Tools.format(word, Lang.numword[d.group]);
            view.sming_p.source = 'lx' + d.group + '_png';
            this.hasget = Number(d.log[d.group - 1]) > 0;
            this.canget = d.day >= d.group;
            var get_b_res;
            get_b_res = "lxylqu_png";
            if (this.hasget) {
                get_b_res = "lxylq_png";
            }
            else if (this.canget) {
                get_b_res = "lxlqu_png";
            }
            view.get_b.set_ssres(get_b_res);
            var arr = [];
            for (var i = 0; i < d.awards.length; i++) {
                var cd = d.awards[i];
                arr.push({
                    "type": cd.award_type,
                    "id": cd.item_id,
                    "num": cd.num,
                    "chicun": 42,
                    "top": 46,
                    "no_num": true,
                    "height": 60,
                    "width": 42,
                    "di_cor": 0xaf8096
                });
            }
            view.award_list.itemRenderer = mx.GNumRender;
            view.award_list.dataProvider = new eui.ArrayCollection(arr);
        };
        return LixianListRender;
    }(mx.BasicRender));
    mx.LixianListRender = LixianListRender;
    __reflect(LixianListRender.prototype, "mx.LixianListRender");
})(mx || (mx = {}));
//# sourceMappingURL=LixianListRender.js.map