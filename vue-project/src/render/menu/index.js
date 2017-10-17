import {
        Submenu,
        MenuItem,
        Menu
    } from 'element-ui';
export default function(createElement, config) {
    let forEach = function (data, index) {
        let arr = [],
            len = data.length;
        for (let i = 0; i < len; i++) {
            arr.push(createEl(data[i], index+i));
        }
        return arr;
    };
    let createEl = function (data, index) {
        if (data.child) {
            return createElement(Submenu,
                Object.assign({
                    props: {
                        index
                    }
                },data.option),
                [createElement('template', {
                slot : 'title',
            },createTitle(data)),...forEach(data.child, index)]);
        } else {
            return createElement(MenuItem,Object.assign({
                    props: {
                        to: data.path,
                        index
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
