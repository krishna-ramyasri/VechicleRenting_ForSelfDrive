from django.shortcuts import render,redirect
from .models import signup
from rest_framework.views import APIView
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_200_OK,HTTP_404_NOT_FOUND,HTTP_100_CONTINUE
from rest_framework.response import Response
from .serializer import *
from django.contrib.auth import authenticate,login,logout
import random
from django.contrib.auth.decorators import login_required,user_passes_test
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import cars,bikes
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.contrib.sessions.models import Session
from rest_framework import viewsets
from itertools import chain


# Create your views here.
class signupapi(APIView):
    def post(self,request):
        signupdata=signupserilalizer(data=request.data)
        serializer=UserSerializer(data=request.data)
        if signupdata.is_valid()==True and serializer.is_valid()==True:
            account=serializer.save()
            signupdata.save()
            return Response({
                'message': 'User created successfully',
                'user_data': {
                    'username': account.username,
                    'email': account.email,
                    'first_name': account.first_name,
                    'last_name': account.last_name
                }
            }, status=HTTP_201_CREATED)
        else:
            return Response(signupdata.errors,status=HTTP_400_BAD_REQUEST)

class loginapi(APIView):
    def post(self,request):
        remail=request.data['emailphone']
        rpassword=request.data['password']
        valid_user=authenticate(request,username=remail,password=rpassword)    
        if valid_user != None:
            login(request,valid_user)
            user_serializer=UserSerializer(valid_user)
            return Response(user_serializer.data,status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
        
class logoutapi(APIView):
    def get(self,request):
        logout(request)
        return Response(status=HTTP_200_OK)

def otpgeneration():
    res=random.randint(1000,9999)
    return res

class forgotapi(APIView):
    def post(self,request):
        val=User.objects.filter(email=request.data['email'])
        if len(val)>0:
            otp=otpgeneration()
            request.session['Email']=request.data['email']
            request.session['gen_otp'] = otp
            request.session.set_expiry(300)
            request.session.save()
            print(request.session.items())
            subject='OTP'
            from_user='ch.srikanth0809@gmail.com'
            to_list=[request.data['email']]
            msg='''
                {} this is the otp to update your personal details...
                Note:This otp is valide for 5 mins'''.format(otp)
            send_mail(subject=subject,from_email=from_user,recipient_list=to_list,message=msg)
            return Response(status=HTTP_200_OK)
        else:
            return Response(status=HTTP_404_NOT_FOUND)

class otpvalidation(APIView):
    def post(self,request):
        recent_session = Session.objects.order_by('-expire_date').first()
        session_otp=recent_session.get_decoded()['gen_otp']
        user_otp=request.data['otp']
        if str(session_otp)==user_otp:
            return Response(status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
        
class successotpapi(APIView):
    def get(self,request):
        recent_session = Session.objects.order_by('-expire_date').first()
        session_email=recent_session.get_decoded()['Email']
        user_details=signup.objects.get(email=session_email)
        auth_details=User.objects.get(email=session_email)
        user_data = {
                    'first_name': user_details.first_name,
                    'last_name': user_details.last_name,
                    'email': user_details.email,
                    'username':auth_details.username,
                    'phoneno': user_details.phoneno,
                    'password':user_details.password,
                }
        return Response(user_data,status=HTTP_200_OK)
    
    def put(self, request):
        recent_session = Session.objects.order_by('-expire_date').first()
        session_email = recent_session.get_decoded()['Email']
        signval = signup.objects.get(email=session_email)
        useval = User.objects.get(email=session_email)
            
        signseri = updatesignup(signval, data=request.data)
        useseri = updateuser(useval, data=request.data)
        sign_valid = signseri.is_valid()
        use_valid = useseri.is_valid()           
        if sign_valid and use_valid:
            signseri.save()
            useseri.save()
            new_password = request.data.get('password')
            if new_password:
                useval.set_password(new_password)
                useval.save()
            return Response(status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST) 
        
class filtering(viewsets.ModelViewSet):
     def create(self, request):
        brand = request.data.get('company')
        Type = request.data.get('type')
        
        if Type == 'car':
            carobjs = cars.objects.filter(company=brand)
            serializer = carsserializer(carobjs, many=True,context={'request': request})
            return Response(serializer.data, status=HTTP_200_OK)
        elif Type == 'bike':
            bikeobjs = bikes.objects.filter(company=brand)
            serializer = bikesserializer(bikeobjs, many=True,context={'request': request})
            return Response(serializer.data, status=HTTP_200_OK)
        
        return Response({'message': 'Invalid type'}, status=HTTP_400_BAD_REQUEST)

class getcarpost(viewsets.ModelViewSet):
    carobj=cars.objects.all()
    queryset=carobj
    serializer_class=carsserializer

class getbikepost(viewsets.ModelViewSet):
    bikeobj=bikes.objects.all()
    queryset=bikeobj
    serializer_class=bikesserializer

class contactapi(APIView):
    def post(self,request):
        seri=contactserilizer(data=request.data)
        if seri.is_valid()==True:
            seri.save()
            return Response(status=HTTP_200_OK)
        else:
            print(seri.errors)
            return Response(status=HTTP_400_BAD_REQUEST)
        

class carpost(APIView): 
   def post(self,request):
        seri=carsserializer(data=request.data)
        if seri.is_valid()==True:
            seri.save()
            return Response(status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

class bikepost(APIView):
    def post(self,request):
        seri=bikesserializer(data=request.data)
        if seri.is_valid()==True:
            seri.save()
            return Response(status=HTTP_200_OK)
        else:
            print(seri.errors)
            return Response(status=HTTP_400_BAD_REQUEST)
        
class fulldetails(viewsets.ModelViewSet):
    def create(self,request):
        regno=request.data.get('reg_no')
        try:
            bikeobj=bikes.objects.get(Registrationno=regno)
        except Exception:
            carobj=cars.objects.get(Registrationno=regno)
            serializers=carsserializer(carobj,context={'request': request})
        else:
            serializers=bikesserializer(bikeobj,context={'request': request})
        return Response(serializers.data,status=HTTP_200_OK)    
            
            
class dbdetails(viewsets.ModelViewSet):
    def create(self,request):
        currentuser=request.data.get('current_user')
        veh_type=request.data.get('type')
        if veh_type in ['car','Car']:
            carobjs=cars.objects.filter(upload_by=currentuser)
            serializers=carsserializer(carobjs,many=True,context={'request':request})
            return Response(serializers.data,status=HTTP_200_OK)
        elif veh_type in ['bike','Bike']:
            bikeobjs=bikes.objects.filter(upload_by=currentuser)
            serializers=bikesserializer(bikeobjs,many=True,context={'request':request})
            return Response(serializers.data,status=HTTP_200_OK)
        elif veh_type in ['totalclick']:
            carobjs=cars.objects.filter(upload_by=currentuser)
            car_serializers=carsserializer(carobjs,many=True,context={'request':request}).data
            bikeobjs=bikes.objects.filter(upload_by=currentuser)
            bike_serializers=bikesserializer(bikeobjs,many=True,context={'request':request}).data
            serializers=list(chain(car_serializers,bike_serializers))
            return Response(serializers,status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
    
class dashboarddata(APIView):
    def post(self,request):
        current_user=request.data.get('email')
        carcount=cars.objects.filter(upload_by=current_user)
        bikecount=bikes.objects.filter(upload_by=current_user)
        totalvehicles=len(bikecount)+len(carcount)
        
        dash_data={
            "total_vehicles":totalvehicles,
            "total_cars":len(carcount),
            "total_bikes":len(bikecount),
        }
        return Response(dash_data,status=HTTP_200_OK)

class delete_vehicle(APIView):
    def post(self,request):
        veh_number=request.data.get('vehno')
        try:
            carobj=cars.objects.get(Registrationno=veh_number)
        except Exception:
            bikeobj=bikes.objects.get(Registrationno=veh_number)
            bikeobj.delete()
        else:
            carobj.delete()
        return Response(status=HTTP_200_OK)





        