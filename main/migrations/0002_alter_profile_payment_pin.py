# Generated by Django 4.1.4 on 2023-08-09 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='payment_pin',
            field=models.PositiveIntegerField(blank=True, default=1234, verbose_name='PIN'),
        ),
    ]
