/**
 *   @author wf
 *   @date 2016.12.20
 *   @desc 活动列表条目render
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
    var ChatLyznRender = (function (_super) {
        __extends(ChatLyznRender, _super);
        function ChatLyznRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChatLyznRender.prototype.init_render = function () {
            this.lyin_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ChatLyznRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = this.data;
            cd.xing = "";
            facade.sendNotification(mx.MX_NOTICE.CLOSE_CHATLYZN);
            var proxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME);
            proxy.chat_zinv_info = null;
            proxy.chat_zinv_info = cd;
            cd.skill = [];
            cd.skill.push(cd.jineng1);
            cd.skill.push(cd.jineng2);
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                name: mx.HzLyinPop.S_NAME,
                param: { type: 1, data: cd }
            });
        };
        ChatLyznRender.prototype.dataChanged = function () {
            var cd = this.data;
            if (!cd || !this.skin) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            view.avatar.source = mx.Tools.get_zn_res(cd.avatar, "tx");
            //姓名
            view.name_t.text = cd.name;
            // view.name_t.textColor = Tools.num2color(cd.meili);
            view.name_t.textColor = 0x795DAC;
            //魅力
            view.mli_t.text = mx.Lang.mli + "：" + cd.meili;
            view.mli_t.left = view.name_t.textWidth + 215;
            //技能
            for (var i = 1; i < 3; ++i) {
                var id = Number(cd["jineng" + i]);
                if (id > 0) {
                    var skill = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", cd["jineng" + i]);
                    view["jn" + i + "_t"].textFlow = [
                        { "text": mx.Lang.jineng + mx.Lang.numword[i] + "：" },
                        { "text": skill.name, "style": { "textColor": 0x72bd6a } },
                    ];
                }
                else {
                    view["jn" + i + "_t"].textFlow = [
                        { "text": mx.Lang.jineng + mx.Lang.numword[i] + "：" },
                        { "text": mx.Lang.hzs75, "style": { "textColor": 0x958c99 } },
                    ];
                }
            }
        };
        return ChatLyznRender;
    }(mx.BasicRender));
    mx.ChatLyznRender = ChatLyznRender;
    __reflect(ChatLyznRender.prototype, "mx.ChatLyznRender");
})(mx || (mx = {}));
//# sourceMappingURL=ChatLyznRender.js.map