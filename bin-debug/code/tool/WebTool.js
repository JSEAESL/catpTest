/**
 *   @author mx
 *   @date 2015.1.21
 *   @desc webscoket工具，用于连接聊天。不支持断线重连，支持重发，不需要自己维护
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    mx.MX_WEB_CONST = {
        "MX_WEB_OPEN": false,
        "MX_CHAT_TYPE": "",
        //action
        "MX_WEB_LOGIN": "login",
        "MX_WEB_LOGIN_CB": "loginRes",
        "MX_WEB_LOGOUT": "logout",
        "MX_WEB_LOGOUT_CB": "logoutRes",
        "MX_WEB_CHANNEL": "sendChannelMessage",
        "MX_WEB_CHANNEL_CB": "sendChannelMessageRes",
        "MX_WEB_CHANNEL_ADD": "createChannel",
        "MX_WEB_CHANNEL_ADD_CB": "createChannelRes",
        "MX_WEB_CHANNEL_RE": "unsubChannel",
        "MX_WEB_CHANNEL_RE_CB": "unsubChannelRes",
        "MX_WEB_HISTORY": "fetchWithId",
        "MX_WEB_HISTORY_CB": "fetchWithIdRes",
        "MX_WEB_PAGE": "priPage",
        "MX_WEB_PAGE_CB": "priPageRes",
        "MX_WEB_DELETE": "priDelete",
        "MX_WEB_DELETE_CB": "priDeleteRes",
        //消息分类
        "MX_WEB_CT_SYS": "1",
        "MX_WEB_CT_PUB": "2",
        "MX_WEB_CT_FAM": "3",
        "MX_WEB_CT_YIN": "4",
        "MX_WEB_CT_PRI": "6",
        //私聊类型
        "MX_WEB_PRI": "toBuddy",
        "WEB_PRI_T_FZ": "pri_t_fz",
        "WEB_PRI_ADD_FZ": "WEB_PRI_ADD_FZ",
        //玩家分类
        "MX_WEB_UT_FAM": "wut_fam",
        "MX_WEB_UT_FRI": "wut_fri",
        "MX_WEB_UT_QIN": "wut_qin",
        //其他消息
        "MX_WEB_FAIL": "MX_WEB_FAIL",
        "WEB_NEW_MSG": "WEB_NEW_MSG",
        "WEB_NEW_PRI": "WEB_NEW_PRI",
        "WEB_TRY_NUM": 3,
        "WEB_BASE_BUM": 1000,
        "WEB_MAX_CHANNEL": 30,
        "WEB_MAX_PRI": 50,
        "WEB_HZS_MEILI": 100,
        "WEB_HZS_LEVEL": 60,
        "WEB_HZS_VIP": 6,
        "WEB_HZS_COST": 20000,
        "WEB_PRI_PAGE_SIZE": 6,
    };
    var WebTool = (function () {
        function WebTool() {
            WebTool.ERROR_TYPE = 0;
            var rweb = window["ReconnectingWebSocket"];
            if (!rweb || !window["WebSocket"]) {
                WebTool.ERROR_TYPE = 1; //不支持
                return;
            }
            var param = { debug: false, reconnectInterval: 1000 };
            var socket = new rweb(mx.AppConfig.WEBS_ADD, null, param);
            socket.onerror = this.onerror;
            socket.onopen = this.onopen;
            socket.onmessage = this.onmessage;
            socket.onconnecting = this.onconnecting;
            socket.onclose = this.onclose;
            this.socket = socket;
        }
        WebTool.prototype.onerror = function (evt) {
            var self = WebTool.getInstance();
            if (self._rty_n++ > mx.MX_WEB_CONST.WEB_TRY_NUM) {
                self.socket = null;
                WebTool.ERROR_TYPE = 2; //连接断开
            }
        };
        WebTool.prototype.onconnecting = function (evt) {
        };
        WebTool.prototype.onclose = function (evt) {
        };
        WebTool.prototype.onopen = function (evt) {
            var self = WebTool.getInstance();
            self._rty_n = 1;
            self.web_login(); //建立连接后，立刻登录.
        };
        Object.defineProperty(WebTool.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        WebTool.prototype.onmessage = function (evt) {
            return;
            var data = evt.data;
            var response = JSON.parse(data);
            response = response.data || response;
            if (response.base_info) {
                response.user_name = response.base_info[0];
                response.user_avatar = response.base_info[1];
                response.user_vip = response.base_info[2];
                response.user_lv = response.base_info[3];
            }
            var self = WebTool.getInstance();
            if (response.ret < 0) {
                var facade = mx.ApplicationFacade.getInstance();
                switch (response.ret) {
                    case -6:
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.err01 });
                        break;
                    case -7:
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.lt009 });
                        break;
                    default:
                        WebTool.ERROR_TYPE = response.ret;
                        mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang["weberror" + response.ret] });
                        break;
                }
                return;
            }
            switch (response.action) {
                case mx.MX_WEB_CONST.MX_WEB_LOGIN_CB://登录返回
                    self.on_login_back(response);
                    return;
                case mx.MX_WEB_CONST.MX_WEB_LOGOUT_CB: //登出返回
                case mx.MX_WEB_CONST.MX_WEB_CHANNEL_CB://频道广播返回
                    self.on_self_back(response);
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CHANNEL://其他人的频道广播,自己也会收到,群聊，家族,结缘
                    self.on_other_channel(response);
                    break;
                case mx.MX_WEB_CONST.MX_WEB_PRI://私聊返回
                    self.on_pri_msg(response);
                    break;
                case mx.MX_WEB_CONST.MX_WEB_HISTORY_CB://私聊历史记录返回
                    self.on_priHistory_back(response);
                    break;
                case mx.MX_WEB_CONST.MX_WEB_PAGE_CB://私聊历史对象返回
                    self.on_priPage_back(response);
                    break;
                case mx.MX_WEB_CONST.MX_WEB_DELETE_CB://私聊 删除某个最近联系人返回
                    self.on_priDelete_back(response);
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CHANNEL_ADD_CB: //增加频道返回
                case mx.MX_WEB_CONST.MX_WEB_CHANNEL_RE_CB://退订频道返回
                    self.on_add_channel(response);
                    break;
            }
            self._rty_n = 1;
        };
        WebTool.prototype.on_other_channel = function (data) {
            this.proxy.set_web_type_msg(data.type, data);
        };
        WebTool.prototype.on_add_channel = function (data) {
        };
        WebTool.prototype.on_login_back = function (data) {
            switch (data.ret) {
                case 1://成功
                    mx.MX_WEB_CONST.MX_WEB_OPEN = true; //打开聊天
                    break;
                default://失败???
                    if (this._rty_n <= mx.MX_WEB_CONST.WEB_TRY_NUM) {
                        this._rty_n++;
                        this.web_login(); //再次尝试重连    
                    }
                    else {
                        WebTool.ERROR_TYPE = 2; //连接断开
                    }
                    break;
            }
            if (data.pri_list && !this.proxy.pri_list.length) {
                this.proxy.set_page(data.pri_list);
            }
        };
        WebTool.prototype.on_self_back = function (data) {
        };
        WebTool.prototype.on_pri_msg = function (data) {
            this.proxy.set_pri_type_msg(data);
        };
        WebTool.prototype.on_priHistory_back = function (data) {
            this.proxy.set_pri_history(data);
        };
        WebTool.prototype.on_priPage_back = function (data) {
            this.proxy.set_page(data.pri_list);
        };
        WebTool.prototype.on_priDelete_back = function (data) {
            this.proxy.remove_pri_cb(data.to_id);
        };
        //向服务端发送消息
        WebTool.prototype.send_data = function (data) {
            return;
            if (this.socket) {
                data = JSON.stringify(data);
                this.socket.send(data);
            }
        };
        //常用的方法进行一次包装
        WebTool.prototype.web_login = function (out) {
            var facade = mx.ApplicationFacade.getInstance();
            var data = {
                "action": out ? mx.MX_WEB_CONST.MX_WEB_LOGOUT : mx.MX_WEB_CONST.MX_WEB_LOGIN,
                "user_id": Main.USER_ID,
                "channel_ids": [Main.SER_ID],
                "md5": this.proxy.key
            };
            var uProxy = facade.retrieveProxy(mx.UnionProxy.NAME);
            if (uProxy.union_id) {
                data.channel_ids.push(mx.MX_WEB_CONST.WEB_BASE_BUM + Number(uProxy.union_id));
            }
            this.send_data(data);
        };
        WebTool.prototype.web_add = function (channel_id) {
            var data = {
                "action": mx.MX_WEB_CONST.MX_WEB_CHANNEL_ADD,
                "user_id": Main.USER_ID,
                "channel_id": channel_id,
                "md5": this.proxy.key
            };
            this.send_data(data);
        };
        WebTool.prototype.web_re = function (channel_id) {
            var data = {
                "action": mx.MX_WEB_CONST.MX_WEB_CHANNEL_RE,
                "user_id": Main.USER_ID,
                "channel_id": channel_id,
                "md5": this.proxy.key
            };
            this.send_data(data);
        };
        WebTool.prototype.web_msg = function (con, type, other) {
            if (!mx.MX_WEB_CONST.MX_WEB_OPEN || !this.socket) {
                return;
            }
            var data = {
                "action": mx.MX_WEB_CONST.MX_WEB_CHANNEL,
                "user_id": Number(Main.USER_ID),
                "content": con,
                "type": type,
                "md5": this.proxy.key
            };
            switch (type) {
                case mx.MX_WEB_CONST.MX_WEB_CT_SYS://系統消息,固定ID
                    data.user_id = 0;
                    //data.md5 = MD5.getInstance().hex_md5("dqc1hje0kjtzd4zkyepf3avfq6umslmv" + 0 + "zt2017chat")
                    if (!data.base_info) {
                        data.base_info = [];
                    }
                    var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME);
                    data.base_info[0] = gproxy.user_name;
                    data.channel_id = Main.SER_ID;
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_PUB://公共聊天
                    data.channel_id = Main.SER_ID; //区ID
                    data.other = other;
                    data.base_info = this.self_info;
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_FAM://家族群聊，家族有自己的频道
                    data.channel_id = mx.MX_WEB_CONST.WEB_BASE_BUM + Number(other[2]);
                    data.other = other;
                    data.base_info = this.self_info;
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_YIN://结缘消息，全部玩
                    data.other = other;
                    data.channel_id = Main.SER_ID;
                    data.base_info = this.self_info;
                    break;
                case mx.MX_WEB_CONST.MX_WEB_CT_PRI://一对一消息
                    if (con != "") {
                        data.action = mx.MX_WEB_CONST.MX_WEB_PRI;
                        var other_1 = this.proxy.pri_list[this.proxy.cur_pri_index];
                        data.to_id = other_1.user_id;
                        data.content = {
                            "user_id": Number(Main.USER_ID),
                            "content": con,
                            "base_info": this.self_info,
                            "other_info": {
                                "user_id": other_1.user_id,
                                "user_avatar": other_1.user_avatar,
                                "user_name": other_1.user_name
                            }
                        };
                    }
                    else {
                        switch (other.sltype) {
                            case "priHistory"://获取私聊历史记录
                                data.action = mx.MX_WEB_CONST.MX_WEB_HISTORY;
                                data.to_id = other.to_id;
                                if (other.num) {
                                    data.num = other.num;
                                }
                                break;
                            case "priPage"://获取私聊历史对象
                                data.action = mx.MX_WEB_CONST.MX_WEB_PAGE;
                                data.page = other.page;
                                break;
                            case "priDelete"://删除某个最近联系人
                                data.action = mx.MX_WEB_CONST.MX_WEB_DELETE;
                                data.to_id = other.to_id;
                                break;
                            default://妃子信息变化，砍价后添加妃子
                                data.other = other;
                                data.channel_id = Main.SER_ID;
                                data.base_info = this.self_info;
                                break;
                        }
                    }
                    break;
            }
            this.send_data(data);
        };
        Object.defineProperty(WebTool.prototype, "self_info", {
            get: function () {
                var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME);
                var arr = [gproxy.user_name, gproxy.user_avatar0 || gproxy.user_avatar, gproxy.user_vip, gproxy.user_lv];
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        WebTool.getInstance = function (id) {
            var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME);
            if (window && window["chat_debug"]) {
                var cbug = window["chat_debug"];
                if (Number(Main.USER_ID) % 10 > cbug) {
                    return {
                        "web_msg": function () { },
                        "web_add": function () { },
                        "web_re": function () { },
                        "close_web_tool": function () { },
                    };
                }
            }
            if (mx.MX_COMMON.IN_GUIDE) {
                return {
                    "web_msg": function () { },
                    "web_add": function () { },
                    "web_re": function () { },
                    "close_web_tool": function () { },
                };
            }
            if (!WebTool.instance) {
                WebTool.instance = new WebTool();
            }
            return WebTool.instance;
        };
        WebTool.prototype.close_web_tool = function () {
            if (this.socket) {
                this.socket.close();
            }
            WebTool.instance = null;
        };
        return WebTool;
    }());
    mx.WebTool = WebTool;
    __reflect(WebTool.prototype, "mx.WebTool");
})(mx || (mx = {}));
//# sourceMappingURL=WebTool.js.map