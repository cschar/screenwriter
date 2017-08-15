from rest_framework import serializers
from snippets.models import Scroll, Pic, Mic

#
# class SnippetSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     title = serializers.CharField(required=False, allow_blank=True, max_length=100)
#     code = serializers.CharField(style={'base_template': 'textarea.html'})
#     linenos = serializers.BooleanField(required=False)
#     language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
#     style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')
#
#     def create(self, validated_data):
#         """
#         Create and return a new `Snippet` instance, given the validated data.
#         """
#         return Snippet.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         """
#         Update and return an existing `Snippet` instance, given the validated data.
#         """
#         instance.title = validated_data.get('title', instance.title)
#         instance.code = validated_data.get('code', instance.code)
#         instance.linenos = validated_data.get('linenos', instance.linenos)
#         instance.language = validated_data.get('language', instance.language)
#         instance.style = validated_data.get('style', instance.style)
#         instance.save()
#         return instance



from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    scrolls = serializers.PrimaryKeyRelatedField(many=True, queryset=Scroll.objects.all())

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'scrolls')


class MicSerializer(serializers.ModelSerializer):
    # url = serializers.FileField(source='file')

    class Meta:
        model = Mic
        # fields = ('id', 'url', 'scroll', 'owner', ='description')
        fields = ('id', 'file', 'scroll', 'owner', 'description')



class ScrollSerializer(serializers.HyperlinkedModelSerializer):

    # pic_set = serializers.PrimaryKeyRelatedField(many=True, queryset=Pic.objects.all())
    pic_set = serializers.HyperlinkedRelatedField(many=True, view_name='pic-detail', read_only=True)

    # mics = serializers.HyperlinkedRelatedField(many=True, view_name='mic-detail', read_only=True)
    # mic_set = serializers.HyperlinkedRelatedField(many=True, view_name='mic-detail', read_only=True)
    mic_set = MicSerializer(many=True, read_only=True)


    class Meta:
        model = Scroll
        fields = ('url', 'id', 'title', 'author', 'text',
                  'pic_set', 'mic_set')
                  # 'pics', 'mics')



class PicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pic
        # fields = ('url', 'id', 'image')
        fields = ('id', 'image', 'scroll_id',
                  'info', 'scroll', 'owner')

