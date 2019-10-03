import React from 'react'

class ShowItem extends React.Component {
	constructor() {
		super()

		this.increaseRank = this.increaseRank.bind(this)
		this.decreaseRank = this.decreaseRank.bind(this)
		this.editShow = this.editShow.bind(this)
		this.updateCurrentlyWatching = this.updateCurrentlyWatching.bind(this)
		this.deleteShow = this.deleteShow.bind(this)
	}

	increaseRank() {
		//increase rank in API by calling a callback function
		if (this.props.show !== 1) {
			console.log("increase rank!")
			let updatedShow = this.props.show
			updatedShow.rank--
			this.props.changeRanking(updatedShow, 'increase')
		}
	}

	decreaseRank() {
		console.log("decrease rank!")
		let updatedShow = this.props.show
		updatedShow.rank++
		this.props.changeRanking(updatedShow, 'decrease')
	}

	editShow() {
		this.props.editShow(this.props.show)
	}

	updateCurrentlyWatching() {
		this.props.updateCurrentlyWatching(this.props.show)
	}

	deleteShow() {
		fetch("http://localhost:3001/shows/delete/" + this.props.show._id, {
			method: 'DELETE'
		})

		this.props.deleteShow()
	}
	
	render() {
		let watchingButtonText = ''

		watchingButtonText = this.props.show.isWatching ? 'In Progress!' : 'Start Watching!'

		return (
			<div>
				Rank: {this.props.show.rank}<br/>
				{this.props.show.title} - Season {this.props.show.season} <br/>
				{this.props.show.service}<br/>
				
				<button onClick={this.increaseRank}>/\</button>

				<button onClick={this.decreaseRank}>\/</button> 

				<button onClick={this.editShow}>Edit</button> 

				<button onClick={this.updateCurrentlyWatching}>{watchingButtonText}</button> 

				<button onClick={this.deleteShow}>Delete</button>
				<hr/>
			</div>
		)
	}

}

export default ShowItem