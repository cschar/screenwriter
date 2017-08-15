# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db import models
from haikunator import Haikunator


class Scroll(models.Model):
    title = models.CharField(max_length=200, default='')
    author = models.ForeignKey(User, blank=True, null=True)
    text = models.CharField(max_length=1000, default='')


    def save(self, *args, **kwargs):

        if self.title == '':
            self.title = Haikunator().haikunate()
        super(Scroll, self).save(*args, **kwargs)


class Pic(models.Model):
    # file will be uploaded to MEDIA_ROOT/pic_uploads
    owner = models.ForeignKey('auth.User', related_name='pics', null=True)
    image = models.ImageField(upload_to='pic_uploads/')
    scroll = models.ForeignKey(Scroll, blank=True, null=True)
    info = models.CharField(max_length=20, blank=True, null=True)


class Mic(models.Model):
    owner = models.ForeignKey('auth.User', related_name='mics', null=True)
    file = models.FileField(upload_to='mic_uploads/', null=True)
    scroll = models.ForeignKey(Scroll, blank=True, null=True)
    description = models.CharField(max_length=200, blank=True, null=True)


class AccountInfo(models.Model):
    user = models.ForeignKey('auth.User', related_name='authinfo', null=True)
    upgraded = models.BooleanField(default=False)
