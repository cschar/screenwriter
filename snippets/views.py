# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from snippets.models import Snippet, Scroll, Pic, Mic, AuthInfo
from snippets.permissions import IsOwnerOrReadOnly
from snippets.serializers import SnippetSerializer, ScrollSerializer, PicSerializer, MicSerializer

from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import renderers
from rest_framework.response import Response


# class SnippetList(APIView):
#     """
#     List all snippets, or create a new snippet.
#     """
#     def get(self, request, format=None):
#         snippets = Snippet.objects.all()
#         serializer = SnippetSerializer(snippets, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = SnippetSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class SnippetDetail(APIView):
#     """
#     Retrieve, update or delete a snippet instance.
#     """
#     def get_object(self, pk):
#         try:
#             return Snippet.objects.get(pk=pk)
#         except Snippet.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         serializer = SnippetSerializer(snippet)
#         return Response(serializer.data)
#
#     def put(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         serializer = SnippetSerializer(snippet, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         snippet.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

from snippets.serializers import UserSerializer
from django.contrib.auth.models import User, AnonymousUser

from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import generics
from rest_framework import permissions


class SnippetList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly,)

    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer



class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from rest_framework.authtoken.models import Token

@api_view(['POST'])
def google_oauth2_login(request):
    """
    this is so bad, no time to implement auth properly
    """
    # import ipdb; ipdb.set_trace();

    access_token = request.data['access_token']
    import requests
    authorization_header = {"Authorization": "OAuth %s" % access_token}
    r = requests.get("https://www.googleapis.com/oauth2/v2/userinfo",
                   headers=authorization_header)

    if r.status_code != 200:  # 401
        #invalid access_token was sent from client
        return Response({}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        user_data = r.json()
        print 'verifying oauth access_token'
        print user_data
        #create / login user
        #send back token to use api
        user, _ = User.objects.get_or_create(username=user_data['given_name'],
                                             email=user_data['email'])

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key
        })

from rest_framework.authentication import TokenAuthentication



@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })


class SnippetHighlight(generics.GenericAPIView):
    queryset = Snippet.objects.all()
    renderer_classes = (renderers.StaticHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)




class PrivateScrollList(APIView):

    #http://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication
    #header sent from client ex:
    #Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        # import ipdb; ipdb.set_trace();

        scrolls = Scroll.objects.filter(author=request.user)
        serializer = ScrollSerializer(scrolls,
                                      many=True,
                                      context={'request': request})
        #doesn't give data.results just data..
        #but ScrollLIst view below gives data.results hm
        return Response(serializer.data)

    def post(self, request, format=None):
        # import ipdb; ipdb.set_trace();
        serializer = ScrollSerializer(data=request.data,
                                      context={'request': request})
        if serializer.is_valid():

            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PrivateScrollDetail(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    queryset = Scroll.objects.all()
    serializer_class = ScrollSerializer

    def get_object(self, pk):
        try:
            return Scroll.objects.get(pk=pk)
        except Scroll.DoesNotExist:
            raise Http404

    def delete(self, request, *args, **kwargs):
        scroll = self.get_object(kwargs['pk'])
        if scroll.author != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        scroll.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ScrollList(generics.ListAPIView):
    queryset = Scroll.objects.all()
    serializer_class = ScrollSerializer

class ScrollDetail(generics.RetrieveAPIView):
    queryset = Scroll.objects.all()
    serializer_class = ScrollSerializer


class PicList(APIView):
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

    def get(self, request, format=None):
        pic = Pic.objects.all()
        serializer = PicSerializer(pic, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # import ipdb; ipdb.set_trace();
        serializer = PicSerializer(data=request.data)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def pre_save(self, obj):
    #     obj.owner = self.request.user


class PicDetail(generics.RetrieveAPIView):
    queryset = Pic.objects.all()
    serializer_class = PicSerializer



class MicList(APIView):
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

    def get(self, request, format=None):
        mic = Mic.objects.all()
        serializer = MicSerializer(mic, many=True, context={'request': request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # import ipdb; ipdb.set_trace();
        serializer = MicSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
           file = serializer.validated_data['file']
           file.name = file.name + '.webm'

           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MicDetail(generics.RetrieveDestroyAPIView):
    queryset = Mic.objects.all()
    serializer_class = MicSerializer

