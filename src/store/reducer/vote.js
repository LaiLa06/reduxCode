import * as TYPE from '../action-types';
/*
*1、如果redux中原有的状态不存在，我们会设置一个初始值
*/

export default function vote(state = {
    title: '标题',
    n: 0,
    m: 0
}, action) {
    switch (action.type) {
        case TYPE.VOTE_SUPPORT:
            state = {...state, n: state.n + 1};
            break;
        case TYPE.VOTE_AGAINST:
            state = {...state, m: state.m + 1};
            break;
        case TYPE.VOTE_INIT:
            // 初始化的时候action行为对象中可能不仅有TYPE，而且还有其他需要初始化的信息值，例如：{TYPE:...,TITLE:xxx,N:xxx,M:xxx}
            /*state={...state};
            for(let key in obj){
              if(obj.hasOwnProperty(key)){
                if(key==='type') continue;
                state[key]=action[key]
              }
            }*/
            delete action.type;
            state = {...state,...action};
            break;
        default:
            break;
    }
    return state;   // 返回你修改的状态，替换原来的
}

