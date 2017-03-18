import messageInstall from './main';
function install(Vue, options = {
	Message: true
}) {
	const RADON_EVENT_BUS = new Vue({
		data() {
			return {
				RADON_Message: null
			}
		}
	});
	window.RADON_EVENT_BUS = RADON_EVENT_BUS;
	const Init = (vm) => {
		if (options.Message) {
			messageInstall(Vue, vm);
		}
	}
	Init(RADON_EVENT_BUS);
};
export default install;
