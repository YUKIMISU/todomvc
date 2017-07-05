(function (angular) {

  // 创建服务模块
  //  用于处理 任务列表 中所有数据的操作（CRUD）

  angular
    .module('todoApp.service', [])
    .service('TodoService', TodoService);

  function TodoService() {
    // console.log('服务的逻辑代码');
    var todoList = [
      { id: 1, name: '抽烟', isCompleted: false },
      { id: 2, name: '喝酒', isCompleted: false },
      { id: 3, name: '烫头', isCompleted: true },
    ];

    // 1 暴露获取数据的方法
    this.getData = function () {
      return todoList;
    };

    // 2 暴露添加数据的方法
    this.addData = function ( taskName ) {
      // 处理id
      var id;
      if (todoList.length === 0) {
        // 如果数组中没有数据，那么，id就是1
        id = 1;
      } else {
        // 思路：获取到数组最后一项的id，再加1就是当前要添加的id
        id = todoList[todoList.length - 1].id + 1;
      }

      todoList.push({ id: id, name: taskName, isCompleted: false });
    };

    
  }

})(angular);