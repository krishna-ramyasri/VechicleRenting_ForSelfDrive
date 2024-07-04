from django.urls import path,include
from . import views

urlpatterns=[
    path('signup/',views.signupapi.as_view(),name='signupapi'),
    path('login/',views.loginapi.as_view(),name='loginapi'),
    path('forgot/',views.forgotapi.as_view(),name='forgotapi'),
    path('otpvalidation/',views.otpvalidation.as_view(),name='optpvalidationapi'),
    path('carpost/',views.carpost.as_view(),name='carpostapi'),
    path('bikepost/',views.bikepost.as_view(),name='bikepostapi'),
    path('logout/',views.logoutapi.as_view(),name='logoutapi'),
    path('successotp/',views.successotpapi.as_view(),name='successotpapi'),
    path('contact/',views.contactapi.as_view(),name='contactapi'),
    path('dashboard/',views.dashboarddata.as_view(),name='dashboardapi'),
    path('deleteveh/',views.delete_vehicle.as_view(),name='deletevehicle'),    
]