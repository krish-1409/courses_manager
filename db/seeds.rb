# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

students = Student.create([
    {
        name:"John Abraham",
        age: 21
    },

    {
        name:"Kim Jong Un",
        age: 23
    },

    {
        name:"Donald Trump",
        age: 43
    },

    {
        name:"Amit Kumar",
        age: 27
    },

    {
        name:"Jeff Bezos",
        age: 32
    },
])


courses = Course.create([
    {
        name:"Computer Science and Engineering"
    },

    {
        name:"Electrical Engineering"
    },

    {
        name:"Electronics Engineering"
    },

    {
        name:"Mathematics"
    }
])

enrollments = Enrollment.create([
    {
        student: students.first,
        course: courses.first
    },

    {
        student: students.last,
        course: courses.last
    }
])