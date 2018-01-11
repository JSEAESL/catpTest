/**
 *   @author mx
 *   @date 2015.1.21
 *   @desc Tween缓动动画工具类
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    var TweenTool = (function () {
        function TweenTool() {
        }
        TweenTool.getInstance = function () {
            if (!TweenTool.instance) {
                TweenTool.instance = new TweenTool();
            }
            return TweenTool.instance;
        };
        //呼吸缓动效果 mn_p：人物图片，isv：呼吸模式，默认为呼吸（收缩->舒张）
        TweenTool.prototype.breath_tween = function (mn_p, isv) {
            if (isv === void 0) { isv = true; }
            var w = mn_p.width; //0.998->1.007(0.009)
            var h = mn_p.height; //0.998->1.008(0.01)
            var ctween = egret.Tween.get(mn_p, { "loop": true });
            var zx = mn_p.x + w * 0.001;
            var zw = w * 0.998;
            var zh = h * 1.007;
            var zy = mn_p.y - h * 0.007;
            var kx = mn_p.x - w * 0.004;
            var kh = h * 0.998;
            var kw = w * 1.008;
            var ky = mn_p.y + h * 0.002;
            if (isv) {
                mn_p.height = zh;
                mn_p.width = zw;
                mn_p.x = zx;
                mn_p.y = zy;
                ctween.to({ "height": kh, "width": kw, "y": ky, "x": kx }, 1500)
                    .to({ "height": zh, "width": zw, "y": zy, "x": zx }, 1500);
            }
            else {
                mn_p.height = kh;
                mn_p.width = kw;
                mn_p.x = kx;
                mn_p.y = ky;
                ctween.to({ "height": zh, "width": zw, "y": zy, "x": zx }, 1500)
                    .to({ "height": kh, "width": kw, "y": ky, "x": kx }, 1500);
            }
        };
        //必须满足一定的命名规则,必须预加载资源,name : 资源key, num : 资源数量，ani:动画名字默认与name一致
        TweenTool.prototype.get_dragon = function (name, num, ani) {
            //Tools.check_drgon();
            var dragonbonesFactory = new dragonBones.EgretFactory();
            var textureData;
            var texture;
            if (num) {
                for (var i = 0; i < num; ++i) {
                    textureData = RES.getRes(name + "_tex_" + i + "_json");
                    texture = (RES.getRes(name + "_tex_" + i + "_png"));
                    //引擎升级dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                    dragonbonesFactory.parseTextureAtlasData(textureData, texture);
                }
            }
            else {
                textureData = RES.getRes(name + "_tex_json");
                texture = (RES.getRes(name + "_tex_png"));
                //引擎升级dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                dragonbonesFactory.parseTextureAtlasData(textureData, texture);
            }
            var dragonbonesData = RES.getRes(name + "_ske_json");
            //引擎升级dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.parseDragonBonesData(dragonbonesData);
            var armature = dragonbonesFactory.buildArmature(ani || name);
            dragonBones.WorldClock.clock.add(armature);
            return armature;
        };
        TweenTool.prototype.get_tween = function (target, type, param) {
            var loop = false;
            if (param) {
                loop = param.loop || param;
            }
            var c_t = egret.Tween.get(target, { "loop": loop });
            switch (type) {
                case "next_talk":
                    var start = target.y;
                    c_t.to({ "y": start + 10 }, 400).to({ "y": start }, 400);
                    break;
                case "FADEIN"://渐入
                    target.alpha = 0;
                    c_t.to({ "alpha": 1.0 }, 600);
                    break;
                case "FADEOUT"://渐出
                    target.alpha = 1.0;
                    c_t.to({ "alpha": 0 }, 600);
                    break;
                case "FLASH"://闪烁
                    target.alpha = 1.0;
                    c_t.to({ "alpha": 0 }, 100).to({ "alpha": 1 }, 100).to({ "alpha": 0 }, 100)
                        .to({ "alpha": 1 }, 100).to({ "alpha": 0 }, 100).to({ "alpha": 1 }, 100);
                    break;
                case "SHAKE"://震动
                    var xx = target.x;
                    c_t.to({ "x": xx + 10 }, 100).to({ "x": xx - 10 }, 200).to({ "x": xx + 10 }, 200).to({ "x": xx }, 100);
                    break;
                case "btnshake"://按钮通用抖动效果
                    c_t.to({ "scaleX": 1.06, "scaleY": 1.06 }, 200)
                        .to({ "scaleX": 0.98, "scaleY": 0.98 }, 200).to({ "scaleX": 1.04, "scaleY": 1.04 }, 200)
                        .to({ "scaleX": 0.98, "scaleY": 0.98 }, 200).to({ "scaleX": 1, "scaleY": 1 }, 200)
                        .to({ "scaleX": 1, "scaleY": 1 }, 3000);
                    break;
                case "wqj"://温情酒专用
                    c_t.to({ "scaleX": 1.14, "scaleY": 1.14 }, 200)
                        .to({ "scaleX": 0.94, "scaleY": 0.94 }, 200).to({ "scaleX": 1.1, "scaleY": 1.1 }, 200)
                        .to({ "scaleX": 0.94, "scaleY": 0.94 }, 200).to({ "scaleX": 1, "scaleY": 1 }, 200)
                        .to({ "scaleX": 1, "scaleY": 1 }, 3000);
                    break;
                case "xunluo"://巡逻
                    var sx = target.x; //起始坐标x
                    var dir = param.dir; //运动方向向右为正
                    var rdir = param.rdir || 1; //初始人物方向，1为向右，-1向左
                    var ss = param.ss; //运行距离
                    var st = 3 * param.st * ss; //运行时间
                    c_t.to({ "x": sx + ss * dir }, st).to({ "scaleX": -dir * rdir }, 0).to({ "x": sx }, st).to({ "scaleX": dir * rdir }, 0);
                    break;
            }
        };
        return TweenTool;
    }());
    mx.TweenTool = TweenTool;
    __reflect(TweenTool.prototype, "mx.TweenTool");
})(mx || (mx = {}));
//# sourceMappingURL=TweenTool.js.map