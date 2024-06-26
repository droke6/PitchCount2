from rest_framework import serializers
from .models import User, Team, Player, ArchivedTeam, Leagues
from django.contrib.auth.hashers import check_password, make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = User.objects.filter(email=email).first()

        if user and check_password(password, user.password):
            return {'user': user}
        else:
            raise serializers.ValidationError("Invalid email or password")

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['player_id', 'first_name', 'last_name', 'team', 'bats', 'number']

class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['team_id', 'name', 'grade', 'league', 'coach', 'players', 'created_date']

# serializers.py
class ArchivedTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchivedTeam
        fields = ['team_id', 'name', 'grade', 'league', 'coach_first_name', 'coach_last_name', 'archived_date']

class LeaguesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Leagues
        fields = ['league_id', 'league']