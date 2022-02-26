import React, { Component } from 'react'

type Props = {}

type State = {}

class UpdatePets extends Component<Props, State> {
  state = {
        name: "",
        breed: "",
        age: 0,
        gender: "",
        height: 0,
        color: "",
        image: "",
        house_trained: "",
        coat_length: ""
    }
  

  render() {
    return (
      <div>UpdatePets</div>
    )
  }
}

export default UpdatePets