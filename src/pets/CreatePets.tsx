import React, { Component, FormEvent } from 'react'
import {FormGroup, Form, Input, Label, Button } from 'reactstrap'


type Props = {}

type State = {
    file: any,
    name: string,
    breed: string,
    age: number,
    gender: string,
    height: number,
    color: string,
    image: any,
    house_trained: string,
    coat_length: string
    base64URL: any;
}
// name, breed, age, gender, height, color, image, house_trained, coat_length 
export default class CreatePets extends Component<Props, State> {
  state = {
      name: "",
      breed: "",
      age: 0,
      gender: "",
      height: 0,
      color: "",
      image: "" as any,
      house_trained: "",
      coat_length: "",
      file: undefined,
      base64URL: ""
  }

  
  getBase64 = (file: any) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL:any = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  handleSubmit = async (e:FormEvent<HTMLFormElement>) => { 
      e.preventDefault()
      const userId = window.localStorage.getItem("userId")     
      const { name, breed, age, gender, height, color, image, house_trained, coat_length, base64URL} = this.state
    const createdPet = await fetch(`http://localhost:4000/pet/create`, {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify({ pet: { name, breed, age, gender, height, color, image: base64URL, house_trained, coat_length, base64URL } }),
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    })
    const createdPetData = await createdPet.json();
    console.log("createdPetData", createdPetData);
  }


  handleChange = (name:string, value: any ) => {
      switch(name) {
          case "petName" : {
              this.setState({name:value})
              break
            } 
            case "petBreed" : {
                this.setState({breed:value})
                break
              } 
              case "petAge" : {
                this.setState({age:value})
                break
              } 
              case "petGender" : {
                this.setState({gender:value})
                break
              } 
              case "petHeight" : {
                this.setState({height:value})
                break
              }  
              case "petColor" : {
                this.setState({color:value})
                break
              } 
              case "petImage" : {
                let { file } = this.state;

                file = value.target.files[0];
            
                this.getBase64(file)
                  .then(result => {
                    // @ts-ignore: Object is possibly 'null'.
                    file["base64"] = result;
                    console.log("File Is", file);
                    this.setState({
                      base64URL: result,
                      file
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
            
                this.setState({
                  file: value.target.files[0]
                });
                break
              } 
              case "houseTrained" : {
                this.setState({house_trained:value})
                break
              } 
              case "coatLength" : {
                this.setState({coat_length:value})
                break
              } 

      }
  }
  render() {
            
    return (
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label for="petname">
                    Name 
                </Label>
                
                <Input placeholder="Pet Name:" name="name" type="text" id="petname" value={this.state.name} onChange={(e)=>this.handleChange("petName", e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="petbreed">
                    Breed:
                </Label>
                
                <Input value={this.state.breed} onChange={(e)=>this.handleChange("petBreed", e.target.value)} placeholder="pit bull:" name="breed" type="text" id="petbreed"/>
            </FormGroup>
            <FormGroup>
                <Label for="petage">
                    Age
                </Label>
                
                <Input value={this.state.age} onChange={(e)=>this.handleChange("petAge", e.target.value)}placeholder="Pet age:" name="age" type="number" id="petage"/>
            
            </FormGroup>

            <FormGroup>
                <Label for="petgender">
                    Gender
                </Label>
                
                <Input value={this.state.gender} onChange={(e)=>this.handleChange("petGender", e.target.value)}placeholder="ex: Male:" name="gender" type="text" id="petgender"/>
            
            </FormGroup>

            <FormGroup>
                <Label for="petheight">
                    Height (in cm): 
                </Label>
                
                <Input value={this.state.height} onChange={(e)=>this.handleChange("petHeight", e.target.value)}placeholder="ex: 58 cm" name="height" type="number" id="petheight"/>
            </FormGroup>

            <FormGroup>
                <Label for="petcolor">
                    Color 
                </Label>
                
                <Input value={this.state.color} onChange={(e)=>this.handleChange("petColor", e.target.value)}placeholder="ex: brown:" name="color" type="text" id="petcolor"/>
            </FormGroup>

            <FormGroup>
                <Label for="petimage">
                    Upload Photo
                </Label>
                
                <Input onChange={(e)=> this.handleChange("petImage", e)}  name="petimage" type="file" id="petimage"/>
            </FormGroup>

            <FormGroup>
                <Label for="housetrained">
                    House Trained? 
                </Label>
                
                <Input value={this.state.house_trained} onChange={(e)=>this.handleChange("houseTrained", e.target.value)}placeholder="ex: yes, no or special needs" name="housetrained" type="text" id="housetrained"/>
            </FormGroup>

            <FormGroup>
                <Label for="coatlength">
                    Coat Length 
                </Label>
                
                <Input value={this.state.coat_length} onChange={(e)=>this.handleChange("coatLength", e.target.value)}placeholder="ex: short or long" name="coatlength" type="text" id="coatlength"/>
            </FormGroup>
            <Button>
                Submit
            </Button>




        </Form>    
    )
  }
}