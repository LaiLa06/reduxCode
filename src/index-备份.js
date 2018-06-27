import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import VoteBase from './component/vote/VoteBase'
import VoteHandle from './component/vote/VoteHandle'
import store from './store'



ReactDOM.render(<section className={'panel panel-default'} style={{width:'80%',margin:'20px auto'}}>
  <VoteBase store={store}/>
  <VoteHandle store={store}/>
</section>, document.getElementById('root'));

