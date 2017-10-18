const middle = () => import(/* webpackChunkName: "home" */  'containers/middle-content/');
export default [
    {
        name: '直播管理',
        path: '/liveSetting',
        iconClass: 'el-icon-upload',
        redirect: '/liveSetting/liveRoomSetting',
        component: middle,
        children: [
            {
                name: '直播间管理',
                path: 'liveRoomSetting',
                component: () => import(/* webpackChunkName: "live-room-setting" */  'containers/live-setting/live-room-setting')
            },
            {
                name: '直播日程表',
                path: 'liveSchedule',
                component: () => import(/* webpackChunkName: "live-schedule" */  'containers/live-setting/live-schedule')
            },
            {
                name: '预告片上传',
                path: 'uploadPrevue',
                component: () => import(/* webpackChunkName: "upload-prevue" */  'containers/live-setting/upload-prevue')
            },
            {
                name: '回放上传',
                path: 'uploadPlaybackData',
                component: () => import(/* webpackChunkName: "upload-playback-data" */  'containers/live-setting/upload-playback-data')
            }
        ]
    },
    {
        name: '视频管理',
        path: '/videoSetting',
        redirect: '/videoSetting/programSetting',
        component: middle,
        children: [
            {
                name: '节目管理',
                path: 'programSetting',
                component: () => import(/* webpackChunkName: "program-setting" */  'containers/video-setting/program-setting')
            },
            {
                name: '视频上传',
                path: 'uploadVideo',
                component: () => import(/* webpackChunkName: "upload-video" */  'containers/video-setting/upload-video')
            }
        ]
    },
    {
        name: '音乐内容',
        path: '/musicSetting',
        redirect: '/musicSetting/specialSetting',
        component: middle,
        children: [
            {
                name: '专辑管理',
                path: 'specialSetting',
                component: () => import(/* webpackChunkName: "special-setting" */  'containers/music-setting/special-setting')
            },
            {
                name: '单曲管理',
                path: 'singleSetting',
                component: () => import(/* webpackChunkName: "single-setting" */  'containers/music-setting/single-setting')
            },
            {
                name: 'mv上传管理',
                path: 'mvUploadSetting',
                component: () => import(/* webpackChunkName: "mv-upload-setting" */  'containers/music-setting/mv-upload-setting')
            }
        ]
    },
    {
        name: '艺人管理',
        path: '/artistConfig',
        component: middle,
        redirect: '/artistConfig/artistSetting',
        children: [
            {
                name: '艺人管理 ',
                path: 'artistSetting',
                component: () => import(/* webpackChunkName: "artist-setting" */  'containers/artist-config/artist-setting')
            }
        ]
    },
    {
        name: '后台基础配置',
        path: '/backgroundConfig',
        component: middle,
        redirect: '/backgroundConfig/liveRoomConfig',
        children: [
            {
                name: '直播厅配置',
                path: 'liveRoomConfig',
                component: () => import(/* webpackChunkName: "live-room-config" */  'containers/background-config/live-room-config')
            },
            {
                name: '一二级分类管理',
                path: 'classifySetting',
                component: () => import(/* webpackChunkName: "classify-setting" */  'containers/background-config/classify-setting')
            },
            {
                name: '内部账号管理',
                path: 'innerAccountSetting',
                component: () => import(/* webpackChunkName: "inner-account-setting" */  'containers/background-config/inner-account-setting')
            }
        ]
    },
    {
        name: '前台基础配置',
        path: '/frontDeskConfig',
        component: middle,
        redirect: '/frontDeskConfig/presentSetting',
        children: [
            {
                name: '礼物设置',
                path: 'presentSetting',
                component: () => import(/* webpackChunkName: "present-setting" */  'containers/front-desk-config/present-setting')
            },
            {
                name: '哇币安卓兑换套餐管理',
                path: 'paySetMeaSetting',
                component: () => import(/* webpackChunkName: "pay-set-mea-setting" */  'containers/front-desk-config/pay-set-mea-setting')
            },
            {
                name: '会员套餐管理',
                path: 'memberSetMeaSetting',
                component: () => import(/* webpackChunkName: "member-set-mea-setting" */  'containers/front-desk-config/member-set-mea-setting')
            },
            {
                name: '热门搜索关键词管理',
                path: 'keyWorldSetting',
                component: () => import(/* webpackChunkName: "key-world-setting" */  'containers/front-desk-config/key-world-setting')
            },
            {
                name: '屏蔽词汇管理',
                path: 'vocabularyShieldSetting',
                component: () => import(/* webpackChunkName: "vocabulary-shield-setting" */  'containers/front-desk-config/vocabulary-shield-setting')
            },
            {
                name: '内容push',
                path: 'contentPush',
                component: () => import(/* webpackChunkName: "content-push" */  'containers/front-desk-config/content-push')
            }
        ]
    },
    {
        name: '推荐位管理',
        path: '/advertisingSetting',
        redirect: '/advertisingSetting/bannerSetting',
        component: middle,
        children: [
            {
                name: 'banner',
                path: 'bannerSetting',
                component: () => import(/* webpackChunkName: "banner-setting" */  'containers/advertising-setting/banner-setting')
            },
            {
                name: '活动图',
                path: 'activityImage',
                component: () => import(/* webpackChunkName: "activity-image" */  'containers/advertising-setting/activity-image')
            },
            {
                name: '自定义标签管理',
                path: 'tagSetting',
                component: () => import(/* webpackChunkName: "tag-setting" */  'containers/advertising-setting/tag-setting')
            },
            {
                name: '自定义模块管理',
                path: 'modelSetting',
                component: () => import(/* webpackChunkName: "model-setting" */  'containers/advertising-setting/model-setting')
            },
            {
                name: '首页四方格',
                path: 'homePageBannerSetting',
                component: () => import(/* webpackChunkName: "home-page-banner-setting" */  'containers/advertising-setting/home-page-banner-setting')
            }
        ]
    },
    {
        name: '用户信息',
        path: '/userConfig',
        component: middle,
        redirect: '/userConfig/userList',
        children: [
            {
                name: '用户列表',
                path: 'userList',
                component: () => import(/* webpackChunkName: "user-list" */  'containers/user-config/user-list')
            },
            {
                name: '订单列表',
                path: 'orderList',
                component: () => import(/* webpackChunkName: "order-list" */  'containers/user-config/order-list')
            }
        ]
    }
]