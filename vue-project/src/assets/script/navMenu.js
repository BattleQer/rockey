export default [
    {
        name: '妙哇后台',
        option: {
            class: 'nav-index'
        }
    },
    {
        name: '直播管理',
        path: '/liveManage',
        child: [
            {
                name: '直播间管理',
                path: 'liveRoomManage'
            },
            {
                name: '直播日程表',
                path: 'liveSchedule'
            },
            {
                name: '预告片上传',
                path: 'uploadPrevue'
            },
            {
                name: '回放上传',
                path: 'uploadPlaybackData'
            }
        ]
    },
    {
        name: '视频管理',
        path: 'videoManage',
        child: [
            {
                name: '节目管理',
                path: 'programManage'
            },
            {
                name: '视频上传',
                path: 'uploadVideo'
            }
        ]
    },
    {
        name: '音乐管理',
        path: 'musicManage',
        child: [
            {
                name: '专辑管理',
                path: 'specialManage'
            },
            {
                name: '单曲管理',
                path: 'singleManage'
            },
            {
                name: 'mv上传管理',
                path: 'mvUploadManage'
            }
        ]
    },
    {
        name: '艺人管理',
        path: 'artistConfig',
        child: [
            {
                name: '艺人管理',
                path: 'artistManage'
            }
        ]
    },
    {
        name: '后台基础配置',
        path: 'backgroundConfig',
        child: [
            {
                name: '直播厅配置',
                path: 'liveRoomConfig'
            },
            {
                name: '分类管理',
                path: 'classifyManage'
            },
            {
                name: '内部账号管理',
                path: 'innerAccountManage'
            }
        ]
    },
    {
        name: '前台基础配置',
        path: 'frontDeskConfig',
        child: [
            {
                name: '礼物设置',
                path: 'PresentSetting',
            },
            {
                name: '哇币安卓兑换套餐管理',
                path: 'paySetMeaManage'
            },
            {
                name: '会员套餐管理',
                path: 'memberSetMeaManage'
            },
            {
                name: '热门搜索关键词管理',
                path: 'keyWorldManage'
            },
            {
                name: '屏蔽词汇管理',
                path: 'vocabularyShieldManage'
            },
            {
                name: '内容push',
                path: 'contentPush'
            }
        ]
    },
    {
        name: '推荐位管理',
        path: 'advertisingManage',
        child: [
            {
                name: 'banner',
                path: 'bannerManage'
            },
            {
                name: '活动图',
                path: 'activityImage'
            },
            {
                name: '自定义标签管理',
                path: 'tagManage'
            },
            {
                name: '自定义模块管理',
                path: 'modelManage'
            },
            {
                name: '首页四方格',
                path: 'homePageBannerManage'
            }
        ]
    },
    {
        name: '用户信息',
        path: 'userConfig',
        child: [
            {
                name: '用户列表',
                path: 'userList'
            },
            {
                name: '订单列表',
                path: 'orderList'
            }
        ]
    }
]