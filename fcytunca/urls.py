"""fcytunca URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from fcytuncaweb import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.raiz),
    path('inicio/', views.index),
    path('historia/', views.resenha),
    path('marcolegal/', views.marcolegal),
    path('consejo/', views.consejo),
    path('acuerdos/', views.acuerdos),
    path('resolucion/', views.resolucion),
    path('bienestar_estudiantil/', views.bienestar_estudiantil),
    path('misionvision/', views.misionVision),
    path('identidad/', views.pagdeidentidad),
    path('reglamento_investigacion/', views.reglamento_investigacion),
    path('pasantia/', views.pasantias),
    path('calendario/', views.calendario),
    path('informatica/', views.carreraInfor),
]
