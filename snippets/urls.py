from django.conf import settings
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

# API endpoints
urlpatterns = format_suffix_patterns([
    url(r'^$', views.api_root),
    url(r'^users/$',
        views.UserList.as_view(),
        name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)/$',
        views.UserDetail.as_view(),
        name='user-detail'),

    url(r'^scrolls/$', views.ScrollList.as_view(),
        name='scroll-list'),
    url(r'^scrolls/(?P<pk>[0-9]+)/$', views.ScrollDetail.as_view(),
        name='scroll-detail'),

    url(r'^pics/$', views.PicList.as_view(),
        name='pic-list'),
    url(r'^pics/(?P<pk>[0-9]+)/$', views.PicDetail.as_view(),
        name='pic-detail'),
    
    url(r'^mics/$', views.MicList.as_view(),
        name='mic-list'),
    url(r'^mics/(?P<pk>[0-9]+)/$', views.MicDetail.as_view(),
        name='mic-detail'),
])


# Login and logout views for the browsable API
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]

urlpatterns += [
    url(r'^client-google-oauth2-login/$', views.google_oauth2_login,
        name='google-oauth2-login'),
    url(r'^upgrade-account/$', views.UpgradeAccount.as_view(),
        name='upgrade-account'),

    url(r'^myscrolls/$', views.PrivateScrollList.as_view(),
        name='private-scroll-list'),
    url(r'^myscrolls/(?P<pk>[0-9]+)/$', views.PrivateScrollDetail.as_view(),
        name='private-scroll-detail'),
]

from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)