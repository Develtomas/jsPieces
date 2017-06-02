'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
	function Task() {
		var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Task.getDefauTitle();

		_classCallCheck(this, Task);

		this.title = title;
		this._done = false;
		Task.count += 1;
		console.log('task creation');
	}

	_createClass(Task, [{
		key: 'complete',
		value: function complete() {
			this._done = true;
			console.log('task ' + this.title + ' \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430');
		}
	}, {
		key: 'done',
		get: function get() {
			return this._done === true ? 'Done' : 'In progress';
		},
		set: function set(value) {
			if (value !== undefined && typeof value === 'boolean') {
				this._done = value;
			} else {
				console.log('enter true or false');
			}
		}
	}], [{
		key: 'getDefauTitle',
		value: function getDefauTitle() {
			return 'Task';
		}
	}]);

	return Task;
}();

var task = new Task('убрать'); //передаем в свойства
console.log(task._done);
Task.count = 0; //счетчик растет от колва объектов

// console.log(Task.count);
// task.complete();