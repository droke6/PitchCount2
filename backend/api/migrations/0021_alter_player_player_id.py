# Generated by Django 5.0.6 on 2024-06-28 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_alter_player_player_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='player_id',
            field=models.IntegerField(default=9763, primary_key=True, serialize=False, unique=True),
        ),
    ]