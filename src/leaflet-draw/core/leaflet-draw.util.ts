export class LeafletDrawUtil {

	/**
	 * Deep copy the source object into the dest object. Will only copy literal values.
	 * @param dest
	 * @param src
	 */
	static deepLiteralCopy<T>(dest: T, src: any): T {
		const toReturn: T = dest;

		if (null != src) {
			for (const k in src) {

				if (src.hasOwnProperty(k)) {
					if (typeof (src[k]) === 'string' || src[k] instanceof String) {
						toReturn[k] = src[k];
					} else {
						this.deepLiteralCopy(toReturn[k], src[k])
					}
				}

			}
		}

		return toReturn;
	}


}
