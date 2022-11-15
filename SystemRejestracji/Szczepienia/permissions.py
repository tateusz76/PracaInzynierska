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

    def has_object_permission(self, request, view, obj):
        print("self:")
        print(self)
        print("request:")
        print(request)
        print("view:")
        print(view)
        print("obj:")
        print(obj)
        print("Czy zgadzaja sie userzy?:")
        print(obj.pacjent == request.user)
        if request.user.is_authenticated:
            print("ZALOGOWANY")
            if obj.pacjent == request.user:
                print("USERZY SIE ZGADZAJĄ")
                return True
        else:
            print("NIE ZALOGOWANY")
            return False

    # def has_permission(self, request, view):
    #     return request.user.is_authenticated



