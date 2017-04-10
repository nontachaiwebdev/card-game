import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import { CARD } from './ItemTypes'
import Card from './Card'

const { number, string } = PropTypes

const propTypes = {
  cardId: number,
  letter: string,
  slotId: number,
}

const canDropCard = (slotId) => true

const slotTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem()
    return canDropCard(item)
  },
  drop(props, monitor) {
    console.log(props)
    // if (props.cardId) {
    //   props.onMove({ sourceId: props.cardId, targetId: props.id })
    // } else {
    //   props.onMove({ sourceId: monitor.getItem().id, targetId: props.id })
    // }
    const id = monitor.getItem().id
    props.onMove({ sourceId: id, targetId: props.id })
  },
  hover(props) {
    // console.log(props)
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
}


class Slot extends Component {
  render() {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div>
        <div className="slot">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Slot.propTypes = propTypes


export default DropTarget(CARD, slotTarget, collect)(Slot)
