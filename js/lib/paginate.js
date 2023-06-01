/* This is free and unencumbered software released into the public domain.
 * License: Unlicense
 * For more information, please refer to <http://unlicense.org/>
 */
function Paginate(aConf) {
	var c = aConf,
		Data = c[0] || c.Data || c.data,
		Back = c[1] || c.Back || c.back,
		Next = c[2] || c.Next || c.next,
		PerPage = c[3] || c.PerPage || c.perPage,
		CurPage = c[4] || c.CurPage || c.curPage,
		PageCount = c[5] || c.PageCount || c.pageCount,
		PageItemsCount = c[6] || c.PageItemsCount || c.pageItemsCount,
		ItemsCount = c[7] || c.ItemsCount || c.itemsCount,
		AutoDisable = c[8] || c.AutoDisable || c.autoDisable,
		UpdateFn = c[9] || c.Update || c.update,
		iPageNum = 0 | (c[10] || c.iPageNum),
		iPerPage = 0 | (c[11] || c.iPerPage),
		iPageCount = 1,
		memArray, tmpArray, ArrayLen = 0,
		valueAttr = { INPUT: 1, TEXTAREA: 1, SELECT: 1 };
	function HandleUICA(aElemArr, aValue, aAttr) {
		if (aElemArr && void 0 === aElemArr.length && aElemArr.tagName)
			aElemArr = [aElemArr];
		for (var i = 0, arrLen = aElemArr.length; i < arrLen; i++) {
			var t = aElemArr[i], etn = t.tagName;
			if (void 0 !== aAttr) {
				if ("disabled" === aAttr)
					if (aValue) t.setAttribute(aAttr, "");
					else t.removeAttribute(aAttr);
				else t.setAttribute(aAttr, aValue);
			}
			else if (etn in valueAttr)
				t.value = aValue;
			else t.innerHTML = aValue;
		}
	}
	function UpdateUI(aPageItems, aPageItemsLen, aPerPage, aPageNum, aPageCount, aArrayLen) {
		UpdateFn.apply(this, arguments);
		HandleUICA(PerPage, aPerPage);
		HandleUICA(CurPage, aPageNum);
		HandleUICA(PageCount, aPageCount);
		HandleUICA(PageItemsCount, aPageItemsLen);
		HandleUICA(ItemsCount, aArrayLen);
		if (AutoDisable)
			HandleUICA(Back, 1 === aPageNum, "disabled"),
			HandleUICA(Next, iPageCount === aPageNum, "disabled");
	}
	// Handle events
	function AddHandler(aElemArr, aEventName, aFunc) {
		var z, ac = AddHandler;
		if (void 0 === ac.ois)
			z = document.createElement("a"),
			ac.ois = null === z.oninput,
			ac.ae = !!z.attachEvent,
			ac.aes = !!z.addEventListener,
			ac.iev = ac.ois ? "input" : "keyup";
		if (aElemArr && aElemArr.tagName)
			aElemArr = [aElemArr];
		if (!aElemArr) return;
		for (var i = 0, arrLen = aElemArr.length; i < arrLen; i++) {
			var elem = aElemArr[i], etn = elem && elem.tagName;
			if (!elem) continue;
			if (!aEventName) {
				if ("INPUT" === etn || "TEXTAREA" === etn)
					aEventName = ac.iev;
				else aEventName = "change";
			}
			if (!aEventName) return;
			if (ac.aes) elem.addEventListener(aEventName, aFunc);
			else {
				var eH = (function(elem){
					return function (e) {
						aFunc && aFunc.call(elem, e||event, elem);
					}
				})(elem);
				if (ac.ae) elem.attachEvent("on" + aEventName, eH);
				else elem["on" + aEventName] = eH;
			}
		}
	}
	// Handle per page items and events
	AddHandler(PerPage, "", function (e) { rH.PerPage(this.value); });
	// Handle current page number and events
	AddHandler(CurPage, "", function (e) { rH.PageNum(this.value); });
	// Handle page num change
	AddHandler(PageCount, "", function (e) { rH.PerPage(Math.ceil(ArrayLen/+this.value)); });
	// Handle button events
	AddHandler(Back, "click", function (e) { rH.Back(); });
	AddHandler(Next, "click", function (e) { rH.Next(); });
	// Now create main handle
	var rH = {};
	function ResolveData(aDataConf, aPageNum, aPerPage) {
		// aDataConf[0: DataType(0=Array, 1=Object), 1: ArrayOrObject]
		if (aDataConf[0]) {
			tmpArray = [];
			for (var n in aDataConf[1])
				tmpArray.push([n, aDataConf[1][n]]);
			memArray = tmpArray;
		} else memArray = aDataConf[1];
		ArrayLen = memArray.length;
		iPageNum = aPageNum ? ResolvePageNum(0 | aPageNum) : iPageNum;
		iPerPage = aPerPage ? Math.abs(0 | aPerPage) : iPerPage;
		if (1 > iPerPage) iPerPage = 1;
		iPageCount = Math.ceil(ArrayLen / iPerPage);
		rH.Update();
	}
	function ResolvePageNum(aPageNum, aCallUpdate) {
		if (1 > iPageNum) iPageNum = 1;
		else if (iPageNum > iPageCount) iPageNum = iPageCount;
		var flag1 = aPageNum > 0 && aPageNum <= iPageCount;
		if (aPageNum != iPageNum && flag1)
			iPageNum = aPageNum;
		if (flag1 && aCallUpdate)
			rH.Update();
		return 0 | iPageNum;
	}
	// etc
	rH[0] = rH.PageNum = rH.pageNum = rH.Page = rH.page = function (aPageNum) {
		return ResolvePageNum(aPageNum, 1);
	};
	rH[1] = rH.PageCount = rH.pageCount = function () { return iPageCount; };
	rH[2] = rH.PerPage = rH.perPage = rH.per = function (aPerPage) {
		var nPP = Math.abs(0 | aPerPage);
		if (nPP < 1) nPP = 1;
		if (nPP !== iPerPage && nPP >= 1)
			rH.Update(1, iPerPage = nPP);
		return iPerPage;
	};
	rH[3] = rH.Data = rH.data = rH.Items = rH.items = ResolveData;
	rH[4] = rH.Next = rH.next = rH.Forward = rH.forward = function () { return rH.PageNum(++iPageNum); };
	rH[5] = rH.Prev = rH.Prev = rH.Back = rH.back = function () { return rH.PageNum(--iPageNum); };
	rH[6] = rH.Update = function (aCallType) {
		// Call upper Update
		if (UpdateUI) {
			if (aCallType)
				iPageNum = 1;
			iPageNum |= 0;
			var sIdx = (-1 + iPageNum) * iPerPage,
				tArray = memArray.slice(sIdx, iPerPage + sIdx);
			iPageCount = Math.ceil(ArrayLen / iPerPage);
			UpdateUI(tArray, tArray.length, iPerPage, iPageNum, iPageCount, ArrayLen);
		}
	};
	ResolveData(Data, iPageNum, iPerPage);
	return rH;
}
