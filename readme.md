# react-bulletin

> :loudspeaker: Bulletin component for React

## Screenshot

![](./_media/screenshot.png)

## Installation

```bash
npm i --save @sodalife/react-bulletin
```

Also make sure that the following peerDependencies are installed:

```bash
npm i --save react react-dom prop-types rc-animate
```

## Usage

### Simplest

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Bulletin } from '@sodalife/react-bulletin'

ReactDOM.render(
  <Bulletin identity="20180401.1" message="nothing important happened today" />
  , document.getElementById('#app')
)
```

### Full props

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Bulletin } from '@sodalife/react-bulletin'

let bulletin = {
  identity: '20180401.1',
  title: '🎉 BREAKING NEWS',
  okText: 'OK 👌',
  message: 'Nothing Important Happened Today',
  className: 'custom-class',
  onOk() {
    console.log('ok')
  },
}

ReactDOM.render(<Bulletin {...bulletin} />, document.getElementById('#app'))
```

### Works with markdown or html content, from remote

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Bulletin } from '@sodalife/react-bulletin'
import fetch from 'unfetch'
import md from 'md'
import xss from 'xss'

const REMOTE_BULLET_API = 'https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/LWY5xHmy'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bulletin: {},
    }
  }

  componentDidMount() {
    this.fetch()
  }

  async fetch() {
    let bulletin = await fetch(REMOTE_BULLET_API).then(response =>
      response.json()
    )

    // note: prevent xss attacks here
    bulletin.message = (
      <div dangerouslySetInnerHTML={{ __html: xss(md(bulletin.message)) }} />
    )

    this.setState({ bulletin })
  }

  render() {
    ;<div>
      <Bulletin key={this.state.bulletin.identity} {...this.state.bulletin} />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('#app'))
```

### Stateless functional component

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { StatelessBulletin } from '@sodalife/react-bulletin'

let bulletin = {
  identity: '20180401.1',
  title: '🎉 BREAKING NEWS',
  okText: 'OK 👌',
  message: 'Nothing Important Happened Today',
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      read: false,
    }
  }

  render() {
    return (
      <StatelessBulletin
        {...bulletin}
        visible={!this.state.read}
        onOk={() => this.setState({ read: true })}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('#app'))
```

## Full examples

Check [Storybook](./storybook):

1.  Clone repository:

    ```bash
    git clone git@github.com:sodalife/react-bulletin.git && cd react-bulletin
    ```

2.  Install dependencies:

    ```bash
    npm i
    ```

3.  Run Storybook-server:

    ```bash
    npm run storybook
    ```

4.  Open http://localhost:9001/

## API

### Bulletin

#### Props

| Prop      | Type     | Default           |
| --------- | -------- | ----------------- |
| identity  | String   | `undefined`       |
| title     | String   | `'BREAKING NEWS'` |
| message   | Node     | `undefined`       |
| okText    | String   | `'OK'`            |
| className | String   | `undefined`       |
| onOk      | Function | `() => {}`        |

#### Static Function

* clear()

  Clears cache from localStorage

### StatelessBulletin

#### Props

| Prop      | Type     | Default           |
| --------- | -------- | ----------------- |
| identity  | String   | `undefined`       |
| title     | String   | `'BREAKING NEWS'` |
| message   | Node     | `undefined`       |
| okText    | String   | `'OK'`            |
| className | String   | `undefined`       |
| onOk      | Function | `() => {}`        |
| visible   | Boolean  | `true`            |

## License

[Apache License 2.0](license)
