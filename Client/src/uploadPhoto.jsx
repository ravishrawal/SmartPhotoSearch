import React, {Component} from 'react';
import {aws_access_key_id, aws_secret_access_key} from './secrets';
import { v4 as uuidv4 } from 'uuid';

var AWS = require("aws-sdk");
const credentials = new AWS.Credentials(aws_access_key_id, aws_secret_access_key)
const region = 'us-east-1';
AWS.config.update({
	region,
	credentials
});


class UploadPhoto extends Component {
	constructor() {
		super()
		this.state = {
			picturePreview: null,
			pictureAsFile: null,
			submitted: false
		}
		this.submitHandler = this.submitHandler.bind(this)
		this.uploadPicture = this.uploadPicture.bind(this)
		this.resetHandler = this.resetHandler.bind(this)
	}
	componentDidMount() {
		console.log('upload mounted!');
		// apigClient.invokeApi({}, '/search', 'GET',{},{})
		// .then(res => console.log(res))
	}
	uploadPicture(e){
		e.preventDefault()
		console.log(e)
		this.setState({ 
			picturePreview: URL.createObjectURL(e.target.files[0]),
			pictureAsFile: e.target.files[0]
		})
	}
	resetHandler(e) {
		e.preventDefault();
		this.setState({ submitted:false })
	}

	submitHandler(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append(
			"file",
			this.state.pictureAsFile
			);

		const s3 = new AWS.S3({apiVersion: '2006-03-01'})
		var params = {
		  Body: this.state.pictureAsFile, 
		  Bucket: "rav-viren-photos", 
		  Key: uuidv4()
		};
		s3.putObject(params, (err, data)=> {
					if(err) console.log(err, err.stack)
					else console.log(data)
					}
			)
			this.setState({ 
							picturePreview:null,
							pictureAsFile:null,
							submitted:true
						  })
	}

	render() {
		return (
					<div className="container">
			        	{ this.state.submitted == false &&
			        		<div>
				        		<form action="/action_page.php" onSubmit={this.submitHandler}>
						        	<div className="row" style={{margin:"auto"}}>
										<div className="col-sm-4">
										  	Upload Photo
										  	<input type="file" id="img" name="img" accept="image/*" onChange={this.uploadPicture} />
										</div>
										<div className="col-sm-4" style={{marginTop:"10px"}}>
									  		<input className="btn btn-success" type="submit" />
								  		</div>
							  	    </div>
								</form>
							</div>
						}
						{ this.state.submitted &&
							<div>
								Submitted!
								<button className="btn btn-primary" onClick={this.resetHandler}>Submit Another</button>
							</div>
						}
					</div>
			)
	}
}

export default UploadPhoto


