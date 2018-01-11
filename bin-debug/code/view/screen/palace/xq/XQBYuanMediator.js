/**
 @author qianjun
 *   @date 2016.10.9
 *   @desc 省亲mediator
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
    var XQBYuanMediator = (function (_super) {
        __extends(XQBYuanMediator, _super);
        function XQBYuanMediator(viewComponent) {
            var _this = _super.call(this, XQBYuanMediator.NAME, viewComponent) || this;
            _this.cur_type = 1; //1妃子省亲 2子女省亲
            _this.cur_page = 0;
            _this.total_page = 0;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(XQBYuanMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        XQBYuanMediator.prototype.onRemove = function () {
            var view = this.view;
            view.type_btn_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.head_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.tail_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.yjxqin_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.yjxq, this);
            view.yjhgong_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.yjxq, this);
            view.ybao_add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yb, this);
        };
        XQBYuanMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.XINGQIN_ZINV,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.XINGQIN_TIME,
                mx.MX_NOTICE.SELECT_FZ,
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        XQBYuanMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.XINGQIN_TIME:
                case mx.MX_NOTICE.XINGQIN_ZINV:
                    this.show_list();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.SELECT_FZ:
                    this.select_fz();
                    break;
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    this.fresh_currency();
                    break;
            }
        };
        XQBYuanMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "s_xq_cy"://妃子出游
                    var list = this.view.men_list;
                    var tar = list.getChildAt(0);
                    var data = tar.data;
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    pproxy.set_feizi_mid(parseInt(data.mid));
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_YXD_FZ_XQ,
                        "type": 1,
                        "id": data.id
                    });
                    break;
                case "v_cy_jl"://领取出游奖励
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.XQGuiLaiView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.SHOW_AWARD);
                    break;
                case "s_xq_fh"://返回
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
            }
        };
        Object.defineProperty(XQBYuanMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.XqinProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XQBYuanMediator.prototype.init_view = function () {
            var view = this.view;
            //默认普通剧情按钮被点击
            this.cur_type = 1;
            view.type_btn_list.selectedIndex = 0;
            view.type_btn_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.men_list.itemRenderer = mx.XqMenItemRender;
            this.fresh_currency();
            //妃子数据
            this.cur_page = 1;
            this.total_page = 4;
            this.show_list();
            view.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.head_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.tail_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            view.yjxqin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yjxq, this);
            view.yjhgong_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yjxq, this);
            view.ybao_add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yb, this);
            if (mx.MX_COMMON.IN_GUIDE) {
                var tar = view.men_list.dataProvider;
                if (tar) {
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        "gkey": "m_xq", "touch": "v_cy_jl"
                    });
                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
            }
        };
        XQBYuanMediator.prototype.page_click = function (evt) {
            var view = this.view;
            if (this.cur_page == 0) {
                return;
            }
            switch (evt.currentTarget) {
                case view.prev_b:
                    --this.cur_page;
                    break;
                case view.next_b:
                    ++this.cur_page;
                    break;
                case view.head_btn:
                    this.cur_page = 1;
                    break;
                case view.tail_btn:
                    this.cur_page = this.total_page;
                    break;
            }
            this.fresh_page();
            this.show_list();
        };
        /*----------显示页数-------*/
        XQBYuanMediator.prototype.fresh_page = function () {
            var view = this.view;
            var cur = this.cur_page;
            var total = this.total_page;
            if (cur > total) {
                this.cur_page = total;
            }
            else if (cur < 1) {
                this.cur_page = 1;
            }
            view.page_t.text = this.cur_page + "/" + this.total_page;
        };
        /*--------步辇时间提示-------*/
        XQBYuanMediator.prototype.show_tip = function () {
            var p_d = {
                "name": mx.AlertView.S_NAME,
                "param": {
                    "notice_ok": mx.MX_NOTICE.CLOSE_POP,
                    "sdata_ok": mx.AlertView.S_NAME,
                    "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                    "sdata_exit": mx.AlertView.S_NAME,
                    "param": mx.Lang.hg022,
                }
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        XQBYuanMediator.prototype.type_click = function (e) {
            this.cur_type = e.itemIndex + 1;
            this.cur_page = 1;
            var flag = this.cur_type == 1;
            var view = this.view;
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_YXD_XQ_FZDATA,
                "type": this.cur_type - 1
            });
            view.yjxqin_btn.set_ssres(flag ? "yjxqin_png" : "yjgxing_png");
            view.yjhgong_btn.set_ssres(flag ? "yjhgong_png" : "yjsli_png");
        };
        /*-------------一键领取-------------*/
        XQBYuanMediator.prototype.yjxq = function (evt) {
            var target = evt.currentTarget;
            var param;
            switch (target) {
                case this.view.yjxqin_btn:
                    if (this.cur_type == 1) {
                        var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                        pproxy.sort_weifen();
                        var fz = pproxy.get_mn_list("xinqing");
                        var c_num = 0;
                        for (var k in fz) {
                            var c_fz = fz[k];
                            if (c_num < this.proxy.mache_total && !c_fz.xq_select) {
                                this.proxy.xz_fz_info.push({
                                    "id": c_fz.id,
                                    "zinv_info": c_fz
                                });
                                c_num = Math.min(this.proxy.mache_total, c_num + 1);
                            }
                        }
                        this.sendNotification(mx.MX_NOTICE.SELECT_FZ);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_YXD_XQ_CJZN, "page_id": 1, "type": 1 });
                    }
                    return;
                case this.view.yjhgong_btn:
                    if (this.proxy.in_xing_qin.length) {
                        //是否全在cd中
                        var flag = this.proxy.isCD();
                        if (flag) {
                            param = {
                                "t": mx.MX_NETS.CS_XQ_CD_COSTALL,
                                "type": this.cur_type - 1
                            };
                        }
                        else {
                            param = {
                                "t": mx.MX_NETS.CS_YXD_XQ_HUIGONG_ALL,
                                "type": this.cur_type - 1
                            };
                        }
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": this.cur_type == 1 ? mx.Lang.xq009 : mx.Lang.xq035 });
                        return;
                    }
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, param);
        };
        XQBYuanMediator.prototype.select_fz = function () {
            var data = this.proxy.xz_fz_info;
            //去除已取消数据
            var temp_arr = mx.Tools.arr2obj(data, 'id');
            var delete_arr = [];
            for (var i in this.proxy.in_xing_qin) {
                var id = this.proxy.in_xing_qin[i];
                if (typeof temp_arr[id] == 'undefined') {
                    var info = this.proxy.find_mache_idx(id);
                    if (info) {
                        if (info.prepare) {
                            this.proxy.fz_xq_info[info.index] = {
                                "empty": true,
                                "idx": info.idx,
                                "id": info.id,
                                "cishu": info.cishu,
                                "index": info.index
                            };
                            delete_arr.push(id);
                        }
                    }
                }
            }
            for (var i in delete_arr) {
                this.proxy.in_xing_qin.splice(this.proxy.in_xing_qin.indexOf(delete_arr[i]), 1);
            }
            //选择数据上马车
            for (var i in data) {
                if (this.proxy.in_xing_qin.indexOf(data[i].id) == -1) {
                    for (var j in this.proxy.fz_xq_info) {
                        var info = this.proxy.fz_xq_info[j];
                        if (info.empty && Number(info.cishu) < 3) {
                            if (this.cur_type == 1) {
                                this.proxy.fz_xq_info[j] = {
                                    "y_id": data[i].id,
                                    "prepare": true,
                                    "idx": info.idx,
                                    'id': info.id,
                                    "cishu": info.cishu,
                                    "index": info.index
                                };
                            }
                            else {
                                this.proxy.fz_xq_info[j] = {
                                    "zinv_id": data[i].id,
                                    "prepare": true,
                                    "idx": info.idx,
                                    'id': info.id,
                                    'zinv_info': data[i].zinv_info,
                                    "cishu": info.cishu,
                                    "index": info.index
                                };
                            }
                            this.proxy.in_xing_qin.push(data[i].id);
                            break;
                        }
                    }
                }
            }
            this.show_list();
            if (this.proxy.xz_fz_info.length) {
                this.xq();
            }
        };
        XQBYuanMediator.prototype.xq = function () {
            if (this.proxy.in_xing_qin.length) {
                var str = "";
                var str2 = "";
                for (var i in this.proxy.in_xing_qin) {
                    if (Number(i) < (this.proxy.in_xing_qin.length - 1)) {
                        str += this.proxy.in_xing_qin[i] + "|";
                        str2 += this.proxy.find_mache_idx(this.proxy.in_xing_qin[i]).idx + "|";
                    }
                    else {
                        str += this.proxy.in_xing_qin[i];
                        str2 += this.proxy.find_mache_idx(this.proxy.in_xing_qin[i]).idx;
                    }
                }
                var param = {
                    "t": mx.MX_NETS.CS_YXD_XQ_ZINV_GUIXING_ALL,
                    "id": str,
                    "type": this.cur_type - 1,
                    "biaoji": str2
                };
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, param);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": this.cur_type == 1 ? mx.Lang.xq018 : mx.Lang.xq034 });
                return;
            }
        };
        //列表刷新
        XQBYuanMediator.prototype.show_list = function () {
            var view = this.view;
            var list = view.men_list;
            var flag = this.cur_type == 1;
            var pproxy = this.proxy;
            var data = pproxy.get_men_data(this.cur_page);
            if (data.length) {
                list.dataProvider = new eui.ArrayCollection(data);
            }
            //数据,一页四个
            this.cur_page = Math.min(this.total_page, this.cur_page);
            view.page_t.text = this.cur_page + "/" + this.total_page;
        };
        XQBYuanMediator.prototype.buy_yb = function () {
            this.facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
        };
        XQBYuanMediator.prototype.fresh_currency = function () {
            var view = this.view;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            view.ybao_t.text = mx.Tools.num2str(dproxy.get_currency("ybao"));
        };
        XQBYuanMediator.NAME = "XQBYuanMediator";
        return XQBYuanMediator;
    }(puremvc.Mediator));
    mx.XQBYuanMediator = XQBYuanMediator;
    __reflect(XQBYuanMediator.prototype, "mx.XQBYuanMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XQBYuanMediator.js.map