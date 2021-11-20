class EnrollmentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :student_id, :course_id
end
