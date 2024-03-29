from django.urls import path, include
from . import views
from django.contrib import admin

admin.site.site_url = 'http://127.0.0.1:8000/szczepienia/'
urlpatterns = [
    # path('pacjent', views.PacjentList.as_view(), name='pacjent-list'),
    # path('pacjent/<int:pk>', views.PacjentDetail.as_view(), name='pacjent-details'),
    path('pracownik', views.PracownikAdd.as_view(), name='pracownik-add'),
    path('pracownik/<int:pk>', views.PracownikDetails.as_view(), name='pracownik-details'),
    path('pracownikList', views.PracownikList.as_view(), name='pracownik-list'),
    path('szczepionka', views.SzczepionkaList.as_view(), name='szczepionka-list'),
    path('szczepionka/<int:pk>', views.SzczepionkaDetail.as_view(), name='szczepionka-details'),
    path('szczepionkaGet', views.SzczepionkaGet.as_view(), name='szczepionka-get'),
    path('szczepienie', views.SzczepienieList.as_view(), name='szczepienie-list'),
    path('szczepienie/<int:pk>', views.SzczepienieDetail.as_view(), name='szczepienie-details'),
    # path('zaszczepiony', views.ZaszczepionyList.as_view(), name='zaszczepiony-list'),
    # path('zaszczepiony/<int:pk>', views.ZaszczepionyDetail.as_view(), name='zaszczepiony-details'),
    path('punkt', views.PunktList.as_view(), name='punkt-list'),
    path('punkt/<int:pk>', views.PunktDetail.as_view(), name='punkt-details'),
    path('getPunkty', views.GetPunkty.as_view(), name='punkt-get'),
    path('getPunkty/<int:pk>', views.GetPunktyDetail.as_view(), name='punkt-get-details'),
    path('getSzczepienie', views.GetSzczepienie.as_view(), name='szczepienie-get'),
    path('getSzczepienieByPunkt', views.GetSzczepienieByPunkt.as_view(), name='szczepienie-get-punkt'),
    path('editDate/<int:pk>', views.EditSzczepienieDate.as_view(), name='szczepienie-edit-date'),
    #path('', views.ApiRoot.as_view(), name=views.ApiRoot.name),
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),

    path('edit', views.PatientProfileEdit.as_view(), name='edit-profile'),

    path('userList', views.UserList.as_view(), name='user-list'),
    path('pacjentList', views.PacjentListView.as_view(), name='pacjent-list'),
]