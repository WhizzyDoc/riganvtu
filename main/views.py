from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from .models import Profile, Coupon, Account
import datetime
from django.views.decorators.http import require_POST
import re
import json
import random
import math
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

def generateCode(n):
    digits = [i for i in range(0, 10)]
    random_str = ''
    for i in range(n):
        index = math.floor(random.random() * 10)
        random_str += str(digits[index])
    return int(random_str)


def register(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':
        email = request.POST.get('email')
        firstName = sterilize(request.POST.get('first_name'))
        lastName = sterilize(request.POST.get('last_name'))
        phoneNumber = sterilize(request.POST.get('phone_number'))
        username = sterilize(request.POST.get('username'))
        password = request.POST.get('password').strip()
        code = request.POST.get('code')

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
            referral_code = generateCode(6)
            # create a new profile for user
            profile = Profile(user=new_user, firstName=firstName, lastName=lastName, email=email, phone_no=phoneNumber, referral_code=referral_code)
            profile.save()
            # create new account
            acc_num = generateCode(10)
            account = Account(user=profile, account_name=f'RiganVTU - {username}', account_number=acc_num, bank_name="WEMA BANK")
            account.save()
            code_reason = ''
            # check coupon code
            if code != '' or code != ' ':
                try:
                    referrer = Profile.objects.get(referral_code=code)
                    if referrer:
                        profile.referred = True
                        profile.referrer = referrer.user
                        profile.save()
                        Coupon.objects.create(user=referrer, amount=20, description="Referral Bonus")
                        acc = get_object_or_404(Account, user=referrer)
                        acc.coupon_balance += 20
                        acc.save()
                    else:
                        code_reason = "Sorry! referral code is invalid"
                except:
                    code_reason = "Sorry! referral code is invalid"
            # return success status
            return JsonResponse({
                'status': 'success',
                'username': username,
                'email': email,
                'code': code_reason,
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


def login_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':
        username = sterilize(request.POST.get('username'))
        password = request.POST.get('password')
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

def logout_view(request):
    logout(request)
    messages.warning(request, "You have been logged out, enter your details to log back in")
    return redirect('login')

def index(request):
    return render(request, "main/index.html")

@login_required(login_url="login")
def dashboard(request):
    profile = get_object_or_404(Profile, user=request.user)
    account = get_object_or_404(Account, user=profile)
    return render(request, "main/dashboard.html", {
        'profile': profile,
        'user': request.user,
        'account': account,
    })
