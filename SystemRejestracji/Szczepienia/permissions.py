from rest_framework import permissions


class IsOwnedByUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        message = {'detail': 'Brak dostępu do obiektu'}
        #return obj.pacjent == request.user
        return message




