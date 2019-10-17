import React from 'react'
import MediaItem from './MediaItem'

class MediaList extends React.Component {
	constructor(props) {
		super()

		this.editMedia = this.editMedia.bind(this)
		this.changeRanking = this.changeRanking.bind(this)
		this.deleteMedia = this.deleteMedia.bind(this)
		this.updateCurrentlyWatching = this.updateCurrentlyWatching.bind(this)
	}

	editMedia(media) {
		this.props.editMedia(media)
	}

	changeRanking(media, type) {
		this.props.changeRanking(media, type)
	}

	updateCurrentlyWatching(media) {
		this.props.updateCurrentlyWatching(media)
	}

	deleteMedia() {
		this.props.deleteMedia()
	}

	render() {
		let mediaArray = this.props.mediaList

		mediaArray.sort((a, b) => {return a.rank - b.rank});
		return (
			<div>
			{mediaArray ? mediaArray.map(media => (
	            <MediaItem key={media._id} 
	            	media={media} 
	            	editMedia={this.editMedia} 
	            	changeRanking={this.changeRanking}
	            	updateCurrentlyWatching={this.updateCurrentlyWatching}
	            	deleteMedia={this.deleteMedia}
	            />
	        )) : ':('}
			</div>
		)
	}
}

export default MediaList