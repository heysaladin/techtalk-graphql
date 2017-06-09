import React from 'react';
import {
  Link
} from 'react-router-dom'

import {
    gql,
    graphql,
} from 'react-apollo';

import AddPerson from './AddPerson';

const PeopleList = ({ data: {loading, error, people} }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  // console.log(people);

  return (
    <div className="container">
    <AddPerson />
    <div className="peopleList">
      { people.map( ch =>
        (<div key={ch.id} className={'person ' + (ch.id < 0 ? 'optimistic' : '')}>
          <Link to={ch.id < 0 ? `/` : `person/${ch.id}`}>
            <img className="personPicture" src={ch.picture} alt={ch.name} />
          </Link>
          <span>
            {ch.name}
          </span>
        </div>)
      )}
    </div>
    </div>
  );
};

export const peopleListQuery = gql`
  query PeopleListQuery {
    people {
      id
      name
      picture
    }
  }
`;

export default graphql(peopleListQuery, {
  options: { pollInterval: 5000 },
})(PeopleList);
