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
/**
 * @qianjun/2017.3.24
 *  zlcb排行榜
 */
var mx;
(function (mx) {
    var ZLCBPaiHangAlert = (function (_super) {
        __extends(ZLCBPaiHangAlert, _super);
        function ZLCBPaiHangAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //1排行奖励 2战力奖励 3活动排名
            _this.cur_type = 1;
            return _this;
        }
        ZLCBPaiHangAlert.mx_support = function () {
            return ["assets.zlcb", "api.ZLCBAWARDS"];
        };
        ZLCBPaiHangAlert.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.ZLCBPaiHangAlertMediator(this));
            this.cur_type = 1;
            view.tab_list.selectedIndex = 0;
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.rank_list.itemRenderer = mx.ZLCBPaiHangRender;
            view.sm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sm_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.smclose_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.no_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_time();
            this.show_list();
        };
        Object.defineProperty(ZLCBPaiHangAlert.prototype, "aproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return facade.retrieveProxy(mx.ActyProxy.NAME);
            },
            enumerable: true,
            configurable: true
        });
        ZLCBPaiHangAlert.prototype.fresh_time = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var cold = gproxy.zlcb_res;
            if (cold > 86400) {
                cold -= 86400;
            }
            var time = mx.Tools.format_second2(cold);
            view.time_t.text = time;
        };
        ZLCBPaiHangAlert.prototype.show_list = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var arr = [];
            view.rank_scro.visible = true;
            view.no_g.visible = false;
            switch (Number(view.cur_type)) {
                case 1:
                    for (var i = 1; i < 11; ++i) {
                        var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZLCBAWARDS, 'type', view.cur_type, 'rank', i);
                        arr.push({
                            "id": Number(i),
                            "type": view.cur_type,
                            "awards": api
                        });
                    }
                    break;
                case 2:
                    var zl = ['4999', '9999', '14999', '19999', '29999', '39999', '49999'];
                    for (var i in zl) {
                        var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZLCBAWARDS, 'type', view.cur_type, 'rank', zl[i]);
                        arr.push({
                            "id": Number(i),
                            "type": view.cur_type,
                            "awards": api,
                            "zl": zl[i]
                        });
                    }
                    break;
                case 3:
                    if (this.aproxy.zlcb_info) {
                        this.init_my_rank();
                        for (var i in this.aproxy.zlcb_info.top_ten) {
                            var unit = this.aproxy.zlcb_info.top_ten[i];
                            arr.push({
                                "id": unit.rank,
                                "type": view.cur_type,
                                "user_id": unit.user_id,
                                "zhanli": unit.zhanli,
                                "vip": unit.vip,
                                "name": unit.name,
                                "level": unit.level,
                                "avatar": unit.avatar
                            });
                        }
                    }
                    else {
                        view.no_g.visible = true;
                        view.rank_scro.visible = view.myrank_g.visible = false;
                    }
                    break;
            }
            view.rank_list.dataProvider = new eui.ArrayCollection(arr);
        };
        ZLCBPaiHangAlert.prototype.tab_click = function (e) {
            var type = e.item.type;
            if (type == this.cur_type) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            this.cur_type = type;
            var juli = 0;
            this.myrank_g.visible = false;
            switch (Number(type)) {
                case 1:
                    juli = 90;
                    break;
                case 2:
                    juli = 66;
                    break;
                case 3:
                    juli = 170;
                    break;
            }
            this.rank_scro.bottom = juli;
            if (type == 3) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ZLCB_RANK });
            }
            else {
                this.show_list();
            }
        };
        ZLCBPaiHangAlert.prototype.init_my_rank = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.myrank_g.visible = true;
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            view.myrank_t.text = Number(this.aproxy.zlcb_info.user_rank) == 0 ? "未上榜" : this.aproxy.zlcb_info.user_rank;
            view.myname_t.text = gproxy.user_name + "";
            var my_zl = this.aproxy.zlcb_info.user_zl || 0;
            view.myzl_t.left = 192;
            view.myzl_t.text = "战斗力：" + my_zl + '';
            if (Number(this.aproxy.zlcb_info.user_rank) == 0) {
                view.myzl_t.text = mx.Lang.zl002;
                view.myzl_t.left = 150;
                view.myzl_t.textColor = Number(my_zl) >= 45000 ? 0x5BF209 : 0xFF0000;
            }
            view.myvip_t.text = gproxy.user_vip + '';
            view.mylv_t.text = "Lv." + gproxy.user_lv;
            view.myavatar_p.source = "tx70_" + gproxy.user_avatar + "_png";
        };
        ZLCBPaiHangAlert.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.sm_b:
                    view.sm_rect.visible = view.sm_rect.touchEnabled = view.sm_g.visible = true;
                    break;
                case view.smclose_b:
                case view.sm_rect:
                    view.sm_rect.visible = view.sm_rect.touchEnabled = view.sm_g.visible = false;
                    break;
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ZLCBPaiHangAlert.S_NAME);
                    break;
                case view.no_b:
                    var fProxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                    fProxy.cur_chapter = 1;
                    fProxy.cur_stage = 1;
                    fProxy.set_jump(false);
                    fProxy.set_pop_jump(false);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JUQING_INFO,
                        'chapter': fProxy.cur_chapter
                    });
                    break;
            }
        };
        ZLCBPaiHangAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.tab_list.dataProvider = null;
            view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            view.rank_list.dataProvider = null;
            view.sm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sm_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.smclose_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.no_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ZLCBPaiHangAlertMediator.NAME);
        };
        ZLCBPaiHangAlert.S_NAME = "ZLCBPaiHangAlert";
        return ZLCBPaiHangAlert;
    }(mx.BasicView));
    mx.ZLCBPaiHangAlert = ZLCBPaiHangAlert;
    __reflect(ZLCBPaiHangAlert.prototype, "mx.ZLCBPaiHangAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ZLCBPaiHangAlert.js.map