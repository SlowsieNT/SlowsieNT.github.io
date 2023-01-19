// This is free and unencumbered software released into the public domain.
// License: Unlicense
// For more information, please refer to <http://unlicense.org/>
var Paginator2 = new function () {
	var c = this;
	c.Create = c.inst = function (aItems, aPage, aPerPage, aUpdateHandler, aEvents) {
		if (!aItems.length) aItems = [];
		var handle = {
			Items: [],
			ItemsLen: 0,
			Page: Math.abs(0|aPage),
			PageStep: 1,
			PerPage: Math.abs(0|aPerPage),
			PageItems: [],
			PageItemsLen: 0,
			UpdateHandlers: [aUpdateHandler]
		};
		function UpdatePage() {
			if (handle.Page < 1) handle.Page = 1;
			var page = -1 + handle.Page;
			handle.PageItems = handle.Items.slice(page * handle.PerPage, page * handle.PerPage + handle.PerPage);
			handle.PageItemsLen = handle.PageItems.length;
			CallUpdateHandlers();
			return true;
		}
		function CallUpdateHandlers() {
			for (var i = 0; i < handle.UpdateHandlers.length; i++)
				if (handle.UpdateHandlers[i].apply)
					handle.UpdateHandlers[i].apply(_, [handle]);
		}
		function SetData(aItems) {
			if (aItems && aItems.length) {	
				handle.Items = aItems;
				handle.ItemsLen = aItems.length;
			}
		}
		function _(aId) {
			return _[aId].apply(_, [].slice.call(arguments).slice(1));
		}
		_[1] = _.Handle = handle;
		_[2] = _.SetData = _.data = function (aItems, aPage, aPerPage) {
			if (aItems) {
				handle.Page = 1;
				if (0 < aPage)
					handle.Page = 0|aPage;
				if (0 <= aPerPage)
					handle.PerPage = 0|aPerPage;
				SetData(aItems);
				UpdatePage();
			}
			return handle;
		};
		_[3] = _.Update = function (aUpdateHandler) {
			handle.UpdateHandlers.push(aUpdateHandler);
		};
		_[4] = _.MaxPage = function () {
			return Math.ceil(handle.ItemsLen/handle.PerPage);
		};
		_[5] = _.Next = function () {
			if (handle.Page < _.MaxPage(handle))
				handle.Page += handle.PageStep, UpdatePage();
		};
		_[6] = _.Back = function () {
			if (handle.Page > 1)
				handle.Page -= handle.PageStep, UpdatePage();
		};
		_[7] = _.At = function (aPageNum) {
			aPageNum |= 0;
			if (aPageNum != handle.Page && aPageNum <= _.MaxPage()) {
				handle.Page = aPageNum;
				return UpdatePage();
			}
		};
		_[8] = _.PageStep = function (aPageStep) {
			handle.PageStep = Math.abs(aPageStep);
		};
		_[9] = _.PerPage = function (aPerPage) {
			handle.PerPage = Math.abs(aPerPage);
			return UpdatePage();
		};
		_[10] = _.AddEvents = function (aConf) {
			// aConf{BtnBack, BtnNext, TbPage, TbPerPage, TbPageStep}
			// aConf{LbPageNum, LbPageMax, LbPageItemsLen, LbItemsLen}
			// aConf{Update(), Page(), PerPage(), PageStep()}
			var x;
			function Update() {
				if (aConf.Update) aConf.Update.apply(_, [_, aConf, _.Handle]);
			}
			if (x = aConf.BtnBack)
				for (var i = 0, L = x.length; i < L; i++)
					x[i].addEventListener("click", function () {
						_.Back(), Update();
					});
			if (x = aConf.BtnNext)
				for (var i = 0, L = x.length; i < L; i++)
					x[i].addEventListener("click", function () {
						_.Next(), Update();
					});
			if (x = aConf.TbPage)
				for (var i = 0, L = x.length; i < L; i++)
					x[i].addEventListener(x[i].type == "number" ? "change" : "keyup", function () {
						_.At(this.value), Update();
					});
			if (x = aConf.TbPageStep)
				for (var i = 0, L = x.length; i < L; i++)
					x[i].addEventListener(x[i].type == "number" ? "change" : "keyup", function () {
						_.PageStep(this.value), Update();
					});
			if (x = aConf.TbPerPage)
				for (var i = 0, L = x.length; i < L; i++)
					x[i].addEventListener(x[i].type == "number" ? "change" : "keyup", function () {
						_.PerPage(this.value), Update();
					});
			// Update UI
			_.Update(function () {
				if (x = aConf.LbPageNum) for (var i = 0, L = x.length; i < L; i++)
					x[i].innerHTML = _.Handle.Page;
				if (x = aConf.LbPageMax) for (var i = 0, L = x.length; i < L; i++)
					x[i].innerHTML = _.MaxPage();
				if (x = aConf.LbPageItemsLen) for (var i = 0, L = x.length; i < L; i++)
					x[i].innerHTML = _.Handle.PageItems.length;
				if (x = aConf.LbItemsLen) for (var i = 0, L = x.length; i < L; i++)
					x[i].innerHTML = _.Handle.ItemsLen;
			});
			Update(), UpdatePage();
		};
		if (aEvents) _.AddEvents(aEvents);
		SetData(aItems), UpdatePage();
		return _;
	};
};
