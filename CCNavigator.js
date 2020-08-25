let wx = window["wx"];
let wxsdk = window["wxsdk"];

module.exports = (function () {
    /**
     * cocos导量
     */
    function CCNavigator() {
        this.hacker = window.hacker || require("./Hacker.js");
        this.friendPlayLoadFunctions = [];
        this.coupletLoadFunctions = [];
        this.carouselLoadFunctions = [];
        this.homeRankLoadFunctions = [];
    }
    /**加载所有好友在玩图标信息 */
    CCNavigator.prototype.loadAllFriendPlays = function () {
        for (let loadFunction of this.friendPlayLoadFunctions) {
            loadFunction();
        }
    };
    /**加载所有对联图标信息 */
    CCNavigator.prototype.loadAllCouplets = function () {
        for (let loadFunction of this.coupletLoadFunctions) {
            loadFunction();
        }
    };
    /**加载所有走马灯图标信息 */
    CCNavigator.prototype.loadAllCarousels = function () {
        for (let loadFunction of this.carouselLoadFunctions) {
            loadFunction();
        }
    };
    /**
     * 图标点击
     * @param iconInfo 图标信息
     * @param pos 图标位置
     */
    CCNavigator.prototype.onIconClick = function (iconInfo, pos) {
        wxsdk.tapGameAd({ pos: pos, ad: iconInfo, redirect: true });
    };

    CCNavigator.prototype.setSpriteFrame = function (url, sprite, callback) {
        cc.loader.load(url, (err, tex) => {
            if (!err) {
                let spriteFrame = new cc.SpriteFrame(tex);
                sprite.spriteFrame = spriteFrame;
                callback && callback(sprite, spriteFrame);
            }
        });
    };

        /**
     * 给精灵组件设置图片
     * @param url 图片路径
     * @param sprite 精灵组件
     * @param callback 回调
     */
    let setSpriteFrame  = function (url, sprite, callback) {
        cc.loader.load(url, (err, tex) => {
            if (!err) {
                let spriteFrame = new cc.SpriteFrame(tex);
                sprite.spriteFrame = spriteFrame;
                callback && callback(sprite, spriteFrame);
            }
        });
    };

    /**
     * 打乱列表
     * @param array 列表
     * @param size 返回列表长度，默认为原长度
     */
    CCNavigator.prototype.shuffleArray = function (array, size) {
        let index = -1, length = array.length, lastIndex = length - 1, value;
        size = size === undefined ? length : size;
        while (++index < size) {
            let rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
            value = array[rand];
            array[rand] = array[index];
            array[index] = value;
        }
        array.length = size;
        return array;
    };


    /**
   * 首页列表页
   * @param parentNode 父节点
   * @param pos 位置
   */
    CCNavigator.prototype.createHomeList = function (parentNode, pos = "default",comp,status = "default") {
        var gameAdList = {};
        /**排名精灵列表 */
        let homeRankIconSprites = [];
        /**排名精灵列表 */
        let homeRankIconTitleS = [];
        /**排名图标信息 */
        let homeRankIconInfos = [];

        /**滚动列表节点列表 */
        let scrollIconSprites = [];
        let scrollIconLabels = [];
        let scrollIconLabels2 = [];
        /**抽屉列表信息列表 */
        let scrollIconInfos = [];


        /**好友在玩图标精灵列表 */
        let homeListIconSprites = [];
        /**好友在玩图标信息列表 */
        let homeListIconInfos = [];

        var _this = this;
        var isScrollingToBottom = false;
        

        //标题
        let home_title = new cc.Node("title");
        // home_title.y = 200;
        home_title.color = cc.Color.RED;
        let titleLabel = home_title.addComponent(cc.Label);
        titleLabel.string = "热门游戏";
        titleLabel.fontSize = 40;
        titleLabel.lineHeight = 45;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        var home_titleWidget = home_title.addComponent(cc.Widget);
        home_titleWidget.isAlignTop = true;
        home_titleWidget.top = 0;

        //根节点
        let homeRank = new cc.Node("homeRank");
        homeRank.width = 678;
        homeRank.height = 380;
        var homeRankWidget = homeRank.addComponent(cc.Widget);
        homeRankWidget.isAlignTop = true;
        homeRankWidget.top = 50;
        //homeRank.x = 0;
        //homeRank.y = 400;
        homeRank.addComponent(cc.BlockInputEvents);


        //第一名
        let rankPanel1 = new cc.Node("rankPanel1");
        rankPanel1.width = 223;
        rankPanel1.height = 335;
        var rankWidget = rankPanel1.addComponent(cc.Widget);
        rankWidget.isAlignTop = true;
        rankWidget.top = 50;
        homeRank.addChild(rankPanel1);
    


        //第二名
        let rankPanel2 = new cc.Node("rankPanel2");
        rankPanel2.width = 193;
        rankPanel2.height = 280;
        rankPanel2.x = 0 - (rankPanel2.width / 2 + rankPanel1.width / 2 + 30 / 2);
        rankWidget = rankPanel2.addComponent(cc.Widget);
        rankWidget.isAlignTop = true;
        rankWidget.top = 120;
        homeRank.addChild(rankPanel2);


        //第三名
        let rankPanel3 = new cc.Node("rankPanel3");
        rankPanel3.width = 193;
        rankPanel3.height = 280;
        rankPanel3.x = (rankPanel3.width / 2 + rankPanel1.width / 2 + 30 / 2);
        //rankPanel3.y = -50;
        rankWidget = rankPanel3.addComponent(cc.Widget);
        rankWidget.isAlignTop = true;
        rankWidget.top = 120;
        homeRank.addChild(rankPanel3);


        homeRank.addChild(home_title);

        //添加图标、注册点击事件
        for (let i = 1; i < 4; i++) {
            var pannel = homeRank.getChildByName("rankPanel" + (i));
            let icon = new cc.Node("icon_rank" + i);
            icon.width = 167;
            icon.height = 167;
            icon.y = (i == 1 ? 17 : 45);
            pannel.on(cc.Node.EventType.TOUCH_END, () => {
                let iconInfo = homeRankIconInfos[i - 1];
                console.error(iconInfo);
                iconInfo && this.onIconClick(iconInfo, pos);
            });
            let iconSprite = icon.addComponent(cc.Sprite);
            iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            iconSprite.trim = false;
            pannel.addChild(icon);
            homeRankIconSprites.push(iconSprite);

            let iconBg = new cc.Node("iconBg");
            let rankPanel1Sprite = iconBg.addComponent(cc.Sprite);
            setSpriteFrame("localRes/no"+( i )+".png", rankPanel1Sprite);
            pannel.addChild(iconBg);

            let icon_title = new cc.Node("title");
            icon_title.y = (i == 1 ? -92 : -65);
            icon_title.color = cc.Color.WHITE;
            let icon_titleLabel = icon_title.addComponent(cc.Label);
            icon_titleLabel.string = "";
            icon_titleLabel.fontSize = 25;
            icon_titleLabel.lineHeight = 27;
            icon_titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            icon_titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
            homeRankIconTitleS.push(icon_titleLabel);

            pannel.addChild(icon_title);
        }


        //滚动列表

        //滚动列表内容
        let content = new cc.Node("content");
        content.y = 0;
        content.width = 720;
        content.height = 650;
        content.anchorY = 1;
        let contentLayout = content.addComponent(cc.Layout);
        contentLayout.type = cc.Layout.Type.GRID;
        contentLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        //滚动列表视图
        let view = new cc.Node("view");
        view.width = 720;
        //view.height = 650;
        var viewWidget = view.addComponent(cc.Widget);
        viewWidget.isAlignTop = true;
        viewWidget.top = 20;
        viewWidget.isAlignBottom = true;
        viewWidget.bottom = 0;
        // view.y = 0;
        // view.x = 0;
        view.addChild(content);
        view.addComponent(cc.Mask);

        //滚动列表组件
        let list = new cc.Node("list");
        list.width = 720;
        //list.height = 750;
        // list.y = -120;
        // list.x = 0;
        var scrollViewWidget = list.addComponent(cc.Widget);
        scrollViewWidget.isAlignTop = true;
        scrollViewWidget.top = 440;
        scrollViewWidget.isAlignBottom = true;
        scrollViewWidget.bottom = 100;
        let scrollView = list.addComponent(cc.ScrollView);
        scrollView.content = content;
        scrollView.horizontal = false;
        scrollView.vertical = true;
        list.addChild(view);

        //节点池
        let nodePool = new cc.NodePool();

        //从节点池获取或者创建抽屉滚动列表的图标
        const getItem = (iconInfo) => {
            let item = nodePool.get();
            if (!item) {
                item = new cc.Node("item");
                //item.y = -100;
                item.width = 700;
                item.height = 200;

                let icon = new cc.Node("icon");
                icon.x = -240;
                icon.y = 0;
                icon.width = 158;
                icon.height = 158;
                let iconSprite = icon.addComponent(cc.Sprite);
                iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                iconSprite.trim = false;
                item.addChild(icon);

                let title = new cc.Node("title");
                title.color = cc.Color.BLACK;
                title.anchorX = 0;
                title.x = -130;
                title.y = 35;
                //title.width = 150;
                title.height = 51;

                item.addChild(title);
                let titleLabel = title.addComponent(cc.Label);
                titleLabel.fontSize = 30;
                titleLabel.lineHeight = 32;
                titleLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

                let title2 = new cc.Node("title2");
                title2.color = cc.Color.GRAY;
                title2.x = -60;
                title2.y = -25;

                title2.width = 100;
                title2.height = 51;

                item.addChild(title2);
                let title2Label = title2.addComponent(cc.Label);
                title2Label.fontSize = 22;
                title2Label.lineHeight = 24;
                title2Label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                title2Label.verticalAlign = cc.Label.VerticalAlign.CENTER;



                //立即玩
                let to_play_btn = new cc.Node("to_play_btn");
                to_play_btn.x = 216;
                let to_play_btnSprite = to_play_btn.addComponent(cc.Sprite);
                setSpriteFrame("localRes/to_play_btn.png", to_play_btnSprite);
                to_play_btn.on(cc.Node.EventType.TOUCH_END, (event) => {
                    let node = event.getCurrentTarget();
                    if (!node) return;
                    iconInfo && this.onIconClick(iconInfo, pos);
                    startAutoScroll();
                });

                let to_playButton = to_play_btn.addComponent(cc.Button);
                to_playButton.interactable = true;
                to_playButton.transition = 3;

                item.addChild(to_play_btn);

                item.on(cc.Node.EventType.TOUCH_END, (event) => {
                    let node = event.getCurrentTarget();
                    if (!node) return;
                    iconInfo && this.onIconClick(iconInfo, pos);
                    startAutoScroll();
                });

                //分割线
                let splice = new cc.Node("splice");
                splice.y = -95;
                let spliceSprite = splice.addComponent(cc.Sprite);
                setSpriteFrame("localRes/splice.png", spliceSprite);
                item.addChild(splice);

            }
            item.x = 0;
            item.y = 0;
            return item;
        }


        //开始游戏
        let start_game_btn = new cc.Node("start_game_btn");
        //start_game_btn.x = 216;
        //start_game_btn.width = 108;
        //start_game_btn.height = 96;
        let start_game_btnSprite = start_game_btn.addComponent(cc.Sprite);
        let start_game_Button = start_game_btn.addComponent(cc.Button);

        setSpriteFrame("localRes/start_game_btn.png", start_game_btnSprite);
        var start_game_widget = start_game_btn.addComponent(cc.Widget);
        start_game_widget.isAlignBottom = true;
        start_game_widget.bottom = 103 / 2 + 30;


        start_game_Button.interactable = true;
        start_game_Button.transition = 3;
        start_game_btn.on(cc.Node.EventType.TOUCH_END, (event) => {
            if(this.hacker.config.unplay){
                parentNode.active = false;
                if(this.hacker.config.allowMistouch && "ove" == this.hacker.status ){
                    //宝箱
                    this.hacker.openTrick();
                }
            }else{
                //自动跳转游戏
                console.log("列表1自动跳转游戏");
                if( gameAdList != undefined && gameAdList.length >0 ){
                    var n = Math.floor(Math.random() * gameAdList.length + 1)-1;
                    var gameAd = gameAdList[n];
                    _this.onIconClick(gameAd, pos);
                }

            }

        });



        /**
        * 刷新排名图标
        */
        const refreshhomeRankIcons = () => {
            for (let i = 0; i < homeRankIconSprites.length; i++) {
                let iconInfo = homeRankIconInfos[i];
                let sprite = homeRankIconSprites[i];
                homeRankIconTitleS[i].string = homeRankIconInfos[i].title;
                if (iconInfo) {
                    sprite.node.active = true;
                    setSpriteFrame(iconInfo.icon, sprite);
                } else {
                    sprite.node.active = false;
                }
            }
        }


        //回收图标
        const recycleItem = (node) => {
            node.removeFromParent();
            nodePool.put(node);
        }

        //刷新滚动列表
        const refreshscrollIcons = () => {
            let len = content.childrenCount;
            if (!len || len !== scrollIconInfos.length) {
                for (let child of content.children) {
                    recycleItem(child);
                }
                scrollIconSprites = [];
                scrollIconLabels = [];
                scrollIconLabels2 = [];
                for (let i = 0; i < scrollIconInfos.length; i++) {
                    let item = getItem(scrollIconInfos[i]);
                    scrollIconSprites.push(item.getChildByName("icon").getComponent(cc.Sprite));
                    scrollIconLabels.push(item.getChildByName("title").getComponent(cc.Label));
                    scrollIconLabels2.push(item.getChildByName("title2").getComponent(cc.Label));
                    content.addChild(item);
                }
            }
            for (let i = 0; i < content.childrenCount; i++) {
                let iconInfo = scrollIconInfos[i];
                let sprite = scrollIconSprites[i];
                let label = scrollIconLabels[i];
                let label2 = scrollIconLabels2[i];
                label.string = scrollIconInfos[i].title;
                label2.string = Math.floor(Math.random() * 10) +"位好友正在玩";
                setSpriteFrame(iconInfo.icon, sprite);
            }
        }

        /**
         * 刷新好友在玩图标
         */
        const refreshhomeListIcons = () => {
            for (let i = 0; i < homeListIconSprites.length; i++) {
                let iconInfo = homeListIconInfos[i];
                let sprite = homeListIconSprites[i];
                if (iconInfo) {
                    sprite.node.active = true;
                    setSpriteFrame(iconInfo.icon, sprite);
                } else {
                    sprite.node.active = false;
                }
            }
        }


        var isInited = false;
        const bindEvents = () => {
            scrollView.node.on("scroll-ended", () => {
                startAutoScroll();
            });
        }

        const startAutoScroll = () => {
            let pageSize = 4,speed = 4;
            if (gameAdList.length <= pageSize) return;
            let percent = Math.abs(scrollView.getScrollOffset().y / scrollView.getMaxScrollOffset().y) || 0;
            if (percent >= 0.999) {
                scrollView.scrollToTop(gameAdList.length * speed / pageSize, false);
                isScrollingToBottom = false;
            } else if (percent <= 0.01) {
                scrollView.scrollToBottom(gameAdList.length * speed / pageSize, false);
                isScrollingToBottom = true;
            } else if (isScrollingToBottom) {
                scrollView.scrollToBottom(gameAdList.length * speed / pageSize * (1 - percent), false);
            } else {
                scrollView.scrollToTop(gameAdList.length * speed / pageSize * (percent), false);
            }
        }

        const doScroll = () => {
            setTimeout(function () {
                isScrollingToBottom = true;
                startAutoScroll();
            }, 1);

        };

        /**
         * 加载好友在玩图标信息
         */
        const loadhomeListIconInfos = () => {
            isInited = true;
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    homeListIconInfos = res.data || [];
                    homeRankIconInfos = res.data || [];
                    scrollIconInfos = res.data || [];
                    refreshhomeRankIcons();
                    refreshhomeListIcons();

                    refreshscrollIcons();
                    gameAdList = res.data || [];
                    doScroll();
                    bindEvents();
                },
            });
        };
        loadhomeListIconInfos();
        this.homeRankLoadFunctions.push(loadhomeListIconInfos);

        //parentNode.addChild(home_title);

        parentNode.addChild(homeRank);

        parentNode.addChild(list);

        parentNode.addChild(start_game_btn);



        console.log(parentNode);

        return homeRank;
    };

    /**
     * 创建好友在玩导量
     * @param parentNode 父节点
     * @param pos 位置
     */
    CCNavigator.prototype.createFriendPaly = function (parentNode, pos = "default") {
        /**好友在玩图标精灵列表 */
        let friendPlayIconSprites = [];
        /**好友在玩图标信息列表 */
        let friendPlayIconInfos = [];
        //根节点
        let friendPlay = new cc.Node("friendPlay");
        friendPlay.width = 678;
        friendPlay.height = 270;
        friendPlay.x = 0;
        friendPlay.y = 0;
        friendPlay.addComponent(cc.BlockInputEvents);

        //面板
        let panel = new cc.Node("panel");
        panel.width = 678;
        panel.height = 270;
        let panelSprite = panel.addComponent(cc.Sprite);
        panelSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        panelSprite.type = cc.Sprite.Type.SLICED;
        setSpriteFrame("localRes/friendPlayPanel.png", panelSprite, (sprite, spriteFrame) => {
            spriteFrame.insetLeft = 36;
            spriteFrame.insetRight = 36;
            spriteFrame.insetTop = 26;
            spriteFrame.insetBottom = 36;
        });
        friendPlay.addChild(panel);

        //标题
        let title = new cc.Node("title");
        let titleSprite = title.addComponent(cc.Sprite);
        setSpriteFrame("localRes/friendPlayTitle.png", titleSprite);
        title.x = -280;
        title.y = 5;
        friendPlay.addChild(title);

        //添加图标、注册点击事件
        for (let i = 0; i < 10; i++) {
            let icon = new cc.Node("icon" + i);
            icon.width = 95;
            icon.height = 95;
            icon.y = i < 5 ? 58 : -48;
            icon.x = (i % 5) * 110 - 195;
            icon.on(cc.Node.EventType.TOUCH_END, () => {
                let iconInfo = friendPlayIconInfos[i];
                iconInfo && this.onIconClick(iconInfo, pos);
            });
            let iconSprite = icon.addComponent(cc.Sprite);
            iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            iconSprite.trim = false;
            friendPlay.addChild(icon);
            friendPlayIconSprites.push(iconSprite);
        }

        /**
         * 刷新好友在玩图标
         */
        const refreshFriendPlayIcons = () => {
            for (let i = 0; i < friendPlayIconSprites.length; i++) {
                let iconInfo = friendPlayIconInfos[i];
                let sprite = friendPlayIconSprites[i];
                if (iconInfo) {
                    sprite.node.active = true;
                    setSpriteFrame(iconInfo.icon, sprite);
                }
                else {
                    sprite.node.active = false;
                }
            }
        }
        /**
         * 加载好友在玩图标信息
         */
        const loadFriendPlayIconInfos = () => {
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    friendPlayIconInfos = res.data || [];
                    refreshFriendPlayIcons();
                },
            });
        };
        loadFriendPlayIconInfos();
        this.friendPlayLoadFunctions.push(loadFriendPlayIconInfos);

        parentNode.addChild(friendPlay);
        return friendPlay;
    };
    /**
     * 创建对联导量
     * @param parentNode 父节点
     * @param pos 位置
     */
    CCNavigator.prototype.createCouplet = function (parentNode, pos = "default") {

        /**对联图标信息列表 */
        let coupletIconInfos = [];
        /**左对联图标信息列表 */
        let leftIconInfos = [];
        /**左对联图标精灵 */
        let leftIconSprites = [];
        let leftIconTitleLabels = [];
        /**右对联图标信息列表 */
        let rightIconInfos = [];
        let rightIconTitleLabels = [];
        /**右对联图标精灵 */
        let rightIconSprites = [];

        //根节点
        let couplet = new cc.Node("couplet");
        couplet.width = 750;
        couplet.height = 700;

        //左对联
        let leftList = new cc.Node("leftList");
        leftList.width = 140;
        leftList.height = 700;
        leftList.x = -couplet.width / 2 + leftList.width / 2;
        let leftListLayout = leftList.addComponent(cc.Layout);
        leftListLayout.type = cc.Layout.Type.VERTICAL;
        leftListLayout.resizeMode = cc.Layout.ResizeMode.NONE;
        couplet.addChild(leftList);

        //右对联
        let rightList = new cc.Node("leftList");
        rightList.width = 140;
        rightList.height = 700;
        rightList.x = couplet.width / 2 - rightList.width / 2;
        let rightListLayout = rightList.addComponent(cc.Layout);
        rightListLayout.type = cc.Layout.Type.VERTICAL;
        rightListLayout.resizeMode = cc.Layout.ResizeMode.NONE;
        couplet.addChild(rightList);

        //节点池
        let nodePool = new cc.NodePool();

        //从节点池或创建图标
        const getItem = () => {
            let item = nodePool.get();
            if (!item) {
                item = new cc.Node("item");
                item.width = 140;
                item.height = 140;

                let icon = new cc.Node("icon");
                icon.width = 100;
                icon.height = 100;
                icon.y = 10;
                let iconSprite = icon.addComponent(cc.Sprite);
                iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                iconSprite.trim = false;
                item.addChild(icon);

                let title = new cc.Node("title");
                title.y = -55;
                item.addChild(title);
                let titleLabel = title.addComponent(cc.Label);
                titleLabel.fontSize = 18;
                titleLabel.lineHeight = 20;
                titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

                item.addComponent(cc.Button);
                item.on(cc.Node.EventType.TOUCH_END, (event) => {
                    let node = event.getCurrentTarget();
                    if (!node) return;
                    let iconInfo;
                    if (node.parent === leftList) {
                        iconInfo = leftIconInfos[node.getSiblingIndex()];
                    } else {
                        iconInfo = rightIconInfos[node.getSiblingIndex()];
                    }
                    iconInfo && this.onIconClick(iconInfo, pos);
                });

                item.rotation = 0;
                item.runAction(
                    cc.repeatForever(
                        cc.sequence(
                            cc.rotateTo(0.25, 10),
                            cc.rotateTo(0.5, -10),
                            cc.rotateTo(0.5, 10),
                            cc.rotateTo(0.5, -10),
                            cc.rotateTo(0.5, 10),
                            cc.rotateTo(0.5, -10),
                            cc.rotateTo(0.25, 0),
                            cc.delayTime(3),
                        )
                    )
                );
            }
            item.x = 0;
            item.y = 0;
            return item;
        }

        //回收图标
        const recycleItem = (node) => {
            node.removeFromParent();
            nodePool.put(node);
        }

        //刷新抽屉图标
        const refreshCoupletIcons = () => {
            let len = leftList.childrenCount;
            if (!len || len !== leftIconInfos.length) {
                for (let child of leftList.children) {
                    recycleItem(child);
                }
                leftIconSprites = [];
                leftIconTitleLabels = [];
                for (let i = 0; i < leftIconInfos.length; i++) {
                    let item = getItem();
                    leftIconSprites.push(item.getChildByName("icon").getComponent(cc.Sprite));
                    leftIconTitleLabels.push(item.getChildByName("title").getComponent(cc.Label));
                    leftList.addChild(item);
                }
            }
            for (let i = 0; i < leftList.childrenCount; i++) {
                let iconInfo = leftIconInfos[i];
                let sprite = leftIconSprites[i];
                let label = leftIconTitleLabels[i];
                label.string = iconInfo.title;
                setSpriteFrame(iconInfo.icon, sprite);
            }

            len = rightList.childrenCount;
            if (!len || len !== rightIconInfos.length) {
                for (let child of rightList.children) {
                    recycleItem(child);
                }
                rightIconSprites = [];
                rightIconTitleLabels = [];
                for (let i = 0; i < rightIconInfos.length; i++) {
                    let item = getItem();
                    rightIconSprites.push(item.getChildByName("icon").getComponent(cc.Sprite));
                    rightIconTitleLabels.push(item.getChildByName("title").getComponent(cc.Label));
                    rightList.addChild(item);
                }
            }
            for (let i = 0; i < rightList.childrenCount; i++) {
                let iconInfo = rightIconInfos[i];
                let sprite = rightIconSprites[i];
                let label = rightIconTitleLabels[i];
                label.string = iconInfo.title;
                setSpriteFrame(iconInfo.icon, sprite);
            }
        }

        //加载对联图标信息
        const loadCoupletIconInfos = () => {
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    let list = res.data || [];
                    coupletIconInfos = list;
                    let half = Math.ceil(coupletIconInfos.length / 2);
                    leftIconInfos = coupletIconInfos.slice(0, half);
                    rightIconInfos = coupletIconInfos.slice(half);
                    refreshCoupletIcons();
                },
            });

            // wx.tmSDK.checkFlowIsOpen({
            //     positionId: pos
            // }).then((res) => {
            //     if (res.isOpen) {
            //         wx.tmSDK.getFlowConfig({
            //             positionId: pos
            //         }).then((config) => {
            //             coupletIconInfos = config.creatives;
            //             let half = Math.ceil(coupletIconInfos.length / 2);
            //             leftIconInfos = coupletIconInfos.slice(0, half);
            //             rightIconInfos = coupletIconInfos.slice(half);
            //             refreshCoupletIcons();
            //         });
            //     }
            // });
        };
        loadCoupletIconInfos();
        this.coupletLoadFunctions.push(loadCoupletIconInfos);

        parentNode.addChild(couplet);
        return couplet;
    };

    /**
     * 创建抽屉导量
     * @param drawerParentNode 抽屉父节点
     * @param openButtonParentNode 抽屉打开按钮父节点
     * @param pos 位置
     */
    CCNavigator.prototype.createDrawer = function (drawerParentNode, openButtonParentNode, pos = "default", onOpen, onClose) {

        /**抽屉图标节点列表 */
        let drawerIconSprites = [];
        let drawerIconLabels = [];
        /**抽屉图标信息列表 */
        let drawerIconInfos = [];

        //根节点
        let drawer = new cc.Node("drawer");

        //背景
        let background = new cc.Node("background");
        background.width = 750;
        background.height = 2000;
        let backgroundSprite = background.addComponent(cc.Sprite);
        backgroundSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        backgroundSprite.type = cc.Sprite.Type.SLICED;
        setSpriteFrame("localRes/blank.png", backgroundSprite, (sprite, spriteFrame) => {
            spriteFrame.insetLeft = 2;
            spriteFrame.insetRight = 2;
            spriteFrame.insetTop = 2;
            spriteFrame.insetBottom = 2;
        });
        background.active = false;
        background.addComponent(cc.Button);
        drawer.addChild(background);

        //面板
        let panel = new cc.Node("panel");
        panel.width = 448;
        panel.height = 616;
        let closeX = panel.x = -background.width / 2 - panel.width / 2;
        let openX = closeX + panel.width;
        panel.y = 0;
        let panelSprite = panel.addComponent(cc.Sprite);
        panelSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        panelSprite.type = cc.Sprite.Type.SLICED;
        setSpriteFrame("localRes/drawerPanel.png", panelSprite, (sprite, spriteFrame) => {
            spriteFrame.insetLeft = 10;
            spriteFrame.insetRight = 26;
            spriteFrame.insetTop = 26;
            spriteFrame.insetBottom = 26;
        });
        drawer.addChild(panel);

        //标题
        let title = new cc.Node("title");
        title.width = 146;
        title.height = 34;
        title.y = 270;
        let drawerTitleSprite = title.addComponent(cc.Sprite);
        setSpriteFrame("localRes/drawerTitle.png", drawerTitleSprite);
        panel.addChild(title);

        //滚动列表内容
        let content = new cc.Node("content");
        content.y = 270;
        content.width = 420;
        content.height = 0;
        content.anchorY = 1;
        let contentLayout = content.addComponent(cc.Layout);
        contentLayout.type = cc.Layout.Type.GRID;
        contentLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        //滚动列表视图
        let view = new cc.Node("view");
        view.width = 420;
        view.height = 540;
        view.addChild(content);
        view.addComponent(cc.Mask);

        //滚动列表组件
        let list = new cc.Node("list");
        list.width = 420;
        list.height = 540;
        list.y = -25;
        let scrollView = list.addComponent(cc.ScrollView);
        scrollView.content = content;
        scrollView.horizontal = false;
        scrollView.vertical = true;
        list.addChild(view);
        panel.addChild(list);

        //关闭按钮
        let closeButton = new cc.Node("closeButton");
        closeButton.width = 108;
        closeButton.height = 96;
        let closeButtonSprite = closeButton.addComponent(cc.Sprite);
        setSpriteFrame("localRes/drawerButton.png", closeButtonSprite);
        closeButton.on(cc.Node.EventType.TOUCH_END, () => {
            closeDrawer();
        });
        panel.addChild(closeButton);
        closeButton.x = panel.width / 2 + closeButton.width / 2 - 2;
        closeButton.active = false;

        //打开按钮
        let openButton = new cc.Node("openButton");
        openButton.width = 108;
        openButton.height = 96;
        let openButtonSprite = openButton.addComponent(cc.Sprite);
        setSpriteFrame("localRes/drawerButton.png", openButtonSprite);
        openButton.on(cc.Node.EventType.TOUCH_END, () => {
            openDrawer();
        });
        openButtonParentNode.addChild(openButton);

        //节点池
        let nodePool = new cc.NodePool();
        //关闭抽屉
        const closeDrawer = () => {
            if (onClose && onClose() === false) {
                return;
            }
            panel.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(closeX, panel.y)), cc.callFunc(() => {
                background.active = false;
                closeButton.active = false;
                openButton.active = true;
            })));
        }
        //打开抽屉
        const openDrawer = () => {
            if (onOpen && onOpen() === false) {
                return;
            }
            background.active = true;
            closeButton.active = true;
            openButton.active = false;
            loadDrawerIconInfos();
            panel.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(openX, panel.y)), cc.callFunc(() => {

            })));
        }
        //从节点池获取或者创建抽屉滚动列表的图标
        const getItem = () => {
            let item = nodePool.get();
            if (!item) {
                item = new cc.Node("item");
                item.width = 140;
                item.height = 140;

                let icon = new cc.Node("icon");
                icon.y = 10;
                icon.width = 110;
                icon.height = 110;
                let iconSprite = icon.addComponent(cc.Sprite);
                iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                iconSprite.trim = false;
                item.addChild(icon);

                let title = new cc.Node("title");
                title.color = cc.Color.BLACK;
                title.y = -60;
                item.addChild(title);
                let titleLabel = title.addComponent(cc.Label);
                titleLabel.fontSize = 18;
                titleLabel.lineHeight = 20;
                titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

                item.on(cc.Node.EventType.TOUCH_END, (event) => {
                    let node = event.getCurrentTarget();
                    if (!node) return;
                    let iconInfo = drawerIconInfos[node.getSiblingIndex()];
                    iconInfo && this.onIconClick(iconInfo, pos);
                });
            }
            item.x = 0;
            item.y = 0;
            return item;
        }
        //回收图标
        const recycleItem = (node) => {
            node.removeFromParent();
            nodePool.put(node);
        }
        //刷新抽屉图标
        const refreshDrawerIcons = () => {
            let len = content.childrenCount;
            if (!len || len !== drawerIconInfos.length) {
                for (let child of content.children) {
                    recycleItem(child);
                }
                drawerIconSprites = [];
                drawerIconLabels = [];
                for (let i = 0; i < drawerIconInfos.length; i++) {
                    let item = getItem();
                    drawerIconSprites.push(item.getChildByName("icon").getComponent(cc.Sprite));
                    drawerIconLabels.push(item.getChildByName("title").getComponent(cc.Label));
                    content.addChild(item);
                }
            }
            for (let i = 0; i < content.childrenCount; i++) {
                let iconInfo = drawerIconInfos[i];
                let sprite = drawerIconSprites[i];
                let label = drawerIconLabels[i];
                label.string = (!this.hacker.config.hide_all_title && iconInfo.show_config.title) ? iconInfo.show_config.title : "";
                setSpriteFrame(iconInfo.show_config.image, sprite);
            }
        }
        //加载抽屉图标信息
        const loadDrawerIconInfos = () => {
            wx.tmSDK.checkFlowIsOpen({
                positionId: pos
            }).then((res) => {
                if (res.isOpen) {
                    wx.tmSDK.getFlowConfig({
                        positionId: pos
                    }).then((config) => {
                        drawerIconInfos = config.creatives;
                        refreshDrawerIcons();
                    });
                }
            });
        };

        drawerParentNode.addChild(drawer);
        return drawer;
    };

    let tapGameAdCancelToList =function(iconInfo, pos,hacker,uiRoot){
        wxsdk.tapGameAd({
            pos: pos,
            ad: iconInfo,
            redirect: true,
            fail: function(res) {
                if(hacker && !hacker.start_game){
                    hacker.createScrollViewIconPageView(hacker,uiRoot);
                }
            }
        })
    }

    /**
    * 大图标 大小缩放，切换图标导量
    * @param parentNode 父节点
    * @param pos 位置
    */
    CCNavigator.prototype.createBigCarousel = function (parentNodes,property, pos = "default") {

        var _this = this;

        /**走马灯图标信息列表 */
        let carouselIconInfos = [];
        /**当前走马灯图标索引 */
        let carouselIconIndex = 0;
        /**走马灯图标信息列表 */
        let cpoyIconInfos = [];

        let getNextGameAd =function(){
            if( cpoyIconInfos.length > 0 ){
                var iconInfo = cpoyIconInfos.shift()
                return iconInfo;
            }else{
                cpoyIconInfos =  carouselIconInfos.slice();
                var iconInfo = cpoyIconInfos.shift();
                return iconInfo;
            }
        }

        let toCreateParentNodes =function(){
            for (let parentNode of parentNodes) {

                //根节点
               let carousel = new cc.Node("carousel");
               parentNode.addChild(carousel);
               carousel.width = parentNode.width;
               carousel.height = parentNode.height;
               carousel.rotation = -10;
   
               let carouselBg = carousel.addComponent(cc.Sprite);
               carouselBg.sizeMode = cc.Sprite.SizeMode.CUSTOM;
               carouselBg.width = parentNode.width;
               carouselBg.height = parentNode.height;
               property && (_this.setSpriteFrame("localRes/carouselBg.png", carouselBg));
   
               //图标
               let icon = new cc.Node("icon");
               icon.width = carousel.width -10;
               icon.height = carousel.width -10;
               var icon_widget = icon.addComponent(cc.Widget);
               icon_widget.isAlignTop = true;
               icon_widget.top = 4;
               icon.on(cc.Node.EventType.TOUCH_END, () => {
                    let iconInfo = icon.iconInfo;
                    iconInfo && tapGameAdCancelToList(iconInfo, pos,_this.hacker,parentNode.parent.parent.parent);
                });
               let iconSprite = icon.addComponent(cc.Sprite);
               iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
               iconSprite.trim = false;
               carousel.addChild(icon);
               let titleLabel = null;
               if(property){

                   let title = new cc.Node("title");
                   title.y = -(icon.height / 2);
                   title.color = cc.Color.WHITE;
                   carousel.addChild(title);
                   titleLabel = title.addComponent(cc.Label);
                   titleLabel.fontSize = property.fontSize;
                   titleLabel.lineHeight = property.lineHeight;
                   titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                   titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
               }
               refreshCarouselIcons(icon,getNextGameAd(),titleLabel,iconSprite);
               carousel.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(0.5, 10), cc.rotateTo(0.5, -10))));
               carousel.runAction(cc.repeatForever(cc.sequence(cc.delayTime(4.5), cc.scaleTo(0.25, 0), cc.callFunc(() => {
                   refreshCarouselIcons(icon,getNextGameAd(),titleLabel,iconSprite);
  
               }), cc.scaleTo(0.25, 1))));
   

           }
        }
        



        //刷新图标
        const refreshCarouselIcons = (icon,iconInfo,titleLabel,iconSprite) => {
            if (iconInfo) {
                 icon.active = true;
                 icon.iconInfo = iconInfo;
                 titleLabel && (titleLabel.string = iconInfo.title);
                 _this.setSpriteFrame(iconInfo.icon, iconSprite);
             } else {
                 icon.active = false;
             }
        }

        //刷新图标
        // const refreshCarouselIcons = (iconInfo) => {
        //     if (!iconInfo) {
        //          carouselIconIndex = 0;
        //         iconInfo = carouselIconInfos[carouselIconIndex];
        //     }
        //     if (iconInfo) {
        //         icon.active = true;
        //         titleLabel.string = iconInfo.title;
        //         setSpriteFrame(iconInfo.icon, iconSprite);
        //     } else {
        //         icon.active = false;
        //     }
        // }

        //加载走马灯图标信息
        const loadCarouselIconInfos = () => {
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    let list = res.data || [];
                    carouselIconInfos = list;
                    //carouselIconInfos = this.shuffleArray(list);
                    toCreateParentNodes();
                },
            });
        };
        loadCarouselIconInfos();
        //this.carouselLoadFunctions.push(loadCarouselIconInfos);

        //return carousel;
    }

    /**
    * 小图标  大小缩放，切换图标导量
    * @param parentNode 父节点
    * @param pos 位置
    */
    CCNavigator.prototype.createCarousel = function (parentNode, pos = "default") {
        /**走马灯图标信息列表 */
        let carouselIconInfos = [];
        /**当前走马灯图标索引 */
        let carouselIconIndex = 0;
        //根节点
        let carousel = new cc.Node("carousel");
        carousel.width = 100;
        carousel.height = 100;
        carousel.x = parentNode.width / 2;
        carousel.y = -parentNode.height / 2;
        carousel.rotation = -10;
        carousel.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(0.5, 10), cc.rotateTo(0.5, -10))));
        carousel.runAction(cc.repeatForever(cc.sequence(cc.delayTime(4.5), cc.scaleTo(0.25, 0), cc.callFunc(() => {
            carouselIconIndex++;
            if (carouselIconIndex >= carouselIconInfos.length)
                carouselIconIndex = 0;
            refreshCarouselIcons();
        }), cc.scaleTo(0.25, 1))));

        //图标
        let icon = new cc.Node("icon");
        icon.width = 100;
        icon.height = 100;
        icon.on(cc.Node.EventType.TOUCH_END, () => {
            let iconInfo = carouselIconInfos[carouselIconIndex];
            iconInfo && this.onIconClick(iconInfo, pos);
        });
        let iconSprite = icon.addComponent(cc.Sprite);
        iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        iconSprite.trim = false;
        carousel.addChild(icon);

        let title = new cc.Node("title");
        title.y = -65;
        carousel.addChild(title);
        let titleLabel = title.addComponent(cc.Label);
        titleLabel.fontSize = 18;
        titleLabel.lineHeight = 20;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

        //刷新图标
        const refreshCarouselIcons = () => {
            let iconInfo = carouselIconInfos[carouselIconIndex];
            if (!iconInfo) {
                carouselIconIndex = 0;
                iconInfo = carouselIconInfos[carouselIconIndex];
            }
            if (iconInfo) {
                icon.active = true;
                titleLabel.string = iconInfo.title;
                setSpriteFrame(iconInfo.icon, iconSprite);
            } else {
                icon.active = false;
            }
        }

        //加载走马灯图标信息
        const loadCarouselIconInfos = () => {
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    let list = res.data || [];
                    carouselIconInfos = list;
                    //carouselIconInfos = this.shuffleArray(list);
                    scheduleOnceRefreshCarouselIcons();
                    refreshCarouselIcons();
                },
            });
        };
        loadCarouselIconInfos();
        this.carouselLoadFunctions.push(loadCarouselIconInfos);

        parentNode.addChild(carousel);
        return carousel;
    }

    /**
    * 底部横向ICON滚动栏
    * @param parentNode 父节点
    * @param pos 位置
    */
    CCNavigator.prototype.createScrollHorizontalIcons = function (parentNode, pos = "default") {
        var gameAdList = [];
        var content = new cc.Node("scroll_content");
        content.width = 720;
        content.height = 200;

        content.anchorX = 0;
        let contentLayout = content.addComponent(cc.Layout);
        contentLayout.type = cc.Layout.Type.HORIZONTAL;
        contentLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        contentLayout.spacingX = 10;

        var isScrollingToBottom = true;
        var closeButtonNode = null;
        let iconPrefab = new cc.Node("iconPrefab");
        iconPrefab.width = 167;
        iconPrefab.height = 167;
        let iconSprite = iconPrefab.addComponent(cc.Sprite);
        iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        iconSprite.trim = false;

        //滚动列表视图
        let view = new cc.Node("scroll_view");
        view.width = 720;
        view.height = 200;
        view.addChild(content);
        view.addComponent(cc.Mask);

        //滚动列表组件
        let list = new cc.Node("scroll_list");
        list.width = 720;
        list.height = 200;
        let scrollView = list.addComponent(cc.ScrollView);
        scrollView.content = content;
        scrollView.horizontal = true;
        scrollView.vertical = false;
        list.addChild(view);



        var isInited = false;

        var _this = this;


        const bindEvents = () => {
            // closeButtonNode.on(cc.Node.EventType.TOUCH_END, () => {
            //     //不知道功能
            //     //randomTapGameAd(); 
            // });
            scrollView.node.on("scroll-ended", () => {
                startAutoScroll();
            });
            // node.on("icon_tap", (event) => {
            //     event.stopPropagation();
            //     startAutoScroll();
            // });
        }

        //加载走马灯图标信息
        const loadScrollHorizontalIconInfos = () => {
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    gameAdList = res.data || [];
                    doScroll();
                    bindEvents();
                },
            });
        };


        const startAutoScroll = () => {
            let pageSize = 4;
            if (gameAdList.length <= pageSize) return;
            let percent = Math.abs(scrollView.getScrollOffset().x / scrollView.getMaxScrollOffset().x) || 0;
            if (percent === 1) {
                scrollView.scrollToLeft(gameAdList.length * 2 / pageSize, false);
                isScrollingToBottom = false;
            } else if (percent === 0) {
                scrollView.scrollToRight(gameAdList.length * 2 / pageSize, false);
                isScrollingToBottom = true;
            } else if (isScrollingToBottom) {
                scrollView.scrollToRight(gameAdList.length * 2 / pageSize * (1 - percent), false);
            } else {
                scrollView.scrollToLeft(gameAdList.length * 2 / pageSize * (percent), false);
            }
        }

        const init = () => {
            if (!isInited) {
                isInited = true;
                loadScrollHorizontalIconInfos();

            }
        }


        const doScroll = () => {
            gameAdList = gameAdList;
            content.destroyAllChildren();
            for (let gameAd of gameAdList) {
                let iconNode = cc.instantiate(iconPrefab);
                var sprite = iconNode.getComponent(cc.Sprite);
                iconNode.active = true;
                _this.setSpriteFrame(gameAd.icon, sprite);
                iconNode.on(cc.Node.EventType.TOUCH_END, () => {
                    gameAd && tapGameAdCancelToList(gameAd, pos ,_this.hacker,parentNode.parent.parent.parent);
                    startAutoScroll();
                });
                content.addChild(iconNode);
            }
            setTimeout(function () {
                isScrollingToBottom = true;
                startAutoScroll();
            }, 1);

        };


        init();

        parentNode.addChild(list);


    }

    /**
    * 创建滚动栏页面
    * @param parentNode 父节点
    * @param pos 位置
    */
   CCNavigator.prototype.createScrollViewIconPage = function (parentNode, pos = "default") {
       
        var gameAdList = [];
        var content = new cc.Node("scroll_content");
        content.width = 720;
        //content.height = 1000;

        content.anchorX = 0;
        let contentLayout = content.addComponent(cc.Layout);
        contentLayout.type = cc.Layout.Type.GRID;
        contentLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        contentLayout.spacingX = 70;
        contentLayout.spacingY = 30;
        contentLayout.paddingLeft = 20;
        contentLayout.paddingRight = 20;
        var isScrollingToBottom = true;
        var closeButtonNode = null;

            

        var property = {};
        property.width = 303;
        property.height = 382;
        property.fontSize = 30;
        property.lineHeight = 32;

        //根节点
        let carousel = new cc.Node("carousel");
        parentNode.addChild(carousel);
        carousel.width = property.width;
        carousel.height = property.height;
        //carousel.rotation = -10;

        let carouselBg = carousel.addComponent(cc.Sprite);
        carouselBg.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        carouselBg.width = property.width;
        carouselBg.height = property.height;

        //图标
        let icon = new cc.Node("icon");
        icon.width = carousel.width -20;
        icon.height = carousel.width -20;
        var icon_widget = icon.addComponent(cc.Widget);
        icon_widget.isAlignTop = true;
        icon_widget.top = 10;
        icon.on(cc.Node.EventType.TOUCH_END, () => {
            let iconInfo = icon.iconInfo;
            iconInfo && this.onIconClick(iconInfo, pos);
        });
        let iconSprite = icon.addComponent(cc.Sprite);
        iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        iconSprite.trim = false;
        carousel.addChild(icon);

        let title = new cc.Node("title");
        title.y = -(icon.height / 2);
        title.color = cc.Color.WHITE;
        carousel.addChild(title);
        let titleLabel = title.addComponent(cc.Label);
        titleLabel.fontSize = property.fontSize;
        titleLabel.lineHeight = property.lineHeight;
        titleLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

        //滚动列表视图
        let view = new cc.Node("scroll_view");
        view.width = 720;
        //view.height = 1000;
        var viewWidget = view.addComponent(cc.Widget);
        viewWidget.isAlignTop = true;
        viewWidget.top = 0;
        viewWidget.isAlignBottom = true;
        viewWidget.bottom = 55;
        view.addChild(content);
        view.addComponent(cc.Mask);

        //滚动列表组件
        let list = new cc.Node("scroll_list");
        list.width = 720;
        //list.height = 1000;
        var scrollViewWidget = list.addComponent(cc.Widget);
        scrollViewWidget.isAlignTop = true;
        scrollViewWidget.top = 0;
        scrollViewWidget.isAlignBottom = true;
        scrollViewWidget.bottom = 80;
        let scrollView = list.addComponent(cc.ScrollView);
        scrollView.brake = 1;
        scrollView.bounceDuration = 0;
        scrollView.content = content;
        scrollView.horizontal = false;
        scrollView.vertical = true;
        list.addChild(view);


        //继续游戏
        let continueGame = new cc.Node("title");
        continueGame.y = -(icon.height / 2);
        continueGame.color = cc.Color.WHITE;
        parentNode.addChild(continueGame);
        let continueGameLabel = continueGame.addComponent(cc.Label);
        continueGameLabel.fontSize = 50;
        continueGameLabel.lineHeight = 52;
        continueGameLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        continueGameLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        continueGameLabel.enableUnderline = true;
        continueGameLabel.underlineHeight = 10;
        continueGameLabel.string = "继续游戏";
        var continueGameWidget = continueGame.addComponent(cc.Widget);
        continueGameWidget.isAlignBottom = true;
        continueGameWidget.bottom = 30;
        continueGame.on(cc.Node.EventType.TOUCH_END, (event) => {
            // parentNode.destroy();
           if(window.show){
               hacker.showBannerAd();
           }
            parentNode.active = false;
        });
        continueGame.active = false;

        var isInited = false;

        var _this = this;


        const bindEvents = () => {
            scrollView.node.on("scroll-ended", () => {
                _this.startAutoScroll(gameAdList,scrollView);
            });
        }

        //加载走马灯图标信息
        const loadScrollHorizontalIconInfos = () => {
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    gameAdList = res.data || [];
                    //自动跳转游戏
                    console.log("列表2自动跳转游戏");
                    if( gameAdList != undefined && gameAdList.length >0 ){
                        var n = Math.floor(Math.random() * gameAdList.length + 1)-1;
                        var gameAd = gameAdList[n];
                        _this.onIconClick(gameAd, pos);
                    }

                    doScroll();
                    bindEvents();
                },
            });
        };





        // const startAutoScroll = () => {
        //     let pageSize = 4,speed = 4;
        //     if (gameAdList.length <= pageSize) return;
        //     let percent = Math.abs(scrollView.getScrollOffset().y / scrollView.getMaxScrollOffset().y) || 0;
        //     // console.log(percent);
        //     if (percent >= 0.999) {
        //         scrollView.scrollToTop(gameAdList.length * speed / pageSize, false);
        //         isScrollingToBottom = false;
        //     } else if (percent <= 0.01) {
        //         scrollView.scrollToBottom(gameAdList.length * speed / pageSize, false);
        //         isScrollingToBottom = true;
        //     } else if (isScrollingToBottom) {
        //         scrollView.scrollToBottom(gameAdList.length * speed / pageSize * (1 - percent), false);
        //     } else {
        //         scrollView.scrollToTop(gameAdList.length * speed / pageSize * (percent), false);
        //     }
        // }

        const init = () => {
            if (!isInited) {
                isInited = true;
                loadScrollHorizontalIconInfos();

            }
        }


        const doScroll = () => {
            gameAdList = gameAdList;
            content.destroyAllChildren();
            for (let gameAd of gameAdList) {

                let carouselNode = cc.instantiate(carousel);

                var carouselBg = carouselNode.getComponent(cc.Sprite);
                setSpriteFrame("localRes/carouselBg.png", carouselBg);

                carouselNode.active = true;
                let iconNode = carouselNode.getChildByName("icon");
                var sprite = iconNode.getComponent(cc.Sprite);
                setSpriteFrame(gameAd.icon, sprite);

                let title = carouselNode.getChildByName("title");
                var titleLabel = title.getComponent(cc.Label);
                titleLabel.string = gameAd.title;
                carouselNode.on(cc.Node.EventType.TOUCH_END, () => {
                    gameAd && this.onIconClick(gameAd, pos);
                    _this.startAutoScroll(gameAdList,scrollView);
                });
                content.addChild(carouselNode);
            }
            setTimeout(function () {
                scrollView.isScrollingToBottom = true;
                _this.startAutoScroll(gameAdList,scrollView);
            }, 1);
            parentNode.gameAdList = gameAdList;
            parentNode.scrollView = scrollView;
           
        };


        init();

        parentNode.addChild(list);
        scrollView.scheduleOnce(function () {
            // Ad.hideBannerAd("scrollview_icon_page");
            hacker.hideBannerAd();
            continueGame.active = true;
        }, 2);

   }

