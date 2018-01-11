/**
*   @author mx
*   @date 2015.2.25
*   @desc 系统数据管理，分担gameproxy 压力
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
    var SystemProxy = (function (_super) {
        __extends(SystemProxy, _super);
        function SystemProxy() {
            return _super.call(this, SystemProxy.NAME) || this;
        }
        SystemProxy.prototype.get_pre_api = function (data) {
            var arr = [];
            var cd = data.param;
            switch (data.name) {
                case mx.AVGView.S_NAME:
                    var type = cd.type;
                    switch (type) {
                        case "shiqin"://用于养心殿侍寝，探望子女。
                            if (cd.shicong) {
                                arr = ["api.HERODIALOG"];
                            }
                            arr.push("api.AVGJUQING"); //新怀孕剧情
                            if (cd.gongdou) {
                                arr.push("api.GDSHJ");
                            }
                            if (cd.guitai == 0) {
                                arr.push("api.AVGSELECT");
                            }
                            if (cd.skill) {
                                arr.push("api.ZINVSKILL");
                                arr.push("api.AVGSELECT");
                            }
                            var whq = Number(cd.key1);
                            if (cd.key != "1") {
                                arr.push("api.WHQ0");
                            }
                            else if (whq > 1 && whq < 5) {
                                arr.push("api.WHQ2");
                            }
                            else {
                                arr.push("api.WHQ" + whq);
                            }
                            break;
                        case "lg"://冷宫
                            arr.push("api.WHQ0"); //OK
                            break;
                        case "zinv":
                            arr.push("api.ZINVDIALOG"); //OK
                            break;
                        case "task"://主线任务剧情，可能会修改
                            arr.push("api.TASKJQ"); //？？
                            break;
                        case "tjjq":
                            arr.push("assets.tujian_jqwj");
                            arr.push("api.TASKJQ"); //？？
                            break;
                        case "lianai"://美男约会
                            arr.push("api.LOVEJQ"); //缺部分美男剧情
                            break;
                        case "guide"://引导剧情
                            arr.push("api.GUIDEJQ");
                            break;
                        case "temple"://太庙剧情
                            if (cd.cd <= 6) {
                                arr.push("api.TMHZ");
                            }
                            break;
                        case "temple_shuoming"://太庙说明
                            arr.push("api.TAIMIAOSHUOMING");
                            break;
                        case "fuben":
                            arr.push("api.TASKJQ");
                            break;
                        case "nanchan":
                            arr.push("api.GONGDOUJUQING");
                            break;
                        case "jfs":
                        case "jfs_over":
                            arr.push("api.JFSDIALOG");
                            break;
                        case "jfs_ss":
                            arr.push("api.JFSJUQING");
                            break;
                        case "tiaoxi"://调戏
                            arr.push("api.TIAOXIJQYH");
                            break;
                        case "scdj"://赏赐道具
                            arr = ["api.EQUIP", "api.AVGJUQING"];
                            break;
                        case "wbsj":
                            arr = ["api.WBSHARESJ", "api.AVGJUQING"];
                            break;
                        case "dxcg": //殿选成功
                        case "fxsb"://殿选失败
                            arr = ["api.AVGJUQING", "api.SLGXXIU"];
                            break;
                        case "zhandou_before":
                        case "zhandou_after":
                            arr.push("api.ZHANDOUJUQING");
                            break;
                        default:
                            arr.push("api.AVGJUQING");
                            break;
                    }
                    break;
            }
            return arr;
        };
        SystemProxy.prototype.get_dyn_arr = function (data) {
            var arr = [];
            var c_d = data.param;
            var cname = data.name;
            switch (cname) {
                case mx.AVGView.S_NAME:
                    var avgProxy = this.facade.retrieveProxy(mx.AVGProxy.NAME);
                    arr = avgProxy.get_dyn_arr(data);
                    break;
                case mx.SelectFZView.S_NAME:
                    var xqinProxy = this.facade.retrieveProxy(mx.XqinProxy.NAME);
                    arr = xqinProxy.get_dyn_arr(data);
                    break;
                case mx.FBTZhanAlert.S_NAME:
                    var fubenProxy = this.facade.retrieveProxy(mx.FubenProxy.NAME);
                    arr = fubenProxy.get_dyn_arr(data);
                    break;
                case mx.FightView.S_NAME:
                    arr = this.get_fight_arr(data);
                    break;
                case mx.XXiuAlert.S_NAME://选秀
                    switch (c_d.type) {
                        case "ppjz":
                            arr.push("xx_ppjz");
                            break;
                        case "gsws"://国士无双
                            arr.push("xx_gsws");
                            var time = mx.AppConfig.get_day_mode(true);
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PICKVIP, "id", time);
                            arr.push(mx.Tools.get_mn_res(api.hero, "lh"));
                            for (var i = 1; i < 4; i++) {
                                var sid = api["soul" + i];
                                var hapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "equip_id", sid);
                                arr.push(mx.Tools.get_mn_res(hapi.id, "lh"));
                            }
                            break;
                        case "flcj":
                            arr.push("xx_flmn");
                            break;
                    }
                    break;
                case mx.MainScreen.S_NAME://根据VIP不同，进行显示
                    var gproxy3 = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    arr.push("tx78_" + gproxy3.user_avatar + "_png");
                    /*let need_bg = AppConfig.check_open_acty();
                    if (need_bg) {
                        arr.push(need_bg);
                    }
                    let cproxy = <ClothesProxy><any>(this.facade.retrieveProxy(ClothesProxy.NAME));
                    cproxy.set_xxbjkid(cproxy.dressed);
                    //背景卡
                    /*let bid = cproxy.bjkid || 2009;
                    arr.push("bjk" + bid + "_jpg");
                    if (RES.hasRes("bjk" + bid + "_f_jpg")) {//前景
                        arr.push("bjk" + bid + "_f_jpg");
                    }*/
                    break;
                case mx.XXiuScreen.S_NAME://根据VIP不同，进行显示
                    var gproxy2 = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    if (gproxy2.user_vip >= 11) {
                        arr.push("xx_xxiu3");
                    }
                    else {
                        arr.push("xx_xxiu2");
                    }
                    break;
                case mx.JingChengScreen.S_NAME://时间变化
                    var time_mode = mx.AppConfig.get_time_mode(true);
                    if (time_mode == mx.MX_COMMON.TIME_DAY) {
                        arr.push("jc_day");
                    }
                    else {
                        arr.push("jc_night");
                    }
                    break;
                case mx.PalaceScreen.S_NAME://时间变化
                    var time_mode2 = mx.AppConfig.get_time_mode(true);
                    if (time_mode2 == mx.MX_COMMON.TIME_DAY) {
                        arr.push("pa_day");
                        arr.push("pa_limu");
                    }
                    else {
                        arr.push("pa_night");
                        arr.push("pa_nlimu");
                    }
                    break;
                case mx.YXDianScreen.S_NAME://养心殿-可能包含调戏资源
                    var wproxy = (this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                    if (wproxy.isTx) {
                        arr.push("tiaoxi");
                        arr.push("tiaoxi_ani");
                    }
                    break;
                case mx.YXDFzScreen.S_NAME: //养心殿预加载妃子资源，尤其是龙骨。
                case mx.XGSQueen.S_NAME:
                    var c_mn = void 0;
                    var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    var xproxy = (this.facade.retrieveProxy(mx.XGSProxy.NAME));
                    if (lproxy.isLD) {
                        c_mn = lproxy.cur_mn;
                    }
                    else if (xproxy.cur_id > 0) {
                        c_mn = xproxy.get_object();
                    }
                    else {
                        var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                        c_mn = pproxy.get_curr_mn();
                    }
                    var mid = Number(c_mn.mid);
                    if (mid > 1000 || (mid == 308 && c_mn.huapi != '')) {
                        arr.push(mx.Tools.get_zn_res(c_mn.avatar, "lh"));
                        arr.push(mx.Tools.get_bb_res("fzbg", 2, c_mn.avatar));
                    }
                    else if (mid < 303) {
                        arr.push(mx.Tools.get_mn_res(mid, "lh"));
                    }
                    else if (mid < 304) {
                        arr.push("zn54301_d");
                        arr.push("s1538_jpg");
                        arr.push("zn54301_png");
                    }
                    else if (mid < 308) {
                        arr.push("a10307_png");
                        arr.push("a9307_png");
                        arr.push("shenle_nan");
                        arr.push("shenle_nv");
                        var wb = [1, 3, 6, 9];
                        var wbkey = wb[mid - 304];
                        arr.push("slnan_" + wbkey);
                        arr.push("slnv_" + wbkey);
                    }
                    arr.push("s1608_jpg");
                    break;
                case mx.HzHudongScreen.S_NAME: //随机背景图
                case mx.CXGongFzScreen.S_NAME://随机背景图
                    var pProxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    if (pProxy.hzhd_bg != "") {
                        arr.push(pProxy.hzhd_bg);
                    }
                    break;
                case mx.OtherScreen.S_NAME://通用提示弹窗
                    arr.push("s1607_jpg");
                    break;
                case mx.TaskView.S_NAME://主线任务
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    arr.push("taskmain");
                    var temp_arr = [1, 2, 3, 10, 11, 12, 13, 40, 200];
                    var lb_arr = ["", "nhdj", "zhscong", "schpo", "nhzt", "sji", "schpo", "tssc", "task_bg13"];
                    var tx_arr = ["", "fyt", "lyt", "", "fyt", "", "", "", "task_tx4"];
                    var title_arr = ["zxjqing", "nhdjbqian", "zhscbqian", "dhscbqian", "nhztu", "sjrwubqian", "schpbqian", "scjjbqian", "tmkhbqian"];
                    var main_task_info = gproxy.main_task_info;
                    var info = void 0;
                    var p1 = void 0, p2 = void 0, p3 = void 0;
                    for (var k in main_task_info) {
                        info = main_task_info[k];
                        var c_api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", info.task_id);
                        var index = temp_arr.indexOf(Number(c_api.step2_type));
                        p1 = title_arr[index] + "_png";
                        if (index > 0) {
                            p2 = tx_arr[index] != "" ? tx_arr[index] + "_png" : "";
                            p3 = lb_arr[index] + "_png";
                        }
                        else {
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", c_api.id);
                            p2 = api.icon + "_png";
                            p3 = api.tupian + "_png";
                        }
                        if (p1 != "" && arr.indexOf(p1) < 0) {
                            arr.push(p1);
                        }
                        if (p2 != "" && arr.indexOf(p2) < 0) {
                            arr.push(p2);
                        }
                        if (p3 != "" && arr.indexOf(p3) < 0) {
                            arr.push(p3);
                        }
                    }
                    arr.push("taskday");
                    var info2 = gproxy.day_task_info; //每日任务信息
                    var p12 = void 0, p22 = void 0;
                    for (var k in info2) {
                        var c_d_1 = info2[k];
                        if (c_d_1.lq == 1 && Number(c_d_1.id) != 4) {
                            continue;
                        }
                        p12 = "dtbq" + c_d_1.id + "_png";
                        p22 = c_d_1.id < 4 ? "dtdb1_png" : "dtdb" + c_d_1.id + "_png";
                        if (p12 != "" && arr.indexOf(p12) < 0) {
                            arr.push(p12);
                        }
                        if (p22 != "" && arr.indexOf(p22) < 0) {
                            arr.push(p22);
                        }
                    }
                    break;
                case mx.XXiuHeroAlert.S_NAME:
                    arr.push(mx.Tools.get_mn_res(c_d.id, "lh"));
                    break;
                case mx.FightBuzhenView.S_NAME:
                    //英雄q版
                    var hproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
                    var cz_team = mx.FightTools.arr_clone(c_d.team);
                    for (var i in cz_team) {
                        var hero = hproxy.get_chero_info(cz_team[i]);
                        var role_id = mx.Tools.get_mn_res(hero.mid, "role");
                        arr.push(role_id + "_tex_json");
                        arr.push(role_id + "_tex_png");
                        arr.push(role_id + "_ske_json");
                    }
                    break;
            }
            if (RES.hasRes(cname + "Skin_exml")) {
                arr.push(cname + "Skin_exml");
            }
            return arr;
        };
        SystemProxy.prototype.get_fight_arr = function (obj) {
            //动态创建资源组
            var arr = [];
            var param = obj.param.hero_data;
            var process = obj.param.process;
            var wave = process || 1;
            for (var i_1 = 1; i_1 <= wave; ++i_1) {
                this.arr_push_res(arr, "ruchang" + i_1);
            }
            //加载资源
            for (var key in param) {
                if (Number(key) == 2 && process > 0) {
                    for (var j in param[key]) {
                        for (var i_2 in param[key][j]) {
                            if (i_2 == 'zhanwei' || i_2 == 'undefined') {
                                continue;
                            }
                            var h_data_1 = param[key][j][i_2];
                            var mid = h_data_1.dragon_id;
                            //英雄立绘
                            this.arr_push_res(arr, mx.Tools.get_mn_res(mid, "lh"));
                            this.arr_push_res(arr, mx.Tools.get_mn_res(mid, "dh"));
                            //英雄q版
                            var role_id = mx.Tools.get_mn_res(mid, "role");
                            this.arr_push_res(arr, role_id + "_tex");
                            this.arr_push_res(arr, role_id + "_ske");
                            //英雄大招
                            this.arr_push_res(arr, "ss" + mid);
                            this.arr_push_res(arr, "eff_ult_" + (Number(mid) > 9 ? mid : ("0" + mid)));
                            this.arr_push_res(arr, "eff_pg_" + (Number(mid) > 9 ? mid : ("0" + mid)));
                            this.arr_push_res(arr, mx.Tools.get_mn_res(mid, "bigsound"));
                            //技能动画、buff特效
                            for (var n in h_data_1.skill_list) {
                                var skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWWX, 'id', h_data_1.skill_list[n].skill_id);
                                if (skill_info) {
                                    //buff特效
                                    var buff_arr = (skill_info.buffid + "").split("|");
                                    for (var i_3 in buff_arr) {
                                        if (Number(buff_arr[i_3])) {
                                            var buff_info = mx.ApiTool.getAPINode(mx.MX_APINAME.BUFFNEWWX, 'id', buff_arr[i_3]);
                                            if (buff_info) {
                                                this.get_skill_res("icon", buff_info, arr);
                                                this.get_skill_res("effect", buff_info, arr);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (var i in param[key]) {
                        if (i == 'zhanwei' || i == 'undefined') {
                            continue;
                        }
                        var h_data = param[key][i];
                        var mid = h_data.dragon_id;
                        //英雄立绘
                        this.arr_push_res(arr, mx.Tools.get_mn_res(mid, "lh"));
                        this.arr_push_res(arr, mx.Tools.get_mn_res(mid, "dh"));
                        //英雄q版
                        var role_id = mx.Tools.get_mn_res(mid, "role");
                        this.arr_push_res(arr, role_id + "_tex");
                        this.arr_push_res(arr, role_id + "_ske");
                        //英雄大招
                        this.arr_push_res(arr, "ss" + mid);
                        this.arr_push_res(arr, "eff_ult_" + (Number(mid) > 9 ? mid : ("0" + mid)));
                        this.arr_push_res(arr, "eff_pg_" + (Number(mid) > 9 ? mid : ("0" + mid)));
                        this.arr_push_res(arr, mx.Tools.get_mn_res(mid, "bigsound"));
                        //技能动画、buff特效
                        for (var n in h_data.skill_list) {
                            var skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.SKILLNEWWX, 'id', h_data.skill_list[n].skill_id);
                            //击中特效 单个
                            if (skill_info) {
                                //buff特效
                                var buff_arr = (skill_info.buffid + "").split("|");
                                for (var i_4 in buff_arr) {
                                    if (Number(buff_arr[i_4])) {
                                        var buff_info = mx.ApiTool.getAPINode(mx.MX_APINAME.BUFFNEWWX, 'id', buff_arr[i_4]);
                                        if (buff_info) {
                                            this.get_skill_res("icon", buff_info, arr);
                                            this.get_skill_res("effect", buff_info, arr);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //其余资源
            var other_arr = ["bloodbar_png", "blooddchen_png", "ruchang", "ss0_png", "big_launch", "enermy_atk", "enermy_big_ready", "my_atk", "my_big_ready", "my_hit", "skill_impact", "jzatk_sound", "jzskill_sound", "ycatk_sound", "ycskill_sound"];
            for (var j in other_arr) {
                this.arr_push_res(arr, other_arr[j]);
            }
            var fProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            var yindao = fProxy.yindao_fight;
            if (yindao) {
                var yd_arr;
                if (yindao == 1) {
                    yd_arr = ["fguide"];
                }
                else {
                    yd_arr = ["ldzd_png"];
                }
            }
            for (var j in yd_arr) {
                this.arr_push_res(arr, yd_arr[j]);
            }
            return arr;
        };
        SystemProxy.prototype.get_skill_res = function (ziduan, info, arr) {
            if (info) {
                if (info[ziduan] != "") {
                    var str = info[ziduan].split(".");
                    this.arr_push_res(arr, str[0]);
                }
            }
        };
        SystemProxy.prototype.arr_push_res = function (arr, res) {
            var png = res + "_png";
            if (RES.hasRes(png) && arr.indexOf(png) == -1) {
                arr.push(png);
            }
            var jpg = res + "_jpg";
            if (RES.hasRes(jpg) && arr.indexOf(jpg) == -1) {
                arr.push(jpg);
            }
            var json = res + "_json";
            if (RES.hasRes(json) && arr.indexOf(json) == -1) {
                arr.push(json);
            }
            var sound = res + "_mp3";
            if (RES.hasRes(sound) && arr.indexOf(sound) == -1) {
                arr.push(sound);
            }
            if (res == "fguide") {
                arr.push(res);
            }
        };
        SystemProxy.NAME = "SystemProxy";
        return SystemProxy;
    }(puremvc.Proxy));
    mx.SystemProxy = SystemProxy;
    __reflect(SystemProxy.prototype, "mx.SystemProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=SystemProxy.js.map