from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('logout/', views.logout_view, name ='logout'),
    path('api/login_user/', views.login_user, name ='login_user'),
    path('api/register_user/', views.register_users, name ='register_user'),
    path('api/Taking_ans/<str:subjectname>/', views.Taking_ans, name ='Taking_ans'),
    path('api/Post_student_ans', views.Taking_ans, name ='Taking_ans'),
    path('api/get_users_profile', views.get_users_profile, name ='get_users_profile'),
    path('api/update_user_type/<int:profile_id>/', views.update_user_type, name='update_user_type'),
    path('api/addquestion/', views.addingquestion, name ='addquestion'),
    path('api/get_test_question/<str:Subjectname>/', views.get_test_question, name ='get_test_question'),
    path('api/get_all_users/', views.get_all_users, name ='get_all_users'),
    path('api/student_subjects/<int:student_id>/', views.get_students_conducted_subject, name ='get_students_conducted_subject'),
    path('api/student_ans/<str:subjectname>/<int:id>/', views.student_ans, name ='student_ans'),
    path('api/update_student_score/<str:subjectname>/<int:id>/', views.update_student_score, name ='update_student_score'),
    path('api/update_test_questions/<int:id>/', views.update_test_questions, name ='update_test_questions'),
    path('api/sub/', views.subject, name ='sub'),
    path('api/del_subject/<int:id>/', views.del_subject, name ='del_subject'),
    path('get_marks/', views.get_marks, name ='get_marks'),
    path('upload_banks/', views.upload_question_bank, name ='upload_banks'),
    path('get_list_banks/', views.list_question_banks, name ='get_list_banks'),
    path('api/log_event/', views.log_event, name='log_event'),
    path('api/get_student_logs/<str:student_id>/', views.get_student_logs, name='get_student_logs'),
    path('api/add-objective-exam/', views.add_objective_exam),
    path('api/get-exam/<int:exam_id>/', views.get_exam),
    path('api/get-objective-exams/', views.get_objective_exams),
    path('api/submit-answers/', views.submit_answers),
    path('student-reports/', views.get_all_student_reports, name='get_all_student_reports'),    
    
    path('ResetView/', auth_views.PasswordResetView.as_view(template_name='resetview.html'), name='ResetView'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='resetdone.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='resetconfirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='resetcomplete.html'), name='password_reset_complete'),
]