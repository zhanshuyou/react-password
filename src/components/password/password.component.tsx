import * as React from 'react'
import './password.component.styl'

interface PasswordProps {
  passwordLength: number
  onConfirm?: (password: string) => void
}

interface PasswordState {
  valueArr: string[]
}

export class Password extends React.Component<PasswordProps, PasswordState> {
  private refArr: React.Ref<HTMLInputElement> | never[] = []
  private index: number = 0

  constructor(props: any) {
    super(props)
    this.state = {
      valueArr: []
    }
  }

  componentDidMount() {
    this.refArr[this.index].focus()
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { passwordLength } = this.props
    const { valueArr } = this.state
    const isNumber = /^[0-9]*$/
    const value = e.target.value
    if (isNumber.test(value) && parseInt(value, 10) >= 0) {
      valueArr[this.index] = value
      if (value.length === 1 && this.index < passwordLength - 1) {
        this.refArr[++this.index].focus()
      }
    } else {
      valueArr[this.index] = ''
    }
    this.setState({
      ...this.state,
      valueArr
    })

    const password = this.checkPassword(valueArr)
    if (password) {
      const { onConfirm } = this.props
      if (onConfirm) {
        onConfirm(password)
      }
    }
  }

  checkPassword(valueArr: string[]) {
    const { passwordLength } = this.props
    let password = ''
    if (valueArr.length < passwordLength) {
      return false
    }
    valueArr.map((item) => {
      if (item !== '') {
        password += item
      }
    })
    if (password.length < length) {
      return false
    }
    return password
  }

  handlePress = (target: any) => {
    const { passwordLength } = this.props
    switch (target.keyCode) {
      case 8:
        // 返回
        const value = target.target.value
        if (value === '' && this.index > 0) {
          this.refArr[--this.index].focus()
        }
        break
      case 37:
        // 左移
        if (this.index > 0) {
          this.refArr[--this.index].focus()
        } else {
          this.refArr[passwordLength - 1].focus()
          this.index = passwordLength - 1
        }
        break
      case 39:
        // 右移
        if (this.index < passwordLength - 1) {
          this.refArr[++this.index].focus()
        } else {
          this.refArr[0].focus()
          this.index = 0
        }
        break
      default:
        break
    }
  }

  handelFocus = (i: number) => {
    this.index = i
    this.refArr[i].select()
  }

  setRef(index: number, ref: any) {
    this.refArr[index] = ref
  }

  render() {
    const { passwordLength } = this.props
    const { valueArr } = this.state
    const inputs: JSX.Element[] = []
    for (let i = 0; i < passwordLength; i++) {
      inputs.push(
        <input
          key={i}
          ref={this.setRef.bind(this, i)}
          className='item'
          type='text'
          maxLength={1}
          onChange={this.handleChange}
          onKeyUp={this.handlePress}
          onFocus={this.handelFocus.bind(this, i)}
          value={valueArr[i]}
        />
      )
    }
    return(
      <div className='password-component'>
        {inputs}
      </div>
    )
  }
}
