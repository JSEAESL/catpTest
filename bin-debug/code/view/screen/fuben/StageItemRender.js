/**
 *   @author qianjun
 *   @date 2016.8.29
 *   @desc 魂魄获取render
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
    var StageItemRender = (function (_super) {
        __extends(StageItemRender, _super);
        function StageItemRender() {
            var _this = _super.call(this) || this;
            _this.hasPass = false;
            _this.height = 172;
            return _this;
        }
        StageItemRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.showTalk, this);
                this.timer = null;
            }
            if (this.tid) {
                egret.clearTimeout(this.tid);
                this.tid = null;
            }
            this.ef_g.removeChildren();
        };
        StageItemRender.prototype.startTalk = function () {
            var d = this.data;
            if ((d.state == -1 && this.hasPass) || (d.state != 1 && !this.hasPass)) {
                this.stopTalk();
            }
            else if (this.timer) {
                return;
            }
            if (d.state == -1) {
                this.hasPass = true;
                this.timer = new egret.Timer((9 + Math.ceil(Math.random() * 6)) * 1000);
            }
            else {
                this.hasPass = false;
                this.timer = new egret.Timer(8000);
            }
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.showTalk, this);
            this.timer.start();
            this.showTalk();
        };
        StageItemRender.prototype.showTalk = function () {
            var view = this;
            if (this.data.replay) {
                this.stopTalk();
                return;
            }
            view.wordbg.visible = view.tzword.visible = true;
            this.tid = egret.setTimeout(function () {
                if (view) {
                    view.wordbg.visible = view.tzword.visible = false;
                }
            }, this, 5000);
        };
        StageItemRender.prototype.stopTalk = function () {
            this.wordbg.visible = this.tzword.visible = false;
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.showTalk, this);
                this.timer = null;
            }
        };
        StageItemRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            view.di_p.source = data.replay ? 'yjjxlan_png' : 'yjjxfen_png';
            var btnres = data.replay ? 'listtz_png' : 'listtz2_png';
            var btn2res = data.replay ? 'ytzhan_png' : 'ytzhan2_png';
            view.stage_name_t.textColor = data.replay ? 0x47809B : 0xE66180;
            //Q版人物立绘随着id变化不同
            //view.tx_bg.source = (data.stage % 3 + 1) + "_png";
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.BATTLE, "stageid", data.stage, "waveid", 3);
            var res = "monster1_png";
            var boss_pos = api.BossPosition;
            if (Number(boss_pos) > 0) {
                var boss_id = api["Monster" + boss_pos + "ID"];
                res = mx.Tools.get_mn_res(boss_id, "monster");
            }
            view.tx_bg.source = res;
            api = null;
            var pass = Number(data.state);
            var param = {
                'num': pass,
                'res': 'xing',
            };
            view.xing.init_multiui(param);
            view.xing.visible = pass > 0;
            view.suc_p.visible = pass == -1;
            view.new_p.visible = !pass;
            view.stage_name_t.verticalCenter = pass != 0 ? 20 : -2;
            if (data.suo) {
                mx.Tools.mx_grayfy(this.tx_bg);
                mx.Tools.mx_grayfy(this.tzhan_b);
                mx.Tools.mx_grayfy(this.stage_name_t);
                mx.Tools.mx_grayfy(this.tzhan_num_t);
                mx.Tools.mx_grayfy(this.di_p);
                view.stage_name_t.verticalCenter = 0;
            }
            else {
                mx.Tools.mx_grayfy(this.tx_bg, true);
                mx.Tools.mx_grayfy(this.tzhan_b, true);
                mx.Tools.mx_grayfy(this.stage_name_t, true);
                mx.Tools.mx_grayfy(this.tzhan_num_t, true);
                mx.Tools.mx_grayfy(this.di_p, true);
            }
            view.tzhan_b.set_ssres(pass == -1 ? btn2res : btnres);
            view.tzhan_b.touchEnabled = pass != -1 && !data.suo;
            var sid = data.stage + '';
            var num = Number(sid.substring(data.stage.length - 1, 1));
            var wordid = data.stage % 2 + num % 3;
            if (wordid == 0) {
                wordid = data.stage % 3 + 1;
            }
            view.tzword.source = 'tzword' + (pass == -1 ? 2 : 1) + '-' + wordid + '_png';
            //挑战按钮及次数显示
            var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', data.stage);
            view.stage_name_t.text = (this.itemIndex + 1) + '. ' + stage.StageName;
            var difficult = parseInt(stage.Difficulty);
            stage = null;
            //if(difficult > 1){//1简单 2精英
            if ((data.max != 999 && pass != 0) || (!data.replay && !data.suo)) {
                //view.tzhan_b.top = 20;
                view.tzhan_g.visible = true;
                //view.tzbg.source = data.replay ? 'tzcshu_png' : 'xtzyici_png';
                view.tzhan_num_t.text = data.replay ? mx.Lang.fb037 : mx.Lang.fb038;
                view.tzhan_num_t.text += data.replay ? data.cishu + "/" + data.max : '';
            }
            else {
                //view.tzhan_b.top = 38;
                view.tzhan_g.visible = false;
            }
            this.ef_g.removeChildren();
            var fproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            if (view.new_p.visible && !fproxy.jump) {
                this.dianji_mc();
            }
            else if (fproxy.jump && data.stage == fproxy.stage_id) {
                this.dianji_mc();
            }
            if (!data.replay && !data.suo) {
                this.startTalk();
            }
            else {
                this.stopTalk();
            }
        };
        StageItemRender.prototype.dianji_mc = function () {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var new_ef = new mx.GeneralEffect("dianji");
            new_ef.change_framerate(12, -1);
            new_ef.x = this.width * 0.8;
            new_ef.y = 55;
            this.ef_g.addChild(new_ef);
        };
        return StageItemRender;
    }(mx.BasicRender));
    mx.StageItemRender = StageItemRender;
    __reflect(StageItemRender.prototype, "mx.StageItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=StageItemRender.js.map