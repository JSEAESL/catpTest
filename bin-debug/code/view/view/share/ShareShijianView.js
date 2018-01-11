/**
 *   @author qianjun、dingyunfeng
 *   @date 2017.2.22
 *   @desc 分享事件通用弹窗
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
    var ShareShijianView = (function (_super) {
        __extends(ShareShijianView, _super);
        function ShareShijianView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShareShijianView.mx_support = function () {
            return ["assets.share_sjalert", "api.WBSHARESJ", "api.EQUIP"];
        };
        /*--------------组件---------------*/
        ShareShijianView.prototype.init_view_by_type = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.ok_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            view.ok_b.touchEnabled = false;
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var sj_id = pproxy.wb_share_sj[0];
            var lq_id = pproxy.wb_share_sj[1];
            var sj_api = mx.ApiTool.getAPINode(mx.MX_APINAME.WBSHARESJ, "id", sj_id);
            //有无头像
            var tx = Number(sj_api.iconPopup) == 0;
            view.tx.source = tx ? "" : sj_api.iconPopup + "_png";
            view.str_t1.left = tx ? 36 : 92;
            view.str_t1.right = tx ? 36 : 24;
            view.str_t1.width = tx ? 316 : 272;
            view.title_t.text = sj_api.textTitle;
            view.str_t1.text = sj_api.textPopup;
            view.exit_t.text = sj_api.textButton1;
            view.ok_t.text = sj_api.textButton2;
            var item_api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", sj_api.rewardID);
            if (!item_api) {
                item_api = {
                    "name": Number(sj_api.rewardType) == 1 ? mx.Lang.ybi : mx.Lang.ybao
                };
            }
            view.item.data = {
                "id": item_api.id,
                "type": sj_api.rewardType,
                "chicun": 60
            };
            view.name_t.text = item_api.name + "x" + sj_api.rewardNum;
            mx.TweenTool.getInstance().get_tween(this.ok_g, "btnshake", true);
            mx.DataTool.getInstance().data_tool("SEVT" + sj_id + "_OPEN");
        };
        ShareShijianView.prototype.tap_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.ok_g://对外qq好友分享
                    var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
                    var sj_id_1 = pproxy.wb_share_sj[0];
                    mx.DataTool.getInstance().data_tool("SEVT" + sj_id_1 + "_CLICK");
                    this.tid = egret.setTimeout(function () {
                        if (window && window["share_shijian"]) {
                            window["share_shijian"](sj_id_1, Main.USER_ID);
                        }
                    }, this, 500);
                    break;
            }
        };
        //关闭
        ShareShijianView.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            //删除
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_WB_SJ_SHARE_LQ,
                "id": pproxy.wb_share_sj[1],
                "lq": 1
            });
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ShareShijianView.S_NAME);
        };
        ShareShijianView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            egret.Tween.removeTweens(view.ok_g);
            view.ok_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_click, this);
            if (this.tid) {
                egret.clearTimeout(this.tid);
                this.tid = null;
            }
        };
        ShareShijianView.S_NAME = "ShareShijianView";
        return ShareShijianView;
    }(mx.AlertView));
    mx.ShareShijianView = ShareShijianView;
    __reflect(ShareShijianView.prototype, "mx.ShareShijianView");
})(mx || (mx = {}));
//# sourceMappingURL=ShareShijianView.js.map