/**
 *   @author mx
 *   @date 2015.2.25
 *   @desc 后宫数据管理
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
    var PalaceProxy = (function (_super) {
        __extends(PalaceProxy, _super);
        function PalaceProxy() {
            var _this = _super.call(this, PalaceProxy.NAME) || this;
            _this.scrollv = 0; //妃嫔一览滑动
            _this.cur_fzzn_id = 0;
            _this.mn_arr = [];
            //获取满足某一条件的美男
            _this.shiqin_page = 1;
            //未出嫁
            _this.hzs_list1 = {};
            _this.hzs_page1 = 1;
            _this.hzs_total1 = 1;
            //已婚
            _this.hzs_list2 = {};
            _this.hzs_page2 = 1;
            _this.hzs_total2 = 1;
            //私生子
            _this.hzs_list3 = {};
            _this.hzs_page3 = 1;
            _this.hzs_total3 = 1;
            _this.cur_hzs_type = 1;
            _this._currgift = 1;
            _this.hzhd_bg = "";
            _this.need_open = false;
            /*--------------储秀宫----------------*/
            _this.lxg_curfz = {}; //当前妃子info
            _this.anpai = false;
            _this.zhiding_lyin = false;
            _this.not_friend = false;
            _this.shijian = [];
            _this.pingjia_change = false;
            //玩吧分享小事件
            _this.wb_share_sj = null; //标记字段
            _this.wb_share_chufa = false; //是否要触发 方便avg后调用
            _this.renlian_muban = {
                //"1" : {"muban" : "hezuo_wbnhbx_nan1_20170829103926", "lihui" : "12402" ,"fx" : "hezuo_wbnhbx_mf1_20170829110401", "sex" : 2, "ab" : 0, "ap" : 0},
                //"2" : {"muban" : "hezuo_wbnhbx_nan2_20170829105123", "lihui" : "12403" ,"fx" : "hezuo_wbnhbx_mf2_20170829110421", "sex" : 2},
                //"3" : {"muban" : "hezuo_wbnhbx_nan3_20170829105207", "lihui" : "12405" ,"fx" : "hezuo_wbnhbx_mf3_20170829110448", "sex" : 2},
                //"4" : {"muban" : "hezuo_wbnhbx_nan4_20170829105250", "lihui" : "12406" ,"fx" : "hezuo_wbnhbx_mf4_20170829110545", "sex" : 2},
                //"5" : {"muban" : "hezuo_wbnhbx_nan5_20170829105314", "lihui" : "62301" ,"fx" : "hezuo_wbnhbx_mf5_20170829110624", "sex" : 2},
                "6": { "muban": "hezuo_wbnhbx_nan6_20170829105515", "lihui": "62401", "fx": "hezuo_wbnhbx_mf6_20170829110659", "sex": 2 },
                "7": { "muban": "hezuo_wbnhbx_nv1_20170829105551", "lihui": "11401", "fx": "hezuo_wbnhbx_wf1_20170829110737", "sex": 1, "ab": 0, "ap": 0 },
                "8": { "muban": "hezuo_wbnhbx_nv2_20170829105844", "lihui": "11404", "fx": "hezuo_wbnhbx_wf2_20170829110912", "sex": 1, "ab": 0, "ap": 0 },
                "9": { "muban": "hezuo_wbnhbx_nv3_20170829105933", "lihui": "41402", "fx": "hezuo_wbnhbx_wf3_20170829111148", "sex": 1, "ab": 0, "ap": 0 },
                "10": { "muban": "hezuo_wbnhbx_nv4_20170829105956", "lihui": "41403", "fx": "hezuo_wbnhbx_wf4_20170829111325", "sex": 1, "ab": 0, "ap": 0 },
                "11": { "muban": "hezuo_wbnhbx_nv5_20170829110036", "lihui": "61401", "fx": "hezuo_wbnhbx_wf5_20170829111347", "sex": 1, "ab": 0, "ap": 0 },
            };
            /*----翰林院----end----*/
            _this.xuetong_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12]; //已出血统
            _this.feizi_tujian = {}; //
            _this.hz_tujian = {};
            _this.feizi_tujian_info = {}; //包装的图鉴信息
            _this.hz_tujian_info = {};
            _this.fz_like = {};
            _this.zn_like = {};
            _this.tujian_tishi = false; //图鉴外部小红点
            return _this;
        }
        PalaceProxy.prototype.init_yxd_mn_d = function (data) {
            this.res_hzs = Number(data.hz_kongwei);
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            this.res_ltp = data.ltp;
            pProxy.set_item_num(2000, this.res_ltp.num);
            this.res_czbc = Number(data.baodian);
            pProxy.set_item_num(2005, this.res_czbc);
            this.mn_d = mx.Tools.arr2obj(data.feizi, "id");
            for (var k in this.mn_d) {
                if (mx.MX_COMMON.IN_GUIDE) {
                    if (Number(this.mn_d[k].mid) >= 310 && Number(this.mn_d[k].mid) <= 319) {
                        var gproxy = (this.facade.retrieveProxy(mx.GuideProxy.NAME));
                        var slt_info = gproxy.slt_info;
                        this.mn_d[k].name = slt_info.name;
                    }
                }
                // if (Number(this.mn_d[k].mid) == 308 && this.mn_d[k].huapi != '') {
                //     this.mn_d[k].avatar = this.mn_d[k].huapi;
                // }
                this.mn_d[k].time = new Date().getTime() / 1000;
            }
            this.yxd_time = new Date().getTime();
        };
        PalaceProxy.prototype.del_guide_fz = function () {
            for (var k in this.mn_d) {
                var c_mn = this.mn_d[k];
                if (Number(c_mn.mid) == 301 || Number(c_mn.mid) == 302) {
                    delete this.mn_d[k];
                    break;
                }
            }
        };
        PalaceProxy.prototype.init_fz_info = function (data) {
            if (this.mn_d && data.state == 1) {
                this.mn_d[data.id] = data;
                this.sendNotification(mx.MX_NOTICE.FRESH_FZ_LIST);
            }
        };
        PalaceProxy.prototype.init_yxd_zinv = function (data) {
            this.zinv = data.info;
            if (this.cur_fzzn_id && this.mn_d[this.cur_fzzn_id]) {
                this.mn_d[this.cur_fzzn_id].haizi = data.haizi;
                this.cur_fzzn_id = 0;
            }
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.YXDChildScreen.S_NAME);
        };
        Object.defineProperty(PalaceProxy.prototype, "feizi_n", {
            get: function () {
                var arr = mx.Tools.obj2arr(this.mn_d);
                return arr.length;
            },
            enumerable: true,
            configurable: true
        });
        PalaceProxy.prototype.save_weifen_cb = function (data) {
            var weifen = [];
            for (var i = 0; i < 13; i++) {
                weifen.push(0);
            }
            var temp = data.data;
            for (var k in temp) {
                weifen[Number(k) - 1] = Number(temp[k]);
            }
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.WeiFenAlert.S_NAME,
                "param": {
                    "mid": data.mid,
                    "weifen": weifen,
                    "chongai": data.pet
                }
            });
        };
        PalaceProxy.prototype.add_new_fz = function (data) {
            if (this.mn_d) {
                if (!this.mn_d[data.id]) {
                    if (data.mid < 1000) {
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", data.mid);
                        this.mn_d[data.id] = {
                            "id": data.id,
                            "mid": data.mid,
                            "meili": api.charm,
                            "pet": 3,
                            "weifen": data.weifen,
                            "cizi": "",
                            "name": api.hero_name,
                            "sex": api.Gender,
                            "status": 0,
                            "haizi": data.haizi || 0,
                            "chushen": api ? api.chushen : mx.Lang.zssj,
                            "gongdian": "",
                            "xingge": data.xingge,
                            "sihaizi": data.sihaizi,
                            "sb_level": 0,
                            "wqj_res": 0,
                            "muzu": data.muzu,
                            "caiyi1_type": data.caiyi1_type,
                            "caiyi2_type": data.caiyi2_type,
                            "caiyi1_num": data.caiyi1_num,
                            "caiyi2_num": data.caiyi2_num,
                        };
                    }
                    else {
                        this.mn_d[data.id] = {
                            "id": data.id,
                            "mid": data.mid,
                            "avatar": data.avatar,
                            "meili": data.meili,
                            "pet": 3,
                            "weifen": data.weifen,
                            "cizi": "",
                            "name": data.name,
                            "sex": data.sex,
                            "status": 0,
                            "haizi": data.haizi || 0,
                            "chushen": data.chushen,
                            "gongdian": "",
                            "zongzu_id": data.zongzu_id,
                            "zongzu": data.zongzu_name,
                            "jinzhu": data.jinzhu,
                            "jz_name": data.jz_name,
                            "xingge": data.xingge,
                            "sihaizi": data.sihaizi,
                            "skill": data.skill,
                            "xihao": data.xihao,
                            "sb_level": 0,
                            "daishu": data.daishu || null,
                            "huapi": data.huapi || "",
                            "wqj_res": 0,
                            "muzu": data.muzu,
                            "caiyi_type": data.caiyi_type,
                            "caiyi_num": data.caiyi_num,
                        };
                    }
                }
            }
            var lihui;
            if (data.mid < 1000) {
                lihui = data.mid;
            }
            else {
                lihui = data.avatar;
            }
            if (lihui && typeof this.feizi_tujian[lihui] == "undefined") {
                this.feizi_tujian[lihui] = 0;
                this.cal_tujian_tishi();
            }
        };
        PalaceProxy.prototype.cefeng_weifen = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0034;
                    break;
                case 1:
                    str = mx.Lang.h0052;
                    break;
                case 2:
                    str = mx.Lang.h0053;
                    break;
                case 3:
                    str = mx.Tools.format(mx.Lang.h0075, data.need + '');
                    break;
                case 4://册封成功
                    var p_d = {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": { "name": "", "weifen": "", "type": 1 }
                    };
                    var c_fz = void 0;
                    switch (mx.AppConfig.CURR_SCENE_ID) {
                        case mx.LGongTWScreen.S_NAME://冷宮探望
                            for (var k in this.lgfz_list) {
                                if (this.lgfz_list[k].mid == data.mid) {
                                    c_fz = this.lgfz_list[k];
                                    break;
                                }
                            }
                            this.mn_d[data.y_id] = this.lgfz_list[c_fz.id]; //进入冷宫必然获得妃子信息
                            this.mn_d[data.y_id]["status"] = 0;
                            this.mn_d[data.y_id]["cizi"] = "";
                            this.mn_d[data.y_id]["id"] = data.y_id;
                            this.mn_d[data.y_id]["sb_level"] = data.sb_level;
                            delete this.lgfz_list[c_fz.id];
                            p_d.param.notice_exit = mx.MX_NOTICE.SCENE_CHANGE;
                            p_d.param.sdata_exit = mx.LGongScreen.S_NAME;
                            c_fz.weifen = data.weifen;
                            c_fz.xingge = data.xingge;
                            break;
                        case mx.YXDFzScreen.S_NAME://养心殿妃子操作
                            c_fz = this.get_curr_mn(data.id);
                            c_fz.weifen = data.weifen;
                            this.jianjie.push({
                                "key_id": 6,
                                "msg": data.weifen,
                                "time": Math.floor(new Date().getTime() / 1000)
                            });
                            break;
                        default://恋爱册封
                            p_d.param.notice_exit = mx.MX_NOTICE.SCENE_CHANGE;
                            p_d.param.sdata_exit = mx.YueHuiScreen.S_NAME;
                            var api_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", data.mid);
                            c_fz = {
                                "weifen": 13,
                                "name": api_1.hero_name,
                                "sex": api_1.Gender,
                                "xingge": data.xingge,
                                "haizi": data.haizi
                            };
                            this.add_new_fz(data);
                            if (mx.AppConfig.CURR_SCENE_ID == mx.MainScreen.S_NAME && data.mid == 57) {
                                var aproxy = (this.facade.retrieveProxy(mx.ActyProxy.NAME));
                                aproxy.acty_hero_flag = true;
                                this.set_curr_mn(data.id);
                                this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, "srhg");
                                return;
                            }
                            var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                            // hproxy.yuehui.status = 1;
                            break;
                    }
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(data.weifen));
                    var xingbie = c_fz.sex || c_fz.xingbie;
                    p_d.param.name = c_fz.name;
                    p_d.param.weifen = xingbie == 1 ? api.weifeng : api.weifenb;
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.WeiFenAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    this.sendNotification(mx.MX_NOTICE.FRESH_WEIFEN);
                    return;
                case 5:
                    str = mx.Lang.h0059;
                    break;
                case 6:
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    str = Number(gproxy.user_vip) < mx.MX_COMMON.MAX_VIP_LV ? mx.Lang.p0142 : mx.Lang.p0143;
                    break;
                case 7:
                    str = mx.Lang.h0061; //已收入后宫
                    break;
                case 8:
                    str = mx.Lang.h0062; //已死亡
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.prototype.xiaozi_end = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0034;
                    break;
                case 1:
                    str = mx.Lang.hg018;
                    this.mn_d[data.id].cizi = "";
                    this.mn_d[data.id].meili = Number(this.mn_d[data.id].meili) - 3;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.YXDFzScreen.S_NAME);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.prototype.cizi_end = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.p0034;
                    break;
                case 1:
                    str = mx.Lang.hg016;
                    break;
                case 2:
                    this.res_czbc = Number(data.num);
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.set_item_num(2005, this.res_czbc);
                    this.mn_d[data.id].cizi = data.content;
                    this.mn_d[data.id].meili = Number(this.mn_d[data.id].meili) + 3;
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", this.mn_d[data.id].weifen);
                    var weifen = Number(this.mn_d[data.id].sex) == 1 ? api.weifeng : api.weifenb;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": {
                            "type": 3,
                            "name": this.mn_d[data.id].name,
                            "weifen": weifen,
                            "cizi": data.content
                        }
                    });
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.YXDFzScreen.S_NAME);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.prototype.sort_weifen = function () {
            var arr = mx.Tools.obj2arr(this.mn_d);
            arr = arr.sort(function (a, b) {
                return (Number(a.weifen) - Number(b.weifen)); //按层级关系排序
            });
            this.mn_arr = arr;
        };
        PalaceProxy.prototype.get_mn_list = function (type, all) {
            var arr = [];
            var obj = this.mn_arr;
            var num = 0;
            var num2 = 1;
            var now_time;
            for (var k in obj) {
                var c_mn = obj[k];
                switch (type) {
                    case "xinqing":
                        var xproxy = (this.facade.retrieveProxy(mx.XqinProxy.NAME));
                        var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_mn.weifen);
                        var mnres = void 0;
                        if (Number(c_mn.mid) > 1000 || (Number(c_mn.mid == 308) && c_mn.huapi != '')) {
                            mnres = mx.Tools.get_zn_res(c_mn.avatar, "jq");
                        }
                        else {
                            mnres = mx.Tools.get_mn_res(c_mn.mid, "dh");
                        }
                        var idx = xproxy.in_xing_qin.indexOf(c_mn.id);
                        if (Math.abs(Number(c_mn.status)) != 5 && Number(c_mn.mid) > 1000) {
                            arr.push({
                                "id": c_mn.id,
                                "hero": mnres,
                                "name": c_mn.name,
                                "meili": c_mn.meili,
                                "weifen": c_mn.sex == 1 ? api.weifeng : api.weifenb,
                                "weifen2": Number(c_mn.weifen),
                                "chongai": Number(c_mn.pet),
                                "dibg": "wfdchen_png",
                                "zibg": "cazdchen_png",
                                "namedi": true,
                                "res_time": c_mn.res_time || 0,
                                "xingge": c_mn.xingge,
                                "skill": c_mn.skill,
                                "xihao": c_mn.xihao,
                                "wqj_res": c_mn.wqj_res || 0,
                                "time": c_mn.time || 0,
                                "xq_select": idx > -1,
                                "xqin": true
                            });
                        }
                        break;
                    case "shiqin"://侍寝
                        if ((Number(c_mn.status) == 0 && typeof c_mn.sb_level != "undefined" && Number(c_mn.sb_level) == 0)) {
                            var arr2 = mx.Tools.obj2arr(this.mn_d);
                            if (all || ((this.shiqin_page - 1) * 8 <= num && Math.min(this.shiqin_page * 8, arr2.length) > num)) {
                                var api_2 = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", c_mn.weifen);
                                var mnres_1 = void 0;
                                if (Number(c_mn.mid) > 1000 || (Number(c_mn.mid == 308) && c_mn.huapi != '')) {
                                    mnres_1 = mx.Tools.get_zn_res(c_mn.avatar, "jq");
                                }
                                else {
                                    mnres_1 = mx.Tools.get_mn_res(c_mn.mid, "dh");
                                }
                                arr.push({
                                    "id": c_mn.id,
                                    "mid": c_mn.mid,
                                    "idx": num2,
                                    "hero": mnres_1,
                                    "name": c_mn.name,
                                    "meili": c_mn.meili,
                                    "weifen": c_mn.sex == 1 ? api_2.weifeng : api_2.weifenb,
                                    "weifen2": Number(c_mn.weifen),
                                    "chongai": Number(c_mn.pet),
                                    "dibg": "xqiubg_png",
                                    "zibg": "cazdchen_png",
                                    "namedi": true,
                                    "res_time": c_mn.res_time || 0,
                                    "xingge": c_mn.xingge,
                                    "skill": c_mn.skill,
                                    "xihao": c_mn.xihao,
                                    "wqj_res": c_mn.wqj_res || 0,
                                    "time": c_mn.time || 0,
                                    "ren_lian": c_mn.ren_lian || "",
                                });
                                num2++;
                            }
                            num++;
                        }
                        break;
                    case "normal":
                        if (Number(c_mn.status) == 0 && Number(c_mn.sb_level) == 0) {
                            arr.push(c_mn);
                        }
                        break;
                    default:
                        now_time = new Date().getTime();
                        var c_delay = Math.floor((now_time - this.yxd_time) / 1000);
                        if (Number(c_mn.status) != -5 && Number(c_mn.status) != 5) {
                            if (c_mn.res_time) {
                                c_mn.res_time -= c_delay;
                            }
                            arr.push(c_mn);
                        }
                        break;
                }
            }
            this.yxd_time = now_time || this.yxd_time;
            return arr;
        };
        PalaceProxy.prototype.set_curr_mn = function (mn) {
            this.curr_mn = mn;
        };
        PalaceProxy.prototype.get_curr_mn = function (mn) {
            if (this.mn_d) {
                var id = mn || this.curr_mn;
                return this.mn_d[id];
            }
            return null;
        };
        PalaceProxy.prototype.get_curr_mn_bymid = function (mn) {
            if (this.mn_d) {
                for (var k in this.mn_d) {
                    if (mn == Number(this.mn_d[k].mid) && Number(this.mn_d[k].status) != -5 && Number(this.mn_d[k].status) != 5) {
                        return this.mn_d[k];
                    }
                }
            }
            return null;
        };
        PalaceProxy.prototype.add_yxd_mn = function (data) {
            if (this.mn_d) {
                this.mn_d[data.id] = data;
                var lihui = void 0;
                if (data.mid < 1000) {
                    lihui = data.mid;
                }
                else {
                    lihui = data.avatar;
                }
                if (lihui && typeof this.feizi_tujian[lihui] == "undefined") {
                    this.feizi_tujian[lihui] = 0;
                    this.cal_tujian_tishi();
                }
            }
        };
        PalaceProxy.prototype.lianyin_nwf_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    var idx = this.get_hz_idx({ id: data.id });
                    this.update_hzs_list();
                    var hz = {};
                    if (idx >= 0) {
                        hz = this.hzs_list1[this.hzs_page1][idx];
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": {
                            "type": 4,
                            "name": hz.xing + hz.name,
                            "xingbie": hz.sex,
                            "weifen": hz.fenghao,
                            "mingfen": mx.Lang.mflx[0],
                            "zhangren": data.hunpei,
                        }
                    });
                    this.res_hzs++;
                    break;
                case 2:
                    msg = mx.Lang.hzs36;
                    break;
                case 3:
                    msg = mx.Lang.hzs43;
                    this.update_hzs_list();
                    break;
                case 4:
                    msg = mx.Lang.hzs44;
                    break;
                case 6://黑市中不能和亲
                    msg = mx.Lang.hzs84;
                    break;
                case 7:
                    msg = mx.Lang.hzs85;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.lianyin_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.hzs30;
                    break;
                case 2:
                    msg = mx.Lang.hzs31;
                    //this.res_hzs ++;
                    var idx = this.get_hz_idx({ id: data.id });
                    if (idx >= 0) {
                        this.hzs_list1[this.hzs_page1][idx].res = 3600 * 48;
                        this.sendNotification(mx.MX_NOTICE.UPDATE_HZS);
                        if (mx.MX_COMMON.IN_GUIDE == 2) {
                            this.sendNotification(mx.MX_NOTICE.COMP_GUIDE); //结缘过后结束本段引导
                            this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                        }
                    }
                    //指定结缘
                    if (this.zhiding_user_id != -1) {
                        this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                            'uid': this.zhiding_user_id,
                            "mtype": 3,
                            "str": mx.Lang.wbzdly
                        });
                    }
                    if (Number(data.choose)) {
                        var info = mx.AppConfig.CURR_SCENE_ID == mx.HZSuoScreen.S_NAME ? this.cur_zn_info : this.chat_zinv_info;
                        var obj = {
                            "pinli": data.pinli,
                            "avatar": info.avatar,
                            "hname": info.xing + info.name,
                            "meili": info.meili,
                            "skill": info.skill,
                            "time": data.now,
                            "mid": Number(data.id) + 1000,
                            "sex": info.sex,
                            "zinv_id": data.id
                        };
                        var arr = [];
                        for (var k in obj) {
                            arr.push(obj[k]);
                        }
                        mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_YIN, arr);
                    }
                    this.sendNotification(mx.MX_NOTICE.CHAT_ZINV_LY);
                    break;
                case 3:
                    msg = mx.Lang.hzs36;
                    break;
                case 4:
                    msg = mx.Lang.hzs37;
                    break;
                case 5:
                    msg = mx.Lang.hzs38;
                    break;
                case 6:
                    msg = mx.Lang.hzs43;
                    this.update_hzs_list();
                    break;
                case 7:
                    msg = mx.Lang.hzs44;
                    break;
                case 9://生病状态不能结缘
                    msg = mx.Lang.hzs81;
                    var idx2 = this.get_hz_idx({ id: data.id });
                    if (idx2 >= 0) {
                        this.hzs_list1[this.hzs_page1][idx2].sb_level = data.sb_level;
                        this.sendNotification(mx.MX_NOTICE.UPDATE_HZS);
                    }
                    break;
                case 10://黑市中不能和亲
                    msg = mx.Lang.hzs84;
                    break;
                case 11:
                    msg = mx.Lang.hzs85;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.lenggong_cb = function (data) {
            var str;
            if (data.state) {
                var chero = this.get_curr_mn(data.id);
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", chero.weifen);
                var weifen = Number(chero.sex) == 1 ? api.weifeng : api.weifenb;
                var notice = mx.MX_NOTICE.SCENE_CHANGE;
                var tname = mx.YXDianScreen.S_NAME;
                if (mx.AppConfig.CURR_SCENE_ID == mx.ShiJianScreen.S_NAME) {
                    notice = null;
                }
                if (mx.MX_COMMON.IN_GUIDE) {
                    tname = mx.MainScreen.S_NAME;
                }
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.ShengZhiAlert.S_NAME,
                    "param": {
                        "type": 2,
                        "name": chero.name,
                        "weifen": weifen,
                        "notice_exit": notice,
                        "sdata_exit": tname,
                    }
                });
                this.mn_d[data.id].status = 5;
                this.add_lgfz(chero); //向冷宮里插入数据。
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
            }
        };
        //宫斗事件回调
        PalaceProxy.prototype.sq_event_cb = function (data) {
            var str;
            var change_pet2 = 0;
            var change_pet1 = 0;
            if (data.state) {
                for (var k in data.feizi) {
                    var feizi = data.feizi[k];
                    var mn = this.mn_d[feizi.id];
                    if (mn.wqj_res) {
                        feizi.wqj_res = mn.wqj_res;
                        feizi.time = mn.time;
                    }
                    if (mn.avatar) {
                        feizi.avatar = mn.avatar;
                    }
                    if (Number(feizi.id) == Number(data.id)) {
                        change_pet1 = Math.abs(mn.pet - feizi.pet);
                    }
                    else {
                        change_pet2 = Math.abs(mn.pet - feizi.pet);
                    }
                    //this.mn_d[feizi.id] = feizi;
                    if (this.mn_d[feizi.id]) {
                        for (var i in feizi) {
                            this.mn_d[feizi.id][i] = feizi[i];
                        }
                    }
                }
                if (Number(data.lg_fid)) {
                    this.mn_d[data.lg_fid].status = -5;
                    this.add_lgfz(this.mn_d[data.lg_fid]);
                }
                this.sort_weifen();
                this.sendNotification(mx.MX_NOTICE.FRESH_FZ_LIST);
                var ad = { "id": data.id, "change_pet1": change_pet1, "change_pet2": change_pet2 };
                this.sendNotification(mx.MX_NOTICE.AVG_FRESH, ad, mx.MX_AVG_CONST.AVG_T_GDSJ);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
            }
        };
        PalaceProxy.prototype.scdj_fz_cb = function (data) {
            var str = mx.Lang.err01;
            var c_mn;
            if (mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME) {
                c_mn = this.cur_zn_info;
            }
            else if (mx.AppConfig.PREV_SCENE_ID == mx.YXDFzScreen.S_NAME) {
                c_mn = this.get_curr_mn(data.id);
            }
            else if (mx.MX_COMMON.IN_GUIDE && mx.AppConfig.CURR_SCENE_ID == mx.YXDianScreen.S_NAME) {
                c_mn = this.get_curr_mn(data.id);
            }
            else if (mx.AppConfig.CURR_SCENE_ID == mx.XQBYuanScreen.S_NAME) {
                var xproxy = (this.facade.retrieveProxy(mx.XqinProxy.NAME));
                c_mn = xproxy.send_zn_info;
            }
            switch (data.state) {
                case 0://沒有這個妃子
                    str = mx.Lang.hzs54;
                    break;
                case 1://沒有這個道具
                    break;
                case 2://道具數量不足
                    str = mx.Lang.p0018;
                    break;
                case 3://賞賜成功,跳AVG
                    if (data.item_id) {
                        var pproxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                        pproxy.set_item_num(data.item_id, data.item_num);
                    }
                    this.sendNotification(mx.MX_NOTICE.SJ_SBING_UPDATE, data);
                    if (!c_mn) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.sc013 });
                        return;
                    }
                    var cd = data.up;
                    if (cd) {
                        if (typeof cd.pet != "undefined") {
                            c_mn.pet = cd.pet;
                        }
                        //cd.shijian//当前状态的结束时间，客户端不使用
                        if (typeof cd.status != "undefined") {
                            c_mn.status = cd.status;
                        }
                        //cd.time//宠爱值变化时间戳，客户端不使用
                        if (typeof cd.res_time != "undefined") {
                            c_mn.res_time = cd.res_time;
                        }
                        //温情酒时间
                        if (typeof cd.wqj_res != "undefined") {
                            c_mn.wqj_res = cd.wqj_res;
                            c_mn.time = (new Date().getTime()) / 1000;
                        }
                        //生病时间
                        if (typeof cd.jiankang != "undefined") {
                            c_mn.jiankang = cd.jiankang;
                        }
                        if (typeof cd.sb_level != "undefined") {
                            c_mn.sb_level = cd.sb_level;
                        }
                        this.sendNotification(mx.MX_NOTICE.XINGQIN_ZINV);
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "scdj",
                            "cd": c_mn,
                            "sctype": "fz_cg",
                            "item_id": data.item_id //物品id
                        }
                    });
                case 4://沒有生病,跳AVG
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "scdj",
                            "cd": c_mn,
                            "sctype": "fz_by",
                            "item_id": data.item_id //物品id
                        }
                    });
                    return;
                case 5://沒有怀孕，跳avg
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "scdj",
                            "cd": c_mn,
                            "sctype": "fz_yh",
                            "item_id": data.item_id //物品id
                        }
                    });
                    return;
                case 6:// 没有难产过不能赠送
                    str = mx.Lang.sc012;
                    break;
                case 7:// 元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 8://被掠夺走
                    str = mx.Lang.sc014;
                    break;
                case 9://不能赠送返祖丹 不符合使用要求 非特殊血妃子/子女时（中原血，日本血，神话血），妃子会拒绝
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "scdj",
                            "cd": c_mn,
                            "sctype": "fz_nozhongzu",
                            "item_id": data.item_id //物品id
                        }
                    });
                    return;
                case 10://本次怀孕已经送过返祖丹
                    str = mx.Lang.sc022;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.prototype.shiqin_succ = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.hg014; //没有这个妃子
                    break;
                case 2:
                    str = mx.Lang.hg015; //没有绿头牌
                    break;
                case 3://更新美男数据                    
                    var c_id = data.id;
                    var c_mn = this.get_curr_mn(c_id);
                    var pet = Number(c_mn.pet) || 0;
                    var dup = data.up;
                    var new_yun = false;
                    var extra = 0;
                    this.is_in_avg = true;
                    if (dup) {
                        extra = Number(dup.f_add);
                        c_mn.pet = Number(dup.pet);
                        if (typeof data.skill != 'undefined' && Number(data.skill[0].id) == 32) {
                            var skill = data.skill[0];
                            var temp_status = c_mn.status;
                            var temp_time = c_mn.res_time;
                            c_mn.status = skill.huaiyun.status; //侍寝怀孕
                            c_mn.res_time = this.mn_d[skill.huaiyun.zhengchang_id].res_time;
                            this.mn_d[skill.huaiyun.zhengchang_id].status = temp_status;
                            this.mn_d[skill.huaiyun.zhengchang_id].res_time = temp_time;
                        }
                        else if (dup.status) {
                            if (c_mn.status != dup.status) {
                                c_mn.status = dup.status; //侍寝怀孕
                                this.res_hzs = this.res_hzs - Number(dup.status) + 1;
                                c_mn.res_time = 21600;
                                new_yun = true;
                            }
                        }
                        this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.YXDFzScreen.S_NAME); //刷新妃子操作界面，有可能需改怀孕状态
                    }
                    pet = c_mn.pet - pet - extra;
                    this.gd_event = data.gongdou;
                    //更新绿头牌数量
                    if (this.res_ltp) {
                        this.res_ltp.num = Number(data.ltp);
                        var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                        pProxy.set_item_num(2000, this.res_ltp.num);
                    }
                    //skill 38-44之间的特殊处理不知道为什么屏蔽了，为了不引起报错，先屏蔽这里对skill变量的使用，
                    // if(Number(data.skill[0].id) >= 38 &&Number(data.skill[0].id) <= 44){
                    //      //this.sendNotification(MX_NOTICE.CS_GET_DATA, { "t": MX_NETS.CS_ZLCB_FRESH});
                    // }
                    this.show_fz_dia(c_mn, "shiqin", data, pet, extra, new_yun);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 23 });
                    var spt = mx.AppConfig.check_not_support("share");
                    if (!spt) {
                        if (data.sj) {
                            this.wb_share_sj = data.sj;
                        }
                        else {
                            this.wb_share_sj = [];
                            this.wb_share_sj = null;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 4, "add": 1 });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            this.sendNotification(mx.MX_NOTICE.FRESH_FZ_LIST, "reset");
        };
        PalaceProxy.prototype.init_hzc_item = function (data) {
            switch (data.state) {
                case 0:
                    this.hzc_list = data.data;
                    this.taifu_type = Number(data.type);
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.HZClassroomScreen.S_NAME
                    });
                    break;
                case 1:
                    ////console.log("参数错误");
                    break;
            }
        };
        PalaceProxy.prototype.init_hzs_data = function (data) {
            this.hzs_xwei = data.xiwei;
            this.res_sswj = Number(data.sswj);
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            pProxy.set_item_num(2019, this.res_sswj);
            var type = data.type;
            var now_time = Math.floor(new Date().getTime() / 1000);
            if (data.info1) {
                for (var i = 0; i < data.info1.length; i++) {
                    var d = data.info1[i];
                    d.over_time = d.res_time ? now_time + Number(d.res_time) : 0;
                    if (Number(d.zhuangtai) == 2) {
                        var lihui = d.avatar;
                        if (lihui && typeof this.hz_tujian[lihui] == "undefined") {
                            this.hz_tujian[lihui] = 0;
                            this.cal_tujian_tishi();
                        }
                    }
                }
            }
            if (type > 0) {
                this['hzs_page' + type] = Number(data.page);
                this['hzs_total' + type] = Number(data['total' + type]);
                this['hzs_list' + type][this['hzs_page' + type]] = data['info' + type];
            }
            else {
                this.hzs_total1 = Number(data.total1);
                this.hzs_total2 = Number(data.total2);
                this.hzs_total3 = Number(data.total3);
                this.hzs_list1[1] = data.info1;
                this.hzs_list2[1] = data.info2;
                this.hzs_list3[1] = data.info3;
            }
            var pinli = mx.ApiTool.getAPI(mx.MX_APINAME.PINLI);
            this.hzs_gift = [];
            for (var i = 0; i < pinli.length; i++) {
                var d = pinli[i];
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', d.item_id);
                if (api) {
                    d.price = api.Buyprice2;
                }
                if (!this.hzs_gift[d.g_id]) {
                    this.hzs_gift[d.g_id] = [];
                }
                if (this.hzs_gift[d.g_id][0] && this.hzs_gift[d.g_id][0].name) {
                    d.name = this.hzs_gift[d.g_id][0].name;
                }
                this.hzs_gift[d.g_id].push(d);
            }
            var jwei = mx.ApiTool.getAPI(mx.MX_APINAME.FENGJUE);
            this.jwei_data = { 1: [], 2: [] };
            for (var i = 0; i < jwei.length; i++) {
                var d = jwei[i];
                this.jwei_data[d.sex].push(d);
            }
            if (!this.need_open) {
                this.sendNotification(mx.MX_NOTICE.UPDATE_HZS);
            }
            else {
                this.need_open = false;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
            }
        };
        PalaceProxy.prototype.get_jwei = function (data) {
            var jwei = this.jwei_data[data.sex];
            for (var i = 0; i < jwei.length; i++) {
                if (data.meili >= jwei[i].meili) {
                    return jwei[i].juewei;
                }
            }
            return '';
        };
        PalaceProxy.prototype.speed_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.hzs27;
                    break;
                case 2:
                case 3:
                    msg = data.state == 2 ? mx.Lang.hzs28 : mx.Lang.hzs29;
                    var idx = this.get_hz_idx({ id: data.id });
                    if (idx >= 0) {
                        var cd = this.hzs_list1[this.hzs_page1][idx];
                        cd.zhuangtai = data.state == 2 ? 1 : 2;
                        cd.over_time = cd.over_time - Number(data.jiasu);
                        cd.pingjia = data.state == 2 ? "???" : cd.pingjia;
                        cd.xingge = data.state == 3 ? data.xingge : cd.xingge;
                        cd.skill = cd.zhuangtai == 2 ? data.skill : cd.skill;
                        this.sendNotification(mx.MX_NOTICE.UPDATE_HZS);
                        if (mx.MX_COMMON.IN_GUIDE) {
                            if (cd.zhuangtai == 2) {
                                this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                                    "gkey": "m_hzs", "touch": "s_hz_js2", "gid": 35
                                });
                            }
                            this.sendNotification(mx.MX_NOTICE.GET_GUIDE); //下一步引导
                        }
                        if (data.state == 3) {
                            var lihui = cd.avatar;
                            if (lihui && typeof this.hz_tujian[lihui] == "undefined") {
                                this.hz_tujian[lihui] = 0;
                                this.cal_tujian_tishi();
                            }
                        }
                    }
                    break;
                case 4:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                        "sdata_exit": mx.QBuyYbiView.S_NAME,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case 5:
                    msg = data.jieduan == 1 ? mx.Lang.hzs49 : mx.Lang.hzs48;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.cefeng_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    var name_1 = '';
                    var idx = this.get_hz_idx({ id: data.id });
                    if (idx >= 0) {
                        var hz = this.hzs_list1[this.hzs_page1][idx];
                        hz.fenghao = data.fenghao;
                        name_1 = hz.xing + hz.name;
                        this.sendNotification(mx.MX_NOTICE.UPDATE_HZS);
                    }
                    var cmd = void 0;
                    if (mx.MX_COMMON.IN_GUIDE == 2) {
                        cmd = mx.MX_NOTICE.GET_GUIDE;
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ShengZhiAlert.S_NAME,
                        "param": {
                            "type": 1,
                            "name": name_1,
                            "weifen": data.fenghao,
                            "notice_exit": cmd
                        }
                    });
                    break;
                case 2:
                    msg = mx.Lang.hzs24;
                    break;
                case 3:
                    msg = mx.Lang.hzs40;
                    break;
                case 4:
                    msg = mx.Lang.hzs41;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.hz_cm_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.hzs25;
                    if (this.hzs_list1) {
                        var idx = this.get_hz_idx({ id: data.id });
                        if (idx >= 0) {
                            this.hzs_list1[this.hzs_page1][idx].name = data.name;
                            this.sendNotification(mx.MX_NOTICE.UPDATE_HZS);
                            if (mx.MX_COMMON.IN_GUIDE) {
                                if (mx.MX_COMMON.IN_GUIDE == 1) {
                                    this.sendNotification(mx.MX_NOTICE.NEXT_GUIDE);
                                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                                    return;
                                }
                                else if (mx.MX_COMMON.IN_GUIDE == 2) {
                                    this.sendNotification(mx.MX_NOTICE.GET_GUIDE);
                                }
                            }
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.NAME_CIMING, data.name);
                        }
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.NAME_CIMING, data.name);
                    }
                    break;
                case 2:
                    msg = mx.Lang.hzs26;
                    break;
                case 3:
                    msg = mx.Lang.hzs34;
                    break;
                case 4:
                    msg = mx.Lang.hzs47;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.lianyin_stop_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.hzs35;
                    var idx = this.get_hz_idx({ id: data.id });
                    if (idx >= 0) {
                        this.hzs_list1[this.hzs_page1][idx].res = null;
                        this.sendNotification(mx.MX_NOTICE.UPDATE_HZS);
                    }
                    break;
                case 2:
                    msg = mx.Lang.hzs43;
                    this.update_hzs_list();
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.kuojian_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.hzs39;
                    break;
                case 1:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                        "sdata_exit": mx.QBuyYbiView.S_NAME,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case 2:
                    msg = mx.Lang.hzs33;
                    this.hzs_xwei = data.xiwei;
                    this.res_hzs++;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_HZS);
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.set_hz_data = function (data) {
            var idx = this.get_hz_idx({ id: data.id });
            if (idx >= 0) {
                for (var k in data) {
                    this.hzs_list1[this.hzs_page1][idx][k] = data[k];
                }
            }
        };
        Object.defineProperty(PalaceProxy.prototype, "curr_gift", {
            get: function () {
                return this.hzs_gift[this._currgift];
            },
            set: function (id) {
                this._currgift = id;
            },
            enumerable: true,
            configurable: true
        });
        PalaceProxy.prototype.update_hzs_list = function () {
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { t: mx.MX_NETS.CS_HZS_DATA, type: 1, page: this.hzs_page1 });
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { t: mx.MX_NETS.CS_HZS_DATA, type: 2, page: this.hzs_page2 });
        };
        PalaceProxy.prototype.get_hz_idx = function (data) {
            var cdata = this.hzs_list1[this.hzs_page1];
            if (!cdata) {
                return -1;
            }
            for (var i = 0; i < cdata.length; i++) {
                var cd = cdata[i];
                if (cd.id == data.id) {
                    return i;
                }
            }
            return -1;
        };
        PalaceProxy.prototype.guizu_huapi_not = function (data) {
            var mid = Number(data.mid);
            return (mid < 1000 && mid != 308) || (mid == 308 && data.huapi == '');
        };
        PalaceProxy.prototype.init_lgfz_list = function (data) {
            this.lgfz_list = mx.Tools.arr2obj(data.feizi, "id");
        };
        PalaceProxy.prototype.set_curr_fzid = function (mn) {
            this.curr_fzid = mn;
        };
        PalaceProxy.prototype.get_curr_lgfz = function (mn) {
            if (this.lgfz_list) {
                var id = mn || this.curr_fzid;
                //0健康|2怀孕|1生病|3怀孕两个|4怀孕3个|5死亡|6撤牌|-1被打胎
                return this.lgfz_list[id];
            }
            return null;
        };
        PalaceProxy.prototype.add_lgfz = function (arr) {
            if (!this.lgfz_list) {
                this.lgfz_list = [];
            }
            this.lgfz_list[arr["id"]] = arr;
        };
        PalaceProxy.prototype.get_lgfz_list = function () {
            return mx.Tools.obj2arr(this.lgfz_list) || null;
            //return this.lgfz_list || null;
        };
        PalaceProxy.prototype.add_longgongfz = function (data) {
            for (var k in this.lgfz_list) {
                if (Number(this.lgfz_list[k].id) == Number(data.id)) {
                    this.lgfz_list[k].id = Number(data.cold_id);
                    this.mn_d[data.id].status = -5;
                    break;
                }
            }
        };
        Object.defineProperty(PalaceProxy.prototype, "cur_cxgfz", {
            get: function () {
                return this.lxg_curfz;
            },
            set: function (data) {
                this.lxg_curfz = data;
            },
            enumerable: true,
            configurable: true
        });
        PalaceProxy.prototype.set_feizi_mid = function (id) {
            this._feizi_mid = id;
        };
        PalaceProxy.prototype.add_jianjie = function (key_id, msg) {
            this.jianjie.push({
                "key_id": key_id,
                "msg": msg ? msg : "",
                "time": Math.floor(new Date().getTime() / 1000)
            });
        };
        PalaceProxy.prototype.feizi_jianjie_cb = function (data) {
            if (typeof data.state != "undefined") {
                switch (Number(data.state)) {
                    case 2://砍价的对象结缘已过时
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kj022 });
                        if (this.sjian_ly_info) {
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                                "id": this.sjian_ly_info.id,
                            });
                        }
                        return;
                    case 1://聊天频道被买走
                        var cproxy = (this.facade.retrieveProxy(mx.ChatProxy.NAME));
                        var info = cproxy.zinv_selected;
                        var str = mx.Lang["cxg0" + (14 + Math.floor(Math.random() * 2))];
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                        if (this.sjian_ly_info) {
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                                "id": this.sjian_ly_info.id,
                            });
                        }
                        return;
                    case 0://撤回
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.cxg016 });
                        if (this.sjian_ly_info) {
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SHIJIAN_LY_DEAL,
                                "id": this.sjian_ly_info.id,
                            });
                        }
                        return;
                }
            }
            this.jianjie = [];
            this.jianjie_type = Number(data.type);
            if (Number(data.type) != 10) {
                this.hzhd_bg = ""; //储秀宫预加载
            }
            var net = [
                {
                    "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                    "type": "5",
                }
            ];
            switch (Number(data.type)) {
                case 1://养心殿妃子经历简介
                    this.jianjie = data.data;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.YXDFzScreen.S_NAME);
                    break;
                case 7://掠夺，他人子女详情
                    this.not_friend = !(Number(data.guanxi) == 1 || Number(data.guanxi) == 3);
                case 2: //储秀宫 世界结缘
                case 8: //处置俘虏
                case 13://储秀宫 指定结缘
                    this.anpai = false;
                    this.lxg_curfz.info = data.data;
                    if (Number(data.type) != 8) {
                        this.hzhd_bg = mx.Tools.get_bb_res("znbg", 2, this.lxg_curfz.data.avatar, Number(this.lxg_curfz.data.meili));
                    }
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.CXGongFzScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case 11://结缘聊天查看详情
                    var data2 = data.zinv_info;
                    var cproxy = (this.facade.retrieveProxy(mx.ChatProxy.NAME));
                    data2.pinli = cproxy.pinli_selected;
                    this.lxg_curfz.data = data2;
                    this.anpai = false;
                    this.lxg_curfz.info = data.data;
                    this.hzhd_bg = mx.Tools.get_bb_res("znbg", 2, data.zinv_info.avatar, Number(data.zinv_info.meili));
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.CXGongFzScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case 14://事件里的指定结缘
                    this.lxg_curfz.data = data.zinv_info;
                    this.anpai = false;
                    this.lxg_curfz.info = data.data;
                    this.zhiding_lyin = true;
                    this.hzhd_bg = mx.Tools.get_bb_res("znbg", 2, data.zinv_info.avatar, Number(data.zinv_info.meili));
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.CXGongFzScreen.S_NAME,
                        "param": { "net": net }
                    });
                    break;
                case 3://冷宫
                    this.jianjie = data.data;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LGongTWScreen.S_NAME);
                    break;
                case 4://随便安排一个
                    if (data.zinv_info) {
                        this.anpai_mid = data.mid;
                        this.lxg_curfz.data = data.zinv_info;
                        this.lxg_curfz.info = data.data;
                        //this.jianjie = data.data;
                        this.anpai = true;
                        this.hzhd_bg = mx.Tools.get_bb_res("znbg", 2, data.zinv_info.avatar, Number(data.zinv_info.meili));
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.CXGongFzScreen.S_NAME,
                            "param": { "net": net }
                        });
                    }
                    else {
                        if (data.mid > 0) {
                            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hg075 });
                        }
                        else {
                            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hg074 });
                        }
                    }
                    break;
                case 5://教坊司
                    this.jianjie = data.data;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSYJXQScreen.S_NAME);
                    break;
                case 6://教坊司随机
                    if (data.jfs_info && data.jfs_info.avatar) {
                        this.jianjie = data.data;
                        var wproxy = (this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                        wproxy.set_cur_mn(data.jfs_info);
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JFSYJXQScreen.S_NAME);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jfs26 });
                    }
                    break;
                case 9://囚凤宫
                    this.jianjie = data.data;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_QFG_DESC);
                    break;
                case 10://子女互动界面
                    this.jianjie = data.data;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HzHudongScreen.S_NAME);
                    break;
                case 12: //聊天结缘砍价
                case 15://重新砍价
                    if (!this.hzs_gift) {
                        var pinli = mx.ApiTool.getAPI(mx.MX_APINAME.PINLI);
                        this.hzs_gift = [];
                        for (var i = 0; i < pinli.length; i++) {
                            var d = pinli[i];
                            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, 'id', d.item_id);
                            if (api) {
                                d.price = api.Buyprice2;
                            }
                            if (!this.hzs_gift[d.g_id]) {
                                this.hzs_gift[d.g_id] = [];
                            }
                            if (this.hzs_gift[d.g_id][0] && this.hzs_gift[d.g_id][0].name) {
                                d.name = this.hzs_gift[d.g_id][0].name;
                            }
                            this.hzs_gift[d.g_id].push(d);
                        }
                    }
                    //礼盒大于当前
                    var cd = void 0;
                    if (Number(data.type) == 12) {
                        var cproxy_1 = (this.facade.retrieveProxy(mx.ChatProxy.NAME));
                        cd = cproxy_1.chat_lyzn_data;
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, { name: mx.HzLyinGiftPop.S_NAME, param: { "meili": cd.other.meili, "kanjia": cd.other.pinli, "zinv_id": cd.other.zinv_id } });
                    }
                    else {
                        cd = this.sjian_ly_info;
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, { name: mx.HzLyinGiftPop.S_NAME, param: { "sj_id": cd.id, "meili": cd.meili, "kanjia": cd.pinli, "zinv_id": cd.zinv_id, "re_kanjia": true, "cxg_id": cd.cxg_id } });
                    }
                    break;
                case 16://相国寺 过世妃嫔
                    this.jianjie = data.data;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSQueen.S_NAME);
                    break;
                case 17://黑市查看他人子女
                    var hproxy = (this.facade.retrieveProxy(mx.HeiShiProxy.NAME));
                    var info = hproxy.jump_zinv_info;
                    this.jianjie = data.data;
                    this.hzhd_bg = mx.Tools.get_bb_res("znbg", 2, info.avatar, Number(info.meili));
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { name: mx.HeiShiDsznView.S_NAME });
                    break;
                case 18://太傅
                    this.jianjie = data.data;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HLYTaiFuScreen.S_NAME);
                    break;
                default:
                    break;
            }
        };
        PalaceProxy.prototype.init_shijian = function (data) {
            // if (MX_COMMON.IN_GUIDE) {//引导中不显示事件
            //     return;
            // }
            // 1难产2怀孕3自缢4冷宫妃子死亡5生育子女6子女成年7被打胎8妃子生病9流产(怀孕状态被打入冷宫）
            //  type 1养心殿 2冷宫 3皇子所
            if (data.state) {
                for (var k in data.data) {
                    this.shijian.push(data.data[k]);
                }
                //this.shijian = data.data;
                for (var k in data.feizi) {
                    if (data.feizi[k]) {
                        var c_fz = data.feizi[k];
                        c_fz.time = (new Date().getTime()) / 1000;
                        if (this.mn_d[c_fz.id].avatar) {
                            c_fz.avatar = this.mn_d[c_fz.id].avatar;
                        }
                        //this.mn_d[c_fz.id] = c_fz;
                        if (c_fz.res_time || c_fz.wqj_res) {
                            this.yxd_time = new Date().getTime();
                        }
                        for (var t in c_fz) {
                            this.mn_d[c_fz.id][t] = c_fz[t];
                        }
                    }
                }
            }
            else {
                //this.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": Lang.err01 });
            }
        };
        PalaceProxy.prototype.check_shijian = function () {
            var cd = this.shijian.shift();
            var msg = Number(cd.msg_id);
            if (cd.str == "" && Number(cd.id)) {
                var c_data = this.get_curr_mn(cd.id);
                if (c_data) {
                    if (c_data.jia && msg != 8 && msg != 3 && msg != 4) {
                        if (this.shijian.length) {
                            this.check_shijian();
                        }
                        return;
                    }
                }
                else {
                    if (this.shijian.length) {
                        this.check_shijian();
                    }
                    return;
                }
            }
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.HouGongSJView.S_NAME,
                "param": {
                    "shijian": cd
                }
            });
        };
        PalaceProxy.prototype.nanchan_cb = function (data) {
            if (Number(data.state)) {
                var mn = this.mn_d[data.feizi.id];
                mn.haizi = data.feizi.haizi;
                mn.status = data.feizi.status;
                if (typeof this.zinv != "undefined") {
                    this.zinv.push(data.zinv);
                }
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AVGView.S_NAME,
                    "param": {
                        "type": "nanchan",
                        "answer": data.answer,
                        "cd": mn,
                        "zn": data.zinv
                    },
                });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
            }
        };
        PalaceProxy.prototype.hzs_tanwang_zinv = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1://四书五经不足
                    msg = mx.Lang.hzs55;
                    break;
                case 2:
                    if (this.cur_zn_info.zhuangtai == -1 || this.cur_zn_info.zhuangtai == 7) {
                        var str = this.data.name;
                        if (Number(this.data.sex == 1)) {
                            str += mx.Lang.hg046;
                        }
                        else {
                            str += mx.Lang.hg045;
                        }
                        str = mx.Tools.format(mx.Lang.hzs45, str);
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                        return;
                    }
                    var xin = Number(this.cur_zn_info.guanxi);
                    var num = Math.min(Math.floor(xin / 50), 3);
                    var guanhuai = Math.min(num * 50, 150);
                    if (xin < 0) {
                        guanhuai = -100;
                        num = -1;
                    }
                    var xin2 = Number(data.guanxi);
                    var num2 = Math.min(Math.floor(xin2 / 50), 3);
                    var guanhuai2 = Math.min(num2 * 50, 150);
                    if (xin2 < 0) {
                        guanhuai2 = -100;
                        num2 = -1;
                    }
                    var prev_api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUANXI, "guanhuaizhi", guanhuai);
                    var now_api = mx.ApiTool.getAPINode(mx.MX_APINAME.GUANXI, "guanhuaizhi", guanhuai2);
                    if (prev_api.guanxi != now_api.guanxi) {
                        this.pingjia_change = true;
                    }
                    var add = {};
                    add.caiyi_type = this.cur_zn_info.caiyi_type;
                    if (this.taifu_type) {
                        for (var i in this.hzc_list) {
                            var hz = this.hzc_list[i];
                            if (hz.id == this.cur_zn_info.id) {
                                for (var j in data.test) {
                                    var old_num = hz[j];
                                    var new_num = data.test[j];
                                    this.cur_zn_info[j] = new_num;
                                    add[j] = new_num - old_num;
                                }
                                break;
                            }
                        }
                    }
                    else if (this.cur_hzs_type) {
                        for (var key in this["hzs_list" + this.cur_hzs_type]) {
                            var temp = this["hzs_list" + this.cur_hzs_type][key];
                            for (var k in temp) {
                                var unit = temp[k];
                                if (unit.id == this.cur_zn_info.id) {
                                    for (var j in data.test) {
                                        var old_num = unit[j];
                                        var new_num = data.test[j];
                                        this.cur_zn_info[j] = new_num;
                                        add[j] = new_num - old_num;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (Number(data.pingjia) == 0) {
                        this.sendNotification(mx.MX_NOTICE.HZS_PINGJIA_CHANGED, "???");
                    }
                    if (mx.MX_COMMON.IN_GUIDE) {
                        this.cur_zn_info.zhuangtai = 2; //成年
                        this.cur_zn_info.name = "长乐";
                        this.cur_zn_info.fenghao = "永安";
                        this.sendNotification(mx.MX_NOTICE.HZS_ZHUANGTAI_CHANGED);
                    }
                    //触发选项
                    if (Number(data.xuanze) > 0) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AVGView.S_NAME,
                            "param": {
                                "cd": this.cur_zn_info,
                                "type": "zinv_xingge_select",
                                "xuanze": data.xuanze
                            },
                        });
                    }
                    else {
                        this.show_zn_dia(this.cur_zn_info, add);
                    }
                    this.res_sswj = Math.max(0, this.res_sswj - 1);
                    var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
                    pProxy.set_item_num(2019, this.res_sswj);
                    this.sendNotification(mx.MX_NOTICE.HZS_GUANXI_CHANGED);
                    return;
                case 3:
                    this.show_zn_dia(this.cur_zn_info);
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.show_zn_dia = function (zn, extra) {
            //第一位
            var key = "1";
            var key2, key3, key4;
            var n_zn_zt = Number(zn.zhuangtai);
            //第二位
            if (n_zn_zt == 10) {
                key += "4";
            }
            else if (n_zn_zt > 5) {
                key += "2";
            }
            else if (n_zn_zt == 4) {
                key += "3";
            }
            else {
                key += String(zn.zhuangtai);
            }
            //第三位
            if (n_zn_zt == 3) {
                var status_1 = String(zn.status).split("|");
                if (status_1.length == 1) {
                    if (Number(status_1[0]) == 6) {
                        key += "3";
                    }
                    else {
                        key += String(Math.min(2, Number(status_1[0])));
                    }
                }
                else if (status_1.length == 3) {
                    key += "6";
                }
                else {
                    if (status_1.indexOf("6") >= 0) {
                        if (status_1.indexOf("1") >= 0) {
                            key += "7";
                        }
                        else {
                            key += "5";
                        }
                    }
                    else {
                        key += "4";
                    }
                }
            }
            else {
                key += "0";
            }
            //第四位
            var xueqin = 2;
            if (Number(zn.sisheng) == 0) {
                xueqin = 0;
            }
            else if (Number(zn.sisheng) == Number(Main.USER_ID)) {
                xueqin = 1;
            }
            key2 = xueqin;
            //第五位
            var xingge = zn.xingge;
            if (Number(xingge) == 0) {
                xingge = "00" + zn.qizhi;
            }
            key3 = xingge;
            //第六位
            var yexin = Number(zn.yexin) > 50 ? 1 : 0;
            key4 = yexin;
            var a_d = {
                "key": key,
                "key2": key2,
                "key3": key3,
                "key4": key4,
                "type": "zinv",
                "zhuangtai": zn.zhuangtai,
                "name": zn.name,
                "avatar": zn.avatar
            };
            /*let scene = 604;//未婚为604.
            if (zn.hunpei && zn.hunpei != "无") {//已婚子女
                scene = 610;
            }*/
            var scene = 810;
            var whq = mx.Tools.get_fz_whq(zn);
            if (whq == 5) {
                scene = 1611;
            }
            else if (whq == 7) {
                scene = 1612;
            }
            a_d.scene = scene;
            if (extra) {
                a_d.extra = extra;
            }
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": a_d,
            });
        };
        PalaceProxy.prototype.show_fz_dia = function (fz, type, data, pet, extra, new_yun) {
            var key, key0, key1, key2, key3;
            var gongdou = data ? data.gongdou : null;
            var skill = data ? data.skill : null;
            var qinmi = data ? data.qinmi : null;
            var guitai = data ? Number(data.guitai) : null;
            var jin_skill = data ? data.jin_skill : null;
            var hua_skill = data ? data.hua_skill : null;
            //key 第一位-决定使用哪个静态表
            if (type == "lg") {
                key = "2";
                if (Number(fz.mid) >= 900 && Number(fz.mid) < 1000) {
                    key = "7"; //真实妃子在冷宫
                }
            }
            else {
                if (Number(fz.mid) < 300 && Number(fz.status) == 0) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": fz,
                            "type": "shiqin",
                            "pet": pet,
                            "extra": extra,
                            "gongdou": gongdou,
                            "shicong": true,
                            "jin_skill": jin_skill,
                            "hua_skill": hua_skill,
                        },
                    });
                    return;
                }
                else if (fz.chushen == mx.Lang.fulu) {
                    key = "3"; //俘虏
                }
                else if (mx.Lang.jfs39.indexOf(fz.chushen) >= 0) {
                    key = "5"; //教坊司
                }
                else if (Number(fz.mid) >= 900 && Number(fz.mid) < 1000) {
                    key = "6"; //真实妃子
                }
                else {
                    key = "1"; //普通
                }
            }
            //第二位-区分身体状态
            if (key == "1" || key == "6") {
                var status_2 = String(fz.status).split("|");
                if (status_2.length == 1) {
                    if (Number(status_2[0]) == 6) {
                        key0 = "3"; //撤牌
                    }
                    else {
                        key0 = String(Math.min(2, Number(status_2[0]))); //健康|病|孕
                    }
                }
                else if (status_2.length == 3) {
                    key0 = "6"; //孕病撤牌
                }
                else {
                    if (status_2.indexOf("6") >= 0) {
                        if (status_2.indexOf("1") >= 0) {
                            key0 = "7"; //病撤牌
                        }
                        else {
                            key0 = "5"; //孕拆牌
                        }
                    }
                    else {
                        key0 = "4"; //孕病
                    }
                }
                if (new_yun) {
                    switch (Number(key0)) {
                        case 2:
                            key0 = "0"; //孕转将康
                            break;
                        case 4:
                            key0 = "1"; //孕病转病
                            break;
                        case 5:
                            key0 = "3"; //孕撤牌转撤牌
                            break;
                        case 6:
                            key0 = "7"; //孕病撤牌 转 病撤牌
                            break;
                    }
                }
            }
            else {
                key0 = "1";
            }
            //第三位文化圈 第四位性格 第五位野心
            if (Number(fz.mid) >= 1000) {
                key2 = Number(fz.xingge);
                key1 = mx.Tools.get_fz_whq(fz);
            }
            else if (Number(fz.mid) < 900) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", fz.mid);
                key1 = Number(api.wenhua);
                key2 = Number(api.xingge);
                api = null;
            }
            key3 = (fz.sihaizi || "0");
            //求出剧情长度
            var len = 0;
            var user_touzi, feizi_touzi, shi_id;
            if (skill) {
                var skill_api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", skill[0].id);
                var ask_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVG, "chapter", skill_api.avg_id);
                switch (Number(skill[0].id)) {
                    case 14:
                        this.set_feizi_data(this.curr_mn, 'pet', 1, true);
                        len = ask_api.length + 1;
                        break;
                    case 17:
                        this.set_feizi_data(this.curr_mn, 'pet', -1, true);
                        len = ask_api.length + 1;
                        break;
                    case 26://[0,1)
                        shi_id = Math.floor(Math.random() * 5) + 1;
                        var shi_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVG, "chapter", shi_id);
                        len = shi_api.length + 1;
                        break;
                    case 27:
                        extra = -10;
                        len = 2;
                        break;
                    case 33:
                    case 34:
                        len = 9;
                        user_touzi = skill[0].touzi[0];
                        feizi_touzi = skill[0].touzi[1];
                        break;
                    case 36:
                        this.set_feizi_data(skill[0].feizi_info.id, 'pet', -1);
                        len = ask_api.length + 1;
                        break;
                    default:
                        len = ask_api.length + 1;
                        break;
                }
                skill_api = null;
                ask_api = null;
            }
            //鬼胎技能触发
            if (guitai == 0) {
                len = 7;
            }
            var param = {
                "cd": fz,
                "type": type,
                "pet": pet,
                "extra": extra,
                "gongdou": gongdou,
                "key": key,
                "key0": key0,
                "key1": key1,
                "key2": key2,
                "key3": key3,
                "skill": skill,
                "len": len,
                "user_touzi": user_touzi,
                "feizi_touzi": feizi_touzi,
                "shi_id": shi_id,
                "qinmi": qinmi,
                "new_yun": new_yun,
                "guitai": guitai,
                "jin_skill": jin_skill,
                "hua_skill": hua_skill,
            };
            this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.AVGView.S_NAME);
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": param,
            });
        };
        PalaceProxy.prototype.hzs_pingjia_zinv = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1://银币不足
                    this.sendNotification(mx.MX_NOTICE.CHOOSE_CHECK, null, "ybi");
                    return;
                case 2:
                    if (this.cur_zn_info.zhuangtai == -1 || this.cur_zn_info.zhuangtai == 7) {
                        var str = this.data.name;
                        if (Number(this.data.sex == 1)) {
                            str += mx.Lang.hg046;
                        }
                        else {
                            str += mx.Lang.hg045;
                        }
                        str = mx.Tools.format(mx.Lang.hzs45, str);
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                        return;
                    }
                    for (var key in this["hzs_list" + this.cur_hzs_type]) {
                        var unit = this["hzs_list" + this.cur_hzs_type][key];
                        if (unit.id == this.cur_zn_info.id) {
                            this["hzs_list" + this.cur_hzs_type][key].pingjia = this.cur_zn_info.pingjia = data.pingjia;
                            break;
                        }
                    }
                    var pj_api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINGJIA, "id", data.pingjia);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.cur_zn_info,
                            "type": "pingjia",
                            "pingjia": pj_api
                        },
                    });
                    this.sendNotification(mx.MX_NOTICE.HZS_PINGJIA_CHANGED, data.pingjia);
                    return;
                case 3:
                    msg = mx.Lang.hzs67;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.hzs_xingge_select = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.hzs58;
                    break;
                case 1://子女参数错误
                    msg = mx.Lang.zn + mx.Lang.err01;
                    break;
                case 2://子女已成年无法完成抉择
                    msg = mx.Lang.hzs59;
                    break;
                case 3:
                    if (this.cur_zn_info.zhuangtai == -1 || this.cur_zn_info.zhuangtai == 7) {
                        var str = this.data.name;
                        if (Number(this.data.sex == 1)) {
                            str += mx.Lang.hg046;
                        }
                        else {
                            str += mx.Lang.hg045;
                        }
                        str = mx.Tools.format(mx.Lang.hzs45, str);
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                        return;
                    }
                    for (var key in this["hzs_list" + this.cur_hzs_type]) {
                        var unit = this["hzs_list" + this.cur_hzs_type][key];
                        if (unit.id == this.cur_zn_info.id) {
                            this["hzs_list" + this.cur_hzs_type][key].xingge = this.cur_zn_info.xingge = data.xingge;
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.AVG_FRESH, this.cur_zn_info, mx.MX_AVG_CONST.AVG_T_JYSJ);
                    return;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        PalaceProxy.prototype.hzs_hyzj = function (data) {
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.HzsHyzjView.S_NAME,
                "param": {
                    "tot": data.tot,
                    "data": data.data,
                    "cd": this.cur_zn_info
                }
            });
        };
        PalaceProxy.prototype.set_feizi_data = function (id, attri, num, expect) {
            if (expect === void 0) { expect = false; }
            for (var i in this.mn_d) {
                var unit = this.mn_d[i];
                if (expect) {
                    if (unit.id != id) {
                        this.mn_d[i][attri] = Number(this.mn_d[i][attri]) + num;
                    }
                }
                else {
                    if (unit.id == id) {
                        this.mn_d[i][attri] = Number(this.mn_d[i][attri]) + num;
                        break;
                    }
                }
            }
        };
        PalaceProxy.prototype.init_shijian_info = function (data) {
            var msg;
            this.biaoji = data.biaoji;
            this.sjian_info = data;
            this.sendNotification(mx.MX_NOTICE.SJ_SBING_FRESH);
        };
        PalaceProxy.prototype.shijian_checha_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.err01;
                    break;
                case 1:
                    str = mx.Lang.jfs18;
                    break;
                case 2:
                    var id = data.id;
                    var yuangao = data;
                    for (var i in this.sjian_info.data) {
                        var sj = this.sjian_info.data[i];
                        if (sj.id == id) {
                            sj.msg_id = 2 + Number(sj.msg_id);
                            sj.yuangao = yuangao;
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_SJIAN_LYIN);
                    this.sendNotification(mx.MX_NOTICE.AVG_FRESH, data, mx.MX_AVG_CONST.AVG_T_CHECHA);
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        PalaceProxy.prototype.renlian_ronghe = function (data) {
            if (data.state) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hg102 });
            }
            else {
                this.mn_d[this.curr_mn].ren_lian = data.lihui || "";
                this.sendNotification(mx.MX_NOTICE.RENLIANRONGHE);
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.RenLianAlert.S_NAME);
            }
        };
        PalaceProxy.prototype.renlian_revert = function (data) {
            if (data.state) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hg102 });
            }
            else {
                this.mn_d[this.curr_mn].ren_lian = "";
                this.sendNotification(mx.MX_NOTICE.RENLIANRONGHE);
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.RenLianAlert.S_NAME);
            }
        };
        PalaceProxy.prototype.guizu_huapi_cb = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0://成功
                    str = mx.Lang.gz0014;
                    this.mn_d[data.id].huapi = data.avatar;
                    this.mn_d[data.id].avatar = data.avatar;
                    this.sendNotification(mx.MX_NOTICE.HUAPI_SUCC);
                    break;
                case 1://参数错误
                    str = mx.Lang.err01;
                    break;
                case 2://该妃子不是鬼族妃子或画皮始祖
                    str = mx.Lang.gz0012;
                    break;
                case 3://子女已画皮 
                    str = mx.Lang.gz0013;
                    break;
                case 4://三代子女之后无种族技能
                    str = mx.Lang.gz0020;
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        PalaceProxy.prototype.guizu_guitai_cb = function (data) {
            var str = '';
            switch (Number(data.state)) {
                case 0://成功
                    break;
                case 1://参数错误
                    str = mx.Lang.err01;
                    break;
                case 2://该妃子不是鬼族妃子或画皮始祖
                    str = mx.Lang.gz0015;
                    break;
                case 3://子女已使用技能
                    str = mx.Lang.gz0016;
                    break;
                case 4://三代子女之后无种族技能
                    str = mx.Lang.gz0020;
                    break;
            }
            if (str != '') {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
            this.sendNotification(mx.MX_NOTICE.AVG_FRESH, "", mx.MX_AVG_CONST.AVG_T_GZ);
        };
        PalaceProxy.prototype.lenggong_num_cb = function (data) {
            if (Number(data.state)) {
                //type1 宫斗事件打入冷宫 0 正常操作
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "param": mx.Tools.format(mx.Lang.lg012, Number(data.cold_num) + 1),
                        "notice_ok": data.type == 1 ? mx.MX_NOTICE.CONTINUE_GD_LG : mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            "t": mx.MX_NETS.CS_YXD_LENGGONG,
                            "id": data.id
                        },
                        "style": {
                            "textAlign": 'left',
                            "width": 275
                        },
                        "notice_exit": mx.MX_NOTICE.AVG_FRESH,
                        "type_exit": mx.MX_AVG_CONST.AVG_T_FRESH_GD,
                    }
                });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
            }
        };
        PalaceProxy.prototype.init_hougong_property = function (data) {
            this.level = Number(data.data.level);
            this.property = data.data.caiyi;
            if (!this.max_level) {
                this.max_level = mx.ApiTool.getAPI(mx.MX_APINAME.HOUGONGUPLEVEL).length;
            }
        };
        PalaceProxy.prototype.hougong_levelup_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    str = mx.Lang.h0071;
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ZLCB_FRESH });
                    this.level = Number(data.level);
                    var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PackProxy.NAME));
                    for (var k in data.cailiao) {
                        var item = data.cailiao[k];
                        pProxy.set_item_num(item.item_id, item.num);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    break;
                case 1://六艺不足
                    str = mx.Lang.hg116;
                    break;
                case 2://材料不够
                    str = mx.Lang.fz010;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.prototype.init_hly = function (data) {
            this.taifu_list = data.data || []; //hxj
        };
        PalaceProxy.prototype.xuanze_taifu_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    var id = Number(data.feizi_id);
                    var type = Number(data.id);
                    this.taifu_list[type - 1] = id;
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.SelectTaiFuView.S_NAME);
                    this.taifu_type = null;
                    if (mx.AppConfig.CURR_SCENE_ID == mx.HLYScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HLYScreen.S_NAME);
                    }
                    break;
                case 1://没有这个妃子
                    str = mx.Lang.hg119;
                    break;
                case 2://该妃子已被其他教室占用
                    str = mx.Lang.hg120;
                    break;
                case 3://没有太傅技能
                    str = mx.Lang.hg121;
                    break;
                case 4:
                    str = mx.Lang.err01;
                    break;
                case 5://才艺没有达到精通
                    str = mx.Lang.hg128;
                    break;
                case 6://侍从妃子和真实妃子不能当太傅
                    str = mx.Lang.hg129;
                    break;
            }
            if (str) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
            }
        };
        PalaceProxy.prototype.check_taifu = function (cd) {
            var c_id = this.taifu_type ? Number(this.taifu_list[this.taifu_type - 1]) : null;
            var id = Number(cd.id);
            if (c_id != id && Number(cd.mid) >= 1000) {
                var num = Number(cd.caiyi_num);
                if (num >= 150) {
                    var mnres = mx.Tools.get_zn_res(cd.avatar, "jq");
                    cd.hero = mnres;
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(cd.weifen));
                    var xingbie = cd.sex || cd.xingbie;
                    var weifen = xingbie == 1 ? api.weifeng : api.weifenb;
                    cd.weifen = weifen;
                    return cd;
                }
                else {
                    return null;
                }
            }
        };
        PalaceProxy.prototype.get_taifu_list = function () {
            var arr = [];
            for (var i in this.mn_d) {
                var mn = mx.FightTool.getInstance().object_clone(this.mn_d[i]);
                if (mn.daishu && mn.status != -5 && mn.status != 5) {
                    var xuetong = Number(mn.daishu.split("_")[0]);
                    if (xuetong - 10 == this.taifu_type && this.check_taifu(mn)) {
                        arr.push(mn);
                    }
                }
            }
            arr = arr.sort(function (a, b) {
                return (Number(b.meili) - Number(a.meili));
            });
            return arr;
        };
        PalaceProxy.prototype.init_tujian = function (data) {
            this.feizi_tujian = data.feizi_data;
            this.hz_tujian = data.zinv_data;
            this.fz_like = data.feizi_like || {};
            this.zn_like = data.zinv_like || {};
            this.cal_tujian_tishi();
        };
        PalaceProxy.prototype.cal_tujian_tishi = function () {
            this.tujian_tishi = false;
            for (var k in this.feizi_tujian) {
                if (Number(this.feizi_tujian[k]) == 0) {
                    this.tujian_tishi = true;
                    break;
                }
            }
            if (!this.tujian_tishi) {
                for (var m in this.hz_tujian) {
                    if (Number(this.hz_tujian[m]) == 0) {
                        this.tujian_tishi = true;
                        break;
                    }
                }
            }
            var temp_arr = []; //暂存id
            var temp_arr2 = [];
            for (var k in this.xuetong_arr) {
                temp_arr = [];
                temp_arr2 = [];
                var hero_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.HEROHOUGONG, "wenhua", this.xuetong_arr[k]);
                var lihui_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.LIHUI, "wenhua", this.xuetong_arr[k]);
                for (var t in hero_apis) {
                    var h_id = Number(hero_apis[t].id);
                    var h_api = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", h_id);
                    if (h_api) {
                        temp_arr.push(h_id);
                    }
                }
                for (var j in lihui_apis) {
                    temp_arr.push(Number(lihui_apis[j].lihui));
                    temp_arr2.push(Number(lihui_apis[j].lihui));
                }
                if (this.xuetong_arr[k] == 1) {
                    temp_arr.push(13401);
                    temp_arr.push(14401);
                }
                var fz_num = 0;
                var hz_num = 0;
                for (var j in this.feizi_tujian) {
                    var api = void 0;
                    if (Number(j) < 900) {
                        api = mx.ApiTool.getAPINode(mx.MX_APINAME.HEROHOUGONG, "id", j);
                    }
                    else {
                        api = mx.ApiTool.getAPINode(mx.MX_APINAME.LIHUI, "lihui", j);
                    }
                    if (api && Number(api.wenhua) == this.xuetong_arr[k]) {
                        fz_num++;
                    }
                }
                for (var j in this.hz_tujian) {
                    var api = void 0;
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.LIHUI, "lihui", j);
                    if (api && Number(api.wenhua) == this.xuetong_arr[k]) {
                        hz_num++;
                    }
                }
                this.feizi_tujian_info[this.xuetong_arr[k]] = {
                    "jindu": Math.floor((fz_num / temp_arr.length) * 100),
                    "info": [],
                    "ids": [],
                };
                this.hz_tujian_info[this.xuetong_arr[k]] = {
                    "jindu": Math.floor((hz_num / temp_arr2.length) * 100),
                    "info": [],
                    "ids": [],
                };
                for (var i in temp_arr) {
                    var id = temp_arr[i];
                    if (typeof this.feizi_tujian[id] == "undefined") {
                        this.feizi_tujian_info[this.xuetong_arr[k]].info.push(-1);
                    }
                    else {
                        this.feizi_tujian_info[this.xuetong_arr[k]].info.push(this.feizi_tujian[id]);
                    }
                    this.feizi_tujian_info[this.xuetong_arr[k]].ids.push(id);
                }
                for (var i in temp_arr2) {
                    var id = temp_arr2[i];
                    if (typeof this.hz_tujian[id] == "undefined") {
                        this.hz_tujian_info[this.xuetong_arr[k]].info.push(-1);
                    }
                    else {
                        this.hz_tujian_info[this.xuetong_arr[k]].info.push(this.hz_tujian[id]);
                    }
                    this.hz_tujian_info[this.xuetong_arr[k]].ids.push(id);
                }
            }
            this.sendNotification(mx.MX_NOTICE.NEW_XIAOHONGDIAN);
        };
        PalaceProxy.prototype.init_lihui = function (data) {
            if (Number(data.type) == 1) {
                if (Number(this.hz_tujian[data.avatar]) == 0) {
                    this.hz_tujian[data.avatar] = 1;
                }
                this.zn_like[data.avatar] = data.like_count || 0;
            }
            else {
                if (Number(this.feizi_tujian[data.avatar]) == 0) {
                    this.feizi_tujian[data.avatar] = 1;
                }
                this.fz_like[data.avatar] = data.like_count || 0;
            }
            this.cal_tujian_tishi();
            this.target_lihui_comment = data.comment;
            this.target_lihui_comment_num = data.comments_count || 0;
            this.target_lihui_userlike = data.user_like; //1已赞0未赞
            this.target_lihui_alllike = data.like_count || 0;
            this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.TuJianYuLanAlert.S_NAME });
        };
        PalaceProxy.prototype.tujian_zan_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    if (Number(data.type) == 1) {
                        this.zn_like[data.avatar] = this.zn_like[data.avatar] ? Number(this.zn_like[data.avatar]) + 1 : 1;
                    }
                    else {
                        this.fz_like[data.avatar] = this.fz_like[data.avatar] ? Number(this.fz_like[data.avatar]) + 1 : 1;
                    }
                    this.target_lihui_userlike = 1;
                    this.target_lihui_alllike = Number(this.target_lihui_alllike) + 1;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    str = mx.Lang.tj00005;
                    break;
                case 1:
                    str = Number(data.type) == 1 ? mx.Lang.zn : mx.Lang.fz;
                    str = mx.Tools.format(mx.Lang.tj00001, str);
                    break;
                case 2:
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.prototype.tujian_pinlun_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    this.target_lihui_comment_num = Number(this.target_lihui_comment_num) + 1;
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    var obj = {
                        "avatar": gproxy.user_avatar,
                        "content": data.content,
                        "id": data.com_id,
                        "liked": 0,
                        "name": gproxy.user_name,
                        "type": data.type,
                        "user_id": Main.USER_ID,
                        "user_liked": 0
                    };
                    if (this.target_lihui_comment.normal) {
                        this.target_lihui_comment.normal.unshift(obj);
                    }
                    else {
                        this.target_lihui_comment.normal = [];
                        this.target_lihui_comment.normal.push(obj);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
                case 1:
                    str = Number(data.type) == 1 ? mx.Lang.zn : mx.Lang.fz;
                    str = mx.Tools.format(mx.Lang.tj00001, str);
                    break;
                case 2:
                    str = mx.Lang.tj00002;
                    break;
                case 3:
                    str = mx.Lang.tj00007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.prototype.pinlun_zan_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    if (this.target_lihui_comment.top) {
                        for (var k in this.target_lihui_comment.top) {
                            if (Number(data.id) == this.target_lihui_comment.top[k].id) {
                                this.target_lihui_comment.top[k].user_liked = 1;
                                this.target_lihui_comment.top[k].liked = Number(this.target_lihui_comment.top[k].liked) + 1;
                                break;
                            }
                        }
                    }
                    if (this.target_lihui_comment.normal) {
                        for (var k in this.target_lihui_comment.normal) {
                            if (Number(data.id) == this.target_lihui_comment.normal[k].id) {
                                this.target_lihui_comment.normal[k].user_liked = 1;
                                this.target_lihui_comment.normal[k].liked = Number(this.target_lihui_comment.normal[k].liked) + 1;
                                break;
                            }
                        }
                    }
                    str = mx.Lang.tj00003;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    break;
                case 1:
                    str = mx.Lang.tj00004;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.prototype.get_fznum_by_type = function (type, need) {
            var num = 0;
            for (var i in this.mn_d) {
                if (Number(this.mn_d[i][type]) <= Number(need)) {
                    ++num;
                }
            }
            return num;
        };
        PalaceProxy.prototype.set_main_lh = function (data) {
            var str;
            if (data.state == 0) {
                str = mx.Lang.err01;
            }
            else if (data.state == 1) {
                str = mx.Lang.hg131;
                var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                if (data.y_id > 0) {
                    var c_mn = this.mn_d[data.y_id];
                    var y_id = void 0, mid = Number(c_mn.mid);
                    if (mid > 1000) {
                        y_id = c_mn.avatar;
                    }
                    else {
                        y_id = -mid;
                    }
                    gproxy.main_lh = y_id;
                }
                else if (data.y_id < 0) {
                    gproxy.main_lh = data.y_id;
                }
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PalaceProxy.NAME = "PalaceProxy";
        return PalaceProxy;
    }(puremvc.Proxy));
    mx.PalaceProxy = PalaceProxy;
    __reflect(PalaceProxy.prototype, "mx.PalaceProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=PalaceProxy.js.map