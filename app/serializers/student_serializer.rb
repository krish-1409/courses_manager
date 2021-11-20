class StudentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :age, :slug

  has_many :enrollments
end
