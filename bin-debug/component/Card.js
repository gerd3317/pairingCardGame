var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        return _super.call(this) || this;
    }
    /**SetData:設定卡牌內容 */
    Card.prototype.SetData = function () {
        /**設定初始值 */
        this.cardbody = new egret.Bitmap(RES.getRes(this.cardStatus + '_png'));
        this.cardbody.scaleX = 0.5;
        this.cardbody.scaleY = 0.5;
        this.cardbody.touchEnabled = true;
        this.cardInside = new egret.Bitmap(RES.getRes(this.cardValue + '_png'));
        this.cardInside.x = this.cardInside.width / 2;
        this.cardInside.y = this.cardInside.height / 2;
        this.cardInside.scaleX = 0.8;
        this.cardInside.scaleY = 0.8;
        this.cardInside.anchorOffsetX = this.cardInside.width / 2;
        this.cardInside.anchorOffsetY = this.cardInside.height / 2;
        this.addChild(this.cardbody);
        this.addChild(this.cardInside);
        /**翻牌效果 */
        if (this.cardStatus === "cardFace") {
            this.removeChild(this.cardbody);
            this.removeChild(this.cardInside);
            this.cardbody.texture = RES.getRes(this.cardStatus + '_png');
            this.addChild(this.cardbody);
            this.addChild(this.cardInside);
        }
        else if (this.cardStatus === "cardBack") {
            this.removeChild(this.cardbody);
            this.removeChild(this.cardInside);
            this.cardbody.texture = RES.getRes(this.cardStatus + '_png');
            this.addChild(this.cardbody);
        }
        else if (this.cardStatus === "resolved") {
            this.removeChild(this.cardbody);
            this.removeChild(this.cardInside);
            this.cardbody.texture = RES.getRes("cardFace_png");
            this.addChild(this.cardbody);
            this.addChild(this.cardInside);
        }
    };
    return Card;
}(egret.Sprite));
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map