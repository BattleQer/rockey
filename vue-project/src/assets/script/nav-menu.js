export default [
    {
        name: '直播管理',
        path: '/liveSetting',
        children: [
            {
                name: '直播间管理',
                path: 'liveRoomSetting',
            },
            {
                name: '直播日程表',
                path: 'liveSchedule',
            },
            {
                name: '预告片上传',
                path: 'uploadPrevue',
            },
            {
                name: '回放上传',
                path: 'uploadPlaybackData',
            }
        ]
    },
    {
        name: '视频管理',
        path: '/videoSetting',
        children: [
            {
                name: '节目管理',
                path: 'programSetting',
            },
            {
                name: '视频上传',
                path: 'uploadVideo',
            }
        ]
    },
    {
        name: '音乐管理',
        path: '/musicSetting',
        redirect: '/musicSetting/specialSetting',
        children: [
            {
                name: '专辑管理',
                path: 'specialSetting',
            },
            {
                name: '单曲管理',
                path: 'singleSetting',
            },
            {
                name: 'mv上传管理',
                path: 'mvUploadSetting',
            }
        ]
    },
    {
        name: '艺人管理',
        path: '/artistConfig',
        children: [
            {
                name: '艺人管理',
                path: 'artistSetting',
            }
        ]
    },
    {
        name: '后台基础配置',
        path: '/backgroundConfig',
        redirect: '/backgroundConfig/liveRoomConfig',
        children: [
            {
                name: '直播厅配置',
                path: 'liveRoomConfig',
            },
            {
                name: '分类管理',
                path: 'classifySetting',
            },
            {
                name: '内部账号管理',
                path: 'innerAccountSetting',
            }
        ]
    },
    {
        name: '前台基础配置',
        path: '/frontDeskConfig',
        children: [
            {
                name: '礼物设置',
                path: 'presentSetting',
            },
            {
                name: '哇币安卓兑换套餐管理',
                path: 'paySetMeaSetting',
            },
            {
                name: '会员套餐管理',
                path: 'memberSetMeaSetting',
            },
            {
                name: '热门搜索关键词管理',
                path: 'keyWorldSetting',
            },
            {
                name: '屏蔽词汇管理',
                path: 'vocabularyShieldSetting',
            },
            {
                name: '内容push',
                path: 'contentPush',
            }
        ]
    },
    {
        name: '推荐位管理',
        path: '/advertisingSetting',
        children: [
            {
                name: 'banner',
                path: 'bannerSetting',
            },
            {
                name: '活动图',
                path: 'activityImage',
            },
            {
                name: '自定义标签管理',
                path: 'tagSetting',
            },
            {
                name: '自定义模块管理',
                path: 'modelSetting',
            },
            {
                name: '首页四方格',
                path: 'homePageBannerSetting',
            }
        ]
    },
    {
        name: '用户信息',
        path: '/userConfig',
        children: [
            {
                name: '用户列表',
                path: 'userList',
            },
            {
                name: '订单列表',
                path: 'orderList',
            }
        ]
    }
]