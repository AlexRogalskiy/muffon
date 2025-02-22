export const main = ({ profileId, tagId }) => {
  return {
    name: 'ProfileLibraryTagMainPage',
    params: { profileId, tagId },
    path: `profiles/${profileId}/library/tags/${tagId}`
  }
}

export const artists = ({ profileId, tagId }) => {
  return {
    name: 'ProfileLibraryTagArtistsPage',
    params: { profileId, tagId },
    path: `profiles/${profileId}/library/tags/${tagId}/artists`
  }
}
