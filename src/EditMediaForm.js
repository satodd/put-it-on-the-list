import React from 'react'

import { TextField, Checkbox, Button, Select } from '@material-ui/core';


class EditMediaForm extends React.Component {
	constructor() {
		super()
		this.state = {
			type: '',
			title: '',
			season: '',
			service: '',
			length: '',
			tags: {},
			isWatching: false

		}

		this.handleChange = this.handleChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount() {
		this.setState({
			type: this.props.media.type,
			title: this.props.media.title,
			season: this.props.media.season,
			service: this.props.media.service,
			length: this.props.media.length,
			tags: {
				"animated": this.props.media.tags.animated,
				"anime": this.props.media.tags.amime,
				"comedy": this.props.media.tags.comedy,
				"scary": this.props.media.tags.scary,
				"action": this.props.media.tags.action
			},
			isWatching: this.props.media.isWatching
		})

	}

	handleChange(event) {
		let {name, value, type, checked} = event.target

		if (type === 'checkbox') {
			this.setState((prevState) => ({
				tags: {
					...prevState.tags,
					[name]: checked
				}
			}))
		} else {
			this.setState({
				[name]: value
			})
		}
	}

	onSubmit(event) {
		let updatemedia = {
			title: this.state.title,
			season: this.state.season,
			service: this.state.service,
			length: this.state.length,
			tags: this.state.tags,
			rank: this.props.media.rank,
			isWatching: this.props.media.isWatching
		}

		fetch("http://localhost:3001/media/update/" + this.props.media._id, {
			method: 'PUT',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify(updatemedia),
		});

		this.props.onFormSubmit()
	}

	render() {
		return (
			<div>
				<div>
					<TextField 
						value={this.state.title} 
						name="title"
						placeholder="Title"
						onChange={this.handleChange}
					/>
				</div>
				<div>
				<TextField 
					value={this.state.season}
					name="season"
					placeholder="Season"
					onChange={this.handleChange}
				/>
				</div>
				<div>
				<TextField 
					value={this.state.service}
					name="service"
					placeholder="Service"
					onChange={this.handleChange}
				/>
				</div>
				<div>
					<label>
						<Checkbox 
							name="animated"
							onChange={this.handleChange}
							checked={this.state.tags.animated ? true : false}
						/>
						Animated
					</label>
					<label>
						<Checkbox
							name="anime"
							onChange={this.handleChange}
							checked={this.state.tags.anime ? true : false}
						/>
						Anime {this.state.tags.anime ? 'true' : 'false'}
					</label>
					<br/>
					<label>
						<Checkbox
							name="comedy"
							onChange={this.handleChange}
							checked={this.state.tags.comedy ? true : false}
						/>
						Comedy
					</label>
					<label>
						<Checkbox
							name="scary"
							onChange={this.handleChange}
							checked={this.state.tags.scary ? true : false}
						/>
						Scary
					</label>
					<label>
						<Checkbox
							name="action"
							onChange={this.handleChange}
							checked={this.state.tags.action ? true : false}
						/>
						Action
					</label>
				</div>
				<div>
					<Select name="length" value={this.state.length} onChange={this.handleChange}>
						<option value="default" disabled> Please Select a Length </option>
						<option value="short"> Short (30 minutes or less) </option>
						<option value="medium"> Medium (30 minutes - 1 hour) </option>
						<option value="long"> Long (1 hour-2hour) </option>
						<option value="XL"> Extra Long (2 hour - 2 hour 30 minutes+) </option>
						<option value="epic"> Super Long (2 hour 30 minutes +) </option>
					</Select>
				</div>
				<div>
					<Button  variant="contained" onClick={this.onSubmit}> Submit </Button>
					<Button  variant="contained" onClick={this.props.cancel}> Cancel </Button>
				</div>
			</div>
		)
	}
}

export default EditMediaForm