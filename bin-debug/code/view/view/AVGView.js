/**
 *   @author mx
 *   @date 2015.1.3
 *   @desc 简易AVG
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
    mx.MX_AVG_CONST = {
        "AVG_T_GDSJ": "avg_gdsj",
        "AVG_T_JYSJ": "avg_jysj",
        "AVG_T_FRESH_GD": "avg_fgd",
        "AVG_T_NH_JFS": "avg_jfs",
        "AVG_T_GZ": "avg_gz",
        "AVG_T_CHECHA": "avg_checha",
    };
    var AVGView = (function (_super) {
        __extends(AVGView, _super);
        function AVGView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_step = 0;
            return _this;
        }
        AVGView.mx_support = function () {
            return ["assets.avg", "api.SOUND"];
        };
        AVGView.prototype.init_view_by_type = function () {
            var view = this;
            view.exit_b.set_ssres("back_png"); //返回
            view.ok_b.set_ssres("ydtguo_png"); //跳过
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.AVGMediator(this));
            view.opt_g.visible = false;
            view.txi_b.visible = false;
            view.con_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_next, this);
            view.txi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.txi_click, this);
            view.music_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play_music, this);
            view.opt_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.opt_click, this);
            if (mx.MX_COMMON.IN_GUIDE) {
                view.exit_b.visible = false;
            }
            var yy = mx.Tools.screen_height - 120;
            view.next_p.y = yy;
            mx.TweenTool.getInstance().get_tween(view.next_p, "next_talk", true);
            var aproxy = (facade.retrieveProxy(mx.AVGProxy.NAME));
            view.jqs = aproxy.avg_jqs;
            this.no_skip = false;
            this.skipToOpt = false;
            var cd = this.adata;
            var title_p, title_t;
            switch (cd.type) {
                case "pingjia"://评价
                    title_p = "lrpjbt_png";
                    break;
                case "scdj"://赏赐道具
                    title_p = 'scdjbt_png';
                    break;
                case "tjjq":
                    view.ok_b.visible = false;
                case "task"://从任务过来
                    title_t = cd.title;
                    title_p = "avgemptytitle_png";
                    if (cd.id == 300) {
                        title_p = 'task300_png';
                        title_t = "";
                    }
                    break;
                case "fuben"://战斗
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", cd.id);
                    title_t = api2.StageName;
                    api2 = null;
                    cd.notice_ok = mx.MX_NOTICE.CS_GET_DATA;
                    cd.sdata_ok = {
                        "t": mx.MX_NETS.CS_FUBEN_CHUZHAN,
                        "stage": cd.id
                    };
                    break;
                case "lianai"://从美男培养恋爱里过来。
                    var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.mid);
                    title_t = mx.Tools.format(mx.Lang.h0055, hero.hero_name);
                    title_p = "avgemptytitle_png";
                    cd.notice_ok = mx.MX_NETS.CS_HERO_YUEHUIVIEW;
                    cd.sdata_ok = { "mid": cd.mid };
                    break;
                case "zinv"://子女
                    title_p = 'twznv_png';
                    break;
                case "zinv_xingge_select":
                    title_p = 'twznv_png';
                    break;
                case "shiqin"://养心殿妃子侍寝-可能有宫斗事件
                    title_p = 'fpsqin_png';
                    view.ok_b.visible = false;
                    if (cd.skill && cd.skill[0].awards) {
                        cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.POP_VIEW;
                        if (Number(cd.skill[0].id) == 33 || Number(cd.skill[0].id) == 34) {
                            cd.sdata_ok = cd.sdata_exit = {
                                "name": mx.YiQingView.S_NAME,
                                "param": {
                                    "awards": cd.skill[0].awards[0],
                                    "mli": Number(cd.cd.meili),
                                    "name": cd.cd.name
                                }
                            };
                        }
                        else {
                            cd.sdata_ok = cd.sdata_exit = {
                                "name": mx.PRewardAlert.S_NAME,
                                "param": cd.skill[0].awards
                            };
                        }
                    }
                    else if (cd.jin_skill) {
                        cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.POP_VIEW;
                        cd.sdata_ok = cd.sdata_exit = {
                            "name": mx.PRewardAlert.S_NAME,
                            "param": [{
                                    "id": 2012,
                                    "shuliang": 1,
                                    "type": 4
                                }]
                        };
                    }
                    else if (cd.hua_skill) {
                        cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.POP_VIEW;
                        cd.sdata_ok = cd.sdata_exit = {
                            "name": mx.PRewardAlert.S_NAME,
                            "param": [{
                                    "id": cd.hua_skill == 1 ? 2009 : 2021,
                                    "shuliang": 1,
                                    "type": 4
                                }]
                        };
                    }
                    else {
                        cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.FRESH_FZ_LIST;
                    }
                    var yun_arr = ["2", "3", "4"]; //是否怀孕
                    var yun_flag = false;
                    var mn_status = String(cd.cd.status).split("|");
                    for (var m in yun_arr) {
                        if (mn_status.indexOf(yun_arr[m]) >= 0) {
                            yun_flag = true;
                            break;
                        }
                    }
                    if (yun_flag && !cd.new_yun) {
                        title_p = "twfzi_png";
                    }
                    var gd_d = cd.gongdou; //宫斗事件
                    if (gd_d) {
                        this.no_skip = true;
                    }
                    else {
                        this.no_skip = false;
                    }
                    break;
                case "lg"://冷宫
                    title_p = "twfzi_png";
                    break;
                case "guide"://引导
                    title_p = "gtle" + cd.cd + "_png";
                    break;
                case "temple"://太庙
                    cd.notice_ok = mx.MX_NOTICE.CS_GET_DATA;
                    cd.sdata_ok = { "t": mx.MX_NETS.CS_GET_TEMPLE_FIGHT };
                    title_p = 'dwkhe_png';
                    break;
                case "temple_finish"://太庙考核完成
                    break;
                case "temple_shuoming"://太庙考核说明
                    title_p = "dwkhe_png";
                    break;
                case "nanchan"://难产-红颜薄命
                    title_p = 'hybming_png';
                    break;
                case "tiaoxi"://调戏
                    egret.Tween.removeTweens(view.next_p);
                    view.next_p.visible = false;
                    view.txlove.source = 'txtshi_png';
                    view.txlove.x = 1.5 * (480 - 109 + 27 / 2);
                    view.txlove.y = 1.5 * (109 + 31 / 2);
                    view.txlove.visible = cd.cshu > 0;
                    view.txlove.anchorOffsetX = 1.5 * 27 / 2;
                    view.txlove.anchorOffsetY = 1.5 * 31 / 2;
                    view.txi_b.set_ssres(cd.cshu > 0 ? 'txi_png' : 'txhui_png');
                    if (cd.cshu > 0) {
                        mx.TweenTool.getInstance().get_tween(view.txlove, "wqj", true);
                    }
                    view.txi_b.visible = true;
                    view.ok_b.visible = false;
                    title_p = 'toptxi_png';
                    this.no_skip = true;
                    break;
                case "tiaoxi_result"://调戏结果
                    view.txi_b.visible = false;
                    if (cd.result == 2 && !cd.skip) {
                        cd.notice_ok = mx.MX_NOTICE.START_TIAOXI_FIGHT;
                    }
                    else if (cd.result == 1) {
                        cd.notice_ok = mx.MX_NOTICE.SHOW_TIAOXI_ANI;
                    }
                    title_p = 'toptxi_png';
                    break;
                case "tiaoxi_xdz": //调戏完成后小德子说话
                case "tiaoxi_over"://调戏战斗结束
                    cd.notice_ok = mx.MX_NOTICE.FRESH_FZ_LIST;
                    view.txi_b.visible = false;
                    title_p = 'toptxi_png';
                    break;
                case "jfs"://教坊司
                    title_p = 'jfsi_png';
                    if (!cd.child) {
                        cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.SHOW_AWARD;
                    }
                    break;
                case "jfs_over":
                    if (cd.pass) {
                        title_t = mx.Tools.format(mx.Lang.jfs09, this.jqs[0].uname);
                        cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.SHOW_AWARD;
                        title_p = "avgemptytitle_png";
                    }
                    else {
                        title_p = 'jfsi_png';
                    }
                    break;
                case "jfs_ss":
                    title_p = "jfsi_png";
                    cd.notice_ok = mx.MX_NOTICE.CS_GET_DATA;
                    cd.sdata_ok = {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": cd.cd.mid,
                        "type": 5
                    };
                    break;
                case "jfs_sscg":
                    title_p = "sscgong_png";
                    cd.notice_ok = mx.MX_NOTICE.JFS_SSCG;
                    cd.sdata_ok = {};
                    break;
                case "ld":
                case "ldzn":
                    title_p = 'jbcda_png';
                    cd.notice_ok = mx.MX_NOTICE.SHOW_AWARD;
                    cd.sdata_ok = {};
                    break;
                case "ry":
                    title_p = 'ydmryu_png';
                    break;
                case "ry2":
                    title_p = 'ydmryu_png';
                    cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.POP_VIEW;
                    cd.sdata_ok = cd.sdata_exit = {
                        "name": mx.PRewardAlert.S_NAME,
                        "param": cd.awards
                    };
                    var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                    dproxy.set_close_PRA_nd({ "notice": mx.MX_NOTICE.CHECK_MAIN_ALERT });
                    break;
                case "zhandou_before":
                case "zhandou_after":
                    var stage_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", cd.cd.stage);
                    title_t = stage_api.stagename;
                    if (cd.type == 'zhandou_before') {
                        if (cd.only_play) {
                            if (cd.cd.juqing && Number(cd.cd.pass) != -1) {
                                cd.notice_ok = mx.MX_NOTICE.CS_GET_DATA;
                                var sign = mx.Tools.jiami('succ', 0, cd.cd.stage);
                                cd.sdata_ok = {
                                    "t": mx.MX_NETS.CS_FUBEN_GET_AWARD,
                                    "sign": JSON.stringify(sign),
                                    "id": 0,
                                    "type": 0,
                                    "result_info": null,
                                    "huifang": null,
                                };
                            }
                        }
                        else {
                            cd.notice_ok = mx.MX_NOTICE.CS_GET_DATA;
                            cd.sdata_ok = {
                                "t": mx.MX_NETS.CS_FUBEN_CHUZHAN,
                                "stage": cd.cd.stage
                            };
                        }
                    }
                    else {
                        cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.CHAPTER_OPEN;
                    }
                    title_p = "avgemptytitle_png";
                    //view.title.verticalCenter = -15;
                    break;
                case "huyao":
                    title_p = 'fyavg_t' + cd.day + "_png";
                    var aproxy_1 = (facade.retrieveProxy(mx.ActyProxy.NAME));
                    if (cd.day < 6) {
                        var fy_avg = egret.localStorage.getItem("fy_avg" + cd.day);
                        if (!fy_avg || fy_avg == "") {
                            egret.localStorage.setItem("fy_avg" + cd.day, "play");
                        }
                        if (cd.day == 2) {
                            aproxy_1.huyao_final_award_type = 2;
                            cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.CS_GET_DATA;
                            cd.sdata_ok = cd.sdata_exit = {
                                "t": mx.MX_NETS.CS_HUYAO_FINAL_AWARD,
                                "type": 2 //分身
                            };
                        }
                        else {
                            cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.CS_GET_DATA;
                            cd.sdata_ok = cd.sdata_exit = {
                                "t": mx.MX_NETS.CS_HUYAO_DAY_DATA,
                                "kaiqi": cd.day
                            };
                        }
                    }
                    else if (cd.day == 6 && aproxy_1.yhu_res <= 0) {
                        var gameProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                        gameProxy.huyao = 0;
                        cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.SCENE_CHANGE;
                        cd.sdata_ok = cd.sdata_exit = mx.MainScreen.S_NAME;
                    }
                    break;
                case "sj_ly_anwei":
                    title_p = 'twznv_png';
                    cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.CS_GET_DATA;
                    cd.sdata_ok = cd.sdata_exit = {
                        "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                        "id": cd.sj_id,
                    };
                    break;
                case "sj_ly_yingqin":
                    title_p = 'twfzi_png';
                    var pProxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                    for (var i in pProxy.mn_d) {
                        if (Number(pProxy.mn_d[i].mid) == cd.mid) {
                            pProxy.set_curr_mn(pProxy.mn_d[i].id);
                            break;
                        }
                    }
                    cd.notice_ok = cd.notice_exit = mx.MX_NOTICE.CS_GET_DATA;
                    cd.sdata_ok = cd.sdata_exit = {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": cd.mid,
                        "type": 1
                    };
                    if (typeof cd.re_kanjia == 'undefined') {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                            "id": cd.sj_id,
                            "msg_id": cd.msg_id
                        });
                    }
                    break;
                case "wbsj":
                    title_t = "落魄书生";
                    title_p = "avgemptytitle_png";
                    //cd.notice_ok = cd.notice_exit = MX_NOTICE.POP_VIEW;
                    // cd.sdata_ok = cd.sdata_exit = {
                    //     "name": ShareShijianView.S_NAME
                    // };
                    break;
                case "guide_rename":
                    view.ok_b.visible = false;
                case "xgs_jianjie":
                case "xgs_rename":
                    title_p = "syan_png";
                    break;
                case "nhtx":
                case "nhjfs":
                case "nhld":
                    title_p = cd.type + "_png";
                    break;
                case "guizu":
                    title_p = "gmjqing_png";
                    break;
                case "xxg":
                    title_p = "xfymou_png";
                    break;
                case "cxqb":
                    title_p = "cxqbao_png";
                    break;
                case "fxqb":
                    title_p = "fxqbao_png";
                    break;
                case "dxqb":
                    title_p = "dxqbao_png";
                    break;
                case "cxtg":
                case "cxycyl":
                case "cxzdl":
                case "cxdml":
                    title_p = "cxuan_png";
                    break;
                case "fxcg":
                case "fxycyx":
                case "fxgxd":
                case "fxdml":
                    title_p = "fxuan_png";
                    break;
                case "dxcg":
                case "fxsb":
                    title_p = "dxuan_png";
                    break;
                case "heishi":
                    title_p = "hshi_title_png";
                    break;
                case "sctsd":
                    title_p = 'scdjbt_png';
                    break;
                case "tsdhd":
                    title_p = "ldqywzi_png";
                    break;
                case "checha":
                    title_p = "gdccha_png";
                    this.skipToOpt = true;
                    break;
            }
            this.init_title(title_p, title_t);
            this.show_next();
        };
        AVGView.prototype.init_title = function (title_p, title_t) {
            this.name_t.text = title_t || "";
            this.title.source = title_p || "";
            if (title_p == "avgemptytitle_png") {
                this.title.width = this.name_t.width + 150;
            }
        };
        //可改
        AVGView.prototype.format_cw = function (str, type, id) {
            if (type === void 0) { type = "shiqin"; }
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var re = new RegExp('\\{' + "[0-9]+" + '\\}', 'g');
            var arr = str.match(re);
            for (var k in arr) {
                var cw = void 0, c_d = void 0;
                var c_str = arr[k];
                var c_t = c_str.substr(1, c_str.length - 2);
                switch (Number(c_t)) {
                    case 0://自称，男妃子自称臣下，女妃子自称臣妾,子女自称儿臣
                        c_d = this.adata.cd;
                        if (type == "zinv" || type == "jfs" || (type == 'scdj' && mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME)) {
                            cw = mx.Lang.hg009; //儿臣
                            if (c_d && c_d.sex) {
                                cw = Number(c_d.sex) == 1 ? mx.Lang.hg0460 : mx.Lang.hg0450;
                            }
                        }
                        else {
                            cw = Number(c_d.sex) == 1 ? mx.Lang.hg008 : mx.Lang.hg007;
                        }
                        break;
                    case 1://妃子自称（位分+name）
                        c_d = this.adata.cd;
                        cw = mx.Tools.get_mn_wf(c_d) + c_d.name;
                        break;
                    case 2://对方,格式(位分+name)
                        c_d = (typeof id == 'undefined' ? pproxy.cur_zn_info : pproxy.get_curr_mn(id));
                        cw = mx.Tools.get_mn_wf(c_d) + c_d.name;
                        break;
                    case 3://判断是皇子/皇女。
                        switch (this.adata.type) {
                            case "guide":
                                c_d = this.adata;
                                break;
                            default:
                                c_d = this.adata.zn;
                                break;
                        }
                        cw = Number(c_d.sex) == 1 ? mx.Lang.hg046 : mx.Lang.hg045;
                        break;
                    case 4://皇子女名字，格式：位分+name ps:清河王胤禛
                        switch (this.adata.type) {
                            case "ld":
                            case "ldzn":
                                cw = this.adata.info.name;
                                break;
                            case "cxtg": //初选成功
                            case "fxcg": //复选成功
                            case "cxycyl": //初选失败1
                            case "cxzdl": //初选失败2
                            case "cxdml": //初选失败3
                            case "fxycyx": //复选失败1
                            case "fxgxd": //复选失败2
                            case "fxdml": //复选失败3
                            case "dxcg": //殿选成功
                            case "fxsb"://殿选失败
                                cw = this.adata.cd.name;
                                break;
                        }
                        break;
                    case 5://其他用户的名字
                        switch (this.adata.type) {
                            case "jfs_over":
                                cw = this.adata.cd.jinzhu_name;
                                break;
                            case "jfs_ss":
                            case "jfs_sscg":
                                var gproxy_1 = (facade.retrieveProxy(mx.GameProxy.NAME));
                                cw = gproxy_1.user_name;
                                break;
                            case "ld":
                            case "ldzn":
                                cw = this.adata.user.name;
                                break;
                        }
                        break;
                    case 6://母上/父上
                        var gproxy1 = (facade.retrieveProxy(mx.GameProxy.NAME));
                        cw = gproxy1.user_sex == 1 ? mx.Lang.hg006 : mx.Lang.hg005;
                        break;
                    case 7://他/她
                        c_d = (typeof id == 'undefined' ? pproxy.cur_zn_info : pproxy.get_curr_mn(id));
                        switch (this.adata.type) {
                            case "guide":
                                // case "jfs_sscg":
                                c_d = this.adata;
                            case "jfs_ss":
                                c_d = this.adata.cd;
                                break;
                        }
                        cw = Number(c_d.sex) == 1 ? mx.Lang.p0057 : mx.Lang.p0056;
                        break;
                    case 8://用户名字，和5可能重复
                        var gproxy2 = (facade.retrieveProxy(mx.GameProxy.NAME));
                        cw = gproxy2.user_name;
                        break;
                    case 10://动态妃子名字
                        var gproxy = (facade.retrieveProxy(mx.GuideProxy.NAME));
                        switch (this.adata.type) {
                            case "task":
                            case "tjjq":
                                cw = gproxy.slt_info.name;
                                break;
                            case "guide":
                                cw = gproxy.slt_info.name;
                                break;
                            default:
                                c_d = this.adata;
                                cw = c_d.role_name || c_d.cd.name;
                                break;
                        }
                        break;
                    case 12:
                        cw = this.adata.skill[0].huaiyun.zhengchang_name;
                        break;
                    case 13:
                        cw = this.adata.skill[0].feizi_info.name;
                        break;
                    case 14://
                        switch (this.adata.type) {
                            case "jfs_ss":
                            case "jfs":
                            case "jfs_sscg":
                                cw = this.adata.jg;
                                break;
                        }
                        break;
                    case 15://引导选王妃的名字
                        var Gproxy = (facade.retrieveProxy(mx.GuideProxy.NAME));
                        cw = this.adata.role_rname || Gproxy.slt_info.rname;
                        break;
                    case 16://优惠的元宝
                        cw = Math.round(Number(this.adata.yh) * Number(this.adata.jg) / 100);
                        break;
                    case 20:
                        cw = this.adata.feizi_touzi;
                        break;
                    case 21:
                        cw = this.adata.user_touzi;
                        break;
                }
                str = str.replace(c_str, cw);
            }
            return str;
        };
        AVGView.prototype.show_guitai_select = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.AVGSELECT, "id", 14);
            var sel = api.jump.split('|');
            var data = this.adata;
            var arr = [];
            this.r_name_t.text = api.uname; //话语者,固定NPC不处理
            for (var i in sel) {
                var cstr = mx.ApiTool.getAPINode(mx.MX_APINAME.AVGSELECT, "id", sel[i]);
                arr.push({
                    "visible": true,
                    "textflow": [{ "text": this.format_cw(cstr.content, "shiqin") }],
                    "sid": cstr.content == '男孩女孩都可以' ? 3 : (cstr.content == '男孩' ? 2 : 1),
                    "size": 27,
                });
            }
            api = null;
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.show_hengxingbadao_select = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.AVGSELECT, "id", 2);
            var sel = api.jump.split('|');
            var data = this.adata;
            var arr = [];
            this.r_name_t.text = api.uname; //话语者,固定NPC不处理
            for (var i in sel) {
                var cstr = mx.ApiTool.getAPINode(mx.MX_APINAME.AVGSELECT, "id", sel[i]);
                arr.push({
                    "visible": true,
                    "textflow": [{ "text": this.format_cw(cstr.content, "shiqin") }],
                    "sid": Number(i) + 1,
                    "size": 27,
                });
            }
            api = null;
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.show_zinv_xingge_select = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var data = this.adata;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.XUANZE, "id", data.xuanze);
            var c_d = pproxy.cur_zn_info;
            this.namebg_p.visible = true;
            this.r_name_t.text = c_d.name; //话语者，子女不会是真实妃子，不处理
            this.con_t.text = this.format_cw(api.question, "zinv"); //内容
            this.bg.source = "s" + 1514 + "_jpg"; //场景
            //子女立绘
            var state = Number(c_d.zhuangtai);
            this.role.source = mx.Tools.get_bb_res("lh", state, c_d.avatar, c_d.meili);
            var arr = [];
            for (var i = 1; i <= 3; i++) {
                var cstr = api["answer" + i];
                arr.push({
                    "visible": true,
                    "textflow": [{ "text": this.format_cw(cstr, "zinv") }],
                    "sid": i,
                    "size": 27,
                });
            }
            api = null;
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.init_zsfz_tx = function (cd) {
            this.zsfz_g.visible = true;
            this.yxfz_g.visible = false;
            var ca = cd.avatar + "";
            if (ca.indexOf("http") > -1) {
                var btx = ca.slice(0, -2) + "100";
                RES.getResByUrl(btx, function (e) {
                    this.head_p.source = e;
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
            else {
                var str = void 0;
                if (Number(ca) > 3) {
                    str = "zsnst" + (Number(ca) - 3) + "_png";
                }
                else {
                    str = "zsnt" + ca + "_png";
                }
                this.head_p.source = str;
            }
            var uname = cd.name;
            if (uname && uname != "") {
                this.realName_t.text = uname;
                this.name_bg.visible = true;
            }
            else {
                this.realName_t.text = "";
                this.name_bg.visible = false;
            }
        };
        AVGView.prototype.init_yxfz_tx = function (c_d) {
            this.zsfz_g.visible = false;
            this.yxfz_g.visible = true;
            var uname = c_d.name;
            if (uname && uname != "") {
                // let nstr = '';
                // MGTool.get_str(1,uname).then((value) => {
                //     nstr = value.str;
                //     this.r_name_t.text = this.format_cw(nstr);
                //     this.namebg_p.visible = true;
                // },()=>{
                //     nstr = '';
                //     this.r_name_t.text = this.format_cw(nstr);
                //     this.namebg_p.visible = true;
                // }); 
                //let nstr = uname;//Tools.check_msg(uname, "name", true);
                this.r_name_t.text = this.format_cw(uname);
                this.namebg_p.visible = true;
            }
            else {
                this.r_name_t.text = "";
                this.namebg_p.visible = false;
            }
        };
        AVGView.prototype.get_mnres = function (td) {
            var view = this.role;
            if (view && td) {
                view.source = td;
                view.width = 720;
                view.height = Math.round(td.textureHeight / td.textureWidth * 720);
            }
        };
        AVGView.prototype.show_gdsj = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var data = pproxy.gd_event;
            var cd = this.adata.cd; //id及pet
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.GDSHJ, "id", data.sj_id);
            var c_d = pproxy.get_curr_mn(cd.id);
            this.con_t.text = this.format_cw(api.ask, "shiqin", data.beigao); //内容
            this.bg.source = "s" + 1514 + "_jpg"; //场景
            if ((Number(c_d.mid) < 1000 && Number(c_d.mid) != 308) || (Number(c_d.mid == 308) && c_d.huapi == '')) {
                if (c_d.mid >= 900 && c_d.ren_lian && c_d.ren_lian != "") {
                    mx.Tools.url_image(c_d.ren_lian, null, this.get_mnres, this);
                }
                else {
                    this.role.source = mx.Tools.get_mn_res(c_d.mid, "lh"); //英雄立绘
                    var res = RES.getRes(mx.Tools.get_mn_res(c_d.mid, "lh"));
                    if (res) {
                        this.role.height = res.textureHeight;
                        this.role.width = res.textureWidth;
                    }
                }
                if (Number(c_d.mid) >= 900) {
                    this.init_zsfz_tx(c_d);
                }
                else {
                    this.init_yxfz_tx(c_d);
                }
            }
            else {
                this.role.source = mx.Tools.get_zn_res(c_d.avatar, "lh"); //二代妃立绘
                this.init_yxfz_tx(c_d);
            }
            var arr = [];
            for (var i = 1; i <= 3; i++) {
                var cstr = api["answer" + i];
                var c_type = api["answer" + i + "_type"];
                arr.push({
                    "visible": true,
                    "textflow": [{ "text": this.format_cw(cstr, "shiqin", data.beigao) }],
                    "sid": i,
                    "size": 27,
                    "c_type": c_type
                });
            }
            api = null;
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.show_jfsopt = function () {
            this.me_g.visible = false;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var cd = this.adata.cd; //id及pet
            var c_d = proxy.get_cur_mn(cd.id);
            this.namebg_p.visible = true;
            this.r_name_t.text = c_d.name; //话语者
            this.bg.source = "s" + 1518 + "_jpg"; //场景
            if ((Number(c_d.mid) < 1000 && Number(c_d.mid) != 308) || (Number(c_d.mid == 308) && c_d.huapi == '')) {
                this.role.source = mx.Tools.get_mn_res(c_d.mid, "lh"); //英雄立绘
            }
            else {
                this.role.source = mx.Tools.get_zn_res(c_d.avatar, "lh"); //二代妃立绘
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JFSDIALOG, "result", 2);
            var str = api.content;
            str = str.replace("{", "{0{");
            str = str.replace("}", "}0}");
            str = str.replace("{5}", cd.jinzhu_name);
            this.con_t.textFlow = mx.Tools.setKeywordColor2(str, [mx.Tools.num2color(200)]);
            api = null;
            var arr = [];
            arr.push({
                "visible": false,
                "size": 27,
                "textflow": []
            });
            arr.push({
                "visible": true,
                "sid": 1,
                "size": 24,
                "textflow": mx.Tools.setKeywordColor2(mx.Tools.format(mx.Lang.jfs10, cd.jinzhu_name), [mx.Tools.num2color(200)])
            });
            arr.push({
                "visible": true,
                "sid": 2,
                "size": 27,
                "textflow": [{ "text": mx.Lang.jfs11 }]
            });
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.show_jfsopt2 = function () {
            var facade = mx.ApplicationFacade.getInstance();
            this.namebg_p.visible = true;
            this.bg.source = "s" + 1506 + "_jpg"; //场景
            var arr = [];
            arr.push({
                "visible": false,
                "size": 27,
                "textflow": []
            });
            arr.push({
                "visible": true,
                "sid": 1,
                "size": 27,
                "textflow": [{ "text": mx.Lang.jfs41 }]
            });
            arr.push({
                "visible": true,
                "sid": 2,
                "size": 27,
                "textflow": [{ "text": mx.Lang.jfs42 }]
            });
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.show_renameOpt = function () {
            var arr = [];
            arr.push({
                "visible": false,
                "size": 27,
                "textflow": []
            });
            arr.push({
                "visible": true,
                "size": 27,
                "textflow": [{ "text": mx.Lang.xgs26 }]
            });
            arr.push({
                "visible": true,
                "size": 27,
                "textflow": [{ "text": mx.Lang.xgs27 }]
            });
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.show_chechaOpt = function () {
            var cd = this.adata;
            var lang = mx.Lang[cd.type];
            var arr = [];
            arr.push({
                "visible": false,
                "size": 27,
                "textflow": []
            });
            arr.push({
                "visible": true,
                "size": 27,
                "textflow": [{ "text": mx.Tools.format(lang.opt[0], lang[cd.msg_id][2]) }]
            });
            arr.push({
                "visible": true,
                "size": 27,
                "textflow": [{ "text": lang.opt[1] }]
            });
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.show_guide_rename = function () {
            var arr = [];
            arr.push({
                "visible": false,
                "size": 27,
                "textflow": []
            });
            arr.push({
                "visible": true,
                "size": 27,
                "textflow": [{ "text": mx.Lang.xgs35 }]
            });
            arr.push({
                "visible": true,
                "size": 27,
                "textflow": [{ "text": mx.Lang.xgs36 }]
            });
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.show_qxqfuopt = function () {
            var facade = mx.ApplicationFacade.getInstance();
            //this.namebg_p.visible = true;
            this.bg.source = "s" + 711 + "_jpg"; //场景
            var arr = [];
            arr.push({
                "visible": true,
                "sid": 1,
                "size": 27,
                "textflow": [{ "text": mx.Lang.qf0011 }]
            });
            arr.push({
                "visible": true,
                "sid": 2,
                "size": 27,
                "textflow": [{ "text": mx.Lang.qf0012 }]
            });
            arr.push({
                "visible": true,
                "sid": 3,
                "size": 27,
                "textflow": [{ "text": mx.Lang.qf0013 }]
            });
            this.opt_list.dataProvider = new eui.ArrayCollection(arr);
            this.next_p.visible = this.ok_b.visible = false;
        };
        AVGView.prototype.check_nextjq = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
            var now_task = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "step1_id", this.adata.id);
            var next_task = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", Number(now_task.id) + 1);
            var stage1 = now_task.finish_parameter.split("|");
            var s_api1 = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", stage1[0]);
            this.tjjq_g.visible = true;
            this.tjjq_g.alpha = 0;
            egret.Tween.get(this.tjjq_g).to({ "alpha": 1 }, 1000);
            if (next_task) {
                var stage2 = next_task.finish_parameter.split("|");
                var s_api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", stage2[0]);
                if (s_api1.ChapterID == s_api2.ChapterID) {
                    var wjapis = mx.ApiTool.getAPINodes(mx.MX_APINAME.TASKJQ, "step1_id", next_task.step1_id);
                    for (var k in wjapis) {
                        if (wjapis[k].avatar == "{10}") {
                            var Gproxy = (facade.retrieveProxy(mx.GuideProxy.NAME));
                            wjapis[k].avatar = Gproxy.slt_info.res;
                        }
                    }
                    var aproxy = (facade.retrieveProxy(mx.AVGProxy.NAME));
                    for (var k in wjapis) {
                        var wjapi = wjapis[k];
                        aproxy.avg_jqs.push({
                            "uname": wjapi.uname,
                            "content": wjapi.content,
                            "avatar": wjapi.avatar,
                            "scene": wjapi.scene,
                            "scene_p": "s" + wjapi.scene + "_jpg",
                        });
                    }
                    for (var j in aproxy.avg_jqs) {
                        var api = aproxy.avg_jqs[j];
                        var avatar_arr = String(api.avatar).split("_"); //剧情里可能有表情。
                        var avatar = Number(avatar_arr[0]); //美男，子女，npc
                        api.role_p = "a" + avatar + "_png";
                        if (avatar_arr[1]) {
                            var bq = "a" + api.avatar + "_png";
                            api.bq_p = bq;
                        }
                    }
                    view.jqs = aproxy.avg_jqs;
                    this.jqs.push({ "check_nextjq": true });
                    this.cur_step = 0;
                    fproxy.tar_jq_stage = Number(next_task.id);
                    this.adata.hua++;
                    this.adata.id = next_task.step1_id;
                    this.tjhua_t.text = "";
                    var timeid2_1 = egret.setTimeout(function (arg) {
                        this.adata.title = next_task.name;
                        this.name_t.text = this.adata.title;
                        this.title.source = "";
                        this.show_next();
                    }, this, 1000, "egret");
                    return;
                }
            }
            this.zjwj_g.visible = true;
            this.tjhua_t.visible = false;
            this.zjwj_p.source = "jqwj" + s_api1.ChapterID + "_png";
            fproxy.tar_jq_stage = Number(now_task.id);
            var timeid2 = egret.setTimeout(function (arg) {
                this.btn_click({ "currentTarget": this.ok_b });
            }, this, 3000, "egret");
        };
        //选项列表响应函数
        AVGView.prototype.opt_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = e.item;
            switch (this.adata.type) {
                case "zinv_xingge_select"://子女教育事件
                    var pproxy1 = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var c_d = pproxy1.cur_zn_info;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HZS_XINGGE_SELECT,
                        "ans": cd.sid,
                        "zinv_id": c_d.id,
                        "id": this.adata.xuanze,
                    });
                    break;
                case "shiqin"://侍寝
                    if (this.adata.guitai == 0) {
                        var id = 0;
                        switch (cd.sid) {
                            case 1:
                                id = 1;
                                break;
                            case 2:
                                id = 2;
                                break;
                            case 3:
                                id = Math.floor(Math.random() * 2) + 1;
                                break;
                        }
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_GUIZU_GUITAI,
                            "id": this.adata.cd.id,
                            "answer": id
                        });
                        return;
                    }
                    else if (this.adata.skill) {
                        if (Number(this.adata.skill[0].id) == 27) {
                            var id = 0;
                            switch (cd.sid) {
                                case 1:
                                    id = this.adata.skill[0].feizi_info.id;
                                    break;
                                case 2:
                                    id = this.adata.cd.id;
                                    break;
                                case 3:
                                    if (Math.round(Math.random())) {
                                        id = this.adata.skill[0].feizi_info.id;
                                    }
                                    else {
                                        id = this.adata.cd.id;
                                    }
                                    break;
                            }
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_YXD_SHIQIN,
                                "id": id,
                            });
                            return;
                        }
                    }
                    var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var gd_d = pproxy.gd_event;
                    if (gd_d.sid) {
                        return;
                    }
                    var cmn = this.adata.cd;
                    gd_d.sid = cd.sid;
                    var astr = void 0, cw = void 0;
                    var send_d = {
                        "t": mx.MX_NETS.CS_YXD_SQ_EVENT,
                        "answer": cd.sid,
                        "id": cmn.id,
                    };
                    switch (Number(cd.c_type)) {
                        case 1:
                        case 2:
                            if (Number(cd.c_type) == 2) {
                                cmn = pproxy.get_curr_mn(gd_d.beigao);
                            }
                            var cw_1 = (mx.Tools.get_mn_wf(cmn) + cmn.name);
                            this.temp_info = null;
                            this.temp_info = {
                                astr: (mx.Tools.format(mx.Lang.hg098, cw_1)),
                                send_d: send_d
                            };
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_LENGGONG_NUM,
                                "id": cmn.id,
                                "type": 1 //宫斗事件打入冷宫
                            });
                            break;
                        // case 1://原告冷宫
                        //     cw = Tools.get_mn_wf(cmn) + cmn.name;
                        //     astr = Tools.format(Lang.hg098, cw);
                        //     this.show_gdsj_alert(astr, send_d);
                        //     break;
                        // case 2://被告冷宫
                        //     cmn = pproxy.get_curr_mn(gd_d.beigao);
                        //     cw = Tools.get_mn_wf(cmn) + cmn.name;
                        //     astr = Tools.format(Lang.hg098, cw);
                        //     this.show_gdsj_alert(astr, send_d);
                        //     break;
                        case 7://原告赐死
                            cw_1 = mx.Tools.get_mn_wf(cmn) + cmn.name;
                            astr = mx.Tools.format(mx.Lang.hg099, cw_1);
                            this.show_gdsj_alert(astr, send_d);
                            break;
                        case 8://被告赐死
                            cmn = pproxy.get_curr_mn(gd_d.beigao);
                            cw_1 = mx.Tools.get_mn_wf(cmn) + cmn.name;
                            astr = mx.Tools.format(mx.Lang.hg099, cw_1);
                            this.show_gdsj_alert(astr, send_d);
                            break;
                        default:
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, send_d);
                            break;
                    }
                    break;
                case "jfs"://教坊司
                    if (cd.sid == 1) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JFS_FIGHT,
                            "id": this.adata.cd.id,
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, AVGView.S_NAME);
                    }
                    break;
                case "nhjfs"://教坊司
                    facade.sendNotification(mx.MX_NOTICE.AVG_FRESH, cd.sid, mx.MX_AVG_CONST.AVG_T_NH_JFS);
                    this.show_next();
                    break;
                case "xgs_rename":
                    switch (e.itemIndex) {
                        case 1:
                            this.leave_avg();
                            facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                            break;
                        case 2:
                            this.opt_g.visible = false;
                            this.next_p.visible = this.ok_b.visible = true;
                            this.show_next();
                            break;
                    }
                    break;
                case "checha":
                    switch (e.itemIndex) {
                        case 1:
                            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                            var c_num = dproxy.get_currency("ybao");
                            var cost = mx.Lang[this.adata.type][this.adata.cd.msg_id][2];
                            if (c_num < cost) {
                                mx.Tools.show_recharge();
                            }
                            else {
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                    "name": mx.AlertView.S_NAME,
                                    "param": {
                                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                        "sdata_ok": {
                                            "t": mx.MX_NETS.CS_SHIJIAN_CHECHA,
                                            "id": this.adata.cd.id,
                                        },
                                        "param": mx.Tools.format(mx.Lang.sjian023, cost),
                                    }
                                });
                            }
                            break;
                        case 2:
                            this.opt_g.visible = false;
                            this.next_p.visible = this.ok_b.visible = true;
                            this.show_next();
                            break;
                    }
                    break;
                case "guide_rename"://仅在新手引导中出现一次
                    switch (e.itemIndex) {
                        case 1://改名
                            this.leave_avg();
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.XGSRenamePop.S_NAME });
                            break;
                        case 2://不改名，直接跳转到下一个引导
                            this.leave_avg(); //关闭剧情弹窗
                            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, { "sname": mx.MainScreen.S_NAME });
                            break;
                    }
                    break;
            }
        };
        AVGView.prototype.show_gdsj_alert = function (str, send_d) {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AlertView.S_NAME,
                "param": {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": send_d,
                    "param": str,
                    "notice_exit": mx.MX_NOTICE.AVG_FRESH,
                    "type_exit": mx.MX_AVG_CONST.AVG_T_FRESH_GD,
                }
            });
        };
        //调戏按钮响应函数
        AVGView.prototype.txi_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.adata.cshu > 0) {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_TIAOXI,
                    "id": this.adata.cd.id,
                });
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', 2037);
                if (!api) {
                    return;
                }
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.BuyAlertView.S_NAME,
                    "param": {
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": { "t": mx.MX_NETS.CS_BUY_ITEM, "item_id": 2037, "num": 1 },
                        "param": {
                            "gmn": 1,
                            "icon": "item2037_png",
                            "item": 2037,
                            "price": api.Buyprice2
                        }
                    }
                });
                api = null;
            }
        };
        AVGView.prototype.leave_avg = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, AVGView.S_NAME);
        };
        AVGView.prototype.play_music = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, {
                "name": this.c_music, "type": "yuyin"
            });
        };
        AVGView.prototype.get_sound_name = function (sound_id, type, sex) {
            if (type === void 0) { type = 10; }
            var sid = 0;
            if (String(sound_id).indexOf(",") < 0 && String(sound_id).indexOf("_") < 0) {
                sid = Number(sound_id);
            }
            else {
                var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GuideProxy.NAME));
                var sound_arr = sound_id.split(",");
                var arr1 = {};
                var tmp = void 0;
                for (var k in sound_arr) {
                    tmp = sound_arr[k].split("_");
                    arr1[tmp[1]] = tmp[0];
                }
                if (type == 10) {
                    sid = Number(arr1[gproxy.slt_role]);
                }
                else if (type == 3 || type == 0) {
                    if (sex) {
                        sid = Number(arr1[sex]);
                    }
                    else {
                        sid = Number(arr1[1]);
                    }
                }
                else {
                    sid = 1;
                }
            }
            //console.log(sid)
            var sound_name = mx.Tools.get_guide_sound(sid);
            return sound_name;
        };
        AVGView.prototype.show_next = function (e) {
            this.music_b.visible = false; //默认不显示
            if (this.c_music) {
                this.c_music = null;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_MUSIC, true);
            }
            if (this.opt_g.visible) {
                return;
            }
            if (!this.jqs.length) {
                this.btn_click({ "currentTarget": this.ok_b });
                return;
            }
            var api = this.jqs.shift();
            if (!api) {
                return;
            }
            ++this.cur_step;
            if (this.cur_step == 1 && this.adata.type == "tjjq") {
                var facade = mx.ApplicationFacade.getInstance();
                var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                var now_task = fproxy.now_task;
                var task_api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "step1_id", this.adata.id);
                var kaiqi_1 = now_task >= Number(task_api.id);
                this.tjjq_g.visible = true;
                var tjstr = mx.Tools.format(mx.Lang.tj00008, this.adata.hua, this.adata.title);
                if (!kaiqi_1) {
                    tjstr += ("\n" + mx.Lang.tj00006);
                }
                this.tjhua_t.text = tjstr;
                var timeid = egret.setTimeout(function (arg) {
                    if (kaiqi_1) {
                        egret.Tween.get(this.tjjq_g).to({ "alpha": 0 }, 1000);
                        var timeid2 = egret.setTimeout(function (arg) {
                            this.tjjq_g.alpha = 1;
                            this.tjjq_g.visible = false;
                        }, this, 1000, "egret");
                    }
                    else {
                        this.btn_click({ "currentTarget": this.ok_b });
                    }
                }, this, 1500, "egret");
            }
            if (api.sj_id) {
                this.opt_g.visible = true;
                this.show_gdsj();
            }
            else if (this.adata.type == "jfs" && this.adata.kind == 2) {
                this.opt_g.visible = true;
                this.show_jfsopt();
            }
            else if (api.nhjfs) {
                this.opt_g.visible = true;
                this.show_jfsopt2();
            }
            else if (api.rename) {
                this.opt_g.visible = true;
                this.show_renameOpt();
            }
            else if (api.guide_rename) {
                this.opt_g.visible = true;
                this.show_guide_rename();
            }
            else if (api.opt) {
                this.opt_g.visible = true;
                this.show_chechaOpt();
            }
            else if (api.check_nextjq) {
                this.check_nextjq();
            }
            else {
                this.opt_g.visible = false;
                if (this.adata.type == "zinv" && this.adata.extra) {
                    var extra = this.adata.extra;
                    var add = mx.Lang.hzs68 + "+" + extra.guanxi;
                    if (extra.caiyi_num) {
                        add += "，" + mx.Tools.format(mx.Lang.hzs86, mx.Lang.hgcaiyi[Number(extra.caiyi_type) - 1], extra.caiyi_num);
                    }
                    this.con_t.textFlow = [
                        { text: this.format_cw(api.content, this.adata.type) },
                        { text: "  (" + add + ")", style: { "textColor": 0x46b330 } },
                    ];
                }
                else if (api.slgxxiu) {
                    var str = void 0, cor = void 0;
                    var aproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ActyProxy.NAME));
                    var start_time = mx.Tools.format_time(aproxy.acty_time[19].start, "yrsfm", 2, true);
                    switch (this.adata.type) {
                        case "cxtg"://初选成功
                            str = mx.Tools.format(mx.Lang.xxg27, start_time);
                            cor = 0x46b330;
                            break;
                        case "fxcg"://复选成功
                            str = mx.Lang.xxg28;
                            cor = 0x46b330;
                            break;
                        case "dxcg"://殿选成功
                            str = mx.Lang.xxg29;
                            cor = 0x46b330;
                            break;
                        case "cxycyl": //初选失败1
                        case "cxzdl": //初选失败2;
                        case "cxdml"://初选失败3
                            str = mx.Tools.format(mx.Lang.xxg27, start_time);
                            cor = 0xf73636;
                            break;
                        case "fxycyx": //复选失败1
                        case "fxgxd": //复选失败2
                        case "fxdml"://复选失败3
                            str = mx.Lang.xxg28;
                            cor = 0xf73636;
                            break;
                        case "fxsb"://殿选失败
                            str = mx.Lang.xxg29;
                            cor = 0xf73636;
                            break;
                    }
                    this.con_t.textFlow = [
                        { text: this.format_cw(api.content, this.adata.type) },
                        { text: str, style: { "textColor": cor } },
                    ];
                }
                else if (this.adata.type == "shiqin") {
                    var str = void 0, color = void 0;
                    if (this.adata.extra && this.adata.extra != -10 && this.adata.extra != 0) {
                        if (this.adata.extra > 0) {
                            str = mx.Tools.format(mx.Lang.hg0031, this.adata.qinmi, "+", this.adata.extra);
                            color = 0x46b330;
                        }
                        else {
                            str = mx.Tools.format(mx.Lang.hg0031, this.adata.qinmi, "", this.adata.extra);
                            color = 0xf73636;
                        }
                        this.adata.extra = -10; //已显示 
                    }
                    else if (this.adata.skill && this.cur_step == this.adata.len) {
                        var skill = this.adata.skill[0];
                        var skill_info = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", skill.id);
                        var extra1 = "";
                        var extra2 = "\n" + mx.Tools.format(mx.Lang.avg1, skill_info.name);
                        var arr = [15];
                        var dialog = void 0;
                        if (arr.indexOf(Number(skill.id)) == -1) {
                            dialog = this.format_cw(api.content, this.adata.type);
                        }
                        if (typeof skill.awards != 'undefined') {
                            var str_1 = "";
                            switch (Number(skill.awards[0].type)) {
                                case 1://1 金钱 
                                    str_1 = mx.Lang.ybi;
                                    break;
                                case 2:// 2 元宝
                                    str_1 = mx.Lang.ybao;
                                    break;
                                case 3:// 3 体力
                                    str_1 = mx.Lang.tili;
                                    break;
                                case 4:// 4 道具
                                    var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", skill.awards[0].id);
                                    str_1 = item.name;
                                    break;
                            }
                            extra1 = "\n（" + str_1 + (skill.awards[0].shuliang < 0 ? "" : "+") + skill.awards[0].shuliang + "）";
                        }
                        else {
                            var str_2 = "";
                            switch (Number(skill.id)) {
                                case 13:
                                    var temp = mx.Lang.hzs88;
                                    if (skill.name && skill.name != "") {
                                        str_2 = skill.xing + skill.name + temp;
                                    }
                                    else {
                                        if (skill.paiwei) {
                                            str_2 = mx.Tools.num2chinese(skill.paiwei) + (skill.sex == 2 ? mx.Lang.hzs03 : mx.Lang.hzs04) + temp;
                                        }
                                        else {
                                            str_2 = mx.Lang.hzs87;
                                        }
                                    }
                                    break;
                                case 14:
                                    str_2 = "所有妃子关系值+1";
                                    break;
                                case 15:
                                    dialog = skill.sitong.feizi_name + "竟与他国君主" + skill.sitong.user_name + "私通，意图秽乱皇室血统，还请陛下明察！";
                                    str_2 = "妃子调戏事件曝光";
                                    break;
                                case 16:
                                    str_2 = "获得双倍关系值";
                                    break;
                                case 17:
                                    str_2 = "其他妃子关系值-1";
                                    break;
                                case 20:
                                    str_2 = "打到告状妃子撤牌2天";
                                    break;
                                case 30:
                                    str_2 = "需连续宠幸3次";
                                    break;
                                case 36:
                                    str_2 = skill.feizi_info.name + "关系值-1";
                                    break;
                            }
                            if (str_2 != '') {
                                extra1 = "\n（" + str_2 + "）";
                            }
                        }
                        if (extra1 != '()') {
                            this.con_t.textFlow = [
                                { text: dialog },
                                { text: extra1, style: { "textColor": 0x46b330 } },
                                { text: extra2, style: { "textColor": 0xf73636 } },
                            ];
                        }
                        else {
                            this.con_t.textFlow = [
                                { text: dialog },
                                { text: extra2, style: { "textColor": 0xf73636 } },
                            ];
                        }
                        if (skill.id == 27) {
                            this.opt_g.visible = true;
                            this.show_hengxingbadao_select();
                        }
                    }
                    else if (this.adata.guitai == 0 && this.cur_step == this.adata.len) {
                        this.opt_g.visible = true;
                        this.show_guitai_select();
                    }
                    else {
                        this.con_t.text = this.format_cw(api.content, this.adata.type, this.adata.cd.id);
                        if (api.hy_skip) {
                            this.ok_b.visible = true;
                        }
                    }
                    if (this.cur_step == 1) {
                        var pproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
                        if (pproxy.res_hzs <= 0) {
                            this.con_t.textFlow = [
                                { text: api.content },
                                { text: str, style: { "textColor": color } },
                                { text: "\n" + mx.Lang.hg094, style: { "textColor": 0xff4b4b } }
                            ];
                        }
                        else {
                            this.con_t.textFlow = [
                                { text: api.content },
                                { text: str, style: { "textColor": color } },
                            ];
                        }
                    }
                }
                else if (this.adata.type.indexOf('tiaoxi') >= 0 && api.content.indexOf('{6}') < 0) {
                    this.con_t.textFlow = api.content;
                }
                else if (this.adata.type == "jfs" && this.adata.up && api.title) {
                    var cd = this.adata;
                    var color = mx.Tools.num2color(cd.cd.meili);
                    this.con_t.textFlow = [
                        { text: this.format_cw(api.content, this.adata.type) + "\n(" },
                        { text: cd.cd.name, style: { "textColor": color } },
                        { text: mx.Lang.jfs05 + "+" + cd.up + ")" }
                    ];
                }
                else if (this.adata.type == "jfs_over") {
                    var cd = this.adata;
                    var str = api.content;
                    str = str.replace("{", "{0{");
                    str = str.replace("}", "}0}");
                    str = this.format_cw(str, cd.type);
                    var arr = mx.Tools.setKeywordColor2(str, [mx.Tools.num2color(200)]);
                    if (cd.pass) {
                        var color = mx.Tools.num2color(cd.cd.meili);
                        arr.push({
                            text: "\n("
                        });
                        arr.push({
                            text: cd.cd.name, style: { "textColor": color }
                        });
                        arr.push({
                            text: mx.Lang.jfs05 + "+" + cd.up + ")"
                        });
                    }
                    this.con_t.textFlow = arr;
                }
                else if (this.adata.type == "ld" || this.adata.type == "ldzn") {
                    var cd = this.adata;
                    var arr = mx.Tools.setKeywordColor2(this.format_cw(api.content, this.adata.type), [mx.Tools.num2color(200)]);
                    this.con_t.textFlow = arr;
                }
                else if (this.adata.type == "zinv_xingge_select") {
                    this.opt_g.visible = true;
                    this.show_zinv_xingge_select();
                }
                else if (this.adata.type == "scdj" && this.adata.sctype != "fz_cg") {
                    this.con_t.text = this.format_cw(api.content, this.adata.type, this.adata.cd.id);
                }
                else {
                    this.con_t.text = this.format_cw(api.content, this.adata.type);
                    if (this.adata.type == "guide") {
                        if (api.sound_id) {
                            var cmk = this.get_sound_name(api.sound_id, 0, this.adata.sex);
                            if (RES.hasRes(cmk + "_mp3")) {
                                this.music_b.visible = true;
                                this.c_music = cmk;
                                this.play_music();
                            }
                        }
                    }
                }
                if (api.tx) {
                    this.init_zsfz_tx({ "avatar": api.tx, "name": api.uname });
                }
                else {
                    this.init_yxfz_tx({ "name": api.uname });
                }
                var tar = void 0;
                var avatar_arr = String(api.avatar).split("_");
                var avatar = Number(avatar_arr[0]);
                if (avatar == 0) {
                    this.role_g.visible = false;
                    this.me_g.visible = false;
                }
                else if (avatar == 1) {
                    tar = this.me_g;
                    this.role_g.visible = false;
                    this.me_g.visible = true;
                    var bq = avatar_arr[1];
                    if (bq) {
                        this.me_bq.source = "a1_" + bq + "_png";
                    }
                    else {
                        this.me_bq.source = "";
                    }
                }
                else {
                    tar = this.role_g;
                    this.me_g.visible = false;
                    this.role_g.visible = true;
                    if (this.adata.cd && avatar > mx.MX_COMMON.SC_LH_MAX && this.adata.cd.ren_lian && this.adata.cd.ren_lian != "") {
                        mx.Tools.url_image(this.adata.cd.ren_lian, null, this.get_mnres, this);
                    }
                    else {
                        this.role.source = api.role_p;
                        var res = RES.getRes(api.role_p);
                        if (res) {
                            this.role.height = res.textureHeight;
                            this.role.width = res.textureWidth;
                        }
                    }
                    if (avatar_arr[1]) {
                        this.bqing.source = api.bq_p;
                    }
                    else {
                        this.bqing.source = "";
                    }
                }
                var data = this.adata;
                var huaiyun = false;
                var timeleft = void 0;
                if (data.cd) {
                    var wqj_res = data.cd.wqj_res;
                    var start = data.cd.time;
                    var ctime = new Date().getTime() / 1000;
                    timeleft = wqj_res - (ctime - start);
                    var status_1 = data.cd.status;
                    status_1 = String(status_1).split("|");
                    var yun_arr = ["2", "3", "4"]; //是否怀孕
                    for (var m in yun_arr) {
                        if (status_1.indexOf(yun_arr[m]) >= 0) {
                            huaiyun = true;
                            break;
                        }
                    }
                }
                if (api.scene) {
                    this.bg.source = api.scene_p;
                    if (data.type == "shiqin" && timeleft > 0 && !huaiyun) {
                        this.bg.source = "s" + 1541 + "_jpg"; //温情酒背景
                        this.init_wqjaixin1();
                        this.init_wqjaixin2();
                    }
                }
                egret.Tween.removeTweens(this.role);
                egret.Tween.removeTweens(this.me_p);
                this.role_g.x = 0;
                this.me_g.x = 245;
                this.role_g.alpha = this.me_g.alpha = 1.0;
                if (!tar) {
                    return;
                }
                mx.TweenTool.getInstance().get_tween(tar, api.texiao);
                switch (this.adata.type) {
                    case "jfs":
                        if (api.title) {
                            this.name_t.text = mx.Tools.format(mx.Lang.jfs09, api.uname);
                            this.title.source = "avgemptytitle_png";
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        AVGView.prototype.init_wqjaixin1 = function () {
            var armature = mx.TweenTool.getInstance().get_dragon("axin");
            armature.display.x = 360;
            armature.display.y = 915;
            armature.animation.play("", 0);
            this.addChildAt(armature.display, 1);
            this.armature = armature;
        };
        AVGView.prototype.init_wqjaixin2 = function () {
            var ef1 = new mx.GeneralEffect("axin2");
            ef1.scaleX = ef1.scaleY = 2;
            ef1.x = 180;
            ef1.y = 855;
            ef1.play_by_times(-1);
            this.addChildAt(ef1, 3);
            var ef2 = new mx.GeneralEffect("axin2");
            ef2.scaleX = ef2.scaleY = 2;
            ef2.x = 540;
            ef2.y = 810;
            ef2.play_by_times(-1);
            this.addChildAt(ef2, 3);
        };
        AVGView.prototype.btn_click = function (e) {
            var cd = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            if (this.no_skip) {
                if (cd.type != 'tiaoxi' || e.currentTarget != this.exit_b) {
                    return;
                }
            }
            else if (e.currentTarget == this.ok_b && this.skipToOpt) {
                var api = this.jqs[0];
                while (api && !api.opt) {
                    this.jqs.shift();
                    api = this.jqs.length ? this.jqs[0] : null;
                }
                if (api) {
                    this.show_next();
                    return;
                }
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, AVGView.S_NAME);
            facade.sendNotification(mx.MX_NOTICE.AVG_END, cd, cd.type);
            switch (e.currentTarget) {
                case this.ok_b:
                    if (cd.notice_ok) {
                        facade.sendNotification(cd.notice_ok, cd.sdata_ok);
                    }
                    break;
                case this.exit_b:
                    if (cd.notice_exit) {
                        facade.sendNotification(cd.notice_exit, cd.sdata_exit);
                    }
                    break;
            }
            /*let pproxy = <PalaceProxy><any>(facade.retrieveProxy(PalaceProxy.NAME));
            let spt = AppConfig.check_not_support("share");
            if (!spt && cd.type == 'shiqin' && pproxy.wb_share_sj) {
                if (cd.notice_ok == MX_NOTICE.FRESH_FZ_LIST) {//如果正常完毕
                    facade.sendNotification(MX_NOTICE.POP_VIEW, {
                        "name": ShareShijianView.S_NAME
                    });
                } else if (cd.notice_ok == MX_NOTICE.POP_VIEW) {
                    pproxy.wb_share_chufa = true;
                }
            }*/
        };
        AVGView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.con_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_next, this);
            this.txi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.txi_click, this);
            this.music_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.play_music, this);
            if (this.c_music) {
                this.c_music = null;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_MUSIC, true);
            }
            this.opt_list.dataProvider = null;
            this.opt_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.opt_click, this);
            egret.Tween.removeTweens(this.txlove);
            egret.Tween.removeTweens(this.next_p);
            if (this.armature) {
                dragonBones.WorldClock.clock.remove(this.armature);
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.AVGMediator.NAME);
        };
        AVGView.S_NAME = "AVGView";
        AVGView.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return AVGView;
    }(mx.AlertView));
    mx.AVGView = AVGView;
    __reflect(AVGView.prototype, "mx.AVGView");
})(mx || (mx = {}));
//# sourceMappingURL=AVGView.js.map