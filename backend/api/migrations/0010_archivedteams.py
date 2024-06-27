# Generated by Django 5.0.6 on 2024-06-26 21:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_team_coach'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArchivedTeams',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.team')),
                ('team_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='archived_teams', to='api.team')),
            ],
        ),
    ]