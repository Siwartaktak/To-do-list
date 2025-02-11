# To-Do List with Timer (Flask)

A simple To-Do List web application built using Flask and JavaScript. It allows you to add tasks, specify time for tasks, start a timer for each task, and manage tasks (edit, delete). The app offers a clean and intuitive interface for users to track their tasks and manage their productivity.

## Features
- Add new tasks with a specified time duration.
- Start a timer for each task to track how long it takes to complete.
- Edit or delete tasks as needed.
- Responsive design that works on both desktop and mobile.
- Task list that dynamically updates based on user actions.

## Requirements

- Python 3.x
- Flask
- JavaScript (for the timer functionality)
- Bootstrap (for styling)

## Installation
1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Siwartaktak/To-do-list.git

 2. Navigate to the project folder
cd To-do-list

3. Set up a virtual environment (optional but recommended)
python -m venv venv
Activate the virtual environment:
On Windows:
venv\Scripts\activate

On macOS/Linux:
source venv/bin/activate

4. Install the required dependencies
pip install -r requirements.txt

5. Running the Application
To run the Flask application locally, use the following command:
python app.py
This will start the server at http://127.0.0.1:5000/.

Open the URL in your browser to access the To-Do List application.


## Project Structure:
To-do-list/
├── app.py                # Main Flask application
├── static/
│   ├── css/              # CSS files for styling
│   ├── js/               # JavaScript files (for timer and other functionalities)
├── templates/
│   ├── index.html        # Main HTML template for the To-Do List page
└── requirements.txt      # Python dependencies

