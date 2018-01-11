/**
 *   @author qianjun
 *   @date 2015.2.25
 *   @desc 省亲数据处理
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
    var XqinProxy = (function (_super) {
        __extends(XqinProxy, _super);
        function XqinProxy() {
            var _this = _super.call(this, XqinProxy.NAME) || this;
            _this.in_xing_qin = [];
            _this.cur_type = 0;
            /*-------子女省亲------*/
            _this.zinv_info = [];
            _this.zinv_total = 0;
            _this.xz_fz_info = [];
            _this.zn_idx = 0;
            _this.page_click = false;
            _this._gift_id = 0;
            _this.suo_idx = 0;
            return _this;
        }
        XqinProxy.prototype.fz_xq_data = function (adata) {
            this.fz_xq_info = [];
            this.in_xing_qin = [];
            this.xz_fz_info = [];
            this.page_select = {};
            this.cur_type = Number(adata.type) + 1;
            var field = this.cur_type == 1 ? "y_id" : "zinv_id";
            var data = adata.data;
            var arr = [];
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var lv = gproxy.user_lv;
            var vip = gproxy.user_vip;
            var total = 0;
            for (var i in adata.mache) {
                if (typeof adata.mache[i] != 'undefined') {
                    ++total;
                }
            }
            var num = 5;
            var need = {
                "6": 30,
                "7": 45,
                "8": 60,
                "9": 2,
                "10": 5,
                "11": 9,
                "12": 1,
                "13": 2,
                "14": 3,
            };
            if (lv >= 60) {
                num += 3;
            }
            else if (lv >= 45) {
                num += 2;
            }
            else if (lv >= 30) {
                num += 1;
            }
            if (vip >= 9) {
                num += 3;
            }
            else if (vip >= 5) {
                num += 2;
            }
            else if (vip >= 2) {
                num += 1;
            }
            var des = total - num;
            var temp_arr = mx.Tools.arr2obj(data, "biaoji");
            for (var i = 1; i <= 14; ++i) {
                var obj = void 0;
                if (i <= 5) {
                    if (temp_arr[i]) {
                        obj = temp_arr[i];
                        obj.idx = i;
                        obj.cishu = adata.mache[i];
                        this.in_xing_qin.push(obj[field]);
                    }
                    else {
                        obj = { "empty": true, "idx": i, "cishu": adata.mache[i] };
                    }
                }
                else {
                    var flag = false;
                    var param = void 0;
                    switch (i) {
                        case 6:
                        case 7:
                        case 8:
                            param = lv;
                            break;
                        case 9:
                        case 10:
                        case 11:
                            param = vip;
                            break;
                        case 12:
                        case 13:
                        case 14:
                            param = des;
                            break;
                    }
                    if (param >= need[i.toString()]) {
                        if (temp_arr[i]) {
                            obj = temp_arr[i];
                            obj.idx = i;
                            obj.cishu = adata.mache[i];
                            this.in_xing_qin.push(obj[field]);
                        }
                        else {
                            obj = { "empty": true, "idx": i, "cishu": adata.mache[i] };
                        }
                    }
                    else {
                        obj = { "suo": true, "need": need[i.toString()], "idx": i, "param": param };
                    }
                }
                arr.push(obj);
            }
            arr.sort(this.sort_func2);
            this.fz_xq_info = arr;
            this.fresh_mache();
            this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
        };
        XqinProxy.prototype.fresh_mache = function () {
            this.mache_total = 0;
            for (var i in this.fz_xq_info) {
                this.fz_xq_info[i].index = i;
                if (Number(this.fz_xq_info[i].cishu) < 3 && (this.fz_xq_info[i].empty) || (this.fz_xq_info[i].prepare)) {
                    ++this.mache_total;
                }
            }
        };
        XqinProxy.prototype.isCD = function () {
            var flag = true;
            var count = 0;
            for (var i in this.fz_xq_info) {
                var unit = this.fz_xq_info[i];
                if (typeof unit.time != 'undefined') {
                    if (Number(unit.time) == 0) {
                        //有已经省亲好了的
                        return false;
                    }
                }
                else {
                    ++count;
                }
            }
            if (count == this.fz_xq_info.length) {
                flag = false;
            }
            return flag;
        };
        XqinProxy.prototype.sort_func2 = function (a, b) {
            if (!a.suo && !b.suo) {
                var a1 = typeof a.time == 'undefined';
                var b1 = typeof b.time == 'undefined';
                if (!a1 && !b1) {
                    return Number(a.id) - Number(b.id);
                }
                else if (a1 && !b1) {
                    return 1;
                }
                else if (b1 && !a1) {
                    return -1;
                }
                else {
                    var c1 = Number(a.cishu);
                    var c2 = Number(b.cishu);
                    if (c1 >= 3 && c2 >= 3) {
                        return a.idx - b.idx;
                    }
                    else if (c1 >= 3 && c2 < 3) {
                        return 1;
                    }
                    else if (c1 < 3 && c2 >= 3) {
                        return -1;
                    }
                    else {
                        return c2 - c1;
                    }
                }
            }
            else if (!a.suo && b.suo) {
                return -1;
            }
            else if (a.suo && !b.suo) {
                return 1;
            }
            else {
                return a.idx - b.idx;
            }
        };
        XqinProxy.prototype.decrease_cold = function (delay) {
            for (var i in this.fz_xq_info) {
                if (typeof this.fz_xq_info[i].time != 'undefined') {
                    if (this.fz_xq_info[i].time > 0) {
                        this.fz_xq_info[i].time -= delay;
                    }
                }
            }
        };
        XqinProxy.prototype.get_men_data = function (page) {
            var feizi = this.fz_xq_info;
            var page_data = [];
            if (page) {
                for (var i = (page - 1) * 4; i < page * 4; ++i) {
                    if (feizi[i]) {
                        feizi[i].type = this.cur_type;
                        //feizi[i].id = i;
                        page_data.push(feizi[i]);
                    }
                }
            }
            else {
                page_data = feizi;
            }
            //1为二代妃 2为美男
            return page_data;
        };
        XqinProxy.prototype.set_zinv_id = function (id) {
            this._zinv_id = id;
        };
        Object.defineProperty(XqinProxy.prototype, "zinv_id", {
            get: function () {
                return this._zinv_id;
            },
            enumerable: true,
            configurable: true
        });
        XqinProxy.prototype.find_mache_idx = function (id) {
            var field = this.cur_type == 1 ? "y_id" : "zinv_id";
            for (var i in this.fz_xq_info) {
                if (Number(this.fz_xq_info[i][field]) == Number(id)) {
                    return this.fz_xq_info[i];
                }
            }
        };
        //妃子省亲
        XqinProxy.prototype.xingqin_gift = function (data) {
            var msg;
            switch (data.state) {
                case 0://妃子已死亡或被掠夺
                    msg = mx.Lang.hg024;
                    break;
                case 1:
                    msg = mx.Lang.xq002;
                    break;
                case 2:
                    msg = mx.Lang.xq005;
                    break;
                case 3:
                    msg = mx.Lang.xq013;
                    break;
                case 4:
                    var men = this.get_men_data();
                    if (men.length) {
                        for (var key in men) {
                            var info = men[key];
                            if (info.y_id == data.y_id) {
                                this.fz_xq_info[info.index].time = data.time;
                                this.fz_xq_info[info.index].y_id = data.y_id;
                                this.fz_xq_info[info.index].id = data.id;
                                delete this.fz_xq_info[info.index].prepare;
                                for (var i in this.xz_fz_info) {
                                    if (this.xz_fz_info[i].id == data.y_id) {
                                        this.xz_fz_info.splice(Number(i), 1);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    this.fresh_mache();
                    this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
                    return;
                default:
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        XqinProxy.prototype.xingqin_fresh_cd = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.xq004;
                    break;
                case 2:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d2 = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
                    return;
                case 3:
                    var field = this.cur_type == 1 ? "y_id" : "zinv_id";
                    var men = this.get_men_data();
                    if (men.length) {
                        for (var key in men) {
                            var info = men[key];
                            if (info[field] == data.id) {
                                this.fz_xq_info[info.index].time = Number(data.time);
                                break;
                            }
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
                    msg = mx.Lang.xq047;
                    break;
                default:
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        XqinProxy.prototype.xingqin_fz_lq_gift = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 3://省亲/回家 时间未结束
                    msg = mx.Lang.xq048;
                    break;
                case 2:
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    var men = this.get_men_data();
                    var avatar = null;
                    var hero_id = null;
                    var field = this.cur_type == 1 ? 'y_id' : "zinv_id";
                    if (men.length) {
                        for (var key in men) {
                            var info = men[key];
                            if (info[field] == data.id) {
                                var idx = info.idx;
                                var id = info.id;
                                if (info.zinv_info) {
                                    avatar = info.zinv_info.avatar;
                                }
                                hero_id = info.id;
                                this.fz_xq_info[info.index] = {
                                    "empty": true,
                                    "idx": idx,
                                    "id": id,
                                    "cishu": Math.min(Number(info.cishu) + 1, 3),
                                    "index": info.index
                                };
                                this.in_xing_qin.splice(this.in_xing_qin.indexOf(data.id), 1);
                                break;
                            }
                        }
                    }
                    this.fz_xq_info.sort(this.sort_func2);
                    this.fresh_mache();
                    this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 24 }); //完成省亲任务
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 9, "add": 1 });
                    var type = this.cur_type;
                    if (type == 1) {
                        avatar = pproxy.mn_d[data.id].avatar;
                    }
                    else {
                        if (!avatar) {
                            var zn_arr = mx.Tools.arr2obj(this.zinv_info, 'id');
                            var cd = zn_arr[data.id];
                            avatar = cd.avatar;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.XQGuiLaiView.S_NAME,
                        "param": {
                            "shenfen": 1,
                            "avatar": avatar,
                            "hero_id": hero_id,
                            "field": type
                        }
                    });
                    return;
                default:
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        XqinProxy.prototype.sort_func = function (a, b) {
            if (a.weifen && b.weifen) {
                return parseInt(a.weifen) - parseInt(b.weifen);
            }
            else if (a.weifen) {
                return -1;
            }
            else if (b.weifen) {
                return 1;
            }
            else {
                return -1;
            }
        };
        XqinProxy.prototype.xq_cjzn_info = function (data) {
            this.zinv_info = [];
            var arr = [];
            for (var i in data.data) {
                var unit = data.data[i];
                if (unit) {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", unit.weifen);
                    var idx = this.in_xing_qin.indexOf(unit.id);
                    if (api) {
                        arr.push({
                            "id": unit.id,
                            "mid": Number(unit.id) + 1000,
                            "avatar": unit.avatar,
                            "hero": mx.Tools.get_zn_res(unit.avatar, "jq"),
                            "name": unit.xing + unit.name,
                            "meili": unit.meili,
                            "weifen": unit.sex == 1 ? api.weifeng : api.weifenb,
                            "weifen2": Number(unit.weifen),
                            "chongai": Number(unit.pet),
                            "dibg": "wfdchen_png",
                            "zibg": "cazdchen_png",
                            "namedi": true,
                            "sex": unit.sex,
                            "hunpei": unit.hunpei,
                            "status": unit.status,
                            "xqin": true,
                            "xq_select": idx > -1,
                            "is_lg": false
                        });
                    }
                    else {
                        arr.push({
                            "id": unit.id,
                            "mid": Number(unit.id) + 1000,
                            "avatar": unit.avatar,
                            "hero": mx.Tools.get_zn_res(unit.avatar, "jq"),
                            "name": unit.xing + unit.name,
                            "meili": unit.meili,
                            "weifen": "冷宫中",
                            "weifen2": 14,
                            "chongai": Number(unit.pet),
                            "dibg": "wfdchen_png",
                            "zibg": "cazdchen_png",
                            "namedi": true,
                            "sex": unit.sex,
                            "xqin": true,
                            "xq_select": idx > -1,
                            "is_lg": Number(unit.cold) == 1
                        });
                    }
                }
            }
            arr.sort(function (a, b) {
                return (Number(a.weifen2) - Number(b.weifen2));
            });
            this.zinv_info = arr;
            this.zinv_total = data.total;
            if (data.type == 1) {
                var c_num = 0;
                for (var k in arr) {
                    var c_zn = arr[k];
                    if (c_num < this.mache_total && !c_zn.xq_select && !c_zn.is_lg) {
                        this.xz_fz_info.push({
                            "id": c_zn.id,
                            "zinv_info": c_zn
                        });
                        c_num = Math.min(this.mache_total, c_num + 1);
                    }
                }
                if (this.xz_fz_info.length < this.mache_total && Math.ceil(data.total / 30) > data.page_id) {
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_YXD_XQ_CJZN,
                        "page_id": data.page_id + 1,
                        "type": 1
                    });
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.SELECT_FZ);
                }
                return;
            }
            if (this.page_click) {
                this.sendNotification(mx.MX_NOTICE.XQIN_CJZN);
            }
            else {
                this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.SelectFZView.S_NAME,
                    "param": {
                        "data": this.zinv_info,
                        "type": 2,
                        "idx": this.zn_idx
                    }
                });
            }
        };
        XqinProxy.prototype.zn_xq_data = function (data) {
            var msg;
            switch (data.state) {
                case 0://参数错误，不是健康的出嫁子女
                    msg = mx.Lang.err01;
                    break;
                case 1://孩子已经省亲中
                    msg = mx.Lang.xq006;
                    break;
                case 2://没有剩余空位
                    msg = mx.Lang.xq040;
                    break;
                case 3:
                    var men = this.get_men_data();
                    if (men.length) {
                        for (var key in men) {
                            var info = men[key];
                            if (info.zinv_id == data.zinv_id) {
                                this.fz_xq_info[info.index].time = data.time;
                                this.fz_xq_info[info.index].zinv_id = data.zinv_id;
                                this.fz_xq_info[info.index].id = data.id;
                                delete this.fz_xq_info[info.index].prepare;
                                for (var i in this.xz_fz_info) {
                                    if (this.xz_fz_info[i].id == data.zinv_id) {
                                        this.xz_fz_info.splice(Number(i), 1);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    this.fresh_mache();
                    this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
                    return;
                default:
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        XqinProxy.prototype.set_gift_id = function (id) {
            this._gift_id = id;
        };
        XqinProxy.prototype.xingqin_zinv_guixing_all = function (data) {
            var msg;
            msg = this.cur_type == 1 ? mx.Lang.xq018 : mx.Lang.xq034;
            for (var i in data.data) {
                var unit = data.data[i];
                var field = this.cur_type == 1 ? "y_id" : "zinv_id";
                if ((Number(data.type) == 0 && unit.state == 4) || (Number(data.type) == 1 && unit.state == 3)) {
                    msg = mx.Lang.xq001;
                    var men = this.get_men_data();
                    if (men.length) {
                        for (var key in men) {
                            var info = men[key];
                            if (info[field] == unit[field]) {
                                if (this.cur_type == 1) {
                                    this.fz_xq_info[info.index] = {
                                        "y_id": unit[field],
                                        "time": unit.time,
                                        "idx": info.idx,
                                        'id': unit.id,
                                        'cishu': info.cishu,
                                        "index": info.index
                                    };
                                }
                                else {
                                    this.fz_xq_info[info.index] = {
                                        "zinv_id": unit[field],
                                        "time": unit.time,
                                        "idx": info.idx,
                                        'id': unit.id,
                                        'zinv_info': info.zinv_info,
                                        'cishu': info.cishu,
                                        "index": info.index
                                    };
                                }
                                for (var i_1 in this.xz_fz_info) {
                                    if (this.xz_fz_info[i_1].id == unit[field]) {
                                        this.xz_fz_info.splice(Number(i_1), 1);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
            this.fresh_mache();
            this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        XqinProxy.prototype.xingqin_xq_huigong_all = function (data) {
            var msg;
            msg = this.cur_type == 1 ? mx.Lang.xq009 : mx.Lang.xq035;
            if (data.id) {
                var field = this.cur_type == 1 ? "y_id" : "zinv_id";
                var id_arr = data.id.split('|');
                if (id_arr.length) {
                    msg = null;
                    for (var i in id_arr) {
                        var u_id = id_arr[i];
                        for (var key in this.fz_xq_info) {
                            var info = this.fz_xq_info[key];
                            if (info[field] == u_id) {
                                var idx = info.idx;
                                var id = info.id;
                                this.fz_xq_info[info.index] = {
                                    "empty": true,
                                    "idx": idx,
                                    "id": id,
                                    "cishu": Math.min(Number(info.cishu) + 1, 3),
                                    "index": info.index
                                };
                                this.in_xing_qin.splice(this.in_xing_qin.indexOf(u_id), 1);
                                break;
                            }
                        }
                    }
                    this.fz_xq_info.sort(this.sort_func2);
                    this.fresh_mache();
                    this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 24 }); //完成省亲任务
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, { "act_id": 9, "add": id_arr.length });
                }
            }
            else {
                for (var i in this.fz_xq_info) {
                    var unit = this.fz_xq_info[i];
                    if (typeof unit.time != 'undefined') {
                        if (Number(unit.time) > 0) {
                            msg = this.cur_type == 1 ? mx.Lang.xq036 : mx.Lang.xq037;
                            break;
                        }
                    }
                }
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        XqinProxy.prototype.xingqin_xq_add_mc = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = this.cur_type == 1 ? mx.Lang.xq032 : mx.Lang.xq042;
                    break;
                case 1:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d2 = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
                    break;
                case 2:
                    msg = mx.Lang.xq030;
                    for (var i in this.fz_xq_info) {
                        if (this.fz_xq_info[i].suo && this.fz_xq_info[i].idx == this.suo_idx) {
                            this.fz_xq_info[i].empty = true;
                            this.fz_xq_info[i].cishu = 0;
                            delete this.fz_xq_info[i].suo;
                            delete this.fz_xq_info[i].need;
                            delete this.fz_xq_info[i].param;
                        }
                        if (this.fz_xq_info[i].suo && this.fz_xq_info[i].idx >= 12) {
                            if (typeof this.fz_xq_info[i].param != 'undefined') {
                                this.fz_xq_info[i].param += 1;
                            }
                        }
                    }
                    this.fz_xq_info.sort(this.sort_func2);
                    this.fresh_mache();
                    this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
                    break;
                default:
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        XqinProxy.prototype.xq_cost_add = function (data) {
            var msg = mx.MX_NOTICE.POP_VIEW;
            var param = {
                "name": mx.AlertView.S_NAME,
                "param": {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": { "t": mx.MX_NETS.CS_XQ_CD_CLEARALL, "type": this.cur_type - 1 },
                    "param": mx.Tools.format(this.cur_type == 1 ? mx.Lang.xq045 : mx.Lang.xq046, data.need)
                }
            };
            this.sendNotification(msg, param);
        };
        XqinProxy.prototype.xq_clear_cd_all = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.xq004;
                    break;
                case 1:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d2 = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d2);
                    return;
                case 2:
                    for (var i in this.fz_xq_info) {
                        if (typeof this.fz_xq_info[i].time != 'undefined') {
                            this.fz_xq_info[i].time = 0;
                        }
                    }
                    this.sendNotification(mx.MX_NOTICE.XINGQIN_TIME);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_YXD_XQ_HUIGONG_ALL, "type": this.cur_type - 1 });
                    return;
                default:
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        XqinProxy.prototype.get_dyn_arr = function (obj) {
            //妃子资源动态加载
            var arr = [];
            var c_d = obj.param;
            if (c_d.type == 1) {
                for (var i in c_d.data) {
                    var unit = c_d.data[i];
                    arr.push(unit.hero);
                }
            }
            return arr;
        };
        XqinProxy.NAME = "XqinProxy";
        return XqinProxy;
    }(puremvc.Proxy));
    mx.XqinProxy = XqinProxy;
    __reflect(XqinProxy.prototype, "mx.XqinProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XqinProxy.js.map