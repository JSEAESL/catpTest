/**
*   @author cy
*   @date 2017.1.17
*   @desc 教坊司妃子详情
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
    var JFSYJXQScreen = (function (_super) {
        __extends(JFSYJXQScreen, _super);
        function JFSYJXQScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.daishu = 0;
            _this.wenhua = 1;
            return _this;
        }
        JFSYJXQScreen.mx_support = function () {
            return ["assets.jfs_yjcz", "api.JFSLEVEL", "api.JINJI", "api.XINGGE", "api.ZINVSKILL", "api.XUETONGTIP"];
        };
        JFSYJXQScreen.prototype.init_view = function () {
            this.mz_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jz_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.JFSYJXQMediator(this));
            this.fresh_screen();
            this.set_xuetong();
            this.set_caiyi();
            this.fun_list.itemRenderer = mx.SSButtonRender;
            this.fun_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.fun_click, this);
            var arr = [{ "bg": "pchangbtn_png" }, { "bg": "pc50ci_png" }, { "bg": "eke_png" }, { "bg": "sshenbtn_png" }];
            this.fun_list.dataProvider = new eui.ArrayCollection(arr);
        };
        JFSYJXQScreen.prototype.fresh_screen = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            this.feizi = wproxy.get_cur_mn();
            var jg;
            var meili = Number(this.feizi.meili);
            if (meili < 50) {
                jg = 60;
            }
            else if (meili < 60) {
                jg = 60;
            }
            else if (meili < 70) {
                jg = 108;
            }
            else if (meili < 80) {
                jg = 150;
            }
            else if (meili < 90) {
                jg = 198;
            }
            else {
                jg = 288;
            }
            var jibie = 1;
            var renqi = Number(this.feizi.renqi);
            var arr = [0, 30, 60, 90, 120, 180, 240, 300, 360, 420, 600, 900, 99999999];
            for (var k in arr) {
                if (renqi >= arr[k] && renqi < arr[Number(k) + 1]) {
                    jibie = Math.min(Number(k) + 1, 9);
                    break;
                }
            }
            var arr2 = [600, 300, 180, 150, 120, 90, 60, 45, 30, 15, 10, 0];
            jg += arr2[12 - jibie];
            this.jg = jg;
            this.yh = 0;
            if (typeof this.feizi.haizi != 'undefined') {
                if (this.feizi.haizi == 'yesheng') {
                    if (Main.USER_ID == this.feizi.jinzhu) {
                        this.yh = Math.round(this.feizi.youhui * jg / 100);
                        this.yh_t.visible = true;
                    }
                }
                else {
                    this.yh = Math.round(10 * jg / 100);
                    this.yh_t.visible = true;
                }
            }
            else {
                if (Main.USER_ID == this.feizi.jinzhu) {
                    this.yh = Math.round(this.feizi.youhui * jg / 100);
                    this.yh_t.visible = true;
                }
            }
            this.yh_t.text = mx.Tools.format(mx.Lang.jfs23, this.yh);
            this.sj_t.text = mx.Tools.format(mx.Lang.jfs22, this.jg - this.yh);
            this.mname_t.text = this.feizi.name;
            this.mname_t.textColor = mx.Tools.num2color(this.feizi.meili);
            //this.mlz_t.text = "" + this.feizi.meili;
            var xg_api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", this.feizi.xingge);
            this.xg_t.text = xg_api ? xg_api.xingge : "???";
            if (this.feizi.zongzu_id) {
                this.mz_t.textFlow = [{ "text": this.feizi.zongzu_name, "style": { "underline": true } }];
            }
            else {
                this.mz_t.textFlow = [{ "text": mx.Lang.wu, "style": { "underline": false } }];
            }
            if (Number(this.feizi.jinzhu)) {
                this.jz_t.textFlow = [{ "text": this.feizi.jinzhu_name, "style": { "underline": true } }];
            }
            else {
                this.jz_t.textFlow = [{ "text": mx.Lang.wu, "style": { "underline": false } }];
            }
            var api = mx.ApiTool.getAPI(mx.MX_APINAME.JFSLEVEL);
            jibie = 11;
            renqi = Number(this.feizi.renqi);
            for (var k in api) {
                if (renqi < api[Number(k)].renqi && Number(k) < 11 && renqi >= api[Number(k) + 1].renqi) {
                    jibie = Number(k) + 1;
                    break;
                }
            }
            jibie = Math.max(jibie, 3);
            var cs;
            if (this.feizi.sex == 1) {
                cs = api[jibie].female;
            }
            else {
                cs = api[jibie].male;
            }
            this.chsh_t.text = cs;
            this.mn_p.source = mx.Tools.get_zn_res(this.feizi.avatar, "lh");
            if (!this.ef_g.numChildren) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
            this.set_jianjie();
            for (var i in this.feizi.skill) {
                var name_1 = "";
                var desc = "";
                if (Number(this.feizi.skill[i]) <= 0) {
                    name_1 = mx.Lang.hzs75;
                }
                else {
                    var api_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", this.feizi.skill[i]);
                    name_1 = api_1.name;
                }
                this["jneng" + (Number(i) + 1) + "_t"].text = name_1;
                if (name_1 != mx.Lang.hzs75) {
                    this["jn" + (Number(i) + 1) + "_t"].textColor = this["jneng" + (Number(i) + 1) + "_t"].textColor = 0x72bd6a;
                }
            }
        };
        JFSYJXQScreen.prototype.set_jianjie = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var c_mn = wproxy.get_cur_mn();
            this.jianjie_list.dataProvider = new eui.ArrayCollection(mx.Tools.get_jianjie(c_mn.sex));
            this.jianjie_s.height = 85;
            this.jianjie_s.viewport.validateNow();
            var cur_height = this.jianjie_list.measuredHeight ? this.jianjie_list.measuredHeight : this.jianjie_list.height;
            var yy = Math.max(cur_height - 85, 0);
            this.jianjie_s.viewport.scrollV = yy;
            //let height = Tools.screen_height;
            //this.jianjie_g.top = 65 + (height - 65 - 415 - 146) / 2;
        };
        JFSYJXQScreen.prototype.set_xuetong = function () {
            var info = mx.Tools.get_xuetong_info(this.feizi);
            this.daishu = info.daishu;
            this.wenhua = info.wenhua;
            this.xt_t.textFlow = [{ "text": mx.Lang.fzxt + "：" }, { "text": info.str, "style": { "underline": true } }];
        };
        JFSYJXQScreen.prototype.set_caiyi = function () {
            var view = this;
            var c_mn = this.feizi;
            var type = Number(c_mn.caiyi_type); //才艺类型
            var num = Number(c_mn.caiyi_num); //才艺值
            view.caiyi_t.text = mx.Lang.hgcaiyi[type - 1] + "：" + num;
            var rank = Math.min(Math.floor(num / 50), 4);
            view.caiyi_desc.text = mx.Lang.hgcaiyi_rank[rank];
        };
        JFSYJXQScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.jianjie_list.dataProvider = null;
            egret.Tween.removeTweens(this.jianjie_s.viewport);
            this.mz_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jz_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fun_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.fun_click, this);
            this.fun_list.dataProvider = null;
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.change_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JFSYJXQMediator.NAME);
        };
        JFSYJXQScreen.prototype.fun_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            switch (e.item.bg) {
                case "pchangbtn_png":
                case "pc50ci_png":
                    if (typeof this.feizi.haizi != 'undefined') {
                        var idx = proxy.shushen_have_avg.indexOf(this.feizi.zinv_id);
                        if (this.feizi.haizi != 'yesheng' && idx > -1) {
                            //自己子女
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "cd": this.feizi,
                                    "type": "jfs",
                                    "kind": 7,
                                    "child": 1
                                }
                            });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_JFSPC,
                                "id": this.feizi.id,
                                "type": e.item.bg == "pc50ci_png" ? 1 : 0,
                            });
                        }
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JFSPC,
                            "id": this.feizi.id,
                            "type": e.item.bg == "pc50ci_png" ? 1 : 0,
                        });
                    }
                    break;
                case "eke_png":
                    if (typeof this.feizi.haizi != 'undefined') {
                        var idx = proxy.shushen_have_avg.indexOf(this.feizi.zinv_id);
                        if (this.feizi.haizi != 'yesheng' && idx > -1) {
                            //自己子女
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "cd": this.feizi,
                                    "type": "jfs",
                                    "kind": 8,
                                    "child": 1
                                }
                            });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_JFS_EK,
                                "id": this.feizi.id
                            });
                        }
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JFS_EK,
                            "id": this.feizi.id
                        });
                    }
                    break;
                case "sshenbtn_png":
                    var a_d = {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            "t": mx.MX_NETS.CS_JFS_SS,
                            "id": this.feizi.id
                        },
                        "param": mx.Tools.format(mx.Lang.jfs19, this.jg - this.yh)
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
            }
        };
        JFSYJXQScreen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            switch (e.currentTarget) {
                case this.back_b:
                    proxy.ss_flag = 0;
                    switch (proxy.jfs_tab) {
                        case 0:
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_JIAOFANGSI_DATA,
                                "type": proxy.jfs_paixu,
                                "page": proxy.jfs_page[0]
                            });
                            break;
                        case 1:
                        case 2:
                            var type = proxy.jfs_tab == 1 ? 0 : 1;
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_JFSTYPE,
                                "type": type,
                                "page": proxy.jfs_page[proxy.jfs_tab]
                            });
                            break;
                    }
                    break;
                case this.mz_t:
                    if (this.feizi.zongzu_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO,
                            "other_id": this.feizi.zongzu_id,
                        });
                    }
                    break;
                case this.jz_t:
                    if (this.feizi.jinzhu) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO,
                            "other_id": this.feizi.jinzhu,
                        });
                    }
                    break;
                case this.change_b:
                    var height = void 0;
                    var yy = void 0;
                    if (e.currentTarget.scaleY == 1) {
                        height = 85;
                        e.currentTarget.scaleY = -1;
                        yy = Math.max(this.jianjie_list.measuredHeight - height, 0);
                    }
                    else {
                        height = 183;
                        e.currentTarget.scaleY = 1;
                        yy = 0;
                    }
                    this.jianjie_s.height = height;
                    this.jianjie_s.validateNow();
                    egret.Tween.get(this.jianjie_s.viewport).to({ "scrollV": yy }, 300);
                    break;
                case this.ef_g:
                    //facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : Lang.hzs64});
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HzsZNSkillView.S_NAME,
                        "param": proxy.get_cur_mn()
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
        JFSYJXQScreen.S_NAME = "JFSYJXQScreen";
        JFSYJXQScreen.M_NAME = "JFSScreen";
        return JFSYJXQScreen;
    }(mx.BasicView));
    mx.JFSYJXQScreen = JFSYJXQScreen;
    __reflect(JFSYJXQScreen.prototype, "mx.JFSYJXQScreen");
})(mx || (mx = {}));
//# sourceMappingURL=JFSYJXQScreen.js.map