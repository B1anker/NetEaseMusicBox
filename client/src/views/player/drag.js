class Drag {
	constructor(options) {
		this.el = options.el;
		this.point = options.point;
		this.bar = options.bar;
		this.barEl = this.el.querySelector('.' + this.bar);
		this.pointEl = this.barEl.querySelector('.' + this.point);
		this.halfPointWidth = Math.round(this.pointEl.offsetWidth / 2);
		this.offset = Math.round((320 - this.barEl.offsetWidth) / 2);
		this.boundary = options.boundary;
		this.init();
	}

	init() {
		this.addEvent('touchmove', this.drag);
	}

	addEvent(type, fn) {
		this.el.addEventListener(type, fn.bind(this), false);
	}

	start(fn) {
		this.addEvent('touchstart', fn);
	}

	drag(e) {
		e.preventDefault();
		if(e.target.className.search(this.point) === -1){
			return;
		}
		let position = e.touches[0];
		if (position.clientX > this.boundary.max) {
			e.target.style.left = this.boundary.max - this.offset - this.halfPointWidth + 'px';
			return;
		} else if (position.clientX < this.boundary.min) {
			e.target.style.left = this.boundary.min - this.offset - this.halfPointWidth + 'px';
			console.log(this.offset);
			return;
		}
		e.target.style.left = position.clientX.toFixed(2) - this.offset - this.halfPointWidth + 'px';
	}

	end(fn) {
		this.addEvent('touchend', fn);
	}
}

export default Drag;
