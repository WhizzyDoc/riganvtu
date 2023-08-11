from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from .models import Profile
import datetime
from django.views.decorators.http import require_POST
import re
import json
from django.db.models import Q
from .monnify.monnify import Monnify

# Create your views here.
def slugify(s):
    s = s.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_-]+', '-', s)
    s = re.sub(r'^-+|-+$', '', s)
    return s

def sterilize(s):
    s = ''.join(letter for letter in s if letter.isalnum())
    return s

@require_POST
def register(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        email = json.load(request)['email ']
        firstName = sterilize(json.load(request)['first_name'])
        lastName = sterilize(json.load(request)['last_name'])
        phoneNumber = sterilize(json.load(request)['phone_number'])
        username = sterilize(json.load(request)['username'])
        password = json.load(request)['password']
        # check if username and email does not exist
        usernames = []
        emails = []
        users = User.objects.all()
        for user in users:
            usernames.append(user.username)
            emails.append(user.email)
        if username not in usernames and email not in emails:
            # create new user
            new_user = User(username=username, email=email, first_name=firstName, last_name=lastName)
            new_user.set_password(password)
            new_user.save()
            # create a new profile for user
            profile = Profile(user=new_user, firstName=firstName, lastName=lastName, email=email, phone_no=phoneNumber)
            profile.save()
            # return success status
            return JsonResponse({
                'status': 'success',
                'username': username,
                'email': email,
            })
        elif username in usernames:
            return JsonResponse({
                'status': 'error',
                'reason': f"Username already exists. Kindly use another username such as {username}123.",
            })
        elif email in emails:
            return JsonResponse({
                'status': 'error',
                'reason': f"Email {email} has already been used. Kindly use another email.",
            })
    return render(request, 'account/register.html')

@require_POST
def login_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        username = sterilize(json.load(request)['username'])
        password = json.load(request)['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return JsonResponse({'status': 'success',})
            else:
                return JsonResponse({
                    'status': 'error',
                    'reason': "Your account has been disabled",
                })
        else:
            return JsonResponse({
                'status': 'error',
                'reason': "Invalid login credentials",
            })
    return render(request, 'account/login.html')

def index(request):
    return render(request, "main/index.html")

@login_required(login_url="login")
def dashboard(request):
    return render(request, "main/dashboard.html")
