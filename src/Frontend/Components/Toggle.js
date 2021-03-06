
import React from 'react'
import {
  StyleSheet, View, TouchableOpacity,
  Animated
} from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { THEME_DEFAULT } from 'utils/globalStyles'
import PropTypes from 'prop-types'

const IconFontAwesomeAnimated = Animated.createAnimatedComponent(IconFontAwesome)
const IconIoniconsAnimated = Animated.createAnimatedComponent(IconIonicons)
const BtnAnimated = Animated.createAnimatedComponent(TouchableOpacity)
const Index = {
  Left: 0,
  Right: 1
}

export default class Toggle extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = ({
      isLeft: true
    })
    this.left = new Animated.Value(0)
    this.widthYellow = new Animated.Value(TOGGE_WIDTH)
  }
  onPress = () => {
    if (this.props.isActive) {
      Animated.parallel([
        Animated.timing(
          this.left,
          {
            toValue: this.state.isLeft ? TOGGE_WIDTH / 2 + TOGGE_PADDING : 0,
            duration: 200
          }
        ),
        Animated.timing(
          this.widthYellow,
          {
            toValue: this.state.isLeft ? 0 : TOGGE_WIDTH + TOGGE_PADDING,
            duration: 200
          }
        )
      ]).start()

      const newValue = !this.state.isLeft
      this.props.toggleTabar(newValue ? Index.Left : Index.Right)
      this.setState({isLeft: newValue})
    } else {
      this.props.goToPage(1)
    }
  }
  render () {
    const { isLeft } = this.state
    const { width, isActive } = this.props

    const backgroundColor = width.interpolate({
      inputRange: [TOGGE_WIDTH / 2, TOGGE_WIDTH + TOGGE_PADDING],
      outputRange: ['transparent', '#c2c7cf']
    })
    const opacity = width.interpolate({
      inputRange: [TOGGE_WIDTH / 2, TOGGE_WIDTH + TOGGE_PADDING],
      outputRange: [0, 1]
    })
    const colorBtnFire = width.interpolate({
      inputRange: [TOGGE_WIDTH / 2, TOGGE_WIDTH + TOGGE_PADDING],
      outputRange: [isActive ? 'transparent' : IconColor, isLeft ? THEME_DEFAULT.colorPink : IconColor]
    })
    const colorBtnStar = width.interpolate({
      inputRange: [TOGGE_WIDTH / 2, TOGGE_WIDTH + TOGGE_PADDING],
      outputRange: [isActive ? 'transparent' : IconColor, isLeft ? IconColor : 'yellow']
    })

    return (
      <BtnAnimated
        activeOpacity={1}
        onPress={() => this.onPress()}
        style={[styles.toggle, {width: width}]}
      >
        {isActive &&
          <View style={{position: 'absolute', width: '100%', height: '100%'}}>
            <Animated.View style={[styles.bgGray, {backgroundColor: backgroundColor, opacity}]}/>
            <Animated.View style={[styles.bgYellow, {width: this.widthYellow, opacity}]}/>
          </View>
        }
        {isActive && <Animated.View style={[styles.btnToggle, styles.shadow, {left: this.left}]}/>}
        {(isActive || isLeft) &&
          <View style={[styles.iconView]}>
            <IconIoniconsAnimated name='md-flame' style={{ color: colorBtnFire, fontSize: 25 }} />
          </View>
        }
        {(isActive || !isLeft) &&
          <View style={[styles.iconView]}>
            <IconFontAwesomeAnimated name='star' style={{ color: colorBtnStar, fontSize: 25 }} />
          </View>
        }
      </BtnAnimated>
    )
  }
}

Toggle.defaultProps = {
  toggleTabar: () => {},
  goToPage: () => {},
  width: {},
  isActive: true
}

Toggle.propTypes = {
  toggleTabar: PropTypes.func,
  goToPage: PropTypes.func,
  width: PropTypes.object,
  isActive: PropTypes.bool
}

const TOGGE_WIDTH = 80
const TOGGE_PADDING = 10
const IconColor = '#e3e5e8'

const styles = StyleSheet.create({
  bgYellow: {
    height: '100%',
    position: 'absolute',
    right: 0,
    backgroundColor: 'yellow'
  },
  bgGray: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  shadow: {
    shadowColor: '#e6e9ed',
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 2
  },
  iconView: {
    width: TOGGE_WIDTH / 2,
    height: TOGGE_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnToggle: {
    position: 'absolute',
    width: TOGGE_WIDTH / 2,
    height: TOGGE_WIDTH / 2,
    borderRadius: TOGGE_WIDTH / 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  toggle: {
    height: 40,
    overflow: 'hidden',
    flexDirection: 'row',
    borderRadius: TOGGE_WIDTH / 4,
    justifyContent: 'space-between'
  }
})
