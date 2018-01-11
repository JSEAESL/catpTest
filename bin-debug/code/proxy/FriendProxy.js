/**
 *   @author wf
 *   @date 2016.11.29
 *   @desc 好友相关数据管理
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
    var FriendProxy = (function (_super) {
        __extends(FriendProxy, _super);
        function FriendProxy() {
            var _this = _super.call(this, FriendProxy.NAME) || this;
            _this.list1 = { 1: [] }; //亲家
            _this.list2 = { 1: [] }; //好友
            _this.list3 = { 1: [] }; //推荐
            _this.list4 = { 1: [] }; //仇人
            _this.list5 = { 1: [] }; //申请
            _this.page1 = 1;
            _this.page2 = 1;
            _this.page3 = 1;
            _this.page4 = 1;
            _this.page5 = 1;
            _this.total1 = 1;
            _this.total2 = 1;
            _this.total3 = 1;
            _this.total4 = 1;
            _this.total5 = 1;
            _this.slmax = 15;
            _this.shouli1 = 0; //亲家收礼次数
            _this.shouli2 = 0; //好友收礼次数
            _this.curridx = 0;
            _this.currtype = 2;
            _this.baifang1 = false; //亲家可否拜访
            _this.baifang2 = false; //好友可否拜访
            _this.gift_state = false;
            //调戏
            _this.hylist = { 1: [] };
            _this.hypage = 1;
            _this.hytotal = 1;
            _this.tw_page_size = 4;
            return _this;
        }
        FriendProxy.prototype.init_friend_data = function (data) {
            if (data.list1 && data.list2) {
                this.list1 = { 1: [] };
                this.list2 = { 1: [] };
                this.list4 = { 1: [] };
                this.list5 = { 1: [] };
            }
            for (var i = 1; i <= 4; i++) {
                if (i == 3) {
                    continue;
                }
                if (data['list' + i]) {
                    for (var j = 0; j < data['list' + i].length; j++) {
                        data['list' + i][j].type = i;
                        data['list' + i][j].qinmi = Number(data['list' + i][j].qinmi);
                    }
                    this['list' + i][data['page' + i]] = data['list' + i];
                    if (!(data.list1 && data.list2 && data.list4) || mx.AppConfig.PREV_SCENE_ID != mx.OtherScreen.S_NAME) {
                        this['page' + i] = Number(data['page' + i]);
                    }
                    this['total' + i] = Number(data['tot' + i]);
                    this['shouli' + i] = Number(data['shouli' + i]);
                    this['baifang' + i] = Number(data['baifang' + i]);
                }
            }
            this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
        };
        FriendProxy.prototype.init_friend_sq_data = function (data) {
            this.page5 = Number(data.page);
            this.total5 = Number(data.total);
            this.list5[this.page5] = data.log;
            var list = this.list5[this.page5];
            for (var i = 0; i < list.length; i++) {
                list[i].type = 5;
            }
            this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND, true);
        };
        FriendProxy.prototype.init_tx_tj_data = function (data) {
            this.list3[1] = data.friends;
            for (var i = 0; i < this.list3[1].length; i++) {
                this.list3[1][i].type = 3;
            }
            this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
        };
        FriendProxy.prototype.init_tx_friend_data = function (data) {
            var list = data.friends;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    list[i].type = 2;
                    list[i].qinmi = Number(list[i].qinmi);
                }
                this.hylist[data.page] = list;
                if (mx.AppConfig.PREV_SCENE_ID != mx.OtherScreen.S_NAME) {
                    this.hypage = Number(data.page);
                }
                this.hytotal = Number(data.tot);
            }
            this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
        };
        FriendProxy.prototype.set_curr_friend = function (data) {
            this.curridx = data.idx || 0;
            this.currtype = data.type || this.currtype;
        };
        FriendProxy.prototype.get_curr_tx_friend = function () {
            var fd;
            var wproxy = this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            if (wproxy.hgEnter == 'tiaoxi') {
                fd = this.hylist[this.hypage][this.curridx];
            }
            else if (wproxy.hgEnter == 'friend') {
                fd = this.get_curr_friend();
            }
            else {
                fd = gproxy.info;
            }
            return fd;
        };
        FriendProxy.prototype.get_curr_friend = function (type) {
            if (type === void 0) { type = 0; }
            if (type <= 0) {
                type = this.currtype;
            }
            var fd = this['list' + type][this['page' + type]][this.curridx];
            return fd;
        };
        FriendProxy.prototype.set_curr_tx_friend = function (fd) {
            this.hylist[this.hypage][this.curridx] = fd;
            var d = { 'user_id': fd.user_id, 'qinmi': fd.qinmi };
            for (var i = 1; i <= 4; i++) {
                if (i == 3) {
                    continue;
                }
                this.set_friend(d, i);
            }
            this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
        };
        FriendProxy.prototype.set_curr_page = function (data) {
            if (data.type) {
                this['page' + data.type] = data.page;
            }
            else {
                this.hypage = data.page;
            }
            this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
        };
        FriendProxy.prototype.buy_gift_finish = function (data) {
            var cd = this['list' + this.currtype][this['page' + this.currtype]][this.curridx];
            if (!cd) {
                return;
            }
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FriendGiftView.S_NAME, "param": cd });
        };
        FriendProxy.prototype.friend_visit_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.hy004;
                    break;
                case 2:
                    msg = mx.Lang.hy005;
                    break;
                case 3://成功
                    var type = this.currtype;
                    var cd = this.get_curr_friend();
                    cd.bf = 1;
                    data.name = cd.name;
                    data.to_id = cd.user_id;
                    this.check_gxup(cd.qinmi, Number(cd.qinmi) + Number(data.qmzj), cd);
                    cd.qinmi = Number(cd.qinmi) + Number(data.qmzj);
                    this.set_friend({ 'user_id': data.to_id, 'bf': 1 }, 1);
                    this.set_friend({ 'user_id': data.to_id, 'bf': 1 }, 2);
                    this.set_friend({ 'user_id': data.to_id, 'bf': 1 }, 4);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FriendHdongView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FriendVisitView.S_NAME, "param": data });
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 22 });
                    //玩吧消息
                    this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        'uid': cd.user_id,
                        "mtype": 3,
                        "str": mx.Lang.wbbf
                    });
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        FriendProxy.prototype.friend_gift_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.hy006;
                    break;
                case 2:
                    msg = mx.Lang.hy007;
                    break;
                case 3:
                    msg = mx.Lang.hy008;
                    break;
                case 4://成功
                    var itemarr = [2007, 2008, 2009, 2021];
                    msg = mx.Tools.format(mx.Lang.hy009[itemarr.indexOf(data.item_id)], data.qmzj + '');
                    var pproxy = this.facade.retrieveProxy(mx.PackProxy.NAME);
                    pproxy.set_item_num(data.item_id, pproxy.get_item_num(data.item_id) - Number(data.num));
                    var cd = this['list' + this.currtype][this['page' + this.currtype]][this.curridx];
                    var gxup = this.check_gxup(cd.qinmi, Number(cd.qinmi) + Number(data.qmzj), cd);
                    if (gxup) {
                        this.gift_state = true;
                        this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FriendGiftView.S_NAME);
                    }
                    cd.qinmi = Number(cd.qinmi) + Number(data.qmzj);
                    //玩吧消息
                    this.sendNotification(mx.MX_NOTICE.GAME_TS_MSG, {
                        'uid': cd.user_id,
                        "mtype": 3,
                        "str": mx.Lang.wbzsh
                    });
                    if (cd.qinmi >= 0 && cd.qinmi - Number(data.qmzj) < 0) {
                        //非亲家添加到好友列表
                        if (cd.guanxi != 5) {
                            this.total2++;
                            this.page2 = 1;
                            this.list2 = { 1: [] };
                            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                't': mx.MX_NETS.CS_FRIEND_DATA,
                                'type': 2,
                                'page': 1,
                                'skip': true
                            });
                        }
                        //从仇人列表移除
                        var totpage = void 0;
                        var hasrev = false;
                        for (var type = 1; type <= 4; type += 3) {
                            totpage = Math.ceil(this['total' + type] / 4);
                            for (var i = 1; i <= totpage; i++) {
                                if (!this['list' + type][i]) {
                                    continue;
                                }
                                for (var j = 0; j < this['list' + type][i].length; j++) {
                                    if (this['list' + type][i][j].user_id == cd.user_id) {
                                        if (type == 1) {
                                            //亲家直接修改状态为好友
                                            this['list' + type][i][j].qinmi = cd.qinmi;
                                            this['list' + type][i][j].guanxi = 3;
                                        }
                                        else {
                                            hasrev = true;
                                            this['list' + type][i].splice(j, 1);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        if (hasrev) {
                            this.total4--;
                            totpage = Math.ceil(this.total4 / 4);
                            if (this.total4 % 4 == 0) {
                                this.page4 = Math.min(this.page4, totpage);
                                this.page4 = Math.max(1, this.page4);
                            }
                            this.check_page_null(4);
                        }
                        this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FriendGiftView.S_NAME);
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        //申请好友
        FriendProxy.prototype.friend_sq_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err03;
                    break;
                case 1:
                    msg = mx.Lang.hy026;
                    break;
                case 2:
                    msg = mx.Lang.hy011;
                    break;
                case 3://成功
                    msg = mx.Lang.hy028;
                    this.set_friend({ 'user_id': data.to_id, 'apply': 1 }, 1);
                    this.set_friend({ 'user_id': data.to_id, 'apply': 1 }, 3);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FriendAddView.S_NAME);
                    var uproxy = this.facade.retrieveProxy(mx.UnionProxy.NAME);
                    uproxy.sq_friend(data.to_id);
                    for (var i in this.tw_list) {
                        if (this.tw_list[i].user_id == data.to_id) {
                            this.tw_list[i].apply = 0;
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        //移除好友
        FriendProxy.prototype.friend_remove_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.hy021;
                    break;
                case 2:
                    msg = mx.Lang.hy022;
                    var fid = void 0;
                    if (mx.AppConfig.PREV_SCENE_ID == mx.TiaoXiScreen.S_NAME) {
                        //修改本地调戏好友数据
                        fid = this.hylist[this.hypage][this.curridx].user_id;
                        this.hylist[this.hypage].splice(this.curridx, 1);
                        this.hytotal--;
                    }
                    else if (this.hylist[1].length > 0) {
                        //重新请求调戏好友列表
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_TX_FRIEND_DATA,
                            "page": this.hypage,
                            "skip": true
                        });
                    }
                    this.remove_from_list({ 'user_id': data.to_id }, 2);
                    this.sendNotification(mx.MX_NOTICE.FRIEND_REMOVE);
                    this.set_friend({ 'user_id': data.to_id, 'guanxi': 2 }, 1); //如果为亲家则修改关系
                    this.set_friend({ 'user_id': data.to_id, 'guanxi': 0 }, 3); //如果在推荐好友中则修改关系
                    var uproxy = this.facade.retrieveProxy(mx.UnionProxy.NAME);
                    uproxy.remove_friend(data.to_id);
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    break;
                case 3:
                    msg = mx.Lang.hy023;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        //处理好友申请
        FriendProxy.prototype.friend_accept_cb = function (data) {
            var msg;
            var cd = this.get_curr_friend(5);
            switch (data.state) {
                case 0:
                    msg = mx.Lang.hy029;
                    if (cd) {
                        this.remove_from_list(cd, 5);
                        this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    }
                    break;
                case 1:
                    msg = mx.Lang.hy014;
                    break;
                case 2:
                    msg = mx.Lang.err03;
                    break;
                case 3:
                    msg = mx.Lang.hy011;
                    if (cd) {
                        this.remove_from_list(cd, 5);
                        this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    }
                    break;
                case 4:
                    msg = mx.Lang.hy012;
                    break;
                case 5:
                    msg = mx.Lang.hy030;
                    break;
                case 6:
                    msg = mx.Lang.hy025;
                    break;
                case 7://添加成功
                    msg = mx.Lang.hy013;
                    var fd = data.friend;
                    var type = this.currtype;
                    if (type == 5) {
                        //同意好友申请
                        this.remove_from_list(fd, 5);
                    }
                    if (fd.guanxi == 3) {
                        //修改亲家guanxi
                        this.set_friend({ 'user_id': fd.user_id, 'guanxi': 3 }, 1);
                    }
                    else {
                        //加入好友列表
                        this.total2++;
                        fd.type = 2;
                        this.add_to_list(fd, 2);
                        this.baifang2 = true;
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    var hytot = Math.ceil(this.hytotal / 5);
                    if (this.hylist[hytot] && this.hylist[hytot].length > 0) {
                        if (this.hylist[hytot].length < 5) {
                            this.hylist[hytot] = null;
                        }
                        else {
                            hytot++;
                        }
                    }
                    else if (!this.hylist[1] || (this.hylist[1] && this.hylist[1].length == 0)) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_TX_FRIEND_DATA,
                            "page": 1,
                            "skip": true
                        });
                    }
                    break;
                case 8://拒绝成功
                    msg = mx.Lang.hy031;
                    if (cd) {
                        this.remove_from_list(cd, 5);
                        this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    }
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        //检测是否关系升级
        FriendProxy.prototype.check_gxup = function (qinmi1, qinmi2, fd) {
            var gx1 = mx.Tools.qinmi_to_gxi(qinmi1);
            var gx2 = mx.Tools.qinmi_to_gxi(qinmi2);
            if (qinmi1 < qinmi2 && gx1 != gx2) {
                var api = mx.ApiTool.getAPI(mx.MX_APINAME.QINMI);
                var id = Number(gx2.split('_')[0].split('gxi')[1]);
                if (api[Math.min(10, id)]) {
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        'name': mx.FriendGXUPView.S_NAME,
                        'param': {
                            'name': fd.name,
                            'gxi': api[Math.min(10, id)].relation
                        }
                    });
                    return true;
                }
            }
            return false;
        };
        FriendProxy.prototype.add_to_list = function (data, type, addold) {
            if (addold === void 0) { addold = false; }
            var list = this['list' + type];
            var page = this['page' + type];
            var tot = this['total' + type];
            var totpage = Math.ceil(tot / 4);
            var cleanlist = false;
            if (addold) {
                //本地加数据暂时只支持新好友添加，仇人转好友需要重新请求好友列表
            }
            if (list[totpage] && tot % 4 != 1) {
                //最后一页插入
                list[totpage].push(data);
            }
            else if (tot % 4 == 1) {
                //新增一页插入
                list[totpage] = [];
                list[totpage].push(data);
            }
        };
        //type != 3
        FriendProxy.prototype.remove_from_list = function (data, type) {
            var list = this['list' + type];
            var hasrev = false;
            var totpage = Math.ceil(this['total' + type] / (type == 3 ? 5 : 4));
            for (var i = 1; i <= totpage; i++) {
                if (!list[i]) {
                    continue;
                }
                for (var j = 0; j < list[i].length; j++) {
                    if (list[i][j].user_id == data.user_id) {
                        list[i].splice(j, 1);
                        this['total' + type]--;
                        hasrev = true;
                        i = totpage;
                        break;
                    }
                }
            }
            totpage = Math.ceil(this['total' + type] / 4);
            if (this['total' + type] % 4 == 0) {
                this['page' + type] = Math.min(this['page' + type], totpage);
                this['page' + type] = Math.max(1, this['page' + type]);
            }
            if (hasrev) {
                this.check_page_null(type);
            }
        };
        FriendProxy.prototype.check_page_null = function (type) {
            var list = this['list' + type];
            var totpage = Math.ceil(this['total' + type] / (type == 3 ? 5 : 4));
            var curpage = this['page' + type];
            if (!list[curpage]) {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    't': mx.MX_NETS.CS_FRIEND_DATA,
                    'type': type,
                    'page': curpage,
                    'skip': true
                });
                return;
            }
            else if (this['total' + type] % 4 == 0) {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    't': mx.MX_NETS.CS_FRIEND_DATA,
                    'type': type,
                    'page': curpage,
                    'skip': true
                });
                for (var pg = curpage + 1; pg <= totpage; pg++) {
                    list[pg] = null;
                }
                return;
            }
            if (list[curpage].length == 0) {
                if (curpage == totpage) {
                    if (curpage == 1) {
                        list[curpage] = null;
                    }
                    else if (list[curpage - 1]) {
                        this['page' + type]--;
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            't': mx.MX_NETS.CS_FRIEND_DATA,
                            'type': type,
                            'page': curpage - 1,
                            'skip': true
                        });
                    }
                }
                else {
                    if (list[curpage + 1]) {
                        for (var p = curpage; p <= totpage; p++) {
                            if (list[p + 1]) {
                                list[p] = list[p + 1];
                            }
                        }
                    }
                    else {
                        delete (list[totpage]);
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            't': mx.MX_NETS.CS_FRIEND_DATA,
                            'type': type,
                            'page': curpage,
                            'skip': true
                        });
                    }
                }
            }
        };
        FriendProxy.prototype.set_friend = function (data, type) {
            var list = this['list' + type];
            var tot = Math.ceil(this['total' + type] / (type == 3 ? 5 : 4));
            for (var i = 1; i <= tot; i++) {
                if (!list[i]) {
                    continue;
                }
                for (var j = 0; j < list[i].length; j++) {
                    if (list[i][j].user_id == data.user_id) {
                        for (var k in data) {
                            if (k == 'qinmi') {
                                var fd = list[i][j];
                                this.check_gxup(fd[k], data[k], fd);
                            }
                            if (k != 'user_id') {
                                list[i][j][k] = data[k];
                            }
                        }
                        break;
                    }
                }
            }
        };
        FriendProxy.prototype.shouli_cb = function (data) {
            var str;
            var cd = this.get_curr_friend();
            switch (data.state) {
                case 0://不是好友或亲家关系不能领取
                    str = mx.Lang.hy036;
                    break;
                case 1://该好友今天已经领取过
                    str = mx.Lang.hy037;
                    cd.shouli = 1;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    break;
                case 2://今日收礼已达次数上限
                    if (this.currtype == 1) {
                        this.shouli_flag[1] = false;
                    }
                    else {
                        this.shouli_flag[0] = false;
                    }
                    str = mx.Lang.hy038;
                    break;
                case 3://
                    cd.shouli = 1;
                    this["shouli" + this.currtype]++;
                    this.shouli_flag = [];
                    this.shouli_flag = data.shouli;
                    if (this["shouli" + this.currtype] >= this.slmax || this["shouli" + this.currtype] >= this["total" + this.currtype]) {
                        if (this.currtype == 1) {
                            this.shouli_flag[1] = false;
                        }
                        else {
                            this.shouli_flag[0] = false;
                        }
                    }
                    data.to_id = cd.user_id;
                    this.set_friend({ 'user_id': data.to_id, 'shouli': 1 }, 1);
                    this.set_friend({ 'user_id': data.to_id, 'shouli': 1 }, 2);
                    this.set_friend({ 'user_id': data.to_id, 'shouli': 1 }, 4);
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 3, "add": 1 });
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        FriendProxy.prototype.yjbaifang_cb = function (data) {
            if (data.state) {
                if (this.currtype == 1) {
                    this.baifang1 = false;
                }
                else {
                    this.baifang2 = false;
                }
                this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                    'id': 22,
                    'num': Number(data.num)
                });
                var list = Number(data.type == 1) ? this.list2 : this.list1;
                for (var k in list) {
                    for (var j in list[k]) {
                        list[k][j].qinmi += 10;
                    }
                }
                this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy040 });
            }
            else {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy039 });
            }
        };
        FriendProxy.prototype.yjshouli_cb = function (data) {
            var str;
            switch (data.state) {
                case 1://没有可以收礼的
                    if (this.currtype == 1) {
                        this.shouli_flag[1] = false;
                    }
                    else {
                        this.shouli_flag[0] = false;
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    str = mx.Lang.hy043;
                    break;
                case 0://今日收礼已达次数上限
                    if (this.currtype == 1) {
                        this.shouli_flag[1] = false;
                    }
                    else {
                        this.shouli_flag[0] = false;
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    str = mx.Lang.hy038;
                    break;
                case 2://
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    if (Number(data.shouli) >= this.slmax) {
                        str = mx.Tools.format(mx.Lang.hy044, this.slmax - this["shouli" + this.currtype], mx.Lang.hy047[2 - this.currtype]);
                    }
                    else {
                        str = mx.Tools.format(mx.Lang.hy045, Number(data.shouli) - this["shouli" + this.currtype], mx.Lang.hy047[2 - this.currtype]);
                    }
                    gproxy.wenzi_award.text = str;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.WanBaLiBaoAlert.S_NAME,
                        "param": "wenzi"
                    });
                    this["shouli" + this.currtype] = Number(data.shouli);
                    if (this.currtype == 1) {
                        this.shouli_flag[1] = false;
                    }
                    else {
                        this.shouli_flag[0] = false;
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    return;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        FriendProxy.prototype.check_yjsl_cb = function (data) {
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            if (2000 - dproxy.get_currency("tili") < data.num) {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": {
                        "t": mx.MX_NETS.CS_FREIEND_YJSL,
                        "type": this.currtype == 2 ? 1 : 2
                    },
                    "param": mx.Lang.hy046
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_FREIEND_YJSL,
                    "type": this.currtype == 2 ? 1 : 2
                });
            }
        };
        FriendProxy.prototype.init_twinfo = function (data) {
            this.total1 = mx.Tools.obj2arr(data.data).length;
            this.shouli_flag[1] = 0;
            for (var i in data.data) {
                data.data[i].avatar = this.tw_list[i].picture;
                data.data[i].nickName = this.tw_list[i].nickName;
                data.data[i].gender = this.tw_list[i].gender;
                data.data[i].openid = i;
                //同玩一键收礼小红点
                if (!data.data[i].gather) {
                    this.shouli_flag[1]++;
                }
            }
            var arr = mx.Tools.obj2arr(data.data);
            this.tw_list = arr.sort(function (a, b) {
                return (Number(b.dengji) - Number(a.dengji));
            });
            for (var i_1 in this.tw_list) {
                this.tw_list[i_1].idx = Number(i_1) + 1;
            }
            this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
        };
        FriendProxy.prototype.twshouli_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.hy051;
                    break;
                case 1:
                    for (var i in this.tw_list) {
                        if (this.tw_list[i].user_id == data.to_id) {
                            this.tw_list[i].gather = 2;
                            this.tw_list[i].demand = 0;
                            if (typeof data.donate != "undefined") {
                                this.tw_list[i].donate = data.donate;
                            }
                            this.shouli_flag[1]--;
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    break;
                case 2:
                    msg = mx.Lang.wbvip03;
                    break;
                case 3:
                    msg = mx.Lang.hy038;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        FriendProxy.prototype.twzengsong_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0://我有未领
                    msg = mx.Lang.hy055;
                    break;
                case 1:
                    for (var i in this.tw_list) {
                        if (this.tw_list[i].user_id == data.to_id) {
                            this.tw_list[i].donate = 0;
                            if (typeof data.gather != "undefined") {
                                this.tw_list[i].gather = data.gather;
                            }
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 22 });
                    break;
                case 2://对方未领
                    msg = mx.Lang.hy052;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        FriendProxy.prototype.twsuoqu_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.hy056;
                    break;
                case 1:
                    for (var i in this.tw_list) {
                        if (this.tw_list[i].user_id == data.to_id) {
                            this.tw_list[i].demand = 0;
                            if (typeof data.gather != "undefined") {
                                this.tw_list[i].gather = data.gather;
                            }
                            break;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    break;
                case 2:
                    msg = mx.Lang.hd006;
                    break;
                case 3:
                    msg = mx.Lang.hy057;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        FriendProxy.prototype.twyjlq_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.p0015;
                    break;
                case 1:
                    for (var j in data.inf) {
                        for (var i in this.tw_list) {
                            if (this.tw_list[i].user_id == data.inf[j].to_id) {
                                this.tw_list[i].gather = 2;
                                this.tw_list[i].demand = 0;
                                if (typeof data.inf[j].donate != "undefined") {
                                    this.tw_list[i].donate = data.inf[j].donate;
                                }
                                break;
                            }
                        }
                    }
                    this.shouli_flag[1] = 0;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_FRIEND);
                    break;
                case 2:
                    msg = mx.Lang.fb040;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        FriendProxy.NAME = "FriendProxy";
        return FriendProxy;
    }(puremvc.Proxy));
    mx.FriendProxy = FriendProxy;
    __reflect(FriendProxy.prototype, "mx.FriendProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FriendProxy.js.map