import React from 'react'
import { Header, Segment, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import List from './tracks/List'
import ErrorData from 'partials/ErrorData'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: true, page: 1 }
  }

  componentDidMount () {
    this.getTracks()
  }

  componentDidUpdate (prevProps, prevState) {
    const pageChanged = this.state.page !== prevState.page

    pageChanged && this.getTracks()
  }

  getTracks () {
    const switchLoader = bool => this.setState({ loading: !!bool })

    switchLoader(true)

    const artistNameEncoded = encodeURIComponent(this.props.artistName)
    const url = `/lastfm/artists/${artistNameEncoded}/tracks`
    const params = { params: { limit: 10, page: this.state.page } }

    const handleSuccess = resp => {
      const { topTrackCount } = this.state
      const { artist } = resp.data

      const firstTrackCount = artist.tracks[0].listeners_count

      this.setState({
        tracks: artist.tracks,
        topTrackCount: topTrackCount || firstTrackCount,
        totalPages: artist.total_pages,
        error: null
      })
    }
    const handleError = error => {
      this.setState({ error: error, tracks: null })
    }

    axios
      .get(url, params)
      .then(handleSuccess)
      .catch(handleError)
      .then(switchLoader)
  }

  render () {
    const {
      loading,
      tracks,
      error,
      topTrackCount,
      page,
      totalPages
    } = this.state
    const { artistName, scrollToSegmentTop } = this.props

    const tracksListProps = { tracks, topTrackCount, artistName }
    const tracksList = tracks && <List {...tracksListProps} />
    const errorData = error && <ErrorData {...{ error }} />
    const tracksData = tracksList || errorData

    const handlePageChange = (_, { activePage }) => {
      scrollToSegmentTop('tracks')
      this.setState({ page: activePage })
    }
    const paginationProps = {
      defaultActivePage: page,
      totalPages: totalPages,
      onPageChange: handlePageChange,
      firstItem: null,
      lastItem: null,
      siblingRange: 0
    }
    const paginationData = tracks && <Pagination {...paginationProps} />

    return (
      <Segment.Group id="tracks" className="artistPageSegmentWrap">
        <Segment>
          <Header as="h3" content="Top tracks" />
        </Segment>

        <Segment
          className="artistPageSegment"
          loading={loading}
          content={tracksData}
        />

        <Segment className="artistPagePaginationWrap">{paginationData}</Segment>
      </Segment.Group>
    )
  }
}
