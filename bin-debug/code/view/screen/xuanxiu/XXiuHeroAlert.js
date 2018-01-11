/**
*   @author mx
*   @date 2015.1.3
*   @desc 选秀奖励弹窗-英雄
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
    var XXiuHeroAlert = (function (_super) {
        __extends(XXiuHeroAlert, _super);
        function XXiuHeroAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuHeroAlert.mx_support = function () {
            return ["assets.heroalert", "api.EQUIP"];
        };
        XXiuHeroAlert.prototype.get_guide_pos = function (gkey) {
            var tar = this.qd_b;
            return tar;
        };
        XXiuHeroAlert.prototype.init_view = function () {
            this.bg_g.alpha = 0;
            this.c_g.alpha = 0;
            this.qd_b.set_ssres("zzdle_png");
            this.qd_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.share_b.set_ssres("xyyxia_png");
            this.share_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // let height = Tools.screen_height;
            // let gap = Math.max(0, (854 - height) / 2 - 39);
            // this.bg_g.bottom = gap;
            //方块动画播放结束后，淡入英雄
            var zg = new mx.GeneralEffect("cqy2"); //方框动画
            this.ef_g.addChild(zg);
            zg.x = -20;
            zg.y = -180;
            zg.set_event(mx.MX_COMMON.MX_EFOVER);
            zg.addEventListener(mx.MX_COMMON.MX_EFOVER, this.zg_over, this);
            var fg = new mx.GeneralEffect("dshshuo");
            this.c_g.addChild(fg);
            fg.x = 200;
            fg.y = 300;
            fg.play_by_times(-1);
            //已拥有该侍从时，隐藏炫耀按钮
            if (this.adata.type == 4) {
                this.share_b.visible = false;
                this.qd_b.horizontalCenter = 0;
            }
        };
        XXiuHeroAlert.prototype.zg_over = function (e) {
            var cd = this.adata;
            var hero = mx.ApiTool.getAPINode(mx.MX_APINAME.HERO, "id", cd.id);
            this.hero_p.source = mx.Tools.get_mn_res(cd.id, "lh");
            this.hname_p.source = mx.Tools.get_mn_res(cd.id, "name");
            var height = mx.Tools.screen_height;
            if (height - this.hero_p.height - this.hero_p.bottom < 18) {
                this.hero_p.bottom = height - this.hero_p.height - 18;
            }
            if (cd.type == 4) {
                var c_s = Number(hero.InitialStars);
                var str = mx.Tools.format(mx.Lang.xx002, c_s, cd.num);
                this.desc_t.textFlow = mx.Tools.setKeywordColor2(str, [0x8766BA, 0xc257cf, 0xee4b5a]);
            }
            else {
                this.desc_t.text = hero.Description;
                var tar_fate = [];
                var res_fate = [];
                var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.HEROFATE, "h_id", cd.id);
                /*  for (let k in apis) {
                      if (tar_fate.indexOf(Number(apis[k].id)) < 0) {
                          tar_fate.push(Number(apis[k].id));
                      }
                  }
                  for (let t = 1; t <= 4; t++) {
                      apis = ApiTool.getAPINodes(MX_APINAME.HEROFATE, "hero" + t, cd.id);
                      for (let k in apis) {
                          if (tar_fate.indexOf(Number(apis[k].id)) < 0) {
                              tar_fate.push(Number(apis[k].id));
                          }
                      }
                  }
                  for (let k in tar_fate) {
                      if (Tools.check_fate(tar_fate[k])) {
                          res_fate.push(tar_fate[k]);
                      }
                  }
                  if (res_fate.length > 0) {
                      ApplicationFacade.getInstance().sendNotification(MX_NOTICE.POP_VIEW, {
                          "name": XXiuFateAlert.S_NAME,
                          "param": res_fate
                      });
                  }*/
            }
            this.bg_g.alpha = 1;
            egret.Tween.get(this.c_g).to({ "alpha": 1 }, 600).call(function () {
                if (mx.MX_COMMON.IN_GUIDE) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
            });
        };
        XXiuHeroAlert.prototype.btn_click = function (e) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.adata;
            switch (e.currentTarget.res_name) {
                case "xyyxia_png":
                    if (!RES.hasRes("share_hero" + cd.id + "_png")) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.share01 });
                    }
                    else {
                        if (window && window["shareScreenshot"]) {
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.ShareHeroAlert.S_NAME,
                                "param": {
                                    "hid": this.adata.id
                                }
                            });
                        }
                    }
                    break;
                case "zzdle_png":
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XXiuHeroAlert.S_NAME);
                    if (cd.notice) {
                        facade.sendNotification(cd.notice, cd.senddata, cd.ntype);
                    }
                    break;
            }
        };
        XXiuHeroAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            egret.clearTimeout(this.timeout);
            egret.Tween.removeTweens(this.c_g);
            this.qd_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        XXiuHeroAlert.S_NAME = "XXiuHeroAlert";
        XXiuHeroAlert.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return XXiuHeroAlert;
    }(mx.BasicView));
    mx.XXiuHeroAlert = XXiuHeroAlert;
    __reflect(XXiuHeroAlert.prototype, "mx.XXiuHeroAlert");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuHeroAlert.js.map