import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import { peopleListQuery } from './PeopleListWithData';

class AddPerson extends React.Component {

// const AddPerson = ({ mutate }) => {

  constructor(props) {
    super(props);
    this.state = {valueName: '',valuePicture: ''};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
   handleChangeName = (event) => {
    this.setState({valueName: event.target.value});
  }
   handleChangePicture = (event) => {
    this.setState({valuePicture: event.target.value});
  }
 handleSubmit = (evt, valueName, valuePicture) => {
  evt.preventDefault();
   const {mutate} = this.props;
   valueName = this.state.valueName;
   valuePicture = this.state.valuePicture;
   console.log(this.state.valueName);
   console.log(this.state.valuePicture);
   mutate({
        variables: { name: valueName, picture: valuePicture },
        optimisticResponse: {
          addPerson: {
            picture: evt.target.valuePicture,
            name: evt.target.valueName,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Person',
          },
        },
        update: (store, { data: { addPerson } }) => {
            // Read the data from the cache for this query.
            const data = store.readQuery({ query: peopleListQuery });
            // Add our person from the mutation to the end.
            data.people.push(addPerson);
            // Write the data back to the cache.
            store.writeQuery({ query: peopleListQuery, data });
          },
      });
      evt.target.valueName = '';
      evt.target.valuePicture = '';
      // this.setState({valueName: '', valuePicture: ''});
  };

render(){


		const styles = {
			container: {
				marginTop: 15,
				padding: 10,
				display: 'flex',
				alignItems: 'center',
				
			},
			input: {
				flexGrow: 1,
				padding: '2px 40px 2px 10px',
				marginRight: 5,
				width: '45%',
				height: 27,
				borderRadius: 25,
				border: 'solid 1px #ddd'
			},
			button: {
				flexGrow: 1,
				float: 'right',
				width: 100,
				padding: 8,
				borderRadius: 25,
				border: 'solid 1px #00d2d0',
				backgroundImage: 'linear-gradient(45deg,#00d2d0 0%,#0078a5 100%)',
				color: 'white',
				fontWeight: 'bold'
			}
		}


  return (
    <div style={styles.container}>
    {/*// <form onSubmit={this.handleSubmit}>*/}
    <input
      type="text"
      name="valueName"
      placeholder="New person Name"
      onChange={this.handleChangeName}
      value={this.state.valueName}
    />
    <input
      type="text"
      name="valuePicture"
      placeholder="New person Picture URL"
      onChange={this.handleChangePicture}
      value={this.state.valuePicture}
    />
    <button style={styles.button} onClick={this.handleSubmit} >Add Person</button>
    {/* // <input type="submit" value="ADD" />
    // </form>*/}
    </div>
  );
};
}
const addPersonMutation = gql`
  mutation addPerson($name: String!, $picture: String!) {
    addPerson(name: $name, picture: $picture) {
      id
      name
      picture
    }
  }
`;

const AddPersonWithMutation = graphql(
  addPersonMutation,
)(AddPerson);

AddPerson.protoTypes ={
  mutate: PropTypes.func.isRequired
}

export default AddPersonWithMutation;
