/**
*   @author hxj
*   @date 2017.7.5
*   @desc 相国寺 过世妃嫔
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
    var XGSQueen = (function (_super) {
        __extends(XGSQueen, _super);
        function XGSQueen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.weiba_event = "";
            _this.event = "";
            _this.daishu = 0;
            _this.wenhua = 1;
            return _this;
        }
        XGSQueen.mx_support = function () {
            return ["assets.xgs_gsfp", "api.HEROHOUGONG", "api.XINGGE", "api.ZINVSKILL", "api.XUETONGTIP"];
        };
        XGSQueen.prototype.init_view = function () {
            this.fzcz_list.itemRenderer = mx.SSButtonRender;
            this.zongzu_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.showall_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fzcz_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.xt_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xt_click, this);
            this.init_screen();
            this.init_lh();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.XGSQueenMediator(this));
        };
        Object.defineProperty(XGSQueen.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XGSProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XGSQueen.prototype.init_screen = function () {
            var c_mn = this.c_mn = this.proxy.get_object();
            var mid = Number(c_mn.mid);
            var api;
            //名字
            this.fzname_t.text = c_mn.name;
            this.fzname_t.textColor = mx.Tools.num2color(c_mn.meili);
            //出身（此处为"fenghao"字段）
            api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", mid);
            this.chsh_t.text = mx.Lang.cshen + "：" + ((mid > 1000) ?
                (c_mn.fenghao || mx.Lang.wu) : (api ? api.chushen : mx.Lang.zssj));
            //位分
            api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(c_mn.weifen_ini));
            var wf = Number(c_mn.sex) == 1 ? api.weifeng : api.weifenb;
            if (c_mn.cizi) {
                wf = c_mn.cizi + wf;
            }
            this.weifen_t.text = mx.Lang.sqwfen + "：" + wf;
            //魅力
            this.meili_t.text = mx.Lang.mli + "：" + c_mn.meili;
            //性格
            api = mx.ApiTool.getAPINode(mx.MX_APINAME.XINGGE, "xingge_id", c_mn.xingge);
            this.xingge_t.text = mx.Lang.xge + "：" + (api ? api.xingge : "???");
            //宠爱
            this.pet_t.text = mx.Lang.sqca + "：" + c_mn.pet;
            //子女
            this.znnum_t.text = mx.Lang.zn + "：" + (c_mn.haizi || c_mn.zinv || 0);
            //宗族
            this.zongzu_t.textFlow = [{ "text": mx.Lang.zzu + "：", "style": { "textColor": 0xffffff } }, {
                    "text": c_mn.zongzu ? c_mn.zongzu : mx.Lang.wu,
                    "style": { "underline": c_mn.zongzu ? true : false }
                }];
            //谥号
            this.fresh_shihao();
            //查看（放大镜）动画
            if (!this.ef_g.numChildren) {
                var zg = new mx.GeneralEffect("fdj");
                this.ef_g.addChild(zg);
                zg.x = 22;
                zg.y = 22;
                zg.play_by_times(-1);
            }
            //技能
            this.jn_g.visible = mid > 1000 ? true : false;
            for (var i in c_mn.skill) {
                var name_1 = "";
                if (Number(c_mn.skill[i]) <= 0) {
                    name_1 = mx.Lang.hzs75; //尚未领悟
                }
                else {
                    var api_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", c_mn.skill[i]);
                    this["jneng" + (Number(i) + 1) + "_t"].text = api_1.name;
                    this["jneng" + (Number(i) + 1) + "_t"].textColor = 0x72bd6a;
                }
            }
            //经历简介
            this.fresh_jianjie();
            this.set_xuetong();
            this.showall_b.scaleY = -1;
        };
        XGSQueen.prototype.init_lh = function () {
            var c_mn = this.c_mn;
            var mid = Number(c_mn.mid);
            if (mid > 1000 || (Number(c_mn.mid == 308) && c_mn.huapi != '')) {
                this.feizi_p.source = mx.Tools.get_zn_res(c_mn.avatar, "lh");
            }
            else {
                if (mid == 303) {
                    this.init_mn_dg();
                }
                else if (mid >= 304 && mid <= 307) {
                    if (mx.Tools.check_drgon()) {
                        var wb = {
                            '304': 1,
                            '305': 3,
                            '306': 6,
                            '307': 9,
                        };
                        this.huyao_sex = 'nanhu';
                        this.init_hy_dg("nanhu");
                        this.init_hy_dg("nvhu");
                        this.weiba_play("nanhu", wb[mid.toString()]);
                        this.weiba_play("nvhu", wb[mid.toString()]);
                        this.event = "cxian_over";
                        this.huyao_nan.display.visible = true;
                        this.huyao_nan.animation.play("cxian", 1);
                        this.weiba_event = "cxian_over";
                        this.weiba_nan.display.visible = true;
                        this.weiba_nan.animation.play("cxian", 1);
                        //8s后转换
                        this.timeout = egret.setTimeout(this.change_huyao, this, 8000, "nvhu");
                    }
                    else {
                        var p = new eui.Image(mx.Tools.get_mn_res(mid, "lh"));
                        p.y = 120;
                        this.yh_g.addChild(p);
                    }
                }
                else {
                    this.feizi_p.source = mx.Tools.get_mn_res(mid, "lh");
                }
            }
        };
        XGSQueen.prototype.fresh_shihao = function () {
            var c_mn = this.proxy.get_object();
            this.shihao_t.text = mx.Lang.shihao + "：" + this.proxy.get_shihao(c_mn.id);
            this.fzcz_list.dataProvider = new eui.ArrayCollection([{ "bg": c_mn.shihao == "" ? "zfeng_png" : "yzfeng_png" },
                { "bg": "gsfpznv_png" },
                { "bg": "hhun_png" }]);
        };
        XGSQueen.prototype.fresh_jianjie = function () {
            var c_mn = this.proxy.get_object();
            this.jianjie_h = [85, 183];
            /*
            if (Number(c_mn.mid) > 1000) {
                this.jianjie_db.source = "znhdxxldban_png";//165*364
                this.jianjie_h = [50, 122];
            }
            else {
                this.jianjie_db.source = "pfxxxdchen_png";//165*306
                this.jianjie_db.scale9Grid = new egret.Rectangle(9, 207, 147, 70);
                this.jianjie_p.top = 214;
                this.jianjie_scro.top = 240;
                this.jianjie_h = [102, 182];
            }
            */
            this.jianjie_list.dataProvider = new eui.ArrayCollection(mx.Tools.get_jianjie(c_mn.sex, c_mn.id));
            this.jianjie_scro.height = this.jianjie_h[0];
            this.jianjie_scro.viewport.validateNow();
            var cur_height = this.jianjie_list.measuredHeight ? this.jianjie_list.measuredHeight : this.jianjie_list.height;
            var yy = Math.max(cur_height - this.jianjie_h[0], 0);
            this.jianjie_scro.viewport.scrollV = yy;
        };
        XGSQueen.prototype.init_mn_dg = function () {
            if (this.dg_g.numChildren) {
                return;
            }
            if (mx.Tools.check_drgon()) {
                var armature = this.armature = mx.TweenTool.getInstance().get_dragon("zn54301", 2);
                var cdg = armature.display;
                this.dg_g.addChild(cdg);
                cdg.x = -80;
                cdg.y = -40;
                armature.animation.play();
            }
            else {
                this.dg_g.addChild(new eui.Image("zn54301_png"));
            }
        };
        XGSQueen.prototype.init_hy_dg = function (name) {
            var armature = mx.TweenTool.getInstance().get_dragon(name, 2);
            this.yh_g.addChild(armature.display);
            armature.display.x = 240;
            armature.display.y = mx.Tools.screen_height / 2;
            armature.display.scaleX = armature.display.scaleY = 0.8;
            armature.animation.timeScale = 1;
            armature.display.visible = name == "nanhu";
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.huyao_loop, this);
            armature.animation.play("zding", 0);
            name == "nanhu" ? this.huyao_nan = armature : this.huyao_nv = armature;
        };
        XGSQueen.prototype.change_huyao = function (name) {
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            //烟雾
            var ef = new mx.GeneralEffect("yhywu");
            ef.play_by_times(1); //只播放一次
            ef.horizontalCenter = 0;
            ef.verticalCenter = 300;
            this.yh_g.addChild(ef);
            //转为狐妖女
            if (name == "nvhu") {
                this.event = "xshi_over";
                this.huyao_nan.animation.play("xshi", 1);
                this.weiba_event = "xshi_over";
                this.weiba_nan.animation.play("xshi", 1);
                this.event = "cxian_over";
                this.huyao_nv.display.visible = true;
                this.huyao_nv.animation.play("cxian", 1);
                this.weiba_event = "cxian_over";
                this.weiba_nv.display.visible = true;
                this.weiba_nv.animation.play("cxian", 1);
            }
            else {
                this.event = "xshi_over";
                this.huyao_nv.animation.play("xshi", 1);
                this.weiba_event = "xshi_over";
                this.weiba_nv.animation.play("xshi", 1);
                this.event = "cxian_over";
                this.huyao_nan.display.visible = true;
                this.huyao_nan.animation.play("cxian", 1);
                this.weiba_event = "cxian_over";
                this.weiba_nan.display.visible = true;
                this.weiba_nan.animation.play("cxian", 1);
            }
            //8s后再次转换 
            this.timeout = egret.setTimeout(this.change_huyao, this, 8000, name == 'nvhu' ? "nanhu" : "nvhu");
            this.huyao_sex = name;
        };
        XGSQueen.prototype.weiba_loop = function (evt) {
            var obj = this.huyao_sex == 'nanhu' ? this.weiba_nan : this.weiba_nv;
            switch (this.weiba_event) {
                case "cxian_over":
                    //出现后转站定
                    obj.animation.play("zding", 0);
                    break;
                case "xshi_over":
                    obj.display.visible = false;
                    obj.animation.play("zding", 0);
                    //obj.animation.stop();
                    break;
            }
            this.weiba_event = "";
        };
        XGSQueen.prototype.huyao_loop = function (evt) {
            var obj = this.huyao_sex == 'nanhu' ? this.huyao_nan : this.huyao_nv;
            switch (this.event) {
                case "cxian_over":
                    //出现后转站定
                    obj.animation.play("zding", 0);
                    break;
                case "xshi_over":
                    obj.display.visible = false;
                    obj.animation.play("zding", 0);
                    // obj.animation.stop();
                    break;
            }
            this.event = "";
        };
        XGSQueen.prototype.weiba_play = function (name, wb) {
            var armature = mx.TweenTool.getInstance().get_dragon(name + wb);
            this.yh_g.addChild(armature.display);
            armature.display.x = 225;
            armature.display.y = mx.Tools.screen_height / 2;
            armature.display.scaleX = armature.display.scaleY = 0.8;
            armature.animation.timeScale = 1;
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.weiba_loop, this);
            armature.animation.play("zding", 0);
            armature.display.visible = false;
            name == "nanhu" ? this.weiba_nan = armature : this.weiba_nv = armature;
            var idx1 = this.yh_g.getChildIndex(name == "nanhu" ? this.huyao_nan.display : this.huyao_nv.display);
            var idx2 = this.yh_g.getChildIndex(name == "nanhu" ? this.weiba_nan.display : this.weiba_nv.display);
            if (idx1 < idx2) {
                this.yh_g.setChildIndex(name == "nanhu" ? this.huyao_nan.display : this.huyao_nv.display, idx2);
                this.yh_g.setChildIndex(name == "nanhu" ? this.weiba_nan.display : this.weiba_nv.display, idx1);
            }
        };
        XGSQueen.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var xproxy = this.proxy;
            var c_mn = this.c_mn;
            switch (e.item.bg) {
                case "zfeng_png"://追封（只有一次机会）
                    if (c_mn.weifen == 0) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HOUGONG_WEIFEN,
                            "mid": c_mn.mid
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.XGSShiHaoPop.S_NAME,
                            "param": {
                                "id": c_mn.id,
                                "name": c_mn.name,
                                "meili": c_mn.meili,
                                "type": xproxy.cur_xgs_type ? 1 : 0 //0:妃子、1:子女
                            }
                        });
                    }
                    break;
                case "yzfeng_png":
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.xgs09, mx.Lang.fz) });
                    break;
                case "gsfpznv_png"://子女
                    if (Number(c_mn.haizi) == 0) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.xgs18, c_mn.name) });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_YXD_CHILDREN,
                            "zinv_id": c_mn.mid - 1000,
                        });
                    }
                    break;
                case "hhun_png"://还魂，待定
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs11 });
                    break;
            }
        };
        XGSQueen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var c_mn = this.c_mn;
            switch (e.currentTarget) {
                case this.zongzu_t://跳转到其他用户界面，需要先发送请求
                    if (c_mn.zongzu_id) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": c_mn.zongzu_id,
                        });
                    }
                    break;
                case this.back_b://只能返回妃嫔谥号
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSAllQueen.S_NAME);
                    break;
                case this.showall_b:
                    var height = void 0;
                    var yy = void 0;
                    if (e.currentTarget.scaleY == 1) {
                        height = this.jianjie_h[0];
                        e.currentTarget.scaleY = -1;
                        yy = Math.max(this.jianjie_list.measuredHeight - height, 0);
                    }
                    else {
                        height = this.jianjie_h[1];
                        e.currentTarget.scaleY = 1;
                        yy = 0;
                    }
                    this.jianjie_scro.height = height;
                    this.jianjie_scro.validateNow();
                    egret.Tween.get(this.jianjie_scro.viewport).to({ "scrollV": yy }, 300);
                    break;
                case this.ef_g:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HzsZNSkillView.S_NAME,
                        "param": this.c_mn
                    });
                    break;
            }
        };
        XGSQueen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            this.zongzu_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.showall_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xt_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xt_click, this);
            this.jianjie_list.dataProvider = null;
            this.fzcz_list.dataProvider = null;
            this.fzcz_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            dragonBones.WorldClock.clock.clear();
            this.huyao_nan = null;
            this.huyao_nv = null;
            this.weiba_nan = null;
            this.weiba_nv = null;
            egret.Tween.removeTweens(this.jianjie_scro.viewport);
            mx.ApplicationFacade.getInstance().removeMediator(mx.XGSQueenMediator.NAME);
        };
        XGSQueen.prototype.set_xuetong = function () {
            var info = mx.Tools.get_xuetong_info(this.c_mn);
            this.daishu = info.daishu;
            this.wenhua = info.wenhua;
            this.xt_t.textFlow = [{ "text": mx.Lang.fzxt + "：" }, { "text": info.str, "style": { "underline": true } }];
        };
        XGSQueen.prototype.xt_click = function (e) {
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
        XGSQueen.S_NAME = "XGSQueen";
        return XGSQueen;
    }(mx.BasicView));
    mx.XGSQueen = XGSQueen;
    __reflect(XGSQueen.prototype, "mx.XGSQueen");
})(mx || (mx = {}));
//# sourceMappingURL=XGSQueen.js.map