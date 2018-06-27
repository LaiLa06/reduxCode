import React from 'react'
import action from '../../store/action'

export default class Banner extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={'panel-footer'}>
           <button className={'btn btn-success'} onClick={()=>{
               this.props.store.dispatch(action.vote.support())
           }}>支持</button>
           <button className={'btn btn-danger'} style={{marginLeft:'20px'}} onClick={()=>{
               this.props.store.dispatch(action.vote.against())
           }}>反对</button>
        </div>
    }
}