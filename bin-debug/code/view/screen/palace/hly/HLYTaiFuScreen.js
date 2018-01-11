/**
 *   @author mx
 *   @date 2017.10.27
 *   @desc 翰林院太傅详情界面
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
    var HLYTaiFuScreen = (function (_super) {
        __extends(HLYTaiFuScreen, _super);
        function HLYTaiFuScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.title_arr = ["yjybtitf_png", "qsgbtitf_png", "xwcbtitf_png", "bjybtitf_png", "hmgbtitf_png", "gxgbtitf_png"];
            _this.daishu = 0;
            _this.wenhua = 1;
            return _this;
        }
        HLYTaiFuScreen.mx_support = function () {
            return ["assets.palace_hly_tfcz", "api.HEROHOUGONG", "api.XINGGE", "api.ZINVSKILL", "api.JINJI"];
        };
        HLYTaiFuScreen.prototype.set_caiyi = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var c_mn = this.c_mn;
            var caiyi_arr = [];
            if (Number(c_mn.mid) < 1000) {
                for (var i = 1; i <= 2; i++) {
                    var type = Number(c_mn["caiyi" + i + "_type"]); //才艺类型
                    if (type) {
                        var num = Number(c_mn["caiyi" + i + "_num"]); //才艺值
                        type = mx.Lang.hgcaiyi[type - 1] + "：" + num;
                        var rank = Math.min(Math.floor(num / 50), 4);
                        var desc = mx.Lang.hgcaiyi_rank[rank];
                        caiyi_arr.push({ "type": type, "desc": desc });
                    }
                }
            }
            else {
                var type = Number(c_mn.caiyi_type); //才艺类型
                var num = Number(c_mn.caiyi_num); //才艺值
                type = mx.Lang.hgcaiyi[type - 1] + "：" + num;
                var rank = Math.min(Math.floor(num / 50), 4);
                var desc = mx.Lang.hgcaiyi_rank[rank];
                caiyi_arr.push({ "type": type, "desc": desc });
            }
            this.caiyi_list.dataProvider = new eui.ArrayCollection(caiyi_arr);
        };
        HLYTaiFuScreen.prototype.caozuo_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (e.item.bg) {
                case "ghtfaniu_png"://更换太傅
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.SelectTaiFuView.S_NAME });
                    break;
            }
        };
        HLYTaiFuScreen.prototype.init_view = function () {
            this.caozuo_list.itemRenderer = mx.SSButtonRender;
            this.caozuo_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.caozuo_click, this);
            this.mz_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jzname_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_screen();
        };
        HLYTaiFuScreen.prototype.init_lh = function () {
            var c_mn = this.c_mn;
            var mid = Number(c_mn.mid);
            this.h = [85, 183];
            if (mid > 1000) {
                this.chsh_t.text = mx.Lang.cshen + "：" + c_mn.chushen || mx.Lang.wu;
                this.mn_p.source = mx.Tools.get_zn_res(c_mn.avatar, "lh");
                //this.h = [55, 122];
                this.jn_g.visible = true;
            }
            else {
                var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
                this.chsh_t.text = mx.Lang.cshen + "：" + (api2 ? api2.chushen : mx.Lang.zssj);
                var whq = api2 ? api2.wenhua : 1;
                //this.jianjie_s.top = 290;
                //this.h = [88, 182];
                this.jn_g.visible = false;
                //this.jianjie_p.top = 260;
            }
        };
        HLYTaiFuScreen.prototype.fresh_screen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.title_p.source = this.title_arr[pproxy.taifu_type - 1];
            this.caozuo_list.dataProvider = new eui.ArrayCollection([{ "bg": "ghtfaniu_png" }]);
            this.c_mn = pproxy.taifu_list[pproxy.taifu_type - 1];
            this.c_mn = pproxy.get_curr_mn(this.c_mn);
            var c_mn = this.c_mn;
            this.mname_t.text = c_mn.name;
            this.znz_t.text = mx.Lang.zn + "：" + (c_mn.haizi || c_mn.zinv || 0); //子女数暂无
            this.caz_t.text = mx.Lang.ca + "：" + c_mn.pet;
            var t_arr = [{ "text": mx.Lang.zzu + "：", "style": { "textColor": 0xffffff } }];
            if (c_mn.zongzu) {
                t_arr.push({ "text": c_mn.zongzu, "style": { "underline": true } });
            }
            else {
                t_arr.push({ "text": mx.Lang.wu, "style": { "underline": false } });
            }
            this.mz_t.textFlow = t_arr;
            if (Number(c_mn.jinzhu)) {
                this.jzname_t.visible = true;
                this.jzname_t.textFlow = [
                    { "text": mx.Lang.jzu + "：", "style": { "textColor": 0xffffff } },
                    { "text": c_mn.jz_name, "style": { "underline": true } }
                ];
            }
            else {
                if (this.jzname_t && this.jzname_t.parent) {
                    this.jzname_t.parent.removeChild(this.jzname_t);
                }
            }
            var xg_api;
            if (c_mn.xingge && c_mn.xingge != "") {
                xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", c_mn.xingge);
            }
            else if (Number(c_mn.mid) < mx.MX_COMMON.SC_MID_BASE) {
                var hapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", c_mn.mid);
                xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", hapi.xingge);
                hapi = null;
            }
            this.xg_t.text = mx.Lang.xge + "：" + (xg_api ? xg_api.xingge : "???");
            xg_api = null;
            if (!this.ef_g.numChildren) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
            for (var i in c_mn.skill) {
                var name_1 = "";
                var desc = "";
                if (Number(c_mn.skill[i]) <= 0) {
                    name_1 = mx.Lang.hzs75;
                }
                else {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", c_mn.skill[i]);
                    name_1 = api.name;
                }
                this["jneng" + (Number(i) + 1) + "_t"].text = name_1;
                if (name_1 != mx.Lang.hzs75) {
                    this["jneng" + (Number(i) + 1) + "_t"].textColor = 0x72bd6a;
                }
            }
            this.init_lh();
            this.fresh_weifen();
            this.set_xuetong();
            this.set_caiyi();
        };
        HLYTaiFuScreen.prototype.set_jianjie = function () {
            this.jianjie_list.dataProvider = new eui.ArrayCollection(mx.Tools.get_jianjie(this.c_mn.sex));
            this.jianjie_s.height = this.h[0];
            this.jianjie_s.viewport.validateNow();
            var cur_height = this.jianjie_list.measuredHeight ? this.jianjie_list.measuredHeight : this.jianjie_list.height;
            var yy = Math.max(cur_height - this.h[0], 0);
            this.jianjie_s.viewport.scrollV = yy;
            //let height = Tools.screen_height;
            //this.jianjie_g.top = 65 + Math.ceil((height - 65 - 450 - 146) / 2);
            this.change_b.scaleY = -1;
        };
        HLYTaiFuScreen.prototype.set_xuetong = function () {
            var info = mx.Tools.get_xuetong_info(this.c_mn);
            this.daishu = info.daishu;
            this.wenhua = info.wenhua;
            this.xt_t.textFlow = [{ "text": mx.Lang.fzxt + "：" }, { "text": info.str, "style": { "underline": true } }];
        };
        HLYTaiFuScreen.prototype.fresh_weifen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var c_mn = this.c_mn;
            var wf;
            if (lproxy.isLD) {
                wf = c_mn.weifen;
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_mn.weifen);
                wf = Number(c_mn.sex) == 1 ? api.weifeng : api.weifenb; //位分
            }
            if (c_mn.cizi) {
                wf = c_mn.cizi + wf;
            }
            this.weifen_t.text = mx.Lang.wfen + "：" + wf;
            this.mname_t.textColor = mx.Tools.num2color(c_mn.meili);
            this.mlz_t.text = mx.Lang.mli + "：" + c_mn.meili;
            this.set_jianjie();
        };
        HLYTaiFuScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = this.c_mn;
            switch (e.currentTarget) {
                case this.mz_t://跳转到其他用户界面，需要先发送请求
                    if (c_mn.zongzu_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": c_mn.zongzu_id,
                        });
                    }
                    break;
                case this.jzname_t://跳转到其他用户界面，需要先发送请求
                    if (c_mn.zongzu_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": c_mn.jinzhu,
                        });
                    }
                    break;
                case this.back_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HLYScreen.S_NAME);
                    break;
                case this.change_b:
                    var height = void 0;
                    var yy = void 0;
                    if (e.currentTarget.scaleY == 1) {
                        height = this.h[0];
                        e.currentTarget.scaleY = -1;
                        yy = Math.max(this.jianjie_list.measuredHeight - height, 0);
                    }
                    else {
                        height = this.h[1];
                        e.currentTarget.scaleY = 1;
                        yy = 0;
                    }
                    this.jianjie_s.height = height;
                    this.jianjie_s.validateNow();
                    egret.Tween.get(this.jianjie_s.viewport).to({ "scrollV": yy }, 300);
                    break;
                case this.ef_g:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HzsZNSkillView.S_NAME,
                        "param": this.c_mn
                    });
                    break;
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
        HLYTaiFuScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            pproxy.taifu_type = null;
            this.mz_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jzname_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jianjie_list.dataProvider = null;
            egret.Tween.removeTweens(this.jianjie_s.viewport);
        };
        HLYTaiFuScreen.S_NAME = "HLYTaiFuScreen";
        return HLYTaiFuScreen;
    }(mx.BasicView));
    mx.HLYTaiFuScreen = HLYTaiFuScreen;
    __reflect(HLYTaiFuScreen.prototype, "mx.HLYTaiFuScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HLYTaiFuScreen.js.map