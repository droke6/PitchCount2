import logging
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User, Team, Player
from .serializers import UserSerializer, LoginSerializer, TeamSerializer, PlayerSerializer

logger = logging.getLogger(__name__)

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []  # No authentication required for registration

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        logger.info(f"Login request data: {request.data}")
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if not serializer.is_valid():
            logger.error(f"Login validation errors: {serializer.errors}")
            return Response(serializer.errors, status=400)
        try:
            user = serializer.validated_data['user']
            logger.info(f"Authenticated user: {user}")
            refresh = RefreshToken.for_user(user)
            logger.info(f"Generated refresh token: {refresh}")
            access_token = str(refresh.access_token)
            logger.info(f"Generated access token: {access_token}")
            response_data = {
                'access': access_token,
                'refresh': str(refresh),
                'user_id': user.user_id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
            logger.info(f"Response data: {response_data}")
            return Response(response_data)
        except Exception as e:
            logger.error(f"Error during token generation: {e}", exc_info=True)
            return Response({'detail': 'Something went wrong.'}, status=500)

class ListUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Authentication required

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class DeleteUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Authentication required

    def delete(self, request, user_id, format=None):
        try:
            user = User.objects.get(user_id=user_id)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error deleting user: {e}", exc_info=True)
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TeamListView(generics.ListCreateAPIView):
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Team.objects.filter(coach__user_id=self.request.user.user_id)

    def perform_create(self, serializer):
        serializer.save(coach=self.request.user)  # Ensure the coach is set as the logged-in user

class PlayerListView(generics.ListCreateAPIView):
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        return Player.objects.filter(team__team_id=team_id, team__coach__user_id=self.request.user.user_id)

    def perform_create(self, serializer):
        team_id = self.kwargs['team_id']
        team = Team.objects.get(team_id=team_id, coach__user_id=self.request.user.user_id)
        serializer.save(team=team)

class TeamDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, team_id, format=None):
        try:
            team = Team.objects.get(team_id=team_id, coach__user_id=request.user.user_id)
            serializer = TeamSerializer(team)
            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error fetching team: {e}", exc_info=True)
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, team_id, format=None):
        try:
            team = Team.objects.get(team_id=team_id, coach__user_id=request.user.user_id)
            team.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Team.DoesNotExist:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error deleting team: {e}", exc_info=True)
            return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
