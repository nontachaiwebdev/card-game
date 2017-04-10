import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import { CARD } from './ItemTypes'

const { string, number } = PropTypes
const propTypes = {
  id: number,
  letter: string,
  slotId: number,
}

const cardSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.draggable
  },
  beginDrag(props) {
    // Return the data describing the dragged item
    const { id } = props
    return { id }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    canDrag: monitor.canDrag(),
    isDragging: monitor.isDragging(),
  }
}


class Card extends Component {
  render() {
    const { letter, connectDragSource } = this.props
    return connectDragSource(
      <div>
        <div className="card">{letter}</div>
      </div>
    )
  }
}
Card.propTypes = propTypes

export default DragSource(CARD, cardSource, collect)(Card)
