// experimental, used for async operations
function deft(aMaxValue, aFunc, aFunc2, aNoWarning) {
	var vSelf = deft;
	// Predefine vSelf.Warning value if undefined
	if (void 0 === vSelf.Warning)
		vSelf.Warning = "deft: Error appears if no delay between each iteration.\r\nWays to Disable this warning:\r\nCounter.Warning=0\r\naNoWarning=1\r\naMaxValue to be negative";
	// Feature: if aMaxValue is negative, disable warning
	if (aMaxValue < 0)
		aNoWarning = aMaxValue = -aMaxValue;
	// Feature: if vSelf.Warning is negative value, disable warning
	if (!vSelf.Warning)
		aNoWarning = 1;
	// Both typeof and instanceof are necessary, unless you don't know why.
	var vApplyN = "number" === typeof aFunc2 || aFunc2 instanceof Number;
	if (!aMaxValue || !("function" === aFunc || aFunc instanceof Function))
		return false;
	// Date.now() is not executed if aNoWarning is zero value
	var vStartDate=!aNoWarning && Date.now();
	(function N(aIndex) {
		// this can be function
		function _() {
			if (aMaxValue > ++aIndex)
				N(aIndex);
		}
		// and this can be Number!
		_.valueOf = function () { return vCI; };
		var vCI = aIndex;
		if (vApplyN) vCI = aFunc2 + vCI;
		else if (aFunc2) vCI = aFunc2(vCI);
		// Display warning once if aNoWarning is zero value
		if (!aNoWarning && 0 === Date.now() - vStartDate)
			console.warn(vSelf.Warning), aNoWarning=1;
		// Call main func
		if (aFunc.call(_, vCI, _)) _();
	})(0);
}
if (0) // function required
deft(2, function () {
	// there's different approach, if scared of "this"
	console.log("?i=" + this);
	// async HTTP request:
	$.get("?i=" + this, this);
});