class Scenes extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    private reset: egret.Timer;
    private delay: egret.Timer;
    private init() {
        /**宣告圖片資源 */
        let animals: Array<string> = ['seaLion', 'cow', 'dog', 'elephant', 'lion', 'monkey', 'penguin', 'pig', 'squirrel', 'zebra'];

        /** 變成對子 */
        for (let i = 0; i < animals.length / 2; i++) {
            animals.push(animals[i]);
        }

        /** 打亂順序 */
        animals.sort(function () {
            for (let i = 0; i < animals.length / 2; i++) {
                return (0.5 - Math.random());
            }
        });
        /**宣告卡片群組陣列 */
        let cardGroup: Array<Card> = [];

        /**建立卡牌 */
        animals.forEach((animalsName, i) => {
            let cards = new Card();
            cards.cardKey = i;
            cards.cardValue = animalsName;
            cards.cardStatus = "cardBack";
            cards.SetData();
            this.addChild(cards);
            cards.touchEnabled = true;
            cardGroup.push(cards);

            /**把卡牌排列好位置 */
            if (i === 4 || i / 4 > 1 && i < 8) {
                cards.y += cards.height;
                cards.x += i % 4 * cards.width;
            } else if (i === 8 || i / 8 > 1 && i < 12) {
                cards.y += cards.height * 2;
                cards.x += i % 8 * cards.width;
            } else if (i === 12 || i / 12 > 1 && i < 16) {
                cards.y += cards.height * 3;
                cards.x += i % 12 * cards.width;
            } else if (i === 16 || i / 16 > 1 && i < 20) {
                cards.y += cards.height * 4;
                cards.x += i % 16 * cards.width;
            }
            else {
                cards.x += i * cards.width;
            }
        })



        /**點擊數 */
        let clicks: number = 1;

        /**第一次點擊物件 */
        let firstObj
        /**第二次點擊物件 */
        let secondObj

        /**第一次點擊變數 */
        let firstClickName
        /**第二次點擊變數 */
        let secondClickName

        /**第一次點擊的HashCode */
        let firstClickIndex
        /**第二次點擊的HashCode */
        let secondClickIndex

        this.addEventListener(egret.TouchEvent.TOUCH_TAP,
            e => {
                console.log("點擊數:" + clicks);

                /**當點擊到resolved時 */
                if (e.target.$parent.cardStatus === "resolved") {
                    console.log("1")
                    return;
                }

                /**當點擊數為1時 */
                if (clicks == 1) {
                    /**點擊第一張牌，會進入"cardFace" */
                    e.target.$parent.cardStatus = "cardFace"
                    e.target.$parent.SetData();

                    /**把第一次翻的牌賦值 */
                    firstObj = e.target;
                    firstClickIndex = e.target.$parent.cardKey;
                    firstClickName = e.target.$parent.cardValue;

                    console.log(`點擊第一張為:${e.target.$parent.cardValue}卡`);
                    clicks++;
                    console.log("2")
                }

                /**點擊第二張牌，會進入"cardFace" */
                else if (clicks == 2) {
                    /**點擊第二張牌，會進入"cardFace" */
                    e.target.$parent.cardStatus = "cardFace"
                    e.target.$parent.SetData();

                    /**把第二次翻的牌賦值 */
                    secondObj = e.target;
                    secondClickIndex = e.target.$parent.cardKey;
                    secondClickName = e.target.$parent.cardValue;

                    console.log(`點擊第二張為:${e.target.$parent.cardValue}卡`);

                    /**判斷第一張和第二張是否一樣 */

                    /**配對成功，呈現"resolved" */
                    if (firstClickName == secondClickName && firstClickIndex != secondClickIndex) {
                        firstObj.$parent.cardStatus = "resolved"
                        firstObj.$parent.SetData();
                        secondObj.$parent.cardStatus = "resolved"
                        secondObj.$parent.SetData();
                        /**翻兩張後歸零 */
                        clicks = 1;
                        console.log("3")
                        return; 
                    }

                    /**去除連點自己bug */
                    if (firstClickName == secondClickName && firstClickIndex == secondClickIndex) {
                        console.log("4")
                        return;   
                    }

                    /**配對失敗" */
                    if (firstClickName != secondClickName && firstClickIndex != secondClickIndex) {
                        this.reset = new egret.Timer(1000, 1);
                        this.reset.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
                            secondObj.$parent.cardStatus = "cardBack"
                            secondObj.$parent.SetData();
                            firstObj.$parent.cardStatus = "cardBack"
                            firstObj.$parent.SetData();
                            clicks++;
                        }, this);
                        this.reset.start();
                        console.log("5")
                    }
                    /**翻兩張後歸零 */
                    clicks = 0;
                }
            }
            , this)
    }
}