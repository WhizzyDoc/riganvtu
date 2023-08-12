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
    referral_code = models.PositiveIntegerField(verbose_name="Referral Code", null=True, blank=True, unique=True)
    referred = models.BooleanField(default=False)
    referrer = models.ForeignKey(User, on_delete=models.PROTECT, related_name="referee", blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        ordering = ['firstName']

    def __str__(self):
        return f'{self.firstName} {self.lastName}'

class Coupon(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="coupon_owned")
    amount = models.DecimalField(verbose_name="amount", null=True, blank=True, decimal_places=2, max_digits=10)
    description = models.CharField(max_length=200, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

class Account(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="account")
    balance = models.DecimalField(verbose_name="balance", null=True, blank=True, decimal_places=2, default=0.00, max_digits=10)
    account_name = models.CharField(max_length=200, blank=True, null=True)
    account_number = models.BigIntegerField(verbose_name="Account Number", null=True, blank=True)
    bank_name = models.CharField(max_length=200, blank=True, null=True)
    coupon_balance = models.DecimalField(verbose_name="coupon balance", null=True, blank=True, decimal_places=2, default=0.00, max_digits=10)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['account_name']

    def __str__(self):
        return f'{self.account_name} {self.account_number}'
    