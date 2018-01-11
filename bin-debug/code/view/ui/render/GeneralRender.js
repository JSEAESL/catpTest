/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 含有數量，物品图标的通用render,切勿向其中加入不同的组件
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
    var GeneralRender = (function (_super) {
        __extends(GeneralRender, _super);
        function GeneralRender() {
            var _this = _super.call(this) || this;
            _this.hasPlay = false;
            return _this;
        }
        GeneralRender.prototype.startPlay = function () {
            this.hasPlay = true;
            this.visible = true;
            this.item_g.scaleX = this.item_g.scaleY = 1.4;
            egret.Tween.get(this.item_g, { "loop": false }).to({ "scaleX": 1, "scaleY": 1 }, 312);
        };
        GeneralRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            if (this.item_g) {
                egret.Tween.removeTweens(this.item_g);
            }
        };
        GeneralRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin || !this.num_bt) {
                return;
            }
            this.icon.maxHeight = 120;
            //背景框和魂魄字样
            this.itembg.source = "itembg_png";
            this.hunpo.visible = false;
            if (data.bg) {
                this.itembg.source = data.bg;
            }
            else if (data.type == 4) {
                var item = mx.Tools.get_item_info(data.type, data.id);
                if (item) {
                    if (item.Quality) {
                        this.itembg.source = "itembg" + item.Quality + "_png";
                        if (item.Category == "4") {
                            this.itembg.source = "hpbg_png";
                            this.hunpo.visible = true;
                            this.icon.maxHeight = 188;
                            if (mx.AppConfig.GameTag != "WX") {
                                var shape = new egret.Shape();
                                shape.graphics.beginFill(0xff0000);
                                shape.graphics.drawCircle(28.5, 24, 24);
                                shape.graphics.drawCircle(93, 24, 24);
                                shape.graphics.drawCircle(28.5, 88.5, 24);
                                shape.graphics.drawCircle(91.5, 88.5, 24);
                                shape.graphics.drawRect(28.5, 0, 64.5, 112.5);
                                shape.graphics.drawRect(4.5, 24, 112, 64.5);
                                shape.graphics.endFill();
                                this.item_g.addChild(shape);
                                this.icon.mask = shape;
                            }
                        }
                    }
                }
            }
            else if (data.type == 10) {
                this.itembg.visible = false;
            }
            else if (data.type == 1 || data.type == 2) {
                this.itembg.source = "itembg6_png";
            }
            if (data.type == 7) {
                this.icon.maxHeight = 188;
                if (mx.AppConfig.GameTag != "WX") {
                    var shape = new egret.Shape();
                    shape.graphics.beginFill(0xff0000);
                    shape.graphics.drawCircle(12, 7.5, 7.5);
                    shape.graphics.drawCircle(109.5, 7.5, 7.5);
                    shape.graphics.drawCircle(12, 135, 7.5);
                    shape.graphics.drawCircle(109.5, 135, 7.5);
                    shape.graphics.drawRect(12, 0, 97.5, 112.5);
                    shape.graphics.drawRect(4.5, 7.5, 112.5, 97.5);
                    shape.graphics.endFill();
                    this.item_g.addChild(shape);
                    this.icon.mask = shape;
                }
            }
            if (typeof data.itembg != "undefined") {
                this.itembg.source = data.itembg;
            }
            this.icon.source = data.icon || mx.Tools.get_item_res(data.type, data.id);
            if (data.shuliang) {
                data.num = data.shuliang;
            }
            if (typeof data.num != "undefined") {
                this.num_bt.text = data.need ? (data.num + "/" + data.need) : "" + data.num;
            }
            else if (data.str) {
                this.num_bt.text = data.str;
            }
            else {
                this.num_bt.text = "";
            }
            this.num_bt.font = data.fnt || "public_fnt";
            if (data.no_num) {
                this.num_bt.visible = false;
            }
            if (data.type == 5) {
                this.icon.top = 27;
            }
            else {
                this.icon.top = 0;
            }
            if (data.hpsize && this.hunpo.visible) {
                this.scaleX = this.scaleY = data.hpsize / 120;
            }
            else if (data.chicun) {
                this.scaleX = this.scaleY = data.chicun / 120;
            }
            this.hunpo.source = "hpkuang_png";
            this.hunpo.verticalCenter = 2;
            this.hunpo.horizontalCenter = 0;
            if (data.xuanxiu && data.type == 7) {
                this.itembg.source = "herobg-1_png";
                this.hunpo.visible = true;
                this.hunpo.source = "herobg1_png";
                this.hunpo.verticalCenter = 0;
                this.hunpo.horizontalCenter = 0;
            }
            if (data.star_type) {
                this.num_bt.visible = this.itembg.visible = this.icon.visible = this.num_bt.visible = false;
                this.hero_render.data = {
                    "mid": data.mid,
                    "quality": data.quality,
                    "star": data.star,
                    "pzxing": "pzxing"
                };
                this.hero_render.hero_xingji.scaleX = this.hero_render.hero_xingji.scaleY = 1.2;
                this.hero_render.hero_xingji.top = 90;
                this.hero_render.visible = true;
            }
            if (data.no_num_font) {
                this.num_bt.visible = false;
                this.num_t.text = data.num;
                this.num_t.visible = true;
                this.num_t.scaleX = this.num_t.scaleY = 2;
            }
            if (data.ani && !this.hasPlay) {
                this.visible = false;
                this.item_g.anchorOffsetX = this.item_g.width / 2;
                this.item_g.anchorOffsetY = this.item_g.height / 2;
            }
            else {
                this.visible = true;
            }
        };
        return GeneralRender;
    }(mx.BasicRender));
    mx.GeneralRender = GeneralRender;
    __reflect(GeneralRender.prototype, "mx.GeneralRender");
})(mx || (mx = {}));
//# sourceMappingURL=GeneralRender.js.map