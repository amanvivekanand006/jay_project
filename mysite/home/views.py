from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required 
from django.contrib.auth import login
from django.contrib import messages
from .forms import Registration,User_Login
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout 
from . models import *
from . signals import *
from . forms import *
from . serializers import * 
# Create your views here.


@api_view(["POST","GET"])
def register_users(request):
    if request.method == 'POST':
        """ Register a new user """
    
        username = request.data.get("username")
        email = request.data.get("email")

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize and validate data
        serializer = registerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User added successfully!"}, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        user_obj = User.objects.all()
        serializer = user_serializers(user_obj, many=True)
        return Response(serializer.data)

@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        # login(request, user)  # Django session login
        profile = Profile.objects.get(user=user)
        
        return Response({
            "message": f"Welcome {username}!",
            "username": username,
            "student_id":user.id,
            "user_type": profile.user_type,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)




@api_view(["POST"])
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh_token")
        token = RefreshToken(refresh_token)
        token.blacklist()  # Blacklist the refresh token
        return Response({"message": "Successfully logged out"}, status=200)
    except Exception as e:
        return Response({"error": "Invalid token"}, status=400)

@api_view(["GET","POST"])
def addingquestion(request):
    if request.method == "POST":
        serializer = testquestions_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Question added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        questions_obj = TestQuestions.objects.all()
        serializer = testquestions_serializer(questions_obj, many = True)
        return Response(serializer.data)
    
@api_view(["GET"])
def get_test_question(request, Subjectname):
    if request.method == "GET":
        questions_obj = TestQuestions.objects.filter(subjectname=Subjectname)
        serializer = testquestions_serializer(questions_obj, many = True)
        return Response(serializer.data)
    
   

@api_view(["GET"])
def get_users_profile(request):
    if request.method == "GET":
        profiles = Profile.objects.all()
        serializer = profile_serializer(profiles, many=True)
        return Response(serializer.data)

@api_view(["PUT"])
def update_user_type(request, profile_id):
    try:
        profile = Profile.objects.get(id=profile_id)
        user_type = request.data.get("user_type")

        if user_type in dict(Profile.USER_TYPE_CHOICES):
            profile.user_type = user_type
            profile.save()
            return Response({"message": "User type updated successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)
    
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET","PUT","PATCH"])
def update_test_questions(request, id):
    try:
        question = TestQuestions.objects.get(id=id)
    except TestQuestions.DoesNotExist:
        return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = testquestions_serializer(question)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = testquestions_serializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Question updated successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "PATCH":
        serializer = testquestions_serializer(question, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Question updated successfully"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET","POST"])
@authentication_classes([JWTAuthentication])  # Ensure authentication is enforced
@permission_classes([IsAuthenticated])
def Taking_ans(request, subjectname):
    # if not request.user.is_authenticated:
    #   return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "POST":
        student = request.user  # Assuming user is authenticated

        existing_entry = takeanswers.objects.filter(student=student, subject=subjectname).exists()
        
        if existing_entry:
            return Response(
                {"error": "You have already submitted answers for this subject. Please delete the previous submission before trying again."},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = request.data.copy()
        data["student"] = student.id  # Attach student ID
        data["subject"] = subjectname  

        serializer = take_answers_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Answers has been saved"}, status= status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        answers = takeanswers.objects.filter(subject=subjectname)
        serializer = take_answers_serializer(answers, many=True)
        return Response(serializer.data)
    

    
@api_view(["GET"])
def student_ans(request,subjectname,id):
    if request.method == "GET":
        answers = takeanswers.objects.filter(subject=subjectname, student=id)
        serializer = take_answers_serializer(answers, many=True)
        return Response(serializer.data)



@api_view(["GET"])
def get_marks(request):
    marks = takeanswers.objects.all()
    serializer = take_answers_serializer(marks, many= True)
    if request.method == "GET":
       return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_students_conducted_subject(request, student_id):
    subjects = takeanswers.objects.filter(student_id=student_id).values_list('subject', flat=True).distinct()
    return Response({"student_id": student_id, "subjects": list(subjects)})

@api_view(["GET"])
def get_all_users(request):
    users = User.objects.all()
    serializer = user_serializers(users, many=True)
    if request.method == "GET":
       return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "DELETE"])
def subject(request):
    subjects = TestQuestions.objects.values_list('subjectname','id').distinct()
    if request.method == "GET":
        return Response({"subjects": list(subjects)})

@api_view(["DELETE"])
def del_subject(request,id):
    subject = get_object_or_404(TestQuestions, id=id)
    subject_name = subject.subjectname 
    subject.delete()
    return Response({"message": f"Subject '{subject_name}' deleted successfully"}, status=200)

@api_view(['POST'])
def update_student_score(request, subjectname, id):
    student_id = id
    subject = subjectname
    score = request.data.get('score')

    if not student_id or not subject or score is None:
        return Response({"error": "student_id, subject, and score are required fields."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        student = User.objects.get(id=student_id)
    except User.DoesNotExist:
        return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

    try:
        answer_entry = takeanswers.objects.get(student=student, subject=subject)
        answer_entry.score = score
        answer_entry.save()
        return Response({"message": "Score updated successfully.", "score": score}, status=status.HTTP_200_OK)
    except takeanswers.DoesNotExist:
        return Response({"error": "No record found for the given student and subject."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def upload_question_bank(request):
    serializer = QuestionBankSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "PDF uploaded successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def list_question_banks(request):
    pdfs = QuestionBank.objects.all()
    serializer = QuestionBankSerializer(pdfs, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def log_event(request):
    serializer = ProctoringLogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"status": "Event logged"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_student_logs(request, student_id):
    logs = ProctoringLog.objects.filter(student_id=student_id).order_by('-timestamp')
    serializer = ProctoringLogSerializer(logs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_objective_exam(request):
    serializer = ObjectiveExamSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_exam(request, exam_id):
    try:
        exam = ObjectiveExam.objects.get(id=exam_id)
        serializer = ObjectiveExamSerializer(exam)
        return Response(serializer.data)
    except ObjectiveExam.DoesNotExist:
        return Response({'error': 'Exam not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_objective_exams(request):
    exams = ObjectiveExam.objects.all()
    serializer = ObjectiveExamSerializer(exams, many=True)
    return Response(serializer.data)


# @api_view(['POST'])
# def submit_answers(request):
#     serializer = StudentAnswerSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Answers submitted successfully."}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['POST'])
# def submit_answers(request):
#     serializer = StudentAnswerSerializer(data=request.data)
#     if serializer.is_valid():
#         exam_id = request.data.get("exam")
#         answers = request.data.get("answers")
#         student_name = request.data.get("student_name")

#         try:
#             exam = ObjectiveExam.objects.get(id=exam_id)
#         except ObjectiveExam.DoesNotExist:
#             return Response({"error": "Exam not found."}, status=status.HTTP_404_NOT_FOUND)

#         correct_count = 0
#         total_questions = len(exam.questions)

#         for idx, question in enumerate(exam.questions):
#             correct_option = question.get("correct_option")
#             selected_option = answers.get(str(idx))

#             if correct_option == selected_option:
#                 correct_count += 1

#         # Save the student's answers and marks
#         serializer.save(marks_obtained=correct_count)

#         return Response({
#             "message": "Answers submitted successfully.",
#             "marks": correct_count,
#             "total": total_questions
#         }, status=status.HTTP_201_CREATED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def submit_answers(request):
    serializer = StudentAnswerSerializer(data=request.data)
    if serializer.is_valid():
        exam_id = request.data.get("exam")
        answers = request.data.get("answers")

        try:
            exam = ObjectiveExam.objects.get(id=exam_id)
        except ObjectiveExam.DoesNotExist:
            return Response({"error": "Exam not found."}, status=status.HTTP_404_NOT_FOUND)

        correct_count = 0
        total_questions = len(exam.questions)

        for idx, question in enumerate(exam.questions):
            correct_answer = question.get("correct_answer")  # e.g. "4"
            selected_option_key = answers.get(str(idx))      # e.g. "A", "B", "C", "D"

            if not selected_option_key:
                continue  # no answer given for this question

            # Map option key to actual answer value
            option_value = question.get(f"option_{selected_option_key.lower()}")  # e.g. option_a

            if option_value == correct_answer:
                correct_count += 1

        # Save the student's answers and marks
        serializer.save(marks_obtained=correct_count)

        return Response({
            "message": "Answers submitted successfully.",
            "marks": correct_count,
            "total": total_questions
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_student_reports(request):
    submissions = StudentAnswer.objects.all()
    serializer = StudentAnswerReportSerializer(submissions, many=True)
    return Response(serializer.data)
