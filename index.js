/*
1, 构建 52 张牌
	1.1, 构建 4 个花色, 每个花色 13 张, A -> K
	1.2, 花色, type: 黑桃 ♠: 1, 红桃 ♥: 2, 梅花 ♣: 3, 方片 ♦: 4
	1.3, 增加正反面, face: positive/negative
	1.4, 区分红黑, color: red/black
2, 初始化底部界面
	2.1, 每列 1-7 个, 正反面
*/
/*
1, "智盈 - 基金频道" 前后端代码重构问题讨论, 以最新需求为第一优先级, 后续页面有改动计划(如: 基金首页, 基金详情), 可以直接重写(重写也就替换掉了原来的开发方式), 基金快选短期无改动计划, 可暂时不动, 2.5h, 100%;
2, 基金比较页面适配 ie7, 修改页面结构和样式(flex 布局改成定位), 4h, 30%;
3, 基金比较修改顶部 tab 的页面结构和样式, 处理滚动条位置, 2h, 50%;
*/
const log = console.log.bind(console)

// 黑红花片, 4 个花色
const fourType = [1, 2, 3, 4]
// 特殊处理 AJQK
const textObj = {
	0: "A",
	10: "J",
	11: "Q",
	12: "K",
}
// 花色
const colorTextObj = {
	1: "♠",
	2: "♥",
	3: "♣",
	4: "♦",
}
// 牌库
// {num: 2, face: "negative", text: "2", type: 1, color: "black"}
let CARD_LIB = []
let BOTTOM_CARD_LIB = []
let TOP_CARD_LIB = []

// 构建牌库
const buildCardLib = function () {
	let cardLib = []
	fourType.forEach(item => {
		cardLib = [...cardLib, ...buildOneColor(item)]
	})
	function shuffle(arr) {
		let m = arr.length;
		while(m > 1) {
			let index = Math.floor(Math.random() * m--); // 交换的索引
			[arr[m], arr[index]] = [arr[index], arr[m]]; // 交换数据
		}
		return arr
	}
	cardLib = shuffle(cardLib)
	CARD_LIB = cardLib
	BOTTOM_CARD_LIB = CARD_LIB.slice(0, 28)
	TOP_CARD_LIB = CARD_LIB.slice(28)
	log("*** CARD_LIB", CARD_LIB)
	// return cardLib
}

// 构建一种花色牌库
const buildOneColor = function (type) {
	let res = []
	for (let i = 0; i < 13; i++) {
		let o = {}
		let num = i + 1
		o.num = num
		o.face = "negative"
		if ([0, 10, 11, 12].includes(i)) {
			o.text = textObj[i]
		} else {
			o.text = String(num)
		}
		o.type = type
		if ([1, 3].includes(type)) {
			o.color = "black"
		} else {
			o.color = "red"
		}
		res.push(o)
	}
	// log("*** buildOneColor res", res)
	return res
}

// 循环构建每列牌
const buildEachColumnCard = function () {
	let eachColumn = $(".eachColumn")
	let cardIndex = 0
	for (let i = 0; i < eachColumn.length; i++) {
		const e = eachColumn[i]
		let index = $(e).attr("index")
		let eachCardInColDom = ""
		for (let i2 = 0; i2 < index; i2++) {
			const e2 = BOTTOM_CARD_LIB[cardIndex]
			// 判断正反面
			let textColor = ""
			if (e2.color === "red") {
				textColor = '<div class="eachCardNum redText">' + e2.text + '</div>' +
				'<div class="eachCardType redText">' + colorTextObj[e2.type] + '</div>'
			} else {
				textColor = '<div class="eachCardNum blackText">' + e2.text + '</div>' +
				'<div class="eachCardType blackText">' + colorTextObj[e2.type] + '</div>'
			}
			if (String(i2 + 1) === String(index)) {
				eachCardInColDom = eachCardInColDom +
				'<div class="eachCardInCol isPositive" index="' + (i2 + 1) + '" color="' + e2.color + '" face="' + e2.face + '" type="' + e2.type + '" num="' + e2.num + '">' +
					textColor +
				'</div>'
			} else {
				eachCardInColDom = eachCardInColDom +
				'<div class="eachCardInCol isNegative" index="' + (i2 + 1) + '" color="' + e2.color + '" face="' + e2.face + '" type="' + e2.type + '" num="' + e2.num + '">' +
					// textColor +
				'</div>'
			}
			cardIndex = cardIndex + 1
		}
		$(e).empty()
		$(e).append(eachCardInColDom)
	}
	log("*** eachColumn", eachColumn)
}

const __main = function () {
	buildCardLib()
	buildEachColumnCard()
}

__main()