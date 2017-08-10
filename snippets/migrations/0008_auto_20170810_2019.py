# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-08-10 20:19
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('snippets', '0007_pic_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mic',
            name='author',
        ),
        migrations.AddField(
            model_name='mic',
            name='file',
            field=models.FileField(null=True, upload_to='mics/'),
        ),
        migrations.AddField(
            model_name='mic',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='mics', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='mic',
            name='scroll',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='snippets.Scroll'),
        ),
    ]
