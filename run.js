/**
 * @Description: 
 * @Author: bubao
 * @Date: 2022-04-20 16:57:33
 * @LastEditors: bubao
 * @LastEditTime: 2022-04-22 15:42:55
 */
const https = require('https');
const gacha_type_map = {
	'301': 'Up抽卡',
	'302': '武器抽卡',
	'200': '常驻抽卡',
}
const testUrl = ''
run(testUrl)
async function run(inputUrl) {
	const u = new URL(inputUrl)
	if ('webstatic.mihoyo.com' !== u.hostname) {
		return
	}
	const i = new URL('https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog')
	u.searchParams.forEach((value, key) => {
		// console.log(key, value)
		// 配置请求参数
		i.searchParams.set(key, value)
	})

	// UP 池子
	await findAll(i, 301)
	// 武器池子
	await findAll(i, 302)
	// 常驻池子
	await findAll(i, 200)

}

async function findAll(urlObj, gacha_type = '301', page = 0) {
	urlObj.searchParams.set('gacha_type', gacha_type)

	let AllData = []
	let newEndid = '0'
	while (newEndid) {
		urlObj.searchParams.set('end_id', newEndid)
		urlObj.searchParams.set('page', ++page)

		const data = await new Promise((resolve) => {
			https.get({
				host: urlObj.host,
				protocol: urlObj.protocol,
				hostname: urlObj.hostname,
				path: urlObj.pathname + urlObj.search,
				headers: {
					Accept: 'application/json, text/plain, */*',
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "zh-CN,zh;q=0.9"
				}
			}, res => {
				let data = []
				res.on('data', d => {
					data.push(d)
				})


				res.on('end', () => {
					data = JSON.parse(Buffer.concat(data).toString())
					// console.log(data.data.list)
					newEndid = data.data.list[data.data.list.length - 1] ? data.data.list[data.data.list.length - 1].id : null
					resolve(data.data.list)
				})
			})
		})
		AllData.push(...data)
		await new Promise((resolve) => { setTimeout(resolve, 1000) })
	}
	// console.log(`let a${gacha_type} = `, JSON.stringify(AllData, null, 2))
	return AllData
}
