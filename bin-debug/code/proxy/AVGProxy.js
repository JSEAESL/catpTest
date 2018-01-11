/**
 *   @author mx
 *   @date 2016.11.28
 *   @desc AVG剧情proxy
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
    var AVGProxy = (function (_super) {
        __extends(AVGProxy, _super);
        function AVGProxy() {
            return _super.call(this, AVGProxy.NAME) || this;
        }
        AVGProxy.prototype.init_zn_avg = function (cd) {
            var c_d = cd;
            var chengwei = mx.Lang.hg009;
            var cname = c_d.name;
            var scene = c_d.scene;
            //子女状态-1去世0婴儿1幼儿2成年3出嫁4和亲给内务府5打入教坊司6:被掠夺7：教坊司中死亡8：掠夺处死，9：囚凤宫
            var avatar = c_d.avatar || "";
            var zt = Number(c_d.zhuangtai) + 1;
            if (mx.MX_COMMON.IN_GUIDE && zt > 2) {
                zt = 3;
            }
            if (scene == 610) {
                this.avg_jqs.push({
                    "uname": cname,
                    "content": mx.Tools.format(mx.Lang.hg004, chengwei),
                    "avatar": avatar,
                    "scene": scene,
                    "hzstate": zt
                });
            }
            var key = c_d.key + c_d.key2 + c_d.key3 + c_d.key4;
            var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
            if (!api) {
                key = c_d.key + c_d.key2 + c_d.key3 + "2";
                api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
                if (!api) {
                    key = c_d.key + "3" + c_d.key3 + c_d.key4;
                    api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
                    if (!api) {
                        key = c_d.key + c_d.key2 + "000" + c_d.key4;
                        api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
                        if (!api) {
                            key = c_d.key + "3000" + c_d.key4;
                            api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
                            if (!api) {
                                key = c_d.key + c_d.key2 + "0002";
                                api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
                                if (!api) {
                                    key = c_d.key + "3" + c_d.key3 + "2";
                                    api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
                                    if (!api) {
                                        key = c_d.key + "30002";
                                        api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
                                        if (!api) {
                                            key = c_d.key.substr(0, 2) + "000000";
                                            api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZINVDIALOG, "stage", key);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var temp = api[Math.floor(api.length * Math.random())];
            api = null;
            this.avg_jqs.push({
                "uname": cname,
                "content": temp.content,
                "avatar": avatar,
                "scene": scene,
                "hzstate": zt
            });
        };
        AVGProxy.prototype.init_sq_avg = function (cd) {
            var c_d = cd.cd;
            var cname = c_d.name;
            var str = mx.Tools.format(mx.Lang.hg0030, cname, cd.pet);
            var whq = mx.Tools.get_fz_whq(c_d);
            var ry = whq == 5;
            var scene = ry ? 902 : 1106;
            if (cd.new_yun || (Number(c_d.status) == 0 && Number(c_d.sb_level) == 0)) {
                scene = ry ? 1538 : 1514;
                str = mx.Tools.format(mx.Lang.hg003, cname, cd.pet);
            }
            if (whq == 7) {
                scene = 1612;
            }
            var mid_n = Number(c_d.mid);
            this.avg_jqs.push({
                "uname": "",
                "content": str,
                "avatar": this.guizu_huapi_not(c_d) ? mid_n + mx.MX_COMMON.SC_LH_BASE : c_d.avatar,
                "scene": scene,
            });
            var gd_d = cd.gongdou; //宫斗事件
            if (gd_d) {
                this.avg_jqs.push(gd_d);
            } //else {//侍从
            var wqj_res = c_d.wqj_res;
            var start = c_d.time;
            var ctime = new Date().getTime() / 1000;
            var timeleft = wqj_res - (ctime - start);
            var status = c_d.status;
            status = String(status).split("|");
            var yun_arr = ["2", "3", "4"]; //是否怀孕
            var huaiyun = false;
            for (var m in yun_arr) {
                if (status.indexOf(yun_arr[m]) >= 0) {
                    huaiyun = true;
                    break;
                }
            }
            var api;
            if (cd.shicong) {
                if (timeleft > 0 && !huaiyun) {
                    var index = Math.ceil(Math.random() * 5);
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.AVGJUQING, "type", "wqjsq" + index);
                }
                else {
                    var hero_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.HERODIALOG, "hero_id", c_d.mid);
                    api = hero_apis[Math.floor(hero_apis.length * Math.random())];
                }
                this.avg_jqs.push({
                    "uname": cname,
                    "content": api.content,
                    "avatar": c_d.avatar || mid_n + mx.MX_COMMON.SC_LH_BASE,
                    "scene": scene,
                });
            }
            else if (typeof cd.skill != 'undefined') {
                var skill = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", cd.skill[0].id);
                var arr = [33, 34];
                if (skill && arr.indexOf(Number(skill.id)) == -1) {
                    var skill_dialog = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVG, "chapter", skill.avg_id);
                    for (var i in skill_dialog) {
                        var name_1 = "";
                        if (skill_dialog[i].uname == '{10}') {
                            name_1 = cname;
                        }
                        else {
                            name_1 = skill_dialog[i].uname;
                        }
                        this.avg_jqs.push({
                            "uname": name_1,
                            "content": skill_dialog[i].content,
                            "avatar": skill_dialog[i].avatar == '{10}' ? (c_d.avatar || mid_n + mx.MX_COMMON.SC_LH_BASE) : skill_dialog[i].avatar,
                            "scene": skill_dialog[i].scene,
                        });
                    }
                }
                switch (Number(skill.id)) {
                    case 26:
                        //添加avg
                        var shi_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVG, "chapter", cd.shi_id);
                        for (var i in shi_api) {
                            this.avg_jqs.push({
                                "uname": cname,
                                "content": shi_api[i].content,
                                "avatar": (c_d.avatar || mid_n + mx.MX_COMMON.SC_LH_BASE),
                                "scene": shi_api[i].scene,
                            });
                        }
                        break;
                    case 27:
                        this.avg_jqs = [];
                        var choose = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGSELECT, "chapter", 1);
                        for (var i = 0; i < 2; ++i) {
                            this.avg_jqs.push({
                                "uname": choose[i].uname,
                                "content": choose[i].content,
                                "avatar": choose[i].avatar,
                                "scene": choose[i].scene,
                            });
                        }
                        break;
                    case 30:
                        for (var i = 0; i < 3; ++i) {
                            this.avg_jqs.push({
                                "uname": "",
                                "content": str + "\n" + "（第" + (i + 1) + "次）",
                                "avatar": c_d.avatar || mid_n + mx.MX_COMMON.SC_LH_BASE,
                                "scene": scene,
                            });
                        }
                        api = this.get_fz_api(cd);
                        this.avg_jqs.push({
                            "uname": cname,
                            "content": api.content,
                            "avatar": c_d.avatar || mid_n + mx.MX_COMMON.SC_LH_BASE,
                            "scene": scene,
                        });
                        return;
                    case 33:
                    case 34:
                        var user_touzi = Number(cd.skill[0].touzi[0]);
                        var feizi_touzi = Number(cd.skill[0].touzi[1]);
                        var skill_dialog = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVG, "chapter", skill.avg_id);
                        var max = Number(skill.id) == 33 ? 13311 : 13411;
                        for (var i in skill_dialog) {
                            if (Number(skill_dialog[i].id) < max) {
                                this.avg_jqs.push({
                                    "uname": cname,
                                    "content": skill_dialog[i].content,
                                    "avatar": skill_dialog[i].avatar == '{10}' ? (c_d.avatar || mid_n + mx.MX_COMMON.SC_LH_BASE) : skill_dialog[i].avatar,
                                    "scene": skill_dialog[i].scene,
                                });
                            }
                            else {
                                var sel = user_touzi > feizi_touzi ? max : max + 10;
                                var unit = mx.ApiTool.getAPINode(mx.MX_APINAME.AVG, "id", sel);
                                this.avg_jqs.push({
                                    "uname": cname,
                                    "content": unit.content,
                                    "avatar": 1,
                                    "scene": unit.scene,
                                });
                                break;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            else if (cd.guitai == 0) {
                //选择
                var choose = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGSELECT, "chapter", 2);
                for (var i = 0; i < 6; ++i) {
                    var temp_avatar = choose[i].avatar;
                    if (choose[i].avatar == "{10}") {
                        if (this.guizu_huapi_not(cd.cd)) {
                            temp_avatar = Number(cd.cd.mid) + mx.MX_COMMON.SC_LH_BASE;
                        }
                        else {
                            temp_avatar = Number(cd.cd.avatar);
                        }
                    }
                    this.avg_jqs.push({
                        "uname": choose[i].uname,
                        "content": choose[i].content,
                        "avatar": temp_avatar,
                        "scene": choose[i].scene,
                    });
                }
                return;
            }
            //无技能触发 随机问候
            if (cd.new_yun) {
                var yun_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "cxhy");
                for (var k in yun_apis) {
                    var temp = yun_apis[k];
                    this.avg_jqs.push({
                        "uname": temp.avatar == "{10}" ? cname : temp.uname,
                        "content": temp.content,
                        "avatar": temp.avatar == "{10}" ? c_d.avatar || Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE : temp.avatar,
                        "scene": temp.scene,
                        "hy_skip": true
                    });
                }
            }
            else if (!cd.shicong) {
                if (timeleft > 0 && !huaiyun) {
                    var index = Math.ceil(Math.random() * 5);
                    var index2 = Math.ceil(Math.random() * 3) + 5;
                    api = mx.ApiTool.getAPINode(mx.MX_APINAME.AVGJUQING, "type", "wqjsq" + index);
                    if (Number(c_d.mid) >= 900 && Number(c_d.mid) < 1000) {
                        api = mx.ApiTool.getAPINode(mx.MX_APINAME.AVGJUQING, "type", "wqjsq" + index2);
                    }
                }
                else {
                    api = this.get_fz_api(cd);
                }
                var avatar = void 0, tx = void 0;
                if (this.guizu_huapi_not(c_d)) {
                    avatar = Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE;
                    if (Number(c_d.mid) >= 900) {
                        tx = c_d.avatar;
                    }
                }
                else {
                    avatar = Number(c_d.avatar);
                }
                this.avg_jqs.push({
                    "uname": cname,
                    "content": api.content,
                    "avatar": avatar || c_d.avatar || Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE,
                    "scene": scene,
                    "tx": tx,
                });
            }
        };
        AVGProxy.prototype.get_fz_api = function (cd) {
            var key, api;
            if (cd.key == "1") {
                var whq = Number(cd.key1);
                if (whq > 1 && whq < 5) {
                    whq = 2;
                }
                key = cd.key + cd.key0 + cd.key2 + cd.key3;
                api = mx.ApiTool.getAPINodes(mx.MX_APINAME["WHQ" + whq], "stage", key);
                if (!api) {
                    key = cd.key + cd.key0 + "000" + cd.key3; //某些特殊状态不考虑性格
                    api = mx.ApiTool.getAPINodes(mx.MX_APINAME["WHQ" + whq], "stage", key);
                }
            }
            else if (cd.key == "6") {
                key = cd.key + cd.key0 + "000" + cd.key3; //忽略考虑性格
                api = mx.ApiTool.getAPINodes(mx.MX_APINAME.WHQ0, "stage", key);
                if (!api) {
                    key = cd.key + cd.key0 + "0000"; //忽略考虑性格-默认没有私生子
                    api = mx.ApiTool.getAPINodes(mx.MX_APINAME.WHQ0, "stage", key);
                }
            }
            else {
                key = cd.key + "0" + cd.key2 + "0"; //只考虑性格
                api = mx.ApiTool.getAPINodes(mx.MX_APINAME.WHQ0, "stage", key);
            }
            if (!api) {
                ////console.log("没有对应的剧情文档WHQ0 >> key : " + key);
            }
            var rlt = api[Math.floor(api.length * Math.random())];
            api = null;
            return rlt;
        };
        AVGProxy.prototype.init_nc_avg = function (cd) {
            var c_d = cd.cd;
            var nanchan_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.GONGDOUJUQING, "msg_type", 1, 'list', cd.answer);
            for (var k in nanchan_api) {
                var cname = void 0;
                var avatar = nanchan_api[k].avtar;
                if (nanchan_api[k].uname == "{10}") {
                    cname = c_d.name;
                }
                else {
                    cname = nanchan_api[k].uname;
                }
                var tx = void 0;
                if (avatar == "{10}") {
                    if (this.guizu_huapi_not(c_d)) {
                        avatar = Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE;
                        if (Number(c_d.mid) >= 900) {
                            tx = c_d.avatar;
                        }
                    }
                    else {
                        avatar = Number(c_d.avatar);
                    }
                }
                this.avg_jqs.push({
                    "uname": cname,
                    "content": nanchan_api[k].content,
                    "avatar": avatar,
                    "scene": nanchan_api[k].scene,
                    "tx": tx,
                });
            }
        };
        AVGProxy.prototype.init_txjg_avg = function (cd) {
            var c_d = cd.cd;
            var apis;
            var tx_api = [];
            if (cd.result < 3) {
                apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.TIAOXIJQYH, 'result', 1, 'sort', c_d.rate);
                if (apis.length == 1) {
                    tx_api.push(apis[0]);
                }
                else {
                    var arr = [];
                    for (var i = 0; i < apis.length; i++) {
                        if (arr.indexOf(apis[i].tiaoxi_id) < 0) {
                            arr.push(apis[i].tiaoxi_id);
                        }
                    }
                    tx_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.TIAOXIJQYH, 'tiaoxi_id', arr[Math.floor(arr.length * Math.random())]);
                }
                if (cd.skip) {
                    var sucjq = mx.ApiTool.getAPINode(mx.MX_APINAME.TIAOXIJQYH, 'result', 2, 'sort', c_d.rate);
                    if (sucjq) {
                        tx_api.push(sucjq);
                    }
                }
            }
            else {
                apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.TIAOXIJQYH, 'sort', 7);
                tx_api.push(apis[Math.floor(apis.length * Math.random())]);
            }
            for (var k in tx_api) {
                var d = tx_api[k];
                if (!d || d.avatar == '904_1') {
                    continue;
                }
                var con = d.content;
                con = con.replace('{5}', '{0}');
                var fproxy = this.facade.retrieveProxy(mx.FriendProxy.NAME);
                var fd = fproxy.get_curr_tx_friend();
                var str = mx.Tools.setStrColor(con, [fd.name], [0xFF0000]);
                var mid_n = Number(c_d.mid);
                this.avg_jqs.push({
                    "uname": d.uname == '{10}' ? c_d.name : d.name,
                    "content": str,
                    "avatar": d.avatar == '{10}' ? (this.guizu_huapi_not(c_d) ? mid_n + mx.MX_COMMON.SC_LH_BASE : c_d.avatar) : d.avatar,
                    "scene": d.scene,
                    "tx": mid_n >= 900 && mid_n < 1000 ? c_d.avatar : null
                });
            }
            if (cd.rateup) {
                this.avg_jqs[this.avg_jqs.length - 1].content.push({
                    text: mx.Tools.format(mx.Lang.tx014, c_d.name), style: { textColor: 0xFF0000 }
                });
            }
        };
        AVGProxy.prototype.guizu_huapi_not = function (data) {
            var mid = Number(data.mid);
            return (mid < 1000 && mid != 308) || (mid == 308 && data.huapi == '');
        };
        AVGProxy.prototype.init_jfs_ftres_avg = function (cd) {
            var c_d = cd.cd;
            var api;
            if (cd.pass) {
                var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.JFSDIALOG, "result", 3);
                api = apis[Math.floor(Math.random() * apis.length)];
            }
            else {
                var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.JFSDIALOG, "result", 4);
                api = apis[Math.floor(Math.random() * apis.length)];
            }
            this.avg_jqs.push({
                "uname": c_d.name,
                "content": api.content,
                "avatar": c_d.avatar || Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE,
                "scene": api.scene,
                "title": 1
            });
        };
        AVGProxy.prototype.init_jfs_ss_api = function (ss_apis, c_d) {
            for (var k in ss_apis) {
                var api = ss_apis[k];
                var cname = void 0;
                if (api.uname == "{10}") {
                    cname = c_d.name;
                }
                else {
                    cname = api.uname;
                }
                var avatar = api.avtar;
                if (avatar == "{10}") {
                    if (this.guizu_huapi_not(c_d)) {
                        avatar = Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE;
                    }
                    else {
                        avatar = Number(c_d.avatar);
                    }
                }
                this.avg_jqs.push({
                    "uname": cname,
                    "content": api.content,
                    "avatar": avatar,
                    "scene": api.scene,
                });
            }
        };
        AVGProxy.prototype.init_jfs_ss_avg = function (cd) {
            var c_d = cd.cd;
            var ss_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.JFSJUQING, "msg_type", cd.zinv ? 3 : 1);
            this.init_jfs_ss_api(ss_apis, c_d);
        };
        AVGProxy.prototype.init_jfs_ssjg_avg = function (cd) {
            var c_d = cd.cd;
            var type = 2;
            if (typeof c_d.haizi != 'undefined') {
                if (c_d.haizi == 'yesheng') {
                    type = 2;
                }
                else {
                    type = 4;
                }
            }
            else {
                type = 2;
            }
            var ss_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.JFSJUQING, "msg_type", type, "list", 1);
            this.init_jfs_ss_api(ss_apis, c_d);
        };
        AVGProxy.prototype.init_scdj_avg = function (cd) {
            var cmn = cd.cd;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", cd.item_id);
            var type = mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME ? "hzs" : "yxd";
            var wf = mx.Tools.get_mn_wf(cmn, type);
            this.avg_jqs.push({
                "uname": mx.Lang.xdz,
                "content": mx.Tools.format(mx.Lang.sc001, api.name, wf, cmn.name),
                "avatar": 904,
                "scene": 1106,
            });
            var str;
            switch (cd.sctype) {
                case "fz_cg"://赏赐成功
                    str = mx.Lang.sc002;
                    if (Number(cmn.mid) >= 900 && Number(cmn.mid) < 1000) {
                        str = mx.Lang.sc020[Math.floor(mx.Lang.sc020.length * Math.random())];
                    }
                    if (cd.item_id == 2001 && mx.AppConfig.PREV_SCENE_ID != mx.HzHudongScreen.S_NAME) {
                        this.avg_jqs.push({
                            "uname": mx.Lang.xdz,
                            "content": mx.Lang.sc005,
                            "avatar": 904,
                            "scene": 1106,
                        });
                    }
                    if (Number(cd.item_id) == 3040) {
                        this.avg_jqs.pop(); //弹出 小德子说的话，下面另给
                        var tsd = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "sctsd");
                        for (var i in tsd) {
                            var unit = tsd[i];
                            this.avg_jqs.push({
                                "uname": unit.uname == '{10}' ? cd.cd.name : unit.uname,
                                "content": unit.content,
                                "avatar": unit.avatar == '{10}' ? cd.cd.avatar || Number(cd.cd.mid) + mx.MX_COMMON.SC_LH_BASE : unit.avatar,
                                "scene": unit.scene,
                            });
                        }
                    }
                    break;
                case "fz_sb"://生病相关
                    if (cd.item_id == 2010) {
                        this.avg_jqs.pop(); //弹出 小德子说的话，下面另给
                        var cjjq = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "cjjq2");
                        this.avg_jqs.push({
                            "uname": cjjq[0].uname,
                            "content": cjjq[0].content,
                            "avatar": 904,
                            "scene": 1106,
                        });
                        str = cjjq[1].content;
                    }
                    else {
                        str = mx.Lang.sc003;
                    }
                    break;
                case "fz_by"://妃子病愈
                    str = mx.Lang.sc006;
                    break;
                case "fz_hy"://怀孕相关
                    if (cd.item_id == 2010) {
                        this.avg_jqs.pop(); //弹出 小德子说的话，下面另给
                        var cjjq = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "cjjq1");
                        this.avg_jqs.push({
                            "uname": cjjq[0].uname,
                            "content": cjjq[0].content,
                            "avatar": 904,
                            "scene": 1106,
                        });
                        str = cjjq[1].content;
                    }
                    else {
                        str = mx.Lang.sc004;
                    }
                    break;
                case "fz_yh"://已经生子
                    str = mx.Lang.sc007;
                    break;
                case "fz_cp"://撤牌相关
                    if (cd.item_id == 2010) {
                        this.avg_jqs.pop(); //弹出 小德子说的话，下面另给
                        var cjjq = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "cjjq3");
                        this.avg_jqs.push({
                            "uname": cjjq[0].uname,
                            "content": cjjq[0].content,
                            "avatar": 904,
                            "scene": 1106,
                        });
                        this.avg_jqs.push({
                            "uname": cjjq[1].uname,
                            "content": cjjq[1].content,
                            "avatar": cjjq[1].avatar,
                            "scene": 1106,
                        });
                    }
                    break;
                case "fz_nozhongzu":
                    //纯血
                    if (Number(cmn.mid) < 900) {
                        str = mx.Lang.sc023;
                    }
                    else {
                        str = mx.Lang.sc024;
                    }
                    break;
            }
            if (mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME && Number(cmn.zhuangtai) == 0) {
                str = mx.Lang.sc011;
            }
            var mid_n = Number(cmn.mid);
            if (cd.sctype != "fz_cp") {
                this.avg_jqs.push({
                    "uname": cmn.name,
                    "content": str,
                    "scene": 1106,
                    "hzstate": Number(cmn.zhuangtai) + 1,
                    "avatar": this.guizu_huapi_not(cmn) ? mid_n + mx.MX_COMMON.SC_LH_BASE : cmn.avatar,
                    "tx": mid_n >= 900 && mid_n < 1000 ? cmn.avatar : null
                });
            }
            if (cd.sctype == "fz_cg" && mx.AppConfig.PREV_SCENE_ID != mx.HzHudongScreen.S_NAME) {
                switch (cd.item_id) {
                    case "2018"://速孕仙丹
                        this.avg_jqs.push({
                            "uname": mx.Lang.xdz,
                            "content": mx.Lang.sc008,
                            "avatar": 904,
                            "scene": 1106,
                        });
                        break;
                }
            }
        };
        AVGProxy.prototype.init_xgs_jianjie = function (cd) {
            var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "sya");
            for (var k in api) {
                this.avg_jqs.push({
                    "uname": api[k].uname,
                    "content": api[k].content,
                    "avatar": api[k].avatar,
                    "scene": api[k].scene,
                });
            }
        };
        AVGProxy.prototype.init_xgs_rename = function (cd) {
            var type;
            if (cd.num == 0) {
                type = "rename0";
            }
            else if (cd.num > 0) {
                type = "rename1";
            }
            else {
                type = "rename2";
            }
            var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", type);
            for (var k in api) {
                switch (api[k].id) {
                    case 491:
                        this.avg_jqs.push({
                            "uname": api[k].uname,
                            "content": api[k].content,
                            "avatar": api[k].avatar,
                            "scene": api[k].scene,
                        });
                        this.avg_jqs.push({
                            "rename": true
                        });
                        break;
                    case 502:
                    case 505:
                        this.avg_jqs.push({
                            "uname": api[k].uname,
                            "content": mx.Tools.format(api[k].content, cd.wait),
                            "avatar": api[k].avatar,
                            "scene": api[k].scene,
                        });
                        break;
                    default:
                        this.avg_jqs.push({
                            "uname": api[k].uname,
                            "content": api[k].content,
                            "avatar": api[k].avatar,
                            "scene": api[k].scene,
                        });
                        break;
                }
            }
        };
        AVGProxy.prototype.init_checha = function (cd) {
            var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", cd.type);
            var scene; //不同的事件类型使用不同的场景
            switch (Number(cd.msg_id)) {
                case 92://鹤顶红
                    scene = 1302;
                    break;
                case 93://散神草
                    scene = 1705;
                    break;
            }
            for (var k in api) {
                switch (api[k].id) {
                    case 917:
                        this.avg_jqs.push({
                            "uname": api[k].uname,
                            "content": api[k].content,
                            "avatar": api[k].avatar,
                            "scene": scene,
                        });
                        this.avg_jqs.push({
                            "uname": mx.Lang.xdz,
                            "content": mx.Lang[cd.type][cd.msg_id][0],
                            "avatar": "904_2",
                            "scene": scene,
                        });
                        this.avg_jqs.push({
                            "uname": mx.Lang.p0139,
                            "content": mx.Lang[cd.type][cd.msg_id][1],
                            "avatar": "1_3",
                            "scene": scene,
                        });
                        this.avg_jqs.push({
                            "uname": mx.Lang.ly,
                            "content": mx.Tools.format(mx.Lang[cd.type].cost, mx.Lang[cd.type][cd.msg_id][2]),
                            "avatar": 1201,
                            "scene": scene,
                        });
                        this.avg_jqs.push({
                            "opt": true
                        });
                        break;
                    default:
                        this.avg_jqs.push({
                            "uname": api[k].uname,
                            "content": api[k].content,
                            "avatar": api[k].avatar,
                            "scene": scene,
                        });
                        break;
                }
            }
        };
        AVGProxy.prototype.init_avg_jqs = function (data) {
            this.avg_jqs = []; //剧情对话
            var cd = this.avg_data = data.param;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var c_d = cd.cd;
            switch (cd.type) {
                case "task"://主线任务剧情
                    this.avg_jqs = mx.ApiTool.getAPINodes(mx.MX_APINAME.TASKJQ, "step1_id", cd.id);
                    for (var k in this.avg_jqs) {
                        if (this.avg_jqs[k].avatar == "{10}") {
                            var Gproxy = (this.facade.retrieveProxy(mx.GuideProxy.NAME));
                            this.avg_jqs[k].avatar = Gproxy.slt_info.res;
                        }
                    }
                    break;
                case "tjjq":
                    this.avg_jqs = mx.ApiTool.getAPINodes(mx.MX_APINAME.TASKJQ, "step1_id", cd.id);
                    for (var k in this.avg_jqs) {
                        if (this.avg_jqs[k].avatar == "{10}") {
                            var Gproxy = (this.facade.retrieveProxy(mx.GuideProxy.NAME));
                            this.avg_jqs[k].avatar = Gproxy.slt_info.res;
                        }
                    }
                    this.avg_jqs.push({ "check_nextjq": true });
                    break;
                case "fuben"://战斗
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", cd.id);
                    this.avg_jqs = mx.ApiTool.getAPINodes(mx.MX_APINAME.TASKJQ, "step1_id", api2.jqid);
                    break;
                case "lianai"://恋爱剧情
                    var c_id = Number(cd.mid) * 3 - 3 + cd.cid;
                    this.avg_jqs = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOVEJQ, "chapter", c_id);
                    if (!this.avg_jqs.length) {
                        this.avg_jqs = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOVEJQ, "chapter", 1);
                    }
                    break;
                case "zinv"://子女
                    this.init_zn_avg(cd);
                    break;
                case "zinv_xingge_select"://子女抉择前触发对话
                    var xz = mx.ApiTool.getAPINode(mx.MX_APINAME.XUANZE, "id", cd.xuanze);
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var c_mn = pproxy.cur_zn_info;
                    var state = Number(c_mn.zhuangtai);
                    var zn_avatar = mx.Tools.get_bb_res("lh", state, c_mn.avatar, c_mn.meili);
                    this.avg_jqs.push({
                        "uname": c_d.uname,
                        "content": xz.question,
                        "avatar": zn_avatar,
                        "scene": c_mn.hunpei == '' ? 604 : 610,
                        "meili": c_mn.meili
                    });
                    break;
                case "lg"://冷宫
                    var key = "20" + cd.key2 + "0"; //冷宫只区分性格
                    if (cd.key == "7") {
                        key = "710000";
                    }
                    var api = mx.ApiTool.getAPINodes(mx.MX_APINAME.WHQ0, "stage", key);
                    if (!api) {
                        ////console.log("没有对应的剧情文档WHQ0 >> key : " + key);
                    }
                    var mid_n = Number(c_d.mid);
                    var temp = api[Math.floor(api.length * Math.random())];
                    this.avg_jqs.push({
                        "uname": c_d.name,
                        "content": temp.content,
                        "avatar": this.guizu_huapi_not(c_d) ? mid_n + mx.MX_COMMON.SC_LH_BASE : c_d.avatar,
                        "scene": "1402",
                    });
                    break;
                case "shiqin"://养心殿妃子侍寝-可能有宫斗事件
                    this.init_sq_avg(cd);
                    break;
                case "guide"://引导
                    this.avg_jqs = mx.ApiTool.getAPINodes(mx.MX_APINAME.GUIDEJQ, "chapter", cd.cd);
                    var gdproxy = (this.facade.retrieveProxy(mx.GuideProxy.NAME));
                    var sinfo = gdproxy.slt_info;
                    if (sinfo) {
                        cd.role_name = sinfo.name; //王妃的假名字
                        cd.role_rname = sinfo.rname; //王妃的真名字
                        cd.role_p = sinfo.res; //王妃形象
                        cd.sex = sinfo.sex;
                        cd.avatar = gdproxy.slt_info.res;
                    }
                    break;
                case "temple"://太庙考核
                    var jqs = mx.ApiTool.getAPINodes(mx.MX_APINAME.TMJQ, 'taimiao_id', cd.cd);
                    jqs.splice(jqs.length - 2, 2);
                    this.avg_jqs = jqs;
                    break;
                case "temple_finish"://太庙考核结束
                    var jqs2 = mx.ApiTool.getAPINodes(mx.MX_APINAME.TMJQ, 'taimiao_id', cd.cd);
                    this.avg_jqs = [jqs2[cd.pass ? jqs2.length - 2 : jqs2.length - 1]];
                    break;
                case "temple_shuoming"://太庙考核说明
                    this.avg_jqs = mx.ApiTool.getAPI(mx.MX_APINAME.TAIMIAOSHUOMING).concat();
                    break;
                case "nanchan"://难产剧情
                    this.init_nc_avg(cd);
                    break;
                case "tiaoxi"://调戏前对话
                    var str = mx.Tools.setStrColor(mx.Lang.tx012, [gproxy.user_name + '？'], [0xFF0000]);
                    if (c_d.zinv == 1 || c_d.zinv == 2) {
                        str = mx.Tools.format(mx.Lang.tx013, mx.Lang.hg009);
                    }
                    this.avg_jqs.push({
                        "uname": c_d.name,
                        "content": str,
                        "avatar": c_d.avatar || Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE,
                        "scene": 1514,
                    });
                    break;
                case "tiaoxi_result"://调戏结果对话
                    this.init_txjg_avg(cd);
                    break;
                case 'tiaoxi_xdz'://调戏小德子？？？
                    var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.TIAOXIJQYH, 'avatar', '904_1');
                    var d = apis[Math.floor(apis.length * Math.random())];
                    if (d.avatar == '904_1') {
                        this.avg_jqs.push({
                            "uname": d.name,
                            "content": [{ 'text': d.content }],
                            "avatar": d.avatar,
                            "scene": d.scene,
                        });
                    }
                    break;
                case 'tiaoxi_over'://调戏结束？？
                    this.avg_jqs.push({
                        "uname": c_d.name,
                        "content": cd.content,
                        "avatar": c_d.avatar || Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE,
                        "scene": 1514,
                    });
                    break;
                case "jfs"://教坊司捧场对话
                    var api_jfs = mx.ApiTool.getAPINodes(mx.MX_APINAME.JFSDIALOG, "result", cd.kind, "child", cd.child);
                    var a_d = api_jfs[Math.floor(Math.random() * api_jfs.length)];
                    this.avg_jqs.push({
                        "uname": c_d.name,
                        "content": a_d.content,
                        "avatar": c_d.avatar || Number(c_d.mid) + mx.MX_COMMON.SC_LH_BASE,
                        "scene": a_d.scene,
                        "title": 1
                    });
                    break;
                case "jfs_over"://不接客触发战斗，战斗结束对话
                    this.init_jfs_ftres_avg(cd);
                    break;
                case "jfs_ss"://教坊司赎身前对话
                    this.init_jfs_ss_avg(cd);
                    break;
                case "jfs_sscg"://教坊司赎身成功对话
                    this.init_jfs_ssjg_avg(cd);
                    break;
                case "ld"://掠夺俘虏对话   -1失败0子女1二代妃2掠夺到子女是自己子女3冷宫4掠夺到妃子是自己孩子
                    var name_2 = cd.user.name;
                    var res = cd.res == 0 ? mx.Lang.zn : mx.Lang.fz;
                    this.avg_jqs.push({
                        "uname": mx.Lang.xdz,
                        "content": mx.Tools.format(mx.Lang.ld045, name_2, res),
                        "avatar": "904_4",
                        "scene": 511,
                    });
                    if (cd.res == 3) {
                        var avatar_1 = ["1", "904", "1", "", "1", "{10}", "1", "1", "{10}", "1"];
                        for (var k in avatar_1) {
                            if (avatar_1[k] == "{10}") {
                                avatar_1[k] = cd.info.avatar;
                            }
                            if (mx.Lang.ld065[k] == "{10}") {
                                mx.Lang.ld065[k] = cd.info.name;
                            }
                            this.avg_jqs.push({
                                "uname": mx.Lang.ld065[k],
                                "content": mx.Lang.ld064[k],
                                "avatar": avatar_1[k],
                                "scene": 1402,
                            });
                        }
                    }
                    break;
                case "ldzn"://掠夺自己子女
                    var name2 = cd.user.name;
                    var res2 = cd.res == 2 ? mx.Lang.zn : mx.Lang.fz;
                    this.avg_jqs.push({
                        "uname": mx.Lang.xdz,
                        "content": mx.Tools.format(mx.Lang.ld045, name2, res2),
                        "avatar": "904_4",
                        "scene": 511,
                    });
                    var avatar = ["1_4", "904_1", "1_1", "904_1", "{10}", "1_3"];
                    for (var k in avatar) {
                        if (avatar[k] == "{10}") {
                            avatar[k] = cd.info.avatar;
                        }
                        if (mx.Lang.ld063[k] == "{4}") {
                            mx.Lang.ld063[k] = cd.info.name;
                        }
                        this.avg_jqs.push({
                            "uname": mx.Lang.ld063[k],
                            "content": mx.Lang.ld062[k],
                            "avatar": avatar[k],
                            "scene": 1402,
                        });
                    }
                    break;
                case "scdj"://赏赐道具
                    this.init_scdj_avg(cd);
                    break;
                case "pingjia"://评价对话
                    var pj = cd.pingjia;
                    this.avg_jqs.push({
                        "uname": pj.uname,
                        "content": pj.content,
                        "avatar": pj.avatar || Number(cd.cd.id) + mx.MX_COMMON.SC_LH_BASE,
                        "scene": pj.scene,
                    });
                    break;
                case "ry": //人鱼剧情
                case "ry2":
                    this.init_renyu(cd);
                    break;
                case "huyao":
                    this.init_huyao(cd);
                    break;
                case "sj_ly_anwei":
                case "sj_ly_yingqin":
                    var rid = cd.type == "sj_ly_anwei" ? (Math.floor(Math.random() * 3) + 1) : (Math.floor(Math.random() * 5) + 4);
                    var sjly_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "lysj" + rid);
                    for (var k in sjly_api) {
                        var cname = void 0;
                        var avatar_2 = sjly_api[k].avatar;
                        if (sjly_api[k].uname == "{10}") {
                            cname = cd.name;
                        }
                        else {
                            cname = sjly_api[k].uname;
                        }
                        if (avatar_2 == "{10}") {
                            if (this.guizu_huapi_not(cd)) {
                                avatar_2 = Number(cd.mid) + mx.MX_COMMON.SC_LH_BASE;
                            }
                            else {
                                avatar_2 = Number(cd.avatar);
                            }
                        }
                        this.avg_jqs.push({
                            "uname": cname,
                            "content": sjly_api[k].content,
                            "avatar": avatar_2,
                            "scene": sjly_api[k].scene,
                        });
                    }
                    break;
                case 'wbsj':
                    var wbsj_api = mx.ApiTool.getAPINode(mx.MX_APINAME.WBSHARESJ, "id", cd.sj_id);
                    var juqing_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", wbsj_api.avgType);
                    for (var k in juqing_api) {
                        var cname = void 0;
                        var avatar_3 = juqing_api[k].avatar;
                        if (juqing_api[k].uname == "{10}") {
                            cname = cd.name;
                        }
                        else {
                            cname = juqing_api[k].uname;
                        }
                        this.avg_jqs.push({
                            "uname": cname,
                            "content": juqing_api[k].content,
                            "avatar": avatar_3,
                            "scene": juqing_api[k].scene,
                        });
                    }
                    break;
                case "xgs_jianjie"://相国寺简介
                    this.init_xgs_jianjie(cd);
                    break;
                case "xgs_rename"://相国寺改名
                    this.init_xgs_rename(cd);
                    break;
                case "checha"://彻查
                    this.init_checha(cd);
                    break;
                case "guide_rename"://新手引导改名
                    this.avg_jqs.push({
                        "uname": mx.Lang.xgs02,
                        "content": mx.Lang.xgs33,
                        "avatar": 1603,
                        "scene": 1603,
                    });
                    this.avg_jqs.push({
                        "uname": mx.Lang.p0139,
                        "content": mx.Tools.format(mx.Lang.xgs34, gproxy.user_name),
                        "avatar": 1,
                        "scene": 1603,
                    });
                    this.avg_jqs.push({
                        "guide_rename": true
                    });
                    break;
                case "nhtx":
                case "nhjfs":
                case "nhld":
                    var wjapis = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", cd.type);
                    for (var k in wjapis) {
                        var wjapi = wjapis[k];
                        this.avg_jqs.push({
                            "uname": wjapi.uname,
                            "content": wjapi.content,
                            "avatar": wjapi.avatar,
                            "scene": wjapi.scene,
                        });
                    }
                    if (cd.type == "nhjfs") {
                        this.avg_jqs.push({ "nhjfs": true });
                    }
                    break;
                case "guizu": //鬼族剧情
                case "heishi":
                case "bhxz": //百花仙子
                case "bhy": //百花宴
                case "xxg": //吸血鬼
                case "cxqb": //初选情报
                case "fxqb": //复选情报
                case "dxqb": //殿选情报
                case "sctsd": //赏赐天使蛋
                case "tsdhd"://炼丹奇缘
                    var gzapis = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", cd.type);
                    for (var k in gzapis) {
                        var wjapi = gzapis[k];
                        this.avg_jqs.push({
                            "uname": wjapi.uname,
                            "content": wjapi.content,
                            "avatar": wjapi.avatar,
                            "scene": wjapi.scene,
                        });
                    }
                    break;
                case "cxtg": //初选成功
                case "fxcg": //复选成功
                case "cxycyl": //初选失败1
                case "cxzdl": //初选失败2
                case "cxdml": //初选失败3
                case "fxycyx": //复选失败1
                case "fxgxd": //复选失败2
                case "fxdml"://复选失败3
                    var xxapis = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", cd.type);
                    for (var k in xxapis) {
                        var wjapi = xxapis[k];
                        this.avg_jqs.push({
                            "uname": wjapi.uname == "{4}" ? cd.cd.name : wjapi.uname,
                            "content": wjapi.content,
                            "avatar": wjapi.avatar == "{4}" ? cd.cd.avatar : wjapi.avatar,
                            "scene": wjapi.scene,
                        });
                    }
                    this.avg_jqs[this.avg_jqs.length - 2].slgxxiu = true;
                    break;
                case "dxcg": //殿选成功
                case "fxsb"://殿选失败
                    var dxapis = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "dxjq");
                    for (var k in dxapis) {
                        var wjapi = dxapis[k];
                        this.avg_jqs.push({
                            "uname": wjapi.uname == "{4}" ? cd.cd.name : wjapi.uname,
                            "content": wjapi.content,
                            "avatar": wjapi.avatar == "{4}" ? cd.cd.avatar : wjapi.avatar,
                            "scene": wjapi.scene,
                        });
                    }
                    var xihaoapi = mx.ApiTool.getAPINode(mx.MX_APINAME.SLGXXIU, "id", cd.xihao);
                    this.avg_jqs[this.avg_jqs.length - 1].content = xihaoapi.hd;
                    this.avg_jqs[this.avg_jqs.length - 2].content = xihaoapi.zn;
                    var resapis = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", cd.type);
                    if (cd.type == "fxsb") {
                        resapis[0].content = mx.Lang["xxg1" + cd.yuanyin];
                    }
                    resapis[0].slgxxiu = true;
                    for (var k in resapis) {
                        var wjapi = resapis[k];
                        this.avg_jqs.push({
                            "uname": wjapi.uname == "{4}" ? cd.cd.name : wjapi.uname,
                            "content": wjapi.content,
                            "avatar": wjapi.avatar == "{4}" ? cd.cd.avatar : wjapi.avatar,
                            "scene": wjapi.scene,
                        });
                    }
                    break;
                case "zhandou_before":
                case "zhandou_after":
                    this.init_zhandoujq(cd);
                    break;
            }
        };
        AVGProxy.prototype.init_zhandoujq = function (data) {
            var jqid = (data.cd.jqid + '').split('|');
            var zd_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZHANDOUJUQING, "jqid", data.type == "zhandou_before" ? jqid[0] : jqid[1]);
            for (var k in zd_api) {
                var cname = void 0;
                var avatar = zd_api[k].avatar;
                cname = zd_api[k].uname;
                this.avg_jqs.push({
                    "uname": cname,
                    "content": zd_api[k].content,
                    "avatar": avatar,
                    "scene": zd_api[k].scene,
                });
            }
            if (data.type == "zhandou_before" && data.only_play && (Number(data.cd.pass) == -1 || Number(data.cd.pass) == 3)) {
                if (jqid.length > 1) {
                    var zd_api_1 = mx.ApiTool.getAPINodes(mx.MX_APINAME.ZHANDOUJUQING, "jqid", jqid[1]);
                    for (var k in zd_api_1) {
                        var cname = void 0;
                        var avatar = zd_api_1[k].avatar;
                        cname = zd_api_1[k].uname;
                        this.avg_jqs.push({
                            "uname": cname,
                            "content": zd_api_1[k].content,
                            "avatar": avatar,
                            "scene": zd_api_1[k].scene,
                        });
                    }
                }
            }
        };
        AVGProxy.prototype.init_renyu = function (cd) {
            var renyu_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", cd.type);
            for (var k in renyu_api) {
                var cname = void 0;
                var avatar = renyu_api[k].avatar;
                cname = renyu_api[k].uname;
                this.avg_jqs.push({
                    "uname": cname,
                    "content": renyu_api[k].content,
                    "avatar": avatar,
                    "scene": renyu_api[k].scene,
                });
            }
        };
        AVGProxy.prototype.init_huyao = function (cd) {
            var huyao_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.AVGJUQING, "type", "hy" + cd.day);
            for (var k in huyao_api) {
                var cname = void 0;
                var avatar = huyao_api[k].avatar;
                cname = huyao_api[k].uname;
                this.avg_jqs.push({
                    "uname": cname,
                    "content": huyao_api[k].content,
                    "avatar": avatar,
                    "scene": huyao_api[k].scene,
                });
            }
        };
        AVGProxy.prototype.ana_api_res = function (arr, api, skip) {
            var avatar_arr = String(api.avatar).split("_"); //剧情里可能有表情。
            if (avatar_arr[0] == "{10}") {
                avatar_arr[0] = this.avg_data.role_p;
            }
            var avatar = Number(avatar_arr[0]); //美男，子女，npc
            var role; //立绘
            if ((api.hzstate && Number(api.hzstate) < 3) || avatar > mx.MX_COMMON.SC_LH_MAX) {
                role = mx.Tools.get_bb_res("lh", api.hzstate - 1, avatar, api.meili);
            }
            else if (avatar > mx.MX_COMMON.SC_LH_BASE) {
                role = mx.Tools.get_mn_res(avatar - mx.MX_COMMON.SC_LH_BASE, "lh");
            }
            else if (avatar) {
                role = "a" + avatar + "_png";
            }
            else {
                return;
            }
            api.role_p = role; //显示用角色图片
            if ((!skip || avatar < mx.MX_COMMON.SC_LH_BASE) && arr.indexOf(role) == -1) {
                arr.push(role);
            }
            if (avatar_arr[1]) {
                var bq = "a" + api.avatar + "_png";
                api.bq_p = bq;
                if (arr.indexOf(bq) == -1) {
                    arr.push(bq);
                }
            }
        };
        AVGProxy.prototype.format_avg = function (avg_jqs, type) {
            var arr = [];
            for (var k in avg_jqs) {
                var api = avg_jqs[k];
                if (!api) {
                    continue;
                }
                if (api.sj_id) {
                    continue;
                }
                var csce = api.scene;
                if (csce) {
                    var sname = "s" + csce + "_jpg"; //场景
                    if (!RES.hasRes(sname)) {
                        sname = "s1303_jpg";
                    }
                    api.scene_p = sname;
                    if (csce < 1537 || csce > 1538) {
                        if (arr.indexOf(sname) == -1) {
                            arr.push(sname);
                        }
                    }
                }
                switch (type) {
                    case "shiqin":
                        arr.push("aixin");
                        this.ana_api_res(arr, api, true);
                        break;
                    case "lg":
                    case "zinv":
                    case "pingjia":
                    case "zinv_xingge_select":
                    case "jfs":
                    case "jfs_over":
                    case "jfs_ss":
                    case "lianai":
                        this.ana_api_res(arr, api, true);
                        break;
                    default:
                        this.ana_api_res(arr, api);
                        break;
                }
            }
            return arr;
        };
        AVGProxy.prototype.get_dyn_arr = function (data) {
            this.init_avg_jqs(data);
            return this.format_avg(this.avg_jqs, data.param.type);
        };
        AVGProxy.NAME = "AVGProxy";
        return AVGProxy;
    }(puremvc.Proxy));
    mx.AVGProxy = AVGProxy;
    __reflect(AVGProxy.prototype, "mx.AVGProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=AVGProxy.js.map