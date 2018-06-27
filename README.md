 
### 这个项目是以投票demo学习redux和react-redux的使用和原理
>vote-备份 index-备份      -----是由redux实现的投票管理
vote index    -----是react-redux实现的投票管理
myRedux是基于redux的源码思想，自己重写的方法：
其实redux.js 解决了react的一些bug，比如：

store.getState()  //获取最新状态，react源码中是直接返回一个对象，因为对象是引用数据类型
在外界使用这个方法的时候后，可以基于store.getState().n = 100 (n存储的状态值) 修改，
这跟react源码中只能根据dispatch进行事件派发的思想不一样，所以是个bug，解决办法是深度克隆
return JSON.parse(JSON.stringify(state));
还有一个在执行subscribe中时候会返回一个函数，这个函数可以会把当前绑定的方法在事件池中移除掉，
，源码中xxx.splice(index,1);  （xxx是个数组，存储事件池中的方法），这样有可能会造成数组塌陷问题
这个时候如果正好有事件派发，会导致有方法不能执行，最后的做法是xxx[index] = null;
在事件池中的方法执行的时候，判断是否是函数，是就执行，不是就立即删除此项