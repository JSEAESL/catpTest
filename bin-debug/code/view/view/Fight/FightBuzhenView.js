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
*   @author qianjun
*   @date 2015.1.3
*   @desc 战斗布阵
**/
var mx;
(function (mx) {
    var FightBuzhenView = (function (_super) {
        __extends(FightBuzhenView, _super);
        function FightBuzhenView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.buzhen = {};
            _this.pos_to_roleid = {
                "1": 1,
                "2": 2,
                "3": 3,
                "4": 4,
                "5": 5,
                "6": 6,
            };
            _this.offsetX = 0;
            _this.offsetY = 0;
            _this.sel_mid = -1;
            //初始坐标
            _this.pos = {
                "1": { "x": 405, "y": 515 },
                "2": { "x": 397, "y": 330 },
                "3": { "x": 390, "y": 155 },
                "4": { "x": 170, "y": 515 },
                "5": { "x": 180, "y": 330 },
                "6": { "x": 195, "y": 155 }
            };
            return _this;
        }
        FightBuzhenView.mx_support = function () {
            return ["assets.zdbzhen"];
        };
        FightBuzhenView.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_zw_ts1":
                case "v_zw_ts2":
                    break;
                case "v_zw_td1"://显示第一个拖动动画
                    tar = this.m2_g;
                    break;
                case "v_zw_td2"://显示第二个拖动动画
                    if (this.m3_g.numChildren <= 0) {
                        mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                            "gkey": "m_sczw", "touch": "v_zw_td2"
                        });
                        mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                        return;
                    }
                    tar = this.m3_g;
                    break;
                case "v_zw_ts3":
                    break;
                case "v_zw_gb":
                    tar = this.close_b;
                    break;
            }
            return tar;
        };
        Object.defineProperty(FightBuzhenView.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeroProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        FightBuzhenView.prototype.init_view_by_type = function () {
            var view = this;
            //view.scaleX = view.scaleY = 2/3;
            var hproxy = this.proxy;
            var team_id = this.adata.team_id;
            var cz_team = this.adata.team;
            var buzhen = hproxy.get_buzhen(team_id);
            if (!buzhen) {
                var buzhen_1 = {};
                for (var i in cz_team) {
                    var hero = hproxy.get_chero_info(cz_team[i]);
                    buzhen_1[Number(i) + 1] = hero.mid;
                }
                for (var i = 1; i < 7; ++i) {
                    if (!buzhen_1[i]) {
                        buzhen_1[i] = null;
                    }
                }
                this.proxy.set_buzhen(buzhen_1, team_id);
            }
            buzhen = hproxy.get_buzhen(team_id);
            //战前排位布阵
            for (var i = 1; i < 7; ++i) {
                view["m" + i + "_g"].x = this.pos[i].x;
                view["m" + i + "_g"].y = this.pos[i].y;
                if (buzhen[i]) {
                    var role_ui = new mx.HeroItemRender();
                    role_ui.data = {
                        "mid": buzhen[i],
                        "show": true,
                        "id": i
                    };
                    role_ui.x = -10;
                    role_ui.y = 10;
                    view["m" + i + "_g"].addChild(role_ui);
                    //role_ui.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.change_pos, this);   
                    //role_ui.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
                    //view["m" + i + "_g"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
                }
                view["m" + i + "_g"].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
                view["m" + i + "_g"].addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            }
            this.buzhen = buzhen;
            if (mx.MX_COMMON.IN_GUIDE) {
                var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GuideProxy.NAME));
                var gapi = gproxy.get_curr_guide();
                if (gapi && (gapi.jqid == 'm_sczw' && view.m2_g.numChildren <= 0)) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        "gkey": "m_sczw", "touch": "v_zw_td1"
                    });
                }
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
        };
        FightBuzhenView.prototype.get_group_bymid = function (mid) {
            var view = this;
            for (var i = 1; i < 7; ++i) {
                if (view["m" + i + "_g"].numChildren) {
                    if (view["m" + i + "_g"].getChildAt(0).data.mid == mid) {
                        return i;
                    }
                }
            }
        };
        FightBuzhenView.prototype.startMove = function (evt) {
            var view = this;
            //把手指按到的对象记录下来
            var draggedObject = evt.currentTarget;
            if (!draggedObject.numChildren) {
                this.restore();
                return;
            }
            this.sel_mid = draggedObject.getChildAt(0).data.mid;
            var ui = view["m" + this.get_group_bymid(this.sel_mid) + "_g"];
            this.sel_ui = ui;
            //转换下坐标
            var point = view.hero_g.globalToLocal(evt.stageX, evt.stageY);
            //计算手指和要拖动的对象的距离
            this.offsetX = point.x - draggedObject.x;
            this.offsetY = point.y - draggedObject.y;
            //把触摸的对象放在显示列表的顶层
            this.hero_g.addChild(ui);
            //手指在屏幕上移动，会触发 onMove 方法
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        };
        FightBuzhenView.prototype.onMove = function (evt) {
            var view = this;
            var draggedObject = evt.currentTarget;
            if (!draggedObject.numChildren) {
                this.restore();
                return;
            }
            //转换下坐标
            var point = view.hero_g.globalToLocal(evt.stageX, evt.stageY);
            view.sel_ui.x = point.x - this.offsetX;
            view.sel_ui.y = point.y - this.offsetY;
        };
        FightBuzhenView.prototype.hitTestP = function (obj1, obj2) {
            var rect1 = obj1.getBounds(); //获取显示对象的测量边界
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect1.height = 150 * 2 / 3;
            rect1.width = 133 * 2 / 3;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
            return rect1.intersects(rect2);
        };
        FightBuzhenView.prototype.stopMove = function (evt) {
            //计算当前终点属于哪个区域
            var view = this;
            var draggedObject = evt.currentTarget;
            if (!draggedObject.numChildren) {
                this.restore();
                return;
            }
            var point = view.hero_g.globalToLocal(evt.stageX, evt.stageY);
            // let glb = view["m" + this.sel_id + "_g"].localToGlobal(view.sel_ui.x,view.sel_ui.y);
            var before_pos = 0, after_pos = 0;
            var before_idx = 0, after_idx = 0;
            //选中拖动的角色
            for (var i in this.buzhen) {
                if (this.buzhen[i] == this.sel_mid) {
                    before_pos = Number(i);
                    break;
                }
            }
            before_idx = this.get_group_bymid(this.sel_mid);
            for (var i = 1; i < 7; ++i) {
                if (i == before_idx) {
                    continue;
                }
                var group = view["m" + i + "_g"];
                //let point = view.hero_g.globalToLocal(glb.x,glb.y);
                //this.hitTestP(group,this.sel_ui)
                var num = group.numChildren;
                this.hero_g.addChild(group);
                if (this.hitTestP(group, this.sel_ui)) {
                    //空位角色
                    after_idx = i;
                    after_pos = this.pos_to_roleid[after_idx];
                    var obj = void 0;
                    if (num) {
                        obj = group.getChildAt(0);
                    }
                    this.buzhen[before_pos] = num ? obj.data.mid : null;
                    this.buzhen[after_pos] = this.sel_mid;
                    // this.buzhen[after_idx] = this.sel_mid;
                    // after_idx = i;
                    //交换位置
                    this.sel_ui.x = this.pos[after_pos].x;
                    this.sel_ui.y = this.pos[after_pos].y;
                    group.x = this.pos[before_pos].x;
                    group.y = this.pos[before_pos].y;
                    var temp = this.pos_to_roleid[after_idx];
                    this.pos_to_roleid[after_idx] = this.pos_to_roleid[before_idx];
                    this.pos_to_roleid[before_idx] = temp;
                    break;
                }
            }
            //未发生改变 人物重回
            if (after_pos == 0) {
                this.restore();
                // this.sel_ui.x = 20;
                // this.sel_ui.y = 0;
                // view["m" + this.sel_id + "_g"].addChild(this.sel_ui);
            }
            //校正
            if (mx.MX_COMMON.IN_GUIDE) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        };
        FightBuzhenView.prototype.restore = function () {
            for (var i in this.buzhen) {
                if (this.buzhen[i] == this.sel_mid) {
                    this.sel_ui.x = this.pos[i].x;
                    this.sel_ui.y = this.pos[i].y;
                    break;
                }
            }
            this.offsetX = this.offsetY = 0;
            this.sel_mid = -1;
            this.sel_ui = null;
        };
        FightBuzhenView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            var team_id = this.adata.team_id;
            for (var i = 1; i < 7; ++i) {
                if (!this.buzhen[i]) {
                    this.buzhen[i] = null;
                }
            }
            this.proxy.set_buzhen(this.buzhen, team_id);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_BUZHEN_INFO,
                "team_id": team_id,
                "zhanwei": JSON.stringify(this.buzhen)
            });
            for (var i = 1; i < 7; ++i) {
                if (view["m" + i + "_g"].numChildren) {
                    var role_ui = view["m" + i + "_g"].getChildAt(0);
                    if (role_ui) {
                        role_ui.on_remove();
                        role_ui = null;
                    }
                    //role_ui.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.change_pos, this);
                    //role_ui.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
                    //view["m" + i + "_g"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
                    view["m" + i + "_g"].removeChildren();
                }
                view["m" + i + "_g"].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
                view["m" + i + "_g"].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            }
        };
        FightBuzhenView.S_NAME = "FightBuzhenView";
        return FightBuzhenView;
    }(mx.AlertView));
    mx.FightBuzhenView = FightBuzhenView;
    __reflect(FightBuzhenView.prototype, "mx.FightBuzhenView");
})(mx || (mx = {}));
//# sourceMappingURL=FightBuzhenView.js.map