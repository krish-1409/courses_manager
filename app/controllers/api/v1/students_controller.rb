module Api
    module V1
        class StudentsController < ApplicationController
            protect_from_forgery with: :null_session
           
            def index
                students = Student.all

                render json: StudentSerializer.new(students, options).serialized_json
            end

            def show
               student = Student.find_by(slug: params[:slug])

               render json: StudentSerializer.new(student, options).serialized_json
            end

            def create
                student = Student.new(student_params)

                if student.save
                    render json: StudentSerializer.new(student).serialized_json
                else
                    render json: {error: student.errors.messages}, status: 422
                end
            end

            def update
                student = Student.find_by(slug: params[:slug])

                if student.update(student_params)
                    render json: StudentSerializer.new(student, options).serialized_json
                else
                    render json: {error: student.errors.messages}, status: 422
                end
            end

            def destroy
                student = Student.find_by(slug: params[:slug])

                if student.destroy
                    head :no_content
                else
                    render json: {error: student.errors.messages}, status: 422
                end
            end

            private
            

            def student_params
                params.require(:student).permit(:name,:age)
            end

            def options
                @options ||= { include: %i[enrollments] }
            end
        end
    end
end