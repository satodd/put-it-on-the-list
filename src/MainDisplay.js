import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import NewShowForm from './NewShowForm'
import EditShowForm from './EditShowForm'
import ShowList from './ShowList'

class MainDisplay extends React.Component {
	constructor() {
		super()
		this.state = {
			loading: false,
			showList: [],
			filterShows: '',
			displayNewShowForm: false,
			displayEditShowForm: false,
			editingShow: []
		}

		this.setDisplayNewShowForm = this.setDisplayNewShowForm.bind(this)
		this.setDisplayEditShowForm = this.setDisplayEditShowForm.bind(this)
		this.updateCurrentlyWatching = this.updateCurrentlyWatching.bind(this)
		this.returnToMain = this.returnToMain.bind(this)
		this.changeRanking = this.changeRanking.bind(this)
		this.getShowList = this.getShowList.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	getShowList() {
		let url = "http://localhost:3001/shows"

		if (this.state.filterShows) {
			url = url + "?search=" + this.state.filterShows.toLowerCase()
		}
			
		fetch(url)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				this.setState((prevState) => ({
					...prevState,
					loading: false,
					showList: data
				}))
			})
			.catch(error => {
				this.setState({
					loading: false
				})
				console.log("error getting shows!", error)
			})
	}

	setDisplayNewShowForm() {
		this.setState((prevState) => ({
			displayNewShowForm: !(prevState.displayNewShowForm)
		}))

		setTimeout(() => { 
			this.getShowList(); 
		}, 100);
	}

	setDisplayEditShowForm(show = {}) {
		this.setState((prevState) => ({
			...prevState,
			displayEditShowForm: !prevState.displayEditShowForm,
			editingShow: show
		}))

		setTimeout(() => { 
			this.getShowList(); 
		}, 100);
	}

	updateCurrentlyWatching(show) {
		//update show currently watching
		let updateShow = show
		updateShow.isWatching = !updateShow.isWatching

		fetch("http://localhost:3001/shows/update/" + show._id, {
			method: 'PUT',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify(updateShow)
		});

		return
	}

	changeRanking(updatedShow, rankChangeType) {
		//need to iterate through entire list and update all the shows below the newest ordered item
		fetch("http://localhost:3001/shows/update/" + updatedShow._id, {
			method: 'PUT',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify(updatedShow)
		});

		this.state.showList.forEach((show) => {
		  if (updatedShow._id !== show._id && updatedShow.rank === show.rank) {

		  	//if not the same show and the updated show rank is equal to show.rank

		  	//decrease = original show adds to rank, (+1); other show should decrease (-1) to replace it
		  	//increase = original show takes away rank (-1); other show should increase (+1) to replace it

		  	let adjustedShow = show

		  	if (rankChangeType === 'decrease') adjustedShow.rank = adjustedShow.rank - 1
		  	if (rankChangeType === 'increase') adjustedShow.rank = adjustedShow.rank + 1

			fetch("http://localhost:3001/shows/update/" + adjustedShow._id, {
				method: 'PUT',
				headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
				body: JSON.stringify(adjustedShow)
			});
		  }
		});

		this.getShowList()
	}

	returnToMain() {
		this.setState((prevState) => ({
			...prevState,
			displayEditShowForm: false,
			displayNewShowForm: false
		}))
	}

	componentDidMount() {
		this.setState({
			loading: true
		})

		this.getShowList()
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
			filterShows: event.target.value
		}))

		setTimeout(() => { 
			this.getShowList(); 
		}, 100);
	}

	render() {
		let buttonDisplay = ''

		buttonDisplay = this.state.displayNewShowForm ? '-' : '+'

		if (this.state.loading) {
			return 'Loading...'
		} else if (this.state.displayEditShowForm) {
			return <EditShowForm 
						show={this.state.editingShow}
						onFormSubmit={this.setDisplayEditShowForm}
						cancel={this.returnToMain}
					/> 
		} else if (this.state.displayNewShowForm ) {
			return <NewShowForm
						rank={this.state.showList.length}
						onFormSubmit={this.setDisplayNewShowForm} 
						cancel={this.returnToMain}
					/>
		} else if (this.state.showList && !this.state.loading && !this.state.displayNewShowForm && !this.state.displayEditShowForm) {
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
							onClick={this.setDisplayNewShowForm}
							variant="contained"
							className="new-show-form-button"

						> 
							{buttonDisplay}
						</Button>
					</div>
					<ShowList 
						filter={this.state.filterShows} 
						showList={this.state.showList}
						editShow={this.setDisplayEditShowForm}
						deleteShow={this.getShowList}
						updateCurrentlyWatching={this.updateCurrentlyWatching}
						changeRanking={this.changeRanking}
					/>
				</div>
			)
		}
	}
}

export default MainDisplay