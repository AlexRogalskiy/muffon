import i18n from '&/i18n'
import {
  main as formatArtistMainLink,
  tracks as formatArtistTracksLink
} from '#/formatters/links/artist'
import { main as formatTrackMainLink } from '#/formatters/links/track'

export default function ({
  artistName,
  trackTitle,
  sourceParams,
  pageNameKey
}) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatTrackMainLink({
        artistName,
        trackTitle,
        sourceParams
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.artists'
      )
    },
    {
      name: artistName,
      link: formatArtistMainLink({
        artistName
      })
    },
    {
      name: i18n.global.t(
        'navigation.tracks'
      ),
      link: formatArtistTracksLink({
        artistName
      })
    },
    {
      name: trackTitle,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
