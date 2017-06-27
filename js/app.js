(function (angular) {
	'use strict';

	angular
		// 创建模块
		.module('todoApp', [])
		// 创建控制器
		.controller('TodoController', ['$scope', TodoController]);


	// 控制器函数
	function TodoController($scope) {
		var vm = $scope; // vm 就是视图模型
		// 代码写在此处！

		// 1 展示任务列表
		// 根据视图，抽象数据结构
		// 	id 用来确定唯一一条数据
		//  name 表示当前任务名称
		//  isCompleted 表示当前任务是否完成
		var todoList = [
			{ id: 1, name: '抽烟', isCompleted: false },
			{ id: 2, name: '喝酒', isCompleted: false },
			{ id: 3, name: '烫头', isCompleted: true },
		];
		// 给view提供数据
		vm.todoList = todoList;

		// 2 添加任务

		// 任务名称
		vm.taskName = '';
		vm.add = function () {
			// 判断任务名称是否为空
			if (vm.taskName.trim() === '') {
				return;
			}

			// 处理id
			var id;
			if (todoList.length === 0) {
				// 如果数组中没有数据，那么，id就是1
				id = 1;
			} else {
				// 思路：获取到数组最后一项的id，再加1就是当前要添加的id
				id = todoList[todoList.length - 1].id + 1;
			}

			todoList.push({ id: id, name: vm.taskName, isCompleted: false });
			// 清空文本框（清空 taskName 属性的值）
			vm.taskName = '';
		};

		// 3 删除一条任务
		vm.del = function (id) {
			// 思路：只需要将当前id对应的数据，从数组中移除就可以了！
			for (var i = 0; i < todoList.length; i++) {
				if (todoList[i].id === id) {
					todoList.splice(i, 1);
					break;
				}
			}
		};

		// 4 修改任务
		// 
		// editingId 用来保存当前编辑项的id，默认值为：-1，这样，所有数据的id
		// 与默认值都不相同，即：页面渲染的时候，都是非编辑状态
		vm.editingId = -1;
		// edit() 方法，让当前元素出现编辑状态
		vm.edit = function (id) {
			// 目的：双击哪个元素，就给这个元素所属的li元素添加 editing 类
			// 思路：将当前点击元素的id，赋值为 editingId。赋值以后，ng-class中的
			// 		editing: todo.id === editingId 成立，那么，就会给当前元素添加一个 editing 类
			vm.editingId = id;
		};
		// 更新保存数据
		// 因为数据是 双向绑定 的，所以，不用处理数据
		// 只需要让当前项，变为只读状态即可！（也就是：移除 editing）
		// 也就是：editing: todo.id === editingId 不成立
		vm.update = function () {
			vm.editingId = -1;
		};

		// 5 切换任务选中状态(单个或批量)
		//	5.1 单个任务状态的切换，直接通过 ng-model 的双向绑定，就已经实现了
		// 	5.2 批量修改任务状态，根据按钮的自身的选中状态，来控制所有其他任务状态
		// 		  a. 获取到当前全选按钮的选中状态（ng-model）
		// 			b. 遍历数据源，将所有任务的状态修改为与当前全选按钮的状态
		vm.isCheckAll = false;
		vm.checkAll = function () {
			todoList.forEach(function (todo) {
				todo.isCompleted = vm.isCheckAll;
			});
		};

		// 6 清除已完成任务
		vm.clearCompleted = function () {
			// 思路：遍历数据源，将已完成的任务删除（从数组中删除元素有个坑）
			// 			直接将未完成的任务保存起来
			var tempArr = [];
			for (var i = 0; i < todoList.length; i++) {
				var todo = todoList[i];
				if (!todo.isCompleted) {
					tempArr.push(todo);
				}
			}

			// 将 未完成任务数组赋值给 vm，这样的话，vm中的 todoList 才会发生变化！
			vm.todoList = tempArr;
		};

		// 6.1 处理清除任务按钮的显示和隐藏
		// 思路：判断一下数组中有没有已完成的任务，如果有，就展示 清除按钮；否则，隐藏
		vm.isShow = function() {
			// every / some
			return todoList.some(function(todo) {
				if( todo.isCompleted ) {
					return true;
				}
			});

			// 使用 for循环
			/*var ret = false;
			for(var i = 0; i < todoList.length; i++) {
				if(todoList[i].isCompleted) {
					ret = true;
					break;
				}
			}
			return ret;*/
		};

	}

})(angular);