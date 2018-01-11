/**
*   @author mx
*   @date 2015.1.3
*   @desc 养心殿侍寝相关
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
    var YXDShiQin = (function (_super) {
        __extends(YXDShiQin, _super);
        function YXDShiQin() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isTx = false;
            _this.isLD = false;
            _this.yxd_need_change_tab = false;
            return _this;
        }
        YXDShiQin.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_yxd_l1"://养心殿
                    tar = this.pageui.list0.getChildAt(0);
                    break;
                default:
                    break;
            }
            return tar;
        };
        YXDShiQin.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            view.rand_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.anpai_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.first_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.pre_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.last_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.hero_list.itemRenderer = FzItemRender;
            pproxy.shiqin_page = 1;
            this.isTx = wproxy.isTx;
            this.isLD = lproxy.isLD;
            if (this.isTx) {
                view.anpai_b.visible = false;
                view.rand_b.horizontalCenter = 0;
                view.rand_b.set_ssres('sbtxyge_png');
            }
            else if (this.isLD) {
                view.anpai_b.visible = false;
                view.rand_b.visible = false;
            }
            var style = [];
            style["itemRenderer"] = mx.FzItemRender;
            style["layout_type"] = "TileLayout";
            style["layout_style"] = {};
            style["layout_style"]["requestedColumnCount"] = 4;
            style["layout_style"]["orientation"] = "rows";
            style["layout_style"]["horizontalGap"] = 18;
            style["layout_style"]["paddingTop"] = 15;
            style["layout_style"]["paddingLeft"] = 30;
            style["layout_style"]["paddingRight"] = 35;
            style["layout_style"]["verticalGap"] = 30;
            view.pageui.set_style(style);
            this.fresh_shiqin_list();
            facade.registerMediator(new mx.YXDShiQinMediator(this));
        };
        YXDShiQin.prototype.fresh_shiqin_list = function (data) {
            var view = this;
            //view.hero_list.touchChildren = true;
            view.rand_b.touchEnabled = true;
            if (data) {
                return;
            }
            if (this.isTx || this.isLD) {
                var facade_1 = mx.ApplicationFacade.getInstance();
                //this.hero_s.visible = this.fanye_g.visible = true;
                //this.pageui.visible = false;
                this.set_tx_page(0);
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            pproxy.sort_weifen();
            var mns = pproxy.get_mn_list("notype");
            var max_num = 0;
            var arr = [];
            for (var k in mns) {
                if (Number(mns[k].status) == 0 && typeof mns[k].sb_level != "undefined" && Number(mns[k].sb_level) == 0) {
                    max_num++;
                    arr.push();
                }
            }
            this.max_num = Math.max(Math.ceil(max_num / 8), 1);
            //view.page_t.text = pproxy.shiqin_page + "/" + this.max_num;
            var c_heroes = pproxy.get_mn_list("shiqin", true);
            if (c_heroes.length == 0 && pproxy.shiqin_page != 1) {
                pproxy.shiqin_page--;
                c_heroes = pproxy.get_mn_list("shiqin", true);
            }
            //view.page_t.text = pproxy.shiqin_page + "/" + this.max_num;
            //view.hero_list.dataProvider = new eui.ArrayCollection(c_heroes);
            view.pageui.set_data(c_heroes, 8);
            if (mns.length == 0) {
                view.hua_t.text = mx.Lang.hg041;
                view.ts_g.visible = true; //引导中没有妃子不显示
                //view.fanye_g.visible = false;
            }
            else if (pproxy.shiqin_page == 1 && c_heroes.length == 0) {
                view.hua_t.text = mx.Lang.hg049;
                view.ts_g.visible = !mx.MX_COMMON.IN_GUIDE;
                //view.fanye_g.visible = false;
            }
            else {
                view.ts_g.visible = false;
            }
        };
        YXDShiQin.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (e.currentTarget) {
                case view.rand_b://随机翻牌子
                    if (this.isTx) {
                        var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                        var mns = wproxy.get_curr_hg();
                        var seed_1 = Math.floor(mns.length * Math.random());
                        wproxy.setCurrFz(mns[seed_1]);
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AVGView.S_NAME,
                            "param": {
                                "cd": mns[seed_1],
                                "type": "tiaoxi",
                                "title": mx.Lang.tx011,
                                "cshu": wproxy.txcshu,
                            }
                        });
                        break;
                    }
                    //view.hero_list.touchChildren = false;
                    view.rand_b.touchEnabled = false;
                    var c_heroes = pproxy.get_mn_list("normal");
                    var ln = c_heroes.length;
                    if (!ln) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hg019 });
                        //view.hero_list.touchChildren = true;
                        view.rand_b.touchEnabled = true;
                        break;
                    }
                    var seed = Math.floor(ln * Math.random()); //[0,1)
                    var c_id = c_heroes[seed];
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_YXD_SHIQIN,
                        "id": Number(c_id.id),
                    });
                    break;
                // case view.first_b:
                //     if (this.isTx || this.isLD) {
                //         this.set_tx_page(0);
                //         break;
                //     }
                //     pproxy.shiqin_page = 1;
                //     this.fresh_shiqin_list();
                //     break;
                // case view.pre_b:
                //     if (this.isTx || this.isLD) {
                //         this.set_tx_page(-1);
                //         break;
                //     }
                //     pproxy.shiqin_page = Math.max(pproxy.shiqin_page - 1, 1);
                //     this.fresh_shiqin_list();
                //     break;
                // case view.next_b:
                //     if (this.isTx || this.isLD) {
                //         this.set_tx_page(1);
                //         break;
                //     }
                //     pproxy.shiqin_page = Math.min(pproxy.shiqin_page + 1, this.max_num);
                //     this.fresh_shiqin_list();
                //     break;
                // case view.last_b:
                //     if (this.isTx || this.isLD) {
                //         this.set_tx_page(999);
                //         break;
                //     }
                //     pproxy.shiqin_page = this.max_num;
                //     this.fresh_shiqin_list();
                //     break;
                case view.anpai_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "type": 4,
                        "mid": 1
                    });
                    break;
            }
        };
        YXDShiQin.prototype.set_tx_page = function (addnum) {
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = (facade.retrieveProxy(mx.FriendProxy.NAME));
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var total = wproxy.hg_total;
            var cpage = wproxy.hg_page;
            var newpage = 0;
            for (var i = 0; i < 3; i++) {
                if (!addnum) {
                    newpage = this.pageui.page;
                }
                else if (addnum == 0) {
                    newpage = 1;
                }
                else if (addnum == 999) {
                    newpage = total;
                }
                else {
                    newpage = cpage + addnum;
                }
                newpage += i - 1;
                if (newpage < 1 || newpage > total) {
                    continue;
                }
                //console.log("newpage" + newpage)
                wproxy.hg_page = newpage;
                if (wproxy.get_curr_hg(newpage)) {
                    this.fresh_friend_hg();
                }
                else {
                    var fd = fproxy.get_curr_tx_friend();
                    var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    if (lproxy.isLD) {
                        var user = lproxy.get_cur_user();
                        fd = { "user_id": user.user_id };
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_FRIEND_HGONG,
                        'page': newpage,
                        'other_id': fd.user_id,
                        'page_limit': 8,
                    });
                }
            }
        };
        YXDShiQin.prototype.fresh_friend_hg = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var arr1 = wproxy.get_curr_hg(wproxy.hg_page);
            var hglist = arr1;
            //view.page_t.text = wproxy.hg_page + "/" + wproxy.hg_total;
            if (this.isLD) {
                view.fanye_g.bottom = 30;
                //view.di_p.bottom = 10;
                view.hero_s.bottom = 90;
            }
            //console.log("hg_page"+wproxy.hg_page)
            //console.log(hglist)
            view.pageui.set_page(hglist, wproxy.hg_total, wproxy.hg_page);
            //view.hero_list.dataProvider = new eui.ArrayCollection(hglist);
            if (hglist.length == 0) {
                view.hua_t.text = mx.Lang.hg041;
                view.ts_g.visible = true;
                view.fanye_g.visible = false;
            }
            else {
                view.ts_g.visible = false;
            }
        };
        YXDShiQin.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.rand_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.anpai_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.first_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.pre_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.last_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // view.hero_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.YXDShiQinMediator.NAME);
        };
        return YXDShiQin;
    }(mx.BasicView));
    mx.YXDShiQin = YXDShiQin;
    __reflect(YXDShiQin.prototype, "mx.YXDShiQin");
})(mx || (mx = {}));
//# sourceMappingURL=YXDShiQin.js.map