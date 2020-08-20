import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

import './App.css';

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ''}>
      <div {...other} />
    </Tooltip>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

class Ratings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  render() {
    return (
      <Card key={this.props.data.name} style={{ width: '640px', marginLeft: '10px', marginTop: '5px', marginBottom: '5px' }}>
        <Card.Body>
          <Row>
            <Card.Title>{this.props.data.name} </Card.Title>
            <span style={{ padding: '5px' }}></span>
            <Rating
              name={this.props.data.name}
              value={this.state.value}
              IconContainerComponent={IconContainer}
              onChange={(event, newValue) => {
                this.props.setRating(this.props.ckey, newValue)
                this.setState({value: newValue})
              }}
            />
          </Row>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.data.number} - {this.getCredits()}
          </Card.Subtitle>
          <CardDeck className="input-tag__tags" >
            <Row>
              <Col>
                {this.props.data.keywords.map((tag, i) => (
                  <Button key={tag} type="button" onClick={() => { this.props.setTags(tag); }}
                    style = {{marginLeft: '5px', marginTop: '5px'}}>
                    {tag}
                  </Button>
                ))}
              </Col>
            </Row>
          </CardDeck>
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


}

export default Ratings;
