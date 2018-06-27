/*react-redux原理*/

/*createStore创建redux容器*/

import vote from "../store/reducer/vote";
import personal from "../store/reducer/person";

function createStore(reducer) {
    /*@params:
       reducer是个函数
     @return：store对象：{
         getState,
         dispatch,
         subscribe
     }*/
    // 创建store， state用来存储管理的状态信息，listenAry存储事件池中的方法
    // state不用设置默认值，没有值，走的是reducer中赋值的默认值信息，我们自己会在创建容器的时候就把dispatch执行一次

    let state, listenAry = [];

    /*基于dispatch实现任务派发*/
    function dispatch(action) {
        /*1、执行reducer,修改容器中的状态信息(接收reducer的返回值，把返回的信息替换原有的state)，值得注意的是，我们是把返回值全部替换state，
        * 所以要求reducer中在修改状态之前，要先把原始的状态信息克隆一份(防止没修改的state也替换掉state ={...state,n:100})，再进行单个的属性修改
        */
        state = reducer(state, action);
        /*2、容器中状态信息经过reducer的listenAry执行*/
        for (let i = 0; i < listenAry.length; i++) {
            let item = listenAry[i];
            if (typeof item === 'function') {
                item();
            }else{
                /*因为可能是subscribe中解绑，所以有可能是null*/
                listenAry.splice(i,1);
                i--;
            }
        }
    }

    dispatch({type: '_INIT_DEFAULT_STATE'});  // 创建容器的时候执行一次dispatch，目的是吧reducer中的默认状态信息赋值给redux容器中的状态

    /*getState：获取容器中的状态信息*/
    function getState() {
        /*1、我们需要保证返回的状态信息不能和返回的state是同一个堆内存，否则外面获取状态信息后，直接可以修改容器中的状态了（store.getState.n=222），这不符合dispatch->redcucer才能改状态的规范
        *浅克隆：
        * {AA:BBFF111}
        * {...state}=>AAAFF222:{vote:BBFF111} 外面的地址不一样了，但是里面的地址还是和原来的共用一个地址
        *深度克隆：JSON.stringify(state)
        */
        return JSON.parse(JSON.stringify(state));  //深度克隆对象
        /*let obj ={
            vote:{
                n:0,
                m:0
            }
        }*/
    }

    /*subscribe:向事件池中添加方法*/
    function subscribe(fn) {
        // 1.向容器中追加方法（重复验证）
        let isExit = listenAry.includes(fn);
        !isExit ? listenAry.push(fn) : null;
        /*2、返回一个方法，执行返回的方法会把当前绑定的方法在事件池中移除掉*/
        /*let unsubscribe = store.subscribe(fn);
            unsubscribe()   解绑*/
        return function unsubscribe() {
          let index = listenAry.indexOf(fn); // 找到fn的索引，
          //listenAry.splice(index,1);   // 可能会引发数组塌陷，
          listenAry[index] = null;
        }
    }

    return {
        dispatch,
        getState,
        subscribe
    }
}
/*
let reducer = (state = {}, action) => {
    // state: 原有的状态信息
    //  action：dispatch派发任务的时候传递的行为对象

    /!*根据action.type的不一样，执行不同的state操作 *!/
    switch (action.type) {
        // ...
        case 'type_xxx':
            state ={...state,n:100};
    }
    return state;  // 替换原来的state
};
let store = createStore(reducer); // 虽然传递进来reducer,但是并没有执行reducer，只有dispatch的时候才执行，通过reducer修改容器中的状态
*/

/*
* combineReducers：用来合并reducer
* @params：{
*   // 对象中包含了每一板块对象的reducer  {xxx:function reducer...}
*  }
* @return
*   返回的是一个新的reducer函数（把这个值赋值给createStore）
*
* 特殊处理：合并reducer之后，redux容器中的state也变成以对应对象管理的模式：=> {xxx:{}...}
*/
function combineReducers(reducers) {
    /*reducers:传递进来的reducer对象集合*/
    /*{
    *vote:function(state={},action){},
    * person:function(state={},action){}
    *}
    */
    return function reducers(state={},action) {
        /*dispatch派发执行的时候，执行的是返回的reducer，这里也要返回一个最终的state对象，替换原有的state，而且这个state中包含每个模块的状态信息
        * =>{vote:xxx,person:xxx}
        * 我们所谓的reducer合并,其实就是dispatch派发的时候，把每一个模块的reducer都单独执行一遍，把每个模块返回的状态最后汇总在一起，替换容器中的状态信息*/
        let newState = {};
        for (let key in reducers){
            if(!reducers.hasOwnProperty(key)) break;
            /*reducers[key]:每个模块单独的reducer
            * state[key]:当前模块在redux容器中的存储的状态信息
            * 返回值是当前模块最新的状态，把它再放到newState中*/
            newState[key] = reducers[key](state[key],action);
        }
        return newState
    }
}

/*let reducer = combineReducers({
    vote,
    personal
});*/



