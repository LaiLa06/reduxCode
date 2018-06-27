import {combineReducers} from 'redux'
import vote from './vote'
import personal from './person'

/*合并的时候，为了保证每一个板块管理的状态信息不冲突，在redux中按照指定的名称单独划分板块的状态
* vote:{
*  title:'',
*  n:0,
*  m:0
* },
* xxx:{
*    // 以合并时候指定的属性名为主，作为最后划分管理的名字
* }
* */

let reducer = combineReducers({
  vote,
  personal
});

export default reducer

