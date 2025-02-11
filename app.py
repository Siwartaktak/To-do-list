<<<<<<< HEAD
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

tasks = []  # List to hold tasks temporarily

@app.route('/')
def index():
    return render_template('todo_list.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.form['task']
    time = request.form['time']
    tasks.append({'task': task, 'time': time, 'completed': False})
    return jsonify({'status': 'Task added'})

@app.route('/toggle_task', methods=['POST'])
def toggle_task():
    index = int(request.form['index'])
    tasks[index]['completed'] = not tasks[index]['completed']
    return jsonify({'status': 'Task toggled'})

@app.route('/delete_task', methods=['POST'])
def delete_task():
    index = int(request.form['index'])
    tasks.pop(index)
    return jsonify({'status': 'Task deleted'})

@app.route('/update_task_time', methods=['POST'])
def update_task_time():
    index = int(request.form['index'])
    elapsed_time = int(request.form['elapsedTime'])
    tasks[index]['time_spent'] = elapsed_time
    return jsonify({'status': 'Time updated'})

@app.route('/edit_task', methods=['POST'])
def edit_task():
    index = int(request.form['index'])
    task = request.form['task']
    time = request.form['time']
    tasks[index]['task'] = task
    tasks[index]['time'] = time
    return jsonify({'status': 'Task updated'})

if __name__ == '__main__':
    app.run(debug=True)
=======
 
>>>>>>> 0d71122b11ffe7c96faec4fd0c60149895fd93ee
