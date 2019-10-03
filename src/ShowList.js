import React from 'react'
import ShowItem from './ShowItem'

class ShowList extends React.Component {
	constructor(props) {
		super()

		this.editShow = this.editShow.bind(this)
		this.changeRanking = this.changeRanking.bind(this)
		this.deleteShow = this.deleteShow.bind(this)
		this.updateCurrentlyWatching = this.updateCurrentlyWatching.bind(this)
	}

	editShow(show) {
		this.props.editShow(show)
	}

	changeRanking(show, type) {
		this.props.changeRanking(show, type)
	}

	updateCurrentlyWatching(show) {
		this.props.updateCurrentlyWatching(show)
	}

	deleteShow() {
		this.props.deleteShow()
	}

	render() {
		let showsArray = this.props.showList

		showsArray.sort((a, b) => {return a.rank - b.rank});
		return (
			<div>
			{showsArray ? showsArray.map(show => (
	            <ShowItem key={show._id} 
	            	show={show} 
	            	editShow={this.editShow} 
	            	changeRanking={this.changeRanking}
	            	updateCurrentlyWatching={this.updateCurrentlyWatching}
	            	deleteShow={this.deleteShow}
	            />
	        )) : ':('}
			</div>
		)
	}
}

export default ShowList