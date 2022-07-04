from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Pacjent)
admin.site.register(Szczepionka)
admin.site.register(Szczepienie)
admin.site.register(Zaszczepiony)