import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import VoteBase from './component/vote/VoteBase'
import VoteHandle from './component/vote/VoteHandle'
import store from './store'
import {Provider} from 'react-redux'

/*react-redux是把redux进一步封装，适配react项目，让redux操作更简洁
* store文件夹中的内容和redux一模一样
* 在组件调取使用的时候可以优化一些步骤
* 1、Provider 根组件
*  当前整个目录都在Provider组件下，作用就是把创建的store可以供内容任何后代组件使用（基于上下文）
*  => 组件中只允许出现一个子元素
*  => 把创建的store基于属性传递给Provider（这样后代组件中就可以使用这个store了）
* 2、connect  高阶组件
*/



ReactDOM.render(<Provider store={store}>
    <section className={'panel panel-default'} style={{width:'80%',margin:'20px auto'}}>
        <VoteBase/>
        <VoteHandle/>
    </section>
</Provider>, document.getElementById('root'));
