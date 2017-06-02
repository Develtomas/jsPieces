class Task {
	constructor(title = Task.getDefauTitle()) {
		this.title = title;
		this._done = false;
		Task.count += 1;
		console.log('task creation');
	}

	get done() {
		return this._done === true ? 'Done' : 'In progress';
	}

	set done(value) {
		if (value !== undefined && typeof value === 'boolean') {
			this._done = value
		}
		else {
			console.log('enter true or false');
		}
	}

	complete() {
		this._done = true;
		console.log(`task ${this.title} выполнена`);
	}

	static getDefauTitle() {
		return 'Task';
	}
}

let task = new Task('убрать'); //передаем в свойства
console.log(task._done);
Task.count = 0; //счетчик растет от колва объектов

// console.log(Task.count);
// task.complete();


