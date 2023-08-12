from django.contrib import admin
from .models import Profile, Coupon, Account

# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'firstName', 'lastName', 'email', 'phone_no', 'referral_code', 'referred']
    list_filter = ['referred',]
    #prepopulated_fields = {'slug': ('title',)}
    list_editable = ['referral_code']
    list_per_page = 20

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'description', 'date']
    list_filter = ['description',]
    #prepopulated_fields = {'slug': ('title',)}
    list_editable = ['amount']
    list_per_page = 20

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['user', 'balance', 'account_name', 'account_number', 'bank_name', 'coupon_balance', 'created']
    list_filter = ['bank_name',]
    #prepopulated_fields = {'slug': ('title',)}
    list_editable = ['balance', 'coupon_balance']
    list_per_page = 20
