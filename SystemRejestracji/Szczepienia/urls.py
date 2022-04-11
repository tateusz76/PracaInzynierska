from django.urls import path, include
from . import views
from django.contrib import admin

admin.site.site_url = 'http://127.0.0.1:8000/szczepienia/'
urlpatterns = [
    path('pacjent', views.PacjentList.as_view(), name='pacjent-list'),
    path('pacjent/<int:pk>', views.PacjentDetail.as_view(), name='pacjent-details'),
    path('szczepionka', views.SzczepionkaList.as_view(), name='szczepionka-list'),
    path('szczepionka/<int:pk>', views.SzczepionkaDetail.as_view(), name='szczepionka-details'),
    path('szczepienie', views.SzczepienieList.as_view(), name='szczepienie-list'),
    path('szczepienie/<int:pk>', views.SzczepienieDetail.as_view(), name='szczepienie-details'),
    path('', views.ApiRoot.as_view(), name=views.ApiRoot.name),
]