# Generated by Django 5.0.6 on 2024-06-28 02:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_player_player_id_archivedteam'),
    ]

    operations = [
        migrations.AddField(
            model_name='archivedteam',
            name='archived_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='player',
            name='player_id',
            field=models.IntegerField(default=5655, primary_key=True, serialize=False, unique=True),
        ),
    ]
