import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import NewMediaForm from './NewMediaForm'
import EditMediaForm from './EditMediaForm'
import MediaList from './MediaList'

class MainDisplay extends React.Component {
	constructor() {
		super()
		this.state = {
			loading: false,
			mediaList: [],
			filterMedia: '',
			displayNewMediaForm: false,
			displayEditMediaForm: false,
			editingMedia: []
		}

		this.setDisplayNewMediaForm = this.setDisplayNewMediaForm.bind(this)
		this.setDisplayEditMediaForm = this.setDisplayEditMediaForm.bind(this)
		this.updateCurrentlyWatching = this.updateCurrentlyWatching.bind(this)
		this.returnToMain = this.returnToMain.bind(this)
		this.changeRanking = this.changeRanking.bind(this)
		this.getMediaList = this.getMediaList.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	getMediaList() {
		let url = "http://localhost:3001/media"

		if (this.state.filterMedia) {
			url = url + "?search=" + this.state.filterMedia.toLowerCase()
		}
			
		fetch(url)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				this.setState((prevState) => ({
					...prevState,
					loading: false,
					mediaList: data
				}))
			})
			.catch(error => {
				this.setState({
					loading: false
				})
				console.log("error getting media!", error)
			})
	}

	setDisplayNewMediaForm() {
		this.setState((prevState) => ({
			displayNewMediaForm: !(prevState.displayNewMediaForm)
		}))

		setTimeout(() => { 
			this.getMediaList(); 
		}, 100);
	}

	setDisplayEditMediaForm(media = {}) {
		this.setState((prevState) => ({
			...prevState,
			displayEditMediaForm: !prevState.displayEditMediaForm,
			editingMedia: media
		}))

		setTimeout(() => { 
			this.getMediaList(); 
		}, 100);
	}

	updateCurrentlyWatching(media) {
		//update show currently watching
		let updateMedia = media
		updateMedia.isWatching = !updateMedia.isWatching

		fetch("http://localhost:3001/media/update/" + media._id, {
			method: 'PUT',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify(updateMedia)
		});

		return
	}

	changeRanking(updatedMedia, rankChangeType) {
		//need to iterate through entire list and update all the shows below the newest ordered item
		fetch("http://localhost:3001/media/update/" + updatedMedia._id, {
			method: 'PUT',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify(updatedMedia)
		});

		this.state.mediaList.forEach((media) => {
		  if (updatedMedia._id !== media._id && updatedMedia.rank === media.rank) {

		  	//if not the same show and the updated show rank is equal to show.rank

		  	//decrease = original show adds to rank, (+1); other show should decrease (-1) to replace it
		  	//increase = original show takes away rank (-1); other show should increase (+1) to replace it

		  	let adjustedMedia = media

		  	if (rankChangeType === 'decrease') adjustedMedia.rank = adjustedMedia.rank - 1
		  	if (rankChangeType === 'increase') adjustedMedia.rank = adjustedMedia.rank + 1

			fetch("http://localhost:3001/shows/update/" + adjustedMedia._id, {
				method: 'PUT',
				headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
				body: JSON.stringify(adjustedMedia)
			});
		  }
		});

		this.getMediaList()
	}

	returnToMain() {
		this.setState((prevState) => ({
			...prevState,
			displayEditMediaForm: false,
			displayNewMediaForm: false
		}))
	}

	componentDidMount() {
		this.setState({
			loading: true
		})

		this.getMediaList()
	}

	/*componentDidUpdate(prevProps, prevState) {
	  if (this.state.showList !== prevProps.showList) {
	    this.render()
	    console.log("boop")
	  }
	}*/

	handleChange(event) {
		event.persist()
		this.setState((prevState) => ({
			...prevState,
			filterMedia: event.target.value
		}))

		setTimeout(() => { 
			this.getMediaList(); 
		}, 100);
	}

	render() {
		let buttonDisplay = ''

		buttonDisplay = this.state.displayNewMediaForm ? '-' : '+'

		if (this.state.loading) {
			return 'Loading...'
		} else if (this.state.displayEditMediaForm) {
			return <EditMediaForm 
						media={this.state.editingMedia}
						onFormSubmit={this.setDisplayEditMediaForm}
						cancel={this.returnToMain}
					/> 
		} else if (this.state.displayNewMediaForm ) {
			return <NewMediaForm
						rank={this.state.mediaList.length}
						onFormSubmit={this.setDisplayNewMediaForm} 
						cancel={this.returnToMain}
					/>
		} else if (this.state.mediaList && !this.state.loading && !this.state.displayNewMediaForm && !this.state.displayEditMediaForm) {
			return (
				<div>
					<div style={{display:"flex"}}>
						<TextField 
							placeholder="Search Shows"
							onChange={this.handleChange}
							value={this.state.filterShows}
							name="filterShows"
						/>
						<Button 
							style={{marginLeft:"auto"}}
							onClick={this.setDisplayNewMediaForm}
							variant="contained"
							className="new-show-form-button"

						> 
							{buttonDisplay}
						</Button>
					</div>
					<MediaList 
						filter={this.state.filterMedia} 
						mediaList={this.state.mediaList}
						editMedia={this.setDisplayEditMediaForm}
						deleteMedia={this.getMediaList}
						updateCurrentlyWatching={this.updateCurrentlyWatching}
						changeRanking={this.changeRanking}
					/>
				</div>
			)
		}
	}
}

export default MainDisplay