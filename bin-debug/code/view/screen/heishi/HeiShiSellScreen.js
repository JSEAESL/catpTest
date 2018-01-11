/**
 *   @author qianjun
 *   @date 2015.1.3 2016.10.9
 *   @desc 黑市卖家主界面
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
    var HeiShiSellScreen = (function (_super) {
        __extends(HeiShiSellScreen, _super);
        function HeiShiSellScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeiShiSellScreen.mx_support = function () {
            return ["assets.market_buy_sell", "assets.market_sell_main", "api.ZINVSKILL"];
        };
        HeiShiSellScreen.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.sell_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hz_list.itemRenderer = mx.HSDsznRender;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HeiShiSellScreenMediator(view));
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.ybao_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.cur_page = 1;
            this.fresh_yb();
            this.show_items();
            if (mx.AppConfig.PREV_SCENE_ID == mx.HZSuoScreen.S_NAME) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.HeiShiShangJiaView.S_NAME,
                });
            }
        };
        Object.defineProperty(HeiShiSellScreen.prototype, "hproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.HeiShiProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeiShiSellScreen.prototype, "dproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.DataProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HeiShiSellScreen.prototype.fresh_yb = function () {
            var view = this;
            var cur_ybao = view.dproxy.get_currency("ybao");
            view.ybao_t.text = mx.Tools.num2str(cur_ybao);
        };
        HeiShiSellScreen.prototype.set_page = function (e) {
            var view = this;
            var page = this.cur_page;
            var total = this.total_page;
            var newpage;
            switch (e.currentTarget) {
                case view.sye_b:
                case view.prev_b:
                    newpage = e.currentTarget == view.sye_b ? 1 : Math.max(1, page - 1);
                    break;
                case view.wye_b:
                case view.next_b:
                    newpage = e.currentTarget == view.wye_b ? total : Math.min(total, page + 1);
                    break;
            }
            if (newpage != page) {
                this.cur_page = newpage;
                this.show_items();
            }
        };
        HeiShiSellScreen.prototype.close_self = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            if (mx.AppConfig.PREV_SCENE_ID == mx.HZSuoScreen.S_NAME) {
                var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                pproxy.need_open = true;
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { t: mx.MX_NETS.CS_HZS_DATA, type: 1, page: pproxy.hzs_page1 });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HeiShiScreen.S_NAME);
            }
        };
        HeiShiSellScreen.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.sell_b:
                    //上架
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.HeiShiShangJiaView.S_NAME });
                    break;
                case view.ybao_add:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                    break;
            }
        };
        /*--------------皇子列表-------------*/
        HeiShiSellScreen.prototype.show_items = function (settime) {
            if (settime === void 0) { settime = false; }
            var view = this;
            if (view.hproxy.hs_sell_arr.length) {
                view.empty_g.visible = false;
                view.bg_p.source = "listBG_jpg";
                view.gmyfdban_p.visible = false;
                view.full_g.visible = true;
                this.total_page = Math.ceil(Number(this.hproxy.hs_sell_arr.length) / 4); //每页8条数据
                var arr = this.hproxy.get_page_data(this.cur_page, "_hs_sell_arr", 4);
                view.hz_list.dataProvider = new eui.ArrayCollection(arr);
                this.page_t.text = this.cur_page + "/" + this.total_page;
            }
            else {
                view.empty_g.visible = true;
                view.bg_p.source = "hshi_bg_png";
                view.gmyfdban_p.visible = true;
                view.full_g.visible = false;
                view.con_t.text = mx.Lang.hs0005;
            }
            // let view = this.view;
            // let type = this.cur_type;
            // let proxy = this.proxy;
            // let listdata : any = [];
            // let now_time : number = Math.floor(new Date().getTime() / 1000);
            // let list_data : any = proxy['hzs_list' + type][proxy['hzs_page' + type]];
            // view.bottom_g.visible = type == 1;
            // view.page_g.bottom = type == 1 ? 75 : 28;
            // view.hz_scro.bottom = type == 1 ? 126 : 80;
            // view.page_g.visible = proxy['hzs_total' + type] > 0;
            // let totalpage : number = Math.ceil(proxy['hzs_total' + type] / this.pageitem);
            // view.page_t.text = proxy['hzs_page' + type] + '/' + totalpage;
            // //更新当前页时间显示
            // for (let i : number = 0; i < list_data.length; i++) {
            //     let d : any = list_data[i];
            //     if(!d) continue;
            //     if (type == 1 && d.zhuangtai < 3) {
            //         //成长时间
            //         let t : number = 0;
            //         if (d.over_time) {
            //             t = Number(d.over_time) - now_time;
            //         }
            //         d.growtime = 0;
            //         if (d.zhuangtai < 2) {
            //             d.growtime = d.zhuangtai == 0 ? t - 7200 : t;
            //             if (d.growtime <= 0) {
            //                 d.zhuangtai = d.zhuangtai == 0 ? 1 : 2;
            //                 if(d.zhuangtai == 1){//刷新评价                                
            //                     d.pingjia = 0;
            //                 }
            //                 this.sendNotification(MX_NOTICE.SET_HZ_DATA, {id : d.id, zhuangtai : d.zhuangtai, pingjia : d.pingjia});
            //                 this.sendNotification(MX_NOTICE.CS_GET_DATA, {t : MX_NETS.CS_HZS_DATA, type : 1, page : this.proxy.hzs_page1});
            //             }
            //         }
            //         d.type = 1;
            //         listdata.push(d);
            //     } else if (type == 2 && (d.zhuangtai >= 3 || d.zhuangtai == -1)) {
            //         d.type = 2;
            //         listdata.push(d);
            //     }
            //     else if(type == 3){
            //         d.type = 3;
            //         listdata.push(d);
            //     }
            // }
            // if(listdata.length == 0){
            //     if (view.no_tip) {
            //         view.removeChildAt(view.numChildren - 1);
            //         view.no_tip = null;
            //     }
            //     let png = "";
            //     let txt = "";
            //     switch(type){
            //         case 1:
            //             png = "pu";
            //             txt = Lang.hzs74;
            //             break;
            //         case 2:
            //             png = "pu";
            //             txt = Lang.hzs72;
            //             break;
            //         case 3:
            //             png = "xiao";
            //             txt = Lang.hzs73;
            //             break;
            //     }
            //     view.no_tip = new EmptyTip({
            //         "xdz": png,
            //         "text": txt
            //     });
            //     view.addChild(view.no_tip);
            //     view.hz_list.dataProvider = null;
            // }else {
            //     if (view.no_tip) {
            //         view.removeChildAt(view.numChildren - 1);
            //         view.no_tip = null;
            //     }
            //     view.hz_list.dataProvider = new eui.ArrayCollection(listdata);
            //     view.validateNow();
            // }
            // view.xwei_t.text = Tools.format(Lang.hzs06,proxy.hzs_total1,proxy.hzs_xwei);
            // if(AppConfig.PREV_SCENE_ID == FriendScreen.S_NAME && proxy.target_hz){
            //     facade.sendNotification(MX_NOTICE.POP_VIEW, {
            //         name  : HzLyinPop.S_NAME,
            //         param : {type : 2, data : proxy.target_hz}
            //     });
            //     proxy.target_hz = null;
            // }
        };
        HeiShiSellScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            this.hproxy.set_weihun_zn();
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.sell_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            view.ybao_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            facade.removeMediator(mx.HeiShiSellScreenMediator.NAME);
        };
        HeiShiSellScreen.S_NAME = "HeiShiSellScreen";
        return HeiShiSellScreen;
    }(mx.BasicView));
    mx.HeiShiSellScreen = HeiShiSellScreen;
    __reflect(HeiShiSellScreen.prototype, "mx.HeiShiSellScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiSellScreen.js.map