function RF3(aX) {
	if (0 == aX) return 1;
	for (var vR = aX, vI = 0; ++vI < 3; )
		vR *= aX + vI;
	return vR;
}

function ResolvePI() {
	// only ~262130 iterations
	// cannot exceed it
	for (var vR = 3, vSign=1, vI = 1; vI < 262130; vI += 2) {
		vR += vSign * (4 / RF3(1 + vI));
		vSign *= -1;
	}
	return vR;
}
if (0) console.log(ResolvePI());
