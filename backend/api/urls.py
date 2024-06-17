from django.urls import path
from .views import UserRegisterView, LoginView, DeleteUserView, ListUsersView, TeamListView, TeamDetailView, PlayerListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', ListUsersView.as_view(), name='list_users'),
    path('delete/<int:user_id>/', DeleteUserView.as_view(), name='delete_user'),
    path('teams/', TeamListView.as_view(), name='list_teams'),
    path('teams/<int:team_id>/', TeamDetailView.as_view(), name='detail_team'),
    path('teams/<int:team_id>/players/', PlayerListView.as_view(), name='list_create_players'),
]
