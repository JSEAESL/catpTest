/*
* Author: MuXing
* Date: 2015-2-12
* 通用动画特效，需提前加载资源
*/
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
    var GeneralEffect = (function (_super) {
        __extends(GeneralEffect, _super);
        function GeneralEffect(effectname, type, self) {
            var _this = _super.call(this) || this;
            _this.is_play = false;
            _this.eid = effectname;
            _this.name = effectname;
            var impact_arr = ["water", "burn", "burst", "crush", "freeze", "lighting", "Lion_atk3", "pierce", "poison", "slash", "sonic", "Zeus_ult"];
            var point_arr = ["burst", "Coco_atk3", "DR_atk3", "Lina_atk2", "Lina_atk3", "Med_atk3", "QOP_atk3", "QOP_ult"];
            if (!RES.hasRes(_this.eid + "_png")) {
                switch (type) {
                    case "chain":
                        _this.eid = "eff_chain_spike";
                        break;
                    case "impact":
                        _this.eid = "eff_impact_water";
                        break;
                    case "point":
                        if (self == "self") {
                            _this.eid = "eff_point_SilverDragon_atk6";
                        }
                        else {
                            _this.eid = "eff_point_Lina_ult";
                        }
                        break;
                    case "hdao":
                        _this.eid = "eff_huidao_Footman_1";
                        break;
                    default:
                        break;
                }
            }
            _this.init_mc();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.on_remove, _this);
            return _this;
        }
        GeneralEffect.prototype.init_mc = function () {
            if (!this.json_d) {
                RES.getResAsync(this.eid + "_json", this.getjson, this);
            }
            else {
                RES.getResAsync(this.eid + "_png", this.createmc, this);
            }
        };
        GeneralEffect.prototype.getjson = function (result) {
            if (!result) {
                return;
            }
            this.json_d = result;
            RES.getResAsync(this.eid + "_png", this.createmc, this);
        };
        GeneralEffect.prototype.createmc = function (result) {
            if (!result) {
                return;
            }
            this.txtr_d = result;
            var mcFactory = new egret.MovieClipDataFactory(this.json_d, this.txtr_d);
            this.mc = new egret.MovieClip(mcFactory.generateMovieClipData());
            GeneralEffect.MC_NUM[this.eid] = GeneralEffect.MC_NUM[this.eid] || 0;
            GeneralEffect.MC_NUM[this.eid]++;
            if (this.framen) {
                this.mc.frameRate = this.framen;
            }
            this.addChildAt(this.mc, 0);
            this.mc.addEventListener(egret.Event.COMPLETE, this.removemc, this);
            if (!this.stopframe) {
                this.mc.gotoAndPlay(0, this.play_n ? this.play_n : 1);
            }
            else {
                this.mc.gotoAndStop(this.stopframe);
            }
        };
        GeneralEffect.prototype.removemc = function (e) {
            if (this.is_retain) {
                if (this.evt) {
                    this.dispatchEvent(new egret.Event(this.evt));
                }
                return;
            }
            if (this.play_n && --this.play_n) {
                this.mc.gotoAndPlay(0, this.play_n);
            }
            else {
                if (this.evt) {
                    this.dispatchEvent(new egret.Event(this.evt));
                }
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        };
        GeneralEffect.prototype.set_event = function (str) {
            this.evt = str;
        };
        //对外接口
        GeneralEffect.prototype.change_framerate = function (num, num2) {
            if (num2 === void 0) { num2 = 1; }
            this.framen = num;
            this.play_n = num2;
            if (this.mc) {
                this.mc.frameRate = num;
            }
        };
        GeneralEffect.prototype.play_by_times = function (times) {
            if (times === void 0) { times = 1; }
            this.play_n = times;
            if (this.mc) {
                this.mc.stop();
                this.mc.gotoAndPlay(0, times);
                this.mc.addEventListener(egret.Event.COMPLETE, this.removemc, this);
            }
        };
        GeneralEffect.prototype.mx_stop = function () {
            if (this.mc) {
                this.mc.stop();
            }
        };
        GeneralEffect.prototype.mx_play = function () {
            if (this.mc) {
                this.mc.play();
            }
        };
        GeneralEffect.prototype.on_remove = function () {
            if (this.mc) {
                this.mc.stop();
                this.mc.removeEventListener(egret.Event.COMPLETE, this.removemc, this);
                this.removeChild(this.mc);
                this.mc = null;
            }
            this.json_d = null;
            this.txtr_d = null;
            GeneralEffect.MC_NUM[this.eid]--;
            if (!GeneralEffect.MC_NUM[this.eid]) {
                RES.destroyRes(this.eid + "_png");
                RES.destroyRes(this.eid + "_json");
                delete GeneralEffect.MC_NUM[this.eid];
            }
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.on_remove, this);
        };
        GeneralEffect.prototype.set_retain = function (r) {
            this.is_retain = r;
        };
        GeneralEffect.prototype.gotoAndStop = function (frame) {
            if (frame === void 0) { frame = 1; }
            this.stopframe = frame; //标签名或者帧号
            if (this.mc) {
                this.mc.gotoAndStop(frame);
            }
        };
        GeneralEffect.MC_NUM = {};
        return GeneralEffect;
    }(eui.Component));
    mx.GeneralEffect = GeneralEffect;
    __reflect(GeneralEffect.prototype, "mx.GeneralEffect");
})(mx || (mx = {}));
//# sourceMappingURL=GeneralEffect.js.map