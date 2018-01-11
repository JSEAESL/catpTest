/**
 *   @author qianjun
 *   @date 2015.1.3 2016.11.15
 *   @desc 代售子女简介
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
    var HeiShiDsznView = (function (_super) {
        __extends(HeiShiDsznView, _super);
        function HeiShiDsznView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.daishu = 0;
            _this.wenhua = 1;
            return _this;
        }
        HeiShiDsznView.mx_support = function () {
            return ["assets.market_buy_dszn", "api.XINGGE", "api.XUETONGTIP"];
        };
        Object.defineProperty(HeiShiDsznView.prototype, "hproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.HeiShiProxy.NAME));
                ;
            },
            enumerable: true,
            configurable: true
        });
        HeiShiDsznView.prototype.init_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.HeiShiDsznViewMediator(this));
            view.xpin_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zzu_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.kkan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cxing_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xt_click, this);
            this.fresh_screen();
            this.set_xuetong();
            this.set_caiyi();
        };
        HeiShiDsznView.prototype.fresh_screen = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeiShiProxy.NAME));
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            view.feizi = {};
            view.feizi.info = pproxy.jianjie;
            view.feizi.data = hproxy.jump_zinv_info;
            view.hasGet_g.visible = false;
            view.sc_tshi.visible = false;
            view.btn_g.visible = true;
            view.sc_tshi_t.text = "";
            var fz = view.feizi.data;
            this.needxp = true;
            view.name_t.text = fz.name || '';
            view.mli_t.text = mx.Lang.mli + '：' + fz.meili;
            view.cshen_t.text = mx.Lang.cshen + '：' + (fz.fenghao || mx.Lang.wu);
            var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", fz.xingge);
            this.xg_t.text = mx.Lang.xge + "：" + (xg_api ? xg_api.xingge : "???");
            this.hsb_t.text = fz.jiage;
            this.hsb_p.left = 110 + this.hsb_t.width + 6;
            view.zzu_t.textFlow = [
                { "text": mx.Lang.zzu + '：' },
                { "text": fz.zongzu || fz.zongzu_name, "style": { "textColor": mx.Tools.num2color(200) } }
            ];
            this.set_bg();
            view.avatar.source = mx.Tools.get_zn_res(fz.avatar, 'lh');
            var arr = [];
            var str2 = []; //简介
            var jianjie = this.feizi.info;
            for (var k in jianjie) {
                if (jianjie[k]) {
                    var time = mx.Tools.format_time(jianjie[k].time, "nyr");
                    var txt = jianjie[k].msg;
                    var key_id = Number(jianjie[k].key_id);
                    switch (key_id) {
                        case 6:
                            var c_mn = this.feizi.data;
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", txt);
                            txt = Number(c_mn.sex) == 1 ? api.weifeng : api.weifenb;
                            break;
                        case 22:
                        case 23:
                            txt = txt.split('|');
                            break;
                    }
                    if (key_id == 22 || key_id == 23) {
                        txt = mx.Tools.format(mx.Lang["fzjj" + jianjie[k].key_id], txt[0], txt[1]);
                    }
                    else {
                        txt = mx.Tools.format(mx.Lang["fzjj" + jianjie[k].key_id], txt);
                    }
                    str2 = mx.Tools.setKeywordColor2(txt, [mx.Tools.num2color(200)]);
                    arr.push({
                        "data": time,
                        "jianjie": str2
                    });
                }
            }
            this.jianjie_list.dataProvider = new eui.ArrayCollection(arr);
            this.jianjie_s.height = 34;
            this.jianjie_s.viewport.validateNow();
            var cur_height = this.jianjie_list.measuredHeight ? this.jianjie_list.measuredHeight : this.jianjie_list.height;
            var yy = Math.max(cur_height - 34, 0);
            this.jianjie_s.viewport.scrollV = yy;
            var height = mx.Tools.screen_height;
            this.jianjie_g.top = 65 + Math.ceil((height - 65 - 415 - 146) / 2);
            this.change_b.scaleY = -1;
            if (!this.ef_g.numChildren) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
            for (var i in fz.skill) {
                var name_1 = "";
                var desc = "";
                if (Number(fz.skill[i]) <= 0) {
                    name_1 = mx.Lang.hzs75;
                }
                else {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", fz.skill[i]);
                    name_1 = api.name;
                }
                view["jneng" + (Number(i) + 1) + "_t"].text = name_1;
                if (name_1 != mx.Lang.hzs75) {
                    view["jneng" + (Number(i) + 1) + "_t"].textColor = 0x72bd6a;
                }
            }
        };
        HeiShiDsznView.prototype.set_xuetong = function () {
            var c_mn = this.feizi.data;
            var info = mx.Tools.get_xuetong_info(c_mn);
            this.daishu = info.daishu;
            this.wenhua = info.wenhua;
            this.xt_t.textFlow = [{ "text": mx.Lang.fzxt + "：" }, { "text": info.str, "style": { "underline": true } }];
        };
        HeiShiDsznView.prototype.set_caiyi = function () {
            var view = this;
            var c_mn = this.feizi.data;
            var type = Number(c_mn.caiyi_type); //才艺类型
            var num = Number(c_mn.caiyi_num); //才艺值
            view.caiyi_t.text = mx.Lang.hgcaiyi[type - 1] + "：" + num;
            var rank = Math.min(Math.floor(num / 50), 4);
            view.caiyi_desc.text = mx.Lang.hgcaiyi_rank[rank];
        };
        HeiShiDsznView.prototype.set_bg = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.bg_p.source = pproxy.hzhd_bg;
        };
        HeiShiDsznView.prototype.xt_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.xt_t:
                    var target = this.xt_t;
                    var point = target.parent.localToGlobal(target.x, target.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "type": "blood",
                        "wenhua": this.wenhua,
                        "daishu": this.daishu,
                    });
                    break;
            }
        };
        HeiShiDsznView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hproxy.set_jump_zinv(null);
            this.xpin_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zzu_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.kkan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.cxing_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xt_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeiShiDsznViewMediator.NAME);
            this.jianjie_list.dataProvider = null;
            egret.Tween.removeTweens(this.jianjie_s.viewport);
        };
        HeiShiDsznView.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (e.currentTarget) {
                case this.back_b:
                    this.close_self();
                    break;
                case this.xpin_b://下聘
                    var fz_info = this.feizi.data;
                    var csd = { "t": mx.MX_NETS.CS_HS_BUY_ZN, "id": fz_info.hei_id };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": csd,
                            "param": mx.Tools.format(mx.Lang.hs0019, fz_info.jiage),
                        }
                    });
                    break;
                case this.change_b:
                    var height = void 0;
                    if (e.currentTarget.scaleY == 1) {
                        height = 34;
                        e.currentTarget.scaleY = -1;
                    }
                    else {
                        height = 140;
                        e.currentTarget.scaleY = 1;
                    }
                    this.jianjie_s.height = height;
                    var yy = Math.max(this.jianjie_list.height - height, 0);
                    //this.jianjie_s.viewport.scrollV = yy;
                    egret.Tween.get(this.jianjie_s.viewport).to({ "scrollV": yy }, 300);
                    break;
                case this.ef_g:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HzsZNSkillView.S_NAME,
                        "param": this.feizi.data
                    });
                    break;
                case this.kkan_b://收入后宫后，再看看
                    this.hproxy.set_jump_zinv(null);
                    this.close_self();
                    break;
                case this.cxing_b://去宠幸
                    pproxy.set_curr_mn(this.have_hougong.id);
                    //pproxy.que_scroller = this.all_s.viewport.scrollV;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": this.have_hougong.mid,
                        "type": 1
                    });
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.YXDFzScreen.S_NAME);
                    break;
            }
        };
        HeiShiDsznView.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeiShiDsznView.S_NAME);
        };
        HeiShiDsznView.prototype.xpin_suc = function (data) {
            var view = this;
            this.have_hougong = data;
            view.hasGet_g.visible = true;
            view.btn_g.visible = false;
            view.sc_tshi.visible = true;
            view.sc_tshi_t.text = mx.Lang.hs0026;
        };
        HeiShiDsznView.S_NAME = "HeiShiDsznView";
        HeiShiDsznView.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return HeiShiDsznView;
    }(mx.BasicView));
    mx.HeiShiDsznView = HeiShiDsznView;
    __reflect(HeiShiDsznView.prototype, "mx.HeiShiDsznView");
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiDsznView.js.map