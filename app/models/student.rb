class Student < ApplicationRecord
    has_many :enrollments
    has_many :courses, through: :enrollments

    after_create :slugify
    # after_save :total_courses
    def slugify
        url = name+id.to_s

        student = Student.find_by(id:id)
        student.update(slug: url.parameterize)
    end

    def total_courses
        
        puts Enrollment.where(student:id).count
         
    end
end
