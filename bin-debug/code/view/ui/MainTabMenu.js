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
/**
 * cy、mx
 * 2016/08/19
 */
var mx;
(function (mx) {
    var MainTabMenu = (function (_super) {
        __extends(MainTabMenu, _super);
        function MainTabMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainTabMenu.prototype.get_guide_target = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_mt_xx":
                    tar = this.tab_list.getChildAt(3);
                    break;
                case "s_mt_jc":
                    tar = this.tab_list.getChildAt(0);
                    tar.x += 10;
                    break;
                case "s_m_hg":
                    tar = this.tab_list.getChildAt(1);
                    break;
            }
            return tar;
        };
        MainTabMenu.prototype.pre_init = function () {
            this.tab_list.selectedIndex = MainTabMenu.SINDEX || 0;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.MainTabMenuMediator(this));
        };
        MainTabMenu.prototype.set_sindex = function (id) {
            if (this.tab_list) {
                this.tab_list.selectedIndex = id;
            }
            MainTabMenu.SINDEX = id;
        };
        MainTabMenu.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.MainTabMenuMediator.NAME);
            this.removeChildren();
        };
        return MainTabMenu;
    }(mx.BasicUI));
    mx.MainTabMenu = MainTabMenu;
    __reflect(MainTabMenu.prototype, "mx.MainTabMenu");
})(mx || (mx = {}));
//# sourceMappingURL=MainTabMenu.js.map