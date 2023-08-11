from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile")
    firstName = models.CharField(max_length=200, blank=True, null=True)
    lastName = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(max_length=200, verbose_name="Email", null=True, blank=True)
    phone_no = models.CharField(max_length=200, verbose_name="Phone Number", null=True, blank=True)
    payment_pin = models.PositiveIntegerField(verbose_name="PIN", default=1234, blank=True)

    class Meta:
        ordering = ['firstName']

    def __str__(self):
        return f'{self.firstName} {self.lastName}'
    
    