CCNavigator.prototype.startAutoScroll = function(gameAdList,scrollView){
    if(!gameAdList)return;
    let pageSize = 4,speed = 4;
    if (gameAdList.length <= pageSize) return;
    let percent = Math.abs(scrollView.getScrollOffset().y / scrollView.getMaxScrollOffset().y) || 0;
    // console.log(percent);
    hacker.hideBannerAd();
    if (percent >= 0.999) {
        scrollView.scrollToTop(gameAdList.length * speed / pageSize, false);
        scrollView.isScrollingToBottom = false;
    } else if (percent <= 0.01) {
        scrollView.scrollToBottom(gameAdList.length * speed / pageSize, false);
        scrollView.isScrollingToBottom = true;
    } else if (scrollView.isScrollingToBottom) {
        scrollView.scrollToBottom(gameAdList.length * speed / pageSize * (1 - percent), false);
    } else {
        scrollView.scrollToTop(gameAdList.length * speed / pageSize * (percent), false);
    }
}
   CCNavigator.prototype.createInviteGameView = function (parentNode, pos = "default", onOpen, onClose) {
        var _this = this;
        /**图标信息列表 */
        let inviteGameIconInfos = [];
        /**当前图标索引 */
        let inviteGameIconIndex = 0;

        let inviteGameView = new cc.Node("inviteGameView");
        inviteGameView.width = 750;
        inviteGameView.height = 750 * cc.winSize.height / cc.winSize.width;

        //背景
        let background = new cc.Node("background");
        background.width = inviteGameView.width;
        background.height = inviteGameView.height;
        let backgroundSprite = background.addComponent(cc.Sprite);
        backgroundSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        backgroundSprite.type = cc.Sprite.Type.SLICED;
        this.setSpriteFrame("localRes/blank.png", backgroundSprite, (sprite, spriteFrame) => {
            spriteFrame.insetLeft = 2;
            spriteFrame.insetRight = 2;
            spriteFrame.insetTop = 2;
            spriteFrame.insetBottom = 2;
        });
        background.addComponent(cc.Button);
        inviteGameView.addChild(background);

        //对话框
        let dialog = new cc.Node("dialog");
        this.setSpriteFrame("localRes/inviteGameDialog.png", dialog.addComponent(cc.Sprite));
        inviteGameView.addChild(dialog);

        //头像
        let avatar = new cc.Node("avatar");
        avatar.x = -100;
        avatar.y = 170;
        let avatarSprite = avatar.addComponent(cc.Sprite);
        dialog.addChild(avatar);

        //图标
        let icon = new cc.Node("icon");
        icon.y = -30;
        icon.x = -123;
        icon.width = 246;
        icon.height = 246;
        icon.on(cc.Node.EventType.TOUCH_END, () => {
            enterCurrentIcon();
        });
        let iconSprite = icon.addComponent(cc.Sprite);
        iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        iconSprite.trim = false;
        dialog.addChild(icon);

        let cancel = new cc.Node("cancel");
        cancel.x = -135;
        cancel.y = -265;
        cancel.width = 270;
        cancel.height = 90;
        cancel.on(cc.Node.EventType.TOUCH_END, () => {
            closeInviteGameView();
            _this.createMiniProgramView(parentNode,"help_page");
        });
        dialog.addChild(cancel);

        let accept = new cc.Node("accept");
        accept.x = 135;
        accept.y = -265;
        accept.width = 270;
        accept.height = 90;
        accept.on(cc.Node.EventType.TOUCH_END, () => {
            enterCurrentIcon();
        });
        dialog.addChild(accept);


        let close = new cc.Node("close");
        close.width = 64;
        close.height = 65;
        close.x = 225;
        close.y = 270;
        this.setSpriteFrame("localRes/close.png", close.addComponent(cc.Sprite));
        close.on(cc.Node.EventType.TOUCH_END, () => {
            closeInviteGameView();
        });
        dialog.addChild(close);

        const enterCurrentIcon = () => {
            let iconInfo = inviteGameIconInfos[inviteGameIconIndex];
            wxsdk.tapGameAd({
                pos: pos,
                ad: iconInfo,
                redirect: true,
                success: function(res) {
                    console.log('tapGameAd success, ', res);
                },
                fail: function(res) {
                    _this.createMiniProgramView(parentNode,"help_page");
                    console.log('tapGameAd fail, ', res);
                },
                complete: function(res) {
                    closeInviteGameView();
                    console.log('tapGameAd complete, ', res);
                }
            })
        }

        const avatarUrlList = [
            "localRes/avatar1.png",
            "localRes/avatar2.png",
            "localRes/avatar3.png",
            "localRes/avatar4.png",
            "localRes/avatar5.png",
            "localRes/avatar6.png",
        ];
        //刷新图标
        const refreshInviteGameIcons = () => {
            this.setSpriteFrame(avatarUrlList[Math.floor(Math.random() * avatarUrlList.length)], avatarSprite);
            let iconInfo = inviteGameIconInfos[inviteGameIconIndex];
            if (!iconInfo) {
                inviteGameIconIndex = 0;
                iconInfo = inviteGameIconInfos[inviteGameIconIndex];
            }
            if (iconInfo) {
                icon.active = true;
                this.setSpriteFrame(iconInfo.icon, iconSprite);
            } else {
                icon.active = false;
            }
        }

        //加载图标信息
        const loadInviteGameIconInfos = () => {
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    let list = res.data || [];
						if(list.length < 1){
							parentNode.active = false;
						}
                        
                    


	                    inviteGameIconInfos = _this.shuffleArray(list);
	                    refreshInviteGameIcons();
                },
            });
        };

        const closeInviteGameView = () => {
            if (!inviteGameView.active) return;
            onClose && onClose();
            inviteGameView.active = false;
        }

        const openInviteGameView = () => {
            if (inviteGameView.active) return;
            onOpen && onOpen();
            inviteGameView.active = true;
            loadInviteGameIconInfos();
        }

        inviteGameView.active = false;
        parentNode.addChild(inviteGameView);

        openInviteGameView();
        return inviteGameView;
    };

        /**
     * 创建仿微信小程序界面
     * @param parentNode 父节点
     * @param pos 位置
     * @param onOpen 打开回调
     * @param onClose 关闭回调
     */
    CCNavigator.prototype.createMiniProgramView = function (parentNode, pos = "default", onOpen, onClose) {

        var _this = this;
        let miniProgram = new cc.Node("miniProgram");
        miniProgram.width = parentNode.width;
        miniProgram.height = parentNode.height;
        //背景
        let background = new cc.Node("background");
        background.color = cc.Color.BLACK.fromHEX("#EEEEEC");
        background.width = miniProgram.width;
        background.height = miniProgram.height;
        let backgroundSprite = background.addComponent(cc.Sprite);
        backgroundSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        backgroundSprite.type = cc.Sprite.Type.SLICED;
        this.setSpriteFrame("localRes/whiteBlank.png", backgroundSprite, (sprite, spriteFrame) => {
            spriteFrame.insetLeft = 2;
            spriteFrame.insetRight = 2;
            spriteFrame.insetTop = 2;
            spriteFrame.insetBottom = 2;
        });
        background.addComponent(cc.Button);
        miniProgram.addChild(background);
        //头
        let header = new cc.Node("header");
        header.width = miniProgram.width;
        header.height = header.width / 1080 * 300;
        let headerSprite = header.addComponent(cc.Sprite);
        headerSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.setSpriteFrame("localRes/miniProgramHeader.png", headerSprite);
        miniProgram.addChild(header);
        let headerWidget = header.addComponent(cc.Widget);
        let top = wx.getMenuButtonBoundingClientRect().top;
        top = (top - 10) * (cc.winSize.width / cc.view.getFrameSize().width);
        headerWidget.isAlignTop = true;
        headerWidget.top = top;
        //返回
        let back = new cc.Node("back");
        back.x = -330;
        back.y = 35;
        this.setSpriteFrame("localRes/miniProgramBack.png", back.addComponent(cc.Sprite));
        back.on(cc.Node.EventType.TOUCH_END, () => {
            closeMiniProgramView();
        });
        header.addChild(back);

        //滚动列表组件
        let list = new cc.Node("list");
        list.width = miniProgram.width;
        list.height = miniProgram.height - top - header.height;
        list.y = -(list.height / 2 + header.height / 2);
        header.addChild(list);

        //滚动列表视图
        let view = new cc.Node("view");
        view.width = list.width;
        view.height = list.height;
        view.addComponent(cc.Mask);
        list.addChild(view);

        //滚动列表内容
        let content = new cc.Node("content");
        content.width = list.width;
        content.height = 0;
        content.anchorY = 1;
        let contentLayout = content.addComponent(cc.Layout);
        contentLayout.type = cc.Layout.Type.GRID;
        contentLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        view.addChild(content);

        let scrollView = list.addComponent(cc.ScrollView);
        scrollView.content = content;
        scrollView.horizontal = false;
        scrollView.vertical = true;

        const closeMiniProgramView = () => {
            if (!parentNode.active) {
                return;
            }
            onClose && onClose();
            parentNode.active = false;
        }

        const openMiniProgramView = () => {
            if (miniProgram.active) {
                return;
            }
            onOpen && onOpen();
            miniProgram.active = true;
            loadMiniProgramIconInfos();
        }

        /**抽屉图标节点列表 */
        let miniProgramIconSprites = [];
        let miniProgramIconLabels = [];
        /**抽屉图标信息列表 */
        let miniProgramIconInfos = [];
        let miniProgramHotLabels = [];
        //节点池
        let nodePool = new cc.NodePool();
        //从节点池获取或者创建抽屉滚动列表的图标
        const getItem = (iconInfo) => {
            let item = nodePool.get();
            if (!item) {
                item = new cc.Node("item");
                item.width = miniProgram.width;
                item.height = miniProgram.width / 1080 * 210;
                let itemSprite = item.addComponent(cc.Sprite);
                itemSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;

                let icon = new cc.Node("icon");
                icon.width = 108;
                icon.height = 108;
                let iconSprite = icon.addComponent(cc.Sprite);
                iconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                iconSprite.trim = false;

                let iconFrame = new cc.Node("iconFrame");
                iconFrame.x = -270;
                iconFrame.width = 100;
                iconFrame.height = 100;
                setTimeout(() => {
                    let iconFrameMask = iconFrame.addComponent(cc.Mask);
                    iconFrameMask.segements = 100;
                    iconFrameMask.type = cc.Mask.Type.ELLIPSE;
                });
                item.addChild(iconFrame);
                iconFrame.addChild(icon);

                let title = new cc.Node("title");
                title.anchorX = 0;
                title.color = cc.Color.BLACK;
                title.x = -170;
                item.addChild(title);
                let titleLabel = title.addComponent(cc.Label);
                titleLabel.fontSize = 32;
                titleLabel.lineHeight = 48;
                titleLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                titleLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;

                item.on(cc.Node.EventType.TOUCH_END, (event) => {
                    let node = event.getCurrentTarget();
                    if (!node) return;
                    iconInfo && this.onIconClick(iconInfo, pos);
                    startAutoScroll();
                });


                
                let hot = new cc.Node("hot");
                hot.anchorX = 0;
                hot.color = cc.Color.WHITE;
                hot.x = 295;
                hot.y = 2;
                item.addChild(hot);
                let hotLabel = hot.addComponent(cc.Label);
                hotLabel.fontSize = 26;
                hotLabel.lineHeight = 30;
                hotLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                hotLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
            }
            item.x = 0;
            item.y = 0;
            return item;
        }
        //回收图标
        const recycleItem = (node) => {
            node.removeFromParent();
            nodePool.put(node);
        }
        //刷新抽屉图标
        const refreshMiniProgramIcons = () => {
            let len = content.childrenCount;
            if (!len || len !== miniProgramIconInfos.length) {
                for (let child of content.children) {
                    recycleItem(child);
                }
                miniProgramIconSprites = [];
                miniProgramIconLabels = [];
                miniProgramHotLabels = [];
                for (let i = 0; i < miniProgramIconInfos.length; i++) {
                    let item = getItem(miniProgramIconInfos[i]);
                    miniProgramIconSprites.push(item.getChildByName("iconFrame").getChildByName("icon").getComponent(cc.Sprite));
                    miniProgramIconLabels.push(item.getChildByName("title").getComponent(cc.Label));
                    miniProgramHotLabels.push(item.getChildByName("hot").getComponent(cc.Label));
                    
                    content.addChild(item);
                }
            }
            let starCount = Math.min(3, content.childrenCount);
            let indexList = [];
            while (starCount) {
                let randomIndex = Math.floor(Math.random() * content.childrenCount);
                if (indexList.indexOf(randomIndex) === -1) {
                    indexList.push(randomIndex);
                    starCount--;
                }
            }
            for (let i = 0; i < content.childrenCount; i++) {
                let itemSprite = content.children[i].getComponent(cc.Sprite);
                this.setSpriteFrame("localRes/miniProgramItemStar.png", itemSprite);
                let iconInfo = miniProgramIconInfos[i];
                let sprite = miniProgramIconSprites[i];
                let label = miniProgramIconLabels[i];
                let hot = miniProgramHotLabels[i];
                label.string = iconInfo.title || "";
                hot.string = Math.floor(Math.random() * 10);
                console.error(Math.floor(Math.random * 10));
                this.setSpriteFrame(iconInfo.icon, sprite);
            }
        }

        
        var _this = this;
        var isScrollingToBottom = false;

        var isInited = false;
        var gameAdList = {};
        const bindEvents = () => {
            scrollView.node.on("scroll-ended", () => {
                startAutoScroll();
            });
        }

        const startAutoScroll = () => {
            let pageSize = 4,speed = 4;
            if (gameAdList.length <= pageSize) return;
            let percent = Math.abs(scrollView.getScrollOffset().y / scrollView.getMaxScrollOffset().y) || 0;
            if (percent === 1) {
                scrollView.scrollToTop(gameAdList.length * speed / pageSize, false);
                isScrollingToBottom = false;
            } else if (percent === 0) {
                scrollView.scrollToBottom(gameAdList.length * speed / pageSize, false);
                isScrollingToBottom = true;
            } else if (isScrollingToBottom) {
                scrollView.scrollToBottom(gameAdList.length * speed / pageSize * (1 - percent), false);
            } else {
                scrollView.scrollToTop(gameAdList.length * speed / pageSize * (percent), false);
            }
        }

        const doScroll = () => {
            setTimeout(function () {
                isScrollingToBottom = true;
                startAutoScroll();
            }, 1);

        };

        //加载抽屉图标信息
        const loadMiniProgramIconInfos = () => {
            isInited = true;
            wxsdk.getGameAd({
                pos: pos,
                count: -1,
                success: function (res) {
                    let list = res.data || [];
                    miniProgramIconInfos = list;
                    _this.shuffleArray(miniProgramIconInfos);
                    refreshMiniProgramIcons();
                    gameAdList = res.data || [];
                    doScroll();
                    bindEvents();
                },
            });
        };
        parentNode.addChild(miniProgram);
        miniProgram.active = false;
        openMiniProgramView();
        return miniProgram;
    };


    return CCNavigator;
})();
