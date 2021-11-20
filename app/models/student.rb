class Student < ApplicationRecord
    has_many :courses
    after_create :slugify

    def slugify
        url = name+id.to_s

        student = Student.find_by(id:id)
        student.update(slug: url.parameterize)
    end

    def total_courses

    end
end
