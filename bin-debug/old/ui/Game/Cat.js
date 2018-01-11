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
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(index) {
        var _this = _super.call(this) || this;
        _this.mIndex = 0;
        _this.initData();
        _this.mIndex = index;
        return _this;
    }
    //private ttImage:eui.Image;
    Cat.prototype.initData = function () {
        this.stay = MovieClipAciton.creat("stay");
        this.weizhu = MovieClipAciton.creat("weizhu");
        this.stand = MovieClipAciton.creat("stand");
        this.defAciton();
        // var ttImage = new eui.Image("catTT_png");
        // this.addChild(ttImage);
        // ttImage.alpha = 0.2	
    };
    Cat.prototype.defAciton = function () {
        this.toStay();
        //this.toWeiZhu();
        //this.toStand();
    };
    Cat.prototype.reStart = function () {
        this.toStay();
    };
    Cat.prototype.toStay = function () {
        this.removeCurrAciton();
        this.showMC = this.stay.getMovieClip();
        this.addChild(this.showMC);
        this.showMC.play(-1);
        console.log(this.showMC.width);
        console.log(this.showMC.height);
        this.showMC.x = -10;
        this.showMC.y = -this.showMC.height * 0.5 - 10;
        //mc1.gotoAndPlay( "start" ,3);
    };
    Cat.prototype.toWeiZhu = function () {
        this.removeCurrAciton();
        this.showMC = this.weizhu.getMovieClip();
        this.addChild(this.showMC);
        this.showMC.play(-1);
        this.showMC.x = -10;
        this.showMC.y = -this.showMC.height * 0.5 - 10;
    };
    // public toStand():void
    // {
    // 	this.removeCurrAciton();
    // 	this.showMC = this.stand.getMovieClip();
    // 	this.addChild(this.showMC);	
    // 	this.showMC.play(-1)
    // 	//this.showMC.y = -this.showMC.height*0.5;
    // }
    Cat.prototype.removeCurrAciton = function () {
        if (null != this.showMC) {
            if (this.showMC.parent) {
                this.showMC.parent.removeChild(this.showMC);
            }
        }
        this.showMC = null;
    };
    Cat.prototype.initFactory = function (dim, name) {
        var data = RES.getRes(name + "_json");
        var txtr = RES.getRes(name + "_png");
        dim = new egret.MovieClipDataFactory(data, txtr);
    };
    return Cat;
}(egret.DisplayObjectContainer));
__reflect(Cat.prototype, "Cat");
var MovieClipAciton = (function () {
    function MovieClipAciton() {
    }
    MovieClipAciton.creat = function (name) {
        var result = new MovieClipAciton();
        var data = RES.getRes(name + "_json");
        var txtr = RES.getRes(name + "_png");
        result.name = name;
        result.factory = new egret.MovieClipDataFactory(data, txtr);
        return result;
    };
    MovieClipAciton.prototype.getMovieClip = function () {
        if (null == this.MovieClip) {
            this.MovieClip = new egret.MovieClip(this.factory.generateMovieClipData(name));
        }
        return this.MovieClip;
    };
    return MovieClipAciton;
}());
__reflect(MovieClipAciton.prototype, "MovieClipAciton");
//# sourceMappingURL=Cat.js.map