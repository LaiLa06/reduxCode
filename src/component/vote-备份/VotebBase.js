import React from 'react'
import action from '../../store/action'

export default class Banner extends React.Component{
    constructor(props){
        super(props);
        /*真实项目中我们会把redux容器中的状态信息获取到，赋值给组件的状态或者是属性（react-redux），这么做的目的：当redux中的状态改变，我们可以修改组件内的状态，
        从而使组件重新渲染*/
        let reduxState = this.props.store.getState().vote;
        this.state = {
            ...reduxState    // 包含title、n、m在内的所有管理的属性
        }
    }
    // 在第一次加载执行，通过行为派发（VOTE_INIT）把redux中的信息赋值初始值
    componentWillMount(){
      this.props.store.dispatch(action.vote.init({
          //派发这个操作是同步的
          title:'毕加索 VS 毕减索',
          n:0,
          m:10
      }));
        let reduxState = this.props.store.getState().vote;
        this.setState({
            ...reduxState
        })
    }
    componentDidMount(){
        this.props.store.subscribe(()=>{
            let reduxState = this.props.store.getState().vote;
            this.setState({
                ...reduxState
            })
        })
    }
    render(){
        return <div className={'panel panel-default'}>
          <div className={'panel-heading'}>
              <h3 className={'panel-title'}>{this.state.title}</h3>
          </div>
          <div className={'panel-body'}>
              支持人数：<span>{this.state.n}</span>
              <br/><br/>
              反对人数：<span>{this.state.m}</span>
          </div>
        </div>
    }
}