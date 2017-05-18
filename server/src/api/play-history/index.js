import setHistoryApi from './set';
import getHistoryApi from './get';

export default {
	routes: [setHistoryApi.routes(), getHistoryApi.routes()],
	methods: [setHistoryApi.allowedMethods(), getHistoryApi.allowedMethods()]
};
