from rest_framework.serializers import ModelSerializer,ValidationError
from .models import signup,cars,bikes,contactme
from django.contrib.auth.models import User
from rest_framework import serializers
class signupserilalizer(ModelSerializer):
    class Meta:
        model=signup
        fields=['first_name','last_name','email','password','phoneno','aadharimage','licenseimage']
        
        
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}  

    def create(self, validated_data):
    
        if User.objects.filter(email=validated_data['email']).exists():
            raise ValidationError({"Error": "Email already exists."})

        if User.objects.filter(username=validated_data['username']).exists():
            raise ValidationError({"Error": "Username already exists."})

        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class carsserializer(ModelSerializer):
    photo_3=serializers.ImageField(required=False)
    class Meta:
        model=cars
        fields='__all__'

    def validate(self, validated_data):    
        if cars.objects.filter(Registrationno=validated_data['Registrationno']).exists() or bikes.objects.filter(Registrationno=validated_data['Registrationno']).exists():
            raise ValidationError({"Error": "Registrationno already exists..."})
        return validated_data
        
class bikesserializer(ModelSerializer):
    photo_3=serializers.ImageField(required=False)
    class Meta:
        model=bikes
        fields='__all__'

    def validate(self,validate_data):
        if bikes.objects.filter(Registrationno=validate_data['Registrationno']).exists() or cars.objects.filter(Registrationno=validate_data['Registrationno']).exists():
            raise ValidationError({"Error":"Registrationo already exists..."})
        return validate_data        

class CombinedSerializer(serializers.Serializer):
    def to_representation(self, instance):
        if isinstance(instance, bikes):
            serializer = bikesserializer(instance)
        elif isinstance(instance, cars):
            serializer = carsserializer(instance)
        else:
            raise Exception("Unknown instance type")

        return serializer.data

class updatesignup(ModelSerializer):
    class Meta:
        model=signup
        fields=['first_name','last_name','email','password','phoneno']


class updateuser(ModelSerializer):
    class Meta:
        model=User
        fields=['first_name','last_name','username','email','password']
    

class contactserilizer(ModelSerializer):
    class Meta:
        model=contactme
        fields='__all__'