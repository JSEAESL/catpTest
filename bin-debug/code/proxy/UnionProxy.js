/**
*   @author cy
*   @date 2014.4.18
*   @desc 家族数据管理
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
    var UnionProxy = (function (_super) {
        __extends(UnionProxy, _super);
        function UnionProxy() {
            var _this = _super.call(this, UnionProxy.NAME) || this;
            _this.cur_huizhang = 1; //徽章
            _this.union_zhanglao = 0; //长老数目
            _this.shenqing_list = []; //申请列表
            _this.lv1 = 0; //
            _this.lv2 = 0; //
            _this.lv3 = 0; //
            _this.union_list = [];
            _this.jzlb_index = -1;
            _this.rand_index = -1;
            _this.beiti = 0; //1被踢2自己退
            _this.sq_arr = []; //暂存加好友信息
            _this.rank_list = [];
            _this.rank_page = 0;
            _this.rank_flag = true;
            _this.rank_gap = 0;
            _this.screen_page = 0;
            _this.screen_flag = true;
            _this.screen_gap = 0;
            _this.sq_list = [];
            _this.union_chat_cd = [0, 0];
            _this.jzxf_flag = 1;
            _this.jzxf_goumai = [];
            _this.gh_integral = 0;
            _this.jzxf_nowday = 1;
            _this.target_jzxf_index = 0;
            _this.jzxf_rank = [];
            return _this;
        }
        UnionProxy.prototype.init_union = function (data) {
            if (data.state) {
                var gh_info = data.gh_info;
                var my_info = data.myinfo;
                this.union_name = gh_info.name;
                this.union_lv = gh_info.level;
                this.union_zuzhang = gh_info.huizhang;
                if (!this.union_id) {
                    var channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(gh_info.id);
                    mx.WebTool.getInstance().web_add(channel_id);
                }
                this.union_id = gh_info.id;
                this.gonggao = gh_info.gonggao == "" ? mx.Lang.jz004 : gh_info.gonggao;
                this.cur_huizhang = gh_info.logo;
                this.union_fuzuzhang = Number(gh_info.fhz);
                this.union_rongyuzw = gh_info.zhiwei;
                for (var k in gh_info.zhiwei) {
                    this.union_zhanglao += Number(gh_info.zhiwei[k]);
                }
                this.union_member = Number(gh_info.renshu);
                this.union_max = Number(gh_info.max);
                this.union_rank = Number(gh_info.paiming);
                this.union_kind = Number(gh_info.kind);
                this.week_gongxian = Number(my_info.count);
                this.total_gongxian = Number(my_info.lj_hy);
                this.my_zhiwu = Number(my_info.zhiwu);
                this.my_enter = Number(my_info.enter);
                this.exp3 = Number(gh_info.exp3);
                this.zhiwei_info = data.my_zhiwu;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.UnionMainScreen.S_NAME);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz019 });
            }
        };
        UnionProxy.prototype.set_lv3 = function (type, show) {
            var apis;
            switch (type) {
                case 1:
                    if (!this.GHEXP) {
                        apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHEXP);
                        apis.reverse();
                        this.GHEXP = apis;
                    }
                    else {
                        apis = this.GHEXP;
                    }
                    if (apis[0].id > apis[1].id) {
                        apis.reverse();
                    }
                    break;
                case 2:
                    apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHRENSHU);
                    break;
                case 3:
                    apis = mx.ApiTool.getAPI(mx.MX_APINAME.GHZHIWEI);
                    break;
            }
            var lv = apis.length;
            for (var i = 1; i < apis.length; i++) {
                if (this["exp" + type] < Number(apis[i - 1].exp)) {
                    lv = type == 1 ? Number(apis[i - 1].id) : Number(apis[i - 1].level);
                    break;
                }
            }
            if (this["lv" + type] != lv && show) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionZWAlert.S_NAME, "param": type });
            }
            this["lv" + type] = lv;
        };
        UnionProxy.prototype.sort_member = function () {
            this.union_mlist.sort(function (a, b) {
                var x = Number(a.zhiwu);
                var y = Number(b.zhiwu);
                var res;
                var zhiwu_arr = [1, 2, 3, 4, 5, 6, 0];
                if (x == y) {
                    x = Number(a.lj_hy);
                    y = Number(b.lj_hy);
                    if (x == y) {
                        x = Number(a.level);
                        y = Number(b.level);
                        if (x == y) {
                            return Number(a.user_id) - Number(b.user_id);
                        }
                        else {
                            res = x == 0 ? y - x : x - y;
                            return res;
                        }
                    }
                    else {
                        res = x == 0 ? y - x : x - y;
                        return res;
                    }
                }
                else {
                    res = zhiwu_arr.indexOf(x) - zhiwu_arr.indexOf(y);
                    return res;
                }
            });
        };
        UnionProxy.prototype.build_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://有参数为空
                    str = mx.Lang.err01;
                    break;
                case 1://名字长度超过7个字，不能为空
                    str = mx.Lang.jz002;
                    break;
                case 2://退出需要N小说可在加入公告
                    str = mx.Lang.err01;
                    break;
                case 3://logo参数错误
                    str = mx.Lang.jz006;
                    break;
                case 4://用户已有家族
                    str = mx.Lang.jz005;
                    break;
                case 5://该家族名字已存在
                    str = mx.Lang.jz007;
                    break;
                case 6://元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 7://name不能全数字
                    str = mx.Lang.jz002;
                    break;
                case 8://创建成功//直接进大厅
                    mx.DataTool.getInstance().set_QQ_Score(306, new Date().getTime());
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_UNION_MAIN, });
                    return;
                case 9://等级不足25
                    str = mx.Lang.h0077;
                    break;
                case 10://公告不能超过50字
                    str = mx.Lang.jz008;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_list_cb = function (data) {
            if (data.state) {
                this.union_list = data.data;
                this.union_list.sort(function (a, b) {
                    return a.rank - b.rank;
                });
                for (var k in this.union_list) {
                    this.union_list[k].index = Number(k);
                }
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz005 });
            }
        };
        UnionProxy.prototype.union_shenqing_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://用户已有家族
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_MAIN,
                    });
                    return;
                case 2://没有gh_id，gh_id错误，查不到家族
                    this.screen_page = 0;
                    this.union_list = [];
                    var a_d2 = {
                        "param": mx.Lang.jz220,
                        "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                        "sdata_ok": {
                            "t": mx.MX_NETS.CS_UNION_RANK
                        }
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 4://申请超过10个
                    str = mx.Lang.jz013;
                    break;
                case 5://家族人数已满
                    str = mx.Lang.jz014;
                    break;
                case 6://改家族禁止任何人进入
                    str = mx.Lang.jz015;
                    break;
                case 7:// 直接加入成功
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_MAIN,
                    });
                    str = mx.Lang.jz068;
                    break;
                case 8://家族申请人数已满
                    str = mx.Lang.jz217;
                    break;
                case 1://申请成功
                    for (var k in this.union_list) {
                        if (Number(this.union_list[k].gh_id) == Number(data.gh_id)) {
                            this.union_list[k].apply = 1;
                            this.jzlb_index = Number(k);
                            break;
                        }
                    }
                    for (var k in this.randten_list) {
                        if (Number(this.randten_list[k].gh_id) == Number(data.gh_id)) {
                            this.randten_list[k].apply = 1;
                            this.rand_index = Number(k);
                            break;
                        }
                    }
                    this.sq_list.push(String(data.gh_id));
                    this.sendNotification(mx.MX_NOTICE.UNION_APPLY, null, mx.MX_WEB_CONST.MX_WEB_CT_FAM);
                    str = mx.Lang.jz016;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_cxsq_cb = function (data) {
            switch (Number(data.state)) {
                case 0: //没有这个公会的申请
                case 1:
                    for (var k in this.union_list) {
                        if (Number(this.union_list[k].gh_id) == Number(this.target_gh_id)) {
                            this.union_list[k].apply = 0;
                            this.jzlb_index = Number(k);
                            break;
                        }
                    }
                    for (var k in this.randten_list) {
                        if (Number(this.randten_list[k].gh_id) == Number(this.target_gh_id)) {
                            this.randten_list[k].apply = 0;
                            this.rand_index = Number(k);
                            break;
                        }
                    }
                    for (var j in this.sq_list) {
                        if (Number(this.sq_list[j]) == Number(this.target_gh_id)) {
                            this.sq_list[j] = "0";
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UNION_APPLY, null, mx.MX_WEB_CONST.MX_WEB_CT_FAM);
                    //this.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : Lang.jz067});
                    break;
                case 2://已经加入家族
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_MAIN,
                    });
                    break;
            }
        };
        UnionProxy.prototype.union_randten_cb = function (data) {
            if (data.state) {
                this.randten_list = data.data;
                this.randten_list.sort(function (a, b) {
                    return a.rank - b.rank;
                });
                for (var k in this.randten_list) {
                    this.randten_list[k].index = Number(k);
                }
                this.sendNotification(mx.MX_NOTICE.UNION_APPLY);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
            }
        };
        UnionProxy.prototype.union_search_cb = function (data) {
            if (data.state) {
                this.randten_list = data.data;
                this.randten_list.sort(function (a, b) {
                    return a.rank - b.rank;
                });
                for (var k in this.randten_list) {
                    this.randten_list[k].search = true;
                    this.randten_list[k].index = Number(k);
                }
                this.sendNotification(mx.MX_NOTICE.UNION_APPLY);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
            }
        };
        UnionProxy.prototype.union_cb = function (data) {
            if (data.state) {
                this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_UNION_MAIN,
                });
            }
            else {
                if (this.union_id != 0) {
                    var channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(this.union_id);
                    this.quit_chat(channel_id);
                    this.beiti = 1;
                    if (mx.AppConfig.CURR_SCENE_ID != mx.JingChengScreen.S_NAME) {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionZWAlert.S_NAME, "param": 5 });
                        this.beiti = 0;
                    }
                    return;
                }
                this.facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.UnionFengMianAlert.S_NAME,
                });
            }
        };
        UnionProxy.prototype.union_ksjr_cb = function (data) {
            var str;
            switch (data.state) {
                case 0: //
                case 2://该用户已经加入了公会
                    this.facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_MAIN,
                    });
                    break;
                case 1://没有公会可以加 
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz218 });
                    break;
            }
        };
        UnionProxy.prototype.union_logo_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://不是会长
                    str = mx.Lang.jz021;
                    break;
                case 1://参数错误
                    str = mx.Lang.err01;
                    break;
                case 2://已经是这个logo
                    str = mx.Lang.jz022;
                    break;
                case 3://元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 4://成功
                    str = mx.Lang.jz023;
                    this.cur_huizhang = data.logo;
                    this.sendNotification(mx.MX_NOTICE.UNION_HUIZHANG);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_name_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://不是会长
                    str = mx.Lang.jz021;
                    break;
                case 1://名字长度超过7个字，不能为空
                    str = mx.Lang.jz002;
                    break;
                case 2://家族名字不能全数字
                    str = mx.Lang.jz002;
                    break;
                case 4://元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 3://已经是这个name
                    str = mx.Lang.jz028;
                    break;
                case 5://成功
                    str = mx.Lang.jz027;
                    this.union_name = data.name;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.UnionHuiZhangAlert.S_NAME);
                    mx.DataTool.getInstance().set_QQ_Score(301, data.name);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_member_cb = function (data) {
            if (data.state) {
                this.union_mlist = data.data;
                for (var k in this.union_mlist) {
                    this.union_mlist[k].style = 2;
                    this.union_mlist[k].selected = false;
                }
                this.sq_arr = [];
                for (var k in this.union_mlist) {
                    if (Number(this.union_mlist[k].f_apply) == 1) {
                        this.sq_arr.push(Number(this.union_mlist[k].user_id));
                    }
                }
                this.sort_member();
                if (this.my_zhiwu == 1 || this.my_zhiwu == 2) {
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_SQLIST
                    });
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.UnionMemberScreen.S_NAME);
                }
            }
            else {
                var channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(this.union_id);
                this.quit_chat(channel_id);
                this.beiti = 1;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
            }
        };
        UnionProxy.prototype.union_sqlist_cb = function (data) {
            if (data.state) {
                this.shenqing_list = data.data;
                for (var k in this.shenqing_list) {
                    this.shenqing_list[k].style = 3;
                }
                //this.sendNotification(MX_NOTICE.CS_GET_DATA, {"t" : MX_NETS.CS_UNION_MLIST});
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.UnionMemberScreen.S_NAME);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_UNION_MLIST });
            }
        };
        UnionProxy.prototype.sq_friend = function (id) {
            for (var k in this.union_mlist) {
                if (Number(this.union_mlist[k].user_id) == id) {
                    this.union_mlist[k].f_apply = 1;
                    this.sq_arr.push(Number(this.union_mlist[k].user_id));
                    break;
                }
            }
        };
        UnionProxy.prototype.remove_friend = function (id) {
            for (var k in this.union_mlist) {
                if (Number(this.union_mlist[k].user_id) == id) {
                    this.union_mlist[k].guanxi = this.union_mlist[k].guanxi == 3 ? 2 : 0;
                    break;
                }
            }
        };
        UnionProxy.prototype.union_agree_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://不是会长、副族长
                    str = mx.Lang.jz032;
                    break;
                case 1://
                    str = mx.Lang.jz033;
                    var apply_id = Number(data.apply_id);
                    for (var k in this.shenqing_list) {
                        if (Number(this.shenqing_list[k].user_id) == apply_id) {
                            this.shenqing_list[k].count = 0;
                            this.shenqing_list[k].lj_hy = 0;
                            this.shenqing_list[k].zhiwu = 0;
                            this.shenqing_list[k].style = 2;
                            this.union_mlist.push(this.shenqing_list[k]);
                            this.shenqing_list.splice(k, 1);
                            this.union_member++;
                            break;
                        }
                    }
                    this.sort_member();
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    mx.DataTool.getInstance().set_QQ_Score(309, 1);
                    break;
                case 2://该申请人已有家族
                    str = mx.Lang.jz034;
                    break;
                case 3://家族人数已满
                    str = mx.Lang.jz035;
                    break;
                case 4://没有apply_id
                    str = mx.Lang.jz097;
                    var apply_id2 = Number(this.target_user_id);
                    for (var k in this.shenqing_list) {
                        if (Number(this.shenqing_list[k].user_id) == apply_id2) {
                            this.shenqing_list[k].count = 0;
                            this.shenqing_list[k].lj_hy = 0;
                            this.shenqing_list[k].zhiwu = 0;
                            this.shenqing_list[k].style = 2;
                            this.shenqing_list.splice(k, 1);
                            break;
                        }
                    }
                    this.sort_member();
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_refuse_cb = function (data) {
            switch (data.state) {
                case 0://不是族长或者副族长
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz032 });
                    break;
                case 1: //
                case 2://无记录，当做自己取消的申请
                    for (var k in this.shenqing_list) {
                        if (Number(this.shenqing_list[k].user_id) == Number(data.apply_id)) {
                            this.shenqing_list.splice(k, 1);
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz096 });
                    break;
            }
        };
        UnionProxy.prototype.union_refuses_cb = function (data) {
            if (data.state) {
                this.shenqing_list = [];
                this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz032 });
            }
        };
        UnionProxy.prototype.union_tiren_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://不是会长、副族长
                    str = mx.Lang.jz032;
                    break;
                case 1://to_id参数错误
                    str = mx.Lang.err01;
                    break;
                case 2://
                    var index = -1;
                    for (var k in this.union_mlist) {
                        if (Number(this.union_mlist[k].user_id) == Number(data.to_id)) {
                            this.union_mlist[k].beiti = true;
                            this.union_member--;
                            index = Number(k);
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, index);
                    str = mx.Lang.jz039;
                    break;
                case 3://会长不能被踢出
                    str = mx.Lang.jz037;
                    break;
                case 4://副会长不能踢副会长
                    str = mx.Lang.jz038;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_quit_cb = function (data) {
            var str;
            var channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(this.union_id);
            switch (data.state) {
                case 0://无家族
                    this.quit_chat(channel_id);
                    this.beiti = 1;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    return;
                case 1://
                    if (this.my_zhiwu == 1) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz071 });
                    }
                    this.quit_chat(channel_id);
                    this.beiti = 2;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    if (data.jiesan) {
                        mx.DataTool.getInstance().set_QQ_Score(307, new Date().getTime());
                    }
                    mx.DataTool.getInstance().set_QQ_Score(309, 2);
                    return;
                case 2://先转让会长才能退出家族
                    str = mx.Lang.jz042;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_rule_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://不是会长
                    str = mx.Lang.jz043;
                    break;
                case 2://
                    str = mx.Lang.jz044;
                    this.union_kind = Number(data.kind);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.UnionJoinKindAlert.S_NAME);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_log_cb = function (data) {
            if (data.state) {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionLogAlert.S_NAME, "param": data.data });
            }
            else {
                var channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(this.union_id);
                this.quit_chat(channel_id);
                this.beiti = 1;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
            }
        };
        UnionProxy.prototype.union_gonggao_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://公告为空
                    str = mx.Lang.jz046;
                    break;
                case 1://长度不能超50
                    str = mx.Lang.jz008;
                    break;
                case 2://不是公会会长,副会长
                    str = mx.Lang.jz032;
                    break;
                case 3://修改内容跟原来一样
                    str = mx.Lang.jz047;
                    break;
                case 4://
                    str = mx.Lang.jz044;
                    this.gonggao = data.gonggao;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    mx.DataTool.getInstance().set_QQ_Score(310, data.gonggao);
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_renming_cb = function (data) {
            var str = "";
            switch (data.state) {
                case 0://不是会长
                    str = mx.Lang.jz048;
                    break;
                case 1://to_id不是本公会成员
                    for (var k in this.union_mlist) {
                        if (Number(this.union_mlist[k].user_id) == Number(this.cur_member.user_id)) {
                            this.union_mlist.splice(k, 1);
                            this.union_member--;
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    str = mx.Lang.jz049;
                    break;
                case 2://不能任命自己
                    str = mx.Lang.jz050;
                    break;
                case 3://原本就是该职务
                    str = mx.Lang.jz052;
                    break;
                case 4://该职务人数已达上限，请先撤销
                    str = mx.Lang.jz051;
                    break;
                case 5://任命该职务成功 
                    for (var k in this.union_mlist) {
                        if (Number(this.union_mlist[k].user_id) == Number(this.cur_member.user_id)) {
                            switch (Number(this.union_mlist[k].zhiwu)) {
                                case 0:
                                    break;
                                case 1://会长
                                    break;
                                case 2:
                                    this.union_fuzuzhang--;
                                    break;
                                default:
                                    this.union_rongyuzw[Number(this.union_mlist[k].zhiwu) - 3]--;
                                    break;
                            }
                            switch (Number(data.type)) {
                                case 0:
                                    mx.DataTool.getInstance().set_QQ_Score(311, 3); //3:会员
                                    break;
                                case 1://会长
                                    this.my_zhiwu = 0;
                                    this.cur_member.zhiwu = 0;
                                    for (var j in this.union_mlist) {
                                        if (Number(this.union_mlist[j].user_id) == Number(Main.USER_ID)) {
                                            this.union_mlist[j].zhiwu = 0;
                                            break;
                                        }
                                    }
                                    mx.DataTool.getInstance().set_QQ_Score(311, 1); //1:会长
                                    break;
                                case 2:
                                    this.union_fuzuzhang++;
                                    mx.DataTool.getInstance().set_QQ_Score(311, 2); //2:副会长
                                    break;
                                default:
                                    this.union_rongyuzw[Number(data.type) - 3]++;
                                    break;
                            }
                            this.union_mlist[k].zhiwu = Number(data.type);
                            str = mx.Tools.format(mx.Lang.jz099, this.union_mlist[k].name, mx.Lang.jz087[this.union_mlist[k].zhiwu]);
                            break;
                        }
                    }
                    this.sort_member();
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    break;
                case 6://参数错误
                    str = mx.Lang.err01;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_donates_cb = function (data) {
            if (data.state) {
                this.user_jiazubi = Number(data.jiazubi);
                this.has_juanxian = Number(data.has_jx);
                var gh_info = data.gh_info;
                this.exp1 = Number(gh_info.exp1);
                this.exp2 = Number(gh_info.exp2);
                this.exp3 = Number(gh_info.exp3);
                for (var i = 1; i <= 3; i++) {
                    this.set_lv3(i);
                }
                this.lv1 = Number(gh_info.level);
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.UnionJuanXianScreen.S_NAME);
            }
            else {
                var channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(this.union_id);
                this.quit_chat(channel_id);
                this.beiti = 1;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
            }
        };
        UnionProxy.prototype.union_shop_cb = function (data) {
            if (data.state) {
                this.user_jiazubi = Number(data.jiazubi);
                this.wupin = data.wupin;
                this.goumai = data.goumai;
                this.shop_has_buy = Number(data.has_buy);
                this.sendNotification(mx.MX_NOTICE.FRESH_SHOP);
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 4 });
            }
            else {
                var channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(this.union_id);
                this.quit_chat(channel_id);
                this.beiti = 1;
                this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
            }
        };
        UnionProxy.prototype.fresh_union_shop = function (data) {
            if (data.state) {
                this.user_jiazubi = Number(data.jiazubi);
                this.wupin = data.wupin;
                this.goumai = data.goumai;
                this.shop_has_buy = Number(data.has_buy);
                this.sendNotification(mx.MX_NOTICE.FRESH_SHOP);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz070 });
            }
        };
        UnionProxy.prototype.duihuan_union_shop = function (data) {
            var str;
            switch (data.state) {
                case 0://可购买物品中没有此物品
                    str = mx.Lang.jjc24;
                    break;
                case 1://物品已购买
                    str = mx.Lang.jjc22;
                    break;
                case 2://武勋不足
                    str = mx.Lang.jz070;
                    break;
                case 3://
                    this.user_jiazubi = Number(data.jiazubi);
                    this.goumai = data.goumai;
                    this.sendNotification(mx.MX_NOTICE.FRESH_SHOP);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_donate_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://没有公会
                    var channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(this.union_id);
                    this.quit_chat(channel_id);
                    this.beiti = 1;
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.JingChengScreen.S_NAME);
                    return;
                case 2://退出在加需要24小时后可捐献
                    str = mx.Lang.jz075;
                    break;
                case 3://今日没有剩余捐献次数
                    str = mx.Lang.jz076;
                    break;
                case 4://银币不足
                    str = mx.Lang.jz081;
                    break;
                case 5://元宝不足
                    str = mx.Lang.jz079;
                    break;
                case 6://vip不足
                    str = mx.Lang.p0021;
                    break;
                case 7://
                    var my_info = data.myinfo;
                    var gh_up = data.gh_up;
                    this.week_gongxian = Number(my_info.count);
                    this.total_gongxian = Number(my_info.lj_hy);
                    var old_lv = this.union_lv;
                    for (var k in gh_up) {
                        this[k] = Number(gh_up[k]);
                    }
                    var type = 1;
                    for (var i = 1; i < 4; i++) {
                        this.set_lv3(i, true);
                        if (typeof gh_up["exp" + i] != "undefined") {
                            type = i;
                        }
                    }
                    this.has_juanxian++;
                    var add = Number(data.jiazubi) - this.user_jiazubi;
                    str = mx.Lang.jz098 + add;
                    this.user_jiazubi = Number(data.jiazubi);
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP, {
                        "id": Number(data.type),
                        "now_lv": this["lv" + type],
                        "now_exp": this["exp" + type]
                    });
                    if (this.union_lv != old_lv) {
                        mx.DataTool.getInstance().set_QQ_Score(302, this.union_lv);
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                        'id': 27,
                        'num': Number(data.type)
                    });
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_rank_cb = function (data) {
            if (mx.AppConfig.CURR_SCENE_ID == mx.UnionMainScreen.S_NAME) {
                this.rank_flag = true;
                if (this.rank_page >= Number(data.page)) {
                    return;
                }
                this.rank_gap = Math.min(this.rank_gap + 4, data.data.length);
                this.rank_list = this.rank_list.concat(data.data);
                for (var k in this.rank_list) {
                    this.rank_list[k].index = Number(k) + 1;
                    this.rank_list[k].state = "s1";
                }
                this.rank_page = Number(data.page);
                this.rank_total = Number(data.total);
                this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
            }
            else {
                this.screen_flag = true;
                if (this.screen_page >= Number(data.page)) {
                    return;
                }
                this.screen_gap = Math.min(this.screen_gap + 4, data.data.length);
                this.union_list = this.union_list.concat(data.data);
                for (var k in this.union_list) {
                    this.union_list[k].rank = Number(k) + 1;
                }
                this.screen_page = Number(data.page);
                this.screen_total = Number(data.total);
                this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
            }
        };
        UnionProxy.prototype.union_zhaomu = function () {
            if (this.union_kind == 2) {
                var a_d2 = {
                    "param": mx.Lang.jz200
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                return;
            }
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var now_time = Math.floor(new Date().getTime() / 1000);
            if (now_time < this.union_chat_cd[0] + 300) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz205 });
                return;
            }
            this.union_chat_cd[0] = now_time;
            var obj = {
                "time": now_time,
                "type": "union_zhaomu",
                "union_id": this.union_id,
                "union_kind": this.union_kind,
                "union_name": this.union_name,
            };
            var arr = [];
            for (var k in obj) {
                arr.push(obj[k]);
            }
            mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_PUB, arr);
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz209 });
        };
        UnionProxy.prototype.union_sq_list_cb = function (data) {
            this.sq_list = Number(data.state) == 1 ? data.data : [];
        };
        UnionProxy.prototype.quit_chat = function (channel_id) {
            var cproxy = this.facade.retrieveProxy(mx.ChatProxy.NAME);
            mx.WebTool.getInstance().web_re(channel_id);
            cproxy.init_msg_type(mx.MX_WEB_CONST.MX_WEB_CT_FAM);
            this.union_id = 0;
        };
        UnionProxy.prototype.union_init_jzxf = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    this.jzxf_goumai = data.data.goumai;
                    this.gh_integral = Number(data.gh_integral);
                    this.user_jiazubi = Number(data.jiazubi);
                    this.jzxf_nowday = Number(data.day);
                    this.jzxf_flag = 0;
                    this.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyUnionXiaoFeiAlert.S_NAME });
                    return;
                case 1:
                    str = mx.Lang.p0013;
                    break;
                case 2:
                    str = mx.Lang.jz224;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_goum_jzxf = function (data) {
            var str = "";
            switch (data.state) {
                case 0:
                    this.gh_integral = Number(data.gh_integral);
                    this.user_jiazubi = Number(data.jiazubi);
                    this.jzxf_goumai[this.target_jzxf_index] = 1;
                    this.sendNotification(mx.MX_NOTICE.FRESH_CPOP);
                    return;
                case 1:
                    str = mx.Lang.p0013;
                    break;
                case 2:
                    str = mx.Lang.jz225;
                    break;
                case 3:
                    str = mx.Lang.err01;
                    break;
                case 4:
                    str = mx.Lang.p0036;
                    break;
                case 5:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d2 = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
                    return;
                case 6:
                    var a_d = {
                        "notice_ok": mx.MX_NOTICE.POP_VIEW,
                        "sdata_ok": { "name": mx.ShopAlert.S_NAME, "param": 1 },
                        "param": mx.Lang.hs0003
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 7:
                    str = mx.Lang.jz070;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        UnionProxy.prototype.union_paih_jzxf = function (data) {
            this.jzxf_rank = data.data.sort(function (a, b) {
                return (Number(b.integral) - Number(a.integral));
            });
            this.jzxf_rank = data.data;
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyUnionPaiHangAlert.S_NAME });
        };
        UnionProxy.NAME = "UnionProxy";
        return UnionProxy;
    }(puremvc.Proxy));
    mx.UnionProxy = UnionProxy;
    __reflect(UnionProxy.prototype, "mx.UnionProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionProxy.js.map