import React from 'react'

class MediaItem extends React.Component {
	constructor() {
		super()

		this.increaseRank = this.increaseRank.bind(this)
		this.decreaseRank = this.decreaseRank.bind(this)
		this.editMedia = this.editMedia.bind(this)
		this.updateCurrentlyWatching = this.updateCurrentlyWatching.bind(this)
		this.deleteMedia = this.deleteMedia.bind(this)
	}

	increaseRank() {
		//increase rank in API by calling a callback function
		if (this.props.media !== 1) {
			console.log("increase rank!")
			let updatedMedia = this.props.media
			updatedMedia.rank--
			this.props.changeRanking(updatedMedia, 'increase')
		}
	}

	decreaseRank() {
		console.log("decrease rank!")
		let updatedMedia = this.props.media
		updatedMedia.rank++
		this.props.changeRanking(updatedMedia, 'decrease')
	}

	editMedia() {
		this.props.editMedia(this.props.media)
	}

	updateCurrentlyWatching() {
		this.props.updateCurrentlyWatching(this.props.media)
	}

	deleteMedia() {
		fetch("http://localhost:3001/media/delete/" + this.props.media._id, {
			method: 'DELETE'
		})

		this.props.deleteMedia()
	}
	
	render() {
		let watchingButtonText = ''

		watchingButtonText = this.props.media.isWatching ? 'In Progress!' : 'Start Watching!'

		return (
			<div>
				Rank: {this.props.media.rank}<br/>
				{this.props.media.title} - Season {this.props.media.season} <br/>
				{this.props.media.service}<br/>
				
				<button onClick={this.increaseRank}>/\</button>

				<button onClick={this.decreaseRank}>\/</button> 

				<button onClick={this.editMedia}>Edit</button> 

				<button onClick={this.updateCurrentlyWatching}>{watchingButtonText}</button> 

				<button onClick={this.deleteMedia}>Delete</button>
				<hr/>
			</div>
		)
	}

}

export default MediaItem