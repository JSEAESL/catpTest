/**
 *   @author wxw
 *   @date 2017.10.24
 *   @desc 皇子教室列表render
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
    var HZStudentRender = (function (_super) {
        __extends(HZStudentRender, _super);
        function HZStudentRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HZStudentRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.hdong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        HZStudentRender.prototype.init_render = function () {
            var view = this;
            view.hdong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        HZStudentRender.prototype.btn_click = function (e) {
            var view = this;
            var d = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (e.currentTarget) {
                case view.hdong_b://互动
                    var state = Number(d.zhuangtai);
                    if (state == -1 || state == 7) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hzs45 });
                        return;
                    }
                    proxy.cur_zn_info = null;
                    proxy.cur_zn_info = d;
                    proxy.hzhd_bg = mx.Tools.get_bb_res("znbg", state, d.avatar, Number(d.meili));
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": Number(d.id) + 1000,
                        "type": 10
                    });
                    break;
                default:
                    break;
            }
        };
        HZStudentRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            var hasName = d.name != "";
            var hasFhao = d.fenghao != "";
            // this.caiyi = ["chaybti_png","qiybti_png","qinybti_png","wudbti_png","shejbti_png","jsbti_png",
            //   "xunsbti_png","masbti_png","shifbti_png","shufbti_png","tianwbti_png","zhusbti_png"];//才艺类别图片资源
            // this.cylevel = ["bhlevel_png","rmlevel_png","sllevel_png","jtlevel_png","zslevel_png"]  //才艺等级图片资源            
            view.hd_p.touchEnabled = false;
            view.caiyi_p.source = "caiyi" + d.caiyi_type + "_png";
            view.cylevel_p.source = "cylevel" + (Math.min(Math.floor(d.caiyi_num / 500), 4) + 1) + "_png";
            var state = Number(d.zhuangtai);
            view.avatar.source = mx.Tools.get_bb_res("tx", state, d.avatar, d.meili);
            view.name_t.text = hasName ? (d.xing + d.name) : mx.Lang.hzs05;
            view.rank_t.text = mx.Tools.num2chinese(d.paiwei) + (d.sex == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04);
            view.caiyi_t.text = d.caiyi_num || "???";
        };
        return HZStudentRender;
    }(mx.BasicRender));
    mx.HZStudentRender = HZStudentRender;
    __reflect(HZStudentRender.prototype, "mx.HZStudentRender");
})(mx || (mx = {}));
//# sourceMappingURL=HZStudentRender.js.map