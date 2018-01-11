/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 主页界面Mediator
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
    var HeroTrainMediator = (function (_super) {
        __extends(HeroTrainMediator, _super);
        function HeroTrainMediator(viewComponent) {
            var _this = _super.call(this, HeroTrainMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(HeroTrainMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeroTrainMediator.prototype.onRemove = function () {
            var view = this.view;
            view.ef_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.left_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.right_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            view.a_g.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
            view.fun_list.dataProvider = null;
            view.fun_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.engagementcondition_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.engagement, this);
        };
        HeroTrainMediator.prototype.pre_move = function (evt) {
            this.start_t = egret.getTimer(); //点击起始时间
            this.start_x = evt.stageX; //点击起始位置
            this.pre_x = evt.stageX; //上一次响应的位置
            //点击开始时屏蔽所有点击
            this.view.ef_g.touchEnabled = false; //放大镜
            this.view.back_b.touchEnabled = false; //返回
            this.view.left_b.touchEnabled = false; //向左翻页
            this.view.right_b.touchEnabled = false; //向右翻页
            this.view.fun_list.touchEnabled = false; //底部菜单
            this.view.fun_list.touchChildren = false;
        };
        HeroTrainMediator.prototype.show_move = function (evt) {
            var view = this.view;
            var dis = evt.stageX - this.pre_x;
            view.move_apos(dis);
            this.pre_x = evt.stageX;
        };
        HeroTrainMediator.prototype.check_move = function (evt) {
            var view = this.view;
            var now_t = egret.getTimer();
            var dis = evt.stageX - this.start_x;
            if (Math.abs(dis) < 20) {
                if (now_t - this.start_t < 200) {
                    var zg = new mx.GeneralEffect("aixin");
                    view.g_g.addChild(zg);
                    zg.x = evt.stageX;
                    zg.y = evt.stageY;
                    zg.scaleX = zg.scaleY = 2;
                }
                //点击结束时恢复所有点击
                view.ef_g.touchEnabled = true; //放大镜
                view.back_b.touchEnabled = true; //返回
                view.left_b.touchEnabled = true; //向左翻页
                view.right_b.touchEnabled = true; //向右翻页
                view.fun_list.touchEnabled = true; //底部菜单
                view.fun_list.touchChildren = true;
                view.reset_apos(0); //重置形象位置
            }
            else {
                view.reset_apos(dis);
            }
        };
        HeroTrainMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CHERO,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.ITEM_NUM_CHANGED,
                mx.MX_NOTICE.PACK_ITEMS_BACK,
            ];
        };
        HeroTrainMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var Hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CHERO:
                    this.fresh_hero_info(data);
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.ITEM_NUM_CHANGED:
                    if (data == 2004 && Hproxy.pjcy_flag) {
                        Hproxy.pjcy_flag = false;
                        this.show_use_pjcyd();
                    }
                    break;
                case mx.MX_NOTICE.PACK_ITEMS_BACK:
                    if (data == "pjcy") {
                        Hproxy.pjcy_flag = true;
                        this.show_use_pjcyd();
                    }
                    else if (data == 'scfy') {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.HeroFyinView.S_NAME });
                    }
                    break;
                default:
                    break;
            }
        };
        HeroTrainMediator.prototype.show_guide = function (gkey) {
            var Hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            var c_hero = Hproxy.get_chero_info();
            switch (gkey) {
                case "s_py_zb"://装备
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroZBAlert.S_NAME
                    });
                    break;
                case "v_zb_l1"://打开一个装备                    
                    c_hero.zb_weizhi = 4;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroEquipAlert.S_NAME,
                        "param": { id: 108, etype: 2 }
                    });
                    break;
                case "v_zb_zb"://装备一件装备
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HERO_EQUIP, "id": c_hero.id, "equip": 108
                    });
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HeroEquipAlert.S_NAME);
                    break;
                case "s_py_fh"://返回到团队界面
                    if (mx.MX_COMMON.IN_GUIDE == 1) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.TeamScreen.S_NAME);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    }
                    break;
                case "s_py_yh"://约会或者破镜重圆
                    var tar = this.view.fun_list.getChildAt(4);
                    var item = tar.data;
                    switch (item.bg) {
                        case "la_png"://恋爱
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_HERO_YUEHUIVIEW, "mid": c_hero.mid
                            });
                            break;
                        case "yrhg_png"://已收入后宫
                            break;
                        case "pjcy_png"://破镜重圆
                            var pproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                            pproxy.check_pack_type_item("11", "pjcy");
                            break;
                    }
                    break;
                case "s_py_jn"://技能
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroJNAlert.S_NAME
                    });
                    break;
                case "v_sjie"://侍从升阶
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HERO_UPPZ, "id": c_hero.id
                    });
                    break;
                case "s_py_tp"://突破
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroHPAlert.S_NAME,
                        "param": {
                            "args": c_hero,
                        }
                    });
                    break;
                case "v_tp_ok":
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HeroHPAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_HERO_UPXX, "id": c_hero.id });
                    break;
                case "n_py_fh":
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
            }
        };
        HeroTrainMediator.prototype.fresh_hero_info = function (data) {
            this.view.fresh_view(); //刷新基本信息
            this.view.fresh_list(); //刷新功能列表
            switch (data.type) {
                case "sj"://升级
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                        "type": "mc",
                        "mc": "sjdh2"
                    });
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                        "type": "mc",
                        "mc": "sjdh1"
                    });
                    break;
                case "sjie"://升阶
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HeroZBAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroSPJAlert.S_NAME, "param": data.param
                    });
                    break;
                case "sx":
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HeroHPAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HPLevelUpSucceedPop.S_NAME,
                    });
                    break;
                case "yh":
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.BuyAlertView.S_NAME);
                    break;
            }
        };
        HeroTrainMediator.prototype.init_view = function () {
            var view = this.view;
            view.ef_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.left_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.right_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            view.a_g.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
            view.fun_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.engagementcondition_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.engagement, this);
            if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                this.check_hero_guide();
            }
            else {
                view.guide_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            }
        };
        HeroTrainMediator.prototype.engagement = function (e) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            if (this.view.move_mode) {
                return;
            }
            switch (e.target.label) {
                // case "la_png"://恋爱
                //     let hProxy1 = <HeroProxy><any>(this.facade.retrieveProxy(HeroProxy.NAME));
                //     let cd1: any = hProxy1.get_chero_info();
                //     let api = ApiTool.getAPINode(MX_APINAME.HEROHOUGONG, "id", cd1.mid);
                //     if (api && cd1.mid != 55 && cd1.mid != 56 && cd1.mid != 57) {
                //         this.sendNotification(MX_NOTICE.CS_GET_DATA, {
                //             "t": MX_NETS.CS_HERO_YUEHUIVIEW, "mid": cd1.mid
                //         });
                //         api = null;
                //     } else {
                //         this.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": Lang.h0086 });
                //     }
                //     break;
                // case "yrhg_png"://已收入后宫
                //     break;
                // case "pjcy_png"://破镜重圆
                //     let pproxy = <PackProxy><any>(this.facade.retrieveProxy(PackProxy.NAME));
                //     pproxy.check_pack_type_item("11", "pjcy");
                //     break;
                case "syzshi_png"://首页展示
                    var hProxy1 = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                    var pProxy1 = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var cd1 = hProxy1.get_chero_info();
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_MAIN_LH,
                        "y_id": -cd1.mid,
                    });
                default:
                    break;
            }
        };
        HeroTrainMediator.prototype.check_hero_guide = function () {
            var hProxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            var cd = hProxy.get_chero_info();
            if (mx.MX_COMMON.IN_GUIDE) {
                var gproxy = this.facade.retrieveProxy(mx.GuideProxy.NAME);
                if (gproxy.check_guide_key("m_yh")) {
                    if (Number(cd.mid) != 1 || Number(cd.la) != 0) {
                        this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                        return;
                    }
                }
                this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            else {
                if (Number(cd.mid) == 1 && Number(cd.la) == 0) {
                    this.sendNotification(mx.MX_NOTICE.COMP_GUIDE, { "yd_id": 100 });
                    this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        "gkey": "m_yh", "touch": "s_mr_hl1", "skip": true
                    });
                }
            }
        };
        HeroTrainMediator.prototype.mx_test = function (event) {
            this.view.guide_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.check_hero_guide();
        };
        HeroTrainMediator.prototype.onTabChange = function (e) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            if (this.view.move_mode) {
                return;
            }
            switch (e.item.bg) {
                case "sj_png"://升級
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroSJAlert.S_NAME
                    });
                    break;
                case "zb_png"://装备
                    // this.sendNotification(MX_NOTICE.POP_VIEW, {
                    //     "name": HeroZBAlert.S_NAME
                    // });
                    break;
                case "jn_png"://技能
                    var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    if (gProxy.user_lv >= 7) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.HeroJNAlert.S_NAME
                        });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0022 });
                    }
                    break;
                case "hp_png"://魂魄升星
                    var hProxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                    var cd = hProxy.get_chero_info();
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroHPAlert.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": { "t": mx.MX_NETS.CS_HERO_UPXX, "id": cd.id },
                            "args": cd,
                        }
                    });
                    break;
                case "la_png"://恋爱
                    var hProxy1 = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                    var cd1 = hProxy1.get_chero_info();
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", cd1.mid);
                    if (api && cd1.mid != 55 && cd1.mid != 56 && cd1.mid != 57) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HERO_YUEHUIVIEW, "mid": cd1.mid
                        });
                        api = null;
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0086 });
                    }
                    break;
                case "yrhg_png"://已收入后宫
                    break;
                case "pjcy_png"://破镜重圆
                    var pproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pproxy.check_pack_type_item("11", "pjcy");
                    break;
                case "fyzhli_png"://封印之力
                    // let paroxy = <PackProxy><any>(this.facade.retrieveProxy(PackProxy.NAME));
                    // paroxy.check_pack_type_item("1|2|3|5|6|9|10", "scfy");
                    break;
                case "jzzyan_png"://九字真言
                    // this.sendNotification(MX_NOTICE.POP_VIEW, {
                    //     "name": TeamZhenYanAlert.S_NAME
                    // });
                    break;
                default:
                    break;
            }
        };
        HeroTrainMediator.prototype.show_use_pjcyd = function () {
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            var c_num = pProxy.get_item_num(2004);
            if (c_num) {
                var hProxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                var cd = hProxy.get_chero_info();
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_USE_PJCYD, "mid": cd.mid },
                        "param": mx.Tools.format(mx.Lang.h0066, c_num),
                    }
                });
            }
            else {
                var p_d = {
                    "name": mx.BuyAlertView.S_NAME,
                    "param": { "param": { "item": 2004 } }
                };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
        };
        HeroTrainMediator.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this.view;
            if (view.move_mode) {
                return;
            }
            switch (evt.currentTarget) {
                case view.back_b:
                    var aproxy = (this.facade.retrieveProxy(mx.ActyProxy.NAME));
                    if (aproxy.yaohu_tiaozhuan) {
                        aproxy.yaohu_tiaozhuan = false;
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.YHJSScreen.S_NAME);
                        return;
                    }
                    var cs = mx.HeroTrainScreen.P_NAME;
                    if (cs) {
                        mx.HeroTrainScreen.P_NAME = null;
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, cs);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.TeamScreen.S_NAME);
                    }
                    break;
                case view.ef_g:
                    var hProxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                    var cd = hProxy.get_chero_info();
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroInfoView.S_NAME,
                        "param": {
                            "hero": cd,
                            "type": 'haveget',
                            "need": 0,
                            "now": 0,
                            "coin": 0,
                            "shuxing": true
                        },
                    });
                    break;
                case view.left_b:
                    view.reset_apos(1);
                    break;
                case view.right_b:
                    view.reset_apos(-1);
                    break;
            }
        };
        HeroTrainMediator.NAME = "HeroTrainMediator";
        return HeroTrainMediator;
    }(puremvc.Mediator));
    mx.HeroTrainMediator = HeroTrainMediator;
    __reflect(HeroTrainMediator.prototype, "mx.HeroTrainMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroTrainMediator.js.map