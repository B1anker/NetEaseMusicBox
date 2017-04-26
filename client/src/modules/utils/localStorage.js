class Ls {
	constructor() {

	}

	get(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	set(key, params) {
		const origin = this.get(key);
		localStorage.setItem(key, JSON.stringify(Object.assign(origin, params)));
	}
}

export default Ls;
