/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 团队兑换英雄render,
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
    var TeamDHHeroRender = (function (_super) {
        __extends(TeamDHHeroRender, _super);
        function TeamDHHeroRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamDHHeroRender.prototype.init_render = function () {
            this.dataChanged();
            this.hero_p.mask = new egret.Rectangle(0, 45, 141, 418);
        };
        TeamDHHeroRender.prototype.dataChanged = function () {
            var cdata = this.data;
            if (!cdata || !this.skin) {
                return;
            }
            this.hero_p.source = mx.Tools.get_mn_res(cdata.id, "dh");
            //this.hero_p.scaleX = this.hero_p.scaleY = 0.5;
            this.hname_p.source = mx.Tools.get_mn_res(cdata.id, "name");
            this.hname_p.scaleX = this.hname_p.scaleY = 0.4;
            switch (cdata.htype) {
                case "STRENGTH"://攻击
                    this.htype_p.source = "li_png";
                    break;
                case "AGILITY"://守御
                    this.htype_p.source = "min_png";
                    break;
                case "INTELLIGENCE"://辅助
                    this.htype_p.source = "zhi_png";
                    break;
                default:
                    break;
            }
            this.namedi_p.source = "mpai_png";
            this.hpn_t.text = cdata.now + "/" + cdata.need;
            this.kdh_p.visible = false;
            this.ef_g.removeChildren();
            this.hpn_t.textColor = 0xFF3E82;
            this.hpn_t.stroke = 2;
            if (cdata.now >= cdata.need) {
                this.hpn_t.textColor = 0xffffff;
                this.hpn_t.stroke = 0;
                this.kdh_p.visible = true;
                var zg = new mx.GeneralEffect("dhgx");
                this.ef_g.addChild(zg);
                zg.play_by_times(-1);
            }
        };
        return TeamDHHeroRender;
    }(mx.BasicRender));
    mx.TeamDHHeroRender = TeamDHHeroRender;
    __reflect(TeamDHHeroRender.prototype, "mx.TeamDHHeroRender");
})(mx || (mx = {}));
//# sourceMappingURL=TeamDHHeroRender.js.map