/**
*   @author mx
*   @date 2015.2.25
*   @desc 聊天数据处理
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
    var ChatProxy = (function (_super) {
        __extends(ChatProxy, _super);
        function ChatProxy() {
            var _this = _super.call(this, ChatProxy.NAME) || this;
            _this.no_warn = false; //true：不再提示防诈骗
            _this.pri_step0 = 8; //切换新的私聊显示较少的消息
            _this.pri_step = 10; //私聊向上翻阅一次增加的消息数
            _this.verticalGap = 27;
            _this.selected_index = 0; //选择的聊天tab
            /*----私聊----start----*/
            _this.pri_list = []; //私聊对象
            _this.cur_pri_index = -2; //-2：不在私聊界面；-1：在私聊界面但没有私聊对象；≥0：在私聊界面且有私聊对象
            _this.unhandle_pri_que = []; //别人发起私聊时，历史记录准备完毕前收到的消息
            _this.unread_pri_num = []; //未读消息数目
            _this.recent = false; //为true时表示我与当前私聊对象有消息往来
            _this._msg_que = {};
            for (var i = 1; i <= 4; i++) {
                _this.init_msg_type(i + "");
            }
            _this.web_rd = {};
            _this.web_rd[mx.MX_WEB_CONST.MX_WEB_CT_PUB] = { "st": 0, "delay": 8000 };
            return _this;
        }
        ChatProxy.prototype.init_msg_type = function (type) {
            var to_id;
            if (type == mx.MX_WEB_CONST.MX_WEB_CT_PRI) {
                type = "SL" + this.pri_list[this.cur_pri_index].user_id;
                to_id = this.pri_list[this.cur_pri_index].user_id;
            }
            if (to_id) {
                this.recent = true;
            }
            else {
                to_id = Number(type.split("SL")[1]);
            }
            if (!this._msg_que[type]) {
                this._msg_que[type] = [[], []];
                if (this.pri_list.length) {
                    mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_PRI, {
                        "sltype": "priHistory",
                        "to_id": to_id
                    });
                }
            }
            else {
                this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
            }
        };
        ChatProxy.prototype.filter_hmd = function (arr, type) {
            var temp = [];
            for (var i in arr) {
                var unit = arr[i];
                if (!mx.Tools.in_hmd(unit.user_id) || type == mx.MX_WEB_CONST.MX_WEB_CT_YIN) {
                    temp.push(unit);
                }
            }
            return temp.concat();
        };
        ChatProxy.prototype.check_myinfo = function (arr) {
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            var newBaseInfo = {
                "user_avatar": gproxy.user_avatar0 || gproxy.user_avatar,
                "user_name": gproxy.user_name,
                "user_vip": gproxy.user_vip,
                "user_lv": gproxy.user_lv
            };
            for (var k in arr) {
                if (arr[k].user_id == Main.USER_ID) {
                    this.check_baseinfo(arr[k], newBaseInfo);
                }
            }
        };
        ChatProxy.prototype.get_web_type_msg = function (type, i) {
            if (type == mx.MX_WEB_CONST.MX_WEB_CT_PRI) {
                type = "SL" + this.pri_list[this.cur_pri_index].user_id;
            }
            var arr = this._msg_que[type][i];
            this.check_myinfo(arr);
            return this.filter_hmd(arr, type);
        };
        ChatProxy.prototype.get_priList_show = function (arr_sour, arr_dest) {
            var start = -1;
            for (var i in arr_dest) {
                var tar = arr_dest[i];
                for (var j in arr_sour) {
                    var cur = arr_sour[j];
                    if (cur.time == tar.time && cur.user_id == tar.user_id) {
                        start = Number(j);
                        break;
                    }
                }
                if (start > -1) {
                    break;
                }
            }
            if (start == -1) {
                start = 0;
            }
            return arr_sour.slice(start, arr_sour.length);
        };
        ChatProxy.prototype.syn = function (flag) {
            var type = mx.MX_WEB_CONST.MX_CHAT_TYPE;
            var arr_show;
            if (type == mx.MX_WEB_CONST.MX_WEB_CT_PRI) {
                type = "SL" + this.pri_list[this.cur_pri_index].user_id;
                var arr_save = this._msg_que[type][0];
                var max = arr_save.length;
                arr_show = this._msg_que[type][1];
                var have = arr_show.length;
                if (!arr_show.length) {
                    arr_show = arr_save.slice(max - this.pri_step0, max);
                }
                else {
                    arr_show = this.get_priList_show(arr_save, arr_show);
                    if (flag == "up") {
                        if (have + this.pri_step <= max) {
                            arr_show = arr_save.slice(max - (have + this.pri_step), max);
                        }
                        else {
                            if (have < max) {
                                arr_show = arr_save;
                            }
                            else {
                                flag = null;
                            }
                        }
                    }
                }
                delete this._msg_que[type][1];
                this._msg_que[type][1] = mx.FightTool.getInstance().arr_clone(arr_show);
                if (flag) {
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, flag);
                }
            }
        };
        ChatProxy.prototype.clear_web_type_msg = function (type) {
            if (type == mx.MX_WEB_CONST.MX_WEB_CT_PRI) {
                type = "SL" + this.pri_list[this.cur_pri_index].user_id;
            }
            this._msg_que[type] = [[], []];
        };
        ChatProxy.prototype.cal_msgList_height = function (arr) {
            var res = 0;
            for (var i in arr) {
                res += arr[i].height;
            }
            return res ? res + (arr.length - 1) * this.verticalGap : 0;
        };
        ChatProxy.prototype.set_web_type_msg = function (type, data) {
            //几个特殊消息的处理
            switch (type) {
                case mx.MX_WEB_CONST.MX_WEB_CT_PRI:
                    this.set_pri_type_msg(data);
                    return;
                case mx.MX_WEB_CONST.MX_WEB_CT_PUB:
                    if (data.other) {
                        switch (data.other[1]) {
                            case "union_zhaomu":
                                data.type = mx.MX_WEB_CONST.MX_WEB_CT_FAM;
                                data.content = this.cal_zhaomu(data);
                                var uProxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.UnionProxy.NAME);
                                if (!uProxy.union_id) {
                                    this.set_web_type_msg(mx.MX_WEB_CONST.MX_WEB_CT_FAM, data);
                                }
                                return;
                        }
                    }
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_FAM:
                    if (data.other) {
                        switch (data.other[1]) {
                            case "qiuyuan":
                                data.content = this.cal_lueduo(data);
                                break;
                        }
                    }
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_YIN:
                    switch (data.other[1]) {
                        case "lyin_kjia":
                            data.content = this.cal_kanjia(data);
                            break;
                        default:
                            data.content = this.cal_lianyin(data);
                            break;
                    }
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_SYS:
                    data.content = this.cal_sys(data);
                    break;
            }
            //清除假消息
            if (data.user_id && data.user_id != Number(Main.USER_ID)) {
                var msg_arr = this.get_web_type_msg(type, 0);
                if (msg_arr.length == 1 && !msg_arr[0].user_avatar) {
                    this._shift(type);
                }
            }
            var que_arr = this._msg_que[type][0];
            if (!que_arr) {
                return;
            }
            var res;
            switch (type) {
                case mx.MX_WEB_CONST.MX_WEB_CT_PUB:
                    res = this.cal_label_size(data.content, null);
                    data.height = Math.max(res.height + 48, 78);
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_FAM:
                    switch (data.other[1]) {
                        case "qiuyuan":
                            data.height = 174;
                            break;
                        case "union_zhaomu":
                            data.height = 127;
                            break;
                        default://undefined || "message"  
                            res = this.cal_label_size(data.content, null);
                            data.height = Math.max(res.height + 48, 78);
                            break;
                    }
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_YIN:
                    switch (data.other[1]) {
                        case "lyin_kjia":
                            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
                            if (data.other.user_name == gproxy.user_name) {
                                res = this.cal_label_size(data.content, "lyin_kjia");
                                data.height = 160;
                            }
                            else {
                                res = this.cal_label_size(data.content, null);
                                data.height = Math.max(res.height + 48, 78);
                            }
                            break;
                        default:
                            data.height = 160;
                            break;
                    }
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_SYS:
                    res = this.cal_label_size(data.content, "system");
                    data.height = res.height + 56;
                    break;
            }
            //存储消息
            que_arr.push(data);
            //历史消息数量达到上限
            if (que_arr.length > mx.MX_WEB_CONST.WEB_MAX_CHANNEL) {
                this._shift(type);
            }
            //保存最后一条消息，用于主页滚动播放
            if (data.user_name != mx.Lang.lt001) {
                this.last_chat = data;
            }
            //界面刷新
            this.sendNotification(mx.MX_WEB_CONST.WEB_NEW_MSG, null, type);
        };
        ChatProxy.prototype.cal_label_size = function (content, type) {
            var con_t = new eui.Label();
            con_t.size = 24;
            con_t.bold = true;
            con_t.fontFamily = mx.MX_COMMON.DFT_FONT;
            con_t.lineSpacing = 9;
            con_t.maxWidth = 462;
            if (typeof content == "string") {
                con_t.text = content;
            }
            else {
                con_t.textFlow = content;
            }
            switch (type) {
                case "qiuyuan":
                    con_t.maxWidth = 477;
                    break;
                case "lyin_kjia":
                    con_t.maxWidth = 330;
                    break;
                case "union_zhaomu":
                    con_t.maxWidth = 450;
                    break;
                case "system":
                    con_t.size = 27;
                    con_t.lineSpacing = 12;
                    con_t.maxWidth = 561;
                    break;
            }
            return { "width": con_t.width, "height": con_t.height };
        };
        ChatProxy.prototype._shift = function (type) {
            var que_arr = this._msg_que[type][0];
            que_arr.shift();
        };
        ChatProxy.prototype.cal_kanjia = function (d) {
            var data = d.other;
            var obj = {
                "kjia_id": data[0],
                "type": data[1],
                "user_name": data[2],
                "fz_name": data[3],
                'zinv_id': data[4],
                "pinli": data[5],
                "meili": data[6],
            };
            d.other = obj;
            var pinli = Number(obj.pinli);
            var rid = Math.floor(Math.random() * 4) + 1;
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", pinli, "id", (pinli * 5 - 4));
            var str = mx.Tools.format(mx.Lang["kj0" + rid], obj.user_name, api.name, obj.fz_name);
            var str2 = mx.Tools.setKeywordColor2(str, [0xff0000, 0xfcb315, mx.Tools.num2color(obj.meili)]);
            return str2;
        };
        ChatProxy.prototype.cal_lueduo = function (d) {
            var data = d.other;
            var obj = {
                "time": data[0],
                "type": data[1],
                "union_id": data[2],
                "target_zhanli": data[3],
                'target': data[4]
            };
            d.other = obj;
            var text = mx.Tools.format(mx.Lang.jz203, obj.target.name);
            var str = mx.Tools.setKeywordColor2(text, [0xfe7634, 0xff4b4b]);
            str.unshift({ "text": " : " });
            str.unshift({ "text": d.base_info[0], "style": { "textColor": 0xff4b4b } });
            return str;
        };
        ChatProxy.prototype.cal_zhaomu = function (d) {
            var data = d.other;
            var obj = {
                "time": data[0],
                "type": data[1],
                "union_id": data[2],
                "union_kind": data[3],
                "union_name": data[4],
            };
            d.other = obj;
            var text = mx.Lang["jz" + (Math.floor(2 * Math.random()) + 100)];
            text = mx.Tools.format(text, obj.union_name, "(ID : " + obj.union_id + ")");
            var str = mx.Tools.setKeywordColor2(text, [0x72bd6a, 0xfb891a]);
            str.unshift({ "text": " : " });
            str.unshift({ "text": d.base_info[0], "style": { "textColor": 0xff4b4b } });
            return str;
        };
        ChatProxy.prototype.cal_lianyin = function (d) {
            var data = d.other;
            if (mx.FightTools.getType(d.other) == "array") {
                var obj = {
                    "pinli": data[0],
                    "avatar": data[1],
                    "hname": data[2],
                    "meili": data[3],
                    "skill": data[4],
                    "time": data[5],
                    "mid": data[6],
                    "sex": data[7],
                    "zinv_id": data[8],
                };
                d.other = obj;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.PINLI, "g_id", d.other.pinli, "id", (d.other.pinli * 5 - 4));
            var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", api.item_id);
            var str = mx.Tools.format(mx.Lang.cxg013, d.other.meili, d.other.hname, item.Buyprice2, api.name);
            return str;
        };
        ChatProxy.prototype.cal_sys = function (data) {
            var content = "";
            var par1 = "";
            var par2 = "";
            var par3 = "";
            var other_name = data.base_info[0];
            var d = data.content;
            var hero;
            switch (Number(d.type)) {
                case 1:
                    hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", d.mid);
                    par1 = hero.hero_name;
                    par2 = d.star;
                    break;
                case 2:
                    var c_base = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", d.mid);
                    par1 = other_name;
                    par2 = c_base.InitialStars;
                    par3 = c_base.hero_name;
                    break;
                case 4:
                    par1 = d.name;
                    break;
                case 5:
                    par1 = '4286';
                    break;
                case 6:
                    var dproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME));
                    par1 = dproxy.jijin[d.num];
                    par2 = d.num;
                    break;
                case 9:
                    hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", d.mid);
                    par1 = hero.hero_name;
                    break;
                case 10:
                    par1 = d.name;
                    par2 = d.meili;
                    break;
                case 11:
                    par1 = d.user_name;
                    par2 = d.zinv_name;
                    par3 = d.to_name;
                    break;
                case 12:
                    par1 = d.user_name;
                    par2 = d.zinv_name;
                    break;
                case 13:
                    var temple = mx.ApiTool.getAPINode(mx.MX_APINAME.TAIMIAO, "id", d.xian);
                    par1 = temple.name;
                    break;
                default:
                    break;
            }
            var sys = mx.ApiTool.getAPINodes(mx.MX_APINAME.SYSTEMLOG, "type", d.type);
            var rid = Math.floor(Math.random() * sys.length);
            var str1;
            if (Number(d.type) == 4) {
                str1 = mx.Tools.format(sys[rid].str, par1, other_name, par2, par3);
            }
            else if (Number(d.type) == 11 || Number(d.type) == 2) {
                str1 = mx.Tools.format(sys[rid].str, par1, par2, par3);
            }
            else {
                str1 = mx.Tools.format(sys[rid].str, other_name, par1, par2, par3);
            }
            var color_arr = sys[rid]['color'].split('#');
            color_arr.splice(0, 1);
            var str2 = mx.Tools.setKeywordColor2(str1, color_arr);
            return str2;
        };
        ChatProxy.prototype.add_pri = function (user_info, select) {
            if (select === void 0) { select = true; }
            for (var i in this.pri_list) {
                if (this.pri_list[i].user_id == user_info.user_id) {
                    if (select) {
                        this.pri_list.splice(Number(i), 1);
                        break;
                    }
                    else {
                        return;
                    }
                }
            }
            this.pri_list.reverse();
            this.pri_list.push({
                "user_id": user_info.user_id,
                "user_avatar": user_info.user_avatar,
                "user_name": user_info.user_name.length > 4 ? user_info.user_name.substr(0, 4) + "..." : user_info.user_name
            });
            this.pri_list.reverse();
            if (this.cur_pri_index > -1) {
                this.cur_pri_index++; //当前私聊对象索引改变
            }
            if (select) {
                this.cur_pri_index = 0;
            }
        };
        ChatProxy.prototype.search_prilist = function (user_id) {
            var p;
            for (var i in this.pri_list) {
                if (this.pri_list[i].user_id == user_id) {
                    p = this.pri_list[i];
                    break;
                }
            }
            return p;
        };
        ChatProxy.prototype.remove_pri = function (user_id) {
            if (user_id) {
                if (!this.search_prilist(user_id)) {
                    return;
                }
            }
            else {
                user_id = this.pri_list[this.cur_pri_index].user_id;
            }
            var msg_arr = this._msg_que["SL" + user_id];
            if (!msg_arr || msg_arr[0].length) {
                mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_PRI, {
                    "sltype": "priDelete",
                    "to_id": user_id
                });
            }
            else {
                this.remove_pri_cb(user_id);
            }
        };
        ChatProxy.prototype.remove_pri_cb = function (user_id) {
            if (this.cur_pri_index == 0) {
                if (this.pri_list.length == 1) {
                    this.cur_pri_index = -1;
                }
            }
            else if (this.cur_pri_index > 0) {
                this.cur_pri_index--;
            }
            for (var i in this.pri_list) {
                if (this.pri_list[i].user_id == user_id) {
                    this.pri_list.splice(Number(i), 1);
                    break;
                }
            }
            var type = "SL" + user_id;
            delete this._msg_que[type];
            this.sendNotification(mx.MX_WEB_CONST.WEB_NEW_PRI);
        };
        ChatProxy.prototype.sort_pri = function () {
            this.sort_pri_type("_msg_que", 1); //作为“最近联系人”存在的，默认消息数是1
            this.sort_pri_type("unread_pri_num", 0);
        };
        ChatProxy.prototype.sort_pri_type = function (type, default_num) {
            for (var i = 0, j = this.pri_list.length - 1; i < j;) {
                var i_arr = this[type]["SL" + this.pri_list[i].user_id];
                var j_arr = this[type]["SL" + this.pri_list[j].user_id];
                var i_length = void 0;
                var j_length = void 0;
                switch (type) {
                    case "_msg_que":
                        i_length = i_arr ? i_arr[0].length : default_num;
                        j_length = j_arr ? j_arr[0].length : default_num;
                        break;
                    case "unread_pri_num":
                        i_length = i_arr ? i_arr : default_num;
                        j_length = j_arr ? j_arr : default_num;
                        break;
                }
                if (!i_length && j_length) {
                    if (i == this.cur_pri_index) {
                        this.cur_pri_index = j;
                    }
                    else if (j == this.cur_pri_index) {
                        this.cur_pri_index = i;
                    }
                    var i_temp = this.pri_list[i];
                    this.pri_list[i] = this.pri_list[j];
                    this.pri_list[j] = i_temp;
                    i++;
                    j--;
                }
                else if (i_length) {
                    i++;
                }
                else if (!j_length) {
                    j--;
                }
            }
        };
        ChatProxy.prototype.clear_unhandle = function (user_id) {
            if (this.cur_pri_index == -1) {
                this.cur_pri_index = 0;
            }
            var type = "SL" + user_id;
            for (var i in this.unhandle_pri_que[type]) {
                this.set_pri_type_msg(this.unhandle_pri_que[type][i]);
            }
            delete this.unhandle_pri_que[type];
            this.sendNotification(mx.MX_WEB_CONST.WEB_NEW_PRI);
        };
        ChatProxy.prototype.check_baseinfo = function (old_info, new_info) {
            var res = true;
            if (old_info.user_name != new_info.user_name) {
                old_info.user_name = new_info.user_name;
                res = false;
            }
            var oldAvatar_arr = old_info.user_avatar.split("_"); //对象列表中的头像数据是tx70_xx_png
            var newAvatar_arr = new_info.user_avatar.split("_");
            if (oldAvatar_arr.length > 1) {
                if (oldAvatar_arr[1] != new_info.user_avatar) {
                    old_info.user_avatar = "tx70_" + new_info.user_avatar + "_png";
                    res = false;
                }
                return res;
            }
            else if (newAvatar_arr.length > 1) {
                if (old_info.user_avatar != newAvatar_arr[1]) {
                    old_info.user_avatar = newAvatar_arr[1];
                    res = false;
                }
                return res;
            }
            else {
                if (old_info.user_avatar != new_info.user_avatar) {
                    old_info.user_avatar = new_info.user_avatar;
                    res = false;
                }
            }
            if (old_info.user_vip != new_info.user_vip) {
                old_info.user_vip = new_info.user_vip;
                res = false;
            }
            if (old_info.user_lv != new_info.user_lv) {
                old_info.user_lv = new_info.user_lv;
                res = false;
            }
            return res;
        };
        ChatProxy.prototype.set_pri_type_msg = function (data, historyID) {
            if (historyID === void 0) { historyID = -1; }
            var cd = data.other;
            if (cd) {
                switch (cd.sltype) {
                    case mx.MX_WEB_CONST.WEB_PRI_T_FZ://中转消息，妃子信息变化
                        if (cd.user_id == Main.USER_ID) {
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_CFZ_INFO,
                                "id": cd.id
                            });
                            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                                "text": mx.Tools.format(mx.Lang.tx016, cd.name)
                            });
                        }
                        break;
                    case mx.MX_WEB_CONST.WEB_PRI_ADD_FZ://中转消息，砍价后添加妃子
                        if (cd.user_id == Main.USER_ID) {
                            cd.feizi.status = 0;
                            cd.feizi.haizi = 0;
                            this.sendNotification(mx.MX_NOTICE.YXD_ADD_MN, cd.feizi);
                        }
                        break;
                }
            }
            else {
                var type = void 0; //取 对方ID
                if (data.content.user_id != Number(Main.USER_ID)) {
                    type = data.content.user_id;
                }
                else {
                    type = data.to_id;
                }
                if (mx.Tools.in_hmd(type)) {
                    return;
                }
                type = "SL" + type;
                if (!this._msg_que[type] && historyID < 0) {
                    if (!this.unhandle_pri_que[type]) {
                        //将该对象列为私聊对象
                        var user_info = this.cal_pri(data);
                        user_info = {
                            "user_id": user_info.user_id,
                            "user_avatar": "tx70_" + user_info.user_avatar + "_png",
                            "user_name": user_info.user_name
                        };
                        this.add_pri(user_info, false);
                        //初始化该对象的未处理队列
                        this.unhandle_pri_que[type] = [data];
                        //初始化该对象的私聊队列
                        this.init_msg_type(type);
                    }
                    else {
                        this.unhandle_pri_que[type].push(data);
                    }
                }
                else {
                    var t0 = this.unhandle_pri_que[type] ? this.unhandle_pri_que[type][0].time : 0;
                    if (t0 && historyID > -1 && data.time >= t0) {
                        return;
                    }
                    var que_arr = this._msg_que[type][0];
                    data = this.cal_pri(data);
                    //校验旧数据，头像、昵称、VIP、LV
                    if (data.user_id != Main.USER_ID) {
                        if (historyID > -1) {
                            this.check_baseinfo(data, this.search_prilist(data.user_id));
                        }
                        else {
                            for (var i in que_arr) {
                                if (que_arr[i].user_id != Main.USER_ID) {
                                    this.check_baseinfo(que_arr[i], data);
                                }
                            }
                            this.check_baseinfo(this.search_prilist(data.user_id), data);
                        }
                    }
                    var res = this.cal_label_size(data.content, null);
                    data.height = Math.max(res.height + 48, 78);
                    que_arr.push(data);
                    if (que_arr.length > mx.MX_WEB_CONST.WEB_MAX_PRI) {
                        this._shift(type);
                    }
                    if (historyID < 0) {
                        if (this.cur_pri_index < 0 || type != "SL" + this.pri_list[this.cur_pri_index].user_id) {
                            if (!this.unread_pri_num[type]) {
                                this.unread_pri_num[type] = 1;
                            }
                            else {
                                var cur_num = this.unread_pri_num[type] + 1;
                                this.unread_pri_num[type] = Math.min(cur_num, 99);
                            }
                            if (!this.unhandle_pri_que[type]) {
                                var newBaseInfo = this.search_prilist(data.user_id);
                                this.sendNotification(mx.MX_WEB_CONST.WEB_NEW_PRI, {
                                    "user_id": Number(type.split("SL")[1]),
                                    "user_avatar": newBaseInfo.user_avatar,
                                    "user_name": newBaseInfo.user_name,
                                    "num": this.unread_pri_num[type]
                                });
                            }
                        }
                        else {
                            if (data.user_id != Main.USER_ID) {
                                var newBaseInfo = this.search_prilist(data.user_id);
                                this.sendNotification(mx.MX_WEB_CONST.WEB_NEW_PRI, {
                                    "user_id": Number(type.split("SL")[1]),
                                    "user_avatar": newBaseInfo.user_avatar,
                                    "user_name": newBaseInfo.user_name,
                                });
                            }
                            this.sendNotification(mx.MX_WEB_CONST.WEB_NEW_MSG, null, mx.MX_WEB_CONST.MX_WEB_CT_PRI);
                        }
                    }
                }
            }
        };
        ChatProxy.prototype.cal_pri = function (data) {
            var cd = data.content;
            var res = {
                "type": mx.MX_WEB_CONST.MX_WEB_CT_PRI,
                "user_id": cd.user_id,
                "content": cd.content,
                "time": data.time,
            };
            if (data.content.user_id != Number(Main.USER_ID)) {
                var other_info = cd.base_info;
                res.user_name = other_info[0];
                res.user_avatar = other_info[1];
                res.user_lv = other_info[3];
                res.user_vip = other_info[2];
            }
            else {
                var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME);
                var arr = [gproxy.user_name, gproxy.user_avatar0 || gproxy.user_avatar, gproxy.user_vip, gproxy.user_xlv];
                res.user_name = gproxy.user_name;
                res.user_avatar = gproxy.user_avatar0 || gproxy.user_avatar;
                res.user_lv = gproxy.user_lv;
                res.user_vip = gproxy.user_vip;
            }
            return res;
        };
        Object.defineProperty(ChatProxy.prototype, "prilist_length", {
            get: function () {
                var num = this.pri_list.length;
                for (var i in this.pri_list) {
                    var msg_arr = this._msg_que["SL" + this.pri_list[i].user_id];
                    if (msg_arr && !msg_arr[0].length) {
                        if (Number(i) == this.cur_pri_index && this.recent) {
                            this.recent = false;
                        }
                        else {
                            num--;
                        }
                    }
                }
                return num;
            },
            enumerable: true,
            configurable: true
        });
        ChatProxy.prototype.get_page = function () {
            mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_PRI, {
                "sltype": "priPage",
                "page": Math.ceil((this.prilist_length + 1) / mx.MX_WEB_CONST.WEB_PRI_PAGE_SIZE),
                "size": mx.MX_WEB_CONST.WEB_PRI_PAGE_SIZE
            });
        };
        ChatProxy.prototype.set_page = function (data) {
            var pri_list = data;
            var prilist_length = this.prilist_length;
            for (var i = prilist_length % mx.MX_WEB_CONST.WEB_PRI_PAGE_SIZE; i <= pri_list.length - 1; i++) {
                var user_id = Number(pri_list[i]);
                if (!mx.Tools.in_hmd(user_id) && !this.search_prilist(user_id)) {
                    this.pri_list.push({ "user_id": user_id });
                    mx.WebTool.getInstance().web_msg("", mx.MX_WEB_CONST.MX_WEB_CT_PRI, {
                        "sltype": "priHistory",
                        "to_id": user_id,
                        "num": 1
                    });
                }
            }
        };
        ChatProxy.prototype.set_pri_history = function (data) {
            var to_id = data.to_id;
            if (data.num == 1) {
                var pri_obj = void 0;
                var msg = data.content[0];
                if (msg.to_id == to_id) {
                    pri_obj = msg.content.other_info;
                }
                else {
                    pri_obj = {
                        "user_id": to_id,
                        "user_avatar": "tx70_" + msg.content.base_info[1] + "_png",
                        "user_name": msg.content.base_info[0],
                    };
                }
                var ready = true;
                for (var i = this.pri_list.length - 1; i >= Math.max(0, this.pri_list.length - mx.MX_WEB_CONST.WEB_PRI_PAGE_SIZE); i--) {
                    if (this.pri_list[i].user_id == to_id) {
                        this.pri_list[i] = pri_obj;
                    }
                    else if (!this.pri_list[i].user_avatar) {
                        ready = false;
                    }
                }
                if (ready) {
                    this.sendNotification(mx.MX_WEB_CONST.WEB_NEW_PRI);
                }
            }
            else {
                var priHistory = data.content;
                if (priHistory.length) {
                    priHistory.reverse();
                    for (var k in priHistory) {
                        this.set_pri_type_msg(priHistory[k], Number(k));
                    }
                }
                var cur_pri_userid = this.cur_pri_index > -1 ? this.pri_list[this.cur_pri_index].user_id : -1;
                if (this.cur_pri_index > -1 && cur_pri_userid == to_id) {
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN);
                }
                else {
                    this.clear_unhandle(to_id);
                }
            }
        };
        ChatProxy.NAME = "ChatProxy";
        return ChatProxy;
    }(puremvc.Proxy));
    mx.ChatProxy = ChatProxy;
    __reflect(ChatProxy.prototype, "mx.ChatProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ChatProxy.js.map