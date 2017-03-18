import Message from './message.vue';

export default (Vue, $root) => {
	Vue.set($root, 'RADON_Message', [])
	Vue.component('message', Message)
	Vue.prototype.$message = {
		remove(item, duration) {
			setTimeout(() => {
				$root.RADON_Message.$remove(item)
			}, duration)
		},
		create(type, title, content, duration) {
			let item = {
				type: type,
				title: title,
				content: content
			}
			$root.RADON_Message.push(item)
			if (duration) {
				this.remove(item, duration)
			}
		},
		success(title, content, duration) {
			this.create('success', title, content, duration)
		},
		info(title, content, duration) {
			this.create('info', title, content, duration)
		},
		warning(title, content, duration) {
			this.create('warning', title, content, duration)
		},
		failed(title, content, duration) {
			this.create('failed', title, content, duration)
		}
	}
}
