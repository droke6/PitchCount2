from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.contrib.auth.hashers import make_password
import random

def generate_user_id():
    return random.randint(1000, 9999)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, first_name, last_name, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.IntegerField(primary_key=True, unique=True, default=generate_user_id)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Adjust based on your requirements

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
    grade = models.CharField(max_length=10, default='N/A')
    coach = models.ForeignKey(User, on_delete=models.CASCADE, related_name='teams', null=True, blank=True)
    coach_first_name = models.CharField(max_length=30, blank=True)  # Added for storing coach's first name
    coach_last_name = models.CharField(max_length=30, blank=True)   # Added for storing coach's last name

    def save(self, *args, **kwargs):
        # Automatically populate coach's first and last name if coach is set
        if self.coach:
            self.coach_first_name = self.coach.first_name
            self.coach_last_name = self.coach.last_name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Player(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
