class StudentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :age, :slug, :total_courses

  has_many :enrollments
end
