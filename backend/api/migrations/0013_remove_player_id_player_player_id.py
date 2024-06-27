# Generated by Django 5.0.6 on 2024-06-26 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_player_bats'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='id',
        ),
        migrations.AddField(
            model_name='player',
            name='player_id',
            field=models.IntegerField(default=6985, primary_key=True, serialize=False, unique=True),
        ),
    ]