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