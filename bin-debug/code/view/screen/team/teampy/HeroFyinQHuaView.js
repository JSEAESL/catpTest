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
/**
 * @qianjun/2016.9.6
 *  封印之力 alert
 */
var mx;
(function (mx) {
    var HeroFyinQHuaView = (function (_super) {
        __extends(HeroFyinQHuaView, _super);
        function HeroFyinQHuaView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.move_mode = false;
            _this.num = 0;
            _this.add_exp = {};
            return _this;
        }
        HeroFyinQHuaView.mx_support = function () {
            return ["assets.team_qh", "api.SOULUPCOST"];
        };
        Object.defineProperty(HeroFyinQHuaView.prototype, "hProxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.HeroProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HeroFyinQHuaView.prototype.init_view = function () {
            var view = this;
            var unit = this.adata;
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sub_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.change_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.change_click, this);
            view.qhua_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ybqhua_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.item_list.allowMultipleSelection = true;
            view.jindu_bar.set_res({ "up": "fysldchen_png", "down": "fyjddchen_png" });
            //信息
            view.fy_p.scaleX = view.fy_p.scaleY = 103 / 140;
            view.add_exp = {};
            view.fresh_fy();
            //物品
            view.item_list.itemRenderer = mx.GNumRender;
            view.item_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            view.show_item();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HeroFyinQHuaViewMediator(this));
            this.target = this.item_list.dataProvider.getItemAt(0);
            //滑动
            this.init_splider();
        };
        HeroFyinQHuaView.prototype.init_splider = function () {
            var data = this.target;
            var sli_obj = {
                "up": "sellbar_png",
                "down": "djcsjdtdchen_png",
                "middle": "djcshkuai_png",
                "jiugong_up": [4, 4, 215, 7],
                "jiugong_down": [4, 4, 215, 7],
                "thumbposition": -24,
                "highlightstartx": 71,
                "highlightheight": 12,
                "trackwidth": 368,
                "highlightwidth": 368
            };
            this.hdong_sli.set_res(sli_obj);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeHandler, this);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_END, this.remove_move, this);
            this.hdong_sli.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            this.hdong_sli.minimum = 0;
            this.hdong_sli.maximum = data.storenum;
            this.hdong_sli.width = 368;
            this.hdong_sli.init_value(0);
        };
        HeroFyinQHuaView.prototype.pre_move = function (evt) {
            var view = this;
            this.start_x = evt.stageX;
            var target = view.hdong_sli;
            target.thumb.horizontalCenter = this.start_x - 360;
            target.set_value();
            target.set_mask();
            this.show_num(target.value);
            this.move_mode = true;
        };
        HeroFyinQHuaView.prototype.remove_move = function (evt) {
            this.move_mode = false;
        };
        HeroFyinQHuaView.prototype.show_item = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.PackProxy.NAME));
            var arr = proxy.get_pack_type_item("1|2|3|5|6|7|8|9|10");
            var temp = [];
            this.numberhave = 0 + "/";
            view.add_exp = {};
            for (var i in arr) {
                var unit = arr[i];
                var info = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", unit.item_id);
                if (info && Number(info.fyin) > 0) {
                    temp.push({
                        "id": unit.item_id,
                        "type": 4,
                        "use": 0,
                        "show_str": true,
                        "str": this.numberhave + unit.num,
                        "storenum": unit.num,
                        "ylq": false,
                        "chicun": 90,
                        "top": 102,
                        "no_num": true,
                        "itemtop": 8
                    });
                }
                else {
                    ////console.log("物品" + unit.item_id + "数据缺失");
                }
            }
            temp.sort(function (a, b) {
                if (Number(a.id) == 50) {
                    return -1;
                }
                else if (Number(b.id) == 50) {
                    return 1;
                }
            });
            this.item_arr = new eui.ArrayCollection(temp);
            view.item_list.dataProvider = this.item_arr;
            if (temp.length) {
                view.item_list.selectedIndex = view.cur_index = 0;
                //view.item_list.selectedIndices = [0];
                view.show_bottom(temp[0]);
            }
        };
        HeroFyinQHuaView.prototype.fresh_fy = function () {
            var view = this;
            var info = view.adata;
            var hero = mx.FightTools.object_clone(this.hProxy.get_chero_info());
            var level = hero.fy_skill[info.id].level;
            view.fy_p.source = "scfyin" + info.icon + "_png";
            view.fy_name.source = "scfyin" + info.icon + "name_png";
            //info.fy_skill[info.type]
            var quality = Number(hero.quality);
            view.level_bt.text = level + "";
            //进度
            var cur_jindu = hero.fy_skill[info.id].jindu;
            var jindu = mx.ApiTool.getAPINode(mx.MX_APINAME.SOULUPCOST, "id", level);
            view.next_g.visible = false;
            var base = 0;
            var prev_level = Math.max(1, level - 1);
            var next_level = Math.min(20, level + 1);
            var temp = mx.ApiTool.getAPINode(mx.MX_APINAME.SOULUPCOST, "id", prev_level);
            base = Number(temp["ex" + info.idx + "_cost"]) || 30;
            var num = 0;
            for (var i in this.add_exp) {
                var unit = this.add_exp[i];
                num += (unit.num * unit.fyin);
            }
            var exp_total = cur_jindu + num;
            var new_level = level;
            if (num == 0) {
                var total = 0;
                if (level == 20) {
                    cur_jindu = total = temp["ex" + info.idx + "_cost"];
                }
                else {
                    total = jindu["ex" + info.idx + "_cost"];
                }
                view.jindu_bar.set_txt_style({
                    "size": 14
                });
                view.jindu_bar.set_res({ 'up': "fysldchen_png" });
                if (cur_jindu < base) {
                    view.jindu_bar.set_text(cur_jindu, total);
                }
                else {
                    view.jindu_bar.set_text(cur_jindu - base, total - base);
                }
            }
            else {
                new_level = this.judge_level(exp_total, info.idx);
                view.next_level_bt.text = new_level + "";
                if (new_level == 20) {
                    view.lv_p.visible = view.next_level_bt.visible = false;
                    view.max_p.visible = true;
                }
                else {
                    view.lv_p.visible = view.next_level_bt.visible = true;
                    view.max_p.visible = false;
                }
                var new_base = 0;
                var prev_level_1 = Math.max(1, new_level - 1);
                var temp_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.SOULUPCOST, "id", prev_level_1);
                new_base = Number(temp_1["ex" + info.idx + "_cost"]) || 30;
                var desc = cur_jindu - base < 0 ? cur_jindu : cur_jindu - base;
                if (new_level > level) {
                    //超过本级
                    view.next_g.visible = true;
                    if (new_level == 20) {
                        new_level = 19;
                        var tp = mx.ApiTool.getAPINode(mx.MX_APINAME.SOULUPCOST, "id", 18);
                        exp_total = new_base = Number(temp_1["ex" + info.idx + "_cost"]) - Number(tp["ex" + info.idx + "_cost"]);
                    }
                    if (!view.max_p.visible) {
                        var jindu_1 = mx.ApiTool.getAPINode(mx.MX_APINAME.SOULUPCOST, "id", new_level);
                        view.jindu_bar.change_gross_bar(2, exp_total < new_base ? exp_total : exp_total - new_base, exp_total < new_base ? jindu_1["ex" + info.idx + "_cost"] : jindu_1["ex" + info.idx + "_cost"] - new_base, desc);
                    }
                    else {
                        view.jindu_bar.change_gross_bar(2, exp_total, new_base, desc);
                    }
                }
                else {
                    //没超过本级
                    if (new_level == 20) {
                        new_level = 19;
                        exp_total = new_base;
                    }
                    view.jindu_bar.set_res({ 'up': "fysldchen_png" });
                    if (!view.max_p.visible) {
                        var jindu_2 = mx.ApiTool.getAPINode(mx.MX_APINAME.SOULUPCOST, "id", new_level);
                        view.jindu_bar.change_gross_bar(1, exp_total < base ? exp_total : exp_total - base, exp_total < base ? jindu_2["ex" + info.idx + "_cost"] : jindu_2["ex" + info.idx + "_cost"] - base);
                    }
                    else {
                        view.jindu_bar.change_gross_bar(1, exp_total, new_base);
                    }
                }
            }
            //数值
            var value1 = Number((Number(info.value1) + Number(info.growth1) * (new_level - 1)).toFixed(2));
            var value2 = Number((Number(info.value2) + Number(info.growth2) * (new_level - 1)).toFixed(2));
            view.desc_t.text = mx.Tools.format(info.desc, value1, value2);
            view.jindu_bar.top = view.desc_t.top + view.desc_t.textHeight + 7;
            //view.jindu_bar.change_gross_bar(2,10,100);
        };
        HeroFyinQHuaView.prototype.judge_level = function (exp, idx) {
            var jindu = mx.ApiTool.getAPI(mx.MX_APINAME.SOULUPCOST);
            var level = 20;
            for (var i in jindu) {
                if (exp < jindu[i]["ex" + idx + "_cost"]) {
                    level = Number(jindu[i].id);
                    break;
                }
            }
            return level;
        };
        HeroFyinQHuaView.prototype.show_bottom = function (data) {
            var view = this;
            if (data) {
                view.bottom_g.visible = true;
                var info = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", data.id);
                this.item_info = null;
                this.item_info = info;
                var exp = Number(info.fyin);
                view.item_name_t.text = info.name;
                view.item_desc_t.text = "可提供经验" + exp;
                view.item_desc_t.left = view.item_name_t.left + view.item_name_t.width + 10;
                view.num = Number(data.use);
                view.hdong_sli.minimum = 0; //定义最小值
                var facade = mx.ApplicationFacade.getInstance();
                var pproxy = (facade.retrieveProxy(mx.PackProxy.NAME));
                var has = pproxy.get_item_num(data.id);
                view.hdong_sli.maximum = has; //定义最大值
                view.hdong_sli.value = view.num; //定义默认值
                view.show_num(view.num);
            }
            else {
                view.bottom_g.visible = false;
            }
        };
        HeroFyinQHuaView.prototype.changeHandler = function (evt) {
            var view = this;
            var info = view.adata;
            var hero = mx.FightTools.object_clone(this.hProxy.get_chero_info());
            var level = hero.fy_skill[info.id].level;
            if (level == 20 || (this.max_p.visible) && view.num <= evt.target.value) {
                return;
            }
            var target = view.hdong_sli;
            if (this.move_mode && Math.abs(target.thumb.horizontalCenter) <= target.width / 2) {
                var newx = evt.stageX;
                var mv = newx - this.start_x;
                this.start_x = evt.stageX;
                target.thumb.horizontalCenter += mv;
                target.set_value();
                target.set_mask();
            }
            view.num = target.value;
            this.show_num(target.value);
            this.value = this.hdong_sli.value; //evt.target.value;
            this.numberhave = target.value;
            this.set_selected_cailiao();
        };
        HeroFyinQHuaView.prototype.show_num = function (n1) {
            var view = this;
            var item = this.item_info;
            this.num = n1;
            var str = mx.Tools.format(mx.Lang.scfy002, view.num, view.hdong_sli.maximum);
            view.item_use_t.textFlow = mx.Tools.setKeywordColor2(str, [0xFF7A0E]);
            var info = view.adata;
            var hero = mx.FightTools.object_clone(this.hProxy.get_chero_info());
            var level = hero.fy_skill[info.id].level;
            var jindu = mx.ApiTool.getAPINode(mx.MX_APINAME.SOULUPCOST, "id", level);
            if (n1 > 0) {
                this.add_exp[item.id] = { 'num': n1, 'fyin': Number(item.fyin) };
            }
            else {
                //被取消
                delete this.add_exp[item.id];
            }
            var num = 0;
            for (var i in this.add_exp) {
                var unit = this.add_exp[i];
                num += (unit.num * unit.fyin);
            }
            view.cost_t.text = num == 0 ? ("未添加物品") : (Number(jindu.coin_cost) * num + "");
            view.xhao_p.visible = num > 0;
            view.xhao_t.visible = num > 0;
            view.cost_t.left = num == 0 ? 374 : 467;
            var data = this.item_arr.getItemAt(this.cur_index);
            if (data) {
                data.use = this.num;
                this.item_arr.replaceItemAt(data, this.cur_index);
            }
            this.fresh_fy();
        };
        HeroFyinQHuaView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sub_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.change_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.change_click, this);
            view.hdong_sli.removeEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
            view.qhua_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ybqhua_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.item_list.dataProvider = null;
            view.item_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeroFyinQHuaViewMediator.NAME);
        };
        HeroFyinQHuaView.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var info = view.adata;
            var hero = mx.FightTools.object_clone(this.hProxy.get_chero_info());
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            switch (evt.currentTarget) {
                case view.bg_rect:
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, HeroFyinQHuaView.S_NAME);
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroFyinView.S_NAME,
                    });
                    break;
                case view.qhua_b:
                    var obj1 = [];
                    for (var i in this.add_exp) {
                        var unit = this.add_exp[i];
                        if (unit.num > 0) {
                            obj1.push({
                                "item_id": i,
                                "num": unit.num
                            });
                        }
                    }
                    if (obj1.length == 0) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.scfy009 });
                        return;
                    }
                    var target = view.hdong_sli;
                    var ybi = dproxy.get_currency("ybi");
                    if (ybi < Number(view.cost_t.text)) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.scfy007, mx.Lang.ybi) });
                        return;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHERO_FYUP,
                        "id": info.idx,
                        "soul_id": info.id,
                        "items": JSON.stringify(obj1),
                        "type": 2,
                        "mid": hero.mid
                    });
                    view.hdong_sli.init_value(0);
                    break;
                case view.ybqhua_b:
                    var level = hero.fy_skill[info.id].level;
                    if (level == 20 || this.max_p.visible) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.scfy005 });
                        return;
                    }
                    var ybao = dproxy.get_currency("ybao");
                    var jindu = mx.ApiTool.getAPINode(mx.MX_APINAME.SOULUPCOST, "id", level);
                    var cur_jindu = hero.fy_skill[info.id].jindu;
                    var cost = Number(jindu.diamond_cost) * (Number(jindu["ex" + info.idx + "_cost"]) - cur_jindu);
                    if (ybao < cost) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                                "param": mx.Lang.a0006,
                            }
                        });
                        //facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, { "text": Tools.format(Lang.scfy007,Lang.ybao)});
                        return;
                    }
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": { "t": mx.MX_NETS.CS_CHERO_FYUP, "id": info.idx, "soul_id": info.id, "items": [], "type": 1, "mid": hero.mid },
                            "param": mx.Tools.format(mx.Lang.scfy003, info.note, Math.min(20, level + 1), cost),
                        }
                    });
                    break;
            }
        };
        HeroFyinQHuaView.prototype.set_selected_cailiao = function () {
            var dataProvider = this.item_list.dataProvider;
            var newdata2;
            var index;
            var source = this.item_list.dataProvider;
            newdata2 = this.item_list.dataProvider.getItemAt(0);
            var arr = source.source;
            for (var k in arr) {
                if (arr[k].id == this.target.id) {
                    arr[k].num = this.value;
                    newdata2 = arr[k];
                    index = k;
                    break;
                }
            }
            newdata2.changeusehave = this.numberhave;
            this.hdong_sli.value = this.value;
            //this.cailiao_list.dataProvider = new eui.ArrayCollection(arr);
            dataProvider.replaceItemAt(newdata2, index);
        };
        HeroFyinQHuaView.prototype.change_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var info = view.adata;
            var hero = mx.FightTools.object_clone(this.hProxy.get_chero_info());
            var level = hero.fy_skill[info.id].level;
            var target = view.hdong_sli;
            switch (evt.currentTarget) {
                case view.add_b:
                    if (level == 20 || this.max_p.visible) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.scfy005 });
                        return;
                    }
                    view.num = Math.min(view.num + 1, view.hdong_sli.maximum);
                    this.numberhave = view.num;
                    if (target.thumb.horizontalCenter < target.width / 2) {
                        target.thumb.horizontalCenter += view.hdong_sli.width / view.hdong_sli.maximum;
                        target.set_value();
                        target.set_mask();
                    }
                    this.set_selected_cailiao();
                    break;
                case view.sub_b:
                    view.num = Math.max(view.num - 1, view.hdong_sli.minimum);
                    this.numberhave = view.num;
                    if (target.thumb.horizontalCenter > -target.width / 2) {
                        target.thumb.horizontalCenter -= view.hdong_sli.width / view.hdong_sli.maximum;
                        target.set_value();
                        target.set_mask();
                    }
                    this.set_selected_cailiao();
                    break;
            }
            view.hdong_sli.value = view.num;
            this.show_num(view.num);
        };
        HeroFyinQHuaView.prototype.onTabChange = function (e) {
            var view = this;
            this.cur_index = e.itemIndex; //;obj.kuang.visible ? e.itemIndex : -1;
            // if(this.cur_index == -1){
            //     this.item_list.selectedIndices.
            // }
            // if(this.item_list.selectedIndex != e.itemIndex){
            //     //被取消
            //     for(let i in this.add_exp){
            //         if(i == e.item.id){
            //             delete this.add_exp[i];
            //             break;
            //         }
            //     }
            // }
            var item = this.item_list.dataProvider.getItemAt(this.cur_index);
            this.target = item;
            view.hdong_sli.init_value(0);
            view.show_bottom(item);
        };
        HeroFyinQHuaView.S_NAME = "HeroFyinQHuaView";
        return HeroFyinQHuaView;
    }(mx.BasicView));
    mx.HeroFyinQHuaView = HeroFyinQHuaView;
    __reflect(HeroFyinQHuaView.prototype, "mx.HeroFyinQHuaView");
})(mx || (mx = {}));
//# sourceMappingURL=HeroFyinQHuaView.js.map