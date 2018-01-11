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
var BasicMediator = (function (_super) {
    __extends(BasicMediator, _super);
    function BasicMediator(mediatorName, viewComponent) {
        return _super.call(this, mediatorName, viewComponent) || this;
    }
    BasicMediator.prototype.addEvent = function () {
    };
    BasicMediator.prototype.init = function () {
    };
    BasicMediator.prototype.removeOther = function () {
    };
    BasicMediator.prototype.removeEvent = function () {
    };
    BasicMediator.prototype.onRegister = function () {
        this.addEvent();
        this.init();
    };
    BasicMediator.prototype.onRemove = function () {
        this.removeEvent();
        this.removeOther();
    };
    return BasicMediator;
}(puremvc.Mediator));
__reflect(BasicMediator.prototype, "BasicMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
//# sourceMappingURL=BasicMediator.js.map