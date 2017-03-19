import request from 'request'
import { origin, globalOption } from '../config'
import { deepCopy, fetchData } from '../util'

const song = (id) => {
  const option = deepCopy(globalOption);
  const url = `${origin}/api/song/detail?ids=%5B${id}%5d`;
  const method = 'GET';
  Object.assign(option, { url, method });
  return fetchData(option);
}
export default song;
