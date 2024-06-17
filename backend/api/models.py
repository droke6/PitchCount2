from django.db import models
from django.contrib.auth.hashers import make_password
import random

def generate_user_id():
    return random.randint(1000, 9999)

class User(models.Model):
    user_id = models.IntegerField(primary_key=True, unique=True, default=generate_user_id)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if not self.pk:  # if the object is being created, hash the password
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

def generate_team_id():
    return random.randint(1000, 9999)

class Team(models.Model):
    team_id = models.IntegerField(primary_key=True, unique=True, default=generate_team_id)
    name = models.CharField(max_length=100)
    coach = models.ForeignKey(User, on_delete=models.CASCADE, related_name='teams')

    def __str__(self):
        return self.name

class Player(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
