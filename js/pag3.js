// This is free and unencumbered software released into the public domain.
// License: Unlicense
// For more information, please refer to <http://unlicense.org/>
// Clean code = bad optimization
var Paginator = new function () {
	var _ = this, mArray;
	// aDataConf[0 dataType [0 array, 1 obj], 1 arrayOrObject]
	_[0] = _.Create = function (aDataConf, aPerPage, aPageNum, aFnUpdateUI, aFnBeforeResolve) {
		var cArray,
			ret = {},
			ArrayLen = 0,
			PageNum = 1, PerPage = 1, PageCount = 1,
			zzz = 0;
		function ResolveData(aDataConf, aPageNum, aPerPage) {
			if (aDataConf[0]) {
				cArray = [];
				for (var n in aDataConf[1])
					cArray.push([n, aDataConf[1][n]]);
				mArray = cArray;
			} else mArray = aDataConf[1];
			ArrayLen = mArray.length;
			PageNum = ResolvePageNum(0|aPageNum);
			PerPage = Math.abs(0|aPerPage);
			if (1 > PerPage) PerPage = 1;
			PageCount = Math.ceil(ArrayLen/PerPage);
			ret.Update();
		}
		function ResolvePageNum(aPageNum, aCallUpdate) {
			var flag1 = aPageNum > 0 && aPageNum <= PageCount;
			if (aPageNum != PageNum && flag1)
				PageNum = aPageNum;
			if (flag1 && aCallUpdate)
				ret.Update();
			return PageNum;
		}
		// etc
		ret[0] = ret.PageNum = ret.pageNum = ret.Page = ret.page = function (aPageNum) {
			return ResolvePageNum(aPageNum, 1);
		};
		ret[1] = ret.PageCount = ret.pageCount = function () {
			return PageCount;
		};
		ret[2] = ret.PerPage = ret.perPage = ret.per = function (aPerPage) {
			var nPP = Math.abs(0|aPerPage);
			if (nPP !== PerPage && nPP >= 1)
				ret.Update(PerPage = nPP);
		};
		ret[3] = ret.Data = ret.data = ret.Items = ret.items = ResolveData;
		ret[4] = ret.Next = ret.next = ret.Forward = ret.forward = function () {
			return ret.PageNum(++PageNum);
		};
		ret[5] = ret.Prev = ret.Prev = ret.Back = ret.back = function () {
			return ret.PageNum(--PageNum);
		};
		ret[6] = ret.Update = function () {
			// Call upper Update
			if (aFnUpdateUI) {
				var tArray = mArray.slice((PageNum-1)*PerPage, PerPage+(PageNum-1)*PerPage);
				aFnUpdateUI(tArray, tArray.length, PerPage, PageNum, PageCount, ArrayLen);
			}
		};
		aFnBeforeResolve && aFnBeforeResolve();
		ResolveData(aDataConf, aPageNum, aPerPage);
		return ret;
	};
};
