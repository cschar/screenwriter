# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-08-13 18:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scroll',
            name='title',
            field=models.CharField(default='', max_length=200),
        ),
    ]
