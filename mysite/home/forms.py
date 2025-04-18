from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from . models import *



class Registration(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField()
    last_name = forms.CharField()
    
    USER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('tutor', 'Tutor'),
    ]
    user_type = forms.ChoiceField(choices=USER_TYPE_CHOICES, widget=forms.RadioSelect, required=True)

    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','password1','password2','user_type'] 
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['user_type'].initial = 'student'    


class User_Login(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    
    
    
class TestQuestionsForm(forms.ModelForm):
    class Meta:
        model = TestQuestions
        fields = ['question1', 'question2', 'question3', 'question4', 'question5']
        
        

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['user_type']
        widgets = {
            'user_type': forms.Select(attrs={'class': 'form-control'})
        }