/**
 *   @author wf
 *   @date 2016.12.20
 *   @desc 封印解除render
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
    var FYJCTaskRender = (function (_super) {
        __extends(FYJCTaskRender, _super);
        function FYJCTaskRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FYJCTaskRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.award_list.dataProvider = null;
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        FYJCTaskRender.prototype.init_render = function () {
            this.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        FYJCTaskRender.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            //未领取 跳转
            var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
            var groxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var c_xlv = groxy.user_xlv;
            var obj;
            if (view.get_b.res_name == "jfqwang_png") {
                var net = [];
                switch (Number(cd.type)) {
                    case 1:
                    case 2:
                    case 3:
                        var c_d = void 0;
                        var chapterid = 1;
                        if (Number(cd.type) > 1) {
                            var temp = cd.canshu.split("|");
                            var stage_id = temp[1];
                            fproxy.set_jump(true);
                            fproxy.set_pop_jump(true);
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", stage_id);
                            chapterid = api.chapterid;
                            fproxy.cur_chapter = chapterid;
                            fproxy.cur_stage = stage_id;
                        }
                        else {
                            fproxy.set_jump(false);
                            fproxy.set_pop_jump(false);
                            fproxy.cur_chapter = 1;
                            fproxy.cur_stage = 0;
                        }
                        var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
                        var lv = gproxy.user_lv;
                        if (lv <= 10 && Number(cd.type) == 3) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.fb032, 11) });
                            return;
                        }
                        mx.JuqingScreen.P_NAME = mx.YHJSScreen.S_NAME;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JUQING_INFO,
                            'chapter': chapterid
                        });
                        // facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                        //     "sname": FubenScreen.S_NAME,
                        //     "param": { "net": obj }
                        // });
                        break;
                    case 4:
                    case 5://侍从
                        net = [{
                                "t": mx.MX_NETS.CS_INIT_SKILL
                            }, {
                                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                "type": "1|2|3|4|5|6"
                            }];
                        mx.TeamScreen.P_NAME = mx.YHJSScreen.S_NAME;
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.TeamScreen.S_NAME,
                            "param": { "net": net }
                        });
                        break;
                    case 6://皇宫
                        net = [{
                                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                "type": "11",
                            }];
                        mx.PalaceScreen.P_NAME = mx.YHJSScreen.S_NAME;
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.PalaceScreen.S_NAME,
                            "param": { "net": net }
                        });
                        break;
                    case 7://皇子所
                        net = [{
                                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                "type": "11"
                            }];
                        mx.HZSuoScreen.P_NAME = mx.YHJSScreen.S_NAME;
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.HZSuoScreen.S_NAME,
                            "param": { "net": net }
                        });
                        break;
                    case 8://教坊司
                        if (c_xlv) {
                            var wproxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                            wproxy.jfs_tab = 0;
                            net = [{
                                    "t": mx.MX_NETS.CS_JIAOFANGSI_DATA
                                }, {
                                    "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                    "type": "11",
                                }];
                            mx.JFSSYScreen.P_NAME = mx.YHJSScreen.S_NAME;
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                                "sname": mx.JFSSYScreen.S_NAME,
                                "param": { "net": net }
                            });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kq000 });
                        }
                        break;
                    case 9://调戏
                        /*
                        net = [{
                            "t": MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11"
                        }];
                        TiaoXiScreen.P_NAME = YHJSScreen.S_NAME;
                        facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                            "sname" : FriendScreen.S_NAME,
                            "param" : {"net" : net}
                        });
                        */
                        mx.FriendScreen.P_NAME = mx.YHJSScreen.S_NAME;
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.FriendScreen.S_NAME);
                        break;
                    case 12:
                    case 13://掠夺
                        if (c_xlv > 3) {
                            net = [{
                                    "t": mx.MX_NETS.CS_LUEDUO_MINE
                                }, {
                                    "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                    "type": "11"
                                }];
                            mx.LDMainScreen.P_NAME = mx.YHJSScreen.S_NAME;
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                                "sname": mx.LDMainScreen.S_NAME,
                                "param": { "net": net }
                            });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kq001 });
                        }
                        break;
                    case 10:
                    case 11://竞技场
                        // let c_lv = groxy.user_lv;
                        // if (c_lv >= 10) {//跳竞技场
                        //     let jproxy: JingJiProxy = <JingJiProxy><any>facade.retrieveProxy(JingJiProxy.NAME);
                        //     jproxy.jj_flag = true;
                        //     net = [{
                        //         "t": MX_NETS.CS_QUEUE_INFO,
                        //         "team_id": 11
                        //     }, {
                        //         "t": MX_NETS.CS_PACK_TYPE_ITEM,
                        //         "type": "11",
                        //     }];
                        //     JJCMainScreen.P_NAME = YHJSScreen.S_NAME;
                        //     facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                        //         "sname": JJCMainScreen.S_NAME,
                        //         "param": { "net": net }
                        //     });
                        // } else {//10级开启竞技场
                        //     let str = Tools.format(Lang.p0110, 10, Lang.jjc);
                        //     facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": str });
                        // }
                        break;
                }
            }
            else if (view.get_b.res_name == "jfklqu_png") {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_HUYAO_DAY_AWARD,
                    "act_id": cd.id,
                });
            }
            else if (view.get_b.res_name == "jfydcheng_png") {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0014 });
            }
        };
        Object.defineProperty(FYJCTaskRender.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ActyProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        FYJCTaskRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            var view = this;
            var info = mx.ApiTool.getAPINode(mx.MX_APINAME.ACTHUYAO, "id", cd.type);
            //要求
            cd.canshu = cd.canshu.toString();
            var canshu = cd.canshu.split('|');
            var need = 0;
            var have = 0;
            var need_num = canshu[0];
            if (canshu.length == 1) {
                need = canshu[0];
                view.sming_t.text = mx.Tools.format(info.sm, canshu[0]);
                have = this.proxy.fy_data[info.id];
            }
            else if (canshu.length == 2) {
                var param1 = canshu[0];
                var param2 = "";
                var param3 = void 0;
                need = canshu[1];
                have = this.proxy.fy_data[info.id][cd.id];
                var facade = mx.ApplicationFacade.getInstance();
                switch (Number(cd.type)) {
                    case 2:
                    case 3:
                        var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                        param2 = "" + fproxy.get_stageOrder_by_stageID(need);
                        var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", need);
                        param3 = stage.StageName;
                        need_num = 1;
                        break;
                    case 4:
                        param2 = mx.Lang.j0025[need - 1];
                        break;
                    case 6:
                        var jinji = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", need);
                        param2 = jinji.weifenb + '/' + jinji.weifeng;
                        break;
                    case 7:
                        var fengjue = mx.ApiTool.getAPINodes(mx.MX_APINAME.FENGJUE, "meili", need);
                        param1 = fengjue[0].juewei + '/' + fengjue[1].juewei;
                        param2 = canshu[0];
                        break;
                    default:
                        param2 = canshu[1];
                        break;
                }
                if (param3) {
                    view.sming_t.text = mx.Tools.format(info.sm, param1, param2, param3);
                }
                else {
                    view.sming_t.text = mx.Tools.format(info.sm, param1, param2);
                }
            }
            if (have == null) {
                have = 0;
            }
            //完成数
            view.have_t.text = have + "/" + need_num;
            have = Number(have);
            view.sm_bg.width = Math.max(108, view.sming_t.textWidth + 30);
            //物品奖励
            var awards = cd.awards.split('|');
            var arr = [];
            for (var i in awards) {
                var obj = awards[i].split('*');
                arr.push({
                    "type": (obj[0].split(':'))[0],
                    "id": (obj[0].split(':'))[1],
                    "num": obj[1],
                    "di": true,
                    "chicun": 90
                });
            }
            view.award_list.itemRenderer = mx.GenTipRender;
            view.award_list.dataProvider = new eui.ArrayCollection(arr);
            view.award_list.validateNow();
            //三个状态 0 未领取 1 可领取 2已领取
            var btn_res = "";
            var lq = 0;
            if (this.proxy.fy_lq.indexOf(cd.id.toString()) > -1) {
                lq = 2;
            }
            else {
                if (Number(cd.type) == 10) {
                    if (have > 0) {
                        lq = have <= need_num ? 1 : 0;
                    }
                    else {
                        lq = 0;
                    }
                }
                else {
                    lq = have >= need_num ? 1 : 0;
                }
            }
            switch (lq) {
                case 0:
                    btn_res = "jfqwang_png";
                    break;
                case 1:
                    btn_res = "jfklqu_png";
                    break;
                case 2:
                    btn_res = "jfydcheng_png";
                    break;
            }
            view.get_b.set_ssres(btn_res);
        };
        return FYJCTaskRender;
    }(mx.BasicRender));
    mx.FYJCTaskRender = FYJCTaskRender;
    __reflect(FYJCTaskRender.prototype, "mx.FYJCTaskRender");
})(mx || (mx = {}));
//# sourceMappingURL=FYJCTaskRender.js.map