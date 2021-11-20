class Course < ApplicationRecord
    

    has_many :students
    after_create :slugify

    def slugify
        url = name+id.to_s

        course = Course.find_by(id:id)
        course.update(slug: url.parameterize)
    end
end
