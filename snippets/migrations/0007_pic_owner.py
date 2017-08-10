# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-08-10 19:59
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('snippets', '0006_pic_info'),
    ]

    operations = [
        migrations.AddField(
            model_name='pic',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pics', to=settings.AUTH_USER_MODEL),
        ),
    ]
