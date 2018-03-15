from __future__ import unicode_literals

from django.apps import AppConfig
from django.db.models.signals import post_save, post_delete
from . import get_star_ratings_userrating_model

class StarRatingsAppConfig(AppConfig):
    name = 'star_ratings'

    def ready(self):
        #from .models import UserRating
        from .signals import calculate_ratings
        UserRating = get_star_ratings_userrating_model()
        post_save.connect(calculate_ratings, sender=UserRating)
        post_delete.connect(calculate_ratings, sender=UserRating)
