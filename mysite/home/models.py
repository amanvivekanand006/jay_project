from django.db import models
from django.contrib.auth.models import User

# from django.contrib.auth.models import AbstractUser

# Create your models here.

class Profile(models.Model):
    USER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('tutor', 'Tutor'),
        ('admin', 'Admin'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='student')

    def __str__(self):
        return self.user.username


class TestQuestions(models.Model):
    subjectname = models.CharField(max_length=200)
    question1 = models.CharField(max_length=5000)
    question2 = models.CharField(max_length=5000)
    question3 = models.CharField(max_length=5000)
    question4 = models.CharField(max_length=5000)
    question5 = models.CharField(max_length=5000)
    exam_time = models.IntegerField(help_text="Exam time in minutes", default=5)  # default time 30 mins

    def __str__(self):
        return self.subjectname
        

class Test(models.Model):
    subjectname = models.CharField(max_length=200)
    tutor = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'profile__user_type': 'tutor'})
    duration = models.IntegerField(help_text="Duration in minutes")

    def __str__(self):
        return self.subjectname
    
  
    
class getStudentAnswer(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'profile__user_type': 'student'})
    #question = models.ForeignKey(TestQuestions, on_delete=models.CASCADE)
    answer1 = models.CharField(max_length=5000)
    answer2 = models.CharField(max_length=5000)
    answer3 = models.CharField(max_length=5000)
    answer4 = models.CharField(max_length=5000)
    answer5 = models.CharField(max_length=5000)
    score = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f'{self.student.username} - {self.question.question_text}'


class takeanswers(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'profile__user_type': 'student'})
    question = models.ForeignKey(TestQuestions, on_delete=models.CASCADE)
    answer1 = models.CharField(max_length=5000)
    answer2 = models.CharField(max_length=5000)
    answer3 = models.CharField(max_length=5000)
    answer4 = models.CharField(max_length=5000)
    answer5 = models.CharField(max_length=5000)
    subject = models.CharField(max_length=5000)
    score = models.FloatField(null=True, blank=True)
    
    def __str__(self):
        return self.student.username


class QuestionBank(models.Model):
    title = models.CharField(max_length=200)
    pdf_file = models.FileField(upload_to='question_banks/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class ProctoringLog(models.Model):
    student_id = models.CharField(max_length=100)
    event = models.CharField(max_length=255)
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"{self.student_id} - {self.event} at {self.timestamp}"
    

class ObjectiveExam(models.Model):
    subject_name = models.CharField(max_length=255)
    time_limit = models.IntegerField(help_text="Time limit in minutes")
    questions = models.JSONField()

    def __str__(self):
        return self.subject_name

class StudentAnswer(models.Model):
    student_name = models.CharField(max_length=255)
    exam = models.ForeignKey(ObjectiveExam, on_delete=models.CASCADE)
    answers = models.JSONField()
    marks_obtained = models.IntegerField(default=0)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} - {self.exam.subject_name}"