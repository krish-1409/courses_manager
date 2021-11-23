<h1 align="center">Welcome to Course Manager 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> This web application helps user to keep track of students and courses in which they have been registered.

### 🏠 [Homepage](https://courses--manager.herokuapp.com)
Click on Homepage to open the website
Manually can be done from below
```sh
https://courses--manager.herokuapp.com
```

## Install
```sh
bundle install
```
Installs all packages
```sh
rails db:create
rails db:migrate
```
Creates the databases
```sh
rails db:seed
```
Use above command to feed sample data
```sh
rails s
```
Use above Command to Start the server

## Database Tables
### Student Table
Contains all details of students
```sh
Student(id,name,age,slug)
```
id - Primary Key</br>
name - Name of the student</br>
age - Age of the student</br>
slug - A unique string used for routing

### Course Table
Contains all details of courses
```sh
Course(id,name,slug)
```
id - Primary Key</br>
name - Name of the course</br>
slug - A unique string used for routing

### Enrollment Table
Contains details of enrollments of Students
```sh
Enrollment(id,student_id,course_id)
```
id - Primary Key</br>
student_id - Foreign Key to Student(id)
course_id - Foreign Key to Course(id)

## Functionalities
* Add a new student to students list.
* Add a new course o courses list.
* Add a new enrollment. 
* Delete an existing enrollment.

## Pages
### Students Page
Contains cards with studnet's name, age, Number of courses registered in and link to his course list.</br>
Also contains Links to add new course and new student.
#### Add new Course to Courses list
Contains a form which contains a text input feild given the course name, The form adds it as a new course.
#### Add new Student to Students list
Contains a form which contains a text input feild fro name and age given the name,age The form adds it as a new course.
### Student Page ( Individual )
Dedicated Page for each student ehich contains list of all courses the student is registered in and forms to add or delete the courses.
##### Add course for a student form
Contains a dropdown list which contains only the courses the student is not registered in so as to avoid duplication of enrollments.
##### Delete course for a student form
Contains a dropdown list which contains only the registered courses of the student which can be removed as an enrollment.

## API
### To fetch Students data
```sh
'api/v1/students.json
```
Through api you can perform get,create,destroy operations
### To fetch Courses data
```sh
'api/v1/courses.json
```
Through api you can perform get,create,destroy operations
### Enrollments
```sh
'api/v1/enrollments
```
Able to create and destroy enrollments given id as parameter

## Author

👤 **Sai Krishna Lanka**

* Github: [@krish-1409](https://github.com/krish-1409)
* LinkedIn: [@www.linkedin.com\/in\/lanka-sai-krishna](https://linkedin.com/in/www.linkedin.com\/in\/lanka-sai-krishna)


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
