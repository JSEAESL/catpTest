/**
 *   @author mx wxw
 *   @date 2014.12.28 2017.11.30
 *   @desc 任务render2
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
    var TaskRender2 = (function (_super) {
        __extends(TaskRender2, _super);
        function TaskRender2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TaskRender2.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.award_list.dataProvider = null;
        };
        TaskRender2.prototype.init_render = function () {
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.award_list.itemRenderer = mx.GNumRender;
            this.dataChanged();
        };
        TaskRender2.prototype.btn_click = function (e) {
            var cd = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            if (cd.type == "day") {
                if (cd.jd == 2) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_DAYTASK_AWARD,
                        "act_id": cd.id,
                    });
                }
                else {
                    this.do_day_task();
                }
            }
            else {
                if (cd.jd == 1) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_MAINTASK_AWARD, "act_id": cd.id,
                    });
                }
                else if (cd.jd == 3) {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_TASK_STORY, "act_id": cd.id,
                    });
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "id": cd.step1_id,
                            "type": "task",
                            "title": cd.name,
                        },
                    });
                }
                else {
                    this.do_main_task();
                }
            }
        };
        TaskRender2.prototype.do_main_task = function () {
            var cd = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            switch (cd.step2_type) {
                case 1: //副本
                case 11: //精英副本
                case 12: //2次普通
                case 13://2次精英
                    var proxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                    var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                    proxy.set_jump(true);
                    proxy.set_pop_jump(true);
                    var info = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, 'id', cd.id);
                    var stage_id = info.finish_parameter.split('|');
                    var cid = stage_id[0];
                    proxy.set_stage_id(cid); //id是这个章节下的第一个stage的stageID
                    gproxy.set_task_id(cd.id); //设置战斗完跳转主场景
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", cid);
                    if (mx.AppConfig.CURR_SCENE_ID == mx.JuqingScreen.S_NAME && Number(api.chapterid) < Number(proxy.juqing_info.max)) {
                        facade.sendNotification(mx.MX_NOTICE.MAINTASK_FUBEN, Number(api.chapterid));
                    }
                    else {
                        proxy.cur_chapter = api.chapterid;
                        proxy.cur_stage = cid;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JUQING_INFO,
                            'chapter': api.chapterid
                        });
                    }
                    break;
                case 2://女王等級无跳转
                    break;
                case 3: //美男收集
                case 40: //美男升品
                case 10://召唤美男
                    var net = [
                        {
                            "t": mx.MX_NETS.CS_INIT_SKILL
                        },
                        {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "1|2|3|4|5|6",
                            "stype": "mnan"
                        }
                    ];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.TeamScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case 200://太庙
                    break;
                case 14:
                default:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    return;
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.TaskView.S_NAME);
        };
        TaskRender2.prototype.do_day_task = function () {
            var cd = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var gProxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var c_xlv = gProxy.user_xlv;
            var net = [];
            switch (Number(cd.id)) {
                case 4://月卡
                    facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                    break;
                case 5: //副本
                case 6://精英副本
                    var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                    Number(cd.id) == 6 ? fproxy.set_stage_type(2) : fproxy.set_stage_type(1);
                    var fProxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                    fProxy.cur_chapter = 1;
                    fProxy.cur_stage = 1;
                    fProxy.set_jump(false);
                    fProxy.set_pop_jump(false);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JUQING_INFO,
                        'chapter': fProxy.cur_chapter
                    });
                    break;
                case 9://领取副本扫荡券
                    facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                    break;
                case 7://技能升级
                    net = [
                        {
                            "t": mx.MX_NETS.CS_INIT_SKILL
                        },
                        {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "1|2|3|4|5|6",
                            "stype": "mnan"
                        }
                    ];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.TeamScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case 8://选秀
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XXiuScreen.S_NAME);
                    break;
                case 13://竞技场
                    var c_lv = gProxy.user_lv;
                    if (c_lv >= 10) {
                        var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
                        jproxy.jj_flag = true;
                        net = [{
                                "t": mx.MX_NETS.CS_QUEUE_INFO,
                                "team_id": 11
                            },
                            {
                                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                "type": "11",
                            }];
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.JJCMainScreen.S_NAME,
                            "param": { "net": net }
                        });
                    }
                    else {
                        var str = mx.Tools.format(mx.Lang.p0110, 10, mx.Lang.jjc);
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                    }
                    break;
                case 15://购买银币
                    facade.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "ybi");
                    break;
                case 21://太庙祭祀
                    break;
                case 22://拜访好友
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.FriendScreen.S_NAME);
                    break;
                case 23: //后宫侍寝
                case 24://省亲
                    net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11",
                        }];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.PalaceScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case 25://掠夺
                    // if (c_xlv > 3) {//天8可以參加掠夺
                    //     net = [{
                    //         "t": MX_NETS.CS_LUEDUO_MINE
                    //     }, {
                    //         "t": MX_NETS.CS_PACK_TYPE_ITEM,
                    //         "type": "11",
                    //     }];
                    //     facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                    //         "sname": LDMainScreen.S_NAME,
                    //         "param": { "net": net }
                    //     });
                    // } else {
                    //     facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": Lang.kq001 });
                    // }
                    break;
                case 26://调戏
                    net = [{
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11",
                        }];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.TiaoXiScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case 27://家族捐献
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_INIT,
                    });
                    break;
                case 11: //东殿
                case 12: //西殿
                case 14: //附魔                
                case 16: //女王的紛爭
                case 17: //佣兵结缘
                case 18: //家族月卡
                case 19: //宫廷温泉
                case 20: //宝藏
                default:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    return;
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.TaskView.S_NAME);
        };
        TaskRender2.prototype.fresh_main = function () {
            var info = this.data;
            var str = "{0" + mx.Lang.t0000 + "0}" + info.describe;
            this.desc_t.textFlow = mx.Tools.setKeywordColor2(str, [0x7bd532]);
            var flow = [];
            var num = 1;
            if (Number(info.step1_id)) {
                flow.push({
                    "text": mx.Lang.t0005 + num + ":" + info.step1
                });
                if (info.jq == 1) {
                    flow.push({
                        "text": mx.Lang.t0003 + "\n", "style": {
                            "textColor": 0x739a54,
                        }
                    });
                }
                else {
                    flow.push({
                        "text": mx.Lang.t0004 + "\n", "style": {
                            "textColor": 0xff4b4b,
                        }
                    });
                }
                num++;
            }
            flow.push({
                "text": mx.Lang.t0005 + num + ":" + info.step2
            });
            this.fun_b.set_ssres("mtljqwang_png");
            switch (Number(info.jd)) {
                case 2://已领取
                    this.fun_b.visible = false;
                case 1://可领取
                    this.fun_b.set_ssres("mtlqjli_png");
                    flow.push({
                        "text": mx.Lang.t0003, "style": {
                            "textColor": 0x739a54,
                        }
                    });
                    break;
                case 0://任务2进行中
                    if (info.num) {
                        var str_1 = " [" + info.num + "/" + info.cond + "]";
                        flow[flow.length - 1].text += str_1;
                    }
                    else {
                        flow.push({
                            "text": mx.Lang.t0004,
                            "style": { "textColor": 0xff4b4b },
                        });
                    }
                    if (info.step2_type == 2) {
                        this.fun_b.visible = false;
                    }
                    break;
                case 3://有剧情且未完成
                    flow[flow.length - 1].style = { "textColor": 0x8c8287, }; //灰色
                    flow.push({
                        "text": mx.Lang.t0004, "style": {
                            "textColor": 0xff4b4b,
                        }
                    });
                    break;
            }
            this.task_t.textFlow = flow;
            var temp_arr = [1, 2, 3, 10, 11, 12, 13, 40, 200];
            var lb_arr = ["", "nhdj", "zhscong", "schpo", "nhzt", "sji", "schpo", "tssc", "task_bg13"];
            var tx_arr = ["", "fyt", "lyt", "", "fyt", "", "", "", "task_tx4"];
            var title_arr = ["zxjqing", "nhdjbqian", "zhscbqian", "dhscbqian", "nhztu", "sjrwubqian", "schpbqian", "scjjbqian", "tmkhbqian"];
            var index = temp_arr.indexOf(Number(info.step2_type));
            this.title_p.source = title_arr[index] + "_png";
            if (index > 0) {
                this.tx_p.source = tx_arr[index] != "" ? tx_arr[index] + "_png" : "";
                this.di_p.source = lb_arr[index] + "_png";
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", info.id);
                this.tx_p.source = api.icon + "_png";
                this.di_p.source = api.tupian + "_png";
            }
        };
        TaskRender2.prototype.fresh_day = function () {
            var info = this.data;
            this.name_p.source = "dtbq" + info.id + "_png";
            this.di_p.source = info.id < 4 ? "dtdb1_png" : "dtdb" + info.id + "_png";
            var str;
            var flow = [];
            flow.push({ "text": info.trace });
            this.yk_g.visible = false;
            switch (info.jd) {
                case 2://完成全部任务-可领取奖励
                    if (info.id == 4) {
                        str = mx.Lang.t0008;
                        var yk_str = mx.Tools.format(mx.Lang.t0009, info.month);
                        this.yk_t.text = yk_str;
                        this.yk_g.visible = true;
                    }
                    else {
                        str = mx.Lang.t0003;
                    }
                    flow.push({
                        "text": str, "style": { "textColor": 0x78995E }
                    });
                    this.fun_b.set_ssres("lqjli_png");
                    break;
                case 1://已领取
                    if (info.id == 4) {
                        str = mx.Tools.format(mx.Lang.t0009, info.month);
                        this.yk_t.text = str;
                        this.fun_b.visible = true;
                        this.yk_g.visible = true;
                        this.fun_b.set_ssres("zyxfei_png");
                    }
                    else {
                        this.fun_b.visible = false;
                        this.yk_g.visible = false;
                    }
                    break;
                case 0: //未达成
                default:
                    if (info.finish_cond) {
                        str = " [" + info.cond + "/" + info.finish_cond + "]";
                    }
                    else {
                        str = mx.Lang.t0004;
                    }
                    flow.push({
                        "text": str, "style": {
                            "textColor": 0xFF0000,
                        }
                    });
                    if (Number(info.id) == 4) {
                        this.fun_b.set_ssres("qwgmai_png");
                    }
                    else {
                        this.fun_b.set_ssres("ljqwang_png");
                    }
                    if (info.id < 4) {
                        this.fun_b.visible = false;
                    }
                    if (info.id < 4 || info.id > 27) {
                        this.fun_b.visible = false;
                    }
                    break;
            }
            this.task_t.textFlow = flow;
        };
        TaskRender2.prototype.dataChanged = function () {
            var info = this.data;
            if (!info || !this.skin) {
                return;
            }
            var tname = info.type == "day" ? info.name : "【" + info.name + "】";
            this.name_t.text = tname;
            this.fun_b.visible = true;
            var arr;
            if (info.type == "main") {
                arr = info.reward;
                this.fresh_main();
            }
            else {
                arr = mx.Tools.MAXLEVEL ? info.maxlevel_reward : info.reward;
                this.fresh_day();
            }
            if (arr == 0) {
                arr = "1:0*12500"; //?????
            }
            arr = arr.split("|");
            var arr2 = [];
            for (var k in arr) {
                var c_d = arr[k].split(":"); //type：id*sl
                var num = c_d[1].split("*");
                var item = mx.Tools.get_item_info(c_d[0], num[0]);
                if (!item) {
                    ////console.log(c_d[0], " : ", num[0]);
                    continue;
                }
                item = null;
                arr2.push({
                    "chicun": 62,
                    "type": c_d[0],
                    "id": num[0],
                    "num": num[1] || 1,
                    "no_num": true,
                    "di_cor": 0x4c416A,
                    "di_size": 21,
                    "top": 73
                });
            }
            this.award_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        return TaskRender2;
    }(mx.BasicRender));
    mx.TaskRender2 = TaskRender2;
    __reflect(TaskRender2.prototype, "mx.TaskRender2");
})(mx || (mx = {}));
//# sourceMappingURL=TaskRender2.js.map