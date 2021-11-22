module Api
    module V1
        class EnrollmentsController < ApplicationController
            protect_from_forgery with: :null_session

            def create
                puts student
                enrollment = student.enrollments.new(enrollment_params)
                if enrollment.save
                    render json: EnrollmentSerializer.new(enrollment).serialized_json
                else
                    render json: {error: enrollment.errors.messages}, status: 422
                end
            end

            def destroy
                enrollment = Enrollment.find_by(id: params[:id])
                if enrollment.destroy
                    head :no_content
                else
                    render json: {error: enrollment.errors.messages}, status: 422
                end
            end
            
            private
            def student
                @student ||= Student.find(params[:student_id])
            end

            def enrollment_params
                params.require(:enrollment).permit(:student_id, :course_id)
            end
            
        end
    end
end