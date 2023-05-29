// etc
function deft(aConf, aFnIter, aFnDone) {
	// aConf[max|array]
	// aConf[start, max|array]
	var mArray, maxIndex, curIndex = 0,
		cLen = aConf && aConf.length,
		diff = -1 + cLen;
	// Resolve
	if (1 > (cLen |= 0))
		return false;
	// Assign start index if 2 args
	if (1 < cLen)
		curIndex = 0 | aConf[0];
	// Assign max index
	if (maxIndex = aConf[diff].length)
		--maxIndex, mArray = aConf[diff];
	else maxIndex = --aConf[diff];
	// Resolve max index
	maxIndex |= 0;
	// Resolve negative start index
	if (mArray && 0 > curIndex)
		if (0 > (curIndex = 1 + curIndex + maxIndex))
			curIndex = 0;
	// etc
	!function _() {
		if (curIndex > maxIndex)
			return void (aFnDone && aFnDone());
		_[0] = _.i = _.Index = _.index = curIndex;
		_[1] = _.v = _.Value = _.value = mArray && mArray[_.i] || _.i;
		aFnIter.call(_, _, _.v, curIndex++, mArray, maxIndex);
	}();
}
