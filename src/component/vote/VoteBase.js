import React from 'react'
import action from '../../store/action'
import {connect} from 'react-redux'
/*相对于传统的redux我们做的步骤优化
   * 1、导出的不再是我们创建的组件，而是基于基于connect构建后的高阶组件
   * export default connect([initMapStateToProps],[initMapDispatchToProps])([自己创建的组件])
   * 2、react-redux帮我们做：以前需要我们自己基于subscribe向事件池追加方法，以达到容器状态信息改变，执行我们追加的方法，重新渲染组件的目的，但是现在不用了，
   * 它帮我们做了：“所有用到redux容器状态信息的组件，都会向事件池中追加一个方法，当状态信息改变，通知方法执行，把最新的状态信息作为属性传递给组件，组件的属性值改变了，
   * 组件也会重新渲染”
   */
class VoteBase extends React.Component{
    constructor(props){
        super(props);
        // console.log(this.props);
    }
    componentWillMount(){
        this.props.init({
            title:'我长的帅不帅',
            n:0,
            m:100
        })
    }
    render(){
        let {title,n,m} = this.props;
        return <div className={'panel panel-default'}>
          <div className={'panel-heading'}>
              <h3 className={'panel-title'}>{title}</h3>
          </div>
          <div className={'panel-body'}>
              支持人数：<span>{n}</span>
              <br/><br/>
              反对人数：<span>{m}</span>
          </div>
        </div>
    }
}

// 常规做法

// 把redux容器中的状态信息遍历，赋值给当前组件的属性
/*let mapStateToProps = state =>{
    // state：redux容器中的状态信息
    // 我们返回的是啥，就把它挂载到当前组件的属性上（redux存储很多信息，我们想用啥就返回啥即可）
    return {
        ...state.vote    // 把vote中所需要的state挂载在当前组件的属性上
    }
};

// 把redux中的dispatch派发行为遍历，也赋值给组件的属性（ActionCreator）
let mapDispatchToProps = dispatch =>{
    /!*dispatch:store中存储的dispatch信息
    * => 返回的是啥，就相当于把啥挂载到组件的属性上（一般我们挂载一些方法，这些方法中完成了dispatch派发任务操作）*!/
    return{
        init(initData){
            dispatch(action.vote.init(initData))
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(VoteBase)*/

// 简化写法
export default connect(state=>({...state.vote}),action.vote)(VoteBase)   //action.vote这个是把vote所有的方法都挂上了，常用写法可以需要啥就刮啥

/*
react-redux帮我们做一件事，把actionCreator中编写的方法（返回action对象的方法），自动构建成dispatch派发任务的方法，也就是mapDispatchToProps这种格式
*/
