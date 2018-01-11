/**
 *   @author cy, wf
 *   @date 2016.11.22
 *   @desc 签到render
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
    var DailySignRender = (function (_super) {
        __extends(DailySignRender, _super);
        function DailySignRender() {
            var _this = _super.call(this) || this;
            _this.height = 153;
            return _this;
        }
        DailySignRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.ef_g.removeChildren();
            this.jiangli_t.textColor = 0x8465BA;
            this.jiangli_t.text = data.jiangli;
            this.fanbei_g.visible = this.buqian_g.visible = this.sc_p.visible = false;
            switch (data.state) {
                case 0://未签到
                    this.state_p.source = null;
                    break;
                case 1://已领取
                    this.state_p.source = "ylqu_png";
                    this.state_p.left = 0;
                    this.state_p.top = 0;
                    break;
                case 2://今日签到
                    this.state_p.source = "djlqaniu_png";
                    this.state_p.left = 20;
                    this.state_p.top = 45;
                    var qdmc = new mx.GeneralEffect("qdgx");
                    qdmc.x = 0;
                    qdmc.y = -3;
                    qdmc.play_by_times(-1);
                    this.ef_g.addChild(qdmc);
                    break;
                case 3://补签
                    var facade = mx.ApplicationFacade.getInstance();
                    var sProxy = (facade.retrieveProxy(mx.SignProxy.NAME));
                    var cishu = sProxy.bu_q;
                    if (Number(cishu) == 0) {
                        this.buqian_t.text = "10";
                    }
                    else if (Number(cishu) < 3) {
                        this.buqian_t.text = "20";
                    }
                    else if (Number(cishu) >= 3) {
                        this.buqian_t.text = "50";
                    }
                    this.buqian_g.visible = true;
                    this.state_p.source = "";
                    var qdmc2 = new mx.GeneralEffect("qdgx");
                    qdmc2.x = 0;
                    qdmc2.y = -3;
                    qdmc2.play_by_times(-1);
                    this.ef_g.addChild(qdmc2);
                    break;
            }
            if (data.shangdi) {
                this.fanbei_t.text = data.vip;
                this.fanbei_g.visible = true;
            }
            //1银币2元宝3体力4item5女王经验6美男经验7英雄8技能点
            var obj = {
                "chicun": 72,
                "hpsize": 72,
                "type": data.type,
                "itembg": "",
                "id": data.item.item_id
            };
            if (Number(data.type) == 7) {
                this.sc_p.visible = true;
            }
            this.hp_p.visible = this.hp_bg.visible = false;
            if (Number(data.item.type) == 4) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", data.item.item_id);
                if (Number(api.Category) == 4) {
                    this.item.visible = false;
                    this.hp_p.visible = this.hp_bg.visible = true;
                    var hapi = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "hero_name", api.name);
                    obj.type = 7;
                    obj.id = hapi.id;
                    obj.chicun = 72;
                }
            }
            this.item.data = obj;
            if (obj.type == 7) {
                this.add_mask(this.item);
            }
            //已领取处理
            var flag = (data.state == 1);
            this.di_p.source = flag ? "lqqdkhui_png" : "lqqdkuai_png";
            if (this.hp_bg.visible) {
                this.hp_bg.source = flag ? "qdhpdchui_png" : "qdhpdchen_png";
                this.hp_p.source = flag ? "qdhpwzhui_png" : "qdhpwzi_png";
            }
            mx.Tools.mx_grayfy(this.item, !flag);
            this.jiangli_t.textColor = flag ? 0x959393 : 0x8465BA;
        };
        DailySignRender.prototype.add_mask = function (view) {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(66, 73.5, 46.5);
            shape.graphics.endFill();
            this.addChild(shape);
            view.mask = shape;
        };
        return DailySignRender;
    }(mx.BasicRender));
    mx.DailySignRender = DailySignRender;
    __reflect(DailySignRender.prototype, "mx.DailySignRender");
})(mx || (mx = {}));
//# sourceMappingURL=DailySignRender.js.map