from rest_framework import permissions


# class IsVaccinationOwner(permissions.BasePermission):
#
#     def has_permission(self, request, view):
#         print("przeszło")
#         return request.user.is_authenticated
#
#     def has_object_permission(self, request, view, obj):
#         print("Checking for object")
#         print("Dla kogo request: ")
#         print(obj.pacjent)
#         print("Kto zalogowany: ")
#         print(request.user)
#         return obj.pacjent == request.user

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        print("Dla kogo request: ")
        print(obj.pacjent)
        print("Kto zalogowany: ")
        print(request.user)
        return obj.pacjent == request.user



