import random
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.admin.models import LogEntry
from django.utils import timezone

def generate_user_id():
    return random.randint(1000, 9999)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must have a first name')
        if not last_name:
            raise ValueError('Users must have a last name')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            user_id=generate_user_id(),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.IntegerField(primary_key=True, unique=True, default=generate_user_id)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def save(self, *args, **kwargs):
        if not self.pk:  # if the object is being created, hash the password
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete related teams
        self.teams.all().delete()
        # Delete related log entries
        LogEntry.objects.filter(user_id=self.pk).delete()
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.email

def generate_team_id():
    return random.randint(1000, 9999)

class Team(models.Model):
    team_id = models.IntegerField(primary_key=True, unique=True, default=generate_team_id)
    name = models.CharField(max_length=100)
    grade = models.CharField(max_length=10, default='N/A')
    coach = models.ForeignKey(User, on_delete=models.CASCADE, related_name='teams', null=True, blank=True)
    coach_first_name = models.CharField(max_length=30, blank=True)
    coach_last_name = models.CharField(max_length=30, blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    league = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        # Automatically populate coach's first and last name if coach is set
        if self.coach:
            self.coach_first_name = self.coach.first_name
            self.coach_last_name = self.coach.last_name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ArchivedTeam(models.Model):
    team_id = models.IntegerField(primary_key=True, unique=True, default=generate_team_id)
    name = models.CharField(max_length=100)
    grade = models.CharField(max_length=10, default='N/A')
    coach = models.ForeignKey(User, on_delete=models.CASCADE, related_name='archived_teams', null=True, blank=True)
    coach_first_name = models.CharField(max_length=30, blank=True)
    coach_last_name = models.CharField(max_length=30, blank=True)
    archived_date = models.DateTimeField(default=timezone.now)
    league = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        if self.coach:
            self.coach_first_name = self.coach.first_name
            self.coach_last_name = self.coach.last_name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Player(models.Model):
    player_id = models.IntegerField(primary_key=True, unique=True, default=random.randint(1000, 9999))
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    bats = models.CharField(max_length=30, default='N/A')
    number = models.IntegerField(default=0)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
