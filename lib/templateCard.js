// -------- 生成纸牌 html --------

// 生成纸牌 html
const templateCardHtml = function (e) {
    let r = `
		<div class="innerCardTop innerCardLine">
			<div class="eachCardNum eachCardNum${e.num} ${e.color}Text">${e.text}</div>
			<div class="eachCardType eachCardType${e.type}"></div>
		</div>
		${templateCardInnerHtml(e)}
		<div class="innerCardBtm innerCardLine">
			<div class="eachCardType eachCardType${e.type}"></div>
			<div class="eachCardNum eachCardNum${e.num} ${e.color}Text">${e.text}</div>
		</div>
	`
    return r
}

// 手写扑克牌不同花色和数字的内部 html
const templateCardInnerHtml = function (e) {
    let n = Number(e.num)
    let type = e.type
    let color = e.color
    let r = ''
    if (n === 1) {
        r = `
			<div class="innerCardMid innerCardMid${n}">
				<div class="eachCardType innerMidCard eachCardType${type}"></div>
			</div>
		`
    } else if (n === 2) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="eachCardType innerMidCard eachCardType${type}"></div>
				<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
			</div>
		`
    } else if (n === 3) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="eachCardType innerMidCard eachCardType${type}"></div>
				<div class="eachCardType innerMidCard eachCardType${type}"></div>
				<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
			</div>
		`
    } else if (n === 4) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
			</div>
		`
    } else if (n === 5) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="each${n} each${n}1">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
			</div>
		`
    } else if (n === 6) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
			</div>
		`
    } else if (n === 7) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="eachCardType innerMidCard eachCardType${type} innerMidCardAbs${n}1"></div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
			</div>
		`
    } else if (n === 8) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="eachCardType innerMidCard eachCardType${type} innerMidCardAbs${n}1"></div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="eachCardType innerMidCard eachCardType${type} innerMidCardAbs${n}2"></div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
			</div>
		`
    } else if (n === 9) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="eachCardType innerMidCard eachCardType${type} innerMidCardAbs${n}1"></div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
			</div>
		`
    } else if (n === 10) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="eachCardType innerMidCard eachCardType${type} innerMidCardAbs${n}1"></div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
					<div class="eachCardType innerMidCard eachCardType${type}"></div>
				</div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
				<div class="eachCardType innerMidCard eachCardType${type} innerMidCardAbs${n}2"></div>
				<div class="each${n}">
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
					<div class="eachCardType innerMidCard eachCardType${type} innerMidCardRotate"></div>
				</div>
			</div>
		`
    } else if (n === 11 || n === 12 || n === 13) {
        r = `
			<div class="innerCardMid innerCardMid${n} eachCardTypeWith${type}">
				<div class="eachCardType${n} eachCardType${color.toUpperCase()}${n}"></div>
				<div class="eachCardType${n} eachCardType${color.toUpperCase()}${n} innerMidCardRotate innerMidCardRotateHead${n}"></div>
			</div>
		`
    } else {
        console.error('### templateCardMid error n:', n)
    }
    return r
}


export {
    templateCardHtml,
}
