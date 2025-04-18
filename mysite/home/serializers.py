from rest_framework import serializers
from . models import *
# from django.contrib.auth.models import User


class testquestions_serializer(serializers.ModelSerializer):
    class Meta:
        model = TestQuestions
        fields = '__all__'


class take_answers_serializer(serializers.ModelSerializer):
    answer1 = serializers.CharField(required=False, allow_blank=True)
    answer2 = serializers.CharField(required=False, allow_blank=True)
    answer3 = serializers.CharField(required=False, allow_blank=True)
    answer4 = serializers.CharField(required=False, allow_blank=True)
    answer5 = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = takeanswers
        fields = '__all__'

class profile_serializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source="user.get_full_name", read_only=True)
    
    class Meta:
        model = Profile
        fields = ["id", "user_type", "user", "user_full_name"]

class user_serializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class registerSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """ Ensure passwords match before saving """
        confirm_password = data.pop('confirm_password')  # Remove confirm_password before saving
        if data['password'] != confirm_password:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        """ Create user and hash password properly """
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)  # Hash password
        user.save()

        # Create Profile instance
        # Profile.objects.create(user=user, user_type='student')  # Default user_type to student

        return user



class QuestionBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank
        fields = '__all__'


class ProctoringLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProctoringLog
        fields = '__all__'


class ObjectiveExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjectiveExam
        fields = '__all__'

class StudentAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        fields = '__all__'


class StudentAnswerReportSerializer(serializers.ModelSerializer):
    exam = ObjectiveExamSerializer()
    class Meta:
        model = StudentAnswer
        fields = '__all__'