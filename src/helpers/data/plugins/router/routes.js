const RootPage = () => import(
  '%/RootPage.vue'
)
const StartPage = () => import(
  '%/StartPage.vue'
)
const ArtistMainPage = () => import(
  '%/artist/MainPage.vue'
)
const ArtistImagesPage = () => import(
  '%/artist/ImagesPage.vue'
)
const ArtistTracksPage = () => import(
  '%/artist/TracksPage.vue'
)
const ArtistAlbumsPage = () => import(
  '%/artist/AlbumsPage.vue'
)
const ArtistSimilarPage = () => import(
  '%/artist/SimilarPage.vue'
)
const AlbumMainPage = () => import(
  '%/album/MainPage.vue'
)
const TrackMainPage = () => import(
  '%/track/MainPage.vue'
)
const TrackSimilarPage = () => import(
  '%/track/SimilarPage.vue'
)
const TagMainPage = () => import(
  '%/tag/MainPage.vue'
)
const TagArtistsPage = () => import(
  '%/tag/ArtistsPage.vue'
)
const TagAlbumsPage = () => import(
  '%/tag/AlbumsPage.vue'
)
const TagTracksPage = () => import(
  '%/tag/TracksPage.vue'
)
const VideoChannelVideosPage = () => import(
  '%/video/channel/VideosPage.vue'
)
const VideoMainPage = () => import(
  '%/video/MainPage.vue'
)

export default [
  {
    path: '/',
    exact: true,
    name: 'RootPage',
    component: RootPage
  },
  {
    path: '/start',
    exact: true,
    name: 'StartPage',
    component: StartPage
  },
  {
    path: '/artists/:artistName',
    exact: true,
    name: 'ArtistMainPage',
    component: ArtistMainPage,
    props: true
  },
  {
    path: '/artists/:artistName/images',
    exact: true,
    name: 'ArtistImagesPage',
    component: ArtistImagesPage,
    props: true
  },
  {
    path: '/artists/:artistName/tracks',
    exact: true,
    name: 'ArtistTracksPage',
    component: ArtistTracksPage,
    props: true
  },
  {
    path: '/artists/:artistName/albums',
    exact: true,
    name: 'ArtistAlbumsPage',
    component: ArtistAlbumsPage,
    props: true
  },
  {
    path: '/artists/:artistName/similar',
    exact: true,
    name: 'ArtistSimilarPage',
    component: ArtistSimilarPage,
    props: true
  },
  {
    path: '/artists/:artistName/albums/:albumTitle',
    exact: true,
    name: 'AlbumMainPage',
    component: AlbumMainPage,
    props: true
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle',
    exact: true,
    name: 'TrackMainPage',
    component: TrackMainPage,
    props: true
  },
  {
    path: '/artists/:artistName/tracks/:trackTitle/similar',
    exact: true,
    name: 'TrackSimilarPage',
    component: TrackSimilarPage,
    props: true
  },
  {
    path: '/tags/:tagName',
    exact: true,
    name: 'TagMainPage',
    component: TagMainPage,
    props: true
  },
  {
    path: '/tags/:tagName/artists',
    exact: true,
    name: 'TagArtistsPage',
    component: TagArtistsPage,
    props: true
  },
  {
    path: '/tags/:tagName/albums',
    exact: true,
    name: 'TagAlbumsPage',
    component: TagAlbumsPage,
    props: true
  },
  {
    path: '/tags/:tagName/tracks',
    exact: true,
    name: 'TagTracksPage',
    component: TagTracksPage,
    props: true
  },
  {
    path: '/video/channels/:channelId/videos',
    exact: true,
    name: 'VideoChannelVideosPage',
    component: VideoChannelVideosPage,
    props: true
  },
  {
    path: '/video/videos/:videoId',
    exact: true,
    name: 'VideoMainPage',
    component: VideoMainPage,
    props: true
  }
]
