/**
*   @author mx
*   @date 2015.2.25
*   @desc 背包、道具数据管理
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
    var PackProxy = (function (_super) {
        __extends(PackProxy, _super);
        function PackProxy() {
            return _super.call(this, PackProxy.NAME) || this;
        }
        //1零件2图纸3合成品4魂魄5消耗品6碎片7头像8头像框9-10服装材料11货币（从5中拆分）
        PackProxy.prototype.init_pack_item = function (data) {
            if (!this.p_items) {
                this.p_items = {};
            }
            var type = [];
            var cd = data.data;
            for (var k in cd) {
                type.push(k);
                var ctd = cd[k];
                this.p_items[k] = mx.Tools.arr2obj(ctd, "item_id");
                if (Number(k) == 11) {
                    for (var j in ctd) {
                        var c_item = ctd[j];
                        this.set_hg_item_num(c_item.item_id, c_item.num);
                    }
                }
            }
            this.sendNotification(mx.MX_NOTICE.PACK_ITEMS_BACK, this.scene_type, type.join("|"));
            this.scene_type = "";
        };
        //获取特定类型的物品。可获取多类型物品
        PackProxy.prototype.get_pack_type_item = function (type) {
            var t = type.split("|");
            var arr = [];
            for (var k in t) {
                var index = t[k];
                var c_arr = mx.Tools.obj2arr(this.p_items[index]);
                arr = arr.concat(c_arr);
            }
            return arr;
        };
        PackProxy.prototype.check_pack_type_item = function (type, stype) {
            this.scene_type = stype || "";
            if (this.p_items) {
                var types = type.split("|");
                var have = true;
                for (var k in types) {
                    if (!this.p_items[types[k]]) {
                        have = false;
                        break;
                    }
                }
                if (have) {
                    this.sendNotification(mx.MX_NOTICE.PACK_ITEMS_BACK, this.scene_type, type);
                    this.scene_type = "";
                    return;
                }
            }
            //获取支持多类型类型 |分割
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                "type": type,
            });
        };
        PackProxy.prototype.check_pack_type_item2 = function (type, stype) {
            this.scene_type = stype || "";
            if (this.p_items) {
                var types = type.split("|");
                var have = true;
                for (var k in types) {
                    if (!this.p_items[types[k]]) {
                        have = false;
                        break;
                    }
                    else {
                        types.splice(k, 1);
                    }
                }
                if (have) {
                    this.sendNotification(mx.MX_NOTICE.PACK_ITEMS_BACK, this.scene_type, type);
                    this.scene_type = "";
                    return;
                }
                type = types.join("|"); //修改1
            }
            //获取支持多类型类型 |分割
            return type;
        };
        PackProxy.prototype.get_item_num = function (id) {
            var num = 0;
            var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", id);
            if (!item || !this.p_items) {
                //console.warn("道具数量尚未获取，请先获取背包数据");
            }
            else {
                var org = this.p_items[item.Category];
                if (org) {
                    var c_item = org[id];
                    if (c_item) {
                        num = Number(c_item.num);
                    }
                }
                else {
                    //console.warn("该类型道具数据尚未获取，请检查类型：", item.Category);
                }
            }
            item = null;
            return num;
        };
        PackProxy.prototype.xiaohao_item = function (data) {
            for (var k in data) {
                var c_item = data[k];
                var old = this.get_item_num(c_item.item_id);
                this.set_item_num(c_item.item_id, old - c_item.num);
            }
            this.sendNotification(mx.MX_NOTICE.ITEM_NUM_CHANGED); //批量添加和消耗物品，只发送一次消息
        };
        PackProxy.prototype.add_item = function (data) {
            if (!this.p_items) {
                return;
            }
            for (var k in data) {
                var c_item = data[k];
                var old = this.get_item_num(c_item.item_id);
                this.set_item_num(c_item.item_id, old + Number(c_item.num));
            }
            this.sendNotification(mx.MX_NOTICE.ITEM_NUM_CHANGED); //批量添加和消耗物品，只发送一次消息
        };
        PackProxy.prototype.set_hg_item_num = function (id, num) {
            switch (Number(id)) {
                case 2000://绿头牌-0
                    var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    if (pproxy.res_ltp) {
                        pproxy.res_ltp.num = num;
                    }
                    break;
                case 2005://赐字宝册-0
                    var pproxy1 = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    pproxy1.res_czbc = num;
                    break;
                case 2037://合欢散-0
                    var wproxy = (this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                    wproxy.txcshu = num;
                case 2011://粉头牌-0
                    var wproxy2 = (this.facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
                    wproxy2.ftp_num = num;
                    break;
                case 2012://保护令-0
                    var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    lproxy.bhl_num = num;
                    this.sendNotification(mx.MX_NOTICE.FRESH_BHL_STATE);
                    break;
                case 2019://四书五经-0
                    var pproxy3 = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                    pproxy3.res_sswj = num;
                    break;
                case 3054://相思豆
                    var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                    hproxy.xsd_num = num;
                    break;
            }
        };
        PackProxy.prototype.set_item_num = function (id, num) {
            if (!this.p_items) {
                return;
            }
            var item = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", id);
            if (!item) {
                return;
            }
            var org = this.p_items[item.Category];
            num = Math.min(num, item.MaxAmount);
            if (!org) {
                return;
            }
            var c_item = org[id];
            if (c_item) {
                if (num) {
                    c_item.num = num;
                }
                else {
                    delete org[id];
                }
            }
            else {
                if (num == 0) {
                    delete org[id];
                }
                else {
                    org[id] = { "item_id": id, "num": num };
                }
            }
            this.set_hg_item_num(id, num);
            this.sendNotification(mx.MX_NOTICE.ITEM_NUM_CHANGED, id);
        };
        PackProxy.prototype.sell_item_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://数量不足
                    str = mx.Lang.p0018;
                    break;
                case 1://不能卖出
                    str = mx.Lang.p0022;
                    break;
                case 2://成功
                    this.set_item_num(data.item_id, data.res_num);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.PackSellItemView.S_NAME);
                    str = mx.Lang.p0052;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PackProxy.prototype.use_tili_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://不是体力道具
                    str = mx.Lang.p0024;
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.PackUseItemView.S_NAME);
                    break;
                case 1://数量不足
                    str = mx.Lang.p0018;
                    break;
                case 2://体力超出最大上限
                    str = mx.Lang.p0017;
                    break;
                case 3://成功
                    this.set_item_num(data.item_id, data.res_num);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.PackUseItemView.S_NAME);
                    str = mx.Lang.p0025;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PackProxy.prototype.use_exp_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://不是经验道具
                    str = mx.Lang.p0026;
                    break;
                case 1://数量不足
                    str = mx.Lang.p0018;
                    break;
                case 2://英雄id错误
                    str = mx.Lang.h0000;
                    break;
                case 3://经验超出最大上限
                    str = mx.Lang.p0017;
                    break;
                case 4://成功
                    this.set_item_num(data.item_id, data.res_num);
                    var hproxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
                    var d = data.hero_info;
                    var h = hproxy.heroes[d.id];
                    h.exp = d.exp;
                    if (Number(h.level) < Number(d.level)) {
                        h.level = d.level;
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ZLCB_FRESH });
                    }
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.ExpSelectHeroPop.S_NAME);
                    str = mx.Lang.p0025;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PackProxy.prototype.use_libao_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://数量不足
                    str = mx.Lang.p0018;
                    break;
                case 1://参数错误
                    str = mx.Lang.p0026;
                    break;
                case 2://参数错误，不是礼包
                    str = mx.Lang.p0103;
                    break;
                case 3://成功
                    this.set_item_num(data.item_id, data.res_num);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.GiftAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.PackUseItemView.S_NAME);
                    var cad = data.awards[0];
                    if (cad.hero_id) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.XXiuHeroAlert.S_NAME,
                            "param": {
                                "id": cad.hero_id,
                                "type": cad.type,
                                "num": cad.shuliang,
                            }
                        });
                    }
                    if (cad.type == 7) {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.XXiuHeroAlert.S_NAME,
                            "param": {
                                "id": cad.id,
                                "type": cad.type,
                                "num": cad.shuliang,
                            }
                        });
                    }
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PackProxy.prototype.set_hcheng_num = function (num) {
            this.hcheng_num = num;
        };
        PackProxy.prototype.hecheng_eqiup = function (data) {
            var str;
            switch (data.state) {
                case 0://id参数错误
                    str = mx.Lang.p0034;
                    break;
                case 1://需求零件不足
                    str = mx.Lang.p0035;
                    break;
                case 2://银币不足
                    str = mx.Lang.p0036;
                    break;
                case 3://合成成功
                    str = mx.Lang.h0081;
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.JJXHAlert.S_NAME);
                    var hid = data.id; //新和成的id
                    var xh_arr = [];
                    for (var i in data.need) {
                        xh_arr.push({
                            "item_id": i, "num": Number(data.need[i])
                        });
                    }
                    this.xiaohao_item(xh_arr);
                    if (this.equip_hecheng_scene == "PackageScreen" || mx.AppConfig.CURR_SCENE_ID == "PackageScreen") {
                        this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.SuipianHechengPop.S_NAME);
                        this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.EquipHechengAlert.S_NAME);
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.EquipHechengAlert.S_NAME,
                            "param": "hc"
                        });
                        this.sendNotification(mx.MX_NOTICE.FRESH_CHERO, { "type": "zb" });
                    }
                    break;
                default:
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PackProxy.prototype.cal_hecheng_cost = function (arr, res) {
            if (!arr.length) {
                return res;
            }
            var id = arr[0].id;
            var num = arr[0].num;
            var pProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(PackProxy.NAME));
            var zb = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPCRAFT, "id", id);
            if (zb) {
                var hnum = pProxy.get_item_num(id);
                if (hnum < num) {
                    res += zb.Expense * (num - hnum);
                    for (var i = 1; i <= 4; i++) {
                        var component = Number(zb["Component" + i]);
                        if (component) {
                            var n0 = Number(zb["Component" + i + "Count"]);
                            arr.push({ "id": component, "num": n0 * (num - hnum) });
                        }
                    }
                }
                else if (res == 0) {
                    res += zb.Expense;
                }
            }
            arr.shift();
            return this.cal_hecheng_cost(arr, res);
        };
        PackProxy.prototype.buy_item_cb = function (data) {
            var str;
            switch (data.state) {
                case 0://id参数错误
                    str = mx.Lang.p0034;
                    break;
                case 2://超过持有上限
                    str = mx.Lang.p0017;
                    break;
                case 1://银币不足
                    str = mx.Lang.p0036;
                    break;
                case 3://购买成功
                    str = mx.Lang.p0020;
                    var num = this.get_item_num(data.equip);
                    var add = Number(data.res) - num;
                    var arr = [{
                            "item_id": data.equip,
                            "num": add
                        }];
                    this.add_item(arr);
                    if (data.ltp) {
                        var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
                        pproxy.res_ltp.res = data.ltp.res;
                    }
                    break;
                case 4:
                    str = mx.Lang.p0012;
                    break;
                case 5:
                    str = mx.Lang.p0008;
                    break;
                default:
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        PackProxy.NAME = "PackProxy";
        return PackProxy;
    }(puremvc.Proxy));
    mx.PackProxy = PackProxy;
    __reflect(PackProxy.prototype, "mx.PackProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=PackProxy.js.map