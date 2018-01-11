/**
 *   @author cy
 *   @date 2017.1.12
 *   @desc 教坊司首页render
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
    var JFSRender = (function (_super) {
        __extends(JFSRender, _super);
        function JFSRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JFSRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.pchang_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sshen_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jz_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.mn_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JFSRender.prototype.init_render = function () {
            this.pchang_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sshen_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jz_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.mn_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        JFSRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (data.avatar) {
                var tx = mx.Tools.get_zn_res(data.avatar, "tx");
                this.mn_p.source = tx;
            }
            this.name_t.text = data.name || "啦啦啦";
            this.name_t.textColor = mx.Tools.num2color(data.meili);
            this.mlz_t.text = mx.Lang.mli + ": " + data.meili;
            this.rq_t.text = mx.Lang.jfs05 + ": " + data.renqi;
            if (Number(data.jinzhu)) {
                this.jz_t.textFlow = [{ "text": data.jinzhu_name, "style": { "underline": true } }];
            }
            else {
                this.jz_t.textFlow = [{ "text": mx.Lang.wu, "style": { "underline": false } }];
            }
            var renqi = Number(data.renqi);
            if (renqi >= 180) {
                var str = "";
                if (renqi < 300) {
                    str = "jfs3";
                }
                else if (renqi < 420) {
                    str = "jfs2";
                }
                else {
                    str = "jfs1";
                }
                var zg = new mx.GeneralEffect(str);
                this.ef_g.addChild(zg);
                zg.play_by_times(-1);
            }
            var tag_arr = [];
            var tag;
            switch (data.haizi) {
                case "qinsheng":
                    tag = "qsz_png";
                    break;
                case "sisheng":
                    tag = "ssz_png";
                    break;
                case "yesheng":
                    tag = "yzz_png";
                    break;
            }
            if (tag) {
                tag_arr.push({
                    "tag": tag,
                });
            }
            if (data.zhuan == 1 || data.zhuan == 3) {
                tag_arr.push({
                    "tag": "zsbqian_png",
                });
            }
            this.tag_list.dataProvider = new eui.ArrayCollection(tag_arr);
            var jibie = 1;
            this.jibie_p.source = "jfsb1_png";
            var arr = [0, 30, 60, 90, 120, 180, 240, 300, 360, 420, 600, 900, 99999999];
            for (var k in arr) {
                if (renqi >= arr[k] && renqi < arr[Number(k) + 1]) {
                    jibie = Math.min(Number(k) + 1, 9);
                    if (jibie == 8 || jibie == 7 || jibie == 12) {
                        this.jibie_p.source = "jfs" + jibie + "_png";
                    }
                    else if (Number(data.sex == 1)) {
                        this.jibie_p.source = "jfsg" + jibie + "_png";
                    }
                    else {
                        this.jibie_p.source = "jfsb" + jibie + "_png";
                    }
                }
            }
            var jg;
            var meili = Number(data.meili);
            if (meili < 50) {
                jg = 60;
            }
            else if (meili < 60) {
                jg = 60;
            }
            else if (meili < 70) {
                jg = 108;
            }
            else if (meili < 80) {
                jg = 150;
            }
            else if (meili < 90) {
                jg = 198;
            }
            else {
                jg = 288;
            }
            var arr2 = [600, 300, 180, 150, 120, 90, 60, 45, 30, 15, 10, 0];
            jg += arr2[12 - jibie];
            this.jg = jg;
        };
        JFSRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.WaiJiaoProxy.NAME));
            var data = this.data;
            proxy.set_cur_mn(data);
            switch (e.currentTarget) {
                case this.pchang_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JFSPC,
                        "id": data.id
                    });
                    break;
                case this.mn_p:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FZ_INFO,
                        "mid": data.mid,
                        "type": 5
                    });
                    break;
                case this.sshen_b:
                    var user_id = Main.USER_ID;
                    //自己亲子女、私生子女赎身
                    if (typeof data.haizi != 'undefined') {
                        if (data.haizi == 'yesheng') {
                            if (Number(user_id) == Number(data.jinzhu)) {
                                proxy.ss_flag = 1;
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                    "name": mx.AVGView.S_NAME,
                                    "param": {
                                        "cd": data,
                                        "type": "jfs_ss",
                                        "yh": data.youhui,
                                        "jg": this.jg
                                    }
                                });
                            }
                            else {
                                var a_d = {
                                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                    "sdata_ok": {
                                        "t": mx.MX_NETS.CS_JFS_SS,
                                        "id": data.id
                                    },
                                    "param": mx.Tools.format(mx.Lang.jfs19, this.jg)
                                };
                                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                            }
                        }
                        else {
                            if (proxy.shushen_have_avg.indexOf(data.zinv_id) == -1) {
                                proxy.shushen_have_avg.push(data.zinv_id);
                            }
                            proxy.ss_flag = 1;
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "cd": data,
                                    "type": "jfs_ss",
                                    "yh": 10,
                                    "jg": this.jg,
                                    "zinv": true
                                }
                            });
                        }
                    }
                    else {
                        if (Number(user_id) == Number(data.jinzhu)) {
                            proxy.ss_flag = 1;
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                                "name": mx.AVGView.S_NAME,
                                "param": {
                                    "cd": data,
                                    "type": "jfs_ss",
                                    "yh": data.youhui,
                                    "jg": this.jg
                                }
                            });
                        }
                        else {
                            var a_d = {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": {
                                    "t": mx.MX_NETS.CS_JFS_SS,
                                    "id": data.id
                                },
                                "param": mx.Tools.format(mx.Lang.jfs19, this.jg)
                            };
                            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                        }
                    }
                    break;
                case this.jz_t:
                    if (Number(data.jinzhu)) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_PLAYER_INFO,
                            "other_id": Number(data.jinzhu)
                        });
                    }
                    break;
            }
        };
        return JFSRender;
    }(mx.BasicRender));
    mx.JFSRender = JFSRender;
    __reflect(JFSRender.prototype, "mx.JFSRender");
})(mx || (mx = {}));
//# sourceMappingURL=JFSRender.js.map