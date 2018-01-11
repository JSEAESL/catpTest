/**
 *   @author wf  daiqi-2017-7-7
 *   @date 2016.11.11
 *   @desc 储秀宫妃子列表render
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
    var FzItemRender = (function (_super) {
        __extends(FzItemRender, _super);
        function FzItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FzItemRender.prototype.init_render = function () {
            this.charborder_p.touchEnabled = false;
            this.wqj_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.total_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        FzItemRender.prototype.btn_click = function (e) {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.target) {
                case this.wqj_b:
                    var point = this.localToGlobal(this.wqj_b.x, this.wqj_b.y);
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "type": "wqj",
                        "x": point.x,
                        "y": point.y,
                        "w": this.wqj_b.width,
                        "h": this.wqj_b.height,
                        "name": d.name,
                        "namecolor": mx.Tools.num2color(d.meili)
                    });
                    break;
                case this.total_bg:
                    if (mx.AppConfig.CURR_SCENE_ID != mx.YXDianScreen.S_NAME) {
                        return;
                    }
                    var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                    var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    var c_id = this.data;
                    if (wproxy.isTx) {
                        wproxy.setCurrFz(c_id);
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AVGView.S_NAME,
                            "param": {
                                "cd": c_id,
                                "type": "tiaoxi",
                                "title": mx.Lang.tx011,
                                "cshu": wproxy.txcshu,
                            }
                        });
                    }
                    else if (lproxy.isLD) {
                        lproxy.cur_mn = c_id;
                        var temp = lproxy.get_cur_user();
                        var temp_id = temp.user_id;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FZ_INFO,
                            "mid": c_id.mid,
                            "to_id": temp_id,
                            "type": 1
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_YXD_SHIQIN,
                            "id": Number(this.data.id),
                        });
                    }
                    break;
            }
        };
        FzItemRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.txrate_list.dataProvider = null;
            if (this.wqjtimer) {
                this.wqjtimer.stop();
                this.wqjtimer.removeEventListener(egret.TimerEvent.TIMER, this.wqjTimerFunc, this);
                this.wqjtimer = null;
            }
            this.wqj_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.total_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        FzItemRender.prototype.get_mnres = function (td) {
            var view = this.avatar;
            view.source = td;
            view.scaleX = view.scaleY = 400 / (644 * mx.MX_COMMON.RONGHE_CHICUN / 480); //高放缩到400
        };
        FzItemRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            view.xqlgong_p.visible = false;
            if (mx.Tools.check_view_state("YXDianScreen")) {
                view.bg.source = "yxdlistbg_png";
            }
            else if (mx.Tools.check_view_state("CXGongScreen")) {
                view.bg.source = "zxdlistbg_png";
            }
            if (d.ren_lian && d.ren_lian != "") {
                mx.Tools.url_image(d.ren_lian, null, this.get_mnres, this);
            }
            else {
                if (d.hero) {
                    view.avatar.source = d.hero;
                }
                else if (d.avatar) {
                    view.avatar.source = mx.Tools.get_zn_res(d.avatar, 'jq');
                }
            }
            this.avatar.mask = null;
            this.avatar.mask = new egret.Rectangle(0, 30, 150, 350);
            var meili = Number(d.meili);
            view.name_t.text = d.name.split('').join('\n');
            view.name_t.textColor = mx.Tools.num2color(meili);
            view.pet_p.visible = false;
            view.mli_t.horizontalCenter = 0;
            if (typeof d.chongai != "undefined") {
                view.mli_t.text = d.chongai;
                view.pet_p.visible = true;
                view.pet_p.width = 33;
            }
            else {
                view.mli_t.text = mx.Lang.mli + ': ' + meili;
                view.pet_p.width = 0;
            }
            var tag_arr = [];
            var znlx = ['qsz', 'ssz', 'yzz'];
            var zinv = false;
            var tag;
            //早期是根据"zinv"来判断亲、私、野，后来改成"sisheng"
            if (d.zinv && d.zinv > 0 && d.zinv <= znlx.length) {
                zinv = d.zinv != 3;
                tag = znlx[d.zinv - 1] + "_png";
            }
            else if (d.sisheng) {
                switch (d.sisheng) {
                    case "0":
                        break;
                    case Main.USER_ID:
                        tag = "ssz_png";
                        break;
                    default://既不是亲生，也不是私生，即为野孩子
                        tag = "yzz_png";
                        break;
                }
            }
            if (tag) {
                tag_arr.push({
                    "tag": tag,
                });
            }
            if (d.zhuan == 1 || d.zhuan == 3) {
                tag_arr.push({
                    "tag": "zsbqian_png",
                });
            }
            this.tag_list.dataProvider = new eui.ArrayCollection(tag_arr);
            view.pli_t.left = NaN;
            view.pli_t.horizontalCenter = 0;
            if (d.pinli) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", d.pinli);
                view.pli_t.text = mx.Tools.format(mx.Lang.cxg006, api.name);
                api = null;
                view.xqiubg.visible = false;
            }
            else if (d.weifen) {
                view.pli_t.text = d.weifen;
            }
            else if (d.isFlu) {
                view.pli_t.text = mx.Tools.format(mx.Lang.qfg15, Math.min(d.qufu, d.qfz_max), d.qfz_max);
                view.xqiubg.width = view.pli_t.width + 77;
            }
            /*if (d.dibg) {
                view.xqiubg.source = d.dibg;
            } else {
                view.xqiubg.source = "xqiubg_png";
            }*/
            if (d.zibg) {
                view.mlibg.source = d.zibg;
            }
            else {
                view.mlibg.source = "meiliBG_png";
            }
            view.mlz_g.visible = false; //true;//魅力屏蔽
            view.mlibg.visible = false; //true;
            if (d.mlz_g) {
                view.mlz_g.visible = false;
                view.mlibg.visible = false;
            }
            // view.namedi_p.visible = d.namedi;
            view.namedi_p.visible = true;
            d.rate = Number(d.rate);
            var rate_arr = ['', 'txamei', 'txqmi'];
            rate_arr[0] = d.sex == 1 ? 'txhyan' : 'txlyan';
            view.txrate.visible = !zinv && d.zinv != 3 && d.rate > 3 && d.rate < 7 ? true : false;
            view.txrate_list.visible = !zinv && d.rate > 1 && d.rate < 7 ? true : false;
            if (!zinv && d.rate > 1 && d.rate < 7) {
                if (d.rate > 3) {
                    view.txrate.source = rate_arr[d.rate - 4] + '_png';
                }
                view.txrate_list.itemRenderer = mx.RateRender;
                var arr = [];
                for (var i = 0; i < 5; i++) {
                    arr.push({ 'rate': d.rate - 1, 'max': 5, 'reverse': true });
                }
                view.txrate_list.dataProvider = new eui.ArrayCollection(arr);
            }
            this.wqj_b.visible = this.wdjs_g.visible = false;
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = pproxy.get_curr_mn(this.data.id);
            if (c_mn && !pproxy.taifu_type) {
                if (c_mn.wqj_res == 0) {
                    this.wdjs = 0;
                }
                else {
                    var ctime = (new Date().getTime()) / 1000;
                    var delay = Math.max(Math.floor(ctime - c_mn.time), 0);
                    this.wdjs = Number(c_mn.wqj_res) - delay;
                }
                if (this.wdjs > 0) {
                    if (!this.wqjtimer) {
                        this.wqjtimer = new egret.Timer(1000);
                        this.wqjtimer.addEventListener(egret.TimerEvent.TIMER, this.wqjTimerFunc, this);
                        this.wqjtimer.start();
                    }
                    this.wqj_b.visible = this.wdjs_g.visible = true; //酒杯、倒计时  显现
                    this.wdjs_t.text = mx.Tools.format_second(this.wdjs);
                }
                else {
                    this.wdjs = 0;
                }
            }
            //省亲已选择
            if (d.xqin) {
                view.xqlgong_p.visible = this.data.is_lg;
                this.xqlgong_p.source = "xqlgzhong_png";
                this.xqin_g.visible = true;
                this.xq_select.source = "";
                this.xz.source = "xzxqxzgou_png";
                this.xz_quxiao.source = "djkqxiao_png";
                this.data.xq_ing = false;
                if (d.xq_select) {
                    this.touchEnabled = false;
                    var xproxy = (facade.retrieveProxy(mx.XqinProxy.NAME));
                    var field = xproxy.cur_type == 1 ? "y_id" : "zinv_id";
                    var str = "";
                    for (var i in xproxy.fz_xq_info) {
                        var unit = xproxy.fz_xq_info[i];
                        if (unit[field] == d.id && typeof unit.time != 'undefined') {
                            str = xproxy.cur_type == 1 ? "xqzztai_png" : "gxzztai_png";
                            this.data.xq_ing = true;
                            this.xz.visible = this.xz_quxiao.visible = false;
                            break;
                        }
                    }
                    this.xq_select.source = str;
                }
            }
            //许愿池
            if (d.isxy) {
                this.xyfsc_p.source = "fscfzzzhao_png";
                if (d.mid >= 900) {
                    this.xyfsc_p.visible = true;
                }
                else {
                    var hero_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", d.mid);
                    var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
                    if (!hero_api) {
                        this.xyfsc_p.visible = true;
                    }
                    else if (!hproxy.get_hero_by_mid(d.mid)) {
                        this.xyfsc_p.visible = true;
                    }
                }
            }
        };
        FzItemRender.prototype.wqjTimerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (this.wdjs <= 1) {
                this.wqj_b.visible = this.wdjs_g.visible = false;
            }
            else {
                this.wdjs--;
                this.wdjs_t.text = mx.Tools.format_second(this.wdjs);
            }
        };
        FzItemRender.prototype.set_wqjtimer = function () {
            if (!this.wqjtimer) {
                this.wqjtimer = new egret.Timer(1000);
                this.wqjtimer.addEventListener(egret.TimerEvent.TIMER, this.wqjTimerFunc, this);
                this.wqjtimer.start();
            }
        };
        return FzItemRender;
    }(mx.BasicRender));
    mx.FzItemRender = FzItemRender;
    __reflect(FzItemRender.prototype, "mx.FzItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=FzItemRender.js.map