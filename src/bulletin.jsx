import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StatelessBulletin } from './stateless.jsx'
import Cache from './cache'

const CACHE_KEY = {
  PREFIX: 'bulletin:',
  LAST_READ: 'last-read',
}

const cache = new Cache(CACHE_KEY.PREFIX)

/**
 * Bulletin Component
 */
export class Bulletin extends Component {

  static propTypes = {
    identity: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.node,
    okText: PropTypes.string,
    className: PropTypes.string,
    onOk: PropTypes.func,
  }

  static defaultProps = {
    onOk () {},
  }

  static clear () {
    cache.clear(CACHE_KEY.LAST_READ)
  }

  constructor (props) {
    super(props)

    this.state = {
      ok: cache.get(CACHE_KEY.LAST_READ) === props.identity,
    }
  }

  ok () {
    cache.set(CACHE_KEY.LAST_READ, this.props.identity)
    this.setState({
      ok: true,
    }, () => this.props.onOk())
  }

  render () {
    return <StatelessBulletin {...this.props} visible={this.props.identity && !this.state.ok} onOk={() => this.ok()} />
  }
}
