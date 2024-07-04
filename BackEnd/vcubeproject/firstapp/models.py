from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class signup(models.Model):
    first_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30)
    email=models.EmailField(max_length=60, unique=True)
    password=models.CharField(max_length=30)
    phoneno=models.CharField(max_length=10,primary_key=True)
    aadharimage = models.ImageField(upload_to='images/')
    licenseimage = models.ImageField(upload_to='images/')   

    def __str__(self):
        return self.last_name

class cars(models.Model):
    company=models.CharField(max_length=30)
    vehicle_type=models.CharField(max_length=30)
    area=models.CharField(max_length=20)
    Registrationno=models.CharField(max_length=17,primary_key=True)
    phoneno=models.CharField(max_length=10)
    vehicle_RC=models.ImageField(upload_to='images/')
    photo_1=models.ImageField(upload_to='images/')
    photo_2=models.ImageField(upload_to='images/')
    photo_3=models.ImageField(upload_to='images/')
    Description=models.CharField(max_length=300)
    upload_by=models.CharField(max_length=30)
    
    def __str__(self):
        return self.company
    
    def delete(self):
        self.vehicle_RC.delete()
        self.photo_1.delete()
        self.photo_2.delete()
        self.photo_3.delete()
        super().delete()

class bikes(models.Model):
    company=models.CharField(max_length=30)
    vehicle_type=models.CharField(max_length=30)
    area=models.CharField(max_length=20)
    Registrationno=models.CharField(max_length=17,primary_key=True)
    phoneno=models.CharField(max_length=10)
    vehicle_RC=models.ImageField(upload_to='images/')
    photo_1=models.ImageField(upload_to='images/')
    photo_2=models.ImageField(upload_to='images/')
    photo_3=models.ImageField(upload_to='images/')
    Description=models.CharField(max_length=300)
    upload_by=models.CharField(max_length=30)

    def __str__(self):
        return self.company
    
    def delete(self):
        self.vehicle_RC.delete()
        self.photo_1.delete()
        self.photo_2.delete()
        self.photo_3.delete()
        super().delete()

class contactme(models.Model):
    name=models.CharField(max_length=30)
    phoneno=models.CharField(max_length=10)
    email=models.CharField(max_length=30)
    describe=models.CharField(max_length=300)

    def __str__(self):
        return self.name