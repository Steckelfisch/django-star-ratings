# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-13 10:24
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('star_ratings', '0003_auto_20160721_1127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userrating',
            name='rating',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='star_ratings_userrating_related', to=settings.STAR_RATINGS_RATING_MODEL),
        ),
    ]
