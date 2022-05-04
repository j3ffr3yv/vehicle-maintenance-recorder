import axios from 'axios';
import readXlsxFile from 'read-excel-file'
import { nanoid } from "nanoid";
import { getDatabase, ref, set, onValue } from "firebase/database";
import moment from 'moment';

import React,{Component} from 'react';

class Uploader extends Component {

	state = {

	// Initially, no file is selected
	selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};

	// On file upload (click the upload button)
	onFileUpload = () => {
	// Create an object of formData
	const formData = new FormData();
	
	const writeVehicleData = (vlicense, vstate, vvin, vtwf, vyear, vmake, vmodel, vpur_date) => {
        const db = getDatabase();
        const vid = nanoid();
        set(ref(db, 'vehicles/' + vid), {
        id: vid,
        license: vlicense, 
        state: vstate,
        vin: vvin, 
        twf: vtwf, 
        year: vyear, 
        make: vmake, 
        model: vmodel, 
        pur_date: vpur_date, 
        mileage: 0,
        maintenances: []
        });
    }
    
    // Update the formData object
	formData.append(
		"myFile",
		this.state.selectedFile,
		this.state.selectedFile.name
	);
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
	
	// Request made to the backend api
	// Send formData object
    if(this.state.selectedFile.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ){
        try {
            readXlsxFile(this.state.selectedFile).then((rows) => {
                console.log(rows[2][0])
                console.log("success")
                const db = getDatabase();
                const dbRef = ref(db, 'vehicles');
                var array = [];
                onValue(dbRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                      var vehicleTWF = childSnapshot.val().twf;
                      array.push(vehicleTWF)
                      console.log("vehiclewtf " + vehicleTWF)
                    });
                  }, {
                    onlyOnce: true
                  });
				const months = {
				Jan: '01',
				Feb: '02',
				Mar: '03',
				Apr: '04',
				May: '05',
				Jun: '06',
				Jul: '07',
				Aug: '08',
				Sep: '09',
				Oct: '10',
				Nov: '11',
				Dec: '12',
				}
                rows.forEach(function(row){
                    if(!array.includes(row[4])){
                        if(row[18] != null & row[18].toString().length == 57){
							var datetoread = row[18].toString().split(" ");
							var datetowrite = datetoread[2] + "/" + months[datetoread[1]] + "/" + datetoread[3];
                            writeVehicleData(row[0], row[1], row[2], row[4], row[8], row[9], row[10],datetowrite);
						}
                        else {
                            var i = 17
                            while(row[i] != null & row[i].toString().length == 57 & i > 0){
                                i -= 1
                            }
                            if(i != 0){
								var datetoread = row[i].toString().split(" ")
								var datetowrite = datetoread[2] + "/" + months[datetoread[1]] + "/" + datetoread[3]
                                writeVehicleData(row[0], row[1], row[2], row[4], row[8], row[9], row[10],datetowrite)
                            }
                        }
                        array.push(row[4])
                    }
                });
            })
            
 
        }
        catch {
            console.log("error :(")
        }
    }
	axios.post("api/uploadfile", formData);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			
<p>File Name: {this.state.selectedFile.name}</p>

			
<p>File Type: {this.state.selectedFile.type}</p>

			
<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	
	render() {
	
	return (
		<div>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
		{this.fileData()}
		</div>
	);
	}
}

export default Uploader;
