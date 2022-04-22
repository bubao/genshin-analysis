/**
 * @Description: 
 * @Author: bubao
 * @Date: 2022-04-22 12:22:27
 * @LastEditors: bubao
 * @LastEditTime: 2022-04-22 15:22:46
 */
const { a200, a301, a302 } = require('./11')
const get5RoleList = [];
const roleMap = new Map(); // 存储角色
const role5Map = new Map(); // 存储5星角色
const get200 = new Map()
const a302Map = new Map(); // 存储301武器
const get200List = [];

let storeSum = 0
let store301 = 0;
let times301 = 0;
for (let index = a301.length - 1; index >= 0; index--) {
	const element = a301[index];
	storeSum += 160;
	if (element.item_type === '角色') {
		if (element.rank_type === '5') {
			get5RoleList.push({ name: element.name, store: store301 + 160, times: times301++ });
			role5Map.set(element.name, (role5Map.get(element.name) || 0) + 1);

			store301 = 0;
			times301 = 0;
		} else {
			store301 += 160;
			times301++;
		}
		roleMap.set(element.name, (roleMap.get(element.name) || 0) + 1);
	} else {
		store301 += 160;
		times301++;
	}
}
console.log(get5RoleList, store301, times301);
let avg301 = 0;
let luck301 = { name: '', store: 1000000 };
get5RoleList.forEach(v => {
	if (luck301.store > v.store) {
		luck301.store = v.store;
		luck301.name = v.name;
	}
	avg301 += v.store;
})
avg301 = avg301 / get5RoleList.length;

console.log(avg301, luck301.name);





let store200 = 0;
let times200 = 0;
for (let index = a200.length - 1; index >= 0; index--) {
	const element = a200[index];
	storeSum += 160;
	if (element.rank_type === '5') {
		// get5RoleList.push({ name: element.name, store: store200 + 160, times: times200++ });
		get200.set(element.name, (get200.get(element.name) || 0) + 1);
		get200List.push({ name: element.name, store: store200 + 160, times: times200++ })
		store200 = 0;
		times200 = 0;
	} else {
		store200 += 160;
		times200++;
	}
	if (element.item_type === '角色') {
		roleMap.set(element.name, (roleMap.get(element.name) || 0) + 1);
	}
}
let avg200 = 0;
let luck200 = { name: '', store: 1000000 };
get200List.forEach(v => {
	if (luck200.store > v.store) {
		luck200.store = v.store;
		luck200.name = v.name;
	}
	avg200 += v.store;
})
avg200 = avg200 / get5RoleList.length;

console.log(avg200, luck200.name);
console.log(get200List, store200, times200);

let roleMapTable = [];
roleMap.forEach((v, k) => {
	roleMapTable.push({ 角色: k, 命数: v });
})
console.table(roleMapTable)
