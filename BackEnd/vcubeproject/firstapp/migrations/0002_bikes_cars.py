# Generated by Django 5.0.3 on 2024-03-08 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='bikes',
            fields=[
                ('company', models.CharField(max_length=30)),
                ('Registrationno', models.CharField(max_length=17, primary_key=True, serialize=False)),
                ('vehicle_RC', models.ImageField(upload_to='images/')),
                ('photo_1', models.ImageField(upload_to='images/')),
                ('photo_2', models.ImageField(upload_to='images/')),
                ('photo_3', models.ImageField(upload_to='images/')),
                ('Description', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='cars',
            fields=[
                ('company', models.CharField(max_length=30)),
                ('vehicle_type', models.CharField(max_length=30)),
                ('Registrationno', models.CharField(max_length=17, primary_key=True, serialize=False)),
                ('vehicle_RC', models.ImageField(upload_to='images/')),
                ('photo_1', models.ImageField(upload_to='images/')),
                ('photo_2', models.ImageField(upload_to='images/')),
                ('photo_3', models.ImageField(upload_to='images/')),
                ('Description', models.CharField(max_length=300)),
            ],
        ),
    ]
