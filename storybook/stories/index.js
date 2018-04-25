import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import fetch from 'unfetch'
import xss from 'xss'
import md from 'md'
import { Bulletin, StatelessBulletin } from '../../lib/bulletin.js'

const REMOTE_BULLET_API = 'https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/LWY5xHmy'

const stories = storiesOf('Bulletin', module)

stories.addDecorator(withKnobs)

stories.add('stateless component', () => {
  let props = {
    identity: text('identity', '1'),
    title: text('title', '🎉 BREAKING NEWS'),
    message: text('message', 'Nothing Important Happened Today'),
    okText: text('okText', 'OK 👌'),
    visible: boolean('visible', true),
    onOk: action('ok'),
  }
  return <span>Please control the compnent throught the Knobs panel on the right. <StatelessBulletin key={props.identity} {...props} /></span>
})

stories.add('stateful component', () => {
  class Sample extends Component {
    constructor (props) {
      super(props)

      this.state = {
        identity: '1',
        title: '🎉 BREAKING NEWS',
        okText: 'OK 👌',
        message: 'Nothing Important Happened Today',
      }
    }

    next () {
      let identity = +this.state.identity + 1 + ''
      this.setState({
        identity,
        title: '🎉 BREAKING NEWS ' + identity,
        okText: 'OK 👌',
        message: 'Nothing Important Happened Today',
      })
    }

    render () {
      let { title, okText, message, identity } = this.state
      return <div>
        <p><button onClick={() => this.next()}>Next bulletin</button></p>
        <Bulletin key={identity} {...{ identity, title, okText, message }} onOk={action('ok')} />
      </div>
    }
  }

  return <Sample />
})

stories.add('stateful with ajax', () => {
  class Sample extends Component {
    constructor (props) {
      super(props)

      this.state = {
        identity: '',
        title: '',
        okText: '',
        message: '',
      }
    }

    componentDidMount () {
      this.fetch()
    }

    async fetch () {
      let { identity, title, okText, message } = await fetch(REMOTE_BULLET_API).then((response) => response.json())
      this.setState({ identity, title, okText, message })
    }

    clear () {
      Bulletin.clear()
      this.setState({
        identity: '',
        title: '',
        okText: '',
        message: '',
      })
    }

    render () {
      let { title, okText, message, identity } = this.state
      return <div>
        <p><button onClick={() => this.clear()}>Clear cache</button></p>
        <p><button onClick={() => this.fetch()}>Fetch bulletin from url</button></p>
        <Bulletin key={identity} {...{ identity, title, okText, message }} onOk={action('ok')} />
      </div>
    }
  }

  return <Sample />
})

stories.add('stateful + ajax + markdown + html', () => {
  class Sample extends Component {
    constructor (props) {
      super(props)

      this.state = {
        identity: '',
        title: '',
        okText: '',
        message: '',
      }
    }

    componentDidMount () {
      this.fetch()
    }

    async fetch () {
      let { identity, title, okText, message } = await fetch(REMOTE_BULLET_API).then((response) => response.json())

      // note: prevent xss attacks here
      message = <div dangerouslySetInnerHTML={{ __html: xss(md(message)) }} />

      this.setState({ identity, title, okText, message })
    }

    clear () {
      Bulletin.clear()
      this.setState({
        identity: '',
        title: '',
        okText: '',
        message: '',
      })
    }

    render () {
      let { title, okText, message, identity } = this.state
      return <div>
        <p><button onClick={() => this.clear()}>Clear cache</button></p>
        <p><button onClick={() => this.fetch()}>Fetch bulletin from url</button></p>
        <Bulletin key={identity} {...{ identity, title, okText, message }} onOk={action('ok')} />
      </div>
    }
  }

  return <Sample />
})
