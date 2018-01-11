/**
*   @author mx
*   @date 2015.1.3
*   @desc 冷宫点击妃子进入此界面
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
    var LGongTWScreen = (function (_super) {
        __extends(LGongTWScreen, _super);
        function LGongTWScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.daishu = 0;
            _this.wenhua = 1;
            return _this;
        }
        LGongTWScreen.mx_support = function () {
            return ["assets.palace_lgtw", "api.ZINVSKILL", "api.XUETONGTIP"];
        };
        LGongTWScreen.prototype.init_view = function () {
            this.mz_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tw_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.chulg_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fresh_screen();
        };
        LGongTWScreen.prototype.fresh_screen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.feizi = pproxy.get_curr_lgfz();
            if (!this.ef_g.numChildren) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
            this.mname_t.text = this.feizi.name;
            this.mname_t.textColor = mx.Tools.num2color(this.feizi.meili);
            this.znz_t.text = mx.Lang.zn + "：" + this.feizi.haizi; //子女数暂无
            //this.mlz_t.text = Lang.mli + "：" + this.feizi.meili;
            this.caz_t.text = mx.Lang.ca + "：" + this.feizi.pet;
            if (this.feizi.zongzu) {
                this.mz_t.textFlow = [{ "text": mx.Lang.zzu + "：", "style": { "textColor": 0xffffff } }, { "text": this.feizi.zongzu, "style": { "underline": true } }];
            }
            else {
                this.mz_t.textFlow = [{ "text": mx.Lang.zzu + "：", "style": { "textColor": 0xffffff } }, { "text": mx.Lang.wu, "style": { "underline": false } }];
            }
            if (Number(this.feizi.jinzhu)) {
                this.jzname_t.visible = true;
                this.jzname_t.textFlow = [{ "text": mx.Lang.jzu + "：", "style": { "textColor": 0xffffff } }, { "text": this.feizi.jz_name, "style": { "underline": true } }];
            }
            else {
                this.g_g.removeChild(this.jzname_t);
                //this.jzname_t.visible = false;
            }
            var mid = Number(this.feizi.mid);
            var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
            var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", this.feizi.xingge);
            this.xg_t.text = mx.Lang.xge + "：" + (xg_api ? xg_api.xingge : "???");
            this.h = [85, 183];
            if (mid > 1000 || (Number(this.feizi.mid == 308) && this.feizi.huapi != '')) {
                this.chsh_t.text = mx.Lang.cshen + "：" + (this.feizi.chushen || mx.Lang.wu);
                this.mn_p.source = mx.Tools.get_zn_res(this.feizi.avatar, "lh");
                this.jn_g.visible = true;
            }
            else {
                this.chsh_t.text = mx.Lang.cshen + "：" + (api2 ? api2.chushen : mx.Lang.zssj);
                mx.Tools.renlian_change({ "view": this.mn_p, "width": 480, type: 'lg' }, this.feizi);
                //this.mn_p.source = Tools.get_mn_res(mid, "lh");
                this.gg.removeChildAt(1);
                //this.jn_g.visible = false;
            }
            this.set_jianjie();
            this.set_xuetong();
            this.set_caiyi(); //hxj
            //技能
            for (var i in this.feizi.skill) {
                var name_1 = "";
                var desc = "";
                if (Number(this.feizi.skill[i]) <= 0) {
                    name_1 = mx.Lang.hzs75;
                }
                else {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", this.feizi.skill[i]);
                    name_1 = api.name;
                }
                this["jneng" + (Number(i) + 1) + "_t"].text = name_1;
                if (name_1 != mx.Lang.hzs75) {
                    this["jneng" + (Number(i) + 1) + "_t"].textColor = 0x72bd6a;
                }
            }
        };
        LGongTWScreen.prototype.set_jianjie = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = pproxy.get_curr_lgfz();
            this.jianjie_list.dataProvider = new eui.ArrayCollection(mx.Tools.get_jianjie(c_mn.sex));
            this.jianjie_s.height = this.h[0];
            this.jianjie_s.viewport.validateNow();
            var cur_height = this.jianjie_list.measuredHeight ? this.jianjie_list.measuredHeight : this.jianjie_list.height;
            var yy = Math.max(cur_height - this.h[0], 0);
            this.jianjie_s.viewport.scrollV = yy;
            var height = mx.Tools.screen_height;
            this.jianjie_g.top = 97.5 + (height - 97.5 - 675 - 219) / 2;
        };
        LGongTWScreen.prototype.set_xuetong = function () {
            var info = mx.Tools.get_xuetong_info(this.feizi);
            this.daishu = info.daishu;
            this.wenhua = info.wenhua;
            this.xt_t.textFlow = [{ "text": mx.Lang.fzxt + "：" }, { "text": info.str, "style": { "underline": true } }];
        };
        LGongTWScreen.prototype.set_caiyi = function () {
            var view = this;
            var c_mn = this.feizi;
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
        LGongTWScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.jianjie_list.dataProvider = null;
            egret.Tween.removeTweens(this.jianjie_s.viewport);
            this.mz_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tw_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.chulg_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        LGongTWScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.back_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LGongScreen.S_NAME);
                    break;
                case this.mz_t:
                    if (this.feizi.zongzu_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": this.feizi.zongzu_id,
                        });
                    }
                    break;
                case this.tw_b://探望
                    var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                    pproxy.show_fz_dia(this.feizi, "lg");
                    break;
                case this.chulg_b://接出冷宫
                    var a_d = {
                        "param": mx.Lang.lg011,
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_HOUGONG_WEIFEN, "mid": this.feizi.mid },
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
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
                        "param": this.feizi
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
        LGongTWScreen.S_NAME = "LGongTWScreen";
        LGongTWScreen.M_NAME = "LGongScreen";
        return LGongTWScreen;
    }(mx.BasicView));
    mx.LGongTWScreen = LGongTWScreen;
    __reflect(LGongTWScreen.prototype, "mx.LGongTWScreen");
})(mx || (mx = {}));
//# sourceMappingURL=LGongTWScreen.js.map