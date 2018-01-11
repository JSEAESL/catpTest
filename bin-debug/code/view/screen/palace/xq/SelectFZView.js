/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 选择妃子/子女
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
    var SelectFZView = (function (_super) {
        __extends(SelectFZView, _super);
        function SelectFZView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.num = 1;
            _this.xz_num = 0;
            _this.old_length = 0;
            _this.prev_idx = 0;
            return _this;
        }
        SelectFZView.mx_support = function () {
            return ["assets.palace_xqin_select", "assets.palace_render"];
        };
        SelectFZView.prototype.init_view = function () {
            var cd = this.adata;
            var view = this;
            view.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.hero_list.itemRenderer = mx.FzItemRender;
            view.hero_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.SelectFZViewMediator(view));
            this.cur_page = 1;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.XqinProxy.NAME));
            proxy.page_click = false;
            this.ts_t.text = cd.type == 1 ? mx.Lang.xq050 : mx.Lang.xq051;
            this.hero_list.allowMultipleSelection = true;
            this.xz_num = proxy.xz_fz_info.length;
            this.fresh_screen();
        };
        SelectFZView.prototype.fresh_screen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.adata;
            var proxy = (facade.retrieveProxy(mx.XqinProxy.NAME));
            var hero = cd.type == 1 ? cd.data : proxy.zinv_info;
            // if(cd.type == 1){
            //     hero.sort(function(a,b){
            //         if(a.xq_select && b.xq_select){
            //             return (Number(a.weifen) - Number(b.weifen));
            //         }
            //         else if(a.xq_select && !b.xq_select){
            //             return 1;
            //         }
            //         else if(!a.xq_select && b.xq_select){
            //             return -1;
            //         }
            //         else{
            //             return (Number(a.weifen) - Number(b.weifen));
            //         }
            //     });
            // }
            this.title.source = cd.type == 1 ? "xzxqfzi_png" : "xzlgznv_png";
            var arr = [];
            var page = this.cur_page;
            if (cd.type == 1) {
                for (var i = (page - 1) * 8; i < page * 8; ++i) {
                    var c_mn = hero[i];
                    if (c_mn) {
                        // let unit = proxy.find_mache_idx(c_mn.id);
                        // if(proxy.in_xing_qin.indexOf(c_mn.id) > -1 && typeof unit.time == 'undefined'){
                        //     this.hero_list.selectedIndices.push(i % 8);
                        // }
                        arr.push(c_mn);
                    }
                }
            }
            else {
                for (var i in hero) {
                    var unit = hero[i];
                    if (unit) {
                        // let info = proxy.find_mache_idx(unit.id);
                        // if(proxy.in_xing_qin.indexOf(unit.id) > -1 && typeof info.time == 'undefined'){
                        //     this.hero_list.selectedIndices.push(Number(i) % 8);
                        // }
                        arr.push(unit);
                    }
                }
            }
            if (arr.length) {
                this.hero_list.dataProvider = new eui.ArrayCollection(arr);
            }
            else {
                this.no_tip = new mx.EmptyTip({
                    "xdz": "tshi",
                    "text": cd.type == 1 ? mx.Lang.xq007 : mx.Lang.xq008
                });
                this.addChild(this.no_tip);
                this.tishi_g.visible = false;
                this.fanye_g.visible = false;
            }
            var total = cd.type == 1 ? hero.length : proxy.zinv_total;
            this.max_num = Math.max(Math.ceil(total / 8), 1);
            this.page_t.text = this.cur_page + "/" + this.max_num;
            this.hnum_t.text = mx.Tools.format(cd.type == 1 ? mx.Lang.xq027 : mx.Lang.xq033, total);
            var temp_arr = mx.Tools.arr2obj(proxy.xz_fz_info, 'id');
            var delete_arr = [];
            for (var i in proxy.page_select[this.cur_page]) {
                var idx = proxy.page_select[this.cur_page][i];
                var item = this.hero_list.dataProvider.getItemAt(idx);
                if (typeof temp_arr[item.id] == 'undefined') {
                    delete_arr.push(idx);
                }
            }
            for (var i in delete_arr) {
                proxy.page_select[this.cur_page].splice(proxy.page_select[this.cur_page].indexOf(delete_arr[i]), 1);
            }
            this.hero_list.selectedIndices = [];
            this.hero_list.selectedIndices = mx.FightTools.arr_clone(proxy.page_select[this.cur_page]);
            this.old_length = this.hero_list.selectedIndices.length;
            this.fresh_num();
        };
        SelectFZView.prototype.fresh_num = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.adata;
            var proxy = (facade.retrieveProxy(mx.XqinProxy.NAME));
            this.mache_num_t.text = mx.Tools.format(cd.type == 1 ? mx.Lang.xq038 : mx.Lang.xq039, this.xz_num, proxy.mache_total);
        };
        SelectFZView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.hero_list.dataProvider = null;
            view.hero_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hero_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.SelectFZViewMediator.NAME);
        };
        SelectFZView.prototype.hero_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.XqinProxy.NAME));
            if (e.item.is_lg) {
                this.hero_list.selectedIndices.splice(0, 1);
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xq049 });
                return;
            }
            if (e.item.xq_select && e.item.xq_ing) {
                this.hero_list.selectedIndices.splice(0, 1);
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": proxy.cur_type == 1 ? mx.Lang.xq002 : mx.Lang.xq006 });
                return;
            }
            if (this.old_length < this.hero_list.selectedIndices.length) {
                var temp = mx.Tools.arr2obj(proxy.xz_fz_info, 'id');
                if (this.xz_num < proxy.mache_total) {
                    if (typeof temp[e.item.id] == 'undefined') {
                        proxy.xz_fz_info.push({
                            "id": e.item.id,
                            "zinv_info": e.item
                        });
                        this.xz_num = Math.min(proxy.mache_total, this.xz_num + 1);
                        // if(this.xz_num == proxy.mache_total){
                        //     this.prev_idx = e.itemIndex;
                        // }
                    }
                }
                else {
                    this.hero_list.selectedIndices.splice(0, 1);
                    // this.hero_list.selectedIndices.splice(this.hero_list.selectedIndices.indexOf(this.prev_idx),1);
                    // let item = this.hero_list.dataProvider.getItemAt(this.prev_idx);
                    // for(let i in proxy.xz_fz_info){
                    //     if(proxy.xz_fz_info[i].id == item.id){
                    //         proxy.xz_fz_info.splice(Number(i),1);
                    //         break;
                    //     }
                    // }
                    // if(typeof temp[e.item.id] == 'undefined'){
                    //     proxy.xz_fz_info.push({
                    //             "id" : e.item.id,
                    //             "zinv_info" : e.item
                    //     });
                    // }
                    // this.prev_idx = e.itemIndex;
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": proxy.cur_type == 1 ? mx.Lang.xq041 : mx.Lang.xq043 });
                    return;
                }
            }
            else if (this.old_length >= this.hero_list.selectedIndices.length) {
                for (var i in proxy.xz_fz_info) {
                    if (proxy.xz_fz_info[i].id == e.item.id) {
                        proxy.xz_fz_info.splice(Number(i), 1);
                        break;
                    }
                }
                this.xz_num -= 1;
            }
            proxy.page_select[this.cur_page] = [];
            proxy.page_select[this.cur_page] = mx.FightTools.arr_clone(this.hero_list.selectedIndices);
            this.old_length = this.hero_list.selectedIndices.length;
            this.fresh_num();
        };
        SelectFZView.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var page = this.cur_page;
            switch (e.currentTarget) {
                case this.first_b:
                    page = 1;
                    break;
                case this.pre_b:
                    page = Math.max(1, page - 1);
                    break;
                case this.next_b:
                    page = Math.min(this.max_num, page + 1);
                    break;
                case this.last_b:
                    page = this.max_num;
                    break;
            }
            if (this.cur_page == page) {
                return;
            }
            this.cur_page = page;
            var cd = this.adata;
            this.hero_list.selectedIndices = [];
            if (cd.type == 1) {
                this.fresh_screen();
            }
            else {
                var proxy = (facade.retrieveProxy(mx.XqinProxy.NAME));
                proxy.page_click = true;
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_YXD_XQ_CJZN, "page_id": page });
            }
        };
        SelectFZView.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.XqinProxy.NAME));
            proxy.page_click = false;
            facade.sendNotification(mx.MX_NOTICE.SELECT_FZ);
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, SelectFZView.S_NAME);
        };
        SelectFZView.S_NAME = "SelectFZView";
        SelectFZView.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return SelectFZView;
    }(mx.BasicView));
    mx.SelectFZView = SelectFZView;
    __reflect(SelectFZView.prototype, "mx.SelectFZView");
})(mx || (mx = {}));
//# sourceMappingURL=SelectFZView.js.map