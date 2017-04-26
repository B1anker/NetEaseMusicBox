import Ls from '@/modules/utils/localStorage';

const ls = new Ls();

const playList = {
	methods: {
		setList(id, index) {
			ls.set('playLists', {
				id,
				index
			});
			this.$store.dispatch('setLists', {
				id,
				index
			});
		}
	}
}

export default playList;
