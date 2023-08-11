from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    
    payment_pin = models.PositiveIntegerField(verbose_name="PIN", default=1234, blank=True)
    
    