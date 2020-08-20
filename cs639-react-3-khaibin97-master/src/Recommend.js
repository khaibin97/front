import React from 'react';
import './App.css';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recCourses: [],
    };
  }

  recommend() {

    let courseList = [];
    let found = false;
    //initialise the scoring and sorting, if uninit
    for (const course of Object.entries(this.props.data)) {
      found = false;
      for (const past of Object.values(this.props.pastCourses)) {
        if (past.key === course[0]) { //check if user already took class
          found = true;
          break;
        }
      }
      if (!found) {
        courseList.push({ key: course[0], data: course[1], score: 0 });
      }
    }

    //Star Rating calculation
    //Stars:score ,  1*:-2 | 2*:-1 | 3*:0 | 4*:1 | 5*:2
    for (const past of Object.values(this.props.pastCourses)) {
      for (const course of Object.keys(courseList)) {
        if (courseList[course].data.subject === past.data.subject) {
          if (past.rating !== 0) //if rated
            courseList[course].score = courseList[course].score + past.rating - 3;
        }
      }
    }

    if (this.props.tags.length === 0) { //saves performance, skips going through keywords
      courseList.sort(function (a, b) { return b.score - a.score })
      this.setState({ recCourses: courseList })
      console.log(courseList)
      return;
    }

    // Tag include calculation
    for (const key of Object.keys(courseList)) {
      for (const tag of this.props.tags) {
        if (courseList[key].data.keywords.includes(tag)) {
          courseList[key].score++
        }
      }
    }
    courseList.sort(function (a, b) { return b.score - a.score })
    this.setState({ recCourses: courseList })
    console.log(courseList)

  }

  showRecommend() {
    let courses = [];
    for (const index in this.state.recCourses) {
      if (index >= 5) {  //only show 5 courses
        break;
      } else {
        courses.push(
          <Card key={index} style={{ width: '500px', marginLeft: '20px', marginTop: '5px', marginBottom: '5px' }}>
            <Card.Title style={{ marginLeft: '10px' }}>
              {this.state.recCourses[index].data.name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted" style={{ marginLeft: '10px' }}>
              {this.state.recCourses[index].data.number} - {this.state.recCourses[index].data.credits} credits
            </Card.Subtitle>
          </Card>
        )
      }
    }
    return courses;
  }

  render() {
    return (
      <>
        <Button key='recommend' type='button' onClick={() => { this.recommend(); }}
          style={{ marginLeft: '20px', marginTop: '10px', width: '25vw', backgroundColor: 'rgb(255,217,25)', color: 'black', fontWeight: 'bold' }}>
          Recommend Courses
        </Button>
        <CardDeck className="input-tag__tags">
          <Row style={{ marginLeft: '5px', width: '40vw' }}>
            <Col>
              {this.props.tags.map((tag, i) => (
                <Button key={tag} type="button" onClick={() => { this.props.removeTag(i); }}
                  style={{ marginLeft: "20px", marginTop: '5px', backgroundColor: 'rgb(230,0,0)', color: 'white' }}>
                  {tag} | X
                </Button>
              ))}
            </Col>
          </Row>
        </CardDeck>
        {
          //Go to console to see scoreboard
          this.showRecommend()
          //
        }
      </>
    )
  }
}

export default Recommend;
