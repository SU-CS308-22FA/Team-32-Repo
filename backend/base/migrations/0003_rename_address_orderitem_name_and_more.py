# Generated by Django 4.1.3 on 2022-12-04 01:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_order_review_orderitem'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderitem',
            old_name='address',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='orderitem',
            old_name='shippingPrice',
            new_name='price',
        ),
        migrations.RenameField(
            model_name='review',
            old_name='id',
            new_name='_id',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='city',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='country',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='postalcode',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='qty',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.CreateModel(
            name='ShippingAddress',
            fields=[
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=200, null=True)),
                ('postalCode', models.CharField(blank=True, max_length=200, null=True)),
                ('country', models.CharField(blank=True, max_length=200, null=True)),
                ('shippingPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.order')),
            ],
        ),
    ]
