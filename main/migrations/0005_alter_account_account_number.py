# Generated by Django 4.1.4 on 2023-08-12 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_profile_created_profile_referral_code_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_number',
            field=models.BigIntegerField(blank=True, null=True, verbose_name='Account Number'),
        ),
    ]