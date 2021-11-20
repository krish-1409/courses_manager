module Api
    module V1
        class CoursesController < ApplicationController
            protect_from_forgery with: :null_session
           
            def index
                courses = Course.all

                render json: CourseSerializer.new(courses, options).serialized_json
            end

            def show
               course = Course.find_by(slug: params[:slug])

               render json: CourseSerializer.new(course, options).serialized_json
            end

            def create
                course = Course.new(course_params)

                if course.save
                    render json: CourseSerializer.new(course).serialized_json
                else
                    render json: {error: course.errors.messages}, status: 422
                end
            end

            def destroy
                course = Course.find_by(slug: params[:slug])

                if course.destroy
                    head :no_content
                else
                    render json: {error: course.errors.messages}, status: 422
                end
            

            end
            private

            def course_params
                params.require(:course).permit(:name)
            end

            def options
                @options ||= { include: %i[enrollments] }
            end
        end
    end
end