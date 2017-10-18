import {
        Submenu,
        MenuItem,
        Menu
    } from 'element-ui';
export default function(createElement, config) {
    let forEach = function (data) {
        let arr = [],
            len = data.length;
        for (let i = 0; i < len; i++) {
            arr.push(createEl(data[i]));
        }
        return arr;
    };
    let createEl = function (data) {
        if (data.children) {
            return createElement(Submenu,
                Object.assign({
                    props: {
                        index: data.path
                    }
                },data.option),
                [createElement('template', {
                slot : 'title',
            },createTitle(data)),...forEach(data.children)]);
        } else {
            return createElement(MenuItem,Object.assign({
                    props: {
                        index: data.path
                    }
                },data.option),
                [
                    createElement('template', {
                        slot: 'title'
                    },createTitle(data))
                ]
            )
        }
    };
    let createTitle = function(data) {
        let icon = data.iconClass;
        return icon?[createElement('div',{
            class: icon
        }),data.name]:data.name;
    };
    return createElement(
        Menu,
        config.option||{},
        forEach(config.menuData, '')
    )
}
