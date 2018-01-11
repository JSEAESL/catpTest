/**
 *   @author cy
 *   @date 2017.4.19
 *   @desc 家族render
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
    var UnionRender = (function (_super) {
        __extends(UnionRender, _super);
        function UnionRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionRender.prototype.init_render = function () {
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        UnionRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            uProxy.target_gh_id = this.data.gh_id;
            if (e.target != this.fun_b) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.UnionDetailAlert.S_NAME,
                    "param": this.data,
                });
                return;
            }
            switch (e.currentTarget.res_name) {
                case "cxsqing_png":
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_CHEXIAO,
                        "gh_id": this.data.gh_id,
                    });
                    break;
                case "zbzmu_png":
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jz219 });
                    break;
                case "sqjru_png":
                case "zjsqing_png":
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_SHENQ,
                        "gh_id": this.data.gh_id,
                    });
                    break;
            }
        };
        UnionRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        UnionRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            this.huizhang_p.source = "jzhz" + data.logo + "_png";
            this.lv_t.text = mx.Tools.format(mx.Lang.bh001, data.level);
            this.name_t.text = mx.Lang.jz011 + "：" + data.name;
            this.num_t.text = mx.Lang.jz012 + "：" + data.ren + "/" + data.maxren;
            this.zuzhang_t.text = mx.Lang.jz009 + "：" + data.hz_name;
            this.g_g.left = 42;
            //this.num_t.right = 27;
            this.fun_b.right = 18;
            if (typeof data.left != "undefined") {
                this.g_g.left = data.left;
                //this.num_t.right = 27 + 41 - data.left;
                this.fun_b.right = 15 + 41 - data.left;
                this.lv_t.horizontalCenter = -175 - Math.floor((41 - data.left) / 2);
            }
            //     this.paiming_bt.visible = this.pmdi_p.visible = this.paiming_p.visible = false;
            if (typeof data.rank != "undefined") {
                var index = data.rank;
                var arr = ["jzpyi_png", "jzper_png", "jzpsan_png"];
                if (index <= 2) {
                    //           this.paiming_p.visible = true;
                    //           this.paiming_p.source = arr[index - 1];
                }
                else {
                    //           this.paiming_bt.visible = this.pmdi_p.visible = true;
                    //            this.paiming_bt.text = index + "";
                }
            }
            var gonggao = data.gonggao != "" ? data.gonggao : mx.Lang.jz004;
            gonggao = gonggao.length > 10 ? gonggao.substr(0, 9) + ".." : gonggao;
            this.gonggao_t.text = mx.Lang.jz010 + "：" + gonggao;
            var source = "sqjru_png";
            this.fun_b.visible = true;
            if (Number(data.apply) == 1) {
                source = "cxsqing_png";
            }
            else {
                switch (Number(data.kind)) {
                    case 0://需申请
                        source = "sqjru_png";
                        break;
                    case 1://直接进
                        source = "zjsqing_png";
                        break;
                    case 2://禁止进 
                        source = "zbzmu_png";
                        break;
                }
            }
            this.fun_b.set_ssres(source);
            if (typeof data.search != "undefined") {
                var key_word = uProxy.key_word;
                var name_1 = data.name.replace(key_word, "{0" + key_word + "0}");
                var str = mx.Lang.jz011 + "：" + name_1;
                this.name_t.textFlow = mx.Tools.setKeywordColor2(str, [0xff4b4b]);
                var cor = key_word == String(data.gh_id) ? 0xff4b4b : 0xAB868D;
                this.gonggao_t.textFlow = [{ "text": mx.Lang.jz018 + "：" }, { "text": data.gh_id, "style": { "textColor": cor } }];
            }
            /*   if(typeof data.paiming != "undefined"){
                   this.fun_b.visible = false;
               }*/
        };
        return UnionRender;
    }(mx.BasicRender));
    mx.UnionRender = UnionRender;
    __reflect(UnionRender.prototype, "mx.UnionRender");
})(mx || (mx = {}));
//# sourceMappingURL=UnionRender.js.map