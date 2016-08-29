import $ from 'jquery';

/**
 * 点击切换头部菜单
 * @param index
 * @returns {boolean}
 * @constructor
 */
export function HeadTabsClick(index) {
    if (index == "") return false;
    let route = this.navData[index].route;
    if (this.curRoute == route)
        return false;

    this.curRoute = route;
    let pid = this.navData[index].id;
    this._getData(pid);
}