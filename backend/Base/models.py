from django.db import models

class SoftDeleteManager(models.Manager):

    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)
        

class SoftDeleteModel(models.Model):

    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()
    all_objects = models.Manager()

    def soft_delete(self):
        self.is_deleted = True
        self.save()

    def restore(self):
        self.is_deleted = False
        self.save()  

    def delete(self):
        self.soft_delete()
    
    def hard_delete(self):
        super(SoftDeleteModel, self).delete()


    class Meta:
        abstract = True