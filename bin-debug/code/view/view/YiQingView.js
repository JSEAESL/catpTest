/**
*   @author mx qianjun
*   @date 2015.1.3
*   @desc 怡情结果弹窗
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
    var YiQingView = (function (_super) {
        __extends(YiQingView, _super);
        function YiQingView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YiQingView.mx_support = function () {
            return ["assets.yiqing"];
        };
        YiQingView.prototype.init_view = function () {
            var data = this.adata;
            var view = this;
            var sl = Number(data.awards.shuliang) > 0;
            view.bg.source = sl ? "yqhsdban_png" : "yqsbdban_png";
            var awards_num = Math.abs(data.awards.shuliang) + (Number(data.awards.type) == 1 ? mx.Lang.ybi : mx.Lang.ybao);
            var str = mx.Tools.format(sl ? mx.Lang.yqing01 : mx.Lang.yqing02, data.name, awards_num);
            this.desc_t.textFlow = mx.Tools.setKeywordColor2(str, [mx.Tools.num2color(data.mli), 0xff9e20]);
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            var ef = new mx.GeneralEffect("rwjl");
            ef.play_by_times(-1);
            ef.scaleX = ef.scaleY = 1.5;
            ef.x = 280;
            ef.y = 50;
            view.ef_g.addChild(ef);
        };
        YiQingView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            this.ef_g.removeChildren();
        };
        YiQingView.prototype.close_self = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, YiQingView.S_NAME);
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var spt = mx.AppConfig.check_not_support("share");
            // if (!spt && pproxy.wb_share_chufa) {//分享事件
            //     pproxy.wb_share_chufa = false;
            //     facade.sendNotification(MX_NOTICE.POP_VIEW , {
            //         "name" : ShareShijianView.S_NAME
            //     });
            // }
        };
        YiQingView.S_NAME = "YiQingView";
        return YiQingView;
    }(mx.BasicView));
    mx.YiQingView = YiQingView;
    __reflect(YiQingView.prototype, "mx.YiQingView");
})(mx || (mx = {}));
//# sourceMappingURL=YiQingView.js.map