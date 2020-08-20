import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


class Course extends React.Component {
  render() {
    return (
      <Card style={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}>
        <Card.Body>
          <Card.Title>{this.props.data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.data.number} - {this.getCredits()}
            <Button style={{ marginLeft: '10px' }} size='sm' onClick={() => { this.addToCart(null, null); }}>Add Class</Button>
          </Card.Subtitle>
          <Accordion defaultActiveKey="0">
            <Accordion.Collapse eventKey={this.props.id}>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Lecture#</th>
                    <th>Instructor</th>
                    <th>Time</th>
                    <th>SubSection</th>
                  </tr>
                </thead>
                <tbody>
                  {this.getSections()}
                </tbody>
              </Table>
            </Accordion.Collapse>
            <Accordion.Toggle as={Button} variant='link'>
              Expand/Collapse
            </Accordion.Toggle>
          </Accordion>
        </Card.Body>
      </Card>
    )
  }

  getCredits() {
    if (this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }

  getSections() {

    let sections = [];
    for (var section in this.props.data.sections) {
      const str = section.toString()
      sections.push(
        <tr key={section}>
          <td>
            <p>{section}</p>
            <p>
              <Button size='sm' onClick={() => { this.addToCart(str, null); }}>
                Add Section
              </Button>
            </p>
          </td>
          <td> Instructor : {this.props.data.sections[section].instructor} </td>
          <td>{this.getTime(section)}</td>
          <td>{this.getSubSec(section)}</td>
        </tr>
      );
    }
    return sections;
  }

  getSubSec(section) {
    let subsec = [];
    for(var sub in this.props.data.sections[section].subsections){
      const str = sub.toString();
      subsec.push(
        <div key={sub}>
        <p>{sub} <Button size='sm' onClick={() => { this.addToCart(section.toString(), str); }}>Add DIS</Button></p>
        <p>Location: {this.props.data.sections[section].subsections[sub].location}</p>
        {this.getSubTime(section,sub)}
        </div>
      )
    }
    return subsec;
  }

  addToCart(section, subsection) {
    this.props.setCartCourses(this.props, section, subsection)
  }

  getTime(section) {
    let time = [];
    for (var day in this.props.data.sections[section].time) {
      time.push(
        <p key={day}>{day} : {this.props.data.sections[section].time[day]}</p>
      )
    }
    return time;
  }
  getSubTime(section,sub) {
    let time = [];
    for (var day in this.props.data.sections[section].subsections[sub].time) {
      time.push(
        <p key={day}>{day} : {this.props.data.sections[section].subsections[sub].time[day]}</p>
      )
    }
    return time;
  }
}

export default Course;
