import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class Cart extends React.Component {

  getCourses() {
    let courses = [];
    for (var course in this.props.cart) {
      const coursestr = course.toString()
      courses.push(
        <Card key={course} style={{ width: '100%'}}>
          <Card.Body>
            <Card.Title>{this.props.cart[course].course.data.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.props.cart[course].course.data.number} - {this.props.cart[course].course.data.credits} credits
              <Button variant='danger' style={{ marginLeft: '10px' }} size='sm' onClick={() => { this.props.removeFromCart(coursestr); }}>Remove</Button>
            </Card.Subtitle>
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
                {this.getSections(course)}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )
    }
    return courses;
  }

  getSections(course) {
    let sections = [];

    if (null !== this.props.cart[course].section) {
      const sec = this.props.cart[course].section;
      sections.push(
        <tr key={sec}>
          <td>
            <p>{sec}</p>
            <p><Button variant='danger' style={{ marginLeft: '10px' }} size='sm' onClick={() => { this.props.removeSection(course); }}>Remove</Button></p>
          </td>
          <td> Instructor : {this.props.cart[course].course.data.sections[sec].instructor} </td>
          <td>{this.getTime(course, sec)}</td>
          <td>{this.getSubSec(course, sec)}</td>
        </tr>
      );
    } else {
      for (var section in this.props.cart[course].course.data.sections) {
        const str = section.toString()
        sections.push(
          <tr key={section}>
            <td>
              <p>{section}</p>
              <p>
                <Button size='sm' onClick={() => { this.addToCart(course, str, null); }}>
                  Add Section
              </Button>
              </p>
            </td>
            <td> Instructor : {this.props.cart[course].course.data.sections[section].instructor} </td>
            <td>{this.getTime(course, section)}</td>
            <td>{this.getSubSec(course, section)}</td>
          </tr>
        );
      }
    }
    return sections;
  }

  getSubSec(course, section) {
    let subsec = [];
    if (null !== this.props.cart[course].sub) {
      const sub = this.props.cart[course].sub
      subsec.push(
        <div key={sub}>
          <p>{sub}<Button variant='danger' style={{ marginLeft: '10px' }} size='sm' onClick={() => { this.props.removeSubsection(course); }}>Remove</Button></p>
          <p>Location: {this.props.cart[course].course.data.sections[section].subsections[sub].location}</p>
          {this.getSubTime(course, section, sub)}
        </div>
      )
    } else {
      for (var sub in this.props.cart[course].course.data.sections[section].subsections) {
        const str = sub.toString();
        subsec.push(
          <div key={sub}>
            <p>{sub}<Button size='sm' onClick={() => { this.addToCart(course, section, str); }}>Add DIS</Button></p>
            <p>Location: {this.props.cart[course].course.data.sections[section].subsections[sub].location}</p>
            {this.getSubTime(course, section, sub)}
          </div>
        )
      }
    }
    return subsec;
  }

  getTime(course, section) {
    let time = [];
    for (var day in this.props.cart[course].course.data.sections[section].time) {
      time.push(
        <p key={day}>{day} : {this.props.cart[course].course.data.sections[section].time[day]}</p>
      )
    }
    return time;
  }
  getSubTime(course, section, sub) {
    let time = [];
    for (var day in this.props.cart[course].course.data.sections[section].subsections[sub].time) {
      time.push(
        <p key={day}>{day} : {this.props.cart[course].course.data.sections[section].subsections[sub].time[day]}</p>
      )
    }
    return time;
  }

  addToCart(course, section, subsection) {
    this.props.setCartCourses(this.props.cart[course].course, section, subsection)
  }

  render() {
    return (
      <div style={{ margin: '10px' }}>
        {this.getCourses()}
      </div>
    )
  }
}

export default Cart;
