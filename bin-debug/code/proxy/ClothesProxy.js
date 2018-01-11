/**
 *   @author qianjun
 *   @date 2015.2.25
 *   @desc 服装数据管理
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
    var ClothesProxy = (function (_super) {
        __extends(ClothesProxy, _super);
        function ClothesProxy() {
            var _this = _super.call(this, ClothesProxy.NAME) || this;
            _this.old_zli = 0;
            _this.new_zli = 0;
            /*---------------衣服脱、穿----------*/
            _this._oldpos = 0;
            _this.new_buy = false;
            _this._base_faxing = {};
            /*---------------制作、强化、进阶三UI界面----------*/
            _this.uistate = 1; //0制作、1强化、2进阶
            _this.cailiao = [];
            _this.select_index = []; //筛选属性(多选)
            _this.old_props = {};
            _this.new_props = {};
            _this.zhizuo_target = [0, 0, 0, 0, 0, 0]; //目标制作服装
            _this.qianghua_target = [0, 0, 0, 0, 0, 0]; //目标服装
            _this.jinjie_target = [0, 0, 0, 0, 0, 0]; //目标服装
            _this.buwei_target = 0;
            _this.new_cloth = [];
            /*------------玩家已有服装-------------*/
            _this._dressed = [];
            _this._undressed = [];
            _this._dressed_data = {};
            _this._undressed_data = [];
            _this._cur_type_clothes = [];
            _this._cur_type = 1;
            _this.sort_make = []; //制作
            _this.sort_qhjj = []; //强化进阶
            _this.baocun_cloth = false;
            /*-------------------约会中换装任务场景切换------------------*/
            _this._date_task = false;
            /*-------------------太庙中换装考核场景切换------------------*/
            _this._temple_test = false;
            return _this;
        }
        Object.defineProperty(ClothesProxy.prototype, "oldpos", {
            get: function () {
                if (this.new_buy) {
                    this.new_buy = false;
                    return 0;
                }
                return this._oldpos;
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.set_oldpos = function (num) {
            this._oldpos = num;
        };
        ClothesProxy.prototype.clear_cloth = function () {
            for (var i = 0; i < this._dressed.length; i++) {
                var c_info = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", this._dressed[i]);
                if (parseInt(c_info.type) != 1) {
                    delete this._dressed_data[this._dressed[i]];
                }
                else {
                    var cid = this._dressed[i];
                }
                c_info = null;
            }
            this._dressed_data = { "1007": this._base_faxing };
            this._dressed = ["1007"];
        };
        ClothesProxy.prototype.take_clothes_change = function (data) {
            var cid = data.cid;
            var index = this._dressed.indexOf(cid);
            // if (data.take_off) {//脱
            //     let c_info = ApiTool.getAPINode(MX_APINAME.CLOTH, "id", cid);
            //     let ctype = parseInt(c_info.type);
            //     c_info = null;
            //     if (ctype == 1) {
            //         this.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": Lang.fz033 });
            //         return;
            //     }
            //     if (index >= 0) {
            //         delete this._dressed_data[cid];
            //         this._dressed.splice(index, 1);
            //     }
            // }
            // else {//穿
            if (typeof cid != "undefined") {
                if (index == -1) {
                    this.take_off_cloth(cid);
                }
            }
            else {
                for (var k in data) {
                    cid = data[k].cloth_id;
                    this.temp_data = data[k];
                    this.take_off_cloth(cid);
                }
            }
            // }
            this.set_c_clothe();
            this.sendNotification(mx.MX_NOTICE.CLOTHES_ON_CHANGED);
        };
        ClothesProxy.prototype.take_off_cloth = function (cid) {
            for (var i = 0; i < this._dressed.length; i++) {
                var c_info1 = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", this._dressed[i]);
                var c_info2 = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", cid);
                var type1 = parseInt(c_info1.type);
                var type2 = parseInt(c_info2.type);
                c_info1 = null;
                c_info2 = null;
                if (type1 == type2) {
                    delete this._dressed_data[this._dressed[i]];
                    this._dressed.splice(i, 1);
                    break;
                }
            }
            //穿上
            var arr = mx.Tools.arr2obj(this.cur_type_clothes, 'cloth_id');
            this._dressed_data[cid] = arr[cid] || this.temp_data;
            this._dressed.push(cid);
            var scid = cid + "";
            if (this.new_cloth.indexOf(scid) >= 0) {
                this.new_cloth.splice(this.new_cloth.indexOf(scid), 1);
            }
            var facade = mx.ApplicationFacade.getInstance();
            if (cid < 2000) {
                this._xxkid = cid;
            }
            else if (cid < 3000) {
                this._bjkid = cid;
            }
            else {
                this._xxkid = cid;
            }
            facade.sendNotification(mx.MX_NOTICE.CLOTHES_ON_CHANGED);
        };
        ClothesProxy.prototype.cal_shuxing = function (id, qh, xj) {
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", id);
            var sx = [];
            var fzsx = ["", "HP", "MPS", "AD", "AP", "ARM", "MR", "CRIT", "MCRIT", "HPS", "MPS", "DODG", "HIT", "ARMP", "MRI", "LFS", "CDR", "HP"];
            var sx1 = Number(api.add_type) ? api.add_type : 1;
            var sx2 = Number(api.add_type2) ? api.add_type2 : 1;
            api = null;
            var obj = {};
            var num1 = this.get_sx(id, qh, xj, 1);
            obj[fzsx[Number(sx1)]] = num1;
            var num2 = 0;
            if (qh >= 10) {
                num2 = this.get_sx(id, qh, xj, 2);
            }
            obj[fzsx[Number(sx2)]] = num2;
            return obj;
        };
        ClothesProxy.prototype.get_sx = function (id, qianghua, xx, type) {
            var res;
            qianghua = Number(qianghua);
            xx = Number(xx);
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", id);
            type = type == 1 ? 1 : 2;
            var sx = type == 1 ? Number(api.add_type) : Number(api.add_type2);
            var ori = type == 1 ? Number(api.add_num) : Number(api.add_num2);
            var temp = 0;
            switch (sx) {
                case 1:
                    temp = ori * (5 + qianghua) / 5;
                    break;
                case 3:
                case 4:
                case 11:
                    temp = ori * (10 + qianghua) / 10;
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                    temp = ori * (20 + qianghua) / 20;
                    break;
                case 12:
                    temp = ori * (10 + qianghua) / 20;
                    break;
            }
            var c_xx = xx - Number(api.level);
            var jc = 0;
            var jc_arr;
            if (type == 1) {
                jc_arr = [0, 0.1, 0.15, 0.2, 0.25, 0.3];
            }
            else {
                jc_arr = [0, 0.1, 0.1, 0.1, 0.1, 0.1];
            }
            for (var i = Number(api.level); i < xx; i++) {
                jc += jc_arr[i];
            }
            api = null;
            return Math.round(temp * (jc + 1));
        };
        ClothesProxy.prototype.get_cloth_detail = function (id) {
            var res = [];
            for (var k in this.all_clothes) {
                for (var j in this.all_clothes[k]) {
                    if (Number(this.all_clothes[k][j].cloth_id) == id) {
                        res = this.all_clothes[k][j];
                    }
                }
            }
            return res;
        };
        ClothesProxy.prototype.check_qianghua_full = function () {
            var num = Number(this.c_cloth.jindu);
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTHUPCOST, "id", 20);
            var max = Number(api.price);
            api = null;
            for (var k in this.cailiao) {
                var zengjia = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", k);
                num += Number(zengjia.Quality) * this.cailiao[k];
                zengjia = null;
            }
            return num >= max;
        };
        ClothesProxy.prototype.set_qianghua_clothes = function (data) { };
        ClothesProxy.prototype.set_jinjie_clothes = function (data) { };
        ClothesProxy.prototype.set_zhizuo_clothes = function (data) { };
        ClothesProxy.prototype.buy_clothes = function (data) {
            var str;
            var facade = this.facade;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var have_money = dproxy.get_currency(data.type);
            var have = true;
            switch (data.type) {
                case "ybi":
                    if (data.price > have_money) {
                        this.sendNotification(mx.MX_NOTICE.CHOOSE_CHECK, null, "ybi");
                        have = false;
                    }
                    break;
                case "ybao":
                    if (data.price > have_money) {
                        var a_d = {
                            "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                            "param": mx.Lang.a0006
                        };
                        var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                        have = false;
                    }
                    break;
                default:
                    have = false;
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": data.type });
                    break;
            }
            if (have) {
                var csd = {
                    "t": data.t,
                    "cloth_id": data.cloth_id,
                };
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, csd);
            }
        };
        ClothesProxy.prototype.set_buy_clothes = function (data) {
            var str;
            switch (data.state) {
                case 0://参数错误
                    str = mx.Lang.err01;
                    break;
                case 1://已有该服装
                    str = mx.Lang.fz015;
                    break;
                case 2://无法直接购买
                    str = mx.Lang.fz038;
                    break;
                case 3://银币不足
                    str = mx.Lang.p0036;
                    this.sendNotification(mx.MX_NOTICE.CHOOSE_CHECK, null, "ybi");
                    break;
                case 4://元宝不足
                    str = mx.Lang.jfs18;
                    var a_d = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case 5://购买成功
                    str = mx.Lang.fz039;
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", data.cloth_id);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CLOTH_GET_BY_TYPE,
                        "type": api2.type
                    });
                    this.new_buy = true;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        ClothesProxy.prototype.add_cloth = function (data) {
            if (data.auto_id) {
                this.sendNotification(mx.MX_NOTICE.CLOTHES_ON_CHANGED, {
                    "cloth_id": data.id,
                    "id": data.auto_id
                });
            }
            //加上已制作的服装
            if (typeof this.all_clothes == "undefined") {
                return;
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", data.id);
            var type = this.all_clothes[api.type];
            api = null;
            if (typeof type == "undefined") {
                return;
            }
            type[data.id] = {
                "cloth_id": data.id,
                "jinjie": 0,
                "qianghua": 0,
                "dress": 0,
                "jindu": 0,
            };
            this.new_cloth.push(data.id);
            this._cur_type_clothes = type;
            this.qhjj_sort(true, data.type);
            this.make_sort(true, data.type);
        };
        Object.defineProperty(ClothesProxy.prototype, "dressed", {
            get: function () {
                return this._dressed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClothesProxy.prototype, "undressed", {
            get: function () {
                return this._undressed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClothesProxy.prototype, "cur_type_clothes", {
            get: function () {
                return this._cur_type_clothes;
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.set_cur_type_clothes = function (arr) {
            this._cur_type_clothes = arr;
        };
        Object.defineProperty(ClothesProxy.prototype, "dressed_data", {
            get: function () {
                return this._dressed_data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClothesProxy.prototype, "cur_type", {
            get: function () {
                return this._cur_type;
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.init_clothes = function (data) {
            if (!this.all_clothes) {
                this.all_clothes = {};
            }
            if (!this.all_cloth) {
                this.all_cloth = {};
            }
            if (!data.type) {
                this.all_cloth = mx.Tools.arr2obj(data.data, "cloth_id");
            }
            this._cur_type = data.type;
            this._cur_type_clothes = [];
            this._cur_type_clothes = data.data;
            for (var k in this._cur_type_clothes) {
                var unit = this._cur_type_clothes[k];
                unit.new = this.new_cloth.indexOf(unit.cloth_id) > -1;
            }
            //排序
            this._cur_type_clothes.sort(function (a, b) {
                var a_info = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", a.cloth_id);
                var b_info = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", b.cloth_id);
                var a_star = 1; //parseInt(a.jinjie) + parseInt(a_info.level);
                var b_star = 1; //parseInt(b.jinjie) + parseInt(b_info.level);
                a_info = null;
                b_info = null;
                if (a.new && !b.new) {
                    return -1;
                }
                else if (!a.new && b.new) {
                    return 1;
                }
                else {
                    return a.cloth_id - b.cloth_id;
                }
            });
            if (data.type && data.type != "0") {
                this.all_clothes[data.type] = mx.Tools.arr2obj(this._cur_type_clothes, "cloth_id");
            }
            this.sendNotification(mx.MX_NOTICE.GET_CLOTHES_BY_TYPE);
        };
        ClothesProxy.prototype.qhjj_sort = function (bol, data) {
            if (typeof data != "undefined" && !this.sort_qhjj[data]) {
                this.sort_qhjj[data] = [];
                bol = true;
            }
            if (!bol) {
                return;
            }
            var arr = [];
            var ids = [];
            var cloth;
            if (typeof data != "undefined") {
                cloth = this.all_clothes[data];
            }
            else {
                cloth = this.cur_type_clothes; //当前已有该类型衣服
            }
            var all_cloth = mx.ApiTool.getAPINodes(mx.MX_APINAME.CLOTH, "type", data); //当前类型所有衣服
            for (var k in cloth) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", cloth[k].cloth_id);
                if (Number(api.type) == data) {
                    var ori_xx = api.level;
                    arr.push({
                        "id": Number(cloth[k].cloth_id),
                        "xx": Number(cloth[k].jinjie) + Number(ori_xx),
                        "lv": Number(cloth[k].qianghua)
                    });
                    ids.push(Number(cloth[k].cloth_id));
                }
                api = null;
            }
            for (var k in all_cloth) {
                if (ids.indexOf(Number(all_cloth[k].id)) < 0) {
                    arr.push({
                        "id": Number(all_cloth[k].id),
                        "xx": Number(all_cloth[k].level),
                        "wei": true
                    });
                }
            }
            all_cloth = null;
            arr.sort(function (a, b) {
                var x = a.xx;
                var y = b.xx;
                if (a.wei) {
                    x -= 10;
                }
                if (b.wei) {
                    y -= 10;
                }
                return y - x;
            });
            this.sort_qhjj[data] = arr;
        };
        ClothesProxy.prototype.make_sort = function (bol, data) {
            if (typeof data != "undefined" && !this.sort_make[data]) {
                this.sort_make[data] = [];
                bol = true;
            }
            if (!bol) {
                return;
            }
            var arr = [];
            var ids = [];
            var cloth;
            if (typeof data != "undefined") {
                cloth = this.all_clothes[data];
            }
            else {
                cloth = this.cur_type_clothes; //当前已有该类型衣服
            }
            var all_cloth = mx.ApiTool.getAPINodes(mx.MX_APINAME.CLOTH, "type", data); //当前类型所有衣服
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var xian_level = gproxy.user_xlv;
            for (var k in cloth) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", cloth[k].cloth_id);
                if (Number(api.type) == data) {
                    ids.push(Number(cloth[k].cloth_id));
                }
                api = null;
            }
            for (var k in all_cloth) {
                var c_id = Number(all_cloth[k].id);
                if (ids.indexOf(c_id) < 0) {
                    var api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTHZHIZUO, "cloth_id", c_id);
                    if (api2) {
                        if (xian_level >= Number(api2.xianping)) {
                            arr.push({
                                "id": Number(all_cloth[k].id),
                                "xx": Number(all_cloth[k].level),
                                "zhizuo": false
                            });
                        }
                        else {
                            arr.push({
                                "id": Number(all_cloth[k].id),
                                "xx": Number(all_cloth[k].level),
                                "suo": true,
                                "xp": Number(api2.xianping),
                                "zhizuo": false
                            });
                        }
                        api2 = null;
                    }
                }
            }
            arr = this.check_zhizuo(arr);
            arr.sort(function (a, b) {
                var a_info = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", a.id);
                var b_info = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", b.id);
                var x; //a
                var y; //b
                x = a.xx;
                y = b.xx;
                if (a.zhizuo) {
                    x += 100;
                }
                if (b.zhizuo) {
                    y += 100;
                }
                x = a.suo ? x - a.xp : x + 50;
                y = b.suo ? y - b.xp : y + 50;
                a_info = null;
                b_info = null;
                return y - x;
            });
            this.sort_make[data] = arr;
        };
        ClothesProxy.prototype.check_zhizuo = function (data) {
            var arr = data;
            var pProxy = (this.facade.retrieveProxy(mx.PackProxy.NAME));
            for (var k in arr) {
                var zhizuo = true;
                if (!arr[k].suo) {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTHZHIZUO, "cloth_id", arr[k].id);
                    for (var i = 1; i < 4; i++) {
                        var num = Number(api["num" + i]);
                        var has = pProxy.get_item_num(Number(api["cailiao" + i]));
                        if (num > has) {
                            zhizuo = false;
                            break;
                        }
                    }
                    api = null;
                    arr[k].zhizuo = zhizuo;
                }
            }
            return arr;
        };
        ClothesProxy.prototype.check_cloth_type_item = function (type) {
            if (this.all_clothes) {
                var have = true;
                if (!this.all_clothes[type]) {
                    have = false;
                }
                if (have) {
                    this._cur_type_clothes = [];
                    this._cur_type_clothes = this.all_clothes[type];
                    this.sendNotification(mx.MX_NOTICE.GET_CLOTHES_BY_TYPE, type);
                    return;
                }
            }
            //获取支持多类型类型 |分割
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_CLOTH_GET_BY_TYPE,
                "type": type,
            });
        };
        ClothesProxy.prototype.set_c_clothe = function () {
            if (this._cur_type_clothes.length) {
                this.c_cloth = this._cur_type_clothes[0];
                for (var k in this._cur_type_clothes) {
                    if (this._dressed.indexOf(this._cur_type_clothes[k].cloth_id) >= 0) {
                        this.c_cloth = this._cur_type_clothes[k];
                        break;
                    }
                }
            }
        };
        ClothesProxy.prototype.init_dressed_clothes = function (data) {
            this._dressed_data = {};
            this._dressed_data = mx.Tools.arr2obj(data.data, "cloth_id");
            this._dressed = [];
            for (var key in this._dressed_data) {
                this._dressed.push(this._dressed_data[key].cloth_id);
            }
            this.set_c_clothe();
        };
        ClothesProxy.prototype.copy_base_dress = function () {
            this.dressed_copy = [];
            this.dressed_copy = mx.FightTools.arr_clone(this._dressed);
            this.dressed_data_copy = {};
            this.dressed_data_copy = mx.FightTools.object_clone(this._dressed_data);
        };
        ClothesProxy.prototype.set_base_dress = function () {
            this._dressed = [];
            this._dressed = mx.FightTools.arr_clone(this.dressed_copy);
            this._dressed_data = {};
            this._dressed_data = mx.FightTools.object_clone(this.dressed_data_copy);
        };
        Object.defineProperty(ClothesProxy.prototype, "get_clothes_by_type", {
            get: function () {
                var all = this._dressed.concat(this._undressed);
                var item = [];
                //筛选数据
                item = all;
                return item;
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.save_cloth = function (data) {
            switch (data.state) {
                case 0:
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0034 });
                    break;
                case 1:
                    this.baocun_cloth = true;
                    this.copy_base_dress();
                    this.huanzhuang_dressed = data.dressed;
                    this.set_xxbjkid(data.dressed);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ZLCB_FRESH });
                    break;
            }
        };
        Object.defineProperty(ClothesProxy.prototype, "xxkid", {
            get: function () {
                return this._xxkid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ClothesProxy.prototype, "bjkid", {
            get: function () {
                return this._bjkid;
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.set_fz_zhanli = function (data) {
            this.fz_zhanli = data;
        };
        ClothesProxy.prototype.set_xxbjkid = function (dress) {
            for (var i = 0; i < dress.length; i++) {
                var id = Number(dress[i]);
                if (id < 2000) {
                    this._xxkid = id;
                }
                else if (id < 3000) {
                    this._bjkid = id;
                }
                else {
                    this._xxkid = id;
                }
            }
        };
        Object.defineProperty(ClothesProxy.prototype, "date_task", {
            get: function () {
                return this._date_task;
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.set_date_task = function (flag) {
            this._date_task = flag;
        };
        Object.defineProperty(ClothesProxy.prototype, "date_info", {
            get: function () {
                return { "juqing_id": this._juqing_id, "mid": this._mid, type: 'juqing' };
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.change_scene_date_huanzhuang = function (data) {
            this._date_task = true;
            this._juqing_id = data.juqing_id;
            this._mid = data.hero_id;
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HuanZhuangScreen.S_NAME);
        };
        Object.defineProperty(ClothesProxy.prototype, "temple_test", {
            get: function () {
                return this._temple_test;
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.set_temple_test = function (flag) {
            this._temple_test = flag;
        };
        Object.defineProperty(ClothesProxy.prototype, "temple_info", {
            get: function () {
                return { "id": this._temple_id, "type": 'temple' };
            },
            enumerable: true,
            configurable: true
        });
        ClothesProxy.prototype.change_temple_huanzhuang = function (data) {
            this._temple_test = true;
            this._temple_id = data.temple_id;
            this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HuanZhuangScreen.S_NAME);
        };
        ClothesProxy.NAME = "ClothesProxy";
        return ClothesProxy;
    }(puremvc.Proxy));
    mx.ClothesProxy = ClothesProxy;
    __reflect(ClothesProxy.prototype, "mx.ClothesProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ClothesProxy.js.map