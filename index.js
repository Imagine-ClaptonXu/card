const log = console.log.bind(console)

// 拖拽 DOM
let nowDragDom
// 黑红花片, 4 个花色
const fourType = [1, 2, 3, 4]
// 特殊处理 AJQK
const textObj = {
	1: "A",
	11: "J",
	12: "Q",
	13: "K",
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
let topCardIndex = 0
// 顶部空白的 4 列可以被从 A => K 的地方，每列要同样花色
let topWhiteSpace = [
	[],
	[],
	[],
	[],
]

// 初始化
const init = function () {
	topCardIndex = 0
	$(".changedCardShow").empty()
}

// 构建牌库
const buildCardLib = function (debugData) {
	let cardLib = []
	fourType.forEach(item => {
		cardLib = [...cardLib, ...buildOneColor(item)]
	})
	function shuffle(arr) {
		let m = arr.length
		while (m > 1) {
			let index = Math.floor(Math.random() * m--); // 交换的索引
			[arr[m], arr[index]] = [arr[index], arr[m]]; // 交换数据
		}
		return arr
	}
	cardLib = shuffle(cardLib)
	CARD_LIB = cardLib
	BOTTOM_CARD_LIB = CARD_LIB.slice(0, 28)
	TOP_CARD_LIB = CARD_LIB.slice(28)
	log("*** CARD_LIB BOTTOM_CARD_LIB TOP_CARD_LIB", CARD_LIB, BOTTOM_CARD_LIB, TOP_CARD_LIB)
	// return cardLib

	if (debugData) {
		CARD_LIB = debugData.CARD_LIB
		BOTTOM_CARD_LIB = debugData.BOTTOM_CARD_LIB
		TOP_CARD_LIB = debugData.TOP_CARD_LIB
		console.warn("*** debugData: CARD_LIB BOTTOM_CARD_LIB TOP_CARD_LIB", CARD_LIB, BOTTOM_CARD_LIB, TOP_CARD_LIB)
	}

	toggleTopSupport()
}

// 展示左上角牌叠
const toggleTopSupport = function () {
	$(".topSupport").on("click", event => {
		log('展示左上角牌叠 event', event)
		if ($(".topSupport")[0].classList.contains('supportOpen')) {
			$(".topSupport").removeClass("supportOpen")
			$('.btmCard').empty()
		} else {
			$(".topSupport").addClass("supportOpen")
			let total = ''
			TOP_CARD_LIB.forEach((e, i) => {
				// log('index', e)
				let topShowCard = e
				let textColor = ""
				if (topShowCard.color === "red") {
					textColor = '<div class="eachCardNum redText">' + topShowCard.text + '</div>' +
						'<div class="eachCardType redText">' + colorTextObj[topShowCard.type] + '</div>'
				} else {
					textColor = '<div class="eachCardNum blackText">' + topShowCard.text + '</div>' +
						'<div class="eachCardType blackText">' + colorTextObj[topShowCard.type] + '</div>'
				}
				let showCardText = '<div ondrop="drop_handler(event);" ondragover="dragover_handler(event);" ondragstart="dragstart_handler(event);" draggable="true" class="subCard eachCardInColInSupport isPositive dragCard source" index="' + (i + 1) + '" color="' + topShowCard.color + '" face="' + topShowCard.face + '" type="' + topShowCard.type + '" num="' + topShowCard.num + '">' +
					textColor +
					'</div>'
				total += showCardText
			})

			$('.btmCard').append(total)
		}
	})
}

// 构建一种花色牌库
const buildOneColor = function (type) {
	let res = []
	for (let i = 1; i < 14; i++) {
		let o = {}
		let num = i
		o.num = num
		o.face = "negative"
		if ([1, 11, 12, 13].includes(i)) {
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
			// log("*** e2.num", e2.num, e2)
			if (String(i2 + 1) === String(index)) {
				eachCardInColDom = eachCardInColDom +
				'<div ondrop="drop_handler(event);" ondragover="dragover_handler(event);" ondragstart="dragstart_handler(event);" draggable="true" class="eachCardInCol isPositive dragCard bottomTarget" color="' + e2.color + '" face="' + e2.face + '" type="' + e2.type + '" num="' + e2.num + '">' +
					textColor +
				'</div>'
			} else {
				eachCardInColDom = eachCardInColDom +
				'<div ondrop="drop_handler(event);" ondragover="dragover_handler(event);" ondragstart="dragstart_handler(event);" draggable="false" class="eachCardInCol isNegative" color="' + e2.color + '" face="' + e2.face + '" type="' + e2.type + '" num="' + e2.num + '">' +
					// textColor +
				'</div>'
			}
			cardIndex = cardIndex + 1
		}
		$(e).empty()
		$(e).append(eachCardInColDom)
		handleChangeFace()
	}
	log("*** eachColumn", eachColumn)
}

// 左上角的点击事件
const handleChangeCardBtn = function () {
	$(".changeBtn").on("click", event => {
		$(".source").removeClass("source")

		let topShowCard = TOP_CARD_LIB[topCardIndex]
		let textColor = ""
		if (topShowCard.color === "red") {
			textColor = '<div class="eachCardNum redText">' + topShowCard.text + '</div>' +
			'<div class="eachCardType redText">' + colorTextObj[topShowCard.type] + '</div>'
		} else {
			textColor = '<div class="eachCardNum blackText">' + topShowCard.text + '</div>' +
			'<div class="eachCardType blackText">' + colorTextObj[topShowCard.type] + '</div>'
		}
		let showCardText = '<div ondragstart="dragstart_handler(event);" draggable="true" class="subCard eachCardInCol isPositive dragCard source" index="' + (topCardIndex + 1) + '" color="' + topShowCard.color + '" face="' + topShowCard.face + '" type="' + topShowCard.type + '" num="' + topShowCard.num + '">' +
			textColor +
		'</div>'
		$(".changedCardShow").empty()
		$(".changedCardShow").append(showCardText)

		topCardIndex++
		if (topCardIndex >= TOP_CARD_LIB.length) {
			topCardIndex = 0
		}
	})
}

// 牌翻面
const handleChangeFace = function () {
	$(".isNegative").on("click", event => {
		let target = event.target
		// $(".target").next()
		log("*** next", $(target).next(), $(target).next()[0])
		if ($(target).next()[0]) {
			return
		}
		let color = $(target).attr("color")
		let type = $(target).attr("type")
		let num = $(target).attr("num")
		let text = Object.keys(textObj).includes(num) ? textObj[num] : num
		var html = ""
		if (color === "red") {
			html = '<div class="eachCardNum redText">' + text + '</div>' +
			'<div class="eachCardType redText">' + colorTextObj[type] + '</div>'
		} else {
			html = '<div class="eachCardNum blackText">' + text + '</div>' +
			'<div class="eachCardType blackText">' + colorTextObj[type] + '</div>'
		}
		$(target).addClass("bottomTarget")
		$(target).attr("draggable", true)
		$(target).append(html)
		$(target).removeClass("isNegative").addClass("isPositive")
	})
}

// drag
const dragstart_handler = function (event) {
	console.log("*** drag SSSSSSSSSStart", event.currentTarget);
	$(".nowDragCard").removeClass("nowDragCard")
	nowDragDom = event.currentTarget
	event.currentTarget.classList.add("eachCardInCol");
	event.currentTarget.classList.add("nowDragCard");
	// Set the drag's format and data. Use the event target's id for the data 
	event.dataTransfer.setData("text/plain", event.target.id);
	log("*** nowDragDom", nowDragDom)
}

const dragover_handler = function (event) {
	console.log("*** drag OOOOOOver")
	// nowDragDom = null
	// log("*** nowDragDom", nowDragDom)
	event.preventDefault()
}

const drop_handler = function (event) {
	console.log("Drop")
	event.preventDefault()
	// Get the data, which is the id of the drop target
	var data = event.dataTransfer.getData("text")
	var topTarget = "topTarget"
	var bottomTarget = "bottomTarget"
	// appendChild
	log("*** event.target", event.target)
	log("*** parent color", $(event.target).attr("color"))
	log("*** nowDragDom color", $(nowDragDom).attr("color"))
	log("*** parent num", Number($(event.target).attr("num")))
	log("*** nowDragDom num", Number($(nowDragDom).attr("num")))
	log("*** event.target.classList", event.target.classList, typeof event.target.classList)
	if (event.target.classList.contains("topTarget")) {
		log(">>> in 顶部")
		// 顶部的 4 个花色
		if ($(event.target).children().length === 0) {
			log(">>> 顶部这一列是空的，可以放置")
			// 获取花色
			let type = $(nowDragDom).attr("type")
			// 给这一列的花色赋值
			$(event.target).attr("type", type)
			$(nowDragDom).addClass("topTarget")
			$(event.target).append($(nowDragDom));
			// 通过 subCard 属性判断是左上角牌叠的牌
			updateTopCardList(nowDragDom)
		} else {
			log(">>> 顶部，非空，检查花色和数值")
			if ($(event.target).attr("type") === $(nowDragDom).attr("type")) {
				if (Number($(event.target).attr("num")) + 1 === Number($(nowDragDom).attr("num"))) {
					log("*** in 数字挨着 0 => 1")
					$(nowDragDom).addClass("topTarget")
					$(event.target).append($(nowDragDom));
					// 通过 subCard 属性判断是左上角牌叠的牌
					updateTopCardList(nowDragDom)
				}
			}
		}
	} else if (event.target.classList.contains("eachColumn")) {
		log(">>> in 底部")
		if ($(event.target).children().length === 0) {
			log("*** 底部这一列是空的，可以放置")
			$(event.target).append($(nowDragDom));
			// 通过 subCard 属性判断是左上角牌叠的牌
			updateTopCardList(nowDragDom)
		}
	} else {
		log('>>> 红黑相间')
		// 红黑相间
		if ($(event.target).attr("color") !== $(nowDragDom).attr("color")) {
			// 数字挨着 5 下面只能放 4
			log("*** in 红黑相间")
			if (Number($(event.target).attr("num")) === Number($(nowDragDom).attr("num")) + 1) {
				$(event.target).parent().append($(nowDragDom));
				log('一张牌被放置成功了！！！')
				// 通过 subCard 属性判断是左上角牌叠的牌
				updateTopCardList(nowDragDom)
			}
		}
	}
	// Clear the drag data cache (for all formats/types)
	event.dataTransfer.clearData();
	nowDragDom = null
	log("*** nowDragDom", nowDragDom)
}

// 更新左上角（被展开的）牌叠
const updateTopCardList = function (nowDragDom) {
	// 通过 subCard 属性判断是左上角牌叠的牌
	if ($(nowDragDom)[0]?.classList?.contains('subCard')) {
		let index = $(nowDragDom).attr("index") - 1
		// 更新左上角（被展开的）牌叠
		updateTopCardList($(nowDragDom).attr("index") - 1)
		// 牌被成功放置之后要去掉 subCard 属性
		$(nowDragDom).removeClass("subCard")
		TOP_CARD_LIB.splice(index, 1)
		topCardIndex -= 1
	}
}

// 点击开始
const handleStartBtn = function () {
	$(".startBtn").on("click", e => {
		init()
		buildCardLib()
		buildEachColumnCard()
	})
}

// 点击 debug
const handleDebugBtn = function () {
	$(".debugBtn").on("click", e => {
		// 这里把纸牌数据全部挂载到 window 上，用于复原
		window.card = {
			CARD_LIB,
			BOTTOM_CARD_LIB,
			TOP_CARD_LIB,
			topCardIndex,
		}
		log('window.card', window.card)
	})
}

const __main = function () {
	init()
	buildCardLib()
	buildEachColumnCard()
	handleChangeCardBtn()
	handleStartBtn()
	handleDebugBtn()
	handleChangeFace()
	// dragEvent()

	// 默认展示左上角牌叠
	$(".topSupport").click()
}

__main()