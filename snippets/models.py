# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight


LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)
    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
    highlighted = models.TextField()

    class Meta:
        ordering = ('created',)


    def save(self, *args, **kwargs):
        """
        Use the `pygments` library to create a highlighted HTML
        representation of the code snippet.
        """
        lexer = get_lexer_by_name(self.language)
        linenos = self.linenos and 'table' or False
        options = self.title and {'title': self.title} or {}
        formatter = HtmlFormatter(style=self.style, linenos=linenos,
                                  full=True, **options)
        self.highlighted = highlight(self.code, lexer, formatter)
        super(Snippet, self).save(*args, **kwargs)



class Scroll(models.Model):
	title = models.CharField(max_length=200, unique=True)
	author = models.ForeignKey(User, blank=True, null=True)
	text = models.CharField(max_length=1000)


class Pic(models.Model):
    # file will be uploaded to MEDIA_ROOT/pic_uploads
    owner = models.ForeignKey('auth.User', related_name='pics', null=True)
    image = models.ImageField(upload_to ='pic_uploads/')
    scroll = models.ForeignKey(Scroll, blank=True, null=True)
    info = models.CharField(max_length=20, blank=True, null=True)


class Mic(models.Model):
    owner = models.ForeignKey('auth.User', related_name='mics', null=True)
    file = models.FileField(upload_to ='mic_uploads/', null=True)
    scroll = models.ForeignKey(Scroll, blank=True, null=True)
    description = models.CharField(max_length=200, blank=True, null=True)