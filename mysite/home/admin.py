from django.contrib import admin
from . models import *
# from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

admin.site.register(Profile)
admin.site.register(TestQuestions)
admin.site.register(Test)
admin.site.register(getStudentAnswer)
admin.site.register(takeanswers)
admin.site.register(QuestionBank)
admin.site.register(ProctoringLog)
admin.site.register(ObjectiveExam)
admin.site.register(StudentAnswer)