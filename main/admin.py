from django.contrib import admin
from .models import Profile

# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user']
    list_filter = ['']
    #prepopulated_fields = {'slug': ('title',)}
    list_editable = ['payment_pin',]
    list_per_page = 20
