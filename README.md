# My Project

This was a project for Sparta GYM. Its aim is to provide comprehensive management to the company regarding its courses, schedules, reservations, and attendances.
It was developed using Python with Django for the backend, Django Rest Framework for API creation, and JavaScript with React and Redux for frontend handling and state management.

## Installation

Download the repository.
Open a command prompt and navigate to the project's base directory, `cd Gestion-sparta-gym`.
Install Virtualenv to create a virtual environment for installing dependencies; you can do this with `python -m virtualenv venv`.
Execute the command `pip install -r requirements.txt` this will download the necessary libraries for the project to function.
Once the backend dependencies are installed, navigate to the Frontend directory with `cd Frontend` and run `npm install` this will install React, Redux, and other libraries used in the project.

## Usage
![image](https://github.com/LucasMazzarino/Gestion-sparta-gym/assets/97771009/5671db06-ea5f-4f1a-a78a-dd3d9f270bc6)

In the administration panel, you have complete control over the management of the given classes, each class having its respective Inline classes to enhance the administrator's usability dynamic
![image](https://github.com/LucasMazzarino/Gestion-sparta-gym/assets/97771009/e55790d5-15a7-4ff7-9ff9-20f5649f5450)

When adding, deleting, or updating any data in the backend, it will automatically reflect in the frontend unless specified in the administration panel to hide recently added or modified information. The panel provides an option to show or hide information on the frontend according to preference.

The application also features Soft Delete to securely safeguard user information. When deleting a user, course, or payment, this information will be removed from the administration panel but not from the database; instead, it will be concealed to prevent the deletion of sensitive data. Deleting information from the database will require an additional confirmation will be required if you really want to delete this information.

![image](https://github.com/LucasMazzarino/Gestion-sparta-gym/assets/97771009/629af6cb-1f36-4e90-8986-08a38773ca0f)
When a new client registers, an account will be created automatically so that they can start the section. Only administrators and clients can start the section. Depending on who registers, relevant information will be shown.
-If you are an administrator, 2 buttons will be enabled. One to see a graph with income and another to see the clients' account status.
-If you are a client, a button will be displayed allowing them to reserve a time slot in the registered course. If the selected time slot is fully booked, it won't be shown as available."

![image](https://github.com/LucasMazzarino/Gestion-sparta-gym/assets/97771009/6636aba0-82f3-463f-a048-392fbc47ac22)



