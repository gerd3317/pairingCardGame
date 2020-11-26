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
var Scenes = (function (_super) {
    __extends(Scenes, _super);
    function Scenes() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    Scenes.prototype.init = function () {
        var _this = this;
        /**宣告圖片資源 */
        var animals = ['seaLion', 'cow', 'dog', 'elephant', 'lion', 'monkey', 'penguin', 'pig', 'squirrel', 'zebra'];
        /** 變成對子 */
        for (var i = 0; i < animals.length / 2; i++) {
            animals.push(animals[i]);
        }
        /** 打亂順序 */
        animals.sort(function () {
            for (var i = 0; i < animals.length / 2; i++) {
                return (0.5 - Math.random());
            }
        });
        /**宣告卡片群組陣列 */
        var cardGroup = [];
        /**建立卡牌 */
        animals.forEach(function (animalsName, i) {
            var cards = new Card();
            cards.cardKey = i;
            cards.cardValue = animalsName;
            cards.cardStatus = "cardBack";
            cards.SetData();
            _this.addChild(cards);
            cards.touchEnabled = true;
            cardGroup.push(cards);
            /**把卡牌排列好位置 */
            if (i === 4 || i / 4 > 1 && i < 8) {
                cards.y += cards.height;
                cards.x += i % 4 * cards.width;
            }
            else if (i === 8 || i / 8 > 1 && i < 12) {
                cards.y += cards.height * 2;
                cards.x += i % 8 * cards.width;
            }
            else if (i === 12 || i / 12 > 1 && i < 16) {
                cards.y += cards.height * 3;
                cards.x += i % 12 * cards.width;
            }
            else if (i === 16 || i / 16 > 1 && i < 20) {
                cards.y += cards.height * 4;
                cards.x += i % 16 * cards.width;
            }
            else {
                cards.x += i * cards.width;
            }
        });
        /**點擊數 */
        var clicks = 1;
        /**第一次點擊物件 */
        var firstObj;
        /**第二次點擊物件 */
        var secondObj;
        /**第一次點擊變數 */
        var firstClickName;
        /**第二次點擊變數 */
        var secondClickName;
        /**第一次點擊的HashCode */
        var firstClickIndex;
        /**第二次點擊的HashCode */
        var secondClickIndex;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            console.log("點擊數:" + clicks);
            /**當點擊到resolved時 */
            if (e.target.$parent.cardStatus === "resolved") {
                console.log("1");
                return;
            }
            /**當點擊數為1時 */
            if (clicks == 1) {
                /**點擊第一張牌，會進入"cardFace" */
                e.target.$parent.cardStatus = "cardFace";
                e.target.$parent.SetData();
                /**把第一次翻的牌賦值 */
                firstObj = e.target;
                firstClickIndex = e.target.$parent.cardKey;
                firstClickName = e.target.$parent.cardValue;
                console.log("\u9EDE\u64CA\u7B2C\u4E00\u5F35\u70BA:" + e.target.$parent.cardValue + "\u5361");
                clicks++;
                console.log("2");
            }
            else if (clicks == 2) {
                /**點擊第二張牌，會進入"cardFace" */
                e.target.$parent.cardStatus = "cardFace";
                e.target.$parent.SetData();
                /**把第二次翻的牌賦值 */
                secondObj = e.target;
                secondClickIndex = e.target.$parent.cardKey;
                secondClickName = e.target.$parent.cardValue;
                console.log("\u9EDE\u64CA\u7B2C\u4E8C\u5F35\u70BA:" + e.target.$parent.cardValue + "\u5361");
                /**判斷第一張和第二張是否一樣 */
                /**配對成功，呈現"resolved" */
                if (firstClickName == secondClickName && firstClickIndex != secondClickIndex) {
                    firstObj.$parent.cardStatus = "resolved";
                    firstObj.$parent.SetData();
                    secondObj.$parent.cardStatus = "resolved";
                    secondObj.$parent.SetData();
                    /**翻兩張後歸零 */
                    clicks = 1;
                    console.log("3");
                    return;
                }
                /**去除連點自己bug */
                if (firstClickName == secondClickName && firstClickIndex == secondClickIndex) {
                    console.log("4");
                    return;
                }
                /**配對失敗" */
                if (firstClickName != secondClickName && firstClickIndex != secondClickIndex) {
                    _this.reset = new egret.Timer(1000, 1);
                    _this.reset.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                        secondObj.$parent.cardStatus = "cardBack";
                        secondObj.$parent.SetData();
                        firstObj.$parent.cardStatus = "cardBack";
                        firstObj.$parent.SetData();
                        clicks++;
                    }, _this);
                    _this.reset.start();
                    console.log("5");
                }
                /**翻兩張後歸零 */
                clicks = 0;
            }
        }, this);
    };
    return Scenes;
}(egret.DisplayObjectContainer));
__reflect(Scenes.prototype, "Scenes");
//# sourceMappingURL=Scenes.js.map