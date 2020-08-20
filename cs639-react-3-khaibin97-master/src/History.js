import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import './App.css';
import Ratings from './Rating';
import Recommend from './Recommend';


class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pastKeys: {},
      pastCourses: [],
      tags: []
    };
  }

  componentDidMount() {
    fetch('https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed').then(
      res => res.json()
    ).then(data => this.setState({ pastKeys: data }));
  }

  getPastCourses() {
    let courses = [];
    let pastcourse = [];
    let i = 0;
    if (this.state.pastKeys.data && this.props.data) {
      for (const course of Object.entries(this.props.data)) {
        for (const key of Object.entries(this.state.pastKeys.data)) {
          if (key[1] === course[0]) {

            courses.push(
              <Ratings key={course[0]} ckey={i++} data={course[1]} setRating={(key, rating) => { this.setRating(key, rating) }} setTags={(name) => { this.setTags(name) }} />
            )

            //pastCourses uninitialized
            if(this.state.pastCourses.length === 0) {
              pastcourse.push(
                {
                  key: course[0],
                  data: course[1],
                  rating: 0
                }
              )
            }
          }
        }
      }
    }
    if (this.state.pastCourses.length === 0) { //if pastCourses uninitialized
      this.state.pastCourses = pastcourse; //intentional
    }
    return courses;
  }

  setRating(key, value) {
    let temp = this.state.pastCourses;
    temp[key].rating = value
    this.setState({ pastCourses: temp })
  }

  setTags(tagname) {
    if (this.state.tags.find(tag => tag.toLowerCase() === tagname)) {
      //don't add
      return;
    }
    this.setState({ tags: [...this.state.tags, tagname] });
  }

  removeTag(i) {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  }

  render() {
    return (
      <Row style={{ marginLeft: '5px' }}>
        <div style={{ width: '55%' }}>
          <p style={{ marginLeft: '8px', marginRight: '5px' }}>
            Click on the tags and rate the courses to let the recommender know which course you may like.
          </p>
          <p style={{ marginLeft: '8px', marginRight: '5px', color: 'grey', fontSize: 'x-small'}}>
            *Please rate more courses for a more accurate result*
          </p>
          {this.getPastCourses()}
        </div>
        <div>
          <Card style={{ width: 'calc(42vw - 5px)', marginTop: '5px', height: 'calc(90vh - 50px)', position: 'fixed' }}>
            <Recommend tags={this.state.tags} data={this.props.data} pastCourses={this.state.pastCourses} removeTag={(i) => { this.removeTag(i) }} />
          </Card>
        </div>

      </Row>
    )
  }
}

export default History;